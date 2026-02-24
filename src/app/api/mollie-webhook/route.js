// MOLLIE WEBHOOK - KI-Kompass V2
// Verarbeitet Mollie-Zahlungsstatus nach Bezahlung
// ENV: MOLLIE_API_KEY

import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getMollieClient } from '../../../lib/mollie'
import { sendNotificationToOwner, sendConfirmationToCustomer } from '../../../lib/mail'
import { saveAccessCode, saveCustomerData } from '../../../lib/google-sheets'

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }
  return String(text).replace(/[&<>"]/g, (m) => map[m])
}

function generateAccessCode(companyName) {
  const prefix = (companyName || 'KUNDE').replace(/[^a-zA-Z0-9]/g, '').slice(0, 6).toUpperCase()
  const suffix = crypto.randomBytes(8).toString('hex').toUpperCase()
  return prefix + '-' + suffix
}

// Idempotenz: Bereits verarbeitete Payment-IDs zwischenspeichern
const processedPayments = new Map()
const PROCESSED_TTL = 24 * 60 * 60 * 1000

setInterval(() => {
  const now = Date.now()
  for (const [key, timestamp] of processedPayments) {
    if (now - timestamp > PROCESSED_TTL) processedPayments.delete(key)
  }
}, 10 * 60 * 1000)

export async function POST(request) {
  try {
    const mollieClient = getMollieClient()
    if (!mollieClient) return NextResponse.json({ error: 'Nicht konfiguriert' }, { status: 500 })

    const formData = await request.formData()
    const paymentId = formData.get('id')
    if (!paymentId || typeof paymentId !== 'string') return NextResponse.json({ error: 'Fehlende Payment-ID' }, { status: 400 })

    // Idempotenz-Check
    if (processedPayments.has(paymentId)) {
      return NextResponse.json({ received: true, status: 'already_processed' })
    }

    const payment = await mollieClient.payments.get(paymentId)
    if (payment.status !== 'paid') return NextResponse.json({ received: true, status: payment.status })

    // Als verarbeitet markieren
    processedPayments.set(paymentId, Date.now())

    const { plan, name, email, company, phone } = payment.metadata || {}
    const safeName = escapeHtml((name || '').slice(0, 200).replace(/[\r\n]/g, ''))
    const safeEmail = (email || '').slice(0, 254).replace(/[<>\r\n]/g, '')
    const safeCompany = escapeHtml((company || '').slice(0, 200).replace(/[\r\n]/g, ''))
    const safePhone = escapeHtml((phone || '').slice(0, 50).replace(/[\r\n]/g, ''))

    const planNames = { premium: 'Premium Report', strategie: 'Strategie-Paket', zertifikat: 'KI-Zertifikat (Premium)', 'zertifikat-basic': 'KI-Zertifikat (Basic)', kurs: 'Online-Kurs', benchmark: 'Branchen-Benchmark Report', 'toolbox-starter': 'KI-Toolbox Starter', 'toolbox-pro': 'KI-Toolbox Professional', 'monitoring-basic': 'KI-Monitoring Basic', 'monitoring-pro': 'KI-Monitoring Pro' }
    const planName = planNames[plan] || 'Premium Report'
    const amount = payment.amount ? payment.amount.value : '0'
    const paymentMethod = payment.method || 'Online'

    const accessCode = generateAccessCode(safeCompany)
    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://ki-kompass.de').trim()
    const accessLink = baseUrl + '/premium?code=' + accessCode
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const expiresAtFormatted = expiresAt.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })

    saveAccessCode({
      code: accessCode, name: safeName, email: safeEmail, company: safeCompany,
      plan: plan || 'premium', expiresAt: expiresAt.toISOString(), createdAt: new Date().toISOString(),
    }).catch((err) => console.error('Zugangscode speichern fehlgeschlagen:', err.message))

    saveCustomerData({
      name: safeName, email: safeEmail, company: safeCompany,
      phone: safePhone || '–', plan: planName,
      paymentMethod: 'Mollie (' + paymentMethod + ')', amount: amount + ' €',
    }).catch(() => {})

    await sendConfirmationToCustomer({
      to: safeEmail,
      subject: 'Ihr Zugangscode - KI-Kompass ' + planName,
      html: '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><div style="background:#22c55e;color:white;padding:24px;border-radius:12px 12px 0 0;text-align:center;"><h1 style="margin:0;font-size:24px;">Zahlung erfolgreich!</h1><p style="margin:8px 0 0;opacity:0.9;">KI-Kompass ' + planName + '</p></div><div style="background:white;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;"><h2 style="color:#1e3a8a;margin-top:0;">Vielen Dank, ' + safeName + '!</h2><p>Ihre Zahlung &uuml;ber <strong>' + amount + ' &euro;</strong> wurde erfolgreich verarbeitet.</p><div style="background:#ecfdf5;border:2px solid #22c55e;border-radius:12px;padding:24px;margin:24px 0;text-align:center;"><p style="margin:0 0 8px;font-weight:bold;color:#065f46;">Ihr pers&ouml;nlicher Zugangscode:</p><div style="font-size:28px;font-weight:bold;font-family:monospace;color:#1e3a8a;background:white;padding:12px;border-radius:8px;letter-spacing:2px;">' + accessCode + '</div></div><div style="text-align:center;margin:24px 0;"><a href="' + accessLink + '" style="display:inline-block;background:#2563eb;color:white;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">Jetzt Premium Assessment starten</a></div><div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px;margin:16px 0;text-align:center;"><p style="margin:0;font-size:14px;color:#991b1b;font-weight:bold;">G&uuml;ltig bis: ' + expiresAtFormatted + ' (7 Tage)</p></div><p>Bei Fragen antworten Sie einfach auf diese E-Mail.</p><p>Mit freundlichen Gr&uuml;&szlig;en<br><strong>Steffen Hefter</strong><br>frimalo &ndash; KI-Beratung</p></div></div>',
    })

    await sendNotificationToOwner({
      subject: 'ZAHLUNG EINGEGANGEN: ' + planName + ' - ' + safeCompany + ' (' + amount + '€)',
      html: '<h2 style="color:#22c55e;">Mollie-Zahlung eingegangen!</h2><table style="border-collapse:collapse;width:100%;max-width:500px;"><tr style="background:#ecfdf5;"><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Produkt</td><td style="padding:10px;border:1px solid #ddd;font-weight:bold;color:#22c55e;">' + planName + ' (' + amount + ' €)</td></tr><tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:10px;border:1px solid #ddd;">' + safeName + '</td></tr><tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Firma</td><td style="padding:10px;border:1px solid #ddd;">' + safeCompany + '</td></tr><tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">E-Mail</td><td style="padding:10px;border:1px solid #ddd;"><a href="mailto:' + safeEmail + '">' + safeEmail + '</a></td></tr><tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Telefon</td><td style="padding:10px;border:1px solid #ddd;">' + safePhone + '</td></tr><tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Zahlungsart</td><td style="padding:10px;border:1px solid #ddd;">Mollie (' + paymentMethod + ')</td></tr><tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Mollie-ID</td><td style="padding:10px;border:1px solid #ddd;font-family:monospace;">' + paymentId + '</td></tr><tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Zugangscode</td><td style="padding:10px;border:1px solid #ddd;font-family:monospace;font-size:16px;">' + accessCode + '</td></tr></table><p style="color:#22c55e;font-weight:bold;margin-top:16px;">Alles automatisch erledigt! Der Kunde hat seinen Zugangscode bereits per E-Mail erhalten.</p>',
    })

    return NextResponse.json({ received: true, status: 'processed' })
  } catch (err) {
    console.error('Mollie Webhook-Fehler:', err.message)
    return NextResponse.json({ error: 'Webhook-Verarbeitung fehlgeschlagen' }, { status: 500 })
  }
}

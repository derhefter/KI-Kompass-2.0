// MOLLIE WEBHOOK - KI-Kompass V2
// Verarbeitet Mollie-Zahlungsstatus nach Bezahlung
// ENV: MOLLIE_API_KEY

import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getMollieClient } from '../../../lib/mollie'
import { sendNotificationToOwner, sendConfirmationToCustomer } from '../../../lib/mail'
import { saveAccessCode, saveCustomerData, findAccessCodeByPaymentId } from '../../../lib/google-sheets'
import { getCustomerEmailForPlan } from '../../../lib/email-templates'
import { rateLimit } from '../../../lib/rate-limit'

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }
  return String(text).replace(/[&<>"]/g, (m) => map[m])
}

function generateAccessCode(companyName) {
  const prefix = (companyName || 'KUNDE').replace(/[^a-zA-Z0-9]/g, '').slice(0, 6).toUpperCase()
  const suffix = crypto.randomBytes(8).toString('hex').toUpperCase()
  return prefix + '-' + suffix
}

// Idempotenz: In-Memory Cache als schneller erster Check (zusätzlich zur Google-Sheets-Prüfung)
const processedPayments = new Map()
const PROCESSED_TTL = 24 * 60 * 60 * 1000

setInterval(() => {
  const now = Date.now()
  for (const [key, timestamp] of processedPayments) {
    if (now - timestamp > PROCESSED_TTL) processedPayments.delete(key)
  }
}, 10 * 60 * 1000)

const webhookLimiter = rateLimit({ maxRequests: 10, windowMs: 60 * 1000 })

export async function POST(request) {
  try {
    // Rate-Limiting: Schutz gegen Webhook-Spam
    const { allowed } = webhookLimiter(request)
    if (!allowed) {
      return NextResponse.json({ error: 'Zu viele Anfragen' }, { status: 429 })
    }

    const mollieClient = getMollieClient()
    if (!mollieClient) return NextResponse.json({ error: 'Nicht konfiguriert' }, { status: 500 })

    const formData = await request.formData()
    const paymentId = formData.get('id')
    if (!paymentId || typeof paymentId !== 'string') return NextResponse.json({ error: 'Fehlende Payment-ID' }, { status: 400 })

    // Idempotenz-Check 1: Schneller In-Memory-Cache
    if (processedPayments.has(paymentId)) {
      return NextResponse.json({ received: true, status: 'already_processed' })
    }

    const payment = await mollieClient.payments.get(paymentId)
    if (payment.status !== 'paid') return NextResponse.json({ received: true, status: payment.status })

    // Idempotenz-Check 2: Persistente Prüfung in Google Sheets (überlebt Serverless-Neustarts)
    try {
      const existingCode = await findAccessCodeByPaymentId(paymentId)
      if (existingCode) {
        processedPayments.set(paymentId, Date.now()) // Cache aktualisieren
        return NextResponse.json({ received: true, status: 'already_processed' })
      }
    } catch (err) {
      console.error('Doppelzahlungs-Check fehlgeschlagen, fahre fort:', err.message)
      // Im Fehlerfall weitermachen (lieber doppelt als gar nicht verarbeiten)
    }

    // Als verarbeitet markieren (In-Memory)
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

    // Produktspezifisches Routing: Jedes Produkt hat eine eigene Zugangsseite
    function getAccessPath(p) {
      switch (p) {
        case 'kurs': return '/kurs-zugang'
        case 'toolbox-starter':
        case 'toolbox-pro': return '/toolbox-zugang'
        case 'benchmark': return '/benchmark-zugang'
        case 'monitoring-basic':
        case 'monitoring-pro': return '/monitoring-zugang'
        default: return '/premium'
      }
    }
    const accessLink = baseUrl + getAccessPath(plan) + '?code=' + accessCode
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const expiresAtFormatted = expiresAt.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })

    saveAccessCode({
      code: accessCode, name: safeName, email: safeEmail, company: safeCompany,
      plan: plan || 'premium', expiresAt: expiresAt.toISOString(), createdAt: new Date().toISOString(),
      paymentId,
    }).catch((err) => console.error('Zugangscode speichern fehlgeschlagen:', err.message))

    saveCustomerData({
      name: safeName, email: safeEmail, company: safeCompany,
      phone: safePhone || '–', plan: planName,
      paymentMethod: 'Mollie (' + paymentMethod + ')', amount: amount + ' €',
    }).catch(() => {})

    // Produktspezifische E-Mail an den Kunden senden
    const emailData = getCustomerEmailForPlan({
      plan: plan || 'premium',
      safeName, safeCompany, amount,
      accessCode, accessLink, expiresAtFormatted, planName,
    })

    await sendConfirmationToCustomer({
      to: safeEmail,
      subject: emailData.subject,
      html: emailData.html,
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

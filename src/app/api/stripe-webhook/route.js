// ============================================================
// STRIPE WEBHOOK - KI-Kompass V2
// ============================================================
// Verarbeitet Stripe-Events nach erfolgreicher Zahlung
// ENV: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
// ============================================================

import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import crypto from 'crypto'
import { sendNotificationToOwner, sendConfirmationToCustomer } from '../../../lib/mail'
import { saveAccessCode, saveCustomerData } from '../../../lib/google-sheets'

function generateAccessCode(companyName) {
  const prefix = (companyName || 'KUNDE')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 6)
    .toUpperCase()
  const suffix = crypto.randomBytes(3).toString('hex').toUpperCase()
  return `${prefix}-${suffix}`
}

export async function POST(request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Nicht konfiguriert' }, { status: 500 })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const body = await request.text()
    const sig = request.headers.get('stripe-signature')

    let event
    try {
      event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
      console.error('Webhook Signatur ungültig:', err.message)
      return NextResponse.json({ error: 'Ungültige Signatur' }, { status: 400 })
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const { plan, name, company } = session.metadata || {}
      const email = session.customer_email || ''
      const amount = session.amount_total ? (session.amount_total / 100).toFixed(0) : '0'

      const safeName = (name || '').slice(0, 200).replace(/[<>\r\n]/g, '')
      const safeCompany = (company || '').slice(0, 200).replace(/[<>\r\n]/g, '')
      const safeEmail = email.slice(0, 254).replace(/[<>\r\n"'&]/g, '')

      const planName = plan === 'strategie' ? 'Strategie-Paket' :
                       plan === 'zertifikat' ? 'KI-Zertifikat' :
                       plan === 'kurs' ? 'Online-Kurs' :
                       'Premium Report'

      // Zugangscode generieren
      const accessCode = generateAccessCode(safeCompany)
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ki-kompass.de'
      const accessLink = `${baseUrl}/premium?code=${accessCode}`
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      const expiresAtFormatted = expiresAt.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })

      // Google Sheets: Zugangscode speichern
      saveAccessCode({
        code: accessCode,
        name: safeName,
        email: safeEmail,
        company: safeCompany,
        plan: plan || 'premium',
        expiresAt: expiresAt.toISOString(),
        createdAt: new Date().toISOString(),
      }).catch((err) => console.error('Zugangscode speichern fehlgeschlagen:', err.message))

      // Google Sheets: Kundendaten speichern
      saveCustomerData({
        name: safeName,
        email: safeEmail,
        company: safeCompany,
        phone: '–',
        plan: planName,
        paymentMethod: 'Stripe',
        amount: `${amount} €`,
      }).catch(() => {})

      // E-Mail an Kunden mit Zugangscode
      await sendConfirmationToCustomer({
        to: safeEmail,
        subject: `Ihr Zugangscode - KI-Kompass ${planName}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#22c55e;color:white;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
              <h1 style="margin:0;font-size:24px;">Zahlung erfolgreich!</h1>
              <p style="margin:8px 0 0;opacity:0.9;">KI-Kompass ${planName}</p>
            </div>
            <div style="background:white;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
              <h2 style="color:#1e3a8a;margin-top:0;">Vielen Dank, ${safeName}!</h2>
              <p>Ihre Zahlung &uuml;ber <strong>${amount} &euro;</strong> wurde erfolgreich verarbeitet.</p>

              <div style="background:#ecfdf5;border:2px solid #22c55e;border-radius:12px;padding:24px;margin:24px 0;text-align:center;">
                <p style="margin:0 0 8px;font-weight:bold;color:#065f46;">Ihr pers&ouml;nlicher Zugangscode:</p>
                <div style="font-size:28px;font-weight:bold;font-family:monospace;color:#1e3a8a;background:white;padding:12px;border-radius:8px;letter-spacing:2px;">${accessCode}</div>
              </div>

              <div style="text-align:center;margin:24px 0;">
                <a href="${accessLink}" style="display:inline-block;background:#2563eb;color:white;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">Jetzt Premium Assessment starten</a>
              </div>

              <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px;margin:16px 0;text-align:center;">
                <p style="margin:0;font-size:14px;color:#991b1b;font-weight:bold;">G&uuml;ltig bis: ${expiresAtFormatted} (7 Tage)</p>
              </div>

              <p>Bei Fragen antworten Sie einfach auf diese E-Mail.</p>
              <p>Mit freundlichen Gr&uuml;&szlig;en<br><strong>Steffen Hefter</strong><br>frimalo &ndash; KI-Beratung</p>
            </div>
          </div>
        `,
      })

      // E-Mail an Owner
      await sendNotificationToOwner({
        subject: `STRIPE ZAHLUNG: ${planName} - ${safeCompany} (${amount}€)`,
        html: `
          <h2 style="color:#22c55e;">Stripe-Zahlung eingegangen!</h2>
          <table style="border-collapse:collapse;width:100%;max-width:500px;">
            <tr style="background:#ecfdf5;"><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Produkt</td><td style="padding:10px;border:1px solid #ddd;font-weight:bold;color:#22c55e;">${planName} (${amount} €)</td></tr>
            <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:10px;border:1px solid #ddd;">${safeName}</td></tr>
            <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Firma</td><td style="padding:10px;border:1px solid #ddd;">${safeCompany}</td></tr>
            <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">E-Mail</td><td style="padding:10px;border:1px solid #ddd;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
            <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Zahlungsart</td><td style="padding:10px;border:1px solid #ddd;">Stripe (automatisch)</td></tr>
            <tr><td style="padding:10px;border:1px solid #ddd;font-weight:bold;">Zugangscode</td><td style="padding:10px;border:1px solid #ddd;font-family:monospace;font-size:16px;">${accessCode}</td></tr>
          </table>
          <p style="color:#22c55e;font-weight:bold;margin-top:16px;">Alles automatisch erledigt! Der Kunde hat seinen Zugangscode bereits per E-Mail erhalten.</p>
        `,
      })
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook Fehler:', err.message)
    return NextResponse.json({ error: 'Webhook Fehler' }, { status: 500 })
  }
}

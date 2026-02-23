import { NextResponse } from 'next/server'
import { sendNotificationToOwner, sendConfirmationToCustomer } from '../../../lib/mail'
import { rateLimit } from '../../../lib/rate-limit'

const limiter = rateLimit({ maxRequests: 3, windowMs: 60 * 1000 })

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }
  return String(text).replace(/[&<>"']/g, (m) => map[m])
}

export async function POST(request) {
  try {
    const { allowed } = limiter(request)
    if (!allowed) return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 })
    const { name, email, company, phone, plan, message, website } = await request.json()
    if (!name || !email || !company) return NextResponse.json({ error: 'Name, E-Mail und Firma sind erforderlich' }, { status: 400 })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Ungueltige E-Mail' }, { status: 400 })
    const safeName = escapeHtml((name || '').slice(0, 200))
    const safeEmail = (email || '').slice(0, 200).replace(/[<>\r\n]/g, '')
    const safeCompany = escapeHtml((company || '').slice(0, 200))
    const safePhone = escapeHtml((phone || '').slice(0, 50))
    const safePlan = escapeHtml((plan || 'Nicht angegeben').slice(0, 50))
    const safeMessage = escapeHtml((message || '').slice(0, 2000))
    const safeWebsite = escapeHtml((website || '').slice(0, 200))
    const planLabels = { starter: 'Starter (99/Monat)', professional: 'Professional (199/Monat)', enterprise: 'Enterprise (499/Monat)' }
    await sendNotificationToOwner({
      subject: 'White-Label Anfrage: ' + safeCompany + ' - ' + (planLabels[plan] || safePlan),
      html: '<h2>Neue White-Label Anfrage</h2><p style="background:#f0fdf4;padding:12px;border-radius:8px;border-left:4px solid #22c55e;"><strong>Potenzielle Partnerschaft!</strong></p><table style="border-collapse:collapse;width:100%;max-width:500px;margin-top:16px;"><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">' + safeName + '</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Firma</td><td style="padding:8px;border:1px solid #ddd;">' + safeCompany + '</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">E-Mail</td><td style="padding:8px;border:1px solid #ddd;">' + safeEmail + '</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Telefon</td><td style="padding:8px;border:1px solid #ddd;">' + (safePhone || '-') + '</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Website</td><td style="padding:8px;border:1px solid #ddd;">' + (safeWebsite || '-') + '</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Paket</td><td style="padding:8px;border:1px solid #ddd;">' + (planLabels[plan] || safePlan) + '</td></tr></table>' + (safeMessage ? '<h3 style="margin-top:16px;">Nachricht:</h3><p style="background:#f3f4f6;padding:12px;border-radius:8px;">' + safeMessage + '</p>' : ''),
    })
    await sendConfirmationToCustomer({
      to: safeEmail,
      subject: 'Ihre White-Label Anfrage beim KI-Kompass',
      html: '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><div style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:30px;text-align:center;border-radius:12px 12px 0 0;"><h1 style="color:white;margin:0;font-size:24px;">Vielen Dank!</h1></div><div style="padding:30px;background:white;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;"><p>Hallo ' + safeName + ',</p><p>vielen Dank fuer Ihre Anfrage zur <strong>White-Label-Partnerschaft</strong>.</p><p>Ich melde mich innerhalb von <strong>24 Stunden</strong> bei Ihnen.</p><p>Mit freundlichen Gruessen,<br><strong>Steffen Hefter</strong><br>KI-Berater | frimalo</p></div></div>',
    })
    return NextResponse.json({ success: true })
  } catch { return NextResponse.json({ error: 'Serverfehler' }, { status: 500 }) }
}

import { NextResponse } from 'next/server'
import { rateLimit } from '../../../lib/rate-limit'
import { generateCertificateHTML, generateBadgeHTML, generateCertificateId } from '../../../lib/certificate'
import { sendNotificationToOwner, sendConfirmationToCustomer } from '../../../lib/mail'
import { customers } from '../../../data/customers'
import { findAccessCode } from '../../../lib/google-sheets'

const limiter = rateLimit({ maxRequests: 3, windowMs: 60 * 1000 })

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }
  return String(text || '').replace(/[&<>"]/g, (m) => map[m])
}

export async function POST(request) {
  try {
    const { allowed } = limiter(request)
    if (!allowed) return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 })
    const { code, companyName, contactName, contactEmail, level, levelTitle, percentage, categoryScores } = await request.json()

    // Zugangscode verifizieren
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
    }
    let customer = customers.find((c) => c.code === code.trim())
    if (!customer) {
      try {
        const sheetCustomer = await findAccessCode(code.trim())
        if (sheetCustomer && sheetCustomer.status !== 'deaktiviert') {
          customer = sheetCustomer
        }
      } catch { /* Weiter ohne Sheets */ }
    }
    if (!customer) {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
    }
    // Ablauf prüfen
    if (customer.expiresAt && new Date(customer.expiresAt) < new Date()) {
      return NextResponse.json({ error: 'Zugangscode abgelaufen' }, { status: 403 })
    }

    if (!companyName || !contactName || !contactEmail) return NextResponse.json({ error: 'Firmenname, Name und E-Mail erforderlich' }, { status: 400 })
    if (!percentage || !level) return NextResponse.json({ error: 'Assessment-Ergebnisse erforderlich' }, { status: 400 })

    const safeName = escapeHtml((contactName || '').slice(0, 200))
    const safeCompany = escapeHtml((companyName || '').slice(0, 200))
    const safeEmail = (contactEmail || '').slice(0, 254).replace(/[<>\r\n]/g, '')
    const safeLevel = parseInt(level) || 0
    const safeLevelTitle = escapeHtml((levelTitle || '').slice(0, 100))
    const safePercentage = parseInt(percentage) || 0

    const certificateId = generateCertificateId()
    const date = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })

    // Badge vs. Premium Zertifikat basierend auf Kundenplan
    const isBasic = customer.plan === 'zertifikat-basic'
    const certificateHTML = isBasic
      ? generateBadgeHTML({ companyName: safeCompany, contactName: safeName, date, level: safeLevel, levelTitle: safeLevelTitle, percentage: safePercentage, certificateId })
      : generateCertificateHTML({ companyName: safeCompany, contactName: safeName, date, level: safeLevel, levelTitle: safeLevelTitle, percentage: safePercentage, categoryScores, certificateId })

    const filename = isBasic
      ? 'KI-Readiness-Badge-' + safeCompany.replace(/[^a-zA-Z0-9]/g, '-') + '.html'
      : 'KI-Readiness-Zertifikat-' + safeCompany.replace(/[^a-zA-Z0-9]/g, '-') + '.html'

    const productLabel = isBasic ? 'Basic Badge' : 'Premium Zertifikat'
    const printHint = isBasic
      ? 'Oeffnen Sie die Datei im Browser. Sie koennen einen Screenshot erstellen und auf Ihrer Website einbetten.'
      : 'Oeffnen Sie die Datei im Browser und drucken Sie sie als PDF (Querformat, Strg+P).'

    await sendConfirmationToCustomer({
      to: safeEmail,
      subject: 'Ihr KI-Readiness ' + productLabel + ' - ' + safeCompany,
      html: '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><div style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:30px;text-align:center;border-radius:12px 12px 0 0;"><h1 style="color:white;margin:0;font-size:24px;">Ihr KI-Readiness ' + productLabel + '</h1></div><div style="padding:30px;background:white;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;"><p>Hallo ' + safeName + ',</p><p>Ihr ' + productLabel + ' ist fertig!</p><div style="background:#f0fdf4;padding:16px;border-radius:8px;margin:20px 0;text-align:center;"><div style="font-size:36px;font-weight:bold;color:#2563eb;">' + safePercentage + '%</div><div style="font-size:18px;font-weight:bold;color:#1e3a8a;">Level ' + safeLevel + ': ' + safeLevelTitle + '</div><div style="font-size:12px;color:#6b7280;margin-top:8px;">Zertifikat-Nr.: ' + certificateId + '</div></div><p>' + printHint + '</p><p>Mit freundlichen Gruessen,<br><strong>Steffen Hefter</strong><br>KI-Berater | frimalo</p></div></div>',
      attachments: [{ filename, content: certificateHTML, contentType: 'text/html' }],
    })
    sendNotificationToOwner({
      subject: productLabel + ' erstellt: ' + safeCompany + ' - Level ' + safeLevel + ' (' + safePercentage + '%)',
      html: '<h2>Neues Zertifikat erstellt</h2><table style="border-collapse:collapse;width:100%;max-width:400px;"><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Firma</td><td style="padding:8px;border:1px solid #ddd;">' + safeCompany + '</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Kontakt</td><td style="padding:8px;border:1px solid #ddd;">' + safeName + '</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">E-Mail</td><td style="padding:8px;border:1px solid #ddd;">' + safeEmail + '</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Score</td><td style="padding:8px;border:1px solid #ddd;">' + safePercentage + '%</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Level</td><td style="padding:8px;border:1px solid #ddd;">' + safeLevel + ': ' + safeLevelTitle + '</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Zertifikat-Nr.</td><td style="padding:8px;border:1px solid #ddd;">' + certificateId + '</td></tr></table>',
    }).catch(() => {})
    return NextResponse.json({ success: true, certificateId })
  } catch { return NextResponse.json({ error: 'Serverfehler' }, { status: 500 }) }
}

import { NextResponse } from 'next/server'
import { rateLimit } from '../../../lib/rate-limit'
import { generateCertificateHTML, generateCertificateId } from '../../../lib/certificate'
import { sendNotificationToOwner, sendConfirmationToCustomer } from '../../../lib/mail'

const limiter = rateLimit({ maxRequests: 3, windowMs: 60 * 1000 })

export async function POST(request) {
  try {
    const { allowed } = limiter(request)
    if (!allowed) return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 })
    const { companyName, contactName, contactEmail, level, levelTitle, percentage, categoryScores } = await request.json()
    if (!companyName || !contactName || !contactEmail) return NextResponse.json({ error: 'Firmenname, Name und E-Mail erforderlich' }, { status: 400 })
    if (!percentage || !level) return NextResponse.json({ error: 'Assessment-Ergebnisse erforderlich' }, { status: 400 })
    const certificateId = generateCertificateId()
    const date = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })
    const certificateHTML = generateCertificateHTML({ companyName, contactName, date, level, levelTitle, percentage, categoryScores, certificateId })
    await sendConfirmationToCustomer({
      to: contactEmail,
      subject: 'Ihr KI-Readiness Zertifikat - ' + companyName,
      html: '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><div style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:30px;text-align:center;border-radius:12px 12px 0 0;"><h1 style="color:white;margin:0;font-size:24px;">Ihr KI-Readiness Zertifikat</h1></div><div style="padding:30px;background:white;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;"><p>Hallo ' + contactName + ',</p><p>Ihr Zertifikat ist fertig.</p><div style="background:#f0fdf4;padding:16px;border-radius:8px;margin:20px 0;text-align:center;"><div style="font-size:36px;font-weight:bold;color:#2563eb;">' + percentage + '%</div><div style="font-size:18px;font-weight:bold;color:#1e3a8a;">Level ' + level + ': ' + levelTitle + '</div><div style="font-size:12px;color:#6b7280;margin-top:8px;">Zertifikat-Nr.: ' + certificateId + '</div></div><p>Im Anhang finden Sie Ihr Zertifikat als HTML-Datei. Oeffnen Sie die Datei im Browser und drucken Sie sie als PDF (Querformat).</p><p>Mit freundlichen Gruessen,<br><strong>Steffen Hefter</strong><br>KI-Berater | frimalo</p></div></div>',
      attachments: [{ filename: 'KI-Readiness-Zertifikat-' + companyName.replace(/[^a-zA-Z0-9]/g, '-') + '.html', content: certificateHTML, contentType: 'text/html' }],
    })
    sendNotificationToOwner({
      subject: 'Zertifikat erstellt: ' + companyName + ' - Level ' + level + ' (' + percentage + '%)',
      html: '<h2>Neues Zertifikat erstellt</h2><table style="border-collapse:collapse;width:100%;max-width:400px;"><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Firma</td><td style="padding:8px;border:1px solid #ddd;">' + companyName + '</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Kontakt</td><td style="padding:8px;border:1px solid #ddd;">' + contactName + '</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">E-Mail</td><td style="padding:8px;border:1px solid #ddd;">' + contactEmail + '</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Score</td><td style="padding:8px;border:1px solid #ddd;">' + percentage + '%</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Level</td><td style="padding:8px;border:1px solid #ddd;">' + level + ': ' + levelTitle + '</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Zertifikat-Nr.</td><td style="padding:8px;border:1px solid #ddd;">' + certificateId + '</td></tr></table>',
    }).catch(() => {})
    return NextResponse.json({ success: true, certificateId })
  } catch { return NextResponse.json({ error: 'Serverfehler' }, { status: 500 }) }
}

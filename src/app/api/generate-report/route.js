import { NextResponse } from 'next/server'
import { customers } from '../../../data/customers'
import { sendNotificationToOwner, sendConfirmationToCustomer } from '../../../lib/mail'
import { rateLimit } from '../../../lib/rate-limit'
import { findAccessCode } from '../../../lib/google-sheets'
import { premiumQuestions, calculateScore, getRecommendations, getQuickWins, foerderprogramme } from '../../../data/questions'
import { generatePDFReportHTML } from '../../../lib/pdf-report'

const limiter = rateLimit({ maxRequests: 3, windowMs: 60 * 1000 })

export async function POST(request) {
  try {
    const { allowed } = limiter(request)
    if (!allowed) {
      return NextResponse.json({ error: 'Zu viele Versuche.' }, { status: 429 })
    }

    const { code, companyName, contactName, contactEmail, results } = await request.json()

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
    }

    // Code verifizieren
    let customer = customers.find((c) => c.code === code.trim())
    if (!customer) {
      try {
        const sheetCustomer = await findAccessCode(code.trim())
        if (sheetCustomer && sheetCustomer.status !== 'deaktiviert') {
          customer = sheetCustomer
        }
      } catch {
        // Weiter ohne Sheets
      }
    }
    if (!customer) {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
    }

    const safeName = (contactName || '').slice(0, 200).replace(/[<>\r\n]/g, '')
    const safeCompany = (companyName || '').slice(0, 200).replace(/[<>\r\n]/g, '')
    const safeEmail = (contactEmail || '').slice(0, 200).replace(/[<>\r\n]/g, '')

    const { percentage, level, levelTitle, levelDescription, levelColor, categoryScores, quickWins, recommendations, answers } = results || {}

    const datum = new Date().toLocaleDateString('de-DE')

    // PDF-Report als HTML generieren
    const reportHTML = generatePDFReportHTML({
      companyName: safeCompany,
      contactName: safeName,
      contactEmail: safeEmail,
      datum,
      percentage,
      level,
      levelTitle,
      levelDescription,
      levelColor,
      categoryScores,
      recommendations,
      quickWins,
      foerderprogramme,
      answers,
      questions: premiumQuestions,
    })

    const reportFilename = `KI-Readiness-Report_${safeCompany.replace(/[^a-zA-Z0-9äöüÄÖÜß]/g, '_')}_${datum.replace(/\./g, '-')}.html`

    // E-Mail an Kunden mit Report als Anhang
    await sendConfirmationToCustomer({
      to: safeEmail,
      subject: `Ihr KI-Readiness Report - ${safeCompany} (${percentage}%)`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#2563eb,#7c3aed);padding:32px;border-radius:12px 12px 0 0;text-align:center;">
            <h1 style="color:white;margin:0;font-size:24px;">Ihr KI-Readiness Report ist fertig!</h1>
            <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;">${safeCompany} &bull; ${datum}</p>
          </div>
          <div style="background:white;padding:32px;border:1px solid #e5e7eb;border-top:none;">
            <p>Hallo ${safeName},</p>
            <p>Ihr umfassender KI-Readiness Report (20+ Seiten) liegt im Anhang dieser E-Mail bereit.</p>
            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:20px;text-align:center;margin:20px 0;">
              <div style="font-size:48px;font-weight:bold;color:#2563eb;">${percentage}%</div>
              <div style="font-size:18px;font-weight:bold;">Level ${level}: ${levelTitle}</div>
            </div>
            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:20px 0;">
              <h3 style="margin-top:0;color:#2563eb;">So nutzen Sie Ihren Report</h3>
              <ol>
                <li>&Ouml;ffnen Sie den HTML-Anhang in Ihrem Browser</li>
                <li>Drucken Sie ihn als PDF (Strg+P &rarr; &bdquo;Als PDF speichern&ldquo;)</li>
                <li>Starten Sie mit den Quick-Wins aus Kapitel 4</li>
              </ol>
            </div>
            <p>Bei Fragen antworten Sie einfach auf diese E-Mail.</p>
            <p>Mit freundlichen Gr&uuml;&szlig;en<br><strong>Steffen Hefter</strong><br>frimalo &ndash; KI-Beratung</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: reportFilename,
          content: reportHTML,
          contentType: 'text/html',
        },
      ],
    })

    // Benachrichtigung an Owner
    await sendNotificationToOwner({
      subject: `Report automatisch versendet: ${safeCompany} - ${percentage}%`,
      html: `
        <h2 style="color:#22c55e;">PDF-Report automatisch versendet!</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Firma</td><td style="padding:8px;border:1px solid #ddd;">${safeCompany}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${safeName}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">E-Mail</td><td style="padding:8px;border:1px solid #ddd;">${safeEmail}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Score</td><td style="padding:8px;border:1px solid #ddd;">${percentage}% (Level ${level})</td></tr>
        </table>
        <p style="color:#22c55e;font-weight:bold;margin-top:16px;">Der Report wurde automatisch an den Kunden versendet. Kein manuelles Erstellen notwendig!</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}

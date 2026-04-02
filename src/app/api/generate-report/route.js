// ============================================================
// Report-Generierung – EDITORIAL WORKFLOW
// ============================================================
// Neuer Flow (ab April 2026):
//   1. Assessment abgeschlossen → dieser Endpunkt wird aufgerufen
//   2. Report-Daten werden in Google Sheets (Tab "Berichte") gespeichert
//   3. Steffen bekommt E-Mail mit dem Report-HTML zum Vorab-Check
//      UND einem Link zum Dashboard
//   4. Steffen prüft, ergänzt ggf. eine persönliche Notiz
//   5. Klickt im Dashboard auf "Freigeben & Senden"
//   6. → /api/admin/reports POST sendet Report an Kunden
// ============================================================
import { NextResponse } from 'next/server'
import { customers } from '../../../data/customers'
import { sendNotificationToOwner } from '../../../lib/mail'
import { saveToQueue } from '../../../lib/content-queue'
import { rateLimit } from '../../../lib/rate-limit'
import { findAccessCode } from '../../../lib/google-sheets'
import { premiumQuestions, foerderprogramme } from '../../../data/questions'
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
        if (sheetCustomer && sheetCustomer.status !== 'deaktiviert') customer = sheetCustomer
      } catch { /* Weiter ohne Sheets */ }
    }
    if (!customer) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
    if (customer.expiresAt && new Date(customer.expiresAt) < new Date()) {
      return NextResponse.json({ error: 'Zugangscode abgelaufen' }, { status: 403 })
    }

    const safeName = (contactName || '').slice(0, 200).replace(/[<>\r\n]/g, '')
    const safeCompany = (companyName || '').slice(0, 200).replace(/[<>\r\n]/g, '')
    const safeEmail = (contactEmail || '').slice(0, 200).replace(/[<>\r\n]/g, '')

    const reportId = `RPT-${Date.now()}`
    const datum = new Date().toLocaleDateString('de-DE')

    // 1. Report-HTML für Steffen-Vorschau generieren
    const { percentage, level, levelTitle, levelDescription, levelColor, categoryScores, quickWins, recommendations, answers } = results || {}
    const reportHTML = generatePDFReportHTML({
      companyName: safeCompany, contactName: safeName, contactEmail: safeEmail, datum,
      percentage, level, levelTitle, levelDescription, levelColor,
      categoryScores, recommendations, quickWins, foerderprogramme, answers, questions: premiumQuestions,
    })

    const reportFilename = `VORABCHECK_${safeCompany.replace(/[^a-zA-Z0-9]/g, '_')}_${datum.replace(/\./g, '-')}.html`

    // 2. Report in die uniforme Content Queue speichern
    const queueId = await saveToQueue({
      type: 'report',
      recipientName: safeName,
      recipientEmail: safeEmail,
      companyName: safeCompany,
      subject: `Ihr KI-Readiness Report – ${safeCompany} (${percentage}%)`,
      htmlContent: '', // Report wird als Anhang geliefert, kein separater E-Mail-Body nötig
      metadata: { reportId, percentage, level, levelTitle, plan: customer.plan },
      attachmentHtml: reportHTML,
    })
    const saved = !!queueId

    // 3. Steffen benachrichtigen (Report als Anhang + Dashboard-Link)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.derhefter.com'
    await sendNotificationToOwner({
      subject: `📋 Neuer Report zur Freigabe: ${safeCompany} – ${percentage}%`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#1e3a5f,#2563eb);padding:24px;border-radius:12px 12px 0 0;">
            <h1 style="color:white;margin:0;font-size:20px;">📋 Neuer Report zur Freigabe</h1>
          </div>
          <div style="background:white;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
            <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
              <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#f8fafc;">Firma</td><td style="padding:6px 12px;border:1px solid #e5e7eb;">${safeCompany}</td></tr>
              <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#f8fafc;">Ansprechpartner</td><td style="padding:6px 12px;border:1px solid #e5e7eb;">${safeName}</td></tr>
              <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#f8fafc;">E-Mail</td><td style="padding:6px 12px;border:1px solid #e5e7eb;">${safeEmail}</td></tr>
              <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#f8fafc;">Score</td><td style="padding:6px 12px;border:1px solid #e5e7eb;"><strong>${percentage}% – Level ${level}: ${levelTitle}</strong></td></tr>
              <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#f8fafc;">Report-ID</td><td style="padding:6px 12px;border:1px solid #e5e7eb;font-family:monospace;">${reportId}</td></tr>
            </table>
            <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:16px;margin-bottom:16px;">
              <p style="margin:0 0 8px;font-weight:bold;color:#92400e;">📌 Nächster Schritt</p>
              <p style="margin:0;color:#78350f;font-size:14px;">Den Report-HTML-Anhang öffnen, prüfen – dann im Dashboard freigeben und persönliche Notiz ergänzen.</p>
            </div>
            <a href="${baseUrl}/dashboard" style="display:inline-block;background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">
              → Im Dashboard freigeben
            </a>
            <p style="margin-top:12px;font-size:12px;color:#94a3b8;">${saved ? '✓ In Google Sheets gespeichert (Tab „Berichte")' : '⚠ Google Sheets nicht erreichbar – Report nur per E-Mail gespeichert'}</p>
          </div>
        </div>
      `,
      attachments: [{ filename: reportFilename, content: reportHTML, contentType: 'text/html' }],
    })

    // Kunde bekommt zunächst nur eine Eingangsbestätigung
    return NextResponse.json({ success: true, reportId, queueId, pendingApproval: true })
  } catch (err) {
    console.error('generate-report Fehler:', err)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}

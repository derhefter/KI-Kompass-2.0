// ============================================================
// Admin API: Pending Reports verwalten
// GET  /api/admin/reports         → Liste aller pendenden Reports
// POST /api/admin/reports/send    → Report freigeben und an Kunden senden
// ============================================================
import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { verifyAdminToken } from '../login/route'
import { sendConfirmationToCustomer } from '../../../../lib/mail'
import { generatePDFReportHTML } from '../../../../lib/pdf-report'
import { premiumQuestions, foerderprogramme } from '../../../../data/questions'

function verifyAdmin(request) {
  const token = request.headers.get('x-admin-token')
  return verifyAdminToken(token)
}

async function getSheets() {
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!key) return null
  try {
    const credentials = JSON.parse(key)
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
    const client = await auth.getClient()
    return google.sheets({ version: 'v4', auth: client })
  } catch {
    return null
  }
}

function extractSheetId(v) {
  if (!v) return null
  const cleaned = v.trim().replace(/[\r\n]+/g, '')
  const m = cleaned.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/)
  return m ? m[1] : cleaned
}

// GET: Liste pendender Reports
export async function GET(request) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })

  const sheets = await getSheets()
  const sheetId = extractSheetId(process.env.GOOGLE_SHEET_PREMIUM_RESULTS)

  if (!sheets || !sheetId) {
    return NextResponse.json({ reports: [], error: 'Google Sheets nicht konfiguriert' })
  }

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Berichte!A:O',
    })
    const rows = res.data.values || []
    if (rows.length <= 1) return NextResponse.json({ reports: [] })

    const reports = rows.slice(1).map((row, i) => ({
      rowIndex: i + 2, // 1-indexed, +1 for header
      id: row[0] || '',
      datum: row[1] || '',
      firma: row[2] || '',
      name: row[3] || '',
      email: row[4] || '',
      score: row[5] || '',
      level: row[6] || '',
      levelTitle: row[7] || '',
      status: row[8] || 'pending',
      gesendetAm: row[9] || '',
      persNote: row[10] || '',
      // row[11-14] = JSON der Results (wird für Report-Regenerierung gespeichert)
      resultsJson: row[11] || '{}',
    })).filter((r) => r.status === 'pending')

    return NextResponse.json({ reports })
  } catch (err) {
    return NextResponse.json({ reports: [], error: err.message })
  }
}

// POST: Report freigeben und senden
export async function POST(request) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })

  const { reportId, rowIndex, persNote } = await request.json()

  const sheets = await getSheets()
  const sheetId = extractSheetId(process.env.GOOGLE_SHEET_PREMIUM_RESULTS)

  if (!sheets || !sheetId) {
    return NextResponse.json({ error: 'Google Sheets nicht konfiguriert' }, { status: 500 })
  }

  try {
    // Report-Daten aus Sheet laden
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `Berichte!A${rowIndex}:O${rowIndex}`,
    })
    const row = (res.data.values || [[]])[0]
    if (!row || row.length === 0) return NextResponse.json({ error: 'Report nicht gefunden' }, { status: 404 })

    const contactName = row[3] || ''
    const contactEmail = row[4] || ''
    const companyName = row[2] || ''
    const percentage = parseInt(row[5]) || 0
    const datum = new Date().toLocaleDateString('de-DE')

    let results = {}
    try { results = JSON.parse(row[11] || '{}') } catch {}

    // HTML-Report regenerieren
    const reportHTML = generatePDFReportHTML({
      companyName,
      contactName,
      contactEmail,
      datum,
      percentage: results.percentage || percentage,
      level: results.level,
      levelTitle: results.levelTitle,
      levelDescription: results.levelDescription,
      levelColor: results.levelColor,
      categoryScores: results.categoryScores || [],
      recommendations: results.recommendations || [],
      quickWins: results.quickWins || [],
      foerderprogramme,
      answers: results.answers || [],
      questions: premiumQuestions,
      persNote: persNote || '',
    })

    const reportFilename = `KI-Report_${companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${datum.replace(/\./g, '-')}.html`

    // Report an Kunden senden
    const sent = await sendConfirmationToCustomer({
      to: contactEmail,
      subject: `Ihr persönlicher KI-Report ist fertig – ${companyName} (${percentage}%)`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#1e3a5f,#2563eb);padding:32px;border-radius:12px 12px 0 0;text-align:center;">
            <h1 style="color:white;margin:0;font-size:22px;">Ihr KI-Report ist fertig!</h1>
            <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;">${companyName} &bull; ${datum}</p>
          </div>
          <div style="background:white;padding:32px;border:1px solid #e5e7eb;border-top:none;">
            <p>Hallo ${contactName},</p>
            ${persNote ? `<div style="background:#f0f9ff;border-left:4px solid #2563eb;padding:16px;margin:16px 0;border-radius:0 8px 8px 0;"><p style="margin:0;font-style:italic;color:#1e3a5f;">${persNote.replace(/\n/g, '<br/>')}</p><p style="margin:8px 0 0;font-size:12px;color:#64748b;">– Steffen Hefter</p></div>` : ''}
            <p>Ihr umfassender KI-Report (20+ Seiten) liegt im Anhang dieser E-Mail. Öffnen Sie die HTML-Datei in Ihrem Browser und speichern Sie sie als PDF (Strg+P → PDF).</p>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;text-align:center;margin:20px 0;">
              <div style="font-size:42px;font-weight:bold;color:#2563eb;">${percentage}%</div>
              <div style="font-size:16px;font-weight:bold;color:#1e3a5f;">Level ${results.level || ''}: ${results.levelTitle || ''}</div>
            </div>
            <p><strong>So nutzen Sie Ihren Report:</strong></p>
            <ol style="color:#475569;line-height:1.8;">
              <li>HTML-Anhang im Browser öffnen</li>
              <li>Als PDF drucken (Strg+P → Als PDF speichern)</li>
              <li>Mit Quick-Win #1 aus Kapitel 4 starten</li>
            </ol>
            <p>Bei Fragen antworten Sie einfach auf diese E-Mail – ich melde mich persönlich.</p>
            <p>Herzliche Grüße<br><strong>Steffen Hefter</strong><br>frimalo – KI-Beratung für KMU<br><a href="https://www.derhefter.com" style="color:#2563eb;">www.derhefter.com</a></p>
          </div>
        </div>
      `,
      attachments: [{ filename: reportFilename, content: reportHTML, contentType: 'text/html' }],
    })

    if (!sent) return NextResponse.json({ error: 'E-Mail-Versand fehlgeschlagen' }, { status: 500 })

    // Status in Sheet auf "gesendet" setzen
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `Berichte!I${rowIndex}:J${rowIndex}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [['gesendet', new Date().toISOString()]] },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

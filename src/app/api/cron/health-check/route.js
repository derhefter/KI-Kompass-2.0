// Autonomer Health-Check via Vercel-Cron (täglich).
// Prüft Sheets, Mail-SMTP, Mollie. Bei Fehler → Owner-Notification.
// Bei Mail-Ausfall greift der Fallback-Webhook (OWNER_FALLBACK_WEBHOOK_URL),
// damit Steffen den Ausfall trotzdem mitkriegt.
//
// Auth: Bearer CRON_SECRET (von Vercel-Cron) ODER x-admin-token (manueller Trigger).

import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { sendNotificationToOwner, verifyMailTransport } from '../../../../lib/mail'
import { getMollieClient } from '../../../../lib/mollie'
import { verifyAdminToken } from '../../admin/login/route'

function extractSheetId(value) {
  if (!value) return null
  const cleaned = value.trim().replace(/[\r\n]+/g, '')
  const m = cleaned.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/)
  return m ? m[1] : cleaned
}

async function checkSheets() {
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!key || !key.trim().startsWith('{')) return { ok: false, error: 'GOOGLE_SERVICE_ACCOUNT_KEY fehlt' }
  const sheetId = extractSheetId(process.env.GOOGLE_SHEET_CUSTOMERS)
  if (!sheetId) return { ok: false, error: 'GOOGLE_SHEET_CUSTOMERS fehlt' }
  try {
    const credentials = JSON.parse(key)
    const auth = new google.auth.GoogleAuth({ credentials, scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] })
    const client = await auth.getClient()
    const sheets = google.sheets({ version: 'v4', auth: client })
    await sheets.spreadsheets.get({ spreadsheetId: sheetId, fields: 'spreadsheetId' })
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err.message?.slice(0, 200) || 'unknown' }
  }
}

async function checkMail() {
  try {
    await verifyMailTransport()
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err.message?.slice(0, 200) || 'unknown' }
  }
}

async function checkMollie() {
  const client = getMollieClient()
  if (!client) return { ok: false, error: 'MOLLIE_API_KEY nicht konfiguriert' }
  try {
    await client.payments.page({ limit: 1 })
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err.message?.slice(0, 200) || 'unknown' }
  }
}

// Anti-Spam: nicht jeden Tag eine Reminder-Mail wenn der Defekt anhält.
// Wir hängen einen ISO-Datum-Stempel an die Subject-Zeile, damit du sofort
// erkennst, dass das Issue weiter besteht (Mail-Threading).
function buildSubject(failed) {
  const today = new Date().toISOString().slice(0, 10)
  return `[HEALTH-FEHLER ${today}] ${failed.join(' + ')} nicht erreichbar`
}

function buildHtml(checks) {
  const rows = Object.entries(checks).map(([name, res]) => {
    const status = res.ok ? '✅ OK' : `❌ ${res.error || 'FEHLER'}`
    const color = res.ok ? '#16a34a' : '#dc2626'
    return `<tr>
      <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:bold;text-transform:uppercase;">${name}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:${color};">${status}</td>
    </tr>`
  }).join('')

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#dc2626;color:white;padding:20px;border-radius:12px 12px 0 0;">
        <h1 style="margin:0;font-size:20px;">⚠ Health-Check fehlgeschlagen</h1>
        <p style="margin:6px 0 0;opacity:0.9;font-size:13px;">Der tägliche Selbsttest hat ein Problem entdeckt.</p>
      </div>
      <div style="background:white;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:24px;">
        <table style="width:100%;border-collapse:collapse;">${rows}</table>
        <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:12px;margin-top:20px;">
          <p style="margin:0 0 6px;font-weight:bold;color:#92400e;">Schnell-Diagnose im Dashboard:</p>
          <ol style="margin:0;padding-left:20px;font-size:14px;color:#78350f;">
            <li>Im Dashboard einloggen → F12 → Console</li>
            <li>Einzeiler aus BEDIENUNGSANLEITUNG.md Abschnitt 6a ausführen</li>
            <li>Fix-Mapping in der Tabelle dort folgen</li>
          </ol>
        </div>
        <p style="font-size:12px;color:#6b7280;margin-top:16px;">Zeitpunkt: ${new Date().toLocaleString('de-DE')} • Diese Mail kommt nur, wenn etwas hakt.</p>
      </div>
    </div>
  `
}

async function runCheck() {
  const [sheets, mail, mollie] = await Promise.all([checkSheets(), checkMail(), checkMollie()])
  return { sheets, mail, mollie }
}

export async function GET(request) {
  // Auth: Cron oder Admin
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  const isVercelCron = cronSecret && authHeader === `Bearer ${cronSecret}`
  const isAdmin = verifyAdminToken(request.headers.get('x-admin-token'))

  if (!isVercelCron && !isAdmin) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
  }

  const checks = await runCheck()
  const failed = Object.entries(checks).filter(([, r]) => !r.ok).map(([name]) => name)
  const allOk = failed.length === 0

  if (!allOk) {
    // sendNotificationToOwner nutzt automatisch den Fallback-Webhook,
    // wenn SMTP selbst ausgefallen ist.
    await sendNotificationToOwner({
      subject: buildSubject(failed),
      html: buildHtml(checks),
    }).catch((err) => console.error('Health-Check Notification fehlgeschlagen:', err.message))
  }

  return NextResponse.json({
    ok: allOk,
    timestamp: new Date().toISOString(),
    checks,
    notified: !allOk,
  })
}

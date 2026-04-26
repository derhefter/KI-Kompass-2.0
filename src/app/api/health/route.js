// Admin-Health-Check: prüft ob Sheets, Mail und Mollie erreichbar sind.
// Zugang via x-admin-token Header.

import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { requireAdmin } from '../../../lib/admin-auth'
import { verifyMailTransport } from '../../../lib/mail'
import { getMollieClient } from '../../../lib/mollie'

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
    // 1 Zahlung holen genügt als Liveness-Test (200 = API-Key gültig)
    await client.payments.page({ limit: 1 })
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err.message?.slice(0, 200) || 'unknown' }
  }
}

export async function GET(request) {
  const unauthorized = requireAdmin(request)
  if (unauthorized) return unauthorized

  const [sheets, mail, mollie] = await Promise.all([checkSheets(), checkMail(), checkMollie()])
  const allOk = sheets.ok && mail.ok && mollie.ok

  return NextResponse.json(
    {
      ok: allOk,
      timestamp: new Date().toISOString(),
      checks: { sheets, mail, mollie },
    },
    { status: allOk ? 200 : 503 },
  )
}

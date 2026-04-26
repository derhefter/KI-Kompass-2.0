import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../../lib/admin-auth'
import { google } from 'googleapis'

function extractSheetId(value) {
  if (!value) return null
  const urlMatch = value.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/)
  if (urlMatch) return urlMatch[1]
  return value.trim()
}

export async function POST(request) {
  const unauthorized = requireAdmin(request)
  if (unauthorized) return unauthorized
  try {
    const { code, days: rawDays } = await request.json()
    const days = parseInt(rawDays, 10)
    if (!code || !Number.isFinite(days) || days < 1 || days > 3650) {
      return NextResponse.json({ error: 'Code und gueltige Tageszahl (1-3650) erforderlich' }, { status: 400 })
    }
    const codeTrimmed = String(code).trim().slice(0, 100)
    const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
    if (!credentials) {
      return NextResponse.json({ error: 'Google Sheets nicht konfiguriert' }, { status: 500 })
    }
    const parsed = JSON.parse(credentials)
    const auth = new google.auth.GoogleAuth({ credentials: parsed, scopes: ['https://www.googleapis.com/auth/spreadsheets'] })
    const client = await auth.getClient()
    const sheets = google.sheets({ version: 'v4', auth: client })
    const sheetId = extractSheetId(process.env.GOOGLE_SHEET_CUSTOMERS)
    if (!sheetId) {
      return NextResponse.json({ error: 'Kunden-Sheet nicht konfiguriert' }, { status: 500 })
    }
    const res = await sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: 'Zugangscodes!A:H' })
    const rows = res.data.values || []
    let rowIndex = -1
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] && rows[i][0].trim() === codeTrimmed) { rowIndex = i; break }
    }
    if (rowIndex === -1) {
      return NextResponse.json({ error: 'Zugangscode nicht gefunden' }, { status: 404 })
    }
    const currentExpiry = rows[rowIndex][6] ? new Date(rows[rowIndex][6]) : new Date()
    const baseDate = currentExpiry > new Date() ? currentExpiry : new Date()
    const newExpiry = new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000)
    const updateRange = 'Zugangscodes!G' + (rowIndex + 1) + ':H' + (rowIndex + 1)
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId, range: updateRange, valueInputOption: 'USER_ENTERED',
      requestBody: { values: [[newExpiry.toISOString(), 'aktiv']] },
    })
    return NextResponse.json({ success: true, code: codeTrimmed, newExpiry: newExpiry.toISOString(), message: 'Code verlaengert bis ' + newExpiry.toLocaleDateString('de-DE') })
  } catch (err) {
    console.error('Extend-Code Fehler:', err.message)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}

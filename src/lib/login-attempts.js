// Persistenter Brute-Force-Schutz für Admin-Login.
//
// Schreibt jeden Login-Versuch in den Tab "LoginAttempts" des Customers-Sheet.
// Ein Tab wird automatisch angelegt, wenn er fehlt. Bei Sheets-Ausfall
// fällt der Code graceful auf "erlauben" zurück (Logging) – der zusätzliche
// In-Memory-Limiter im Login-Handler bleibt als zweite Verteidigung aktiv.

import { google } from 'googleapis'

const TAB_NAME = 'LoginAttempts'
const HEADER = ['IP', 'Timestamp', 'Success', 'Reason']
const WINDOW_MS = 15 * 60 * 1000
const MAX_FAILURES = 5

let cachedSheets = null
let cachedSheetId = null
let tabEnsured = false

function extractSheetId(value) {
  if (!value) return null
  const cleaned = value.trim().replace(/[\r\n]+/g, '')
  const m = cleaned.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/)
  return m ? m[1] : cleaned
}

async function getSheetsClient() {
  if (cachedSheets) return cachedSheets
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!key || !key.trim().startsWith('{')) return null
  try {
    const credentials = JSON.parse(key)
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
    const client = await auth.getClient()
    cachedSheets = google.sheets({ version: 'v4', auth: client })
    return cachedSheets
  } catch (err) {
    console.warn('LoginAttempts: Sheets-Auth fehlgeschlagen:', err.message)
    return null
  }
}

function getCustomersSheetId() {
  if (cachedSheetId) return cachedSheetId
  cachedSheetId = extractSheetId(process.env.GOOGLE_SHEET_CUSTOMERS)
  return cachedSheetId
}

// Legt den Tab + Header-Zeile an, falls fehlend. Idempotent.
async function ensureTab(sheets, spreadsheetId) {
  if (tabEnsured) return true
  try {
    const meta = await sheets.spreadsheets.get({ spreadsheetId, fields: 'sheets.properties.title' })
    const exists = (meta.data.sheets || []).some((s) => s.properties.title === TAB_NAME)
    if (!exists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: { requests: [{ addSheet: { properties: { title: TAB_NAME } } }] },
      })
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${TAB_NAME}!A1:D1`,
        valueInputOption: 'RAW',
        requestBody: { values: [HEADER] },
      })
      console.log('LoginAttempts: Tab automatisch angelegt.')
    }
    tabEnsured = true
    return true
  } catch (err) {
    console.warn('LoginAttempts: ensureTab fehlgeschlagen:', err.message)
    return false
  }
}

// Liefert die Anzahl der fehlgeschlagenen Versuche dieser IP im Zeitfenster.
// Bei Sheets-Ausfall: 0 (graceful – In-Memory-Limiter im Handler greift weiter).
export async function getRecentFailures(ip) {
  if (!ip) return 0
  const sheets = await getSheetsClient()
  const spreadsheetId = getCustomersSheetId()
  if (!sheets || !spreadsheetId) return 0
  if (!(await ensureTab(sheets, spreadsheetId))) return 0
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${TAB_NAME}!A:C`,
    })
    const rows = res.data.values || []
    const cutoff = Date.now() - WINDOW_MS
    let count = 0
    // skip header (rows[0])
    for (let i = 1; i < rows.length; i++) {
      const [rowIp, ts, success] = rows[i]
      if (rowIp !== ip) continue
      if (success === 'true') continue
      const tsNum = Date.parse(ts)
      if (Number.isNaN(tsNum)) continue
      if (tsNum >= cutoff) count++
    }
    return count
  } catch (err) {
    console.warn('LoginAttempts: getRecentFailures fehlgeschlagen:', err.message)
    return 0
  }
}

// Schreibt einen Login-Versuch. Schreibfehler werden nur geloggt, nie geworfen.
export async function recordAttempt(ip, success, reason = '') {
  const sheets = await getSheetsClient()
  const spreadsheetId = getCustomersSheetId()
  if (!sheets || !spreadsheetId) return
  if (!(await ensureTab(sheets, spreadsheetId))) return
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${TAB_NAME}!A:D`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[String(ip || 'unknown'), new Date().toISOString(), success ? 'true' : 'false', String(reason || '').slice(0, 100)]],
      },
    })
  } catch (err) {
    console.warn('LoginAttempts: recordAttempt fehlgeschlagen:', err.message)
  }
}

export function isLockedOut(failureCount) {
  return failureCount >= MAX_FAILURES
}

export const LOGIN_LOCK_WINDOW_MIN = WINDOW_MS / 60000

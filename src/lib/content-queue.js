// ============================================================
// CONTENT QUEUE – Unified Freigabe-System
// ============================================================
// Tab "Freigaben" in GOOGLE_SHEET_PREMIUM_RESULTS
//
// Spalten:
//   A: id (z.B. QUE-1712345678)
//   B: type ('report' | 'assessment' | 'certificate' | 'invoice')
//   C: status ('pending' | 'approved' | 'rejected')
//   D: recipientName
//   E: recipientEmail
//   F: companyName
//   G: subject (E-Mail-Betreff)
//   H: htmlContent (E-Mail-Body HTML)
//   I: metadata (JSON string: score, level, plan, certificateId, invoiceData, etc.)
//   J: attachmentHtml (optional: Zertifikat/Report HTML als Anhang)
//   K: personalNote (Steffens Notiz beim Freigeben)
//   L: createdAt (ISO timestamp)
//   M: approvedAt (ISO timestamp)
// ============================================================

import { google } from 'googleapis'

const TAB = 'Freigaben'

// ── Auth (same pattern as google-sheets.js) ─────────────────

let _authClient = null

function extractSheetId(value) {
  if (!value) return null
  const cleaned = value.trim().replace(/[\r\n]+/g, '')
  const urlMatch = cleaned.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/)
  if (urlMatch) return urlMatch[1]
  return cleaned
}

async function getAuth() {
  if (_authClient) return _authClient

  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!credentials) {
    console.warn('Content Queue: GOOGLE_SERVICE_ACCOUNT_KEY nicht konfiguriert.')
    return null
  }

  try {
    const parsed = JSON.parse(credentials)
    if (!parsed.client_email || !parsed.private_key) {
      console.error('Content Queue: Service Account Key unvollständig (client_email oder private_key fehlt)')
      return null
    }
    const auth = new google.auth.GoogleAuth({
      credentials: parsed,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
    _authClient = await auth.getClient()
    return _authClient
  } catch (err) {
    console.error('Content Queue Auth-Fehler:', err.message)
    return null
  }
}

async function getSheets() {
  const auth = await getAuth()
  if (!auth) return null
  return google.sheets({ version: 'v4', auth })
}

function queueSheetId() {
  return extractSheetId(process.env.GOOGLE_SHEET_PREMIUM_RESULTS)
}

// ── Formula-injection guard (from blog-sheets.js) ───────────

function sanitize(v) {
  if (!v || typeof v !== 'string') return v ?? ''
  if (/^[=+\-@\t\r]/.test(v)) return "'" + v
  return v
}

// ── Row → object mapper ──────────────────────────────────────

function rowToItem(row, rowIndex) {
  const [
    id, type, status, recipientName, recipientEmail, companyName,
    subject, htmlContent, metadataRaw, attachmentHtml,
    personalNote, createdAt, approvedAt,
  ] = row

  let metadata = {}
  try {
    if (metadataRaw) metadata = JSON.parse(metadataRaw)
  } catch {
    metadata = {}
  }

  return {
    rowIndex,
    id: id ?? '',
    type: type ?? '',
    status: status ?? '',
    recipientName: recipientName ?? '',
    recipientEmail: recipientEmail ?? '',
    companyName: companyName ?? '',
    subject: subject ?? '',
    htmlContent: htmlContent ?? '',
    metadata,
    attachmentHtml: attachmentHtml ?? '',
    personalNote: personalNote ?? '',
    createdAt: createdAt ?? '',
    approvedAt: approvedAt ?? '',
  }
}

// ── Public API ───────────────────────────────────────────────

/**
 * Adds a new item with status 'pending' to the queue.
 * Returns the generated id (e.g. "QUE-1712345678901").
 */
export async function saveToQueue({
  type,
  recipientName,
  recipientEmail,
  companyName,
  subject,
  htmlContent,
  metadata = {},
  attachmentHtml = '',
}) {
  const sheets = await getSheets()
  const spreadsheetId = queueSheetId()
  if (!sheets || !spreadsheetId) {
    console.error('Content Queue: saveToQueue – Sheets nicht verfügbar.')
    return null
  }

  const id = `QUE-${Date.now()}`
  const now = new Date().toISOString()

  const row = [
    id,
    sanitize(type),
    'pending',
    sanitize(recipientName),
    sanitize(recipientEmail),
    sanitize(companyName),
    sanitize(subject),
    sanitize(htmlContent),
    JSON.stringify(metadata),
    sanitize(attachmentHtml),
    '',        // personalNote – leer beim Erstellen
    now,       // createdAt
    '',        // approvedAt – leer beim Erstellen
  ]

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${TAB}!A:M`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [row] },
    })
    return id
  } catch (err) {
    console.error('Content Queue: saveToQueue Fehler:', err.message)
    return null
  }
}

/**
 * Returns all pending items, optionally filtered by type.
 * Each item includes rowIndex (1-based, matching the sheet row).
 */
export async function getPendingItems(type = null) {
  const sheets = await getSheets()
  const spreadsheetId = queueSheetId()
  if (!sheets || !spreadsheetId) {
    console.error('Content Queue: getPendingItems – Sheets nicht verfügbar.')
    return []
  }

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${TAB}!A:M`,
    })

    const rows = res.data.values ?? []
    const items = []

    // row index 1 = header row (if any), data starts at 2 – but we never
    // write a header, so row 1 is the first data row. We track the actual
    // sheet row number (1-based) so we can use it for batchUpdate later.
    rows.forEach((row, idx) => {
      const sheetRow = idx + 1 // 1-based
      if (!row[0]) return       // skip empty rows

      const status = row[2] ?? ''
      if (status !== 'pending') return

      if (type && (row[1] ?? '') !== type) return

      items.push(rowToItem(row, sheetRow))
    })

    return items
  } catch (err) {
    console.error('Content Queue: getPendingItems Fehler:', err.message)
    return []
  }
}

/**
 * Marks an item as 'approved', stores personalNote and approvedAt.
 * rowIndex is 1-based (as returned by getPendingItems / getItemByRow).
 * Returns true on success, false on error.
 */
export async function approveItem(rowIndex, personalNote = '') {
  const sheets = await getSheets()
  const spreadsheetId = queueSheetId()
  if (!sheets || !spreadsheetId) {
    console.error('Content Queue: approveItem – Sheets nicht verfügbar.')
    return false
  }

  try {
    const now = new Date().toISOString()

    // Update C (status), K (personalNote), M (approvedAt)
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody: {
        valueInputOption: 'RAW',
        data: [
          { range: `${TAB}!C${rowIndex}`, values: [['approved']] },
          { range: `${TAB}!K${rowIndex}`, values: [[sanitize(personalNote)]] },
          { range: `${TAB}!M${rowIndex}`, values: [[now]] },
        ],
      },
    })
    return true
  } catch (err) {
    console.error('Content Queue: approveItem Fehler:', err.message)
    return false
  }
}

/**
 * Marks an item as 'rejected', stores reason as personalNote and sets approvedAt.
 * rowIndex is 1-based.
 * Returns true on success, false on error.
 */
export async function rejectItem(rowIndex, reason = '') {
  const sheets = await getSheets()
  const spreadsheetId = queueSheetId()
  if (!sheets || !spreadsheetId) {
    console.error('Content Queue: rejectItem – Sheets nicht verfügbar.')
    return false
  }

  try {
    const now = new Date().toISOString()

    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody: {
        valueInputOption: 'RAW',
        data: [
          { range: `${TAB}!C${rowIndex}`, values: [['rejected']] },
          { range: `${TAB}!K${rowIndex}`, values: [[sanitize(reason)]] },
          { range: `${TAB}!M${rowIndex}`, values: [[now]] },
        ],
      },
    })
    return true
  } catch (err) {
    console.error('Content Queue: rejectItem Fehler:', err.message)
    return false
  }
}

/**
 * Fetches a single item by its 1-based sheet row index.
 * Returns the item object or null if not found / on error.
 */
export async function getItemByRow(rowIndex) {
  const sheets = await getSheets()
  const spreadsheetId = queueSheetId()
  if (!sheets || !spreadsheetId) {
    console.error('Content Queue: getItemByRow – Sheets nicht verfügbar.')
    return null
  }

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${TAB}!A${rowIndex}:M${rowIndex}`,
    })

    const rows = res.data.values ?? []
    if (!rows.length || !rows[0][0]) return null

    return rowToItem(rows[0], rowIndex)
  } catch (err) {
    console.error('Content Queue: getItemByRow Fehler:', err.message)
    return null
  }
}

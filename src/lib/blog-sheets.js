// ============================================================
// BLOG GOOGLE SHEETS INTEGRATION
// ============================================================
// Sheet: GOOGLE_SHEET_BLOG
// Tab "Artikel":   Veröffentlichte Artikel (A–L)
// Tab "Entwuerfe": KI-generierte Entwürfe zur Freigabe (A–J)
//
// SETUP: Neues Google Sheet anlegen, Service Account als Editor
// einladen, Sheet-ID in Vercel als GOOGLE_SHEET_BLOG eintragen.
//
// Spalten "Artikel":
//   A:id | B:slug | C:title | D:excerpt | E:content | F:category
//   G:date | H:readTime | I:linkedinPosted | J:linkedinPostId
//   K:createdAt | L:source
//
// Spalten "Entwuerfe":
//   A:id | B:slug | C:title | D:excerpt | E:content | F:category
//   G:topic | H:generatedAt | I:status | J:notes
// ============================================================

import { google } from 'googleapis'

let _auth = null

function extractSheetId(v) {
  if (!v) return null
  const cleaned = v.trim().replace(/[\r\n]+/g, '')
  const m = cleaned.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/)
  return m ? m[1] : cleaned
}

async function getSheets() {
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!key) return null
  if (!process.env.GOOGLE_SHEET_BLOG) return null
  try {
    if (!_auth) {
      const credentials = JSON.parse(key)
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      })
      _auth = await auth.getClient()
    }
    return google.sheets({ version: 'v4', auth: _auth })
  } catch (err) {
    console.error('Blog Sheets Auth Fehler:', err.message)
    return null
  }
}

function blogSheetId() {
  return extractSheetId(process.env.GOOGLE_SHEET_BLOG)
}

function sanitize(v) {
  if (!v || typeof v !== 'string') return v ?? ''
  if (/^[=+\-@\t\r]/.test(v)) return "'" + v
  return v
}

// ── Artikel (veröffentlicht) ──────────────────────────────────

export async function getPublishedArticles() {
  const sheets = await getSheets()
  const sid = blogSheetId()
  if (!sheets || !sid) return []
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sid,
      range: 'Artikel!A:L',
    })
    const rows = (res.data.values || []).slice(1) // skip header
    return rows
      .filter(r => r[0])
      .map(r => ({
        id: r[0] || '',
        slug: r[1] || '',
        title: r[2] || '',
        excerpt: r[3] || '',
        content: r[4] || '',
        category: r[5] || 'KI-Grundlagen',
        date: r[6] || '',
        readTime: parseInt(r[7]) || 4,
        linkedinPosted: r[8] === 'true',
        linkedinPostId: r[9] || '',
        createdAt: r[10] || '',
        source: r[11] || 'manual',
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  } catch (err) {
    console.error('getPublishedArticles Fehler:', err.message)
    return []
  }
}

export async function getArticleBySlug(slug) {
  const all = await getPublishedArticles()
  return all.find(a => a.slug === slug) || null
}

export async function publishArticle({ id, slug, title, excerpt, content, category, date, readTime, source = 'ai' }) {
  const sheets = await getSheets()
  const sid = blogSheetId()
  if (!sheets || !sid) return false
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: sid,
      range: 'Artikel!A:L',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[
          id,
          sanitize(slug),
          sanitize(title),
          sanitize(excerpt),
          sanitize(content),
          sanitize(category),
          date,
          readTime || 4,
          'false',
          '',
          new Date().toISOString(),
          source,
        ]],
      },
    })
    return true
  } catch (err) {
    console.error('publishArticle Fehler:', err.message)
    return false
  }
}

export async function markLinkedInPosted(slug, postId) {
  const sheets = await getSheets()
  const sid = blogSheetId()
  if (!sheets || !sid) return false
  try {
    const res = await sheets.spreadsheets.values.get({ spreadsheetId: sid, range: 'Artikel!A:B' })
    const rows = res.data.values || []
    const rowIndex = rows.findIndex(r => r[1] === slug)
    if (rowIndex < 1) return false
    await sheets.spreadsheets.values.update({
      spreadsheetId: sid,
      range: `Artikel!I${rowIndex + 1}:J${rowIndex + 1}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [['true', postId]] },
    })
    return true
  } catch (err) {
    console.error('markLinkedInPosted Fehler:', err.message)
    return false
  }
}

// ── Entwürfe (KI-generiert, warten auf Freigabe) ──────────────

export async function saveDraft({ id, slug, title, excerpt, content, category, topic }) {
  const sheets = await getSheets()
  const sid = blogSheetId()
  if (!sheets || !sid) return false
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: sid,
      range: 'Entwuerfe!A:J',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[
          id,
          sanitize(slug),
          sanitize(title),
          sanitize(excerpt),
          sanitize(content),
          sanitize(category),
          sanitize(topic),
          new Date().toISOString(),
          'pending',
          '',
        ]],
      },
    })
    return true
  } catch (err) {
    console.error('saveDraft Fehler:', err.message)
    return false
  }
}

export async function getPendingDrafts() {
  const sheets = await getSheets()
  const sid = blogSheetId()
  if (!sheets || !sid) return []
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: sid,
      range: 'Entwuerfe!A:J',
    })
    const rows = (res.data.values || []).slice(1)
    return rows
      .filter(r => r[0] && (r[8] === 'pending' || !r[8]))
      .map((r, i) => ({
        rowIndex: i + 2,
        id: r[0] || '',
        slug: r[1] || '',
        title: r[2] || '',
        excerpt: r[3] || '',
        content: r[4] || '',
        category: r[5] || 'KI-Grundlagen',
        topic: r[6] || '',
        generatedAt: r[7] || '',
        status: r[8] || 'pending',
        notes: r[9] || '',
      }))
  } catch (err) {
    console.error('getPendingDrafts Fehler:', err.message)
    return []
  }
}

export async function updateDraftStatus(rowIndex, status, notes = '') {
  const sheets = await getSheets()
  const sid = blogSheetId()
  if (!sheets || !sid) return false
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sid,
      range: `Entwuerfe!I${rowIndex}:J${rowIndex}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [[status, sanitize(notes)]] },
    })
    return true
  } catch (err) {
    console.error('updateDraftStatus Fehler:', err.message)
    return false
  }
}

export async function updateDraftContent(rowIndex, { title, excerpt, content, category }) {
  const sheets = await getSheets()
  const sid = blogSheetId()
  if (!sheets || !sid) return false
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sid,
      range: `Entwuerfe!C${rowIndex}:F${rowIndex}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [[sanitize(title), sanitize(excerpt), sanitize(content), sanitize(category)]] },
    })
    return true
  } catch (err) {
    console.error('updateDraftContent Fehler:', err.message)
    return false
  }
}

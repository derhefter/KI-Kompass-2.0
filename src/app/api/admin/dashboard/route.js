import { NextResponse } from 'next/server'
import { verifyAdminToken } from '../login/route'

async function readSheetSafe(sheetId, range) {
  try {
    const { google } = await import('googleapis')
    const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
    if (!credentials || !credentials.trim().startsWith('{')) return []
    const parsed = JSON.parse(credentials)
    const auth = new google.auth.GoogleAuth({ credentials: parsed, scopes: ['https://www.googleapis.com/auth/spreadsheets'] })
    const client = await auth.getClient()
    const sheets = google.sheets({ version: 'v4', auth: client })
    let cleanId = sheetId
    const urlMatch = (sheetId || '').match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/)
    if (urlMatch) cleanId = urlMatch[1]
    if (!cleanId) return []
    try {
      const res = await sheets.spreadsheets.values.get({ spreadsheetId: cleanId, range })
      return res.data.values || []
    } catch (err) {
      if (err.message && err.message.includes('Unable to parse range')) {
        const fallbackRange = range.replace(/^[^!]+!/, 'Tabellenblatt1!')
        try {
          const res = await sheets.spreadsheets.values.get({ spreadsheetId: cleanId, range: fallbackRange })
          return res.data.values || []
        } catch { return [] }
      }
      return []
    }
  } catch { return [] }
}

export async function GET(request) {
  try {
    const token = request.headers.get('x-admin-token')
    if (!verifyAdminToken(token)) {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
    }
    const [customers, accessCodes, freeResults, premiumResults, followUps] = await Promise.all([
      readSheetSafe(process.env.GOOGLE_SHEET_CUSTOMERS, 'Kunden!A:I'),
      readSheetSafe(process.env.GOOGLE_SHEET_CUSTOMERS, 'Zugangscodes!A:H'),
      readSheetSafe(process.env.GOOGLE_SHEET_FREE_RESULTS, 'Ergebnisse!A:F'),
      readSheetSafe(process.env.GOOGLE_SHEET_PREMIUM_RESULTS, 'Ergebnisse!A:K'),
      readSheetSafe(process.env.GOOGLE_SHEET_CUSTOMERS, 'FollowUps!A:F'),
    ])
    const customerList = customers.map(row => ({ date: row[0] || '', company: row[4] || row[1] || '', name: row[2] || '', email: row[3] || '', plan: row[6] || '', paymentMethod: row[7] || '', amount: row[8] || '' }))
    const codeList = accessCodes.map(row => ({ code: row[0] || '', name: row[1] || '', email: row[2] || '', company: row[3] || '', plan: row[4] || '', createdAt: row[5] || '', expiresAt: row[6] || '', status: row[7] || '' }))
    const leadList = freeResults.map(row => ({ date: row[0] || '', company: row[1] || '', email: row[2] || '', score: parseInt(row[3]) || 0, level: parseInt(row[4]) || 0, levelTitle: row[5] || '' }))
    const followUpList = followUps.map(row => ({ email: row[0] || '', type: row[1] || '', scheduledDate: row[2] || '', dueDate: row[3] || '', status: row[4] || 'ausstehend', sentDate: row[5] || '' }))
    const activeCodes = codeList.filter(c => c.status === 'aktiv').length
    const premiumCount = codeList.filter(c => c.plan === 'premium').length
    const strategieCount = codeList.filter(c => c.plan === 'strategie').length
    const zertifikatCount = codeList.filter(c => c.plan === 'zertifikat').length
    const kursCount = codeList.filter(c => c.plan === 'kurs').length
    const estimatedRevenue = (premiumCount * 197) + (strategieCount * 497) + (zertifikatCount * 97) + (kursCount * 297)
    const recentActivity = [
      ...customerList.slice(-10).reverse().map(c => ({ type: 'purchase', description: (c.company || c.name) + ' hat "' + c.plan + '" gekauft', date: c.date })),
      ...leadList.slice(-10).reverse().map(l => ({ type: 'lead', description: l.company + ' hat den Schnell-Check gemacht (' + l.score + '%)', date: l.date })),
    ].slice(0, 15)
    return NextResponse.json({
      totalCustomers: customerList.length, activeCodes, freeAssessments: leadList.length, estimatedRevenue,
      premiumCount, strategieCount, zertifikatCount, kursCount,
      customers: customerList.reverse().slice(0, 50), accessCodes: codeList.reverse().slice(0, 50),
      freeLeads: leadList.reverse().slice(0, 50), followUps: followUpList.reverse().slice(0, 50), recentActivity,
    })
  } catch (err) {
    return NextResponse.json({ error: 'Serverfehler: ' + err.message }, { status: 500 })
  }
}

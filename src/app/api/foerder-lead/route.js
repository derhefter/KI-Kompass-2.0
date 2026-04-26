import { NextResponse } from 'next/server'
import { sendNotificationToOwner, sendConfirmationToCustomer } from '../../../lib/mail'
import { rateLimit } from '../../../lib/rate-limit'
import { escapeHtml, sanitizeEmail, isHoneypotTriggered } from '../../../lib/sanitize'

const limiter = rateLimit({ maxRequests: 3, windowMs: 60 * 1000 })

export async function POST(request) {
  try {
    const { allowed } = limiter(request)
    if (!allowed) return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 })

    const body = await request.json()
    if (isHoneypotTriggered(body)) return NextResponse.json({ success: true })

    const { email, company, bundesland, branche, groesse, vorhaben, matchedPrograms } = body

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json({ error: 'E-Mail erforderlich' }, { status: 400 })
    }

    const safeEmail = sanitizeEmail(email)
    const safeCompany = escapeHtml((company || '').slice(0, 200))
    const safeBundesland = escapeHtml((bundesland || '').slice(0, 100))
    const safeBranche = escapeHtml((branche || '').slice(0, 100))
    const safeGroesse = escapeHtml((groesse || '').toString().slice(0, 50))
    const safeVorhaben = (vorhaben || []).map((v) => escapeHtml(String(v).slice(0, 100))).join(', ')
    const safePrograms = (matchedPrograms || []).map((p) => escapeHtml(String(p).slice(0, 200))).join(', ')

    await sendNotificationToOwner({
      subject: 'Neuer F\u00f6rder-Kompass Lead: ' + safeCompany,
      html: '<h2 style="color:#2563eb;">Neuer F&ouml;rder-Kompass Lead!</h2><table style="border-collapse:collapse;width:100%;max-width:500px;"><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Firma</td><td style="padding:8px;border:1px solid #ddd;">' + safeCompany + '</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">E-Mail</td><td style="padding:8px;border:1px solid #ddd;">' + escapeHtml(safeEmail) + '</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Bundesland</td><td style="padding:8px;border:1px solid #ddd;">' + (safeBundesland || '–') + '</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Branche</td><td style="padding:8px;border:1px solid #ddd;">' + (safeBranche || '–') + '</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Gr&ouml;&szlig;e</td><td style="padding:8px;border:1px solid #ddd;">' + (safeGroesse || '–') + ' MA</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Vorhaben</td><td style="padding:8px;border:1px solid #ddd;">' + (safeVorhaben || '–') + '</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Passende Programme</td><td style="padding:8px;border:1px solid #ddd;">' + (safePrograms || '–') + '</td></tr></table>',
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}

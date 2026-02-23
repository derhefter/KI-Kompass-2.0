import { NextResponse } from 'next/server'
import { sendNotificationToOwner, sendConfirmationToCustomer } from '../../../lib/mail'
import { rateLimit } from '../../../lib/rate-limit'

const limiter = rateLimit({ maxRequests: 3, windowMs: 60 * 1000 })

export async function POST(request) {
  try {
    const { allowed } = limiter(request)
    if (!allowed) return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 })

    const { email, company, bundesland, branche, groesse, vorhaben, matchedPrograms } = await request.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'E-Mail erforderlich' }, { status: 400 })
    }

    const safeEmail = email.slice(0, 254).replace(/[<>\r\n"'&]/g, '')
    const safeCompany = (company || '').slice(0, 200).replace(/[<>\r\n]/g, '')
    const programs = (matchedPrograms || []).join(', ')

    await sendNotificationToOwner({
      subject: `Neuer F\u00f6rder-Kompass Lead: ${safeCompany}`,
      html: `
        <h2 style="color:#2563eb;">Neuer F&ouml;rder-Kompass Lead!</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Firma</td><td style="padding:8px;border:1px solid #ddd;">${safeCompany}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">E-Mail</td><td style="padding:8px;border:1px solid #ddd;">${safeEmail}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Bundesland</td><td style="padding:8px;border:1px solid #ddd;">${bundesland || '–'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Branche</td><td style="padding:8px;border:1px solid #ddd;">${branche || '–'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Gr&ouml;&szlig;e</td><td style="padding:8px;border:1px solid #ddd;">${groesse || '–'} MA</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Vorhaben</td><td style="padding:8px;border:1px solid #ddd;">${(vorhaben || []).join(', ') || '–'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Passende Programme</td><td style="padding:8px;border:1px solid #ddd;">${programs || '–'}</td></tr>
        </table>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}

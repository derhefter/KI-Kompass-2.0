// ============================================================
// FOLLOW-UP CRON JOB - KI-Kompass V2
// ============================================================
// Verarbeitet ausstehende Follow-Up E-Mails
// Wird täglich per Vercel Cron oder manuell aufgerufen
// ENV: CRON_SECRET
// ============================================================

import { NextResponse } from 'next/server'
import { sendConfirmationToCustomer, sendNotificationToOwner } from '../../../lib/mail'
import { getFollowUpEmailHTML, FOLLOW_UP_SUBJECTS } from '../../../lib/follow-up'
import { getPendingFollowUps, markFollowUpSent } from '../../../lib/google-sheets'
import { checkLinkedInToken, isLinkedInConfigured } from '../../../lib/linkedin'

// Wöchentlicher LinkedIn-Token-Check (montags). Schlägt Token fehl → Owner-Mail.
async function maybeCheckLinkedInToken() {
  if (!isLinkedInConfigured()) return
  // Nur montags ausführen, damit nicht 7×/Woche eine Reminder-Mail kommt.
  if (new Date().getUTCDay() !== 1) return
  const result = await checkLinkedInToken()
  if (result.ok) return
  await sendNotificationToOwner({
    subject: '[REMINDER] LinkedIn-Token muss erneuert werden',
    html: `<h2 style="color:#b45309;">LinkedIn Access Token funktioniert nicht mehr</h2>
      <p>Der wöchentliche Liveness-Check hat einen Fehler gemeldet:</p>
      <pre style="background:#f8fafc;padding:12px;border-radius:8px;">${result.error || 'Unbekannter Fehler'} (HTTP ${result.statusCode})</pre>
      <p><strong>Aktion nötig:</strong> Im Dashboard → Tab Blog → "LinkedIn verbinden" ausführen, dann das neue Access Token in Vercel unter <code>LINKEDIN_ACCESS_TOKEN</code> eintragen und einen Redeploy auslösen.</p>
      <p style="color:#64748b;font-size:12px;">Bis das gemacht ist, werden veröffentlichte Blog-Artikel nicht automatisch auf LinkedIn gepostet.</p>`,
  }).catch(() => {})
}

export async function GET(request) {
  try {
    // Authentifizierung
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
    }

    // Sheets-Fehler abfangen und Owner benachrichtigen
    let pending
    try {
      pending = await getPendingFollowUps()
    } catch (err) {
      console.error('getPendingFollowUps fehlgeschlagen:', err.message)
      await sendNotificationToOwner({
        subject: '[CRON-FEHLER] Follow-Up System: Sheets nicht erreichbar',
        html: `<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px;"><h2 style="color:#991b1b;margin-top:0;">Follow-Up Cron Job fehlgeschlagen</h2><p>Google Sheets konnte nicht gelesen werden. Ausstehende Follow-Up E-Mails wurden NICHT versendet.</p><p>Fehler: ${err.message}</p><p>Zeitpunkt: ${new Date().toLocaleString('de-DE')}</p></div>`,
      }).catch(() => {})
      return NextResponse.json({ error: 'Sheets nicht erreichbar', processed: 0 }, { status: 500 })
    }

    if (!pending || pending.length === 0) {
      return NextResponse.json({ processed: 0, sent: 0, message: 'Keine ausstehenden Follow-Ups' })
    }

    let sent = 0
    const errors = []
    for (const followUp of pending) {
      try {
        const { email, company, score, level, levelTitle, type, rowIndex } = followUp
        const subjectFn = FOLLOW_UP_SUBJECTS[type]
        const subject = subjectFn ? subjectFn(company || 'Ihr Unternehmen') : 'KI-Kompass Update'
        const html = getFollowUpEmailHTML(type, { company, score, level, levelTitle })

        // Leere Templates nicht versenden
        if (!html || html.trim() === '') {
          console.error(`Leeres Template für Follow-Up Typ: ${type}, E-Mail: ${email}`)
          errors.push(`Leeres Template: ${email} (${type})`)
          continue
        }

        const emailSent = await sendConfirmationToCustomer({ to: email, subject, html })
        if (emailSent) {
          await markFollowUpSent(rowIndex).catch((err) => {
            console.error(`markFollowUpSent fehlgeschlagen für ${email}:`, err.message)
            // Trotzdem als gesendet zählen um Duplikate zu vermeiden
          })
          sent++
        }
      } catch (err) {
        console.error(`Follow-Up Fehler für ${followUp.email}:`, err.message)
        errors.push(`${followUp.email}: ${err.message}`)
      }
    }

    // Bei Fehlern Owner benachrichtigen
    if (errors.length > 0) {
      await sendNotificationToOwner({
        subject: `[CRON-WARNUNG] Follow-Ups: ${sent}/${pending.length} versendet, ${errors.length} Fehler`,
        html: `<h2>Follow-Up Cron Job Bericht</h2><p>Versendet: ${sent}/${pending.length}</p><p>Fehler:</p><ul>${errors.map((e) => `<li>${e}</li>`).join('')}</ul>`,
      }).catch(() => {})
    }

    // LinkedIn-Token Liveness-Check (montags) – nicht blockierend
    maybeCheckLinkedInToken().catch(() => {})

    return NextResponse.json({ processed: pending.length, sent, errors: errors.length })
  } catch (err) {
    console.error('Follow-Up Verarbeitung Fehler:', err.message)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}

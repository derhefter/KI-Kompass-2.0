// ============================================================
// FOLLOW-UP CRON JOB - KI-Kompass V2
// ============================================================
// Verarbeitet ausstehende Follow-Up E-Mails
// Wird täglich per Vercel Cron oder manuell aufgerufen
// ENV: CRON_SECRET
// ============================================================

import { NextResponse } from 'next/server'
import { sendConfirmationToCustomer } from '../../../lib/mail'
import { getFollowUpEmailHTML, FOLLOW_UP_SUBJECTS } from '../../../lib/follow-up'
import { getPendingFollowUps, markFollowUpSent } from '../../../lib/google-sheets'

export async function GET(request) {
  try {
    // Authentifizierung
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
    }

    const pending = await getPendingFollowUps()
    if (!pending || pending.length === 0) {
      return NextResponse.json({ processed: 0, sent: 0, message: 'Keine ausstehenden Follow-Ups' })
    }

    let sent = 0
    for (const followUp of pending) {
      try {
        const { email, company, score, level, levelTitle, type, rowIndex } = followUp
        const subjectFn = FOLLOW_UP_SUBJECTS[type]
        const subject = subjectFn ? subjectFn(company || 'Ihr Unternehmen') : 'KI-Kompass Update'
        const html = getFollowUpEmailHTML(type, { company, score, level, levelTitle })

        const emailSent = await sendConfirmationToCustomer({ to: email, subject, html })
        if (emailSent) {
          await markFollowUpSent(rowIndex)
          sent++
        }
      } catch (err) {
        console.error(`Follow-Up Fehler für ${followUp.email}:`, err.message)
      }
    }

    return NextResponse.json({ processed: pending.length, sent })
  } catch (err) {
    console.error('Follow-Up Verarbeitung Fehler:', err.message)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}

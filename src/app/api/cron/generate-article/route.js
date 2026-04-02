// ============================================================
// CRON: Wöchentlicher Artikel-Generator
// Läuft jeden Montag um 07:00 Uhr (vercel.json)
// Generiert einen KI-Artikel → speichert als Entwurf → benachrichtigt Steffen
// ============================================================
import { NextResponse } from 'next/server'
import { generateArticle, getCurrentTopic } from '../../../../lib/article-generator'
import { saveDraft } from '../../../../lib/blog-sheets'
import { sendNotificationToOwner } from '../../../../lib/mail'

export async function GET(request) {
  // Sicherheit: Nur Vercel Cron oder Admin darf auslösen
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  const isVercelCron = authHeader === `Bearer ${cronSecret}`
  const isAdmin = request.headers.get('x-admin-token') === process.env.ADMIN_PASSWORD

  if (!isVercelCron && !isAdmin) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
  }

  try {
    const { category, topic, weekNum } = getCurrentTopic()
    console.log(`[Cron] Generiere Artikel für KW ${weekNum}: "${topic}"`)

    // Artikel generieren
    const article = await generateArticle()

    // Als Entwurf in Google Sheets speichern
    const saved = await saveDraft(article)

    // Steffen benachrichtigen
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.derhefter.com'
    await sendNotificationToOwner({
      subject: `✍️ Neuer Blog-Entwurf zur Freigabe: "${article.title}"`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#1e3a5f,#2563eb);padding:24px;border-radius:12px 12px 0 0;">
            <h1 style="color:white;margin:0;font-size:18px;">✍️ Neuer KI-Artikel zur Freigabe</h1>
          </div>
          <div style="background:white;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
            <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
              <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#f8fafc;">Titel</td><td style="padding:6px 12px;border:1px solid #e5e7eb;">${article.title}</td></tr>
              <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#f8fafc;">Kategorie</td><td style="padding:6px 12px;border:1px solid #e5e7eb;">${article.category}</td></tr>
              <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#f8fafc;">Thema</td><td style="padding:6px 12px;border:1px solid #e5e7eb;">${article.topic}</td></tr>
              <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#f8fafc;">Lesezeit</td><td style="padding:6px 12px;border:1px solid #e5e7eb;">${article.readTime} Min.</td></tr>
              <tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-weight:bold;background:#f8fafc;">In Sheets</td><td style="padding:6px 12px;border:1px solid #e5e7eb;">${saved ? '✓ Gespeichert' : '⚠ Fehler beim Speichern'}</td></tr>
            </table>
            <p style="font-style:italic;color:#475569;font-size:14px;">"${article.excerpt}"</p>
            <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:16px;margin:16px 0;">
              <p style="margin:0 0 4px;font-weight:bold;color:#92400e;">📌 Nächster Schritt</p>
              <p style="margin:0;font-size:14px;color:#78350f;">Im Dashboard prüfen, ggf. bearbeiten, dann freigeben → Artikel wird sofort veröffentlicht.</p>
            </div>
            <a href="${baseUrl}/dashboard" style="display:inline-block;background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">
              → Im Dashboard freigeben
            </a>
          </div>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      article: { id: article.id, title: article.title, slug: article.slug, category: article.category, topic: article.topic },
      savedToSheets: saved,
    })
  } catch (err) {
    console.error('[Cron] Artikel-Generierung fehlgeschlagen:', err.message)

    // Fehlermeldung an Steffen
    await sendNotificationToOwner({
      subject: '⚠️ Blog-Artikel-Generator: Fehler aufgetreten',
      html: `<p>Der wöchentliche Artikel-Generator hat einen Fehler produziert:</p><pre style="background:#f8fafc;padding:12px;border-radius:8px;">${err.message}</pre><p>Bitte manuell im Dashboard einen Artikel erstellen oder den Generator erneut auslösen.</p>`,
    }).catch(() => {})

    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// Admin kann auch manuell auslösen (POST mit optionalem Topic-Override)
export async function POST(request) {
  const authToken = request.headers.get('x-admin-token')
  if (authToken !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
  }

  let topicOverride = null
  try {
    const body = await request.json()
    if (body.category && body.topic) topicOverride = { category: body.category, topic: body.topic }
  } catch {}

  try {
    const article = await generateArticle(topicOverride)
    const saved = await saveDraft(article)
    return NextResponse.json({ success: true, article, savedToSheets: saved })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

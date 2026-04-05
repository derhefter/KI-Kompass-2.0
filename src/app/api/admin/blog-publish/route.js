// Admin: Entwurf freigeben → veröffentlichen + optional LinkedIn
import { NextResponse } from 'next/server'
import { getPendingDrafts, publishArticle, updateDraftStatus, markLinkedInPosted } from '../../../../lib/blog-sheets'
import { postToLinkedIn } from '../../../../lib/linkedin'
import { revalidatePath } from 'next/cache'
import { verifyAdminToken } from '../login/route'

function auth(request) {
  return verifyAdminToken(request.headers.get('x-admin-token'))
}

export async function POST(request) {
  if (!auth(request)) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })

  const { rowIndex, postToLinkedIn: shareLinkedIn, customDate } = await request.json()

  // Entwurf-Daten nochmal aus Sheets laden (nach evtl. Bearbeitung)
  const drafts = await getPendingDrafts()
  const draft = drafts.find(d => d.rowIndex === rowIndex)
  if (!draft) return NextResponse.json({ error: 'Entwurf nicht gefunden' }, { status: 404 })

  const publishDate = customDate || new Date().toISOString().slice(0, 10)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.derhefter.com'
  const articleUrl = `${baseUrl}/blog/${draft.slug}`

  // In "Artikel"-Tab schreiben (veröffentlichen)
  const published = await publishArticle({
    id: draft.id,
    slug: draft.slug,
    title: draft.title,
    excerpt: draft.excerpt,
    content: draft.content,
    category: draft.category,
    date: publishDate,
    readTime: Math.max(2, Math.ceil(draft.content.replace(/<[^>]+>/g, ' ').split(/\s+/).length / 200)),
    source: 'ai',
  })

  if (!published) return NextResponse.json({ error: 'Veröffentlichung in Sheets fehlgeschlagen' }, { status: 500 })

  // Entwurf als "veröffentlicht" markieren
  await updateDraftStatus(rowIndex, 'published', `Veröffentlicht am ${publishDate}`)

  // Cache invalidieren damit die Blog-Seite sofort aktualisiert wird
  try {
    revalidatePath('/blog')
    revalidatePath(`/blog/${draft.slug}`)
  } catch {}

  // LinkedIn-Post (optional)
  let linkedInResult = null
  if (shareLinkedIn) {
    linkedInResult = await postToLinkedIn({
      title: draft.title,
      excerpt: draft.excerpt,
      url: articleUrl,
    })
    if (linkedInResult.success) {
      await markLinkedInPosted(draft.slug, linkedInResult.postId)
    }
  }

  return NextResponse.json({
    success: true,
    url: articleUrl,
    linkedIn: linkedInResult,
  })
}

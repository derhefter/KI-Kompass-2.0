// Öffentliche API: Blog-Artikel aus Google Sheets + statische Datei
import { NextResponse } from 'next/server'
import { getPublishedArticles } from '../../../../lib/blog-sheets'
import { getPublishedPosts as getStaticPosts } from '../../../../data/blog-posts'

export const revalidate = 1800 // 30 Minuten Cache

export async function GET() {
  try {
    // Aus Google Sheets (dynamische Artikel)
    const sheetArticles = await getPublishedArticles()

    // Aus statischer Datei (manuelle Artikel)
    const staticPosts = getStaticPosts().map(p => ({ ...p, source: 'static' }))

    // Zusammenführen, deduplizieren (Sheets hat Vorrang bei gleichem Slug)
    const sheetSlugs = new Set(sheetArticles.map(a => a.slug))
    const merged = [
      ...sheetArticles,
      ...staticPosts.filter(p => !sheetSlugs.has(p.slug)),
    ].sort((a, b) => new Date(b.date) - new Date(a.date))

    return NextResponse.json({ posts: merged })
  } catch (err) {
    // Fallback: nur statische Posts
    const staticPosts = getStaticPosts()
    return NextResponse.json({ posts: staticPosts, fallback: true })
  }
}

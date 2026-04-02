import { NextResponse } from 'next/server'
import { getArticleBySlug } from '../../../../../lib/blog-sheets'
import { getPostBySlug as getStaticPost } from '../../../../../data/blog-posts'

export const revalidate = 1800

export async function GET(request, { params }) {
  const { slug } = params
  try {
    // Erst in Sheets suchen, dann in statischer Datei
    const article = (await getArticleBySlug(slug)) || getStaticPost(slug)
    if (!article) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
    return NextResponse.json({ post: article })
  } catch {
    const article = getStaticPost(slug)
    if (!article) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
    return NextResponse.json({ post: article })
  }
}

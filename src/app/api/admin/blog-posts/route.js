import { NextResponse } from 'next/server'
import { blogPosts } from '../../../../data/blog-posts'

function verifyAdmin(request) {
  const token = request.headers.get('x-admin-token')
  return token === process.env.ADMIN_PASSWORD
}

// GET: Alle Blog-Posts (für Dashboard)
export async function GET(request) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
  return NextResponse.json({ posts: blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date)) })
}

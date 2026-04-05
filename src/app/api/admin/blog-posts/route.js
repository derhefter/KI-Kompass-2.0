import { NextResponse } from 'next/server'
import { blogPosts } from '../../../../data/blog-posts'
import { verifyAdminToken } from '../login/route'

function verifyAdmin(request) {
  return verifyAdminToken(request.headers.get('x-admin-token'))
}

// GET: Alle Blog-Posts (für Dashboard)
export async function GET(request) {
  if (!verifyAdmin(request)) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
  return NextResponse.json({ posts: blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date)) })
}

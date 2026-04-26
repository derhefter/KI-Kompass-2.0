import { NextResponse } from 'next/server'
import { blogPosts } from '../../../../data/blog-posts'
import { requireAdmin } from '../../../../lib/admin-auth'

// GET: Alle Blog-Posts (für Dashboard)
export async function GET(request) {
  const unauthorized = requireAdmin(request)
  if (unauthorized) return unauthorized
  return NextResponse.json({ posts: blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date)) })
}

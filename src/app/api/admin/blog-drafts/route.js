// Admin: Entwürfe verwalten – GET: Liste | PUT: Inhalt bearbeiten | DELETE: ablehnen
import { NextResponse } from 'next/server'
import { getPendingDrafts, updateDraftStatus, updateDraftContent } from '../../../../lib/blog-sheets'
import { requireAdmin } from '../../../../lib/admin-auth'
import { sanitizeUserText } from '../../../../lib/sanitize'

export async function GET(request) {
  const unauthorized = requireAdmin(request)
  if (unauthorized) return unauthorized
  const drafts = await getPendingDrafts()
  return NextResponse.json({ drafts })
}

export async function PUT(request) {
  const unauthorized = requireAdmin(request)
  if (unauthorized) return unauthorized
  const body = await request.json()
  const rowIndex = parseInt(body.rowIndex, 10)
  if (!Number.isFinite(rowIndex) || rowIndex < 0) {
    return NextResponse.json({ error: 'Ungültiger rowIndex' }, { status: 400 })
  }
  const ok = await updateDraftContent(rowIndex, {
    title: sanitizeUserText(body.title, { maxLen: 200, escape: false }),
    excerpt: sanitizeUserText(body.excerpt, { maxLen: 500, escape: false }),
    content: String(body.content ?? '').slice(0, 100000),
    category: sanitizeUserText(body.category, { maxLen: 60, escape: false }),
  })
  return NextResponse.json({ success: ok })
}

export async function DELETE(request) {
  const unauthorized = requireAdmin(request)
  if (unauthorized) return unauthorized
  const { rowIndex, notes } = await request.json()
  const ok = await updateDraftStatus(
    parseInt(rowIndex, 10),
    'rejected',
    sanitizeUserText(notes || 'Abgelehnt', { maxLen: 500, escape: false }),
  )
  return NextResponse.json({ success: ok })
}

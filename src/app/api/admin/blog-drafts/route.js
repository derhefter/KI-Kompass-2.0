// Admin: Entwürfe verwalten – GET: Liste | PUT: Inhalt bearbeiten | DELETE: ablehnen
import { NextResponse } from 'next/server'
import { getPendingDrafts, updateDraftStatus, updateDraftContent } from '../../../../lib/blog-sheets'

function auth(request) {
  return request.headers.get('x-admin-token') === process.env.ADMIN_PASSWORD
}

export async function GET(request) {
  if (!auth(request)) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
  const drafts = await getPendingDrafts()
  return NextResponse.json({ drafts })
}

export async function PUT(request) {
  if (!auth(request)) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
  const { rowIndex, title, excerpt, content, category } = await request.json()
  const ok = await updateDraftContent(rowIndex, { title, excerpt, content, category })
  return NextResponse.json({ success: ok })
}

export async function DELETE(request) {
  if (!auth(request)) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
  const { rowIndex, notes } = await request.json()
  const ok = await updateDraftStatus(rowIndex, 'rejected', notes || 'Abgelehnt')
  return NextResponse.json({ success: ok })
}

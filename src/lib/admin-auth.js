// Auth-Helper für Admin-Routes. Eine Quelle der Wahrheit für die Token-Prüfung.
//
// Verwendung in einer Admin-Route:
//   import { requireAdmin } from '../../../../lib/admin-auth'
//   export async function GET(request) {
//     const unauthorized = requireAdmin(request)
//     if (unauthorized) return unauthorized
//     // ... eigentliche Logik ...
//   }
//
// Vorteil: Auth-Logik existiert genau an einer Stelle. Wer eine neue
// Admin-Route anlegt, ohne requireAdmin() zu rufen, baut bewusst eine
// Backdoor – das ist nun eindeutig sichtbar im Code-Review.

import { NextResponse } from 'next/server'
import { verifyAdminToken } from '../app/api/admin/login/route'

export function requireAdmin(request) {
  const token = request.headers.get('x-admin-token')
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
  }
  return null
}

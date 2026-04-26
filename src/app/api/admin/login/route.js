// ============================================================
// ADMIN LOGIN – Stateless HMAC-Token Authentifizierung
//
// Token-Format: "<timestamp>.<hmac-sha256>"
// Vorteil: Keine In-Memory-Map nötig – funktioniert in jeder
// Vercel Serverless Function ohne geteilten Zustand.
// Gültigkeit: 24 Stunden
// ============================================================
import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { rateLimit } from '../../../../lib/rate-limit'
import { getRecentFailures, recordAttempt, isLockedOut, LOGIN_LOCK_WINDOW_MIN } from '../../../../lib/login-attempts'

// Brute-Force-Schutz Layer 1: In-Memory pro Serverless-Instanz (schneller Filter).
// Layer 2 (persistent über Cold-Starts): Sheets-basiert via login-attempts.js
const loginLimiter = rateLimit({ maxRequests: 5, windowMs: 15 * 60 * 1000 })

function getClientIp(request) {
  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

// Token erzeugen: timestamp + HMAC-Signatur
function createToken(adminPassword) {
  const ts = Date.now().toString()
  const sig = crypto.createHmac('sha256', adminPassword).update(ts).digest('hex')
  return `${ts}.${sig}`
}

// Token prüfen – stateless, kein shared state nötig
export function verifyAdminToken(token) {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!token || !adminPassword) return false
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [ts, sig] = parts
  const tsNum = parseInt(ts, 10)
  if (isNaN(tsNum)) return false
  // 24 Stunden Gültigkeit
  if (Date.now() - tsNum > 24 * 60 * 60 * 1000) return false
  const expected = crypto.createHmac('sha256', adminPassword).update(ts).digest('hex')
  if (expected.length !== sig.length) return false
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig))
}

export async function POST(request) {
  const ip = getClientIp(request)
  try {
    // Layer 1: In-Memory
    const { allowed } = loginLimiter(request)
    if (!allowed) {
      return NextResponse.json(
        { error: `Zu viele Login-Versuche. Bitte warten Sie ${LOGIN_LOCK_WINDOW_MIN} Minuten.` },
        { status: 429 }
      )
    }

    // Layer 2: Persistenter Sheets-Lock (überlebt Cold-Starts).
    const failures = await getRecentFailures(ip)
    if (isLockedOut(failures)) {
      return NextResponse.json(
        { error: `Zu viele Login-Versuche. Bitte warten Sie ${LOGIN_LOCK_WINDOW_MIN} Minuten.` },
        { status: 429 }
      )
    }

    const { password } = await request.json()
    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      return NextResponse.json({ error: 'Admin-Passwort nicht konfiguriert' }, { status: 500 })
    }

    const inputBuffer = Buffer.from(String(password || ''))
    const expectedBuffer = Buffer.from(adminPassword)
    const match =
      inputBuffer.length === expectedBuffer.length &&
      crypto.timingSafeEqual(inputBuffer, expectedBuffer)

    if (!match) {
      // Versuch persistent loggen (fire & forget – nicht await blocking)
      recordAttempt(ip, false, 'wrong_password').catch(() => {})
      return NextResponse.json({ error: 'Ungültige Anmeldedaten' }, { status: 401 })
    }

    recordAttempt(ip, true).catch(() => {})
    const token = createToken(adminPassword)
    return NextResponse.json({ token, expiresIn: '24h' })
  } catch (err) {
    console.error('Login-Route Fehler:', err.message)
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}

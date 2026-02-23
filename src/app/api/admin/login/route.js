import { NextResponse } from 'next/server'
import crypto from 'crypto'

const adminTokens = new Map()

setInterval(() => {
  const now = Date.now()
  for (const [token, data] of adminTokens) {
    if (now - data.created > 24 * 60 * 60 * 1000) {
      adminTokens.delete(token)
    }
  }
}, 60 * 60 * 1000)

export function verifyAdminToken(token) {
  if (!token) return false
  const data = adminTokens.get(token)
  if (!data) return false
  if (Date.now() - data.created > 24 * 60 * 60 * 1000) {
    adminTokens.delete(token)
    return false
  }
  return true
}

export async function POST(request) {
  try {
    const { password } = await request.json()
    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      return NextResponse.json({ error: 'Admin-Passwort nicht konfiguriert' }, { status: 500 })
    }
    const inputBuffer = Buffer.from(String(password || ''))
    const expectedBuffer = Buffer.from(adminPassword)
    if (inputBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(inputBuffer, expectedBuffer)) {
      return NextResponse.json({ error: 'Falsches Passwort' }, { status: 401 })
    }
    const token = crypto.randomBytes(32).toString('hex')
    adminTokens.set(token, { created: Date.now() })
    return NextResponse.json({ token, expiresIn: '24h' })
  } catch {
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 })
  }
}

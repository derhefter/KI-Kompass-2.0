// ============================================================
// MOLLIE CLIENT - KI-Kompass V2
// ============================================================
// Singleton-Pattern fuer Mollie API Client
// ENV: MOLLIE_API_KEY (test_xxx oder live_xxx)
// ============================================================

import createMollieClient from '@mollie/api-client'

let mollieInstance = null

export function getMollieClient() {
  if (!mollieInstance) {
    const apiKey = process.env.MOLLIE_API_KEY
    if (!apiKey) {
      console.error('MOLLIE_API_KEY nicht konfiguriert')
      return null
    }
    mollieInstance = createMollieClient({ apiKey })
  }
  return mollieInstance
}

'use client'

// DSGVO-konformer Consent-Banner. Lädt Google Analytics erst nach Opt-In.
// Speicher: localStorage 'consent_v1' = 'granted' | 'denied'.
// Wird in src/app/layout.js gerendert. Bei "granted" wird das GA-Script
// dynamisch nachgeladen (entspricht IAB-Empfehlung "no script before consent").

import { useEffect, useState } from 'react'
import Script from 'next/script'

const STORAGE_KEY = 'consent_v1'
const GA_ID = 'G-3SWDR65PPJ'

export default function ConsentBanner() {
  const [decision, setDecision] = useState(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'granted' || stored === 'denied') setDecision(stored)
    } catch {}
  }, [])

  function setConsent(value) {
    setDecision(value)
    try { localStorage.setItem(STORAGE_KEY, value) } catch {}
  }

  // Vor Hydration nichts rendern (Hydration-Mismatch vermeiden)
  if (!hydrated) return null

  return (
    <>
      {decision === 'granted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });`}
          </Script>
        </>
      )}

      {decision === null && (
        <div
          role="dialog"
          aria-label="Cookie-Einwilligung"
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000,
            background: '#0f172a', color: 'white', borderTop: '1px solid #334155',
            padding: '16px', boxShadow: '0 -4px 16px rgba(0,0,0,0.2)',
          }}
        >
          <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
            <div>
              <strong style={{ display: 'block', marginBottom: 4 }}>Cookies & Reichweitenmessung</strong>
              <span style={{ opacity: 0.85 }}>
                Wir nutzen Google Analytics (mit IP-Anonymisierung), um die Website zu verbessern.
                Sie können das jederzeit ablehnen oder zustimmen.
                Mehr in der <a href="/datenschutz" style={{ color: '#60a5fa', textDecoration: 'underline' }}>Datenschutzerklärung</a>.
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button
                onClick={() => setConsent('granted')}
                style={{ background: '#2563eb', color: 'white', border: 0, padding: '10px 20px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}
              >
                Einverstanden
              </button>
              <button
                onClick={() => setConsent('denied')}
                style={{ background: 'transparent', color: 'white', border: '1px solid #475569', padding: '10px 20px', borderRadius: 8, cursor: 'pointer' }}
              >
                Ablehnen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

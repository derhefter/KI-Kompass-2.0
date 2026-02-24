// ============================================================
// MOLLIE PAYMENT - KI-Kompass V2
// ============================================================
// Erstellt eine Mollie-Zahlung fuer Premium/Strategie/Zertifikat/Kurs
// ENV: MOLLIE_API_KEY, NEXT_PUBLIC_BASE_URL
// ============================================================

import { NextResponse } from 'next/server'
import { getMollieClient } from '../../../lib/mollie'
import { rateLimit } from '../../../lib/rate-limit'

const limiter = rateLimit({ maxRequests: 3, windowMs: 60 * 1000 })

// Duplikat-Schutz
const recentRequests = new Map()
const DEDUP_WINDOW = 5 * 60 * 1000

setInterval(() => {
  const now = Date.now()
  for (const [key, timestamp] of recentRequests) {
    if (now - timestamp > DEDUP_WINDOW) recentRequests.delete(key)
  }
}, 60 * 1000)

const PRODUCTS = {
  premium: {
    name: 'KI-Kompass Premium Report',
    description: 'Umfassender KI-Readiness Report (20+ Seiten) mit individueller Roadmap, Tool-Empfehlungen und Foerdermitteluebersicht',
    price: '197.00',
    priceDisplay: '197',
  },
  strategie: {
    name: 'KI-Kompass Strategie-Paket',
    description: 'Premium Report + 60-Min. Video-Strategiegespraech + Persoenliche KI-Strategie + Foerdermittelberatung + 30 Tage E-Mail-Support',
    price: '497.00',
    priceDisplay: '497',
  },
  zertifikat: {
    name: 'KI-Readiness Zertifikat (Premium)',
    description: 'Offizielles KI-Ready Zertifikat fuer Ihr Unternehmen - mit detaillierter Score-Aufschluesselung, druckoptimiert',
    price: '97.00',
    priceDisplay: '97',
  },
  'zertifikat-basic': {
    name: 'KI-Readiness Basic Badge',
    description: 'Digitales KI-Ready Zertifikat (PDF) mit Level-Badge fuer Ihre Website und Online-Verifizierung',
    price: '47.00',
    priceDisplay: '47',
  },
  kurs: {
    name: 'KI-Einfuehrung fuer KMU - Online-Kurs',
    description: '7 Module Selbstlernkurs mit Video-Lektionen, Arbeitsblaettern, Templates und Zertifikat',
    price: '297.00',
    priceDisplay: '297',
  },
  benchmark: {
    name: 'Branchen-Benchmark Report',
    description: 'Umfassender Branchen-Report mit anonymisierten Vergleichsdaten, Benchmark-Analyse und spezifischen Handlungsempfehlungen',
    price: '297.00',
    priceDisplay: '297',
  },
  'toolbox-starter': {
    name: 'KI-Toolbox Starter (Monatsabo)',
    description: 'Monatliches Abo: KI-Tool-Empfehlungen, 50+ Prompt-Templates, Checklisten und Vorlagen mit monatlichen Updates',
    price: '29.00',
    priceDisplay: '29',
  },
  'toolbox-pro': {
    name: 'KI-Toolbox Professional (Monatsabo)',
    description: 'Monatliches Abo: Alles aus Starter + Video-Tutorials, Branchen-spezifische Vorlagen, Compliance-Templates und Priority Support',
    price: '49.00',
    priceDisplay: '49',
  },
  'monitoring-basic': {
    name: 'KI-Monitoring Basic (Monatsabo)',
    description: 'Monatliches Abo: Quartalweises Re-Assessment, Fortschritts-Dashboard, Score-Verlauf, KI-Newsletter und Regulierungs-Updates',
    price: '49.00',
    priceDisplay: '49',
  },
  'monitoring-pro': {
    name: 'KI-Monitoring Pro (Monatsabo)',
    description: 'Monatliches Abo: Alles aus Basic + Persoenlicher KI-News-Digest, Branchen-Benchmark, Priority Support und jaehrliches Strategie-Update-Call',
    price: '99.00',
    priceDisplay: '99',
  },
}

export async function POST(request) {
  try {
    const { allowed } = limiter(request)
    if (!allowed) {
      return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 })
    }

    const mollieClient = getMollieClient()
    if (!mollieClient) {
      return NextResponse.json({ error: 'Zahlungssystem nicht konfiguriert' }, { status: 500 })
    }

    const { plan, name, email, company, phone } = await request.json()

    if (!plan || !PRODUCTS[plan]) {
      return NextResponse.json({ error: 'Ungueltiger Plan' }, { status: 400 })
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Ungueltige E-Mail' }, { status: 400 })
    }
    if (!name || typeof name !== 'string' || name.length < 2) {
      return NextResponse.json({ error: 'Name erforderlich' }, { status: 400 })
    }

    // Duplikat-Check
    const dedupKey = `${email.toLowerCase().trim()}_${plan}`
    if (recentRequests.has(dedupKey)) {
      return NextResponse.json({ error: 'Anfrage bereits gesendet. Bitte warten Sie.' }, { status: 409 })
    }
    recentRequests.set(dedupKey, Date.now())

    const product = PRODUCTS[plan]
    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://ki-kompass.de').trim()

    const payment = await mollieClient.payments.create({
      amount: {
        currency: 'EUR',
        value: product.price,
      },
      description: product.name,
      redirectUrl: `${baseUrl}/zahlung-erfolgreich`,
      webhookUrl: `${baseUrl}/api/mollie-webhook`,
      metadata: {
        plan,
        name: (name || '').slice(0, 200),
        email: (email || '').slice(0, 254),
        company: (company || '').slice(0, 200),
        phone: (phone || '').slice(0, 50),
      },
    })

    return NextResponse.json({
      success: true,
      checkoutUrl: payment.getCheckoutUrl(),
    })
  } catch (err) {
    console.error('Mollie Payment-Erstellung fehlgeschlagen:', err.message, err.stack)
    // Detailliertere Fehlermeldung fuer bessere Diagnose
    const errorMsg = err.message?.includes('Invalid API key')
      ? 'Zahlungssystem-Konfiguration fehlerhaft. Bitte kontaktieren Sie uns.'
      : err.message?.includes('webhookUrl')
      ? 'Webhook-Konfiguration fehlerhaft. Bitte kontaktieren Sie uns.'
      : 'Zahlungsfehler. Bitte versuchen Sie es erneut oder schreiben Sie an steffenhefter@googlemail.com.'
    return NextResponse.json({ error: errorMsg }, { status: 500 })
  }
}

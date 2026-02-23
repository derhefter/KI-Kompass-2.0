// ============================================================
// STRIPE CHECKOUT SESSION - KI-Kompass V2
// ============================================================
// Erstellt eine Stripe Checkout Session für Premium/Strategie-Pakete
// ENV: STRIPE_SECRET_KEY, NEXT_PUBLIC_BASE_URL
// ============================================================

import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { rateLimit } from '../../../lib/rate-limit'

const limiter = rateLimit({ maxRequests: 3, windowMs: 60 * 1000 })

const PRODUCTS = {
  premium: {
    name: 'KI-Kompass Premium Report',
    description: 'Umfassender KI-Readiness Report (20+ Seiten) mit individueller Roadmap, Tool-Empfehlungen und Fördermittelübersicht',
    price: 19700, // Cent
    priceDisplay: '197',
  },
  strategie: {
    name: 'KI-Kompass Strategie-Paket',
    description: 'Premium Report + 60-Min. Video-Strategiegespräch + Persönliche KI-Strategie + Fördermittelberatung + 30 Tage E-Mail-Support',
    price: 49700,
    priceDisplay: '497',
  },
  zertifikat: {
    name: 'KI-Readiness Zertifikat',
    description: 'Offizielles KI-Ready Zertifikat für Ihr Unternehmen - zum Teilen mit Kunden und Partnern',
    price: 9700,
    priceDisplay: '97',
  },
  kurs: {
    name: 'KI-Einführung für KMU - Online-Kurs',
    description: '7 Module Selbstlernkurs mit Video-Lektionen, Arbeitsblättern, Templates und Zertifikat',
    price: 29700,
    priceDisplay: '297',
  },
}

export async function POST(request) {
  try {
    const { allowed } = limiter(request)
    if (!allowed) {
      return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 })
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Zahlungssystem nicht konfiguriert' }, { status: 500 })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const { plan, name, email, company } = await request.json()

    if (!plan || !PRODUCTS[plan]) {
      return NextResponse.json({ error: 'Ungültiger Plan' }, { status: 400 })
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail' }, { status: 400 })
    }

    const product = PRODUCTS[plan]
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ki-kompass.de'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      metadata: {
        plan,
        name: (name || '').slice(0, 200),
        company: (company || '').slice(0, 200),
      },
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/zahlung-erfolgreich?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/anfrage?plan=${plan}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe Checkout Fehler:', err.message)
    return NextResponse.json({ error: 'Zahlungsfehler' }, { status: 500 })
  }
}

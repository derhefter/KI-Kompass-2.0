'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

// Produktspezifische Inhalte fuer die Erfolgsseite
const planContent = {
  premium: {
    title: 'Premium Report',
    emailHint: 'Ihr pers\u00f6nlicher Zugangscode wurde an Ihre E-Mail-Adresse gesendet.',
    steps: [
      '\u00d6ffnen Sie die E-Mail mit Ihrem Zugangscode',
      'Klicken Sie auf den Link zum Premium Assessment',
      'Beantworten Sie die 30+ Detailfragen',
      'Erhalten Sie Ihren individuellen KI-Readiness Report (20+ Seiten)',
    ],
  },
  strategie: {
    title: 'Strategie-Paket',
    emailHint: 'Ihr pers\u00f6nlicher Zugangscode wurde an Ihre E-Mail-Adresse gesendet.',
    steps: [
      '\u00d6ffnen Sie die E-Mail mit Ihrem Zugangscode',
      'Starten Sie das Premium Assessment (30+ Detailfragen)',
      'Erhalten Sie Ihren individuellen KI-Readiness Report',
      'Wir vereinbaren einen Termin f\u00fcr Ihr 60-Min. Strategiegespr\u00e4ch',
    ],
  },
  zertifikat: {
    title: 'Premium Zertifikat',
    emailHint: 'Ihr pers\u00f6nlicher Zugangscode wurde an Ihre E-Mail-Adresse gesendet.',
    steps: [
      '\u00d6ffnen Sie die E-Mail mit Ihrem Zugangscode',
      'Absolvieren Sie das Premium Assessment (30+ Detailfragen)',
      'Ihr Premium Zertifikat (A4, druckoptimiert) wird automatisch erstellt',
      'Sie erhalten Ihr Zertifikat als HTML-Datei per E-Mail',
    ],
  },
  'zertifikat-basic': {
    title: 'Basic Badge',
    emailHint: 'Ihr pers\u00f6nlicher Zugangscode wurde an Ihre E-Mail-Adresse gesendet.',
    steps: [
      '\u00d6ffnen Sie die E-Mail mit Ihrem Zugangscode',
      'Absolvieren Sie das Premium Assessment (30+ Detailfragen)',
      'Ihr Basic Badge wird automatisch generiert',
      'Sie erhalten Ihr Badge per E-Mail \u2013 inkl. Embed-Code f\u00fcr Ihre Website',
    ],
  },
  kurs: {
    title: 'Online-Kurs: KI-Einf\u00fchrung',
    emailHint: 'Ihr pers\u00f6nlicher Zugangscode wurde an Ihre E-Mail-Adresse gesendet.',
    steps: [
      '\u00d6ffnen Sie die E-Mail mit Ihrem Zugangscode',
      'Klicken Sie auf den Link zum Kursbereich',
      'Absolvieren Sie das KI-Readiness Assessment',
      'Erhalten Sie Zugang zu allen 7 Kursmodulen',
    ],
  },
  benchmark: {
    title: 'Branchen-Benchmark Report',
    emailHint: 'Ihr pers\u00f6nlicher Zugangscode wurde an Ihre E-Mail-Adresse gesendet.',
    steps: [
      '\u00d6ffnen Sie die E-Mail mit Ihrem Zugangscode',
      'Absolvieren Sie das Assessment (30+ Detailfragen)',
      'Ihre Ergebnisse werden mit Branchendaten verglichen',
      'Sie erhalten Ihren umfassenden Benchmark Report per E-Mail',
    ],
  },
  'toolbox-starter': {
    title: 'KI-Toolbox Starter',
    emailHint: 'Ihr pers\u00f6nlicher Zugangscode wurde an Ihre E-Mail-Adresse gesendet.',
    steps: [
      '\u00d6ffnen Sie die E-Mail mit Ihrem Zugangscode',
      'Klicken Sie auf den Link zum Toolbox-Bereich',
      'Absolvieren Sie das KI-Readiness Assessment',
      'Erhalten Sie Zugang zu Ihren Toolbox-Ressourcen',
    ],
  },
  'toolbox-pro': {
    title: 'KI-Toolbox Professional',
    emailHint: 'Ihr pers\u00f6nlicher Zugangscode wurde an Ihre E-Mail-Adresse gesendet.',
    steps: [
      '\u00d6ffnen Sie die E-Mail mit Ihrem Zugangscode',
      'Klicken Sie auf den Link zum Toolbox-Bereich',
      'Absolvieren Sie das KI-Readiness Assessment',
      'Erhalten Sie Zugang zu allen Professional-Ressourcen inkl. Priority Support',
    ],
  },
  'monitoring-basic': {
    title: 'KI-Monitoring Basic',
    emailHint: 'Ihr pers\u00f6nlicher Zugangscode wurde an Ihre E-Mail-Adresse gesendet.',
    steps: [
      '\u00d6ffnen Sie die E-Mail mit Ihrem Zugangscode',
      'Starten Sie Ihr erstes KI-Readiness Assessment',
      'Erhalten Sie Ihren individuellen Report',
      'Alle 3 Monate werden Sie zum Re-Assessment eingeladen',
    ],
  },
  'monitoring-pro': {
    title: 'KI-Monitoring Pro',
    emailHint: 'Ihr pers\u00f6nlicher Zugangscode wurde an Ihre E-Mail-Adresse gesendet.',
    steps: [
      '\u00d6ffnen Sie die E-Mail mit Ihrem Zugangscode',
      'Starten Sie Ihr erstes KI-Readiness Assessment',
      'Erhalten Sie Ihren individuellen Report + Branchen-Benchmark',
      'Quartals-Re-Assessment, News-Digest und Priority Support inklusive',
    ],
  },
}

const defaultContent = planContent.premium

function ZahlungErfolgreichContent() {
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'premium'
  const content = planContent[plan] || defaultContent

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-lg mx-auto px-4">
        <div className="card text-center">
          <div className="w-16 h-16 bg-accent-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-primary-700 mb-2">Zahlung erfolgreich!</h1>
          <p className="text-slate-600 mb-2">
            Vielen Dank f&uuml;r Ihre Bestellung des <strong>{content.title}</strong>.
          </p>
          <p className="text-slate-500 text-sm mb-8">
            Ihre Zahlung wurde erfolgreich verarbeitet.
          </p>

          <div className="bg-accent-50 border border-accent-200 rounded-lg p-5 mb-5">
            <svg className="w-6 h-6 text-accent-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="font-semibold text-primary-700 text-sm mb-1">Best&auml;tigung per E-Mail gesendet</p>
            <p className="text-slate-600 text-xs">
              {content.emailHint}
              {' '}Bitte pr&uuml;fen Sie auch Ihren Spam-Ordner.
            </p>
          </div>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-5 mb-6">
            <h3 className="font-semibold text-primary-700 text-sm mb-3">So geht es weiter:</h3>
            <ol className="text-left text-slate-700 text-sm space-y-2">
              {content.steps.map((step, i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mr-2.5 mt-0.5 flex-shrink-0">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Next Best Action: Beratung buchen */}
          <div className="bg-warm-50 border border-warm-200 rounded-lg p-5 mb-5">
            <h3 className="font-semibold text-primary-700 text-sm mb-2">M&ouml;chten Sie Ihre Ergebnisse besprechen?</h3>
            <p className="text-slate-600 text-xs mb-3">
              In einer kostenlosen 30-Minuten-Erstberatung besprechen wir Ihren Report,
              pr&uuml;fen passende F&ouml;rderprogramme und erarbeiten konkrete n&auml;chste Schritte.
            </p>
            <a href="/beratung" className="inline-flex items-center px-5 py-2.5 text-white text-sm font-semibold bg-accent-500 rounded-lg hover:bg-accent-600 transition-colors">
              30 Min Erstberatung buchen
              <svg className="w-3.5 h-3.5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          <a href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-primary-500 transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zur&uuml;ck zur Startseite
          </a>
        </div>
      </div>
    </div>
  )
}

export default function ZahlungErfolgreich() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 py-20">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="card"><p>Wird geladen...</p></div>
        </div>
      </div>
    }>
      <ZahlungErfolgreichContent />
    </Suspense>
  )
}

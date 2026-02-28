'use client'

import { useState, useEffect } from 'react'
import { premiumQuestions, calculateScore, getRecommendations, getQuickWins, foerderprogramme } from '../../data/questions'

export default function ToolboxZugang() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [customerPlan, setCustomerPlan] = useState('toolbox-starter')
  const [showIntro, setShowIntro] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [verifying, setVerifying] = useState(true)
  const [accessCode, setAccessCode] = useState('')
  const [loginError, setLoginError] = useState('')
  const [resultsSent, setResultsSent] = useState(false)

  // Zugangsprüfung per individuellem Code
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (code) {
      setAccessCode(code)
      verifyCode(code)
    } else {
      setVerifying(false)
    }
  }, [])

  // Ergebnisse per E-Mail senden (Kunde + Steffen) + Auto-PDF
  async function sendResults(resultData) {
    if (resultsSent) return
    try {
      const res = await fetch('/api/send-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: accessCode,
          companyName,
          contactName,
          contactEmail,
          results: resultData,
          productType: 'toolbox',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setResultsSent(true)
        // Auto-PDF Report generieren und senden (fire-and-forget)
        fetch('/api/generate-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code: accessCode,
            companyName,
            contactName,
            contactEmail,
            results: resultData,
          }),
        }).catch(() => {})
      }
    } catch {
      // Stille Fehlerbehandlung – Report wird trotzdem angezeigt
    }
  }

  async function verifyCode(code) {
    setVerifying(true)
    setLoginError('')
    try {
      const res = await fetch('/api/verify-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()
      if (data.valid) {
        // Prüfen ob der Code für ein Toolbox-Produkt ist
        if (!data.plan || !data.plan.startsWith('toolbox')) {
          setLoginError('Dieser Zugangscode ist für ein anderes Produkt.')
        } else {
          setAuthorized(true)
          setContactName(data.name || '')
          setContactEmail(data.email || '')
          setCompanyName(data.company || '')
          setCustomerPlan(data.plan || 'toolbox-starter')
        }
      } else if (data.expired) {
        setLoginError('Ihr Zugangscode ist abgelaufen. Bitte kontaktieren Sie uns für eine Verlängerung: steffenhefter@googlemail.com')
      } else {
        setLoginError('Ungültiger Zugangscode. Bitte prüfen Sie Ihren Link.')
      }
    } catch {
      setLoginError('Verbindungsfehler. Bitte versuchen Sie es erneut.')
    }
    setVerifying(false)
  }

  if (verifying) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="card">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Zugang wird gepr&uuml;ft...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-lg mx-auto px-4">
          <div className="card text-center">
            <svg className="w-16 h-16 text-emerald-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">KI-Toolbox Zugang</h1>
            <p className="text-gray-600 mb-6">
              Bitte geben Sie Ihren pers&ouml;nlichen Zugangscode ein, den Sie per E-Mail erhalten haben.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (accessCode.trim()) verifyCode(accessCode.trim())
              }}
              className="space-y-4 text-left"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zugangscode</label>
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => { setAccessCode(e.target.value); setLoginError('') }}
                  placeholder="Ihr Zugangscode"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-center text-lg tracking-wider"
                  autoFocus
                />
              </div>

              {loginError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={!accessCode.trim()}
                className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}
              >
                Zugang freischalten
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">Noch keinen Zugangscode?</p>
              <a href="/#preise" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                Zu den Preisen &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="card">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17l-5.1-5.1M20 7l-8 8-4-4M14.828 14.828a4 4 0 01-5.656 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">KI-Toolbox</h1>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mb-3 text-white" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
                {customerPlan === 'toolbox-pro' ? 'Pro' : 'Starter'}
              </div>
              <p className="text-gray-600">
                Absolvieren Sie zuerst das KI-Readiness Assessment. Anschlie&szlig;end erhalten Sie Zugang zu Ihrer pers&ouml;nlichen KI-Toolbox.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unternehmensname *</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Muster GmbH"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ihr Name *</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Max Mustermann"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail *</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="max@muster-gmbh.de"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (companyName && contactName && contactEmail) {
                  setShowIntro(false)
                }
              }}
              disabled={!companyName || !contactName || !contactEmail}
              className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}
            >
              Assessment starten
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }

  const question = premiumQuestions[currentQuestion]
  const progress = ((currentQuestion) / premiumQuestions.length) * 100

  function handleAnswer(option) {
    const newAnswers = [...answers, { questionId: question.id, score: option.score, text: option.text }]
    setAnswers(newAnswers)

    if (currentQuestion < premiumQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
      // Ergebnisse automatisch per E-Mail senden
      const result = calculateScore(newAnswers, premiumQuestions)
      const recs = getRecommendations(result.categoryScores, result.level)
      const qw = getQuickWins(result.level)
      sendResults({
        percentage: result.percentage,
        level: result.level,
        levelTitle: result.levelTitle,
        categoryScores: result.categoryScores,
        quickWins: qw,
        recommendations: recs,
        answers: newAnswers,
      })
    }
  }

  function handleBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
    }
  }

  if (showResults) {
    const result = calculateScore(answers, premiumQuestions)
    const recommendations = getRecommendations(result.categoryScores, result.level)
    const quickWins = getQuickWins(result.level)

    const toolboxResources = [
      {
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        ),
        title: '50+ Prompt-Templates',
        desc: 'Sofort einsetzbare Prompts für Marketing, Vertrieb, HR und Buchhaltung.',
      },
      {
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
        title: 'KI-Policy Vorlage',
        desc: 'DSGVO-konforme Unternehmensrichtlinie für den Einsatz von KI-Tools.',
      },
      {
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        ),
        title: 'Datenschutz-Folgenabschätzung (DSFA)',
        desc: 'Vorlage zur Bewertung von Datenschutzrisiken beim KI-Einsatz.',
      },
      {
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        ),
        title: 'KI-Anbieter-Vergleich',
        desc: 'Detaillierter Vergleich von 17+ KI-Tools mit Bewertungen und Empfehlungen.',
      },
      {
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        ),
        title: 'Checkliste KI-Einführung',
        desc: '24 Punkte in 3 Phasen für eine strukturierte KI-Implementierung.',
      },
    ]

    const proResources = [
      {
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        ),
        title: 'Video-Tutorials',
        desc: 'Schritt-für-Schritt Anleitungen für alle KI-Tools und Templates.',
      },
      {
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        ),
        title: 'Branchen-spezifische Vorlagen',
        desc: 'Angepasste Templates für Ihre Branche und Unternehmensgröße.',
      },
      {
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
        title: 'Compliance-Templates',
        desc: 'Erweiterte Vorlagen für EU AI Act Compliance und Dokumentation.',
      },
      {
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ),
        title: 'Priority Support',
        desc: 'Bevorzugter E-Mail-Support mit garantierter Antwortzeit.',
      },
    ]

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Report Header */}
          <div className="card text-center mb-8 fade-in-up">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mb-4 text-white" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
              KI-Toolbox Report
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              KI-Readiness Report f&uuml;r {companyName}
            </h1>
            <p className="text-gray-500">Erstellt am {new Date().toLocaleDateString('de-DE')} &bull; Kontakt: {contactName}</p>
            {resultsSent && (
              <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Report wurde an {contactEmail} gesendet
              </div>
            )}
          </div>

          {/* Score */}
          <div className="card text-center mb-8 fade-in-up">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ihr KI-Reifegrad</h2>
            <div className="flex justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke={result.levelColor} strokeWidth="10" strokeLinecap="round" strokeDasharray="314" strokeDashoffset={314 - (314 * result.percentage) / 100} className="score-circle" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold" style={{ color: result.levelColor }}>{result.percentage}%</span>
                  <span className="text-sm text-gray-500">KI-Readiness</span>
                </div>
              </div>
            </div>
            <div className="inline-flex items-center px-6 py-3 rounded-full text-white font-semibold text-lg mb-4" style={{ backgroundColor: result.levelColor }}>
              Level {result.level}: {result.levelTitle}
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">{result.levelDescription}</p>
          </div>

          {/* Detailed Category Scores */}
          <div className="card mb-8 fade-in-up">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Detailauswertung nach Bereichen</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {result.categoryScores.map((cat) => (
                <div key={cat.key} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">{cat.label}</span>
                    <span className="text-lg font-bold" style={{ color: cat.percentage > 60 ? '#22c55e' : cat.percentage > 35 ? '#f59e0b' : '#ef4444' }}>
                      {cat.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div className="h-3 rounded-full progress-bar" style={{ width: `${cat.percentage}%`, backgroundColor: cat.percentage > 60 ? '#22c55e' : cat.percentage > 35 ? '#f59e0b' : '#ef4444' }} />
                  </div>
                  <p className="text-xs text-gray-500">
                    {cat.percentage > 60 ? 'Gute Grundlage vorhanden' : cat.percentage > 35 ? 'Verbesserungspotenzial erkannt' : 'Handlungsbedarf identifiziert'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* All Recommendations */}
          <div className="card mb-8 fade-in-up">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Individuelle Handlungsempfehlungen</h2>
            {recommendations.map((rec, i) => (
              <div key={i} className="mb-8 last:mb-0 pb-8 last:pb-0 border-b last:border-0 border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-md text-xs font-semibold uppercase ${rec.priority === 'hoch' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {rec.priority}
                  </span>
                  <span className="text-sm text-gray-500">{rec.category}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{rec.title}</h3>
                <ul className="space-y-2">
                  {rec.actions.map((action, j) => (
                    <li key={j} className="flex items-start text-gray-600">
                      <svg className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Quick Wins */}
          <div className="card mb-8 fade-in-up">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ihre Quick-Wins zum Sofort-Start</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {quickWins.map((qw, i) => (
                <div key={i} className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                  <div className="text-xs font-semibold text-emerald-600 uppercase mb-2">{qw.effort}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{qw.title}</h3>
                  <p className="text-sm text-gray-600">{qw.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Foerderprogramme */}
          <div className="card mb-8 fade-in-up">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Relevante F&ouml;rderprogramme</h2>
            <div className="space-y-4">
              {foerderprogramme.map((fp, i) => (
                <div key={i} className="flex items-start p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{fp.name}</h3>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{fp.betrag}</span>
                    </div>
                    <p className="text-sm text-gray-600">{fp.beschreibung}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KI-Implementierungs-Roadmap */}
          <div className="card mb-8 fade-in-up">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ihre KI-Implementierungs-Roadmap</h2>
            <div className="space-y-6">
              {[
                { phase: 'Phase 1: AI Awareness', zeit: 'Monat 1-2', tasks: ['KI-Awareness Schulung durchführen', 'KI-Richtlinie erstellen', 'Erste KI-Tools testen (ChatGPT, Copilot)', 'Use-Cases sammeln und bewerten'] },
                { phase: 'Phase 2: AI Readiness', zeit: 'Monat 3-4', tasks: ['Datenqualität analysieren und verbessern', 'Infrastruktur prüfen (Cloud, APIs)', 'Top-3 Use-Cases als Pilotprojekte definieren', 'KI-Champions im Team benennen'] },
                { phase: 'Phase 3: AI Steadiness', zeit: 'Monat 5-6', tasks: ['Pilotprojekte umsetzen', 'Erfolge messen und kommunizieren', 'Prozesse dokumentieren und skalieren', 'Nächste Ausbaustufe planen'] },
              ].map((phase, i) => (
                <div key={i} className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-10 h-10 text-white rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: '#059669' }}>
                      {i + 1}
                    </div>
                    {i < 2 && <div className="w-0.5 h-full bg-emerald-200 mt-2" />}
                  </div>
                  <div className="pb-6">
                    <h3 className="font-bold text-gray-900">{phase.phase}</h3>
                    <p className="text-sm text-emerald-600 mb-2">{phase.zeit}</p>
                    <ul className="space-y-1">
                      {phase.tasks.map((task, j) => (
                        <li key={j} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Toolbox Resources */}
          <div className="card mb-8 fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Ihre Toolbox-Ressourcen</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {toolboxResources.map((res, i) => (
                <div key={i} className="flex items-start p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    {res.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{res.title}</h3>
                    <p className="text-sm text-gray-600">{res.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pro Resources */}
            {customerPlan === 'toolbox-pro' && (
              <div className="mt-6 pt-6 border-t border-emerald-200">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mb-4 text-white" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
                  Pro-Exklusiv
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {proResources.map((res, i) => (
                    <div key={i} className="flex items-start p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 text-white" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
                        {res.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{res.title}</h3>
                        <p className="text-sm text-gray-600">{res.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info Box */}
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start">
              <svg className="w-5 h-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-emerald-800">
                Ihre Toolbox-Ressourcen werden Ihnen in K&uuml;rze per E-Mail zugesendet.
              </p>
            </div>
          </div>

          {/* Download / Print Button */}
          <div className="card text-center mb-8 bg-emerald-50 border-emerald-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ihren Report speichern</h2>
            <p className="text-gray-600 mb-6">
              Ein ausf&uuml;hrlicher PDF-Report (20+ Seiten) wurde automatisch an <strong>{contactEmail}</strong> gesendet.
              Alternativ k&ouml;nnen Sie diese Seite direkt drucken.
            </p>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Diese Seite als PDF drucken
            </button>
          </div>

          {/* Strategie-Paket Hinweis */}
          <div className="card border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 to-white text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Sie m&ouml;chten noch mehr?
            </h2>
            <p className="text-gray-600 mb-4 max-w-xl mx-auto">
              Mit unserem <strong>Strategie-Paket</strong> erhalten Sie zus&auml;tzlich zu Ihrer KI-Toolbox:
            </p>
            <ul className="text-left max-w-md mx-auto mb-6 space-y-2">
              <li className="flex items-start text-gray-700">
                <svg className="w-5 h-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                60-Min. pers&ouml;nliches Video-Strategiegespr&auml;ch
              </li>
              <li className="flex items-start text-gray-700">
                <svg className="w-5 h-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Individuelle KI-Strategie f&uuml;r Ihr Unternehmen
              </li>
              <li className="flex items-start text-gray-700">
                <svg className="w-5 h-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Pers&ouml;nliche F&ouml;rdermittelberatung
              </li>
              <li className="flex items-start text-gray-700">
                <svg className="w-5 h-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                30 Tage E-Mail-Support
              </li>
            </ul>
            <a
              href="/anfrage?plan=strategie"
              className="inline-flex items-center py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}
            >
              Strategie-Paket entdecken
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">
              Frage {currentQuestion + 1} von {premiumQuestions.length}
            </span>
            <span className="text-sm font-medium text-emerald-600">
              {question.categoryLabel}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="h-2.5 rounded-full progress-bar" style={{ width: `${progress}%`, backgroundColor: '#059669' }} />
          </div>
        </div>

        {/* Question */}
        <div className="card fade-in-up" key={currentQuestion}>
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 rounded-md text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>Toolbox</span>
            <span className="text-sm text-gray-500">{question.categoryLabel}</span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-emerald-100 flex items-center justify-center mr-4 flex-shrink-0 transition-colors">
                    <span className="text-sm font-semibold text-gray-500 group-hover:text-emerald-600 transition-colors">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{option.text}</span>
                </div>
              </button>
            ))}
          </div>

          {currentQuestion > 0 && (
            <button onClick={handleBack} className="mt-6 text-sm text-gray-500 hover:text-gray-700 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Zur&uuml;ck
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

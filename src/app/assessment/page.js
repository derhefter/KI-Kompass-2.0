'use client'

import { useState } from 'react'
import { freeQuestions, calculateScore, getRecommendations, getQuickWins } from '../../data/questions'
import UpsellCards from '../../components/UpsellCards'

// Microcopy for encouragement during the check
function getMicrocopy(questionIndex, total) {
  const remaining = total - questionIndex
  const minutes = Math.ceil(remaining * 0.4) // ~25 seconds per question

  if (questionIndex === 0) return 'Es gibt keine falschen Antworten \u2013 w\u00e4hlen Sie, was am besten zu Ihrer Situation passt.'
  if (questionIndex === 4) return 'Super, der erste Bereich ist geschafft! Weiter geht\u2019s mit Ihren Prozessen.'
  if (questionIndex === 8) return 'Fast geschafft! Noch 4 Fragen, dann sehen Sie Ihr Ergebnis.'
  if (questionIndex === 10) return 'Gut gemacht! Gleich sehen Sie Ihren individuellen KI-Reifegrad.'

  if (minutes <= 1) return 'Noch eine Minute \u2013 gleich haben Sie Ihr Ergebnis.'
  return `Noch ca. ${minutes} Minuten \u2013 Ihre Angaben sind sicher und werden nur f\u00fcr Ihre Auswertung verwendet.`
}

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showEmailGate, setShowEmailGate] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [name, setName] = useState('')
  const [emailError, setEmailError] = useState('')

  const question = freeQuestions[currentQuestion]
  const progress = ((currentQuestion) / freeQuestions.length) * 100

  function handleAnswer(option) {
    const newAnswers = [...answers, { questionId: question.id, score: option.score, text: option.text }]
    setAnswers(newAnswers)

    if (currentQuestion < freeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // All questions answered -> show email gate
      setShowEmailGate(true)
    }
  }

  function handleBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
    }
  }

  async function handleEmailSubmit(e) {
    e.preventDefault()
    setEmailError('')

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Bitte geben Sie eine g\u00fcltige E-Mail-Adresse ein.')
      return
    }
    if (!company.trim()) {
      setEmailError('Bitte geben Sie Ihren Firmennamen ein.')
      return
    }

    // Calculate result for API
    const result = calculateScore(answers, freeQuestions)

    // Send lead data
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          company,
          name,
          score: result.percentage,
          level: result.level,
          answers,
          categoryScores: result.categoryScores,
        }),
      })
    } catch {
      // API not reachable - still show results
    }

    setShowResults(true)
  }

  // === EMAIL GATE SCREEN ===
  if (showEmailGate && !showResults) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-lg mx-auto px-4">
          {/* Progress complete */}
          <div className="mb-8">
            <div className="w-full bg-slate-200 rounded-full h-2.5">
              <div className="bg-accent-500 h-2.5 rounded-full transition-all duration-500" style={{ width: '100%' }} />
            </div>
            <p className="text-sm text-accent-600 font-medium mt-2 text-center">Alle Fragen beantwortet!</p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200 fade-in-up">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-primary-700 mb-2">
                Fast geschafft!
              </h1>
              <p className="text-slate-600">
                Wohin d&uuml;rfen wir Ihr Ergebnis senden? Sie erhalten Ihren KI-Reifegrad sofort
                und eine PDF-Zusammenfassung per E-Mail.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">E-Mail-Adresse *</label>
                <input
                  type="email"
                  placeholder="ihre@firma.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Firmenname *</label>
                <input
                  type="text"
                  placeholder="Ihre Firma GmbH"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ihr Name (optional)</label>
                <input
                  type="text"
                  placeholder="Max Mustermann"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {emailError && (
                <p className="text-red-600 text-sm">{emailError}</p>
              )}

              <button
                type="submit"
                className="w-full px-6 py-4 text-lg font-semibold text-white bg-primary-500 rounded-xl hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl"
              >
                Ergebnis anzeigen
                <svg className="w-5 h-5 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-500">
              <span className="flex items-center">
                <svg className="w-3.5 h-3.5 mr-1 text-accent-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                DSGVO-konform
              </span>
              <span>Kein Spam</span>
              <span>Jederzeit abbestellbar</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // === RESULTS SCREEN ===
  if (showResults) {
    const result = calculateScore(answers, freeQuestions)
    const recommendations = getRecommendations(result.categoryScores, result.level)
    const quickWins = getQuickWins(result.level)

    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Score Header */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 text-center mb-8 fade-in-up">
            <h1 className="text-2xl font-bold text-primary-700 mb-2">Ihr KI-Readiness Ergebnis</h1>
            <p className="text-slate-500 mb-8">Basierend auf dem 3-Phasen-Modell: AI Awareness &rarr; Readiness &rarr; Steadiness</p>

            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-48">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke={result.levelColor}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="314"
                    strokeDashoffset={314 - (314 * result.percentage) / 100}
                    className="score-circle"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold" style={{ color: result.levelColor }}>
                    {result.percentage}%
                  </span>
                  <span className="text-sm text-slate-500">KI-Readiness</span>
                </div>
              </div>
            </div>

            <div
              className="inline-flex items-center px-6 py-3 rounded-full text-white font-semibold text-lg mb-4"
              style={{ backgroundColor: result.levelColor }}
            >
              Level {result.level}: {result.levelTitle}
            </div>
            <p className="text-slate-600 max-w-2xl mx-auto">{result.levelDescription}</p>

            {/* Encouragement */}
            <p className="text-sm text-slate-500 mt-4 italic">
              Jedes Unternehmen startet anders &ndash; wichtig ist der erste Schritt.
            </p>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8 fade-in-up fade-in-up-delay-1">
            <h2 className="text-xl font-bold text-primary-700 mb-6">Ihre Ergebnisse im Detail</h2>
            <div className="space-y-4">
              {result.categoryScores.map((cat) => (
                <div key={cat.key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-slate-700">{cat.label}</span>
                    <span className="text-sm font-bold" style={{ color: cat.percentage > 60 ? '#0D9488' : cat.percentage > 35 ? '#f59e0b' : '#ef4444' }}>
                      {cat.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full progress-bar"
                      style={{
                        width: `${cat.percentage}%`,
                        backgroundColor: cat.percentage > 60 ? '#0D9488' : cat.percentage > 35 ? '#f59e0b' : '#ef4444',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Wins */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8 fade-in-up fade-in-up-delay-2">
            <h2 className="text-xl font-bold text-primary-700 mb-6">Ihre Quick-Wins</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {quickWins.map((qw, i) => (
                <div key={i} className="bg-accent-50 rounded-xl p-5 border border-accent-200">
                  <div className="text-xs font-semibold text-accent-600 uppercase mb-2">{qw.effort}</div>
                  <h3 className="font-bold text-primary-700 mb-2">{qw.title}</h3>
                  <p className="text-sm text-slate-600">{qw.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Recommendations */}
          {recommendations.length > 0 && (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8 fade-in-up fade-in-up-delay-3">
              <h2 className="text-xl font-bold text-primary-700 mb-6">Ihre Top-Priorit&auml;ten</h2>
              {recommendations.slice(0, 3).map((rec, i) => (
                <div key={i} className="mb-6 last:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold uppercase ${rec.priority === 'hoch' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      Priorit&auml;t: {rec.priority}
                    </span>
                    <span className="text-sm text-slate-500">{rec.category}</span>
                  </div>
                  <h3 className="font-bold text-primary-700 mb-2">{rec.title}</h3>
                  <ul className="space-y-1">
                    {rec.actions.slice(0, 2).map((action, j) => (
                      <li key={j} className="flex items-start text-sm text-slate-600">
                        <svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {action}
                      </li>
                    ))}
                    <li className="text-sm text-slate-400 italic ml-6">+ weitere Ma&szlig;nahmen im Premium Report</li>
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* F\u00f6rder-Hinweis */}
          <div className="bg-accent-50 rounded-xl p-6 border border-accent-200 mb-8 fade-in-up">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-accent-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-accent-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-primary-700 mb-1">F&ouml;rder-Hinweis</h3>
                <p className="text-slate-600 text-sm">
                  F&uuml;r Ihr Unternehmensprofil gibt es passende F&ouml;rderprogramme (z.B. go-digital, Sachsen-Anhalt DIGITAL).
                  Bis zu 50% der Kosten k&ouml;nnen gef&ouml;rdert werden. Details erfahren Sie in der Erstberatung oder im Premium Report.
                </p>
              </div>
            </div>
          </div>

          {/* Upsell Cards: Premium + Beratung */}
          <div className="fade-in-up">
            <UpsellCards />
          </div>

          {/* Nurture Block */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mt-8 text-center">
            <svg className="w-10 h-10 text-accent-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="font-semibold text-primary-700 mb-1">Ihr Ergebnis wurde an {email} gesendet.</p>
            <p className="text-sm text-slate-600">
              Sie erhalten in den n&auml;chsten Tagen: Ihre Ergebnis-Zusammenfassung als PDF,
              KI-Tipps passend zu Ihrem Reifegrad und F&ouml;rder-Updates f&uuml;r Ihre Region.
            </p>
          </div>

          {/* Transparency */}
          <div className="mt-8 text-center text-xs text-slate-500">
            <p>
              Ihre Daten werden DSGVO-konform verarbeitet. Keine Weitergabe an Dritte.
              Methodik basierend auf etablierten KI-Reifegradmodellen.
            </p>
            <p className="mt-1">
              Fragen? <a href="mailto:ki-kompass@derhefter.com" className="text-primary-500 hover:underline">ki-kompass@derhefter.com</a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // === QUESTION SCREEN ===
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-500">
              Frage {currentQuestion + 1} von {freeQuestions.length}
            </span>
            <span className="text-sm font-medium text-primary-500">
              {question.categoryLabel}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div
              className="bg-primary-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Microcopy */}
          <p className="text-xs text-slate-500 mt-2">
            {getMicrocopy(currentQuestion, freeQuestions.length)}
          </p>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 fade-in-up" key={currentQuestion}>
          <h2 className="text-xl md:text-2xl font-bold text-primary-700 mb-8">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-4 rounded-xl border-2 border-slate-200 hover:border-primary-400 hover:bg-primary-50 transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary-100 flex items-center justify-center mr-4 flex-shrink-0 transition-colors">
                    <span className="text-sm font-semibold text-slate-500 group-hover:text-primary-600 transition-colors">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </div>
                  <span className="text-slate-700 group-hover:text-primary-700 transition-colors">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {currentQuestion > 0 && (
            <button
              onClick={handleBack}
              className="mt-6 text-sm text-slate-500 hover:text-slate-700 flex items-center transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Zur&uuml;ck
            </button>
          )}
        </div>

        {/* Tipp below card */}
        {currentQuestion === 0 && (
          <p className="text-center text-xs text-slate-400 mt-4">
            Tipp: Antworten Sie aus dem Bauch heraus &ndash; Perfektion ist nicht n&ouml;tig.
          </p>
        )}
      </div>
    </div>
  )
}

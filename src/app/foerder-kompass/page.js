'use client'

import { useState } from 'react'
import { foerderprogrammeDB, matchFoerderprogramme } from '../../data/foerderprogramme'

const BUNDESLAENDER = [
  'baden-wuerttemberg', 'bayern', 'berlin', 'brandenburg', 'bremen', 'hamburg',
  'hessen', 'mecklenburg-vorpommern', 'niedersachsen', 'nordrhein-westfalen',
  'rheinland-pfalz', 'saarland', 'sachsen', 'sachsen-anhalt', 'schleswig-holstein', 'thueringen'
]
const BL_LABELS = {
  'baden-wuerttemberg': 'Baden-W\u00fcrttemberg', 'bayern': 'Bayern', 'berlin': 'Berlin', 'brandenburg': 'Brandenburg',
  'bremen': 'Bremen', 'hamburg': 'Hamburg', 'hessen': 'Hessen', 'mecklenburg-vorpommern': 'Mecklenburg-Vorpommern',
  'niedersachsen': 'Niedersachsen', 'nordrhein-westfalen': 'Nordrhein-Westfalen', 'rheinland-pfalz': 'Rheinland-Pfalz',
  'saarland': 'Saarland', 'sachsen': 'Sachsen', 'sachsen-anhalt': 'Sachsen-Anhalt',
  'schleswig-holstein': 'Schleswig-Holstein', 'thueringen': 'Th\u00fcringen'
}
const BRANCHEN = ['Handwerk', 'Dienstleistung', 'Produktion', 'Handel', 'IT', 'Gesundheit', 'Sonstiges']
const GROESSEN = [
  { value: 5, label: '1-10 Mitarbeitende' },
  { value: 25, label: '11-50 Mitarbeitende' },
  { value: 100, label: '51-250 Mitarbeitende' },
]
const VORHABEN = [
  { value: 'beratung', label: 'KI-Beratung' },
  { value: 'tools', label: 'KI-Tools & Software' },
  { value: 'schulungen', label: 'Schulungen & Weiterbildung' },
  { value: 'digitalisierung', label: 'Digitalisierung allgemein' },
]

export default function FoerderKompass() {
  const [step, setStep] = useState(0)
  const [bundesland, setBundesland] = useState('')
  const [branche, setBranche] = useState('')
  const [groesse, setGroesse] = useState(null)
  const [vorhaben, setVorhaben] = useState([])
  const [results, setResults] = useState(null)
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  function handleSearch() {
    const matched = matchFoerderprogramme({ bundesland, branche: branche.toLowerCase(), mitarbeiter: groesse, vorhaben })
    setResults(matched)
    setStep(5)
  }

  if (results) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="card text-center mb-8 fade-in-up">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Ihre F&ouml;rderprogramm-Ergebnisse</h1>
            <p className="text-gray-600">{results.length} passende Programme gefunden</p>
          </div>

          {results.map((fp, i) => (
            <div key={fp.id} className="card mb-4 fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{fp.name}</h3>
                  <p className="text-sm text-gray-500">{fp.traeger}</p>
                </div>
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-bold">
                  bis {fp.maxFoerderung.toLocaleString('de-DE')} &euro;
                </span>
              </div>
              <p className="text-gray-600 mb-3">{fp.beschreibung}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">F&ouml;rderquote: {fp.foerderquote}</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{fp.maxMitarbeiter < 500 ? `Bis ${fp.maxMitarbeiter} MA` : 'Alle Gr\u00f6\u00dfen'}</span>
                {fp.matchReasons?.map((r, j) => (
                  <span key={j} className="text-xs bg-accent-100 text-accent-700 px-2 py-1 rounded-full">{r}</span>
                ))}
              </div>
            </div>
          ))}

          {/* Email Capture */}
          {!emailSent && (
            <div className="card bg-primary-50 border-primary-200 mt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">F&ouml;rder-Fahrplan per E-Mail erhalten</h3>
              <p className="text-gray-600 text-center mb-4">Wir senden Ihnen eine Zusammenfassung mit allen passenden Programmen.</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input type="text" placeholder="Firma" value={company} onChange={(e) => setCompany(e.target.value)} className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 outline-none" />
                <input type="email" placeholder="ihre@email.de" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 outline-none" />
                <button onClick={async () => {
                  if (email && company) {
                    try { await fetch('/api/foerder-lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, company, bundesland, branche, groesse, vorhaben, matchedPrograms: results.map(r => r.name) }) }) } catch {}
                    setEmailSent(true)
                  }
                }} className="btn-primary !py-3">Senden</button>
              </div>
            </div>
          )}
          {emailSent && (
            <div className="card bg-accent-50 border-accent-200 text-center mt-8">
              <p className="font-semibold text-gray-900">Vielen Dank! Wir senden Ihnen Ihren F&ouml;rder-Fahrplan.</p>
            </div>
          )}

          {/* Upsell */}
          <div className="card border-2 border-accent-400 bg-gradient-to-br from-accent-50 to-white mt-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Professionelle F&ouml;rdermittelberatung</h3>
            <p className="text-gray-600 mb-4">Wir pr&uuml;fen Ihre F&ouml;rderf&auml;higkeit, erstellen den Antrag und begleiten Sie durch den gesamten Prozess.</p>
            <a href="/anfrage?plan=strategie" className="btn-accent">Strategie-Paket mit F&ouml;rdermittelberatung (&euro;497)</a>
          </div>
        </div>
      </div>
    )
  }

  const steps = [
    { title: 'Bundesland', desc: 'In welchem Bundesland ist Ihr Unternehmen ans\u00e4ssig?' },
    { title: 'Branche', desc: 'In welcher Branche ist Ihr Unternehmen t\u00e4tig?' },
    { title: 'Gr\u00f6\u00dfe', desc: 'Wie viele Mitarbeitende hat Ihr Unternehmen?' },
    { title: 'Vorhaben', desc: 'Was m\u00f6chten Sie mit KI/Digitalisierung erreichen?' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">F&ouml;rder-Kompass</h1>
          <p className="text-gray-600">Finden Sie in 4 Schritten passende F&ouml;rderprogramme f&uuml;r Ihr KI-Vorhaben</p>
        </div>

        {/* Progress */}
        <div className="flex justify-between mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i <= step ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{i + 1}</div>
              {i < steps.length - 1 && <div className={`w-12 sm:w-20 h-1 mx-2 ${i < step ? 'bg-primary-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="card fade-in-up" key={step}>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{steps[step]?.title}</h2>
          <p className="text-gray-600 mb-6">{steps[step]?.desc}</p>

          {step === 0 && (
            <div className="grid grid-cols-2 gap-3">
              {BUNDESLAENDER.map(bl => (
                <button key={bl} onClick={() => { setBundesland(bl); setStep(1) }}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${bundesland === bl ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}>
                  {BL_LABELS[bl]}
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              {BRANCHEN.map(b => (
                <button key={b} onClick={() => { setBranche(b); setStep(2) }}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-primary-400 hover:bg-primary-50 text-left transition-all">
                  {b}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              {GROESSEN.map(g => (
                <button key={g.value} onClick={() => { setGroesse(g.value); setStep(3) }}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-primary-400 hover:bg-primary-50 text-left transition-all">
                  {g.label}
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              {VORHABEN.map(v => (
                <button key={v.value} onClick={() => {
                  const newV = vorhaben.includes(v.value) ? vorhaben.filter(x => x !== v.value) : [...vorhaben, v.value]
                  setVorhaben(newV)
                }}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${vorhaben.includes(v.value) ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}>
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${vorhaben.includes(v.value) ? 'bg-primary-600 border-primary-600' : 'border-gray-300'}`}>
                      {vorhaben.includes(v.value) && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                    </div>
                    {v.label}
                  </div>
                </button>
              ))}
              <button onClick={handleSearch} disabled={vorhaben.length === 0}
                className="btn-primary w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
                F&ouml;rderprogramme suchen
              </button>
            </div>
          )}

          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="mt-4 text-sm text-gray-500 hover:text-gray-700 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Zur&uuml;ck
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

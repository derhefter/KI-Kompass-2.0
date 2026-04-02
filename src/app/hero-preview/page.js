'use client'

import { useState } from 'react'

// ============================================================
// HERO IMAGE PREVIEW - Zum Testen verschiedener Hero-Stile
// Aufruf: /hero-preview
// Diese Seite ist nur für die interne Auswahl gedacht.
//
// SO VERWENDEST DU EIN EIGENES BILD:
// 1. Bild in /public/ Ordner legen (z.B. hero-workshop.jpg)
// 2. Unten in heroStyles einen neuen Eintrag hinzufügen
// 3. Seite aufrufen und vergleichen
// ============================================================

const heroStyles = [
  {
    id: 'gradient-only',
    name: 'Gradient (kein Bild)',
    desc: 'Sauberer Gradient-Hintergrund ohne Bild. Minimalistisch, schnelle Ladezeit.',
    bgClass: 'bg-gradient-to-br from-slate-50 to-blue-50',
    overlay: false,
    image: null,
  },
  {
    id: 'current-image',
    name: 'Aktuelles Bild (Stra\u00dfenkreuzung)',
    desc: 'Das aktuell verwendete Stock-Photo. Generisch, kein KI/KMU-Bezug.',
    bgClass: '',
    overlay: true,
    image: '/top-view-of-road-intersection-Z6NJKXA.jpg',
  },
  {
    id: 'gradient-warm',
    name: 'Warmer Gradient',
    desc: 'Warmer, einladender Gradient. Passt zur "Mittelstand Modern" Richtung.',
    bgClass: 'bg-gradient-to-br from-amber-50 via-sky-50 to-slate-50',
    overlay: false,
    image: null,
  },
  {
    id: 'gradient-navy',
    name: 'Navy Gradient',
    desc: 'Dunklerer, professioneller Gradient. Passt zur "Klarer Kurs" Richtung.',
    bgClass: 'bg-gradient-to-br from-[#1B2B4B] to-[#2D5BFF]',
    overlay: false,
    image: null,
    darkMode: true,
  },
  {
    id: 'custom-image',
    name: 'Eigenes Bild (Platzhalter)',
    desc: 'Lege ein Bild als /public/hero-custom.jpg ab, um es hier zu sehen.',
    bgClass: '',
    overlay: true,
    image: '/hero-custom.jpg',
  },
]

function HeroPreview({ style }) {
  const isDark = style.darkMode || style.overlay
  const textColor = isDark ? 'text-white' : 'text-[#1B2B4B]'
  const subColor = isDark ? 'text-white/80' : 'text-slate-600'
  const trustColor = isDark ? 'text-white/70' : 'text-slate-500'
  const btnPrimary = isDark
    ? 'bg-white text-[#1B2B4B] hover:bg-slate-100'
    : 'bg-[#2D5BFF] text-white hover:bg-[#1A45E0]'
  const btnSecondary = isDark
    ? 'border-2 border-white/40 text-white hover:bg-white/10'
    : 'border-2 border-slate-200 text-slate-700 hover:bg-blue-50'

  return (
    <section className="relative overflow-hidden rounded-2xl shadow-xl">
      {/* Background */}
      {style.image && (
        <div className="absolute inset-0">
          <img
            src={style.image}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          {style.overlay && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1B2B4B]/80 via-[#1B2B4B]/70 to-[#2D5BFF]/60" />
          )}
        </div>
      )}
      {!style.image && <div className={`absolute inset-0 ${style.bgClass}`} />}

      {/* Content */}
      <div className="relative py-16 md:py-24 px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className={`inline-flex items-center px-4 py-2 ${isDark ? 'bg-white/20 backdrop-blur-sm' : 'bg-blue-100'} rounded-full text-sm font-medium mb-6 ${isDark ? 'text-white' : 'text-blue-700'}`}>
            Kostenfrei &middot; 5 Minuten &middot; Sofort Ergebnis
          </div>

          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight ${textColor}`}>
            Finden Sie heraus, wie Ihr Unternehmen{' '}
            <span className={isDark ? 'text-blue-200' : 'text-[#2D5BFF]'}>KI sinnvoll einsetzen</span> kann
          </h1>

          <p className={`text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed ${subColor}`}>
            Unser Readiness-Check analysiert Ihre Ausgangslage und zeigt
            konkrete n&auml;chste Schritte &ndash; praxisnah, verst&auml;ndlich, in 5 Minuten.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className={`px-7 py-3.5 rounded-xl font-semibold shadow-lg transition-all ${btnPrimary}`}>
              Kostenlosen Check starten &rarr;
            </button>
            <button className={`px-7 py-3.5 rounded-xl font-semibold transition-all ${btnSecondary}`}>
              30 Min Erstberatung buchen
            </button>
          </div>

          <div className={`mt-8 flex flex-wrap justify-center gap-6 text-sm ${trustColor}`}>
            {['DSGVO-konform', 'Praxisorientiert', '\u00dcber 50 KMU getestet'].map((item) => (
              <span key={item} className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HeroPreviewPage() {
  const [selected, setSelected] = useState('gradient-only')
  const currentStyle = heroStyles.find((s) => s.id === selected)

  return (
    <div className="min-h-screen bg-slate-100 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Hero-Bild Vorschau</h1>
          <p className="text-slate-600">Vergleichen Sie verschiedene Hero-Stile. Diese Seite ist nur intern.</p>
        </div>

        {/* Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {heroStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelected(style.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selected === style.id
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {style.name}
            </button>
          ))}
        </div>

        {/* Info */}
        <div className="bg-white rounded-xl p-4 mb-6 border border-slate-200 text-center">
          <p className="text-sm text-slate-700 font-medium">{currentStyle.name}</p>
          <p className="text-xs text-slate-500">{currentStyle.desc}</p>
        </div>

        {/* Selected Preview */}
        <HeroPreview style={currentStyle} />

        {/* Instructions */}
        <div className="bg-white rounded-2xl p-6 mt-8 border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Eigenes Bild verwenden</h2>
          <ol className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start">
              <span className="bg-slate-200 text-slate-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">1</span>
              <span>Legen Sie Ihr Bild in den <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">/public/</code> Ordner (z.B. <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">hero-custom.jpg</code>)</span>
            </li>
            <li className="flex items-start">
              <span className="bg-slate-200 text-slate-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">2</span>
              <span>Empfohlene Aufl&ouml;sung: min. 1920x800px, Querformat, max. 500KB (komprimiert)</span>
            </li>
            <li className="flex items-start">
              <span className="bg-slate-200 text-slate-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">3</span>
              <span>Gute Motive: Workshop-Situation, Team am Laptop, Beratungsgespr&auml;ch, B&uuml;ro-Setting. <strong>Keine Roboter, kein SciFi.</strong></span>
            </li>
            <li className="flex items-start">
              <span className="bg-slate-200 text-slate-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">4</span>
              <span>W&auml;hlen Sie oben &quot;Eigenes Bild&quot; und pr&uuml;fen Sie, ob Text noch lesbar ist.</span>
            </li>
          </ol>
        </div>

        {/* All Previews Grid */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Alle Varianten im &Uuml;berblick</h2>
          <div className="space-y-6">
            {heroStyles.filter(s => s.id !== 'custom-image').map((style) => (
              <div key={style.id}>
                <h3 className="text-sm font-bold text-slate-700 mb-2">{style.name}: {style.desc}</h3>
                <HeroPreview style={style} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

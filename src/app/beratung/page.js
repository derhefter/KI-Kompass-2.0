'use client'

export default function Beratung() {
  // Kalender-Links aus Environment-Variablen (Vercel Dashboard → Settings → Environment Variables)
  // Falls nicht gesetzt: Fallback auf E-Mail-Kontakt
  const BOOKING_30_MIN = process.env.NEXT_PUBLIC_BOOKING_URL_30 || ''
  const bookingAvailable = !!BOOKING_30_MIN

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1.5 bg-accent-50 text-accent-500 rounded-full text-xs font-semibold mb-4">
            Kostenfrei &middot; Unverbindlich &middot; Per Video-Call
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary-700 mb-3">
            30 Minuten. Klarer Kopf danach.
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto text-sm leading-relaxed mb-6">
            Kein Vortrag, kein Verkaufsgespräch &ndash; sondern ein ehrliches Gespr&auml;ch über Ihre
            Situation. Was KI für Ihren Betrieb bringt. Und was nicht.
          </p>
          <div className="inline-flex flex-col sm:flex-row gap-3 text-left mx-auto">
            {[
              { icon: '✓', text: 'Klarheit, wo Sie heute stehen und was als N\u00e4chstes sinnvoll ist' },
              { icon: '✓', text: 'Welche F\u00f6rderprogramme konkret f\u00fcr Sie in Frage kommen' },
              { icon: '✓', text: '2\u20133 Schritte, die Sie direkt nach dem Gespr\u00e4ch umsetzen k\u00f6nnen' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-slate-700 bg-white/70 rounded-lg px-4 py-2 border border-slate-200">
                <span className="text-accent-500 font-bold flex-shrink-0">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hinweis wenn Links nicht konfiguriert */}
        {!bookingAvailable && (
          <div className="bg-warm-50 border border-warm-200 rounded-xl p-6 mb-8 text-center">
            <p className="text-warm-600 font-semibold mb-2">Online-Terminbuchung wird eingerichtet</p>
            <p className="text-slate-600 text-sm mb-3">Bis dahin k&ouml;nnen Sie Ihren Termin direkt per E-Mail vereinbaren:</p>
            <a href="mailto:ki-kompass@derhefter.com?subject=Erstberatung%20KI-Kompass%20anfragen" className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-accent-500 rounded-lg hover:bg-accent-600 transition-colors">
              Termin per E-Mail anfragen
            </a>
          </div>
        )}

        {/* Two Booking Options */}
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {/* 30 Min */}
          <div className="bg-white rounded-xl p-7 border-2 border-accent-400 relative">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-accent-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
              Empfohlen
            </div>
            <h2 className="text-lg font-bold text-primary-700 mb-2">Erstberatung</h2>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-primary-700">30 Min</span>
              <span className="text-accent-500 font-semibold text-sm">Kostenfrei</span>
            </div>
            <p className="text-slate-600 text-sm mb-5">
              Ideal f&uuml;r den Einstieg: Wo stehen Sie? Welche F&ouml;rderprogramme passen?
            </p>
            <ul className="space-y-2 text-sm text-slate-700 mb-6">
              {[
                'Einsch\u00e4tzung: Wo Sie heute stehen',
                'Passende F\u00f6rderprogramme identifizieren',
                'Konkrete n\u00e4chste Schritte',
                'Kein Verkaufsdruck \u2013 garantiert',
              ].map((item) => (
                <li key={item} className="flex items-start">
                  <svg className="w-4 h-4 text-accent-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={BOOKING_30_MIN || 'mailto:ki-kompass@derhefter.com?subject=30%20Min%20Erstberatung%20anfragen'}
              target={BOOKING_30_MIN ? '_blank' : undefined}
              rel={BOOKING_30_MIN ? 'noopener noreferrer' : undefined}
              className="block w-full text-center px-5 py-3 text-white font-semibold bg-accent-500 rounded-lg hover:bg-accent-600 transition-colors text-sm"
            >
              {BOOKING_30_MIN ? '30 Min Termin buchen' : 'Per E-Mail anfragen'}
            </a>
          </div>

          {/* Premium Strategie-Paket Hinweis */}
          <div className="bg-white rounded-xl p-7 border border-primary-200 relative">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
              Intensiv-Beratung
            </div>
            <h2 className="text-lg font-bold text-primary-700 mb-2">Strategie-Paket</h2>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-primary-700">&euro;497</span>
              <span className="text-slate-500 text-xs">einmalig</span>
            </div>
            <p className="text-slate-600 text-sm mb-5">
              60-Min. Video-Strategiegespr&auml;ch mit individuellem Premium Report, pers&ouml;nlicher KI-Strategie und F&ouml;rdermittelberatung.
            </p>
            <ul className="space-y-2 text-sm text-slate-700 mb-6">
              {[
                'Kompletter Premium Report (20+ Seiten)',
                '60-Min. pers\u00f6nliches Video-Strategiegespr\u00e4ch',
                'Individuelle KI-Strategie f\u00fcr Ihr Unternehmen',
                'Pers\u00f6nliche F\u00f6rdermittelberatung',
                '30 Tage E-Mail-Support',
              ].map((item) => (
                <li key={item} className="flex items-start">
                  <svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="/anfrage?plan=strategie"
              className="block w-full text-center px-5 py-3 text-white font-semibold bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors text-sm"
            >
              Strategie-Paket entdecken
            </a>
          </div>
        </div>

        {/* What to expect */}
        <div className="bg-white rounded-xl p-7 border border-slate-200 mb-8">
          <h2 className="text-lg font-bold text-primary-700 mb-5">Was Sie in der Erstberatung erwartet</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { time: '5 Min', title: 'Kurzer \u00dcberblick', desc: 'Ihre aktuelle Situation, Herausforderungen und was Sie sich konkret erhoffen.' },
              { time: '10 Min', title: 'Einsch\u00e4tzung & Quick-Wins', desc: 'Wir besprechen Ihre Ergebnisse und identifizieren sofort umsetzbare Ma\u00dfnahmen.' },
              { time: '10 Min', title: 'Konkrete Empfehlungen', desc: 'Praxisnahe n\u00e4chste Schritte, passend zu Ihrer Branche und Unternehmensgr\u00f6\u00dfe.' },
              { time: '5 Min', title: 'N\u00e4chste Schritte', desc: 'Klarer Fahrplan und ggf. Angebotserstellung f\u00fcr weiterf\u00fchrende Begleitung.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex-shrink-0 w-12 h-12 bg-warm-50 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-warm-500">{item.time}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-primary-700 text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust */}
        <div className="bg-white rounded-xl p-7 border border-slate-200">
          <h2 className="text-base font-bold text-primary-700 mb-4 text-center">Kein Verkaufsdruck &ndash; garantiert</h2>
          <div className="grid md:grid-cols-3 gap-5 text-center">
            {[
              { title: 'Kostenlos', desc: 'Die 30-Minuten-Erstberatung ist komplett kostenfrei.' },
              { title: 'Unverbindlich', desc: 'Keine versteckten Verpflichtungen. Sie entscheiden frei.' },
              { title: 'Pers\u00f6nlich', desc: 'Kein Call-Center \u2013 Sie sprechen direkt mit Steffen Hefter.' },
            ].map((item, i) => (
              <div key={i}>
                <div className="w-8 h-8 bg-accent-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-700 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fallback contact */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-xs">
            Kein passender Termin? Schreiben Sie direkt an:{' '}
            <a href="mailto:ki-kompass@derhefter.com" className="text-primary-500 font-semibold hover:underline">
              ki-kompass@derhefter.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

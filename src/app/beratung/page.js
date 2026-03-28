'use client'

export default function Beratung() {
  // ============================================================
  // HIER ANPASSEN: Google Calendar Booking Links
  // Ersetze die URLs mit deinen echten Google Calendar Appointment
  // Scheduling Links. Anleitung:
  // 1. Google Calendar \u00f6ffnen \u2192 Einstellungen \u2192 Terminbuchungsseite
  // 2. Neuen Termintyp erstellen (30 Min / 60 Min)
  // 3. Link kopieren und hier einf\u00fcgen
  // ============================================================
  const BOOKING_30_MIN = 'https://calendar.google.com/calendar/appointments/schedules/DEIN_30_MIN_LINK'
  const BOOKING_60_MIN = 'https://calendar.google.com/calendar/appointments/schedules/DEIN_60_MIN_LINK'

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1.5 bg-accent-50 text-accent-500 rounded-full text-xs font-semibold mb-4">
            Kostenfrei &middot; Unverbindlich &middot; Per Video-Call
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary-700 mb-3">
            Pers&ouml;nliche Beratung buchen
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto text-sm leading-relaxed">
            In einem pers&ouml;nlichen Gespr&auml;ch besprechen wir Ihre Situation, pr&uuml;fen passende
            F&ouml;rderprogramme und erarbeiten konkrete n&auml;chste Schritte.
          </p>
        </div>

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
                'Standortbestimmung Ihrer KI-Readiness',
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
              href={BOOKING_30_MIN}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-5 py-3 text-white font-semibold bg-accent-500 rounded-lg hover:bg-accent-600 transition-colors text-sm"
            >
              30 Min Termin buchen
            </a>
          </div>

          {/* 60 Min */}
          <div className="bg-white rounded-xl p-7 border border-slate-200">
            <h2 className="text-lg font-bold text-primary-700 mb-2">Strategiegespr&auml;ch</h2>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-primary-700">60 Min</span>
              <span className="text-slate-500 text-xs">F&uuml;r Premium-Kunden</span>
            </div>
            <p className="text-slate-600 text-sm mb-5">
              Tiefgehende Besprechung Ihres Premium Reports: Roadmap, Use-Cases, F&ouml;rderstrategie.
            </p>
            <ul className="space-y-2 text-sm text-slate-700 mb-6">
              {[
                'Report-Besprechung im Detail',
                'Roadmap gemeinsam priorisieren',
                'KI-Use-Cases f\u00fcr Ihre Branche',
                'F\u00f6rdermittel-Strategie entwickeln',
                'Pers\u00f6nliche KI-Strategie',
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
              href={BOOKING_60_MIN}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-5 py-3 text-primary-500 font-semibold border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors text-sm"
            >
              60 Min Termin buchen
            </a>
          </div>
        </div>

        {/* What to expect */}
        <div className="bg-white rounded-xl p-7 border border-slate-200 mb-8">
          <h2 className="text-lg font-bold text-primary-700 mb-5">Was Sie in der Erstberatung erwartet</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { time: '5 Min', title: 'Bestandsaufnahme', desc: 'Kurzer \u00dcberblick \u00fcber Ihre aktuelle Situation und Ziele.' },
              { time: '10 Min', title: 'F\u00f6rdermittel-Check', desc: 'Pr\u00fcfung passender F\u00f6rderprogramme f\u00fcr Ihren Standort und Ihre Branche.' },
              { time: '10 Min', title: 'Einsch\u00e4tzung', desc: 'Was ist realistisch? Welche Summen? Welcher Zeitrahmen?' },
              { time: '5 Min', title: 'N\u00e4chste Schritte', desc: 'Konkrete Empfehlungen und ggf. Angebotserstellung.' },
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
            <a href="mailto:steffenhefter@googlemail.com" className="text-primary-500 font-semibold hover:underline">
              steffenhefter@googlemail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

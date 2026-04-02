export default function TrustBlock() {
  return (
    <section className="py-16 bg-primary-700">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Points */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {[
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: 'DSGVO-konform',
              desc: 'Ihre Antworten im Check werden nur lokal in Ihrem Browser verarbeitet \u2013 kein Upload w\u00e4hrend des Checks. Kontaktdaten werden DSGVO-konform gespeichert.',
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              ),
              title: 'Methodik aus der Praxis',
              desc: 'Basierend auf etablierten KI-Reifegradmodellen \u2013 angepasst an die Realit\u00e4t kleiner und mittlerer Betriebe.',
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              title: 'Erstberatung kostenlos',
              desc: '30 Minuten per Video-Call \u2013 ohne Verpflichtung, ohne Verkaufsdruck. Einfach ehrliches Feedback.',
            },
          ].map((item, i) => (
            <div key={i} className="text-center text-white">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                {item.icon}
              </div>
              <h3 className="font-semibold mb-1 text-base">{item.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="border-t border-white/15 pt-8 mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { num: '12', label: 'Fragen im Schnell-Check' },
              { num: '5 Min', label: 'bis zum Ergebnis' },
              { num: '€0', label: 'Kosten f\u00fcr den Check' },
              { num: '30 Min', label: 'kostenlose Erstberatung' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-bold mb-1">{stat.num}</div>
                <div className="text-slate-300 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/assessment"
            className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-primary-700 bg-white rounded-lg hover:bg-slate-50 transition-colors"
          >
            Jetzt kostenlos testen
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <p className="text-xs text-slate-400 mt-3">Keine Registrierung erforderlich</p>
        </div>
      </div>
    </section>
  )
}

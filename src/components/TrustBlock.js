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
              desc: 'Ihre Daten werden auf europ\u00e4ischen Servern verarbeitet und nicht an Dritte weitergegeben.',
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              ),
              title: 'Bew\u00e4hrte Methodik',
              desc: 'Basierend auf etablierten KI-Reifegradmodellen, angepasst an die Realit\u00e4t im Mittelstand.',
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              title: 'Kostenfreie Erstberatung',
              desc: '30 Minuten pers\u00f6nliches Gespr\u00e4ch \u2013 ohne Verpflichtung, ohne Verkaufsdruck.',
            },
          ].map((item, i) => (
            <div key={i} className="text-center text-white">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                {item.icon}
              </div>
              <h3 className="font-semibold mb-1 text-sm">{item.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="border-t border-white/15 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { num: '50+', label: 'Unternehmen gepr\u00fcft' },
              { num: '94%', label: 'Weiterempfehlung' },
              { num: '12', label: 'Fragen im Schnell-Check' },
              { num: '5 Min', label: 'bis zum Ergebnis' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.num}</div>
                <div className="text-slate-300 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

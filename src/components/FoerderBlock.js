export default function FoerderBlock() {
  const programmes = [
    { name: 'go-digital', foerderung: 'bis 50\u202f%', max: 'max. 16.500\u202f\u20ac' },
    { name: 'Digital Jetzt', foerderung: '40\u2013\u202f60\u202f%', max: 'max. 50.000\u202f\u20ac' },
    { name: 'BAFA-Beratung', foerderung: 'bis 80\u202f%', max: 'max. 3.200\u202f\u20ac' },
  ]

  return (
    <section className="py-20 bg-warm-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl p-8 md:p-10 border border-warm-200">
          <div className="inline-flex items-center px-3 py-1 bg-accent-50 text-accent-600 rounded-full text-xs font-semibold mb-4">
            F&ouml;rdermittel f&uuml;r KMU
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-primary-700 mb-3">
            Der Staat zahlt bis zu 50&nbsp;% Ihrer KI-Investition
          </h2>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            Die meisten KMU wissen nicht, dass Programme wie go-digital oder Digital&nbsp;Jetzt
            genau f&uuml;r sie gemacht sind. In einem kostenlosen 30-Minuten-Gespr&auml;ch
            kl&auml;ren wir, welche Programme f&uuml;r Ihren Betrieb passen &ndash; und wie der
            Antrag funktioniert.
          </p>

          {/* Programme-Übersicht */}
          <div className="grid grid-cols-3 gap-3 mb-7">
            {programmes.map((p) => (
              <div key={p.name} className="bg-slate-50 rounded-lg p-3 text-center border border-slate-100">
                <p className="text-xs text-slate-500 mb-1">{p.name}</p>
                <p className="text-sm font-bold text-accent-600">{p.foerderung}</p>
                <p className="text-xs text-slate-400">{p.max}</p>
              </div>
            ))}
          </div>

          <a
            href="/beratung"
            className="btn-accent"
          >
            Kostenlose F&ouml;rdermittel-Beratung buchen
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <p className="text-xs text-slate-400 mt-3">Kein Verkaufsdruck &middot; 100\u202f% kostenlos &middot; Per Video-Call</p>
        </div>
      </div>
    </section>
  )
}

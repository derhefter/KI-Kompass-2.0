export default function FoerderBlock() {
  return (
    <section className="py-20 bg-warm-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl p-8 md:p-10 border border-warm-200">
          <div className="md:flex md:items-start md:gap-10">
            <div className="flex-1">
              <div className="inline-flex items-center px-3 py-1 bg-accent-50 text-accent-500 rounded-full text-xs font-semibold mb-4">
                F&ouml;rdermittel
              </div>
              <h2 className="text-2xl font-bold text-primary-700 mb-3">
                F&ouml;rdermittel f&uuml;r Ihre KI-Investition?
              </h2>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Viele KMU k&ouml;nnen bis zu 50% ihrer Digitalisierungskosten f&ouml;rdern lassen.
                In einer kostenlosen 30-Minuten-Erstberatung kl&auml;ren wir, welche Programme f&uuml;r Sie in Frage kommen.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  'Passende F\u00f6rderprogramme identifizieren',
                  'Antragsweg verstehen',
                  'Konkrete n\u00e4chste Schritte besprechen',
                ].map((item) => (
                  <li key={item} className="flex items-start text-sm text-slate-700">
                    <svg className="w-4 h-4 text-accent-500 mr-2.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="/beratung"
                className="btn-accent"
              >
                Kostenlose Erstberatung buchen
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <p className="text-xs text-slate-400 mt-3">Kein Verkaufsdruck &middot; 100% kostenlos &middot; Per Video-Call</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function PricingCards() {
  return (
    <section id="preise" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-700 mb-3">
            W&auml;hlen Sie Ihren Check
          </h2>
          <p className="text-slate-600">
            Vom kostenfreien Schnell-Check bis zum detaillierten Premium Report.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Free */}
          <div className="bg-white rounded-xl p-7 border border-slate-200">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Schnell-Check</div>
            <div className="text-3xl font-bold text-primary-700 mb-1">Kostenfrei</div>
            <p className="text-slate-500 text-sm mb-6">Ihr erster Schritt</p>
            <ul className="space-y-3 mb-8">
              {['12 Fragen zum KI-Reifegrad', 'Sofort-Score mit Einordnung', '3 Quick-Wins zum Umsetzen', 'Branchenvergleich'].map((f) => (
                <li key={f} className="flex items-start text-sm text-slate-700">
                  <svg className="w-4 h-4 text-accent-500 mr-2.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <a href="/assessment" className="block w-full text-center px-5 py-3 text-primary-500 font-semibold border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors text-sm">
              Jetzt starten
            </a>
          </div>

          {/* Premium */}
          <div className="bg-white rounded-xl p-7 border-2 border-primary-500 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-warm-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
              Beliebteste Wahl
            </div>
            <div className="text-xs font-semibold text-primary-500 uppercase tracking-wide mb-2">Premium Report</div>
            <div className="text-3xl font-bold text-primary-700 mb-1">&euro;197</div>
            <p className="text-slate-500 text-sm mb-6">einmalig &middot; PDF sofort per E-Mail</p>
            <ul className="space-y-3 mb-8">
              {[
                'Alles aus dem Schnell-Check',
                '30+ Detailfragen zur Tiefenanalyse',
                'PDF-Report (20+ Seiten)',
                'Individuelle KI-Roadmap',
                'Tool-Empfehlungen pro Bereich',
                'F\u00f6rdermittel-\u00dcbersicht',
              ].map((f) => (
                <li key={f} className="flex items-start text-sm text-slate-700">
                  <svg className="w-4 h-4 text-primary-500 mr-2.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <a href="/anfrage?plan=premium" className="block w-full text-center px-5 py-3 text-white font-semibold bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors text-sm">
              Premium Report kaufen
            </a>
            <p className="text-center text-xs text-slate-400 mt-3">Auch auf Rechnung m&ouml;glich</p>
          </div>
        </div>
      </div>
    </section>
  )
}

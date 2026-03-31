export default function UpsellCards() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-primary-700 mb-6 text-center">
        Wie m&ouml;chten Sie weitermachen?
      </h2>
      <div className="grid md:grid-cols-2 gap-5">
        {/* Premium Report */}
        <div className="bg-white rounded-xl p-6 border-2 border-primary-500">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-primary-500 uppercase">Premium Report</span>
            <span className="bg-primary-50 text-primary-700 px-2.5 py-0.5 rounded-full text-xs font-bold">&euro;147</span>
          </div>
          <p className="text-slate-600 text-sm mb-4">
            Ihr kompletter KI-Fahrplan als PDF &ndash; sofort per E-Mail.
          </p>
          <ul className="space-y-2 text-sm text-slate-700 mb-5">
            {[
              '30+ Detailfragen zur Tiefenanalyse',
              '20+ Seiten individueller Report',
              'Priorisierte Roadmap (3/6/12 Monate)',
              'Tool-Empfehlungen mit Kosten',
              'F\u00f6rdermittel-\u00dcbersicht',
            ].map((item) => (
              <li key={item} className="flex items-start">
                <svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <a href="/anfrage?plan=premium" className="block w-full text-center px-5 py-2.5 text-white font-semibold bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors text-sm">
            Jetzt kaufen &rarr;
          </a>
          <p className="text-xs text-slate-400 text-center mt-2">Auch auf Rechnung m&ouml;glich</p>
        </div>

        {/* F\u00f6rdermittelberatung */}
        <div className="bg-white rounded-xl p-6 border-2 border-accent-500">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-accent-500 uppercase">Erstberatung</span>
            <span className="bg-accent-50 text-accent-600 px-2.5 py-0.5 rounded-full text-xs font-bold">Kostenfrei</span>
          </div>
          <p className="text-slate-600 text-sm mb-4">
            30 Minuten pers&ouml;nliche Beratung &ndash; F&ouml;rdermittel, Strategie, n&auml;chste Schritte.
          </p>
          <ul className="space-y-2 text-sm text-slate-700 mb-5">
            {[
              'Passende F\u00f6rderprogramme identifizieren',
              'Realistische Einsch\u00e4tzung Ihrer M\u00f6glichkeiten',
              'Konkrete n\u00e4chste Schritte erarbeiten',
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
          <a href="/beratung" className="block w-full text-center px-5 py-2.5 text-white font-semibold bg-accent-500 rounded-lg hover:bg-accent-600 transition-colors text-sm">
            Termin buchen &rarr;
          </a>
          <p className="text-xs text-slate-400 text-center mt-2">N&auml;chster freier Termin in dieser Woche</p>
        </div>
      </div>
    </div>
  )
}

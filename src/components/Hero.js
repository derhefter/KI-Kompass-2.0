export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-warm-50 via-white to-primary-50 py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-warm-100 text-warm-500 rounded-full text-sm font-medium mb-8 fade-in-up">
          Kostenfrei &middot; 5 Minuten &middot; Sofort Ergebnis
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-primary-700 mb-6 leading-tight fade-in-up fade-in-up-delay-1">
          Spart KI Ihrem Unternehmen Zeit und Geld&nbsp;&ndash;{' '}
          <span className="text-primary-500">oder nicht?</span>
        </h1>

        <p className="text-base text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed fade-in-up fade-in-up-delay-2">
          12 Fragen. Sofortergebnis. Sie sehen konkret, wo KI in Ihrem Betrieb
          wirklich etwas bringt &ndash; und wo nicht. Kein Fachwissen nötig.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up fade-in-up-delay-3">
          <a
            href="/assessment"
            className="btn-primary"
          >
            Kostenlos starten &ndash; in 5 Minuten
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="/beratung"
            className="btn-secondary"
          >
            Lieber erst beraten lassen?
          </a>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-500 fade-in-up fade-in-up-delay-4">
          {[
            'DSGVO-konform',
            'Kein Verkaufsdruck',
            'Keine Anmeldung n\u00f6tig',
          ].map((item) => (
            <div key={item} className="flex items-center">
              <svg className="w-4 h-4 text-accent-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

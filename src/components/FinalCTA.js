export default function FinalCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-700 to-primary-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Bereit f&uuml;r den ersten Schritt?
        </h2>
        <p className="text-lg text-slate-300 mb-8">
          Finden Sie in 5 Minuten heraus, wie Ihr Unternehmen KI sinnvoll einsetzen kann.
        </p>
        <a
          href="/assessment"
          className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-primary-700 bg-white rounded-lg hover:bg-slate-50 transition-colors"
        >
          Kostenlosen Check starten
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </section>
  )
}

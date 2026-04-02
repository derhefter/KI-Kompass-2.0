export default function FinalCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-700 to-primary-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
          In 5 Minuten wissen, wo Sie stehen.
        </h2>
        <p className="text-base text-slate-300 mb-8 max-w-xl mx-auto">
          Kostenloser Check, sofortiges Ergebnis &ndash; ohne Anmeldung, ohne Verkaufsgespr&auml;ch.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/assessment"
            className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-primary-700 bg-white rounded-lg hover:bg-slate-50 transition-colors"
          >
            Kostenlosen Check starten
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="/beratung"
            className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-white border border-white/40 rounded-lg hover:bg-white/10 transition-colors"
          >
            Lieber direkt beraten lassen
          </a>
        </div>

        <p className="text-xs text-slate-400 mt-6">
          Keine Kreditkarte &middot; Kein Abo &middot; Jederzeit abbrechbar
        </p>
      </div>
    </section>
  )
}

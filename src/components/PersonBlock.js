export default function PersonBlock() {
  return (
    <section className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

            {/* Foto */}
            <div className="flex-shrink-0">
              <a href="/ueber-mich">
                <img
                  src="/Steffen2025.jpg"
                  alt="Steffen Hefter \u2013 KI-Berater f&uuml;r KMU"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover object-top shadow-md border-2 border-slate-100 hover:opacity-90 transition-opacity"
                />
              </a>
            </div>

            {/* Text */}
            <div className="text-center md:text-left">
              <p className="text-xs font-semibold text-primary-500 uppercase tracking-wide mb-2">
                Der Mensch dahinter
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-primary-700 mb-3">
                <a href="/ueber-mich" className="hover:text-primary-500 transition-colors">
                  Steffen Hefter &ndash; frimalo, Halle (Saale)
                </a>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 max-w-xl">
                Ich helfe kleinen und mittleren Unternehmen, KI pragmatisch einzusetzen &ndash;
                ohne &Uuml;berforderung, ohne Beratersprech. &Uuml;ber 20 Jahre in F&uuml;hrungspositionen
                in Softwarewirtschaft und Change-Management haben mir eines beigebracht:
                Technologie funktioniert nur, wenn die Menschen dahinter mitgenommen werden.
              </p>
              <p className="text-slate-500 text-sm italic mb-5">
                &bdquo;Ich stehe mit meinem Namen daf&uuml;r, dass Sie nach unserem Gespr&auml;ch
                klarer sehen als vorher &ndash; versprochen.&ldquo;
              </p>
              <a
                href="/ueber-mich"
                className="inline-flex items-center text-sm font-semibold text-primary-500 hover:text-primary-700 transition-colors"
              >
                Mehr &uuml;ber mich erfahren
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

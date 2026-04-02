export default function ResultPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-primary-700 mb-3">
            Das erwartet Sie nach 5 Minuten
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Kein allgemeines Feedback. Ihr pers&ouml;nlicher Score mit klaren
            Priorit&auml;ten &ndash; direkt auf dem Bildschirm.
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl border border-slate-200 p-8 md:p-10 max-w-2xl mx-auto relative">
          {/* Beispiel-Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-200 text-slate-500 px-3 py-0.5 rounded-full text-xs font-medium">
            Beispielergebnis
          </div>

          {/* Mock Score */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full border-[6px] border-primary-200 mb-4">
              <div className="text-center">
                <span className="text-2xl font-bold text-primary-500">58%</span>
                <span className="block text-xs text-slate-500">Ihr Score</span>
              </div>
            </div>
            <div className="inline-block bg-warm-100 text-warm-500 px-3 py-1 rounded-full text-sm font-medium">
              Stufe 2: Gute Basis &ndash; gezielter Ausbau m&ouml;glich
            </div>
          </div>

          {/* Mock Categories – entjargonisiert */}
          <div className="space-y-3 mb-8">
            {[
              { label: 'Wissen & Einstellung im Team', pct: 62, color: 'bg-accent-500' },
              { label: 'Prozesse & vorhandene Tools', pct: 45, color: 'bg-warm-500' },
              { label: 'Daten & Infrastruktur', pct: 58, color: 'bg-primary-500' },
            ].map((cat) => (
              <div key={cat.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">{cat.label}</span>
                  <span className="font-medium text-slate-700">{cat.pct}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className={`h-2 rounded-full ${cat.color}`} style={{ width: `${cat.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Mock Quick Wins */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Ihre 3 n&auml;chsten Schritte</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                'E-Mail-Vorlagen mit KI erstellen',
                'Angebote automatisch vorformulieren',
                'Team-Workshop: KI ausprobieren',
              ].map((qw) => (
                <div key={qw} className="bg-white rounded-lg p-3 border border-slate-200 text-center">
                  <span className="text-xs text-accent-600 font-medium">Quick-Win</span>
                  <p className="text-xs font-medium text-slate-700 mt-1 leading-snug">{qw}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <a href="/assessment" className="btn-primary">
            Mein pers&ouml;nliches Ergebnis holen
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <p className="text-xs text-slate-400 mt-3">Kostenlos &middot; 5 Minuten &middot; Sofort auf dem Bildschirm</p>
        </div>
      </div>
    </section>
  )
}

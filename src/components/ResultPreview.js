export default function ResultPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-700 mb-3">So sieht Ihr Ergebnis aus</h2>
          <p className="text-slate-600">
            Sofort nach dem Check erhalten Sie eine klare Auswertung mit konkreten Empfehlungen.
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl border border-slate-200 p-8 md:p-10 max-w-2xl mx-auto">
          {/* Mock Score */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full border-[6px] border-primary-200 mb-4">
              <div className="text-center">
                <span className="text-2xl font-bold text-primary-500">58%</span>
                <span className="block text-xs text-slate-500">KI-Readiness</span>
              </div>
            </div>
            <div className="inline-block bg-warm-100 text-warm-500 px-3 py-1 rounded-full text-sm font-medium">
              Level 2: KI-Entdecker
            </div>
          </div>

          {/* Mock Categories */}
          <div className="space-y-3 mb-8">
            {[
              { label: 'KI-Bewusstsein', pct: 62, color: 'bg-accent-500' },
              { label: 'KI-Bereitschaft', pct: 45, color: 'bg-warm-500' },
              { label: 'KI-Nachhaltigkeit', pct: 58, color: 'bg-primary-500' },
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
          <div className="grid grid-cols-3 gap-3">
            {['ChatGPT testen', 'E-Mail-Automation', 'KI-Workshop'].map((qw) => (
              <div key={qw} className="bg-white rounded-lg p-3 border border-slate-200 text-center">
                <span className="text-xs text-accent-500 font-medium">Quick-Win</span>
                <p className="text-sm font-medium text-slate-700 mt-1">{qw}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <a href="/assessment" className="btn-primary">
            Ihren pers&ouml;nlichen Check starten
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

'use client'

export default function Monitoring() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-20 bg-gradient-to-br from-primary-900 to-primary-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">Recurring Service</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">KI-Monitoring</h1>
          <p className="text-xl text-primary-200 mb-8">Bleiben Sie am Puls der KI-Entwicklung. Quartalweise Re-Assessments, Fortschritts-Tracking und aktuelle KI-News.</p>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4">
        <h2 className="section-title text-center mb-12">W&auml;hlen Sie Ihr Monitoring-Paket</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="card border-2 border-gray-200 text-center">
            <div className="text-sm font-semibold text-gray-500 uppercase mb-2">Basic</div>
            <div className="text-4xl font-extrabold text-gray-900 mb-1">&euro;49<span className="text-lg font-normal text-gray-500">/Monat</span></div>
            <ul className="space-y-3 text-left text-sm mb-8 mt-6">
              {['Quartalweises Re-Assessment', 'Fortschritts-Dashboard', 'Score-Verlauf \u00fcber Zeit', 'Monatlicher KI-Newsletter', 'Regulierungs-Updates (EU AI Act)'].map((f, i) => (
                <li key={i} className="flex items-start"><svg className="w-4 h-4 text-accent-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>{f}</li>
              ))}
            </ul>
            <a href="/anfrage?plan=monitoring-basic" className="btn-secondary w-full">Basic starten</a>
          </div>
          <div className="card border-2 border-primary-500 text-center shadow-xl relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">Empfohlen</div>
            <div className="text-sm font-semibold text-primary-600 uppercase mb-2">Pro</div>
            <div className="text-4xl font-extrabold text-gray-900 mb-1">&euro;99<span className="text-lg font-normal text-gray-500">/Monat</span></div>
            <ul className="space-y-3 text-left text-sm mb-8 mt-6">
              {['Alles aus Basic', 'Pers\u00f6nlicher KI-News-Digest', 'Branchen-Benchmark-Vergleich', 'Priority E-Mail-Support', 'Individuelle Tool-Empfehlungen', 'J\u00e4hrliches Strategie-Update-Call'].map((f, i) => (
                <li key={i} className="flex items-start"><svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>{f}</li>
              ))}
            </ul>
            <a href="/anfrage?plan=monitoring-pro" className="btn-primary w-full">Pro starten</a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-title mb-8">So funktioniert das KI-Monitoring</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Premium Check', desc: 'Erstmaligen KI-Readiness Check abschlie\u00dfen' },
              { step: '2', title: 'Abo aktivieren', desc: 'Monitoring-Paket w\u00e4hlen und starten' },
              { step: '3', title: 'Re-Assessment', desc: 'Alle 3 Monate automatisches Re-Assessment' },
              { step: '4', title: 'Fortschritt', desc: 'Entwicklung verfolgen und optimieren' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xl">{s.step}</div>
                <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

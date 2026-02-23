'use client'

export default function Toolbox() {
  const resources = [
    { title: '50+ Prompt-Templates', desc: 'Fertige Prompts f\u00fcr ChatGPT & Claude - sortiert nach Marketing, Vertrieb, HR, Buchhaltung', badge: 'Beliebt', category: 'Templates' },
    { title: 'KI-Policy Vorlage', desc: 'DSGVO-konforme Richtlinie f\u00fcr den KI-Einsatz in Ihrem Unternehmen', badge: 'Neu', category: 'Vorlagen' },
    { title: 'DSFA-Template', desc: 'Datenschutz-Folgeabsch\u00e4tzung f\u00fcr KI-Projekte (EU AI Act konform)', badge: '', category: 'Compliance' },
    { title: 'KI-Anbieter-Vergleich 2025/26', desc: 'Detaillierter Vergleich von 30+ KI-Tools nach Funktion, Preis und Datenschutz', badge: 'Aktualisiert', category: 'Guides' },
    { title: 'Video: KI in 30 Minuten', desc: 'Kompakter Einstieg in KI f\u00fcr Gesch\u00e4ftsf\u00fchrer und F\u00fchrungskr\u00e4fte', badge: '', category: 'Videos' },
    { title: 'Checkliste: KI-Einf\u00fchrung', desc: 'Schritt-f\u00fcr-Schritt Checkliste f\u00fcr die KI-Implementierung im Mittelstand', badge: 'Beliebt', category: 'Checklisten' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-20 bg-gradient-to-br from-accent-800 via-accent-700 to-accent-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">KI-Toolbox</h1>
          <p className="text-xl text-accent-100 mb-8">Monatlich aktualisierte Ressourcen, Templates und Tool-Empfehlungen f&uuml;r den Mittelstand</p>
        </div>
      </section>

      {/* Preview */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <h2 className="section-title text-center mb-8">Was Sie in der Toolbox erwartet</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r, i) => (
            <div key={i} className="card hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{r.category}</span>
                {r.badge && <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-semibold">{r.badge}</span>}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{r.title}</h3>
              <p className="text-sm text-gray-600">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="section-title text-center mb-12">Membership w&auml;hlen</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card border-2 border-gray-200 text-center">
              <div className="text-sm font-semibold text-gray-500 uppercase mb-2">Starter</div>
              <div className="text-4xl font-extrabold text-gray-900 mb-1">&euro;29<span className="text-lg font-normal text-gray-500">/Monat</span></div>
              <ul className="space-y-3 text-left text-sm mb-8 mt-6">
                {['KI-Tool-Empfehlungen', '50+ Prompt-Templates', 'Checklisten & Vorlagen', 'Monatliche Updates'].map((f, i) => (
                  <li key={i} className="flex items-center"><svg className="w-4 h-4 text-accent-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>{f}</li>
                ))}
              </ul>
              <a href="/anfrage?plan=toolbox-starter" className="btn-secondary w-full">Starter w&auml;hlen</a>
            </div>
            <div className="card border-2 border-accent-500 text-center shadow-xl">
              <div className="text-sm font-semibold text-accent-600 uppercase mb-2">Professional</div>
              <div className="text-4xl font-extrabold text-gray-900 mb-1">&euro;49<span className="text-lg font-normal text-gray-500">/Monat</span></div>
              <ul className="space-y-3 text-left text-sm mb-8 mt-6">
                {['Alles aus Starter', 'Video-Tutorials', 'Branchen-spezifische Vorlagen', 'Compliance-Templates (EU AI Act)', 'Priority Support'].map((f, i) => (
                  <li key={i} className="flex items-center"><svg className="w-4 h-4 text-accent-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>{f}</li>
                ))}
              </ul>
              <a href="/anfrage?plan=toolbox-pro" className="btn-accent w-full">Professional w&auml;hlen</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

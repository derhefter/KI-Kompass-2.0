'use client'

export default function Zertifikat() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">Neu: Digitales Zertifikat</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">KI-Readiness Zertifikat</h1>
          <p className="text-xl text-primary-200 mb-8">Zeigen Sie Kunden, Partnern und Bewerbern: Ihr Unternehmen ist bereit f&uuml;r K&uuml;nstliche Intelligenz.</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Vertrauen schaffen', desc: 'Zeigen Sie Kunden und Gesch\u00e4ftspartnern, dass Sie technologisch am Puls der Zeit sind.', icon: '\u2705' },
            { title: 'Employer Branding', desc: 'Attraktiv f\u00fcr Fachkr\u00e4fte: Zeigen Sie, dass Ihr Unternehmen innovativ und zukunftsorientiert ist.', icon: '\ud83c\udfc6' },
            { title: 'Wettbewerbsvorteil', desc: 'Heben Sie sich von der Konkurrenz ab mit einem offiziellen KI-Readiness Nachweis.', icon: '\ud83d\ude80' },
          ].map((b, i) => (
            <div key={i} className="card text-center">
              <div className="text-4xl mb-4">{b.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{b.title}</h3>
              <p className="text-gray-600 text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="section-title text-center mb-12">Ihr Zertifikat bestellen</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card border-2 border-gray-200 text-center">
              <div className="text-sm font-semibold text-gray-500 uppercase mb-2">Basic Badge</div>
              <div className="text-4xl font-extrabold text-gray-900 mb-1">&euro;47</div>
              <p className="text-gray-500 mb-6">einmalig</p>
              <ul className="space-y-2 text-left text-sm text-gray-700 mb-6">
                <li className="flex items-center"><svg className="w-4 h-4 text-accent-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Digitales Zertifikat (PDF)</li>
                <li className="flex items-center"><svg className="w-4 h-4 text-accent-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Level-Badge f&uuml;r Ihre Website</li>
                <li className="flex items-center"><svg className="w-4 h-4 text-accent-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Online-Verifizierung</li>
              </ul>
              <a href="/anfrage?plan=premium" className="btn-secondary w-full">Basic Badge bestellen</a>
            </div>
            <div className="card border-2 border-primary-500 text-center shadow-xl">
              <div className="text-sm font-semibold text-primary-600 uppercase mb-2">Premium Zertifikat</div>
              <div className="text-4xl font-extrabold text-gray-900 mb-1">&euro;97</div>
              <p className="text-gray-500 mb-6">einmalig</p>
              <ul className="space-y-2 text-left text-sm text-gray-700 mb-6">
                <li className="flex items-center"><svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Alles aus Basic Badge</li>
                <li className="flex items-center"><svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Detaillierte Score-Aufschl&uuml;sselung</li>
                <li className="flex items-center"><svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Druckoptimiert (A4 Querformat)</li>
                <li className="flex items-center"><svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Einrahmbar &amp; repr&auml;sentativ</li>
              </ul>
              <a href="/anfrage?plan=premium" className="btn-primary w-full">Premium Zertifikat bestellen</a>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">Voraussetzung: Abgeschlossener Premium KI-Readiness Check</p>
        </div>
      </section>
    </div>
  )
}

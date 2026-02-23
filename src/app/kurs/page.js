'use client'

export default function Kurs() {
  const module = [
    { nr: 1, title: 'KI verstehen', desc: 'Was ist KI? Arten, M\u00f6glichkeiten und Grenzen f\u00fcr KMU', dauer: '45 Min.' },
    { nr: 2, title: 'Strategie & Vision', desc: 'KI in Ihre Unternehmensstrategie integrieren. Use-Cases identifizieren.', dauer: '60 Min.' },
    { nr: 3, title: 'Daten & Infrastruktur', desc: 'Die richtige Grundlage schaffen: Datenqualit\u00e4t, Cloud, APIs', dauer: '45 Min.' },
    { nr: 4, title: 'Prozesse & Automatisierung', desc: 'Quick-Wins identifizieren. Workflows automatisieren mit KI.', dauer: '60 Min.' },
    { nr: 5, title: 'KI-Tools in der Praxis', desc: 'ChatGPT, Copilot, Make.com & Co. - Hands-on Workshops', dauer: '90 Min.' },
    { nr: 6, title: 'Governance & Compliance', desc: 'DSGVO, EU AI Act, KI-Richtlinien f\u00fcr Ihr Unternehmen', dauer: '45 Min.' },
    { nr: 7, title: 'Roadmap erstellen', desc: 'Ihr individueller KI-Fahrplan f\u00fcr die n\u00e4chsten 6 Monate', dauer: '60 Min.' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">Selbstlernkurs</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">KI-Einf&uuml;hrung f&uuml;r KMU</h1>
          <p className="text-xl text-primary-200 mb-8">In 7 Modulen vom KI-Einsteiger zum KI-Anwender. Praxisnah, verst&auml;ndlich, sofort umsetzbar.</p>
          <div className="text-3xl font-extrabold mb-2">&euro;297 <span className="text-lg font-normal text-primary-300">einmalig</span></div>
          <a href="/anfrage?plan=kurs" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-700 bg-white rounded-xl hover:bg-primary-50 transition-all shadow-xl mt-4">
            Kurs kaufen
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </a>
        </div>
      </section>

      {/* Module */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <h2 className="section-title text-center mb-12">7 Module &ndash; Ihr Weg zur KI-Kompetenz</h2>
        <div className="space-y-4">
          {module.map((m, i) => (
            <div key={i} className="card flex items-start gap-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">{m.nr}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900 text-lg">{m.title}</h3>
                  <span className="text-sm text-gray-500">{m.dauer}</span>
                </div>
                <p className="text-gray-600 mt-1">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="section-title text-center mb-8">Was im Kurs enthalten ist</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Video-Lektionen', desc: '\u00dcber 7 Stunden Videomaterial mit praxisnahen Beispielen' },
              { title: 'Arbeitsbl\u00e4tter', desc: 'Vorlagen und Worksheets zum Mitmachen und Anwenden' },
              { title: 'Prompt-Templates', desc: '30+ fertige Prompts f\u00fcr sofortigen Einsatz im Alltag' },
              { title: 'Quizzes', desc: 'Lernkontrolle nach jedem Modul f\u00fcr nachhaltigen Lernerfolg' },
              { title: 'Zertifikat', desc: 'Teilnahme-Zertifikat nach erfolgreichem Abschluss' },
              { title: '12 Monate Zugang', desc: 'Lernen Sie in Ihrem eigenen Tempo, jederzeit und \u00fcberall' },
            ].map((f, i) => (
              <div key={i} className="card text-center hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-white mb-4">Starten Sie jetzt Ihre KI-Reise</h2>
          <p className="text-primary-200 mb-8">Einmalig &euro;297 &ndash; unbegrenzter Zugang f&uuml;r 12 Monate</p>
          <a href="/anfrage?plan=kurs" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-700 bg-white rounded-xl hover:bg-primary-50 transition-all shadow-xl">
            Kurs kaufen &ndash; &euro;297
          </a>
        </div>
      </section>
    </div>
  )
}

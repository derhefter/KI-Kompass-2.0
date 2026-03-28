export default function HowItWorks() {
  const steps = [
    {
      step: '1',
      title: '12 Fragen beantworten',
      desc: 'Praxisnahe Fragen zu Prozessen, Daten und Team. Kein Fachwissen n\u00f6tig.',
    },
    {
      step: '2',
      title: 'Ergebnis sofort erhalten',
      desc: 'Ihr KI-Reifegrad mit konkreten Priorit\u00e4ten und Quick-Wins \u2013 direkt auf dem Bildschirm.',
    },
    {
      step: '3',
      title: 'N\u00e4chste Schritte planen',
      desc: 'Mit Premium Report oder pers\u00f6nlicher Beratung gezielt weitergehen.',
    },
  ]

  return (
    <section id="so-funktionierts" className="py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-700 mb-3">So funktioniert&apos;s</h2>
          <p className="text-slate-600">
            In drei einfachen Schritten zu Ihrem individuellen KI-Fahrplan.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-14 h-14 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-5 text-lg font-bold">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-primary-700 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="/assessment" className="btn-primary">
            Jetzt starten
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

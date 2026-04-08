export default function HowItWorks() {
  const steps = [
    {
      step: '1',
      title: '12 Fragen beantworten',
      desc: 'Praxisnahe Fragen zu Ihren Prozessen, Ihrem Team und Ihren Tools. Kein IT-Wissen nötig \u2013 dauert 5 Minuten.',
    },
    {
      step: '2',
      title: 'Sofortergebnis auf dem Bildschirm',
      desc: 'Sie sehen direkt: Ihr Score, Ihre stärksten Hebel und 3 Quick-Wins, die Sie sofort angehen können.',
    },
    {
      step: '3',
      title: 'Konkret weitermachen',
      desc: 'Mit Ihrem Ergebnis entscheiden Sie selbst: selbst umsetzen, tiefer einsteigen oder kurz mit jemandem sprechen.',
    },
  ]

  return (
    <section id="so-funktionierts" className="py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-xl md:text-2xl font-bold text-primary-700 mb-3">So funktioniert&apos;s</h2>
          <p className="text-slate-600">
            Kein Formular ausf&uuml;llen. Kein Anruf abwarten. Ergebnis sofort.
          </p>
        </div>

        {/* 3 Schritte */}
        <div className="grid md:grid-cols-3 gap-10 mb-14">
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

        <div className="text-center">
          <a href="/assessment" className="btn-primary">
            Jetzt kostenlos starten
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <p className="text-xs text-slate-400 mt-3">Keine Registrierung &middot; Kein Verkaufsgespr&auml;ch</p>
        </div>
      </div>
    </section>
  )
}

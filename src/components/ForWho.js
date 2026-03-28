export default function ForWho() {
  const personas = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: 'Sie f\u00fchren ein KMU',
      desc: 'und fragen sich, ob KI f\u00fcr Ihr Unternehmen relevant ist \u2013 und wo Sie anfangen sollen.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Ihr Team nutzt digitale Tools',
      desc: 'aber KI ist Neuland \u2013 Sie m\u00f6chten wissen, wo der gr\u00f6\u00dfte Hebel liegt.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Sie m\u00f6chten F\u00f6rdermittel nutzen',
      desc: 'wissen aber nicht, welche Programme passen und wie der Antrag funktioniert.',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-700 mb-3">F&uuml;r wen ist der Check gedacht?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Der KI-Kompass ist speziell f&uuml;r kleine und mittlere Unternehmen entwickelt.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {personas.map((p, i) => (
            <div key={i} className="bg-warm-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-white text-primary-500 rounded-lg flex items-center justify-center mx-auto mb-5 border border-slate-100">
                {p.icon}
              </div>
              <h3 className="text-base font-semibold text-primary-700 mb-2">{p.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

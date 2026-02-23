'use client'

export default function Benchmarking() {
  const branchen = [
    { name: 'Handwerk', score: 32, level: 2, teilnehmer: 47, topChallenge: 'Digitale Infrastruktur' },
    { name: 'Dienstleistung', score: 45, level: 2, teilnehmer: 63, topChallenge: 'Datenqualit\u00e4t' },
    { name: 'Produktion', score: 38, level: 2, teilnehmer: 35, topChallenge: 'Fachkr\u00e4ftemangel' },
    { name: 'Handel / E-Commerce', score: 52, level: 3, teilnehmer: 41, topChallenge: 'KI-Strategie' },
    { name: 'Gesundheitswesen', score: 35, level: 2, teilnehmer: 28, topChallenge: 'Compliance & Datenschutz' },
    { name: 'IT & Software', score: 65, level: 3, teilnehmer: 56, topChallenge: 'Skalierung' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-20 bg-gradient-to-br from-primary-900 to-primary-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Branchen-Benchmark</h1>
          <p className="text-xl text-primary-200 mb-8">Wie steht Ihre Branche im KI-Vergleich? Erfahren Sie, wo Sie relativ zum Branchendurchschnitt stehen.</p>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4">
        <h2 className="section-title text-center mb-12">KI-Reifegrad nach Branchen</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branchen.map((b, i) => (
            <div key={i} className="card hover:shadow-xl transition-all">
              <h3 className="text-lg font-bold text-gray-900 mb-3">{b.name}</h3>
              <div className="flex items-end gap-3 mb-3">
                <span className="text-3xl font-extrabold text-primary-600">{b.score}%</span>
                <span className={`text-sm px-2 py-1 rounded-full ${b.level >= 3 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>Level {b.level}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div className="h-3 rounded-full" style={{ width: `${b.score}%`, backgroundColor: b.score > 50 ? '#22c55e' : b.score > 35 ? '#f59e0b' : '#ef4444' }} />
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{b.teilnehmer} Unternehmen</span>
                <span>Top-Challenge: {b.topChallenge}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="section-title mb-4">Detaillierten Branchen-Report bestellen</h2>
          <p className="text-gray-600 mb-8">Erhalten Sie einen umfassenden Report mit anonymisierten Branchendaten, Vergleichswerten und spezifischen Handlungsempfehlungen.</p>
          <div className="text-3xl font-extrabold text-gray-900 mb-4">&euro;297 <span className="text-lg font-normal text-gray-500">pro Report</span></div>
          <a href="/anfrage?plan=benchmark" className="btn-primary">Branchen-Report anfragen</a>
        </div>
      </section>
    </div>
  )
}

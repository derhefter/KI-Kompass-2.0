import { testimonials } from '../data/testimonials'

export default function Testimonials() {
  // Zeige die PFX/Ufuk Genc Testimonials
  const featured = testimonials.filter((t) => [5, 6].includes(t.id))

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Aus der Praxis
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ein echtes Beispiel: Wie digitale Transformation konkret aussieht &ndash;
            mit klarer Roadmap, strukturiertem Change-Management und messbaren Ergebnissen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {featured.map((t) => (
            <div key={t.id}>
              {t.type === 'case' ? <CaseCard data={t} /> : <QuoteCard data={t} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseCard({ data }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
          {data.branche}
        </span>
        <span className="text-xs text-gray-500">{data.region}</span>
      </div>

      <div className="space-y-3 flex-1">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Ausgangslage</p>
          <p className="text-sm text-gray-600">{data.ausgangslage}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Ma&szlig;nahme</p>
          <p className="text-sm text-gray-600">{data.massnahme}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-accent-600 uppercase tracking-wide mb-1">Ergebnis</p>
          <p className="text-sm text-gray-700 font-medium">{data.ergebnis}</p>
        </div>
      </div>
    </div>
  )
}

function QuoteCard({ data }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm h-full flex flex-col">
      <div className="flex-1">
        <svg className="w-8 h-8 text-primary-200 mb-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
        </svg>
        <p className="text-gray-700 italic leading-relaxed mb-4">
          &bdquo;{data.zitat}&ldquo;
        </p>
      </div>

      <div className="border-t border-gray-100 pt-4 mt-auto">
        <p className="font-semibold text-gray-900 text-sm">{data.name}</p>
        <p className="text-xs text-gray-500">
          {data.rolle}{data.region ? ` \u2022 ${data.region}` : ''}
          {data.mitarbeiter ? ` \u2022 ${data.mitarbeiter} MA` : ''}
        </p>

        {data.kennzahlen && data.kennzahlen.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {data.kennzahlen.map((k, i) => (
              <div key={i} className="bg-primary-50 rounded-lg px-3 py-1.5">
                <span className="text-xs text-gray-500">{k.label}: </span>
                <span className="text-xs font-semibold text-primary-700">{k.wert}</span>
                {k.detail && <span className="text-xs text-gray-400"> {k.detail}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

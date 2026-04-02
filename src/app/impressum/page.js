export const metadata = {
  title: 'Impressum | KI-Kompass',
  description: 'Impressum der KI-Kompass-Plattform von frimalo, Steffen Hefter, Halle (Saale).',
  robots: 'noindex, nofollow',
}

export default function Impressum() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="card">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Impressum</h1>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900">Angaben gem&auml;&szlig; &sect; 5 DDG</h2>
              <p className="text-gray-700">
                frimalo<br />
                Inhaber: Steffen Hefter<br />
                Wilhelm-Schrader-Stra&szlig;e 27a<br />
                06120 Halle (Saale)
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">Kontakt</h2>
              <p className="text-gray-700">
                E-Mail: ki-kompass@derhefter.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">Verantwortlich f&uuml;r den Inhalt nach &sect; 18 Abs. 2 MStV</h2>
              <p className="text-gray-700">
                Steffen Hefter<br />
                Wilhelm-Schrader-Stra&szlig;e 27a<br />
                06120 Halle (Saale)
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">Berufsrechtliche Regelungen</h2>
              <p className="text-gray-700">
                frimalo ist kein zugelassenes Beratungsunternehmen im Sinne von Steuerberatungs-,
                Rechtsanwalts- oder Wirtschaftspr&uuml;fergesetzen. Die Inhalte dieser Website und
                alle Dienstleistungen stellen keine Rechts-, Steuer- oder verbindliche
                Unternehmensberatung dar, sondern dienen der allgemeinen Orientierung.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">Haftungsausschluss</h2>
              <p className="text-gray-700">
                Die Inhalte dieser Seiten wurden mit gr&ouml;&szlig;ter Sorgfalt erstellt. F&uuml;r die Richtigkeit,
                Vollst&auml;ndigkeit und Aktualit&auml;t der Inhalte k&ouml;nnen wir jedoch keine Gew&auml;hr &uuml;bernehmen.
                Der KI-Readiness Check dient der Orientierung und stellt keine verbindliche Beratung dar.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

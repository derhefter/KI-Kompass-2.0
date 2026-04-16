export const metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung des KI-Kompass: Wie Ihre Daten verarbeitet werden – transparent und DSGVO-konform.',
  robots: 'noindex, nofollow',
}

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="card">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Datenschutzerkl&auml;rung</h1>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700">

            <section>
              <h2 className="text-xl font-semibold text-gray-900">1. Datenschutz auf einen Blick</h2>
              <p>
                Die folgenden Hinweise geben einen einfachen &Uuml;berblick dar&uuml;ber, was mit Ihren
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
              </p>
              <p>
                <strong>Beim kostenlosen KI-Check:</strong> Ihre Antworten auf die 12 Fragen werden
                ausschlie&szlig;lich lokal in Ihrem Browser verarbeitet und nicht an unsere Server
                &uuml;bermittelt &ndash; bis Sie am Ende freiwillig Ihre E-Mail-Adresse angeben.
              </p>
              <p>
                <strong>Wenn Sie Ihre E-Mail angeben</strong> (E-Mail-Gate nach dem Check, Kontaktformulare,
                Bestellungen): Dann werden Name, E-Mail und Firma an uns &uuml;bermittelt und verarbeitet.
                F&uuml;r Speicherung und Versand nutzen wir Google-Dienste (mit Standardvertragsklauseln
                gem&auml;&szlig; Art. 46 DSGVO, eine US-Datenverarbeitung ist dabei m&ouml;glich).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">2. Verantwortlicher</h2>
              <p>
                frimalo &ndash; Steffen Hefter<br />
                Wilhelm-Schrader-Stra&szlig;e 27a<br />
                06120 Halle (Saale)<br />
                E-Mail: ki-kompass@derhefter.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">3. Datenerfassung auf dieser Website</h2>

              <h3 className="text-lg font-semibold text-gray-900 mt-4">KI-Check (Fragen 1&ndash;12)</h3>
              <p>
                Alle 12 Fragen des kostenlosen Checks werden <strong>clientseitig in Ihrem Browser</strong> ausgewertet.
                Es findet keine &Uuml;bermittlung Ihrer Antworten an unsere Server statt, solange Sie
                keine E-Mail-Adresse eingeben.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-4">E-Mail-Erfassung und Kontaktformulare</h3>
              <p>
                Wenn Sie uns freiwillig Ihre E-Mail-Adresse oder andere Kontaktdaten mitteilen
                (z.B. nach dem Check, f&uuml;r eine Anfrage zum Premium Report oder eine Terminbuchung),
                verwenden wir diese ausschlie&szlig;lich f&uuml;r den angegebenen Zweck.
                Die Kommunikation erfolgt &uuml;ber Google Gmail (Google Ireland Ltd., Dublin 4, Irland).
                Eine Weitergabe an sonstige Dritte erfolgt nicht.
                Sie k&ouml;nnen die L&ouml;schung Ihrer Daten jederzeit per E-Mail verlangen.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-4">E-Mail-Dienstleister (Google Gmail)</h3>
              <p>
                F&uuml;r den Versand von E-Mails nutzen wir Google Gmail (Google Ireland Ltd.,
                Gordon House, Barrow Street, Dublin 4, Irland). Google kann Ihre Daten
                auch in den USA verarbeiten. Die &Uuml;bermittlung erfolgt auf Grundlage von
                Standardvertragsklauseln gem&auml;&szlig; Art. 46 DSGVO. Weitere Informationen:{' '}
                <a href="https://policies.google.com/privacy" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  policies.google.com/privacy
                </a>
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-4">Datenspeicherung (Google Sheets)</h3>
              <p>
                Zur Verwaltung von Kundendaten, Zugangscodes und Assessment-Ergebnissen nutzen wir
                Google Sheets (Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4, Irland).
                Die gespeicherten Daten umfassen: Name, E-Mail-Adresse, Firma sowie
                Assessment-Ergebnisse (Score, Level). Eine Verarbeitung durch Google auch in den USA
                ist auf Basis von Standardvertragsklauseln m&ouml;glich (Art. 46 DSGVO).
                Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserf&uuml;llung) und
                Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-4">Terminbuchung (Google Kalender)</h3>
              <p>
                F&uuml;r die Terminbuchung nutzen wir Google Kalender (Google Ireland Ltd.,
                Dublin 4, Irland). Bei Buchung werden Ihr Name und Ihre E-Mail an Google
                &uuml;bermittelt. Verarbeitung nach Standardvertragsklauseln gem. Art. 46 DSGVO.
                Weitere Informationen:{' '}
                <a href="https://policies.google.com/privacy" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  policies.google.com/privacy
                </a>
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-4">Zahlungsabwicklung (Mollie)</h3>
              <p>
                F&uuml;r die Abwicklung von Online-Zahlungen nutzen wir Mollie B.V.,
                Keizersgracht 126, 1015 CW Amsterdam, Niederlande. Bei Zahlung werden Name,
                E-Mail-Adresse, Firma, Betrag und Zahlungsmethode an Mollie &uuml;bermittelt.
                Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO. Mollie ist nach PSD2 reguliert
                und unterliegt der Aufsicht der Niederl&auml;ndischen Zentralbank.
                Weitere Informationen:{' '}
                <a href="https://www.mollie.com/privacy" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  mollie.com/privacy
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">4. Hosting</h2>
              <p>
                Diese Website wird bei Vercel Inc. (San Francisco, USA) gehostet. Vercel
                erfasst beim Aufruf technisch bedingt Ihre IP-Adresse. Die &Uuml;bermittlung
                erfolgt auf Grundlage von Standardvertragsklauseln gem. Art. 46 DSGVO.
                Weitere Informationen:{' '}
                <a href="https://vercel.com/legal/privacy-policy" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  vercel.com/legal/privacy-policy
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">5. Ihre Rechte</h2>
              <p>Sie haben jederzeit das Recht auf:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Auskunft &uuml;ber Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
                <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                <li>L&ouml;schung Ihrer Daten (Art. 17 DSGVO)</li>
                <li>Einschr&auml;nkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Daten&uuml;bertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              </ul>
              <p className="mt-2">
                Wenden Sie sich hierzu an:{' '}
                <a href="mailto:ki-kompass@derhefter.com" className="text-primary-600 hover:underline">
                  ki-kompass@derhefter.com
                </a>
              </p>
              <p className="mt-2">
                Zust&auml;ndige Aufsichtsbeh&ouml;rde: Landesbeauftragter f&uuml;r den Datenschutz
                Sachsen-Anhalt, Postfach 1947, 39009 Magdeburg.
              </p>
            </section>

            <p className="text-xs text-gray-400 mt-8">Stand: April 2026</p>
          </div>
        </div>
      </div>
    </div>
  )
}

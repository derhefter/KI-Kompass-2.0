export const metadata = {
  title: '\u00dcber mich | Steffen Hefter - KI-Kompass',
  description: 'Steffen Hefter, Gesch\u00e4ftsf\u00fchrer der frimalo und KI-Berater f\u00fcr KMU in Mitteldeutschland. \u00dcber 20 Jahre Erfahrung in F\u00fchrung, Digitalisierung und Prozessoptimierung.',
}

export default function UeberMich() {
  const erstberatungUrl = process.env.NEXT_PUBLIC_ERSTBERATUNG_URL || process.env.NEXT_PUBLIC_BOOKING_URL || '/anfrage?plan=strategie'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero - pers\u00f6nlich & einladend */}
      <section className="relative bg-gradient-to-br from-slate-900 via-primary-900 to-primary-800 text-white py-24 overflow-hidden">
        {/* Subtile Hintergrund-Elemente */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-shrink-0">
              <div className="w-56 md:w-72 rounded-2xl border-4 border-white/20 overflow-hidden shadow-2xl ring-4 ring-primary-500/20">
                <img
                  src="/Steffen2025.jpg"
                  alt="Steffen Hefter - KI-Berater f&uuml;r KMU"
                  className="w-full h-auto block"
                />
              </div>
            </div>

            <div className="text-center md:text-left">
              <div className="inline-flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-primary-200 font-medium mb-4 border border-white/10">
                KI-Berater f&uuml;r den Mittelstand
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight">
                Steffen Hefter
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 leading-relaxed max-w-2xl mb-6">
                Ich helfe kleinen und mittleren Unternehmen, K&uuml;nstliche Intelligenz
                pragmatisch einzusetzen &ndash; ohne &Uuml;berforderung, ohne Buzzword-Bingo.
              </p>
              <p className="text-primary-300 text-lg italic">
                &bdquo;Technologie funktioniert nur, wenn die Menschen dahinter mitgenommen werden.&ldquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pers\u00f6nliche Ansprache - Warum ich das mache */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Warum ich das mache</h2>

            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Ich war &uuml;ber 20 Jahre lang in F&uuml;hrungspositionen in der Software- und
                Energiewirtschaft t&auml;tig. Habe Teams mit &uuml;ber 500 Mitarbeitenden gef&uuml;hrt,
                Budgets von 15 Millionen Euro verantwortet und Unternehmen durch gro&szlig;e
                Ver&auml;nderungsphasen begleitet.
              </p>

              <p>
                Dabei habe ich eines immer wieder erlebt: <strong className="text-gray-900">Die Technologie
                ist selten das Problem. Es sind die Menschen, die Prozesse und der fehlende Plan.</strong>
              </p>

              <p>
                Gerade im Mittelstand sehe ich enormes Potenzial &ndash; aber auch gro&szlig;e
                Verunsicherung. Gesch&auml;ftsf&uuml;hrer sagen mir: <em>&bdquo;Wir wissen,
                dass wir etwas tun m&uuml;ssen. Aber wo fangen wir an? Und wer macht das
                neben dem Tagesgesch&auml;ft?&ldquo;</em>
              </p>

              <p>
                Genau hier setze ich an. Mit dem KI-Kompass gebe ich Ihnen einen klaren
                Startpunkt &ndash; und begleite Sie auf Wunsch pers&ouml;nlich weiter. Schritt
                f&uuml;r Schritt, in Ihrem Tempo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Zahlen & Fakten - kompakt */}
      <section className="py-12 bg-primary-50 border-y border-primary-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: '20+', label: 'Jahre F\u00fchrungserfahrung' },
              { num: '500+', label: 'Mitarbeitende gef\u00fchrt' },
              { num: '15 Mio.\u20ac', label: 'Budgetverantwortung' },
              { num: '6+', label: 'Branchen-Expertise' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-extrabold text-primary-600 mb-1">{stat.num}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Was mich besonders macht */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Was mich besonders macht</h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
            Mein Weg f&uuml;hrte mich durch v&ouml;llig unterschiedliche Welten &ndash; vom Sozialwesen
            &uuml;ber den Vertrieb bis zur IT. Genau das macht meinen Blick auf Ihr Unternehmen wertvoll.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 border-l-4 border-l-primary-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Mensch trifft Technik</h3>
                  <p className="text-gray-600">
                    Als Diplom-Sozialp&auml;dagoge habe ich gelernt, Menschen zu verstehen und
                    Ver&auml;nderungsprozesse empathisch zu begleiten. KI-Transformation ist kein
                    IT-Projekt &ndash; es ist ein Change-Prozess. Und genau das ist meine St&auml;rke.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 border-l-4 border-l-accent-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent-100 text-accent-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Vertrieb &amp; Strategie</h3>
                  <p className="text-gray-600">
                    Jahre im Vertrieb, Key-Account-Management und in der strategischen
                    Unternehmenssteuerung haben mir beigebracht, wie Gesch&auml;fte wirklich
                    funktionieren. Ich spreche die Sprache des Mittelstands.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 border-l-4 border-l-primary-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Branchen&uuml;bergreifend denken</h3>
                  <p className="text-gray-600">
                    Von Software &uuml;ber Energiewirtschaft bis zu Telekommunikation, Finanzen
                    und Sozialwirtschaft &ndash; ich &uuml;bertrage L&ouml;sungen aus einer Branche
                    auf eine andere. Das bringt frische Perspektiven.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 border-l-4 border-l-accent-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent-100 text-accent-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Change Management</h3>
                  <p className="text-gray-600">
                    Gro&szlig;e Transformationsprojekte erfolgreich umgesetzt &ndash; von der digitalen
                    Produktionssteuerung bis zur kompletten Neuausrichtung von Teams.
                    Ich wei&szlig;, wie man alle Beteiligten mitnimmt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mein Ansatz - 3 Phasen */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Mein Ansatz: KI in kleinen Happen</h2>
          <p className="text-center text-gray-600 text-lg mb-14 max-w-2xl mx-auto">
            Keine &Uuml;berforderung, kein Big-Bang. Sondern ein klarer Weg in drei Phasen,
            angepasst an Ihr Tempo und Ihre Ressourcen.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                phase: 'Phase 1',
                name: 'AI Awareness',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                desc: 'Orientierung schaffen, Mitarbeitende sensibilisieren, rechtliche Klarheit gewinnen. Erste KI-Tools ausprobieren.',
                color: 'primary',
              },
              {
                phase: 'Phase 2',
                name: 'AI Readiness',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                ),
                desc: 'Reifegrad analysieren, Daten pr\u00fcfen, Use-Cases priorisieren. Quick-Wins definieren und Roadmap erstellen.',
                color: 'accent',
              },
              {
                phase: 'Phase 3',
                name: 'AI Steadiness',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                desc: 'Pilotprojekte umsetzen, Erfolge messen. Prozesse skalieren und KI nachhaltig im Unternehmen verankern.',
                color: 'primary',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 bg-${item.color}-100 text-${item.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  {item.icon}
                </div>
                <div className="text-xs font-semibold text-primary-500 uppercase tracking-wide mb-1">{item.phase}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pers\u00f6nliches - was mich ausmacht als Mensch */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Was mich antreibt</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 border-t-4 border-t-primary-500">
              <h3 className="font-bold text-gray-900 mb-3">Meine &Uuml;berzeugung</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                KI ist kein Selbstzweck, sondern ein Werkzeug zur Entlastung von Fachkr&auml;ften
                und zur St&auml;rkung regionaler Unternehmen. Ich bringe soziale Wirkung und
                &ouml;konomische Effizienz in Einklang.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 border-t-4 border-t-accent-500">
              <h3 className="font-bold text-gray-900 mb-3">Warum Mitteldeutschland?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Ich bin in Halle (Saale) zu Hause und fest in der Region verwurzelt.
                Mitteldeutschland hat enormes Potenzial &ndash; und ich m&ouml;chte dazu beitragen,
                dass KMU hier den Anschluss nicht verlieren, sondern mit KI neue Chancen ergreifen.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 border-t-4 border-t-warm-500">
              <h3 className="font-bold text-gray-900 mb-3">Mein Versprechen</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Hilfe zur Selbsthilfe statt Abh&auml;ngigkeit. Ich bef&auml;hige Ihr Team,
                KI eigenst&auml;ndig zu nutzen. Mein Ansatz sorgt daf&uuml;r, dass Sie nicht
                &uuml;berfordert werden &ndash; sondern Schritt f&uuml;r Schritt sicher vorankommen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Termin buchen */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Lassen Sie uns sprechen</h2>
          <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">
            Ob Sie gerade erst anfangen oder schon konkrete Fragen haben &ndash;
            in 30 Minuten finden wir heraus, wie ich Ihnen helfen kann.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href={erstberatungUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 text-lg font-semibold text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Erstberatung buchen (30 Min.)
            </a>
            <a
              href="mailto:ki-kompass@derhefter.com"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 text-lg font-semibold text-primary-700 bg-primary-50 rounded-xl hover:bg-primary-100 transition-all border border-primary-200"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              E-Mail schreiben
            </a>
          </div>

          <p className="text-sm text-gray-500">
            Kostenlos &amp; unverbindlich &ndash; kein Verkaufsdruck, versprochen.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Bereit f&uuml;r den ersten Schritt?
          </h2>
          <p className="text-primary-200 text-lg mb-8">
            Starten Sie mit dem kostenlosen KI-Readiness Check &ndash; in 5 Minuten wissen Sie, wo Sie stehen.
          </p>
          <a href="/assessment" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-700 bg-white rounded-xl hover:bg-primary-50 transition-all shadow-lg">
            Kostenlosen Check starten
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  )
}

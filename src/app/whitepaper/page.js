'use client'

import WhitepaperAudio, { PDF_SRC } from '../../components/WhitepaperAudio'

export default function WhitepaperPage() {
  const triggerPlay = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('kk:wp-play'))
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-warm-50 via-white to-primary-50 py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Pitch + CTAs */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-warm-100 text-warm-600 rounded-full text-xs font-semibold mb-6 fade-in-up">
                <span className="bg-warm-500 text-white px-2 py-0.5 rounded-full text-[10px] tracking-wider uppercase">Neu</span>
                <span>🎧 Whitepaper jetzt auch als 20-Min-Audio</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-700 mb-5 leading-tight fade-in-up fade-in-up-delay-1">
                Pragmatische KI im{' '}
                <span className="text-primary-500">Mittelstand</span>.
              </h1>

              <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed fade-in-up fade-in-up-delay-2 max-w-xl md:max-w-none mx-auto md:mx-0">
                Das Whitepaper ohne Buzzwords: konkrete Hebel, echte Beispiele und
                ein Förder-Kompass für Ihren Betrieb. Lesen oder hören – Sie entscheiden.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start fade-in-up fade-in-up-delay-3">
                <button
                  type="button"
                  onClick={triggerPlay}
                  className="btn-primary"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Jetzt anhören
                </button>
                <a
                  href={PDF_SRC}
                  download
                  className="btn-secondary"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  PDF herunterladen
                </a>
              </div>

              <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-6 text-xs text-slate-500 fade-in-up fade-in-up-delay-4">
                {['20 Min Hörzeit', '32 Seiten PDF', 'Kostenfrei'].map((item) => (
                  <div key={item} className="flex items-center">
                    <svg className="w-3.5 h-3.5 text-accent-500 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-400 mt-6 fade-in-up fade-in-up-delay-4">
                3 Min gratis hören. Für die vollen 20 Min und das PDF: kurze E-Mail-Eintragung.
              </p>
            </div>

            {/* Right: Audio-TOC Card */}
            <div className="fade-in-up fade-in-up-delay-2">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-7 relative">
                <div className="absolute -top-3 left-6 bg-warm-500 text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full">
                  20-Min Audio
                </div>
                <h3 className="text-lg font-bold text-primary-700 mb-2 mt-2">Was Sie erwartet</h3>
                <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                  Vier kompakte Kapitel, die den Weg von „KI klingt wichtig" zu
                  „nächsten Montag legen wir los" überbrücken.
                </p>
                <ul className="space-y-3">
                  {[
                    ['00:00', 'Warum KI im Mittelstand anders funktioniert'],
                    ['04:30', 'Die drei Hebel: Routine, Wissen, Kommunikation'],
                    ['10:15', 'Förderung 2026: go-digital, Digital Jetzt, BAFA'],
                    ['15:40', '90-Tage-Roadmap mit Tools unter 50 €/Monat'],
                    ['18:50', 'Was Sie nächsten Montag wirklich tun sollten'],
                  ].map(([ts, title]) => (
                    <li
                      key={ts}
                      className="flex items-start gap-3 text-sm text-slate-700 pb-3 border-b border-slate-100 last:border-b-0 last:pb-0"
                    >
                      <span className="font-mono text-xs text-slate-400 flex-shrink-0 mt-0.5 min-w-[42px]">
                        {ts}
                      </span>
                      <span>{title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Was Sie mitnehmen */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-warm-500 font-semibold mb-3">
              Was Sie mitnehmen
            </p>
            <h2 className="section-title">
              Klartext über KI – in der Sprache Ihres Betriebs.
            </h2>
            <p className="section-subtitle">
              Geschrieben für Inhaber:innen von 5–50-MA-Betrieben. Keine Tech-Theorie,
              keine Visionen, keine 60-seitigen PDFs aus der Berater-Mühle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tag: 'Kapitel 1–2',
                title: 'Was wirklich Zeit spart.',
                desc: 'Drei Bereiche, die in fast jedem KMU ohne große Investition messbar Stunden zurückgeben – mit konkreten Tools.',
              },
              {
                tag: 'Kapitel 3',
                title: 'Wer das bezahlt.',
                desc: 'Die drei Förderprogramme 2026 verständlich erklärt – mit Eigenanteil-Beispielen für Investitionen zwischen 5 k € und 50 k €.',
              },
              {
                tag: 'Kapitel 4',
                title: 'Wie Sie Montag starten.',
                desc: 'Eine 90-Tage-Roadmap, die Sie selbst umsetzen können – ohne Beratungsbudget, ohne IT-Abteilung.',
              },
            ].map((item) => (
              <div key={item.title} className="card hover:shadow-md transition-shadow">
                <div className="text-xs font-semibold text-warm-500 uppercase tracking-wider mb-2">
                  {item.tag}
                </div>
                <h3 className="text-lg font-bold text-primary-700 mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-700 to-primary-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-widest text-warm-300 font-semibold mb-4">
            Jetzt reinhören
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            3 Minuten gratis. Dann entscheiden Sie.
          </h2>
          <p className="text-base text-primary-100 mb-8 leading-relaxed">
            Audio läuft sofort, ohne Anmeldung. Erst wenn Sie weiterhören wollen,
            fragen wir nach Ihrer E-Mail-Adresse.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={triggerPlay}
              className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-primary-700 bg-white rounded-lg hover:bg-warm-50 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              Audio starten
            </button>
            <a
              href={PDF_SRC}
              download
              className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-white border-2 border-white/40 rounded-lg hover:bg-white/10 transition-colors"
            >
              PDF herunterladen
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-primary-200">
            <span>✓ Kein Account</span>
            <span>✓ Kein Newsletter-Zwang</span>
            <span>✓ Sofort hörbar</span>
          </div>
        </div>
      </section>

      {/* Audio-Player + Modal */}
      <WhitepaperAudio />
    </>
  )
}

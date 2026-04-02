export default function FAQ() {
  const faqs = [
    {
      q: 'Wie lange dauert der Check?',
      a: 'Der kostenlose Schnell-Check dauert nur 5 Minuten. Sie beantworten 12 praxisnahe Fragen und erhalten sofort Ihr Ergebnis.',
    },
    {
      q: 'Brauche ich technisches Vorwissen?',
      a: 'Nein! Die Fragen sind bewusst allgemeinverst\u00e4ndlich formuliert. Sie brauchen keinerlei IT- oder KI-Kenntnisse.',
    },
    {
      q: 'Was kostet der Check?',
      a: 'Der Schnell-Check ist komplett kostenfrei. F\u00fcr eine detaillierte Analyse mit individueller Roadmap gibt es den Premium Report f\u00fcr \u20ac147.',
    },
    {
      q: 'Werden meine Daten sicher behandelt?',
      a: 'Absolut. Alle Daten werden DSGVO-konform auf europ\u00e4ischen Servern verarbeitet und nicht an Dritte weitergegeben.',
    },
    {
      q: 'Sind wir zu klein oder zu wenig digital f\u00fcr KI?',
      a: 'Genau daf\u00fcr ist der Check da. Er zeigt Ihnen, wo Sie stehen und welche Schritte f\u00fcr Ihre Unternehmensgr\u00f6\u00dfe sinnvoll sind \u2013 Schritt f\u00fcr Schritt.',
    },
    {
      q: 'Was ist die F\u00f6rdermittelberatung?',
      a: '30 Minuten kostenlose Erstberatung, in der wir gemeinsam pr\u00fcfen, welche F\u00f6rderprogramme f\u00fcr Ihr Unternehmen in Frage kommen. Kein Verkaufsdruck.',
    },
    {
      q: 'Was bekomme ich im Premium Report?',
      a: 'Einen ausf\u00fchrlichen PDF-Report (20+ Seiten) mit Ihrem detaillierten KI-Reifegrad, individuellen Handlungsempfehlungen, einer priorisierten Roadmap, konkreten Tool-Empfehlungen und einer \u00dcbersicht relevanter F\u00f6rderprogramme.',
    },
    {
      q: 'Gibt es wirklich F\u00f6rdermittel f\u00fcr KI?',
      a: 'Ja. Programme wie go-digital (bis 50\u202f%, max. 16.500\u202f\u20ac), Digital Jetzt (40\u201360\u202f%, max. 50.000\u202f\u20ac) oder BAFA-Beratungsf\u00f6rderung unterst\u00fctzen KMU. In der Erstberatung kl\u00e4ren wir, was zu Ihnen passt.',
    },
    {
      q: 'Wann erhalte ich den Premium Report nach der Bestellung?',
      a: 'Nach Zahlungseingang erhalten Sie einen Zugangscode per E-Mail \u2013 in der Regel innerhalb weniger Minuten. Mit dem Code starten Sie das Premium-Assessment (30 Detailfragen), der fertige PDF-Report wird dann automatisch per E-Mail zugestellt.',
    },
    {
      q: 'Kann ich auch per Rechnung zahlen?',
      a: 'Ja. Auf der Bestellseite k\u00f6nnen Sie \u201ePer Rechnung zahlen\u201c w\u00e4hlen und Ihre Rechnungsadresse angeben. Sie erhalten die Rechnung per E-Mail und Ihr Zugang wird innerhalb von 12 Stunden freigeschaltet.',
    },
    {
      q: 'Was genau steht im Premium Report?',
      a: 'Der Report umfasst 20+ Seiten: Ihren detaillierten KI-Score nach Bereichen, priorisierte Handlungsempfehlungen, eine 90-Tage-Roadmap, konkrete Tool-Empfehlungen f\u00fcr Ihre Prozesse und eine \u00dcbersicht passender F\u00f6rderprogramme.',
    },
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-primary-700 mb-3">H&auml;ufige Fragen</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-white rounded-lg border border-slate-200">
              <summary className="flex justify-between items-center p-5 font-medium text-primary-700 text-sm cursor-pointer list-none">
                {faq.q}
                <svg className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-5">
                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-slate-600 text-sm mb-4">Noch unsicher? Sprechen Sie kurz mit uns &ndash; kostenlos und unverbindlich.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/assessment" className="btn-primary">
              Kostenlosen Check starten
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a href="/beratung" className="btn-secondary">
              30 Min kostenlose Beratung
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

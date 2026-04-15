// ============================================================
// KI-Kompass Blog – Redaktionssystem
// ============================================================
// Neue Artikel hier einfügen. Felder:
//   id:          eindeutige Zahl (nie ändern)
//   slug:        URL-Pfad, z.B. "ki-im-handwerk" → /blog/ki-im-handwerk
//   title:       Artikeltitel
//   excerpt:     Kurztext für Übersichtsseite (1-2 Sätze)
//   content:     Volltext als HTML (benutze <h2>, <p>, <ul>, <li>, <strong>)
//   category:    "KI-Grundlagen" | "Förderung" | "Praxisbeispiele" | "Tools & Tipps" | "Rechtliches"
//   author:      "Steffen Hefter"
//   date:        "YYYY-MM-DD"
//   status:      "published" | "draft"
//   image:       Pfad zur Bild-Datei (optional), z.B. "/blog/ki-handwerk.jpg"
//   readTime:    Lesedauer in Minuten (Schätzung: 200 Wörter/Min.)
// ============================================================

export const blogPosts = [
  {
    id: 13,
    slug: 'ki-im-mittelstand-2026-von-der-isolierten-loesung-zur-echten-prozessmaschine',
    title: 'KI im Mittelstand 2026: Von der isolierten Lösung zur echten Prozessmaschine',
    excerpt: 'Viele mittelständische Unternehmen haben in den letzten zwei Jahren erste Erfahrungen mit KI gesammelt. Oft blieb es jedoch bei isolierten Anwendungen. 2026 rückt nun die Kernfrage in den Fokus: Wie wird aus einem netten Werkzeug eine echte Maschine, die unsere Wertschöpfung aktiv unterstützt?',
    content: `
<p>Viele mittelständische Unternehmen haben in den letzten zwei Jahren erste Erfahrungen mit KI gesammelt. Oft blieb es jedoch bei isolierten Anwendungen – ein Chatbot auf der Website oder ChatGPT zur Texterstellung. Der messbare Einfluss auf das Betriebsergebnis lässt in diesen Szenarien meist auf sich warten. 2026 rückt nun die Kernfrage in den Fokus: Wie wird aus einem netten Werkzeug eine Maschine, die unsere Wertschöpfung aktiv unterstützt?</p>
<p><strong>Der Trend: End-to-End-Automatisierung</strong><br>Der Schlüssel liegt in der durchgängigen Automatisierung ganzer Prozessketten. Statt einzelner Aufgaben werden komplette Abläufe durch die clevere Kombination von KI (für das Verstehen unstrukturierter Daten wie E-Mails) und RPA (Software-Roboter für die Dateneingabe) übernommen. Die gute Nachricht: Diese Technologien sind mittlerweile standardisiert und damit endlich auch für mittlere Budgets wirtschaftlich darstellbar.</p>
<p><strong>Ein konkretes Praxisbeispiel</strong><br>Wo früher ein Mitarbeiter eine E-Mail öffnen, das PDF herunterladen, Daten abtippen und in das System übertragen musste, arbeitet heute ein KI-Agent. Er liest das Postfach aus, extrahiert fehlerfrei Beträge, gleicht sie mit der Bestellung ab und bereitet die Buchung vor. Die Fachkraft wird vom reinen "Abtipper" zum Entscheider, der nur noch prüft und freigibt.</p>
<p><strong>Der EU AI Act: Qualitätssiegel statt Schreckgespenst</strong><br>Im August 2026 tritt der EU AI Act in Kraft. Für Betriebe bedeutet das: Der unkontrollierte Daten-Upload auf ausländische Server ist ein Risiko. Gefragt sind europäische, DSGVO-konforme Lösungen. Wer hier professionell aufgestellt ist, nutzt Regulierung künftig als echten Wettbewerbsvorteil bei Ausschreibungen.</p>
<p><strong>Handlungsempfehlungen für die Praxis:</strong><br>Vermeiden Sie endlose Theorie-Projekte. Der pragmatische Weg:<br>
1. Identifizieren Sie den Prozess, der die meiste manuelle Zeit frisst.<br>
2. Automatisieren Sie diesen einen Prozess durchgängig.<br>
3. Messen Sie den Erfolg anhand der eingesparten Durchlaufzeit.</p>
`,
    category: 'Praxisbeispiele',
    author: 'Steffen Hefter',
    date: '2026-04-15',
    status: 'published',
    image: '',
    readTime: 4
  },

  {
    id: 12,
    slug: 'ki-automatisierung-2026-warum-94-der-deutschen-mittelstaendler-aktuell-geld-auf-der-strasse-liegen-lassen',
    title: 'KI-Automatisierung 2026: Warum 94 % der deutschen Mittelständler aktuell Geld auf der Straße liegen lassen',
    excerpt: 'Während KI gefühlt allgegenwärtig ist, sieht die Realität im deutschen Mittelstand anders aus: 94 % der Unternehmen haben KI noch immer nicht in ihre Prozesse integriert. Und das, obwohl KI-nutzende KMU deutlich höhere Nettomargen erzielen.',
    content: `
<p>Während KI gefühlt allgegenwärtig ist, sieht die Realität im deutschen Mittelstand anders aus: 94 % der Unternehmen haben KI noch immer nicht in ihre Prozesse integriert. Und das, obwohl KI-nutzende KMU deutlich höhere Nettomargen erzielen.</p>

<p>Die Zeiten, in denen KI ein reines "Experiment" war, sind vorbei. Es geht jetzt um handfeste Wettbewerbsvorteile durch Prozessautomatisierung.</p>

<p><strong>Wo der Mittelstand jetzt profitiert:</strong></p>
<ul>
  <li><strong>HR-Entlastung:</strong> Automatisierte Vorsortierung von Bewerbungen und Beantwortung von Standardfragen.</li>
  <li><strong>Finanz-Turbo:</strong> Intelligente Rechnungserkennung und automatische Vorkontierung im ERP-System.</li>
  <li><strong>Vertriebs-Effizienz:</strong> Strukturierte Auswertung von Kundenanfragen und automatisierte Vorbereitung von Angeboten.</li>
</ul>

<p><strong>Der EU AI Act:</strong><br>Im August 2026 greift der EU AI Act. Große Kunden fragen schon heute nach der KI-Governance ihrer Partner. Wer hier keine Antworten hat, verliert Aufträge.</p>

<p><strong>Fazit:</strong><br>Starten Sie nicht mit "Wir brauchen KI". Starten Sie mit: "Welcher Prozess kostet uns am meisten Zeit?"</p>
`,
    category: 'Praxisbeispiele',
    author: 'Steffen Hefter',
    date: '2026-04-14',
    status: 'published',
    image: '',
    readTime: 3
  },

  {
    id: 11,
    slug: 'ki-automatisierung-im-mittelstand-warum-abwarten-teurer-ist-als-anfangen',
    title: 'KI-Automatisierung im Mittelstand: Warum Abwarten teurer ist als Anfangen',
    excerpt: 'Die Theorie kennen wir alle: Künstliche Intelligenz macht Prozesse schneller. Aber wie sieht das in der Praxis aus, wenn man nicht Google oder Microsoft ist, sondern ein 100-Mann-Betrieb im Maschinenbau? Wir schauen uns an, was 2026 wirklich funktioniert.',
    content: `
<p><strong>Der Status Quo (ohne Buzzwords)</strong><br>Die Realität in vielen Unternehmen sieht so aus: PDFs werden ausgedruckt, abgetippt und in drei verschiedene Systeme eingepflegt. Das ist nicht nur fehleranfällig, sondern bindet genau die Fachkräfte, die wir eigentlich woanders brauchen. Aktuelle Zahlen zeigen: 75% der Unternehmen nutzen bereits erste KI-Ansätze, aber oft fehlt der Mut für den nächsten Schritt.</p>

<p><strong>Was jetzt schon geht (und sich rechnet):</strong></p>
<ul>
  <li><strong>Intelligente Dokumentenverarbeitung (IDP):</strong> Rechnungen und Lieferscheine werden nicht mehr nur eingescannt, sondern die KI liest die relevanten Daten aus und bucht sie direkt ins ERP-System.</li>
  <li><strong>Predictive Maintenance:</strong> Maschinen melden sich, bevor sie kaputtgehen. Ein Kunststoffhersteller nutzt das bereits, um Ausschuss zu minimieren.</li>
  <li><strong>Software-Roboter (RPA):</strong> Kleine, KI-gestützte Helfer übernehmen das stumpfe Copy-Paste zwischen alten Systemen, die keine moderne API haben.</li>
</ul>

<p><strong>Die Hürde im Kopf (und wie man sie nimmt)</strong><br>Das größte Hindernis ist oft nicht die Technik, sondern fehlendes Wissen und die Angst vor riesigen IT-Projekten. Der Fehler: Man will sofort den perfekten, vollautomatisierten Prozess. Der bessere Weg: Einen kleinen, schmerzhaften Prozess suchen (z.B. die Spesenerfassung), diesen automatisieren und dann skalieren.</p>

<p><strong>Fazit für die Praxis</strong><br>Wer auf die "perfekte" KI-Lösung wartet, wartet zu lange. Die Werkzeuge für den Mittelstand sind da, die Einstiegshürden sinken. Der europäische Weg liegt nicht in wilden Experimenten, sondern in der pragmatischen Automatisierung von echten Problemen.</p>

<p><em>Start small, scale smart.</em></p>
`,
    category: 'Praxisbeispiele',
    author: 'Steffen Hefter',
    date: '2026-04-13',
    status: 'published',
    image: '',
    readTime: 3
  },

  {
    id: 10,
    slug: 'ki-als-infrastruktur-nicht-als-pflaster-warum-2026-das-jahr-der-entscheidung-fuer-den-mittelstand-ist',
    title: 'KI als Infrastruktur, nicht als Pflaster: Warum 2026 das Jahr der Entscheidung für den Mittelstand ist',
    excerpt: 'Lange Zeit war KI im Mittelstand ein nettes Experiment. Ein Chatbot hier, eine automatisierte E-Mail dort. Aber 2026 dreht sich der Wind. Wer KI jetzt noch als isoliertes Gimmick betrachtet, verliert den Anschluss.',
    content: `
<p><strong>Lange Zeit war KI im Mittelstand ein nettes Experiment.</strong> Ein Chatbot hier, eine automatisierte E-Mail dort. Aber 2026 dreht sich der Wind. Wer KI jetzt noch als isoliertes "Gimmick" betrachtet, verliert den Anschluss.</p>

<p>Aktuelle Entwicklungen zeigen: Die B2B-Prozessautomatisierung wandelt sich. Weg von punktuellen Lösungen, hin zu einem systemischen Ansatz. KI ist nicht mehr das Tool, das eine einzige Aufgabe übernimmt – sie wird zur Infrastruktur, die Prozesse, Rollen und Geschäftsmodelle grundlegend verändert.</p>

<p><strong>Was das konkret für den EU-Mittelstand bedeutet:</strong></p>
<ol>
  <li><strong>Agentic AI klopft an die Tür (aber mit Vorsicht):</strong> KI-Agenten, die eigenständig Handlungen ausführen, werden greifbarer. Doch Vorsicht: Laut Analysten scheitern über 40% dieser Projekte an unklarem ROI. Der pragmatische Weg? Starten Sie dort, wo die Fehlerquote niedrig und der Nutzen direkt messbar ist – etwa in der Rechnungsverarbeitung oder im HR-Onboarding.</li>
  <li><strong>Das Datenfundament entscheidet:</strong> Keine solide Datenbasis, keine sinnvolle KI. Wer seine unstrukturierten Daten jetzt nicht ordnet, baut auf Sand. Die Herausforderung liegt oft nicht in der Technologie selbst, sondern in der Integration in gewachsene, oft fragmentierte Systemlandschaften.</li>
  <li><strong>Mitarbeiter mitnehmen:</strong> KI automatisiert Aufgaben, nicht Menschen. Der Fokus verlagert sich auf die Weiterbildung. Wer seine Belegschaft befähigt, KI sicher im Arbeitsalltag einzusetzen, gewinnt den eigentlichen Wettbewerbsvorteil.</li>
</ol>

<p><strong>Der nächste Schritt?</strong><br>Hören Sie auf, nach dem "einen perfekten KI-Use-Case" zu suchen. Bauen Sie stattdessen Prozesse, die robust genug sind, um von KI unterstützt zu werden.</p>
`,
    category: 'Praxisbeispiele',
    author: 'Steffen Hefter',
    date: '2026-04-12',
    status: 'published',
    image: '',
    readTime: 3
  },

  {
    id: 9,
    slug: 'vom-hype-zur-rendite-ki-agenten-automatisieren-den-mittelstand',
    title: 'Vom Hype zur Rendite: KI-Agenten automatisieren den Mittelstand',
    excerpt: 'Die Zeit der endlosen Pilotprojekte ist vorbei. 2026 markiert im Mittelstand den Wendepunkt: KI und Prozessautomatisierung müssen messbare Ergebnisse liefern.',
    content: `
<p><strong>Die Zeit der endlosen Pilotprojekte ist vorbei.</strong> 2026 markiert im Mittelstand den Wendepunkt: KI und Prozessautomatisierung müssen messbare Ergebnisse liefern. Erste Erfolge ("Quick Wins") werden bereits nach 3 bis 9 Monaten erwartet.</p>

<p><strong>Was ist neu?</strong><br>Der Fokus verlagert sich auf <em>Hyperautomatisierung</em> und <em>KI-Agenten</em>. Diese Agenten orchestrieren komplette Workflows selbstständig. Anstatt nur Daten zu analysieren, buchen sie Rechnungen, planen Termine oder bereiten Reklamationen entscheidungsreif vor. Besonders in der Buchhaltung und in Finanzprozessen zeigt sich ein massives Einsparpotenzial von 18 bis 32 %.</p>

<p><strong>EU AI Act im Nacken</strong><br>Gleichzeitig rückt der EU AI Act näher. Ab August 2026 gelten die Vorgaben für Hochrisikosysteme vollumfänglich. Der Trend geht deshalb eindeutig zu "Sovereign AI" und abgesicherten Corporate-LLMs – also Sprachmodellen, bei denen die Datenhoheit strikt im Unternehmen bleibt.</p>

<p><strong>Der pragmatische Weg:</strong><br>Nicht bei der Technologie anfangen, sondern beim Prozess. Wo brennt es? Wo sind die meisten manuellen Routineaufgaben? Zuerst die Datenbasis aufräumen, dann gezielt KI-Agenten auf diese Engpässe ansetzen. So gelingt der Umstieg von der Experimentierphase in den produktiven Alltag.</p>
`,
    category: 'Praxisbeispiele',
    author: 'Steffen Hefter',
    date: '2026-04-10',
    status: 'published',
    image: '',
    readTime: 3
  },

  {
    id: 8,
    slug: 'ki-automatisierung-2026-raus-aus-dem-labor-rein-in-die-prozesse',
    title: 'KI-Automatisierung 2026: Raus aus dem Labor, rein in die Prozesse',
    excerpt: 'Die Zeit der KI-Spielereien ist vorbei. Im Mittelstand geht es 2026 nicht mehr darum, ob man ChatGPT im Browser nutzt, sondern wie smarte Systeme ganze Prozessketten selbst übernehmen.',
    content: `
<p><strong>Die Zeit der KI-Spielereien ist vorbei.</strong> Im Mittelstand geht es 2026 nicht mehr darum, ob man ChatGPT im Browser nutzt, sondern wie smarte Systeme ganze Prozessketten selbst übernehmen.</p>

<p><strong>Was passiert gerade?</strong></p>
<ul>
  <li><strong>KI als Macher:</strong> KI ist nicht mehr nur der schlaue Assistent. Sogenannte "Agentic AI" plant und erledigt Aufgaben wie Rechnungsfreigaben oder Datenabgleiche inzwischen völlig autark.</li>
  <li><strong>Eigene Daten, eigene KI:</strong> Statt sensible Firmendaten blind auf US-Server auszulagern, setzen europäische KMUs auf souveräne "Corporate LLMs" – passgenaue KI-Modelle, die lokal laufen. Das macht den EU AI Act vom Schreckgespenst zum klaren Qualitätsmerkmal.</li>
  <li><strong>Vom Pilotprojekt zum Rollout:</strong> Fördertöpfe helfen aktuell enorm, doch das Problem bleibt oft der Sprung von der Test-Idee zur flächendeckenden Automatisierung.</li>
</ul>

<p><strong>Praxis-Tipp:</strong><br>Startet nicht beim Tool, sondern beim Schmerz. Wo im Betrieb liegen die nervigsten Routine-Aufgaben, die eure Leute frustrieren und wertvolle Zeit fressen? Genau dort setzt ihr an.</p>
`,
    category: 'Praxisbeispiele',
    author: 'Steffen Hefter',
    date: '2026-04-09',
    status: 'published',
    image: '',
    readTime: 3
  },

  {
    id: 7,
    slug: 'der-mittelstand-zoegert-bei-ki-weil-oft-am-falschen-ende-angesetzt-wird',
    title: 'Der Mittelstand zögert bei KI – weil oft am falschen Ende angesetzt wird',
    excerpt: 'Aktuelle Studien zeigen: Die KI-Investitionen im deutschen Mittelstand sind zuletzt leicht gesunken. Wer einfach nur KI-Tools in sein Netzwerk holt, verbrennt Zeit und Geld.',
    content: `
<p><strong>Ausgangslage:</strong><br>Aktuelle Studien zeigen: Die KI-Investitionen im deutschen Mittelstand sind zuletzt leicht gesunken. Der Grund? Erste Pilotprojekte brachten oft nicht den erhofften Effizienz-Boost. Wer einfach nur KI-Tools in sein Netzwerk holt und auf wundersame Produktivität hofft, verbrennt Zeit und Geld. Die Realität in Handwerk und Fertigung ist eindeutig: Fachkräfte fehlen nicht in theoretischen Strategie-Meetings, sondern draußen beim Kunden, weil sie im Büro Lieferscheine abtippen und händisch Daten ins System übertragen müssen.</p>

<p><strong>Maßnahme:</strong><br>Statt abstrakter "digitaler Transformation" rücken jetzt europäische, hochspezialisierte KI-Lösungen in den Fokus. Mit dem Inkrafttreten des EU AI Acts setzen immer mehr Betriebe auf lokale Anbieter und DSGVO-konforme Agenten-Systeme (statt auf US- oder asiatische Giganten). Diese übernehmen exakt die zeitraubenden Büro-Routinen – sicher, transparent und nach unseren europäischen Standards.</p>

<p><strong>Ergebnis:</strong><br>Die Lösung ist pragmatisch: Identifizieren Sie den größten administrativen Zeitfresser im Büro und automatisieren Sie diesen gezielt. Wenn der Meister oder Bauleiter wieder beim Kunden vor Ort ist, anstatt abends noch E-Mails zu sortieren und Angebote zusammenzukopieren, hat sich die KI rentiert. Alles andere lenkt nur vom Kerngeschäft ab.</p>

<p><strong>Quick-Wins für den Einstieg:</strong></p>
<ul>
  <li><strong>Rechnungseingang automatisieren:</strong> Europäische OCR-Tools lesen Belege datenschutzkonform aus und übergeben sie ans Buchhaltungssystem.</li>
  <li><strong>E-Mail-Postfach entlasten:</strong> Kundenanfragen werden intelligent nach Relevanz sortiert und mit Textbausteinen vorbereitet.</li>
  <li><strong>Lokale KI-Modelle nutzen:</strong> Europäische Open-Source-Modelle stellen sicher, dass sensible Kundendaten das Unternehmen niemals verlassen.</li>
</ul>
`,
    category: 'Praxisbeispiele',
    author: 'Steffen Hefter',
    date: '2026-04-08',
    status: 'published',
    image: '',
    readTime: 3
  },

  {
    id: 6,
    slug: 'agentic-ai-im-handwerk-wenn-die-ki-zum-digitalen-kollegen-wird',
    title: 'Agentic AI im Handwerk: Wenn die KI zum digitalen Kollegen wird',
    excerpt: 'Die Leute fehlen auf der Baustelle, sitzen stattdessen aber im Büro und tippen stundenlang Daten aus Lieferanten-E-Mails ab. Agentic AI macht ab sofort die Drecksarbeit.',
    content: `
<p><strong>Ausgangslage:</strong><br>Die Leute fehlen auf der Baustelle, sitzen stattdessen aber im Büro und tippen stundenlang Daten aus Lieferanten-E-Mails ab. Zettelwirtschaft und alte Software rauben den letzten Nerv, während draußen der Kunde wartet. Die Arbeit stapelt sich, für theoretischen Bullshit fehlt schlichtweg die Zeit.</p>

<p><strong>Maßnahme:</strong><br>Schluss mit Berater-Gerede über "Digitalisierungsansätze". Agentic AI (handelnde KI) macht ab sofort die Drecksarbeit im Büro. Das sind keine kleinen Chatbots, die nur Standardtexte spucken, sondern echte digitale Kollegen, die direkt ins ERP-System greifen. Sie sortieren Kunden-Anfragen vor, bereiten Lieferanten-Mails auf und legen dir die fertigen Angebote auf den Schreibtisch – komplett eigenständig.</p>

<p><strong>Ergebnis:</strong><br>Weniger Papierkram, mehr Umsatz. Die Fachkräfte machen endlich wieder das, wofür sie da sind: echtes Handwerk beim Kunden. Die KI arbeitet als verlässlicher Motor im Hintergrund, tippt keine Zahlendreher mehr ab und reduziert die administrative Durchlaufzeit drastisch.</p>

<p><strong>Quick-Wins für den Einstieg:</strong></p>
<ul>
  <li><strong>Erstkontakt auf Autopilot:</strong> Ein intelligenter Website-Bot klärt Standardfragen und bucht Termine, bevor das Telefon überhaupt das erste Mal klingelt.</li>
  <li><strong>Kamera statt Klemmbrett:</strong> KI-Bilderkennung für rasante Bestandsaufnahmen auf der Baustelle oder im Lager.</li>
  <li><strong>Mails direkt ins ERP:</strong> Rechnungen und Lieferantendaten werden automatisch ausgelesen und direkt in die Kalkulation gepumpt – ohne manuelles Abtippen.</li>
</ul>
`,
    category: 'Praxisbeispiele',
    author: 'Steffen Hefter',
    date: '2026-04-07',
    status: 'published',
    image: '',
    readTime: 3
  },

  {
    id: 5,
    slug: 'von-der-spielerei-zum-werkzeug-wie-ki-2026-das-handwerk-und-den-mittelstand-automatisiert',
    title: 'Von der Spielerei zum Werkzeug: Wie KI 2026 das Handwerk und den Mittelstand automatisiert',
    excerpt: 'Viele Handwerks- und mittelständische Betriebe kämpfen mit überbordender Bürokratie. Statt isolierter KI-Chatbots implementieren Betriebe nun intelligente Agenten, die mehrschrittige Prozesse übernehmen.',
    content: `
<p><strong>Ausgangslage:</strong><br>Viele Handwerks- und mittelständische Betriebe kämpfen mit überbordender Bürokratie, Fachkräftemangel und ineffizienten Routineaufgaben. Rechnungsverarbeitung, Terminplanung und Angebotserstellung fressen wertvolle Zeit, die beim Kunden oder auf der Baustelle fehlt. KI war bisher oft nur ein Buzzword oder ein isoliertes Pilotprojekt ohne direkten Bezug zur täglichen Wertschöpfung.</p>
<p><strong>Maßnahme:</strong><br>Der Fokus verlagert sich 2026 auf "Agentische KI" und die nahtlose Integration in bestehende ERP- und Branchensoftware. Statt isolierter KI-Chatbots implementieren Betriebe nun intelligente Agenten, die mehrschrittige Prozesse übernehmen: Sie lesen E-Mails aus, sortieren Dokumente, generieren daraufhin automatisch Entwürfe für Angebote im ERP-System und planen Wartungstermine vor. Alles nach klaren internen Nutzungsrichtlinien, um Datenschutz und Sicherheit zu gewährleisten.</p>
<p><strong>Ergebnis:</strong><br>Echter Praxisnutzen statt KI-Hype: Die Durchlaufzeiten für Angebote sinken rapide, die Fehlerquote bei der Dateneingabe minimiert sich und die Mitarbeiter im Backoffice werden massiv entlastet. Das Unternehmen arbeitet effizienter, schneller und kann sich wieder auf das Kerngeschäft und die Kundenzufriedenheit konzentrieren.</p>
<p><strong>Quick-Wins:</strong><br>
- <strong>Automatisierte E-Mail-Sortierung & Beantwortung:</strong> KI filtert Standardanfragen und erstellt sofort passende Antwortentwürfe.<br>
- <strong>Intelligente Dokumentenverarbeitung:</strong> Eingangsrechnungen werden per KI ausgelesen und direkt ins Buchhaltungssystem übertragen.<br>
- <strong>Sprache-zu-Text auf der Baustelle:</strong> Handwerker diktieren das Aufmaß oder Projektnotizen vor Ort, die KI wandelt es sofort in strukturierte Aufgaben im System um.</p>
`,
    category: 'Praxisbeispiele',
    author: 'Steffen Hefter',
    date: '2026-04-06',
    status: 'published',
    image: '',
    readTime: 3
  },

  {
    id: 4,
    slug: 'weniger-papierkram-mehr-umsatz-ki-gestuetzte-e-mail-filter-im-handwerk',
    title: 'Weniger Papierkram, mehr Umsatz: KI-gestützte E-Mail-Filter im Handwerk',
    excerpt: 'Handwerksbetriebe ertrinken oft in allgemeinen Kundenanfragen. Eine pragmatische KI-Lösung sichtet den Posteingang, bewertet Anfragen nach Vollständigkeit und ordnet sie direkt zu.',
    content: `
<p><strong>Ausgangslage:</strong><br>Handwerksbetriebe ertrinken oft in allgemeinen Kundenanfragen ("Was kostet ein neues Bad?"). Es kostet wertvolle Stunden im Büro, diese manuell auszusortieren und echte Aufträge von vagen Preisanfragen zu trennen.</p>
<p><strong>Maßnahme:</strong><br>Eine pragmatische KI-Lösung sichtet den Posteingang, bewertet Anfragen nach Vollständigkeit (Sind Fotos oder Maße vorhanden?) und ordnet sie direkt dem richtigen Mitarbeiter zu. Fehlen wichtige Daten, schickt die KI automatisch eine höfliche Nachfrage-E-Mail.</p>
<p><strong>Ergebnis:</strong><br>Das Team im Büro spart bis zu 40 % Bearbeitungszeit. Echte, lukrative Kunden werden schneller bedient, während unvollständige Anfragen vollautomatisiert vorqualifiziert werden.</p>
<p><strong>Quick-Win:</strong><br>Starten Sie klein: Nutzen Sie Automatisierungs-Tools wie Zapier, um Ihre Info-Adresse an eine KI anzubinden. Lassen Sie sich jeden Morgen eine priorisierte Zusammenfassung der wichtigsten E-Mails generieren. Das dauert in der Einrichtung keine 30 Minuten und zeigt sofort erste Erfolge.</p>
`,
    category: 'Praxisbeispiele',
    author: 'Steffen Hefter',
    date: '2026-04-03',
    status: 'published',
    image: '',
    readTime: 3
  },

  {
    id: 1,
    slug: 'ki-im-handwerk-erste-schritte',
    title: 'KI im Handwerk: So starten Sie ohne IT-Kenntnisse',
    excerpt: 'ChatGPT, Angebote schreiben, Kundenkommunikation – wie Handwerksbetriebe mit wenig Aufwand echte Zeitersparnisse erzielen. Ein praktischer Einstieg.',
    content: `
<p>Viele Handwerksbetriebe denken bei „Künstlicher Intelligenz" an Science-Fiction oder an etwas, das nur für Großkonzerne mit IT-Abteilung relevant ist. Das Gegenteil ist wahr: Gerade kleine Betriebe können von KI-Tools schnell und ohne technisches Vorwissen profitieren.</p>

<h2>Wo KI im Handwerk sofort hilft</h2>
<p>Die drei häufigsten Zeitfresser in Handwerksbetrieben sind Angebote schreiben, Kundenkommunikation und die Dokumentation. Genau hier setzen KI-Tools an:</p>
<ul>
  <li><strong>Angebote vorformulieren:</strong> Mit ChatGPT beschreiben Sie kurz die Leistung – der Text ist in Sekunden fertig, Sie passen nur noch Zahlen und Details an.</li>
  <li><strong>E-Mail-Antworten:</strong> Standardanfragen, Terminbestätigungen, Reklamationen – KI entwirft den Text, Sie schicken ihn ab.</li>
  <li><strong>Stundenzettel und Berichte:</strong> Diktieren Sie Ihrem Smartphone kurz den Tagesbericht, KI macht daraus ein formatiertes Dokument.</li>
</ul>

<h2>Der richtige Einstieg: ChatGPT</h2>
<p>Der einfachste Einstieg ist <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer">ChatGPT</a> (kostenlos, auf Deutsch nutzbar). Kein Download, kein IT-Setup – einfach im Browser öffnen und loslegen.</p>
<p><strong>Praktischer Test für morgen früh:</strong> Öffnen Sie ChatGPT und schreiben Sie: „Formuliere ein freundliches Angebot für [Ihre Leistung] an einen Privatkunden in [Ihrer Stadt]. Der Preis beträgt [Betrag]."</p>

<h2>Was Sie nicht an KI übergeben sollten</h2>
<p>KI ersetzt keine Fachkenntnis und keine persönliche Kundenbeziehung. Prüfen Sie immer, was KI produziert – vor allem bei Preisangaben, rechtlichen Hinweisen oder technischen Details.</p>

<h2>Nächster Schritt: Förderung nutzen</h2>
<p>Wissen Sie, dass der Staat bis zu 50 % Ihrer Digitalisierungskosten erstatten kann? Programme wie <strong>go-digital</strong> und <strong>Digital Jetzt</strong> sind speziell für KMU und Handwerk gemacht. In einem kostenlosen Beratungsgespräch klären wir gemeinsam, was für Ihren Betrieb passt.</p>
    `.trim(),
    category: 'KI-Grundlagen',
    author: 'Steffen Hefter',
    date: '2026-03-15',
    status: 'published',
    image: null,
    readTime: 4,
  },
  {
    id: 2,
    slug: 'foerdermittel-ki-kmu-2026',
    title: 'Fördermittel für KI: Was KMU 2026 beantragen können',
    excerpt: 'go-digital, Digital Jetzt, BAFA – welche Programme existieren, wie hoch die Förderung ist und was viele KMU dabei falsch machen.',
    content: `
<p>Der Staat fördert die Digitalisierung von kleinen und mittleren Unternehmen mit erheblichen Mitteln – und dennoch schöpfen die meisten KMU diese Möglichkeiten kaum aus. Ein Überblick über die wichtigsten Programme 2026.</p>

<h2>go-digital: Bis zu 16.500 € Förderung</h2>
<p>Das Förderprogramm <strong>go-digital</strong> des Bundeswirtschaftsministeriums bezuschusst KMU-Beratungsleistungen zu Digitalisierung, IT-Sicherheit und digitalem Marketing mit bis zu 50 % – maximal 16.500 €.</p>
<ul>
  <li>Wer kann beantragen: KMU bis 100 Mitarbeiter, unter 20 Mio. € Jahresumsatz</li>
  <li>Was wird gefördert: Beratung zu Digitalisierung, KI-Einführung, IT-Sicherheit</li>
  <li>Wie: Über einen autorisierten go-digital-Berater (kein Eigenantrag)</li>
</ul>

<h2>Digital Jetzt: Bis zu 50.000 € für Investitionen</h2>
<p><strong>Digital Jetzt</strong> fördert konkrete Investitionen in digitale Technologien und Qualifizierungen mit 40–60 % – maximal 50.000 €.</p>
<ul>
  <li>KI-Software, Automatisierungstools, Cloud-Systeme</li>
  <li>Mitarbeiterschulungen zu digitalen Themen</li>
  <li>Geeignet für Betriebe mit 3–499 Mitarbeitern</li>
</ul>

<h2>BAFA-Unternehmensberatung: Bis zu 3.200 € pro Jahr</h2>
<p>Das BAFA-Programm fördert Beratungsleistungen für KMU mit bis zu 80 % – maximal 3.200 € pro Jahr. Für eine KI-Strategie-Beratung ist das ideal.</p>

<h2>Der häufigste Fehler</h2>
<p>Viele Unternehmer beantragen Förderung <em>nach</em> dem Kauf – dann ist es zu spät. Die Bewilligung muss <strong>vor Beginn der Maßnahme</strong> erfolgen. Planen Sie deshalb rechtzeitig.</p>

<h2>Wie ich Ihnen helfen kann</h2>
<p>In einem kostenlosen 30-Minuten-Gespräch prüfe ich mit Ihnen, welche Programme für Ihren Betrieb passen und wie der Antrag funktioniert. Kein Bürokratiewissen erforderlich – das ist mein Job.</p>
    `.trim(),
    category: 'Förderung',
    author: 'Steffen Hefter',
    date: '2026-03-22',
    status: 'published',
    image: null,
    readTime: 5,
  },
  {
    id: 3,
    slug: 'chatgpt-im-buero-5-konkrete-anwendungen',
    title: 'ChatGPT im Büro: 5 konkrete Anwendungen für KMU',
    excerpt: 'Von der Angebotserstellung bis zum Kundenbrief – fünf Wege, wie KMU ChatGPT heute schon produktiv einsetzen, mit Beispiel-Prompts zum Sofort-Ausprobieren.',
    content: `
<p>ChatGPT ist in aller Munde – aber was bringt es konkret, wenn Sie ein Unternehmen mit 5 bis 50 Mitarbeitern führen? Hier sind fünf Anwendungen, die Ihnen sofort Zeit sparen.</p>

<h2>1. Angebote und Auftragsbestätigungen</h2>
<p>Beschreiben Sie die Leistung auf Deutsch – ChatGPT formuliert das professionelle Anschreiben. Sie prüfen und versenden.</p>
<p><strong>Beispiel-Prompt:</strong> „Schreibe eine freundliche Auftragsbestätigung für eine Dachsanierung bei Familie Müller in Halle. Leistungsumfang: 120 m² Dachziegel tauschen. Termin: 15. Mai 2026. Preis: 14.800 € inkl. MwSt."</p>

<h2>2. Reklamationen sachlich beantworten</h2>
<p>Kundenbeschwerden kosten Nerven. Geben Sie ChatGPT die Kernfakten – und Sie bekommen eine sachliche, freundliche Antwort, die die Kundenbindung erhält.</p>

<h2>3. Stellenausschreibungen schreiben</h2>
<p>Bewerber suchen klare, ansprechende Ausschreibungen. KI erstellt in einer Minute eine, die zu Ihrem Betrieb passt – und die Sie noch auf Ihren Ton anpassen können.</p>

<h2>4. Protokolle und Berichte aus Stichwörtern</h2>
<p>Notieren Sie nach dem Kundengespräch fünf Stichworte – ChatGPT macht daraus ein strukturiertes Gesprächsprotokoll oder einen Bericht.</p>

<h2>5. FAQs und Website-Texte</h2>
<p>Schreiben fällt vielen schwer. Beschreiben Sie, was Sie anbieten und für wen – KI liefert den Entwurf. Sie müssen nur noch Ihren persönlichen Ton einarbeiten.</p>

<h2>Wichtig: Ergebnisse immer prüfen</h2>
<p>KI produziert manchmal plausibel klingende Fehler. Lesen Sie generierte Texte immer durch, bevor Sie sie versenden – besonders bei Preisen, rechtlichen Hinweisen und technischen Angaben.</p>
    `.trim(),
    category: 'Tools & Tipps',
    author: 'Steffen Hefter',
    date: '2026-04-01',
    status: 'published',
    image: null,
    readTime: 5,
  },
]

// Hilfsfunktionen
export function getPublishedPosts() {
  return blogPosts
    .filter((p) => p.status === 'published')
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug && p.status === 'published') || null
}

export function getAllSlugs() {
  return blogPosts.filter((p) => p.status === 'published').map((p) => p.slug)
}

export const CATEGORIES = ['Alle', 'KI-Grundlagen', 'Förderung', 'Praxisbeispiele', 'Tools & Tipps', 'Rechtliches']

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

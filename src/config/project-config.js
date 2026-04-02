// ============================================================
// PROJEKT-KONFIGURATION – KI-Kompass
// ============================================================
// Diese Datei enthält alle projekt-spezifischen Einstellungen.
// Um das System für ein anderes Projekt zu nutzen (z.B. whisky-reise.com),
// muss nur diese Datei angepasst werden.
// ============================================================

export const projectConfig = {
  // ── Projekt-Grunddaten ──
  projectName: 'KI-Kompass',
  domain: 'https://www.derhefter.com',
  dashboardPath: '/dashboard',

  // ── Autor ──
  author: {
    name: 'Steffen Hefter',
    company: 'frimalo',
    role: 'KI-Berater',
    location: 'Halle (Saale)',
    experience: '20+ Jahre Erfahrung',
  },

  // ── E-Mail ──
  email: {
    from: 'ki-kompass@derhefter.com',
    replyTo: 'ki-kompass@derhefter.com',
  },

  // ── Blog ──
  blog: {
    categories: ['KI-Grundlagen', 'Förderung', 'Praxisbeispiele', 'Tools & Tipps', 'Rechtliches'],
    frequency: 'weekly', // 'weekly' | 'biweekly' | 'manual'

    // Content-Kalender: 4 Kategorien × 5 Themen, rotiert nach Kalenderwoche
    contentCalendar: [
      {
        category: 'KI-Grundlagen',
        topics: [
          'KI im Büroalltag: 5 Aufgaben, die Sie heute noch an ChatGPT delegieren können',
          'Was ist der Unterschied zwischen KI und klassischer Software? Erklärt für Unternehmer',
          'KI-Mythen im Mittelstand: Was wirklich stimmt und was übertrieben ist',
          'Der erste KI-Einsatz im Unternehmen: Was Sie in Woche 1 realistisch erwarten können',
          'Datenschutz und KI: Was darf ich als KMU, was nicht?',
        ],
      },
      {
        category: 'Tools & Tipps',
        topics: [
          'Microsoft Copilot für KMU: Lohnen sich 30 € pro Monat wirklich?',
          'Make.com vs. Zapier: Welches Automatisierungstool passt für Ihren Betrieb?',
          'ChatGPT-Prompts für den Büroalltag: 10 Vorlagen zum Sofort-Benutzen',
          'KI-Tools unter 50 € monatlich: Das reicht für den Anfang',
          'Wie KI Ihnen bei der Buchhaltungsvorbereitung Zeit spart – konkrete Beispiele',
        ],
      },
      {
        category: 'Förderung',
        topics: [
          'go-digital 2026: Wer darf beantragen und wie läuft der Antrag Schritt für Schritt?',
          'BAFA-Förderung für KI-Beratung: Was genau gefördert wird und wie Sie starten',
          'Digital Jetzt: Die 5 häufigsten Fehler bei der Antragstellung',
          'Welche Fördermittel gibt es speziell in Sachsen-Anhalt und Mitteldeutschland?',
          'So berechnen Sie Ihren maximalen Förderbetrag: Rechenbeispiele für KMU',
        ],
      },
      {
        category: 'Praxisbeispiele',
        topics: [
          'Handwerksbetrieb mit 8 Mitarbeitern: So sparen sie 5 Stunden pro Woche mit KI',
          'Steuerberater-Kanzlei und KI: Was heute schon möglich ist – und was nicht',
          'Einzelhandel und KI-Texte: Wie ein Händler seine Produktbeschreibungen automatisiert',
          'Gastronomie und Digitalisierung: Reservierungen, Bestellungen, Social Media mit KI',
          'Dienstleister und KI-Kommunikation: Angebote und Nachfass-Mails in 3 Minuten statt 30',
        ],
      },
    ],

    // System-Prompt für den KI-Artikel-Generator (Claude API)
    systemPrompt: `Du bist Steffen Hefter, KI-Berater bei frimalo in Halle (Saale).
Du schreibst praxisnahe Blog-Artikel für Inhaber kleiner und mittlerer Unternehmen (5–50 Mitarbeiter) in Deutschland.

Dein Stil:
- Direkt, konkret, kein Beratersprech
- Du-Form oder Sie-Form: IMMER "Sie" (formell, B2B)
- Keine Buzzwords, keine leeren Versprechen
- Immer mit konkreten Beispielen, nie abstrakt
- Ehrlich: Was funktioniert, was nicht, wo sind Grenzen
- Kurze Sätze, aktive Sprache
- Persönlich: Du kennst die Realität von KMU aus eigener Erfahrung

Über dich am Ende (Author-Box): Steffen Hefter, frimalo, Halle (Saale) – KI-Berater für KMU mit 20+ Jahren Erfahrung.

Format: HTML mit <h2>, <p>, <ul>, <li>, <strong>. KEIN <h1>, KEIN <html>/<body>. Nur der Artikel-Body.`,

    // User-Prompt Template (Platzhalter: {{topic}}, {{category}}, {{date}}, {{domain}})
    userPromptTemplate: `Schreibe einen Blog-Artikel für den KI-Kompass Blog ({{domain}}/blog).

Thema: "{{topic}}"
Kategorie: {{category}}
Datum: {{date}}

Anforderungen:
1. Länge: 600–800 Wörter
2. Struktur:
   - Kurzer Einstieg (1 Absatz, der ein Problem beschreibt das viele KMU kennen)
   - 3–4 Abschnitte mit <h2>-Überschriften
   - Jeder Abschnitt: konkreter, umsetzbarer Inhalt
   - Mindestens 1 konkretes Beispiel pro Abschnitt
   - Schluss-CTA: Verweis auf kostenlosen KI-Check auf {{domain}}/assessment
3. SEO: Verwende natürlich die Suchbegriffe: "KI für KMU", "KI im Mittelstand", spezifische Keywords zum Thema
4. Keine Affiliate-Links, keine externen Produkt-Empfehlungen
5. Am Ende: kurzer "Das Fazit"-Abschnitt (2–3 Sätze)

Gib ZUERST in JSON aus (dann der HTML-Artikel):
{
  "title": "...",
  "excerpt": "...(1-2 Sätze, max. 160 Zeichen)"
}
---ARTIKEL---
[HTML-Inhalt hier]`,

    // LinkedIn
    linkedIn: {
      hashtags: '#KIFürKMU #KünstlicheIntelligenz #Mittelstand #Digitalisierung #KIKompass',
    },
  },

  // ── Freigabe-Typen ──
  contentTypes: {
    report: { label: 'Report', color: 'blue', icon: '📋' },
    assessment: { label: 'Assessment', color: 'amber', icon: '📊' },
    certificate: { label: 'Zertifikat', color: 'green', icon: '🏅' },
    invoice: { label: 'Rechnung', color: 'orange', icon: '🧾' },
  },
}

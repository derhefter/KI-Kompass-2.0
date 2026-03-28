// ============================================================
// TESTIMONIALS - ANLEITUNG ZUM ANPASSEN
// ============================================================
//
// Dieses File enthält alle Testimonials der Website.
// Du kannst Testimonials einfach hinzufügen, ändern oder löschen.
//
// VARIANTE A: Mini-Case (Ausgangslage → Maßnahme → Ergebnis)
//   - type: 'case'
//   - Felder: branche, region, ausgangslage, massnahme, ergebnis
//
// VARIANTE B: Zitat mit Kennzahlen
//   - type: 'quote'
//   - Felder: zitat, name, rolle, unternehmen, region, mitarbeiter, kennzahlen[]
//
// SO FÜGST DU EIN NEUES TESTIMONIAL HINZU:
// 1. Kopiere einen der bestehenden Einträge unten
// 2. Ändere die Texte auf deine echten Kundendaten
// 3. Speichere die Datei
// 4. Die Website aktualisiert sich automatisch (nach Deploy)
//
// TIPPS:
// - Halte Zitate kurz (2-3 Sätze)
// - Verwende echte Kennzahlen (Stunden gespart, % Verbesserung, € Förderung)
// - Nenne Branche + Region für Identifikation der Zielgruppe
// - Keine übertriebenen Versprechen
// ============================================================

export const testimonials = [
  // --- VARIANTE A: Mini-Cases ---
  {
    id: 1,
    type: 'case',
    branche: 'Handwerksbetrieb',
    region: 'Sachsen-Anhalt',
    ausgangslage: '15 Mitarbeitende, alle Prozesse auf Papier, kein \u00dcberblick \u00fcber Auftragslage.',
    massnahme: 'Nach dem KI-Readiness Check wurden 3 Quick-Wins umgesetzt: digitale Auftragserfassung, automatisierte Angebotserstellung, KI-Chatbot f\u00fcr FAQ.',
    ergebnis: '8 Stunden/Woche eingespart bei der Angebotserstellung. F\u00f6rdermittel \u00fcber go-digital genutzt (50% der Kosten).',
  },
  {
    id: 2,
    type: 'case',
    branche: 'Dienstleister',
    region: 'Th\u00fcringen',
    ausgangslage: '45 Mitarbeitende, CRM vorhanden aber schlecht gepflegt, keine KI-Strategie.',
    massnahme: 'Premium Report + Erstberatung. Roadmap mit 5 priorisierten Use-Cases erhalten. F\u00f6rdermittel beantragt.',
    ergebnis: 'Pilotprojekt (KI-gest\u00fctzte Kundensegmentierung) innerhalb von 6 Wochen live. 12% mehr qualifizierte Leads.',
  },

  // --- VARIANTE B: Zitat + Kennzahlen ---
  {
    id: 3,
    type: 'quote',
    zitat: 'Der KI-Kompass hat uns gezeigt, dass wir gar nicht so weit weg sind. Die Roadmap war konkret und umsetzbar \u2013 kein Buzzword-Bingo.',
    name: 'Thomas K.',
    rolle: 'Gesch\u00e4ftsf\u00fchrer',
    unternehmen: 'Metallverarbeitung',
    region: 'Halle (Saale)',
    mitarbeiter: 35,
    kennzahlen: [
      { label: 'Readiness', wert: '38% \u2192 67%', detail: 'nach 3 Monaten' },
      { label: 'F\u00f6rderung', wert: '\u20ac12.000', detail: '\u00fcber go-digital' },
    ],
  },
  {
    id: 4,
    type: 'quote',
    zitat: 'Wir dachten, KI ist nur was f\u00fcr gro\u00dfe Konzerne. Die Erstberatung hat uns die Augen ge\u00f6ffnet \u2013 und die F\u00f6rdermittel kannten wir vorher gar nicht.',
    name: 'Sandra M.',
    rolle: 'Bereichsleiterin Verwaltung',
    unternehmen: 'Pflegedienst',
    region: 'Leipzig',
    mitarbeiter: 80,
    kennzahlen: [
      { label: 'Quick-Win', wert: 'Automatisierte Dienstplanung', detail: '' },
      { label: 'Ersparnis', wert: '5 Stunden/Woche', detail: '' },
    ],
  },
]

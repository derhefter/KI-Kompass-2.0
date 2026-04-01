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

  // --- ECHTES PROJEKT: PFX / Ufuk Genc ---
  {
    id: 5,
    type: 'case',
    branche: 'Film- & Postproduktion (VFX)',
    region: 'Berlin',
    ausgangslage: 'Internationales Postproduktions-Studio mit komplexen VFX-Workflows. Fehlende Standardisierung, ineffiziente Ressourcenplanung und hoher manueller Koordinationsaufwand zwischen Teams.',
    massnahme: 'Digitale Transformation mit dem Produktionstool FREISPACE: Standardisierte Workflows, automatisierte Ressourcenplanung, Change-Management-Begleitung \u00fcber 4 Quartale mit klarer Roadmap.',
    ergebnis: 'Strukturierte Produktionsprozesse, messbare KPI-Steuerung und nachhaltige Verankerung der neuen Arbeitsweisen im gesamten Team.',
  },
  {
    id: 6,
    type: 'quote',
    zitat: 'Steffen hat nicht nur die Technik verstanden, sondern vor allem unser Team mitgenommen. Die Transformation war kein IT-Projekt \u2013 es war ein echter Change-Prozess.',
    name: 'PFX / Ufuk Genc',
    rolle: 'Postproduktion & VFX',
    unternehmen: 'Film- & Medienbranche',
    region: 'Berlin',
    mitarbeiter: null,
    kennzahlen: [
      { label: 'Projekt', wert: 'Digitale Transformation', detail: 'mit FREISPACE' },
      { label: 'Dauer', wert: '4 Quartale', detail: 'strukturierte Roadmap' },
      { label: 'Fokus', wert: 'Change Management', detail: 'Prozesse & Team' },
    ],
  },
]

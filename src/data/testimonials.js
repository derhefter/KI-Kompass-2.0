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

  // --- HIER NEUE ECHTE TESTIMONIALS EINFÜGEN ---
  // Einfach einen der obigen Einträge kopieren, ID hochzählen (7, 8, 9, ...)
  // und in Testimonials.js die ID-Liste [5, 6] entsprechend erweitern.
]

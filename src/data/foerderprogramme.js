// ============================================================
// FÖRDERPROGRAMME-DATENBANK - KI-Kompass V2
// ============================================================
// Umfassende Datenbank deutscher Förderprogramme für KI/Digitalisierung
// ============================================================

export const foerderprogrammeDB = [
  {
    id: 'go-digital',
    name: 'go-digital',
    traeger: 'BMWK (Bundesministerium für Wirtschaft und Klimaschutz)',
    bundesland: 'alle',
    branchen: ['alle'],
    minMitarbeiter: 1,
    maxMitarbeiter: 100,
    maxFoerderung: 16500,
    foerderquote: '50%',
    vorhaben: ['beratung', 'digitalisierung', 'sicherheit'],
    beschreibung: 'Fördert Beratungsleistungen für KMU in den Bereichen Digitalisierte Geschäftsprozesse, Digitale Markterschließung und IT-Sicherheit. Zuschuss bis zu 50% der Beratungskosten.',
    link: 'https://www.bmwk.de/go-digital',
    status: 'aktiv',
  },
  {
    id: 'digital-jetzt',
    name: 'Digital Jetzt',
    traeger: 'BMWK',
    bundesland: 'alle',
    branchen: ['alle'],
    minMitarbeiter: 3,
    maxMitarbeiter: 499,
    maxFoerderung: 50000,
    foerderquote: '40-60%',
    vorhaben: ['tools', 'schulungen', 'digitalisierung'],
    beschreibung: 'Investitionszuschuss für KMU zur Digitalisierung: Hardware, Software, KI-Tools und Mitarbeiterschulungen. Je nach Unternehmensgröße 40-60% Förderquote.',
    link: 'https://www.bmwk.de/digital-jetzt',
    status: 'aktiv',
  },
  {
    id: 'bafa-beratung',
    name: 'BAFA Unternehmensberatung',
    traeger: 'BAFA (Bundesamt für Wirtschaft und Ausfuhrkontrolle)',
    bundesland: 'alle',
    branchen: ['alle'],
    minMitarbeiter: 1,
    maxMitarbeiter: 250,
    maxFoerderung: 3200,
    foerderquote: '50-80%',
    vorhaben: ['beratung'],
    beschreibung: 'Fördert betriebswirtschaftliche Beratungen für KMU und Freiberufler. Neue Bundesländer: 80% Zuschuss (max. 3.200€), alte Bundesländer: 50% (max. 2.000€).',
    link: 'https://www.bafa.de/unternehmensberatung',
    status: 'aktiv',
  },
  {
    id: 'kfw-digital',
    name: 'KfW Digitalisierungskredit (ERP)',
    traeger: 'KfW Bankengruppe',
    bundesland: 'alle',
    branchen: ['alle'],
    minMitarbeiter: 1,
    maxMitarbeiter: 500,
    maxFoerderung: 25000000,
    foerderquote: 'Zinsvergünstigung',
    vorhaben: ['tools', 'digitalisierung'],
    beschreibung: 'Zinsgünstiger Kredit für Digitalisierungsvorhaben: IT-Infrastruktur, Software, KI-Implementierung. Bis zu 25 Mio. € pro Vorhaben mit attraktiven Konditionen.',
    link: 'https://www.kfw.de/digitalisierung',
    status: 'aktiv',
  },
  {
    id: 'ego-konzept-sa',
    name: 'ego.-KONZEPT',
    traeger: 'Investitionsbank Sachsen-Anhalt',
    bundesland: 'sachsen-anhalt',
    branchen: ['alle'],
    minMitarbeiter: 1,
    maxMitarbeiter: 250,
    maxFoerderung: 10000,
    foerderquote: '70%',
    vorhaben: ['beratung', 'digitalisierung'],
    beschreibung: 'Unterstützt Existenzgründer und KMU in Sachsen-Anhalt bei der Konzeptentwicklung und Beratung. Bis zu 70% Zuschuss für externe Beratungsleistungen.',
    link: 'https://www.ib-sachsen-anhalt.de/ego-konzept',
    status: 'aktiv',
  },
  {
    id: 'sa-digital',
    name: 'Sachsen-Anhalt DIGITAL',
    traeger: 'Land Sachsen-Anhalt',
    bundesland: 'sachsen-anhalt',
    branchen: ['alle'],
    minMitarbeiter: 1,
    maxMitarbeiter: 250,
    maxFoerderung: 15000,
    foerderquote: '50%',
    vorhaben: ['tools', 'digitalisierung', 'beratung'],
    beschreibung: 'Landesförderprogramm für die Digitalisierung von KMU in Sachsen-Anhalt. Fördert digitale Geschäftsmodelle, IT-Sicherheit und KI-Einführung.',
    link: 'https://www.sachsen-anhalt.de/digital',
    status: 'aktiv',
  },
  {
    id: 'thueringen-digital',
    name: 'Thüringen DIGITAL',
    traeger: 'Thüringer Aufbaubank',
    bundesland: 'thueringen',
    branchen: ['alle'],
    minMitarbeiter: 1,
    maxMitarbeiter: 250,
    maxFoerderung: 15000,
    foerderquote: '50%',
    vorhaben: ['tools', 'digitalisierung', 'beratung'],
    beschreibung: 'Förderprogramm des Freistaats Thüringen für die Digitalisierung mittelständischer Unternehmen. Schwerpunkte: Prozessdigitalisierung und KI.',
    link: 'https://www.aufbaubank.de/digital',
    status: 'aktiv',
  },
  {
    id: 'bayern-digitalbonus',
    name: 'Digitalbonus Bayern',
    traeger: 'Freistaat Bayern',
    bundesland: 'bayern',
    branchen: ['alle'],
    minMitarbeiter: 1,
    maxMitarbeiter: 250,
    maxFoerderung: 50000,
    foerderquote: '50%',
    vorhaben: ['tools', 'digitalisierung', 'sicherheit'],
    beschreibung: 'Bayerisches Förderprogramm für Digitalisierung und IT-Sicherheit. Standard: bis 10.000€, Plus: bis 50.000€ für umfassendere Vorhaben.',
    link: 'https://www.digitalbonus.bayern',
    status: 'aktiv',
  },
  {
    id: 'nrw-digital',
    name: 'Mittelstand Innovativ & Digital (MID)',
    traeger: 'Land NRW',
    bundesland: 'nordrhein-westfalen',
    branchen: ['alle'],
    minMitarbeiter: 1,
    maxMitarbeiter: 250,
    maxFoerderung: 15000,
    foerderquote: '50%',
    vorhaben: ['beratung', 'digitalisierung'],
    beschreibung: 'NRW-Förderprogramm für KMU zur Digitalisierung und Innovation. Digitalisierungsberatung und Umsetzungsbegleitung.',
    link: 'https://www.mittelstand-innovativ-digital.nrw',
    status: 'aktiv',
  },
  {
    id: 'sachsen-digital',
    name: 'Sachsen Digital',
    traeger: 'Sächsische Aufbaubank (SAB)',
    bundesland: 'sachsen',
    branchen: ['alle'],
    minMitarbeiter: 1,
    maxMitarbeiter: 250,
    maxFoerderung: 20000,
    foerderquote: '50%',
    vorhaben: ['tools', 'digitalisierung', 'beratung'],
    beschreibung: 'Förderprogramm des Freistaats Sachsen für die Digitalisierung. Unterstützt Hardware, Software, Beratung und Qualifizierung.',
    link: 'https://www.sab.sachsen.de/digital',
    status: 'aktiv',
  },
  {
    id: 'esf-plus',
    name: 'ESF Plus Programm',
    traeger: 'Europäischer Sozialfonds',
    bundesland: 'alle',
    branchen: ['alle'],
    minMitarbeiter: 1,
    maxMitarbeiter: 499,
    maxFoerderung: 30000,
    foerderquote: '50-80%',
    vorhaben: ['schulungen'],
    beschreibung: 'EU-Fördermittel für Weiterbildung und Qualifizierung. Fördert KI-Schulungen, Digitalkompetenz-Trainings und Transformationsbegleitung.',
    link: 'https://www.esf.de/esf-plus',
    status: 'aktiv',
  },
  {
    id: 'zim',
    name: 'ZIM (Zentrales Innovationsprogramm Mittelstand)',
    traeger: 'BMWK',
    bundesland: 'alle',
    branchen: ['alle'],
    minMitarbeiter: 1,
    maxMitarbeiter: 499,
    maxFoerderung: 380000,
    foerderquote: '25-45%',
    vorhaben: ['tools', 'digitalisierung'],
    beschreibung: 'Fördert innovative Forschungs- und Entwicklungsprojekte in KMU. Auch KI-Entwicklungsprojekte und innovative Digitalvorhaben förderfähig.',
    link: 'https://www.zim.de',
    status: 'aktiv',
  },
]

export function matchFoerderprogramme({ bundesland, branche, mitarbeiter, vorhaben }) {
  return foerderprogrammeDB
    .filter((fp) => fp.status === 'aktiv')
    .map((fp) => {
      let matchScore = 0
      let matchReasons = []

      // Bundesland
      if (fp.bundesland === 'alle' || fp.bundesland === bundesland) {
        matchScore += 3
        matchReasons.push('Passendes Bundesland')
      } else {
        return null // Bundesland passt nicht
      }

      // Branche
      if (fp.branchen.includes('alle') || fp.branchen.includes(branche)) {
        matchScore += 2
        matchReasons.push('Passende Branche')
      }

      // Mitarbeiterzahl
      if (mitarbeiter >= fp.minMitarbeiter && mitarbeiter <= fp.maxMitarbeiter) {
        matchScore += 3
        matchReasons.push('Passende Unternehmensgröße')
      } else {
        return null // Größe passt nicht
      }

      // Vorhaben
      if (vorhaben && fp.vorhaben.some((v) => vorhaben.includes(v))) {
        matchScore += 2
        matchReasons.push('Passendes Vorhaben')
      }

      return { ...fp, matchScore, matchReasons }
    })
    .filter(Boolean)
    .sort((a, b) => b.matchScore - a.matchScore)
}

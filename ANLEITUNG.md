# ANLEITUNG - KI-Kompass V2 Produktverwaltung

## Inhaltsverzeichnis

1. [Produktuebersicht und Post-Purchase-Flows](#1-produktuebersicht)
2. [Auslieferungsseiten (Zugangsseiten)](#2-auslieferungsseiten)
3. [KI-Zertifikat: Badge und Zertifikat anpassen](#3-ki-zertifikat)
4. [Online-Kurs: Module bearbeiten](#4-online-kurs)
5. [KI-Toolbox: Ressourcen aktualisieren](#5-ki-toolbox)
6. [E-Mail-Templates anpassen](#6-e-mail-templates)
7. [Erfolgsseite anpassen](#7-erfolgsseite)
8. [Google Sheets Struktur](#8-google-sheets)
9. [Technische Hinweise](#9-technische-hinweise)

---

## 1. Produktuebersicht

### Was passiert nach der Zahlung?

Jedes Produkt hat einen **vollstaendig getrennten Workflow**: eigene E-Mail, eigene Zugangsseite, eigene Google-Sheet-Tabs.

| Produkt | Plan-ID | Preis | Zugangsseite | Nach Zahlung passiert... |
|---------|---------|-------|--------------|--------------------------|
| **Premium Report** | `premium` | 197 EUR | `/premium` | Zugangscode per E-Mail -> Assessment -> PDF-Report |
| **Strategie-Paket** | `strategie` | 497 EUR | `/premium` | Zugangscode -> Assessment -> Report + Strategiegespraech |
| **Basic Badge** | `zertifikat-basic` | 47 EUR | `/premium` | Zugangscode -> Assessment -> Badge per E-Mail |
| **Premium Zertifikat** | `zertifikat` | 97 EUR | `/premium` | Zugangscode -> Assessment -> A4-Zertifikat per E-Mail |
| **Online-Kurs** | `kurs` | 297 EUR | `/kurs-zugang` | Zugangscode -> Assessment -> 7 Kursmodule freigeschaltet |
| **Branchen-Benchmark** | `benchmark` | 297 EUR | `/benchmark-zugang` | Zugangscode -> Assessment -> Benchmark Report mit Branchenvergleich |
| **Toolbox Starter** | `toolbox-starter` | 29 EUR/Mo | `/toolbox-zugang` | Zugangscode -> Assessment -> Toolbox-Ressourcen freigeschaltet |
| **Toolbox Pro** | `toolbox-pro` | 49 EUR/Mo | `/toolbox-zugang` | Zugangscode -> Assessment -> Alle Ressourcen + Pro-Features |
| **Monitoring Basic** | `monitoring-basic` | 49 EUR/Mo | `/monitoring-zugang` | Zugangscode -> Assessment -> Monitoring Dashboard + Quartals-Re-Assessment |
| **Monitoring Pro** | `monitoring-pro` | 99 EUR/Mo | `/monitoring-zugang` | Wie Basic + News-Digest + Priority Support |

### Kompletter Ablauf (Beispiel: Kurs)

```
1. Kunde klickt "Kaufen" auf /kurs
2. Mollie-Checkout wird erstellt (/api/create-checkout)
3. Kunde bezahlt
4. Mollie ruft Webhook auf (/api/mollie-webhook)
5. Webhook erzeugt Zugangscode (z.B. KURS-A1B2C3...)
6. Zugangscode wird in Google Sheet "Zugangscodes" gespeichert
7. E-Mail mit produktspezifischem Link wird versendet:
   -> https://ki-kompass-v2-seven.vercel.app/kurs-zugang?code=KURS-A1B2C3...
8. Kunde klickt Link -> Zugangsseite prueft Code
9. Nur Codes mit plan="kurs" werden akzeptiert
10. Assessment wird durchgefuehrt (30 Fragen)
11. Ergebnisse werden in "Ergebnisse-Kurs" Tab gespeichert
12. Detailantworten in "Einzelantworten-Kurs" Tab gespeichert
```

### Wo liegen die Dateien?

```
src/
  lib/
    certificate.js          <- Zertifikat + Badge Generator
    email-templates.js      <- Produktspezifische E-Mail-Templates
    google-sheets.js        <- Google Sheets Integration (produktspezifische Tabs)
    mollie.js               <- Mollie Payment Client
    mail.js                 <- E-Mail-Versand (SMTP)
    pdf-report.js           <- Premium Report Generator
    follow-up.js            <- Follow-Up Automatisierung
    rate-limit.js           <- API Rate Limiting
  app/
    api/
      create-checkout/      <- Mollie-Zahlung erstellen
      mollie-webhook/       <- Nach Zahlung: Zugangscode + E-Mails versenden
      verify-access/        <- Zugangscode pruefen
      send-results/         <- Assessment-Ergebnisse speichern (produktspezifisch)
      generate-certificate/ <- Zertifikat/Badge generieren
      generate-report/      <- Premium Report generieren
      invoice-request/      <- Rechnungsanforderung
      benchmark-data/       <- Benchmark-Branchendaten
      admin/                <- Admin-Dashboard API
    premium/                <- Zugangsseite: Premium, Strategie, Zertifikat
    kurs-zugang/            <- Zugangsseite: Online-Kurs (NEU)
    toolbox-zugang/         <- Zugangsseite: Toolbox Starter/Pro (NEU)
    benchmark-zugang/       <- Zugangsseite: Branchen-Benchmark (NEU)
    monitoring-zugang/      <- Zugangsseite: Monitoring Basic/Pro (NEU)
    zahlung-erfolgreich/    <- Erfolgsseite nach Zahlung
    anfrage/                <- Bestellformular
    admin/                  <- Admin-Dashboard
    dashboard/              <- Kunden-Dashboard
  data/
    questions.js            <- Assessment-Fragen + Bewertungslogik
    kurs/                   <- 7 Modul-Templates (HTML)
    toolbox/                <- 5 Ressourcen-Templates (HTML)
```

---

## 2. Auslieferungsseiten

### Uebersicht der Zugangsseiten

Jedes Produkt hat eine **eigene, unabhaengige Zugangsseite**. Alle Seiten sind separat anpassbar.

| Seite | URL | Datei | Akzeptierte Plans | Farbschema |
|-------|-----|-------|-------------------|------------|
| Premium/Strategie/Zertifikat | `/premium` | `src/app/premium/page.js` | `premium`, `strategie`, `zertifikat`, `zertifikat-basic` | Blau (#1e3a5c) |
| **Kurs** | `/kurs-zugang` | `src/app/kurs-zugang/page.js` | `kurs` | Blau (#1e3a8a / #2563eb) |
| **Toolbox** | `/toolbox-zugang` | `src/app/toolbox-zugang/page.js` | `toolbox-starter`, `toolbox-pro` | Gruen (#059669 / #10b981) |
| **Benchmark** | `/benchmark-zugang` | `src/app/benchmark-zugang/page.js` | `benchmark` | Orange/Amber (#d97706 / #f59e0b) |
| **Monitoring** | `/monitoring-zugang` | `src/app/monitoring-zugang/page.js` | `monitoring-basic`, `monitoring-pro` | Lila (#7c3aed / #8b5cf6) |

### Wie die Zugangsseiten funktionieren

Alle Zugangsseiten haben den gleichen Grundaufbau:

1. **Code-Eingabe:** Kunde gibt Zugangscode ein (oder kommt per Link mit `?code=...`)
2. **Validierung:** Code wird gegen `/api/verify-access` geprueft
3. **Plan-Check:** Nur passende Plans werden akzeptiert (z.B. `/kurs-zugang` akzeptiert nur `kurs`)
4. **Intro-Screen:** Firmenname, Name und E-Mail werden abgefragt
5. **Assessment:** 30 Fragen werden durchgefuehrt (gleicher Fragenkatalog fuer alle)
6. **Ergebnis-Seite:** Produktspezifische Ergebnisanzeige

### Produktspezifische Ergebnis-Sektionen

| Seite | Besondere Ergebnis-Sektionen |
|-------|------|
| **Kurs** | "Ihre Kursmodule" - 7 Modul-Karten mit Beschreibung und Dauer |
| **Toolbox** | "Ihre Toolbox-Ressourcen" - 5 Ressourcen-Karten, Pro-exklusive Ressourcen (Videos, Branchen-Vorlagen, Compliance, Priority Support) |
| **Benchmark** | "Branchenvergleich" - Vergleichstabelle mit Bereich / Ihr Score / Branchendurchschnitt / Differenz |
| **Monitoring** | "Monitoring Dashboard" - Timeline mit Assessment-Historie, Plan-Features (Basic vs Pro) |

### Zugangsseite anpassen

Jede Seite ist eine eigenstaendige `page.js` Datei. Sie koennen unabhaengig voneinander geaendert werden.

**Titel aendern:**
Suchen Sie nach dem Haupttitel im JSX (z.B. `"KI-Monitoring"` oder `"Branchen-Benchmark Report"`)

**Farben aendern:**
Suchen Sie nach den Hex-Codes (z.B. `#7c3aed` fuer Lila bei Monitoring) und ersetzen Sie sie.

**Ergebnis-Sektionen aendern:**
Suchen Sie nach dem produktspezifischen Block (z.B. `"Ihre Kursmodule"` oder `"Monitoring Dashboard"`) und passen Sie den HTML/JSX-Code an.

**Neue Ergebnis-Sektion hinzufuegen:**
Kopieren Sie einen bestehenden Block (z.B. die Quick-Wins-Sektion) und aendern Sie Titel und Inhalt.

---

## 3. KI-Zertifikat

### Dateien

- `src/lib/certificate.js` - Beide Templates (Badge + Zertifikat)
- `src/app/api/generate-certificate/route.js` - API die entscheidet welches Template

### Wie unterscheidet das System Basic von Premium?

Das System schaut auf den `plan`-Wert des Kunden im Zugangscode:
- `zertifikat-basic` -> `generateBadgeHTML()` wird aufgerufen (kompaktes Badge)
- `zertifikat` -> `generateCertificateHTML()` wird aufgerufen (A4 Querformat)

### Basic Badge anpassen

Oeffnen Sie `src/lib/certificate.js` und suchen Sie nach `generateBadgeHTML`.

**Farben aendern:** Die `levelColors` am Anfang der Funktion bestimmen die Farben pro Level:
- Level 1 (rot): `#ef4444`
- Level 2 (gelb): `#f59e0b`
- Level 3 (blau): `#3b82f6`
- Level 4 (gruen): `#22c55e`

**Text aendern:** Suchen Sie nach den HTML-Elementen im Template-String:
- Badge-Titel: `<h1>KI-Readiness</h1>`
- Untertitel: `Zertifiziert durch KI-Kompass`
- Markenname im Footer: `frimalo`

**Website-Einbettung:** Im Badge-HTML ist ein HTML-Kommentar mit Embed-Code enthalten.
Der Kunde kann:
1. Die HTML-Datei im Browser oeffnen
2. Einen Screenshot machen (als PNG speichern)
3. Das PNG auf seiner Website einbetten
4. Den Verifizierungslink nutzen

### Premium Zertifikat anpassen

Suchen Sie nach `generateCertificateHTML` in derselben Datei.

- **Layout:** A4 Querformat mit Doppelrahmen
- **Kategorien:** Die Score-Aufschluesselung zeigt alle Einzelkategorien
- **Unterschrift:** "Steffen Hefter, KI-Berater | frimalo"
- **Drucken:** Kunde oeffnet HTML -> Strg+P -> "Als PDF speichern" (Querformat)

---

## 4. Online-Kurs

### Dateien

```
src/data/kurs/
  index.js                           <- Modul-Metadaten
  modul-01-ki-verstehen.html         <- Modul 1 (45 Min.)
  modul-02-strategie-vision.html     <- Modul 2 (60 Min.)
  modul-03-daten-infrastruktur.html  <- Modul 3 (45 Min.)
  modul-04-prozesse-automatisierung.html <- Modul 4 (60 Min.)
  modul-05-ki-tools-praxis.html      <- Modul 5 (90 Min.)
  modul-06-governance-compliance.html <- Modul 6 (45 Min.)
  modul-07-roadmap-erstellen.html    <- Modul 7 (60 Min.)
```

### So fuegen Sie Inhalte hinzu

1. Oeffnen Sie die gewuenschte Modul-Datei in einem Texteditor (z.B. VS Code, Notepad++)
2. Suchen Sie nach `[ECKIGE KLAMMERN]` - das sind die Platzhalter
3. Ersetzen Sie jeden Platzhalter durch Ihren eigenen Inhalt
4. Speichern Sie die Datei

### Platzhalter-Uebersicht

| Platzhalter | Wo | Was eintragen |
|-------------|-----|---------------|
| `[HIER EINLEITUNGSTEXT EINFUEGEN]` | Einleitung | 2-3 Saetze die das Modul einfuehren |
| `[LERNZIEL 1]` etc. | Lernziele | Was der Teilnehmer nach dem Modul kann |
| `[VIDEO-LINK HIER]` | Video-Sektion | YouTube/Vimeo Embed-Code oder Link |
| `[HIER INHALT EINFUEGEN]` | Inhalte | Der eigentliche Kurstext |
| `[AUFGABENSTELLUNG]` | Uebungen | Praktische Aufgaben zum Mitmachen |
| `[FRAGE]` / `[ANTWORT]` | Quiz | Wissensfragen mit Antworten |
| `[TAKEAWAY 1]` etc. | Zusammenfassung | Die wichtigsten Erkenntnisse |

### Videos einbetten

Ersetzen Sie den Video-Platzhalter durch einen Embed-Code:

```html
<!-- YouTube -->
<iframe width="100%" height="400" src="https://www.youtube.com/embed/VIDEO_ID"
  frameborder="0" allowfullscreen></iframe>

<!-- Vimeo -->
<iframe width="100%" height="400" src="https://player.vimeo.com/video/VIDEO_ID"
  frameborder="0" allowfullscreen></iframe>
```

### Modul im Browser testen

Doppelklicken Sie die HTML-Datei - sie oeffnet sich direkt im Browser. So koennen Sie Ihre Inhalte vor dem Versand pruefen.

### Modul als PDF speichern

1. HTML-Datei im Browser oeffnen
2. Strg+P (Drucken)
3. "Als PDF speichern" waehlen
4. Speichern

---

## 5. KI-Toolbox

### Dateien

```
src/data/toolbox/
  index.js                       <- Ressourcen-Metadaten
  prompt-templates.html          <- 20+ Prompt-Vorlagen (4 Kategorien)
  ki-policy-vorlage.html         <- DSGVO-konforme KI-Richtlinie
  dsfa-template.html             <- Datenschutz-Folgeabschaetzung
  ki-anbieter-vergleich.html     <- 17+ KI-Tools im Vergleich
  checkliste-ki-einfuehrung.html <- 24-Punkte Checkliste (3 Phasen)
```

### Prompt-Templates bearbeiten

Datei: `prompt-templates.html`

- **Neuen Prompt hinzufuegen:** Kopieren Sie einen bestehenden `.prompt-card` Block und passen Sie Titel, Beschreibung und Prompt-Text an
- **Kategorie hinzufuegen:** Kopieren Sie eine bestehende `<h2>`-Sektion mit Prompt-Cards
- **Variable im Prompt:** Verwenden Sie `[VARIABLE]` im Prompt-Text (wird rot dargestellt)

Beispiel fuer einen neuen Prompt:
```html
<div class="prompt-card">
  <h3>Titel des Prompts</h3>
  <p>Kurze Beschreibung wann man diesen Prompt nutzt.</p>
  <div class="prompt-text">Der eigentliche Prompt-Text. Ersetzen Sie [VARIABLE] durch Ihre Werte.</div>
</div>
```

### KI-Policy Vorlage bearbeiten

Datei: `ki-policy-vorlage.html`

Suchen und ersetzen Sie:
- `[FIRMENNAME]` -> Ihr Firmenname (oder den des Kunden)
- `[DATUM]` -> Aktuelles Datum
- `[KI-BEAUFTRAGTER]` -> Name des KI-Verantwortlichen
- `[GESCHAEFTSFUEHRER]` -> Name der Geschaeftsfuehrung

Die Vorlage enthaelt bereits:
- 3 vorausgefuellte erlaubte KI-Tools (ChatGPT, Copilot, DeepL)
- 8 verbotene Nutzungen
- Datenschutz-Klassifizierungstabelle
- Verantwortlichkeiten-Matrix

### KI-Anbieter-Vergleich aktualisieren

Datei: `ki-anbieter-vergleich.html`

17 Tools sind vorausgefuellt. So fuegen Sie neue Tools hinzu:

1. Suchen Sie die passende Kategorie-Tabelle
2. Fuegen Sie eine neue `<tr>` Zeile hinzu:

```html
<tr>
  <td><strong>Tool-Name</strong></td>
  <td>Kurze Beschreibung</td>
  <td>XX EUR/Monat</td>
  <td><span style="...">Ja/Nein</span></td>
  <td><span style="...">Ja/Teilweise/Nein</span></td>
  <td>&#9733;&#9733;&#9733;&#9733;&#9734;</td>
</tr>
```

### Checkliste anpassen

Datei: `checkliste-ki-einfuehrung.html`

24 Aufgaben in 3 Phasen. Aendern, loeschen oder hinzufuegen:

```html
<tr>
  <td style="...">&#9744;</td>
  <td>Aufgabenbeschreibung</td>
  <td><span class="placeholder">[Verantwortlich]</span></td>
</tr>
```

- `&#9744;` = Leeres Kaestchen (zum Drucken und Abhaken)
- `&#9745;` = Angehaktes Kaestchen (falls bereits erledigt)

---

## 6. E-Mail-Templates

### Datei

`src/lib/email-templates.js`

### Aufbau

Die zentrale Funktion `getCustomerEmailForPlan()` waehlt je nach `plan` das richtige Template:

| Funktion | Fuer welche Produkte | Zugangscode-Link |
|----------|---------------------|-------------------|
| `getPremiumEmail()` | Premium Report | -> `/premium?code=...` |
| `getStrategieEmail()` | Strategie-Paket | -> `/premium?code=...` |
| `getZertifikatEmail()` | Basic Badge + Premium Zertifikat | -> `/premium?code=...` |
| `getKursEmail()` | Online-Kurs | -> `/kurs-zugang?code=...` |
| `getToolboxEmail()` | Toolbox Starter + Pro | -> `/toolbox-zugang?code=...` |
| `getBenchmarkEmail()` | Branchen-Benchmark | -> `/benchmark-zugang?code=...` |
| `getMonitoringEmail()` | Monitoring Basic + Pro | -> `/monitoring-zugang?code=...` |

### Produktspezifische Button-Texte in E-Mails

Jede E-Mail hat einen eigenen Call-to-Action-Button:

| Produkt | Button-Text |
|---------|-------------|
| Premium | "Jetzt Premium Assessment starten" |
| Strategie | "Jetzt Strategie-Assessment starten" |
| Zertifikat | "Jetzt Zertifikat-Assessment starten" |
| Kurs | "Jetzt Kursbereich oeffnen" |
| Toolbox | "Jetzt Toolbox-Bereich oeffnen" |
| Benchmark | "Jetzt Benchmark-Assessment starten" |
| Monitoring | "Jetzt Monitoring starten" |

### E-Mail-Texte aendern

1. Oeffnen Sie `src/lib/email-templates.js`
2. Suchen Sie die Funktion fuer das gewuenschte Produkt (z.B. `getKursEmail`)
3. Aendern Sie den HTML-Text in der `bodyHtml`-Property
4. **Wichtig:** HTML-Entities fuer Umlaute verwenden:
   - ae = `&auml;`
   - oe = `&ouml;`
   - ue = `&uuml;`
   - ss = `&szlig;`

### Wo wird die E-Mail versendet?

Die E-Mail wird im Mollie-Webhook (`src/app/api/mollie-webhook/route.js`) versendet.
Der Webhook ruft `getCustomerEmailForPlan()` auf und sendet die E-Mail automatisch.

### Wie wird der Zugangscode-Link in der E-Mail erzeugt?

Im Webhook (`mollie-webhook/route.js`) bestimmt die Funktion `getAccessPath()` die Zielseite:

```
kurs             -> /kurs-zugang
toolbox-starter  -> /toolbox-zugang
toolbox-pro      -> /toolbox-zugang
benchmark        -> /benchmark-zugang
monitoring-basic -> /monitoring-zugang
monitoring-pro   -> /monitoring-zugang
alle anderen     -> /premium
```

Der vollstaendige Link wird dann: `https://ki-kompass-v2-seven.vercel.app[pfad]?code=[zugangscode]`

---

## 7. Erfolgsseite

### Datei

`src/app/zahlung-erfolgreich/page.js`

### Was zeigt die Seite?

Nach erfolgreicher Zahlung wird der Kunde auf diese Seite weitergeleitet.
Die Seite liest den `plan`-Parameter aus der URL und zeigt produktspezifische "Naechste Schritte" an.

### Texte aendern

Suchen Sie das `planContent`-Objekt am Anfang der Datei. Jeder Plan hat:
- `title` - Produktname auf der Seite
- `emailHint` - Hinweis zur E-Mail
- `steps` - Array mit 4 Schritten die dem Kunden angezeigt werden

---

## 8. Google Sheets

### Drei Google Sheets

Das System nutzt drei separate Google Sheets:

| Umgebungsvariable | Zweck | Sheet-ID |
|-------------------|-------|----------|
| `GOOGLE_SHEET_CUSTOMERS` | Kundendaten + Zugangscodes | `1rfSCkgZAP1EJ6CRZA7XWFaY-J4WINchmYZ3o2T6PDNg` |
| `GOOGLE_SHEET_PREMIUM_RESULTS` | Assessment-Ergebnisse (Premium + alle Produkte) | `10Wp4zEwoH4dJd0uELBLCycskFBsfbgSEQXfFbLFBeZg` |
| `GOOGLE_SHEET_FREE_RESULTS` | Ergebnisse der kostenlosen Erstumfrage | `199DZchOP1cDVXyoNqEVTZ43mKjWm-frji5-eHHvYcRQ` |

### Service Account

Alle drei Sheets muessen fuer den Service Account freigegeben sein:
```
derhefter-com@gen-lang-client-0458111277.iam.gserviceaccount.com
```

**Wichtig:** Beim Freigeben "Bearbeiter"-Rechte vergeben (nicht nur "Betrachter").

### Tabs im CUSTOMERS Sheet

| Tab-Name | Inhalt |
|----------|--------|
| `Zugangscodes` | Alle generierten Zugangscodes mit Plan, Name, E-Mail, Ablaufdatum |
| `Kunden` | Kundenstammdaten |
| `FollowUps` | Follow-Up-Automatisierung |

### Tabs im PREMIUM_RESULTS Sheet (produktspezifisch)

Jedes Produkt speichert seine Assessment-Ergebnisse in **eigenen Tabs**:

| Tab-Name | Inhalt |
|----------|--------|
| `Ergebnisse` | Premium/Strategie/Zertifikat Assessment-Ergebnisse |
| `Einzelantworten` | Premium/Strategie/Zertifikat Detailantworten |
| `Ergebnisse-Kurs` | Kurs Assessment-Ergebnisse |
| `Einzelantworten-Kurs` | Kurs Detailantworten |
| `Ergebnisse-Toolbox` | Toolbox Assessment-Ergebnisse |
| `Einzelantworten-Toolbox` | Toolbox Detailantworten |
| `Ergebnisse-Benchmark` | Benchmark Assessment-Ergebnisse |
| `Einzelantworten-Benchmark` | Benchmark Detailantworten |
| `Ergebnisse-Monitoring` | Monitoring Assessment-Ergebnisse |
| `Einzelantworten-Monitoring` | Monitoring Detailantworten |

### Tabs im FREE_RESULTS Sheet

| Tab-Name | Inhalt |
|----------|--------|
| `Ergebnisse` | Ergebnisse der kostenlosen Erstumfrage |

### Wie die Tab-Zuordnung funktioniert

In `src/lib/google-sheets.js` bestimmen zwei Funktionen den Tab-Namen:

- `getResultsTabName(productType)` -> z.B. `"Ergebnisse-Kurs"`
- `getAnswersTabName(productType)` -> z.B. `"Einzelantworten-Kurs"`

Der `productType` wird von der Zugangsseite beim Absenden der Ergebnisse mitgegeben:
- `/kurs-zugang` sendet `productType: 'kurs'`
- `/toolbox-zugang` sendet `productType: 'toolbox'`
- `/benchmark-zugang` sendet `productType: 'benchmark'`
- `/monitoring-zugang` sendet `productType: 'monitoring'`
- `/premium` sendet keinen productType (Standard-Tabs `Ergebnisse` / `Einzelantworten`)

### Neuen Tab hinzufuegen

Wenn Sie ein neues Produkt hinzufuegen moechten:

1. Erstellen Sie die Tabs im Google Sheet (z.B. `Ergebnisse-NeuProdukt` und `Einzelantworten-NeuProdukt`)
2. Fuegen Sie den case in `getResultsTabName()` und `getAnswersTabName()` in `google-sheets.js` hinzu
3. Erstellen Sie die Zugangsseite (siehe Abschnitt 2)

---

## 9. Technische Hinweise

### Nach jeder Aenderung

1. **Build testen:** `npm run build` im Projektverzeichnis ausfuehren
2. **Auf GitHub pushen:** `git add . && git commit -m "Inhalte aktualisiert" && git push`
3. **Vercel deployt automatisch** nach dem Push

### HTML-Templates testen

Die HTML-Templates in `src/data/kurs/` und `src/data/toolbox/` sind eigenstaendige Dateien.
Sie koennen direkt im Browser geoeffnet werden (Doppelklick).

### Kursunterlagen an Kunden versenden

Mit der neuen `/kurs-zugang` Seite erhaelt der Kunde nach dem Assessment direkten Zugang zu den 7 Kursmodulen. Zusaetzlich:

1. Kunde kauft Online-Kurs und erhaelt E-Mail mit Zugangscode-Link
2. Kunde klickt auf Link -> `/kurs-zugang?code=...`
3. Nach dem Assessment werden die 7 Kursmodule angezeigt
4. Sie erhalten eine Benachrichtigung (Owner-E-Mail)
5. Optional: Sie senden die Modul-HTML-Dateien zusaetzlich per E-Mail

### Toolbox-Ressourcen an Kunden versenden

Aehnlich wie beim Kurs:

1. Kunde kauft Toolbox und erhaelt E-Mail mit Zugangscode-Link
2. Kunde klickt auf Link -> `/toolbox-zugang?code=...`
3. Nach dem Assessment werden die Toolbox-Ressourcen angezeigt (Starter vs Pro)
4. Optional: Sie senden die passenden HTML-Dateien per E-Mail
5. Bei monatlichen Updates: Neue/aktualisierte Dateien erneut senden

### Wichtige Umgebungsvariablen (Vercel)

| Variable | Beschreibung |
|----------|-------------|
| `MOLLIE_API_KEY` | Mollie API-Key (test_ oder live_) |
| `NEXT_PUBLIC_BASE_URL` | Basis-URL der Website |
| `EMAIL_USER` | Gmail-Adresse fuer SMTP |
| `EMAIL_PASS` | Gmail App-Passwort |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Google Sheets Service Account (JSON) |
| `GOOGLE_SHEET_CUSTOMERS` | Sheet-ID fuer Kundendaten + Zugangscodes |
| `GOOGLE_SHEET_PREMIUM_RESULTS` | Sheet-ID fuer Assessment-Ergebnisse (alle Produkte) |
| `GOOGLE_SHEET_FREE_RESULTS` | Sheet-ID fuer kostenlose Erstumfrage |

**Wichtig bei Vercel-Umgebungsvariablen:**
- Keine Leerzeichen oder Zeilenumbrueche am Ende der Werte!
- Nach Aenderung muessen Sie neu deployen (Push oder manuell in Vercel)

### Fehlerbehebung

| Problem | Loesung |
|---------|---------|
| Build-Fehler nach Aenderung | Syntaxfehler im Code pruefen, besonders Anfuehrungszeichen |
| E-Mail kommt nicht an | SMTP-Credentials in Vercel pruefen, Spam-Ordner pruefen |
| Zahlungsfehler | Mollie API-Key in Vercel pruefen (keine Leerzeichen/Newlines) |
| Badge/Zertifikat wird nicht generiert | Zugangscode muss gueltig sein und `plan` muss korrekt gesetzt sein |
| Erfolgsseite zeigt falsches Produkt | Plan-Parameter in der URL pruefen |
| "Ungueltiger Zugangscode" | Sheet-ID in Vercel pruefen, Tab "Zugangscodes" muss existieren |
| "Dieser Zugangscode ist fuer ein anderes Produkt" | Kunde nutzt falschen Link - Code passt nicht zur Zugangsseite |
| Google Sheet "Caller does not have permission" | Sheet fuer Service Account freigeben (s. Abschnitt 8) |
| Ergebnisse werden nicht gespeichert | Produktspezifischen Tab im Sheet pruefen (z.B. "Ergebnisse-Kurs") |
| Vercel Env-Variable hat Newline | Variable loeschen und neu setzen (ohne Zeilenumbruch am Ende) |

### Produktspezifische URLs (Produktion)

| Seite | URL |
|-------|-----|
| Startseite | https://ki-kompass-v2-seven.vercel.app |
| Premium Assessment | https://ki-kompass-v2-seven.vercel.app/premium |
| Kurs Zugang | https://ki-kompass-v2-seven.vercel.app/kurs-zugang |
| Toolbox Zugang | https://ki-kompass-v2-seven.vercel.app/toolbox-zugang |
| Benchmark Zugang | https://ki-kompass-v2-seven.vercel.app/benchmark-zugang |
| Monitoring Zugang | https://ki-kompass-v2-seven.vercel.app/monitoring-zugang |
| Zahlung erfolgreich | https://ki-kompass-v2-seven.vercel.app/zahlung-erfolgreich |
| Admin Dashboard | https://ki-kompass-v2-seven.vercel.app/admin |

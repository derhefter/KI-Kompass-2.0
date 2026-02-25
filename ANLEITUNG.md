# ANLEITUNG - KI-Kompass V2 Produktverwaltung

## Inhaltsverzeichnis

1. [Produktuebersicht und Post-Purchase-Flows](#1-produktuebersicht)
2. [KI-Zertifikat: Badge und Zertifikat anpassen](#2-ki-zertifikat)
3. [Online-Kurs: Module bearbeiten](#3-online-kurs)
4. [KI-Toolbox: Ressourcen aktualisieren](#4-ki-toolbox)
5. [E-Mail-Templates anpassen](#5-e-mail-templates)
6. [Erfolgsseite anpassen](#6-erfolgsseite)
7. [Technische Hinweise](#7-technische-hinweise)

---

## 1. Produktuebersicht

### Was passiert nach der Zahlung?

| Produkt | Plan-ID | Preis | Nach Zahlung passiert... |
|---------|---------|-------|--------------------------|
| **Premium Report** | `premium` | 197 EUR | Zugangscode per E-Mail -> Assessment (30+ Fragen) -> PDF-Report per E-Mail |
| **Strategie-Paket** | `strategie` | 497 EUR | Zugangscode -> Assessment -> Report + Hinweis auf Strategiegespraech |
| **Basic Badge** | `zertifikat-basic` | 47 EUR | Zugangscode -> Assessment -> Kompaktes Badge per E-Mail |
| **Premium Zertifikat** | `zertifikat` | 97 EUR | Zugangscode -> Assessment -> A4-Zertifikat per E-Mail |
| **Online-Kurs** | `kurs` | 297 EUR | Willkommens-E-Mail mit Moduluebersicht, Kursunterlagen per E-Mail |
| **Branchen-Benchmark** | `benchmark` | 297 EUR | Zugangscode -> Assessment -> Benchmark Report per E-Mail |
| **Toolbox Starter** | `toolbox-starter` | 29 EUR/Mo | Willkommens-E-Mail, Toolbox-Ressourcen per E-Mail |
| **Toolbox Pro** | `toolbox-pro` | 49 EUR/Mo | Willkommens-E-Mail, Alle Ressourcen + Priority Support |
| **Monitoring Basic** | `monitoring-basic` | 49 EUR/Mo | Zugangscode -> Assessment + Quartals-Re-Assessment |
| **Monitoring Pro** | `monitoring-pro` | 99 EUR/Mo | Wie Basic + News-Digest + Support |

### Wo liegen die Dateien?

```
src/
  lib/
    certificate.js          <- Zertifikat + Badge Generator
    email-templates.js      <- Produktspezifische E-Mail-Templates
    mollie.js               <- Mollie Payment Client
    mail.js                 <- E-Mail-Versand (SMTP)
    pdf-report.js           <- Premium Report Generator
  app/
    api/
      create-checkout/      <- Mollie-Zahlung erstellen
      mollie-webhook/       <- Nach Zahlung: E-Mails versenden
      generate-certificate/ <- Zertifikat/Badge generieren
      generate-report/      <- Premium Report generieren
      invoice-request/      <- Rechnungsanforderung
    zahlung-erfolgreich/    <- Erfolgsseite nach Zahlung
    anfrage/                <- Bestellformular
  data/
    kurs/                   <- 7 Modul-Templates (HTML)
    toolbox/                <- 5 Ressourcen-Templates (HTML)
```

---

## 2. KI-Zertifikat

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

## 3. Online-Kurs

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

## 4. KI-Toolbox

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

## 5. E-Mail-Templates

### Datei

`src/lib/email-templates.js`

### Aufbau

Die zentrale Funktion `getCustomerEmailForPlan()` waehlt je nach `plan` das richtige Template:

| Funktion | Fuer welche Produkte |
|----------|---------------------|
| `getPremiumEmail()` | Premium Report |
| `getStrategieEmail()` | Strategie-Paket |
| `getZertifikatEmail()` | Basic Badge + Premium Zertifikat |
| `getKursEmail()` | Online-Kurs |
| `getToolboxEmail()` | Toolbox Starter + Pro |
| `getMonitoringEmail()` | Monitoring Basic + Pro |
| `getBenchmarkEmail()` | Branchen-Benchmark |

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

---

## 6. Erfolgsseite

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

## 7. Technische Hinweise

### Nach jeder Aenderung

1. **Build testen:** `npm run build` im Projektverzeichnis ausfuehren
2. **Auf GitHub pushen:** `git add . && git commit -m "Inhalte aktualisiert" && git push`
3. **Vercel deployt automatisch** nach dem Push

### HTML-Templates testen

Die HTML-Templates in `src/data/kurs/` und `src/data/toolbox/` sind eigenstaendige Dateien.
Sie koennen direkt im Browser geoeffnet werden (Doppelklick).

### Kursunterlagen an Kunden versenden

Aktuell werden die Kursunterlagen **manuell per E-Mail** versendet:

1. Kunde kauft Online-Kurs und erhaelt Willkommens-E-Mail
2. Sie erhalten eine Benachrichtigung (Owner-E-Mail)
3. Sie senden die Modul-HTML-Dateien per E-Mail an den Kunden

### Toolbox-Ressourcen an Kunden versenden

Gleicher Prozess wie beim Kurs:

1. Kunde kauft Toolbox und erhaelt Willkommens-E-Mail
2. Sie senden die passenden HTML-Dateien per E-Mail
3. Bei monatlichen Updates: Neue/aktualisierte Dateien erneut senden

### Wichtige Umgebungsvariablen (Vercel)

| Variable | Beschreibung |
|----------|-------------|
| `MOLLIE_API_KEY` | Mollie API-Key (test_ oder live_) |
| `NEXT_PUBLIC_BASE_URL` | Basis-URL der Website |
| `EMAIL_USER` | Gmail-Adresse fuer SMTP |
| `EMAIL_PASS` | Gmail App-Passwort |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Google Sheets Service Account |

### Fehlerbehebung

| Problem | Loesung |
|---------|---------|
| Build-Fehler nach Aenderung | Syntaxfehler im Code pruefen, besonders Anfuehrungszeichen |
| E-Mail kommt nicht an | SMTP-Credentials in Vercel pruefen, Spam-Ordner pruefen |
| Zahlungsfehler | Mollie API-Key in Vercel pruefen (keine Leerzeichen/Newlines) |
| Badge/Zertifikat wird nicht generiert | Zugangscode muss gueltig sein und `plan` muss korrekt gesetzt sein |
| Erfolgsseite zeigt falsches Produkt | Plan-Parameter in der URL pruefen |

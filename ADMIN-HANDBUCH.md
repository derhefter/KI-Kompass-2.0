# KI-Kompass V2 – Admin-Handbuch & Audit-Report

**Stand:** April 2026 (Rev. 2026-04-26)
**Betreiber:** Steffen Hefter, frimalo
**Domain:** https://www.derhefter.com

> **Hinweis:** Dieses Handbuch ist die technische Referenz für Betreiber & Entwickler. Für die Alltagsbedienung siehe **`BEDIENUNGSANLEITUNG.md`** (kurz, ohne Tech-Tiefe).

---

## TEIL A: PROJEKT-ÜBERSICHT

### A1. Architektur & Tech-Stack

| Komponente            | Technologie                                      |
| --------------------- | ------------------------------------------------ |
| Framework             | Next.js 14.2 (App Router)                        |
| Frontend              | React 18.3 + Tailwind CSS 3.4                    |
| Hosting               | Vercel (Serverless)                              |
| Datenbank             | Google Sheets (4 Sheets, via Service Account)    |
| E-Mail                | SMTP via Nodemailer (aktuell: Strato `smtp.strato.de`)   |
| Zahlungen             | Mollie (Kreditkarte, SEPA, PayPal, Klarna, etc.) |
| KI-Artikelgenerierung | OpenAI GPT-4o-mini                               |
| Social Media          | LinkedIn API (OAuth2, 60-Tage-Token)             |
| Analytics             | Google Analytics (G-3SWDR65PPJ)                  |
| Domain                | derhefter.com (Vercel DNS)                       |
| Repository            | github.com/derhefter/KI-Kompass-2.0              |

### A2. Alle Seiten und Routen

#### Öffentliche Seiten

| Route                  | Zweck                                                                           |
| ---------------------- | ------------------------------------------------------------------------------- |
| `/`                    | Startseite mit komplettem Funnel (Hero, ForWho, HowItWorks, Pricing, FAQ, etc.) |
| `/assessment`          | Kostenloser 12-Fragen KI-Readiness-Check                                        |
| `/premium`             | Premium 35-Fragen Assessment (Zugangscode erforderlich)                         |
| `/anfrage`             | Kauf-/Rechnungsformular                                                         |
| `/beratung`            | Buchungsseite für kostenlose 30-Min. Erstberatung                               |
| `/blog`                | Blog-Übersicht mit Kategoriefilter                                              |
| `/blog/[slug]`         | Einzelner Blog-Artikel                                                          |
| `/foerder-kompass`     | Fördermittel-Finder                                                             |
| `/ueber-mich`          | Über Steffen Hefter                                                             |
| `/impressum`           | Impressum                                                                       |
| `/datenschutz`         | Datenschutzerklärung                                                            |
| `/zertifikat`          | Zertifikat-Ansicht                                                              |
| `/zahlung-erfolgreich` | Zahlungsbestätigung                                                             |

#### Admin-Bereich

| Route        | Zweck                                |
| ------------ | ------------------------------------ |
| `/dashboard` | Admin Dashboard (Login erforderlich) |

#### Redirects (alte Seiten → aktuelle)

| Alt                                  | Neu           |
| ------------------------------------ | ------------- |
| `/toolbox`, `/toolbox-zugang`        | `/#preise`    |
| `/kurs`, `/kurs-zugang`              | `/beratung`   |
| `/monitoring`, `/monitoring-zugang`  | `/beratung`   |
| `/benchmarking`, `/benchmark-zugang` | `/assessment` |
| `/white-label`                       | `/`           |

> **⚠ KRITISCH — Konflikt zwischen Redirects und Zugangsseiten:**
> Im Code existieren echte Zugangsseiten (`src/app/kurs-zugang/page.js`, `toolbox-zugang/page.js`, `benchmark-zugang/page.js`, `monitoring-zugang/page.js`), die der **Mollie-Webhook** als Zugangslink generiert (`src/app/api/mollie-webhook/route.js:90-100`). Gleichzeitig leitet `next.config.js` diese Pfade **permanent (308)** auf andere Seiten um, sodass der Query-Parameter `?code=…` zwar erhalten bleibt, aber von der Ziel-Seite nicht ausgewertet wird → **Kunden verlieren ihren Zugangscode nach Bezahlung**.
>
> **Lösung (eines von beiden):**
> 1. Redirects in `next.config.js` für `/kurs-zugang`, `/toolbox-zugang`, `/benchmark-zugang`, `/monitoring-zugang` **entfernen** (die Originale `/kurs`, `/toolbox`, `/benchmarking`, `/monitoring` als Marketing-Redirects beibehalten), **oder**
> 2. den Mollie-Webhook auf neue Zielpfade umbiegen (z.B. `/premium?code=…&plan=kurs`) und die Zugang-Pages bewusst entfernen.
>
> Bis dahin: Bestellungen für `kurs`, `toolbox-*`, `benchmark`, `monitoring-*` **manuell** abwickeln.

### A3. Alle API-Endpunkte

#### Öffentliche APIs

| Endpunkt                    | Methode | Funktion                                              |
| --------------------------- | ------- | ----------------------------------------------------- |
| `/api/lead`                 | POST    | Free Assessment speichern + Follow-Up-Sequenz starten |
| `/api/verify-access`        | POST    | Zugangscode für Premium prüfen                        |
| `/api/send-results`         | POST    | Assessment-Ergebnisse per E-Mail senden               |
| `/api/generate-report`      | POST    | PDF-Report generieren                                 |
| `/api/generate-certificate` | POST    | Zertifikat-PDF erstellen                              |
| `/api/create-checkout`      | POST    | Mollie-Zahlung starten                                |
| `/api/mollie-webhook`       | POST    | Zahlungsrückmeldung von Mollie                        |
| `/api/purchase-request`     | POST    | Kaufanfrage verarbeiten                               |
| `/api/invoice-request`      | POST    | Rechnungsanfrage                                      |
| `/api/foerder-lead`         | POST    | Fördermittel-Lead erfassen                            |
| `/api/blog/posts`           | GET     | Veröffentlichte Blog-Artikel (mit Cache)              |
| `/api/blog/post/[slug]`     | GET     | Einzelner Artikel                                     |
| `/api/benchmark-data`       | GET     | Branchen-Benchmark-Daten                              |

#### Admin APIs (alle erfordern `x-admin-token` Header)

| Endpunkt                             | Methode         | Funktion                              |
| ------------------------------------ | --------------- | ------------------------------------- |
| `/api/admin/login`                   | POST            | Admin-Login → HMAC-Token (24h gültig); persistenter Brute-Force-Lock via Sheets-Tab `LoginAttempts` |
| `/api/admin/dashboard`               | GET             | KPIs und Übersicht                    |
| `/api/health`                        | GET             | Health-Check (Sheets / Mail / Mollie). Liefert 200 ok bzw. 503 bei Teilausfall. |
| `/api/admin/content-queue`           | GET/POST/DELETE | Freigabe-Queue verwalten              |
| `/api/admin/reports`                 | GET/POST        | Pending Reports verwalten             |
| `/api/admin/blog-posts`              | GET             | Veröffentlichte Artikel               |
| `/api/admin/blog-drafts`             | GET/PUT/DELETE  | KI-Entwürfe verwalten                 |
| `/api/admin/blog-publish`            | POST            | Artikel veröffentlichen (+ LinkedIn)  |
| `/api/admin/extend-code`             | POST            | Zugangscode verlängern                |
| `/api/admin/create-test-data`        | POST            | Testdaten erstellen                   |
| `/api/admin/linkedin-setup/callback` | GET             | LinkedIn OAuth Callback               |

#### Cron-Jobs (automatisch via Vercel)

| Endpunkt                     | Schedule          | Funktion                                      |
| ---------------------------- | ----------------- | --------------------------------------------- |
| `/api/process-followups`     | Täglich 08:00 UTC | Follow-Up-E-Mails versenden (Tag 1, 3, 7, 14) + wöchentlicher LinkedIn-Token-Check |
| `/api/cron/generate-article` | Montags 07:00 UTC | KI-Artikel generieren → Entwurf in Sheets     |
| `/api/cron/health-check`     | Täglich 06:00 UTC | Selbsttest Sheets/Mail/Mollie. **Owner-Mail nur bei Fehler** (kein Spam bei OK). |

### A4. Datenflüsse – Google Sheets

Es gibt **4 Google Sheets** als Datenbank:

#### Sheet 1: Free Assessment Results

**Env-Var:** `GOOGLE_SHEET_FREE_RESULTS`

| Tab             | Spalten                                                                           |
| --------------- | --------------------------------------------------------------------------------- |
| Ergebnisse      | Datum, Firma, E-Mail, Score, Level, Level-Titel                                   |
| Einzelantworten | Datum, Firma, Name, E-Mail, Check-Art, Frage-Nr, Kategorie, Frage, Antwort, Score |

#### Sheet 2: Premium Results

**Env-Var:** `GOOGLE_SHEET_PREMIUM_RESULTS`

| Tab             | Spalten                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------- |
| Ergebnisse      | Datum, Firma, Name, E-Mail, Plan, Prozent, Level, Titel, Kat1-6                                     |
| Einzelantworten | (wie oben)                                                                                          |
| Freigaben       | ID, Typ, Status, Name, E-Mail, Firma, Betreff, HTML, Metadata, Anhang, Notiz, Erstellt, Freigegeben |
| Berichte        | ID, Datum, Firma, Name, E-Mail, Score, Level, Titel, Status, Gesendet, Notiz, ResultsJSON           |

#### Sheet 3: Kundendaten

**Env-Var:** `GOOGLE_SHEET_CUSTOMERS`

| Tab           | Spalten                                                                    |
| ------------- | -------------------------------------------------------------------------- |
| Kunden        | Datum, Sortierung, Name, E-Mail, Firma, Telefon, Plan, Zahlungsart, Betrag |
| Zugangscodes  | Code, Name, E-Mail, Firma, Plan, Erstellt, Ablaufdatum, Status, PaymentId  |
| FollowUps     | E-Mail, Typ, Geplant, Fällig, Status, Gesendet, Firma, Name, Score, Level  |
| LoginAttempts | IP, Timestamp (ISO), Success (true/false), Reason. **Wird beim ersten Admin-Login automatisch angelegt** – nicht manuell anfassen. Dient als persistenter Brute-Force-Schutz (≥ 5 Fehlversuche pro IP/15 Min ⇒ Lock). Alte Einträge dürfen monatlich gelöscht werden. |

#### Sheet 4: Blog

**Env-Var:** `GOOGLE_SHEET_BLOG`

| Tab       | Spalten                                                                                                           |
| --------- | ----------------------------------------------------------------------------------------------------------------- |
| Artikel   | ID, Slug, Titel, Excerpt, Content, Kategorie, Datum, Lesezeit, LinkedIn-Posted, LinkedIn-PostID, Erstellt, Quelle |
| Entwuerfe | ID, Slug, Titel, Excerpt, Content, Kategorie, Topic, Generiert, Status, Notizen                                   |

**Wichtig:** Der Google Service Account muss als **Editor** in allen 4 Sheets eingeladen sein.

### A5. Automatisierte Prozesse

#### Follow-Up-E-Mail-Sequenz

- **Auslöser:** Kunde schließt Free Assessment ab
- **Tag 1:** Quick-Wins E-Mail (3 konkrete Tipps)
- **Tag 3:** Social Proof (Erfolgsbeispiele anderer KMU)
- **Tag 7:** Sonderangebot (Premium Report + Bonus)
- **Tag 14:** Letzte Erinnerung
- **Verarbeitung:** Cron-Job prüft täglich um 08:00 UTC die FollowUps-Tab

#### KI-Artikel-Generierung

- **Schedule:** Jeden Montag 07:00 UTC
- **Content-Kalender:** 4 Kategorien × 5 Themen = 20 Themen, rotiert nach Kalenderwoche
- **Ablauf:** OpenAI generiert Artikel → Entwurf in Google Sheets → E-Mail-Benachrichtigung an Steffen
- **Kategorien:** KI-Grundlagen, Tools & Tipps, Förderung, Praxisbeispiele

### A6. Externe Integrationen

| Service               | Zweck                                             | Token-Laufzeit                  |
| --------------------- | ------------------------------------------------- | ------------------------------- |
| **SMTP (Strato)**     | Transaktions-E-Mails (Leads, Reports, Follow-Ups) | Postfach-Passwort, unbegrenzt   |
| **Google Sheets API** | Datenspeicherung (Service Account)                | Service Account Key, unbegrenzt |
| **Mollie**            | Zahlungsabwicklung                                | API-Key, unbegrenzt             |
| **OpenAI**            | Blog-Artikel generieren (GPT-4o-mini)             | API-Key, unbegrenzt             |
| **LinkedIn**          | Automatisches Posten von Blog-Artikeln            | **OAuth Token, 60 Tage!**       |
| **Google Analytics**  | Website-Tracking                                  | Automatisch via gtag.js         |
| **Vercel**            | Hosting, Cron-Jobs, Deployment                    | Automatisch via Git Push        |

---

## TEIL B: SECURITY-AUDIT

### B1. Behobene Findings

#### 1. Reports-Endpoint Auth (KRITISCH → BEHOBEN)

**Datei:** `src/app/api/admin/reports/route.js`  
**Problem:** Der Endpoint verglich den Token direkt mit dem Admin-Passwort statt den HMAC-Token korrekt zu prüfen.  
**Fix:** Import von `verifyAdminToken` aus dem Login-Route und korrekte Token-Verifizierung.

#### 2. XSS im Dashboard (HOCH → BEHOBEN)

**Datei:** `src/app/dashboard/page.js`  
**Problem:** Drei Stellen nutzten `dangerouslySetInnerHTML` für E-Mail-Vorschau, Anhänge und Blog-Preview. Falls Kundendaten Script-Tags enthalten, könnte JavaScript im Admin-Browser ausgeführt werden.  
**Fix:** Alle drei Stellen durch sandboxed `<iframe srcDoc="...">` ersetzt. Iframes isolieren Scripts komplett.

#### 3. CORS-Header (MITTEL → BEHOBEN)

**Datei:** `next.config.js`  
**Problem:** Der Header-Name `x-admin-token` war in den CORS-Allow-Headers exponiert.  
**Fix:** Durch generischen `Authorization`-Header ersetzt.

#### 4. Admin-Guide öffentlich zugänglich (MITTEL → BEHOBEN)

**Datei:** `src/app/admin/page.js`  
**Problem:** Die Setup-Anleitung unter `/admin` war ohne Authentifizierung zugänglich.  
**Fix:** Seite komplett entfernt. Dieses Handbuch ersetzt sie.

#### 5. Informations-Leaks in Fehlermeldungen (NIEDRIG → BEHOBEN)

**Dateien:** `src/app/api/admin/login/route.js`, `src/app/api/admin/extend-code/route.js`  
**Problem:** Fehlermeldungen verrieten Details (z.B. ob ein Zugangscode existiert).  
**Fix:** Generische Fehlermeldungen eingesetzt.

#### 6. Dev-Preview-Seiten (NIEDRIG → BEHOBEN)

**Problem:** `/design-preview` und `/hero-preview` waren öffentlich zugänglich.  
**Fix:** Beide Seiten entfernt.

### B1a. Rate-Limits pro Endpoint (Stand: 2026-04-26)

| Endpoint                  | Limit            | Quelle                                              |
| ------------------------- | ---------------- | --------------------------------------------------- |
| `/api/admin/login`        | 5 / 15 Min       | `src/app/api/admin/login/route.js:14`               |
| `/api/verify-access`      | 5 / 1 Min        | `src/app/api/verify-access/route.js:7`              |
| `/api/lead`               | 5 / 1 Min        | `src/app/api/lead/route.js:7`                       |
| `/api/send-results`       | 3 / 1 Min        | `src/app/api/send-results/route.js:9`               |
| `/api/generate-report`    | 3 / 1 Min        | `src/app/api/generate-report/route.js:22`           |
| `/api/create-checkout`    | 3 / 1 Min        | `src/app/api/create-checkout/route.js:12`           |
| `/api/mollie-webhook`     | 10 / 1 Min       | `src/app/api/mollie-webhook/route.js:35`            |
| `/api/benchmark-data`     | 10 / 1 Min       | `src/app/api/benchmark-data/route.js`               |
| Admin-Routes (sonst)      | **kein Limit**   | siehe B2 "Akzeptierte Risiken"                      |

> Alle Limits laufen In-Memory pro Serverless-Instanz (siehe nächster Abschnitt).

### B1b. Audit-Findings (Stand: 2026-04-26)

| ID  | Severity | Status | Finding & Maßnahme |
| --- | -------- | ------ | ------------------ |
| H0  | KRITISCH | ✅ behoben | Konflikt Redirects ↔ Zugang-Pages. **Fix:** Redirects für `/*-zugang` aus `next.config.js` entfernt. |
| H1  | HOCH     | ✅ behoben | Blog `dangerouslySetInnerHTML` ohne Sanitizer. **Fix:** `sanitizeBlogHtml` (Allowlist via `sanitize-html`) in `src/app/blog/[slug]/page.js`. |
| H2  | —        | ✅ Falschalarm | `sandbox=""` ist HTML5-Standard für **maximale** Sandbox. Im Code dokumentiert. |
| H3  | HOCH     | ✅ behoben | In-Memory Rate-Limit. **Fix:** Persistenter Brute-Force-Lock via Sheets-Tab `LoginAttempts` (`src/lib/login-attempts.js`). |
| H4  | HOCH     | ✅ behoben | Inkonsistentes HTML-Escape. **Fix:** Zentrales `escapeHtml`/`sanitizeUserText` in `src/lib/sanitize.js`, in 7 Public-Routes ausgerollt. |
| H5  | HOCH     | ✅ behoben | Kein zentraler Auth-Wrapper. **Fix:** `requireAdmin()` in `src/lib/admin-auth.js`, alle 8 Admin-Routes umgestellt. |
| H6  | HOCH     | ✅ behoben | Kein Honeypot. **Fix:** `HoneypotField`-Komponente + `isHoneypotTriggered`, in 4 Lead-Forms aktiv. |
| M1  | MITTEL   | ✅ behoben | sessionStorage-Token bei 401 nicht gelöscht. **Fix:** `dashboard/page.js` löscht Token bei 401. |
| M2  | MITTEL   | ✅ behoben | E-Mail-Regex zu permissiv. **Fix:** TLD-Mindestlänge in allen Public-Routes. |
| M3  | MITTEL   | ✅ behoben | OG-Image-Längen-Limit. **Fix:** `text.slice(0,200)` in `og/route.jsx`. |
| M5  | MITTEL   | ✅ behoben | Kein Health-Check. **Fix:** `/api/health` (Sheets/Mail/Mollie), Admin-only. |
| M6  | MITTEL   | 🟡 offen | Kein Sentry/Alerting. Optional, später. |
| M7  | MITTEL   | 🟡 teilweise | CSP `unsafe-inline` für Scripts. **Fix-1:** `frame-ancestors`, `base-uri`, `form-action` ergänzt. **Offen:** Inline-Scripts via Nonce/`next/third-parties`. |
| M8  | MITTEL   | ✅ behoben | DSGVO-Consent-Banner. **Fix:** `ConsentBanner` lädt GA erst nach Opt-In, IP anonymisiert. |
| M10 | MITTEL   | ✅ behoben (Code) | Mail-SPOF. **Fix-1:** `OWNER_FALLBACK_WEBHOOK_URL` ENV (Discord/Slack-Backup, optional). **Fix-2:** SMTP provider-agnostisch + ENV-Trim gegen Copy-Paste-Whitespace. **Fix-3:** Wechsel von Gmail (`steffenhefter@…`) auf nativen Strato-SMTP für `ki-kompass@derhefter.com`. |
| —   | —        | 🟡 TODO User | LinkedIn-Token: Liveness-Check baut wöchentlich Reminder-Mail bei 401. Konfiguration Owner-Aufgabe. |
| —   | —        | 🟡 TODO User | Google-Sheets-Backup: monatlicher Export (Datei → Herunterladen → .xlsx). Siehe BEDIENUNGSANLEITUNG. |

**Bilanz:** 11 von 14 Findings behoben (inkl. Falschalarm H2). Verbleibend: M6 (Sentry, optional), M7 (CSP-Vollhärtung) und 2 wiederkehrende User-Aufgaben.

### B2. Akzeptierte Risiken

#### In-Memory Rate-Limiting (für Public-Endpoints)
**Hinweis:** Für **Login** wurde dies ersetzt durch persistenten Sheets-Lock (siehe H3). Für die übrigen Public-Endpoints (lead, send-results, create-checkout etc.) gilt weiterhin:

**Risiko:** Rate-Limits werden bei Vercel Cold Starts zurückgesetzt.  
**Begründung:** Bei Low-Traffic-Seite ausreichend. Schützt weiterhin vor Rapid-Fire-Attacken innerhalb warmer Instanzen. Zusätzlicher Schutz durch Vercel's integrierte WAF möglich.

#### `unsafe-inline` in CSP (script-src)

**Risiko:** Inline-Scripts werden weiterhin akzeptiert.
**Begründung:** Aktuell für das GA-Init-Snippet im `ConsentBanner` nötig. Vollharting via Nonce oder `next/third-parties/google` ist als TODO M7 offen.
**Mitigation:** XSS-Vektoren stark reduziert durch Blog-Sanitizer (H1), Honeypot+Escape (H4/H6) und gehärtete Header (`frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self' https://www.mollie.com`).

#### sessionStorage für Admin-Token

**Risiko:** Token im Browser-Speicher zugänglich bei XSS.
**Begründung:** Admin-Dashboard wird nur von Steffen genutzt. XSS-Risiko durch Blog-Sanitizer + maximal restriktiven `sandbox=""` für iframe-Previews stark reduziert. Token ist 24h gültig, wird bei Browser-Schließen automatisch gelöscht **und** seit Phase 1 zusätzlich bei jedem 401-Response der Dashboard-API entfernt.

### B3. Bestehende Schutzmaßnahmen

| Maßnahme                                         | Status |
| ------------------------------------------------ | ------ |
| HMAC-Token-Authentifizierung (timing-safe)       | Aktiv  |
| Rate-Limiting auf Login (5 Versuche / 15 Min)    | Aktiv  |
| Rate-Limiting auf Assessment + Payment APIs      | Aktiv  |
| HTTPS erzwungen (HSTS mit Preload)               | Aktiv  |
| X-Frame-Options: DENY (Clickjacking-Schutz)      | Aktiv  |
| Referrer-Policy: strict-origin-when-cross-origin | Aktiv  |
| E-Mail Header-Injection-Schutz                   | Aktiv  |
| HTML-Escaping bei Benutzereingaben               | Aktiv  |
| Google Sheets Formula-Injection-Schutz           | Aktiv  |
| Mollie Webhook Idempotenz-Checks                 | Aktiv  |
| Zugangscode-Ablaufdatum                          | Aktiv  |
| CORS auf eigene Domain beschränkt                | Aktiv  |

---

## TEIL C: USABILITY-AUDIT

### C1. Öffentliche Seite

**Navigation:** Sticky Navbar mit Desktop-Links + Mobile Hamburger-Menü. Smooth-Scroll zu Anker-Links (`#so-funktionierts`, `#preise`). Footer mit hierarchischen Links.

**Assessment-Flow:** 12 Fragen → E-Mail-Gate → Sofort-Ergebnisse. Progress-Bar zeigt Fortschritt. Microcopy ermutigt bei Frage 4, 8, 10. "Abbrechen"-Link jetzt vorhanden (UX-Fix).

**Mobile:** Responsive via Tailwind Breakpoints. Hamburger-Menü animiert. Grids stacken auf Mobile. Touch-freundliche Button-Größen (44px+).

**Blog:** 5 Kategorien mit Filterung. Lesezeit-Anzeige. Statische + dynamische Artikel (Google Sheets). Cache: 30 Minuten, wird bei Publish invalidiert.

**Pricing:** 3 Stufen klar dargestellt (Free / €147 Premium / €497 Strategie).

**Hinweis:** Eine custom 404-Seite konnte aufgrund eines Next.js 14.2 Kompatibilitätsproblems nicht integriert werden. Next.js zeigt den Standard-404 an.

### C2. Admin Dashboard

**Zugang:** `/dashboard` → Passwort-Login → 3 Tabs

**Tab 1 – Übersicht:**

- KPI-Karten: Kunden gesamt, aktive Zugangscodes, Free Assessments, geschätzter Umsatz
- Setup-Checkliste: Zeigt welche Integrationen konfiguriert sind

**Tab 2 – Freigaben:**

- Zeigt pending Reports, Zertifikate, Rechnungen
- Pro Item: Vorschau (jetzt in sicherem iframe), persönliche Notiz hinzufügen, freigeben oder ablehnen
- Ablehn-Dialog mit Pflicht-Begründung (gute UX)

**Tab 3 – Blog:**

- KI-Entwürfe prüfen, bearbeiten, publizieren
- Manuell neuen Artikel generieren lassen
- LinkedIn-Posting beim Publizieren optional
- HTML-Vorschau des Artikels (jetzt in sicherem iframe)

**Bewertung:** Dashboard ist funktional und übersichtlich. Alle wichtigen Aktionen sind erreichbar. Die Freigabe-Workflows sind gut durchdacht.

### C3. Umgesetzte Verbesserungen

| #   | Verbesserung         | Beschreibung                                    |
| --- | -------------------- | ----------------------------------------------- |
| 1   | Dev-Seiten entfernt  | `/design-preview` und `/hero-preview` gelöscht  |
| 3   | Assessment-Abbruch   | "Abbrechen"-Link während der Fragen hinzugefügt |
| 4   | Dashboard XSS-Schutz | HTML-Previews in sandboxed iframes              |

---

## TEIL D: ADMIN-HANDBUCH (Betriebsanleitung)

### D1. Login & Dashboard-Zugang

1. Gehe zu `https://www.derhefter.com/dashboard`
2. Gib das Admin-Passwort ein (gespeichert in Vercel unter `ADMIN_PASSWORD`)
3. Du bist für 24 Stunden eingeloggt (Token in sessionStorage)
4. Nach 24h oder Browser-Schließen: erneut einloggen

### D2. Tägliche Aufgaben

#### Freigaben prüfen

1. Dashboard öffnen → Tab **"Freigaben"**
2. Neue Items haben den Status "pending"
3. Pro Item:
   - **Vorschau klicken** → E-Mail-Inhalt und Anhang prüfen
   - **Optional:** Persönliche Notiz von Steffen hinzufügen
   - **"Freigeben"** klicken → E-Mail wird automatisch an Kunden gesendet
   - Oder **"Ablehnen"** mit Begründung
4. Status wird automatisch in Google Sheets aktualisiert

**Typen in der Freigabe-Queue:**

- Reports (Premium Assessment Ergebnisse)
- Zertifikate (KI-Readiness Zertifikate)
- Rechnungen (manuell editierbar: Rechnungsnummer, Betrag, Beschreibung)
- Assessments

#### Neue Leads checken

- **Im Dashboard:** Tab "Übersicht" → KPI "Free Assessments"
- **In Google Sheets:** Sheet "Free Results" → Tab "Ergebnisse" für Details
- Jeder neue Lead löst automatisch die Follow-Up-Sequenz aus (Tag 1, 3, 7, 14)

### D3. Wöchentliche Aufgaben

#### Blog-Entwurf prüfen und publizieren

1. **Montags automatisch:** KI generiert einen Artikel-Entwurf (Benachrichtigung per E-Mail)
2. Dashboard öffnen → Tab **"Blog"**
3. Entwurf prüfen:
   - **"Bearbeiten"** → Titel, Excerpt, Inhalt, Kategorie anpassen
   - **"Vorschau"** → HTML-Darstellung prüfen
   - **Änderungen speichern**
4. **"Veröffentlichen"** klicken
   - Optional: Haken bei **"Teile auf LinkedIn"** setzen
   - Optional: Eigenes Datum wählen
5. Artikel erscheint auf `/blog` (Cache wird automatisch invalidiert)

#### Manuell Artikel generieren

Falls kein automatischer Entwurf da ist oder du einen zusätzlichen brauchst:

1. Dashboard → Blog → **"+ KI-Artikel generieren"** klicken
2. System wählt nächstes Thema aus dem Content-Kalender
3. Entwurf erscheint nach wenigen Sekunden

### D4. Monatliche Aufgaben

#### LinkedIn-Token erneuern (alle 60 Tage!)

Der LinkedIn Access Token läuft nach 60 Tagen ab. Ohne Erneuerung funktioniert das LinkedIn-Posting nicht mehr.

1. Dashboard öffnen → Blog-Tab → **"LinkedIn verbinden"**
2. LinkedIn-Login durchführen und autorisieren
3. Angezeigte Tokens (Access Token + Person URN) kopieren
4. In **Vercel** → Settings → Environment Variables:
   - `LINKEDIN_ACCESS_TOKEN` → neuen Token einfügen
   - `LINKEDIN_PERSON_URN` → prüfen ob korrekt
5. **Redeploy** auslösen (Vercel Dashboard → Deployments → Redeploy)

#### Google Sheets aufräumen

- **FollowUps-Tab:** Alte Einträge (Status "gesendet" + älter als 30 Tage) können gelöscht werden
- **Berichte-Tab:** Alte "gesendet"-Einträge können archiviert werden
- **Entwuerfe-Tab (Blog):** Abgelehnte Entwürfe können gelöscht werden

#### Dependencies prüfen

```bash
cd KI-Kompass-V2
npm audit
```

Bei Schwachstellen: `npm audit fix` ausführen und neu deployen.

### D5. Bei Bedarf

#### Zugangscode verlängern

1. Dashboard → Tab "Übersicht"
2. Bereich "Zugangscode verlängern" finden
3. Code eingeben + Anzahl Tage
4. **"Verlängern"** klicken

Alternativ direkt in Google Sheets:

- Sheet "Kunden" → Tab "Zugangscodes" → Spalte G (Ablaufdatum) anpassen + Spalte H auf "aktiv"

#### Manuell Blog-Artikel schreiben (ohne KI)

**Option A: Über Google Sheets**

1. Sheet "Blog" → Tab "Artikel" öffnen
2. Neue Zeile einfügen mit:
   - ID (nächste freie Nummer)
   - Slug (URL-freundlich, z.B. `ki-im-handwerk`)
   - Titel, Excerpt, Content (HTML), Kategorie, Datum, Lesezeit
3. Artikel erscheint nach max. 30 Min. auf der Website (Cache)

**Option B: Über die statische Datei**

1. Datei `src/data/blog-posts.js` bearbeiten
2. Neues Objekt am Anfang des Arrays einfügen:
   
   ```javascript
   {
   id: 10,  // nächste freie ID
   slug: 'mein-neuer-artikel',
   title: 'Artikeltitel',
   excerpt: 'Kurzbeschreibung (max. 160 Zeichen)',
   content: `<h2>Überschrift</h2><p>Text...</p>`,
   category: 'KI-Grundlagen',  // oder: Förderung, Praxisbeispiele, Tools & Tipps, Rechtliches
   author: 'Steffen Hefter',
   date: '2026-04-13',
   status: 'published',
   readTime: 4,
   }
   ```
3. Commit + Push → Vercel deployed automatisch

#### Preise ändern

**Datei:** `src/app/api/create-checkout/route.js` (Zeile 25-86)

Produkte und Preise sind im `PRODUCTS`-Objekt definiert:

```
premium:          €147     (Premium Report, einmalig)
strategie:        €497     (Strategie-Paket, einmalig)
zertifikat:       €97      (KI-Readiness Zertifikat Premium, einmalig)
zertifikat-basic: €47      (KI-Readiness Basic Badge, einmalig)
kurs:             €297     (Online-Kurs, einmalig)
benchmark:        €297     (Branchen-Benchmark Report, einmalig)
toolbox-starter:  €29/Mon  (KI-Toolbox Starter Abo)
toolbox-pro:      €49/Mon  (KI-Toolbox Pro Abo)
monitoring-basic: €49/Mon  (KI-Monitoring Basic Abo)
monitoring-pro:   €99/Mon  (KI-Monitoring Pro Abo)
```

> Die Preise sind in `src/app/api/create-checkout/route.js` (Zeile 25-86) definiert. **Frontend-Preise** (Pricing-Cards, Landingpages) müssen separat in `src/components/PricingCards.js` und den jeweiligen Produktseiten angepasst werden.

Zum Ändern: `price` (z.B. `'197.00'`) und `priceDisplay` (z.B. `'197'`) anpassen.

**Wichtig:** Preise auf der Startseite separat anpassen in `src/components/PricingCards.js`.

#### E-Mail-Templates anpassen

| Template                     | Datei                                                |
| ---------------------------- | ---------------------------------------------------- |
| Follow-Up-Sequenz (Tag 1-14) | `src/lib/follow-up.js`                               |
| Lead-Benachrichtigung        | `src/app/api/lead/route.js` (ab Zeile ~60)           |
| Report-Versand               | `src/app/api/admin/reports/route.js` (ab Zeile ~139) |
| Allgemeine E-Mail-Funktion   | `src/lib/mail.js`                                    |

Templates sind inline-HTML. Ändern, committen, pushen → Vercel deployed automatisch.

#### Neue Assessment-Fragen hinzufügen

**Datei:** `src/data/questions.js`

- **Free Assessment:** Array `freeQuestions` (aktuell 12 Fragen)
- **Premium Assessment:** Array `premiumQuestions` (aktuell 35 Fragen)

Jede Frage hat:

```javascript
{
  id: 'awareness_1',           // Eindeutige ID
  category: 'AI Awareness',    // Kategorie
  question: 'Fragetext...',    // Die Frage
  options: [
    { text: 'Antwort A', score: 1 },
    { text: 'Antwort B', score: 2 },
    { text: 'Antwort C', score: 3 },
    { text: 'Antwort D', score: 4 },
  ]
}
```

**Achtung:** Wenn du Fragen hinzufügst, ändert sich der Score-Bereich. Prüfe die Score-Berechnung in `calculateScore()` in derselben Datei.

#### Google Sheets: Was ist sicher, was nicht?

**Sicher direkt zu bearbeiten:**

- Zugangscode-Ablaufdatum verlängern (Spalte G+H)
- FollowUp-Status manuell auf "gesendet" setzen
- Alte Zeilen löschen (Ergebnisse, FollowUps)
- Blog-Artikel in "Artikel"-Tab hinzufügen/editieren

**NICHT direkt bearbeiten (System schreibt automatisch):**

- Spalte A-F in "Ergebnisse" (wird vom System befüllt)
- "Freigaben"-Tab Spalten A-M (wird von Content-Queue verwaltet)
- "Berichte"-Tab (wird vom Report-System verwaltet)
- Blog "Entwuerfe"-Tab (wird vom KI-Generator verwaltet)

**Regel:** Alles was das System automatisch schreibt, nicht manuell ändern. Daten die du manuell korrigieren willst → über Dashboard oder neue Zeile in Sheets.

### D6. Troubleshooting

#### E-Mails kommen nicht an

**Schnelldiagnose über Health-Endpoint** (am Dashboard angemeldet, F12-Console):

```js
fetch('/api/health', { headers: { 'x-admin-token': sessionStorage.getItem('adminToken') } }).then(r => r.json()).then(j => console.log(JSON.stringify(j, null, 2)))
```

Liefert ein konkretes `mail.error`-Feld. Häufige Werte:

| Fehlertext | Ursache | Fix |
|---|---|---|
| `535-5.7.8 BadCredentials` (Gmail) | App-Passwort widerrufen oder Konto-Pwd geändert | Neues App-Passwort, in Vercel `EMAIL_PASS` aktualisieren, Redeploy |
| `535 LOGIN failed` (Strato) | Postfach-Passwort falsch oder Postfach existiert nicht | Im Strato Communication Center Postfach + Passwort prüfen / neu setzen |
| `queryA EBADNAME ...` | **Whitespace** in `EMAIL_HOST` (Tab/Leerzeichen aus Copy/Paste) | In Vercel den Wert manuell neu eintippen, Redeploy. Code trimmt seit Phase 4.x defensiv. |
| `ETIMEDOUT` / `ECONNREFUSED` | Falscher Port oder Provider blockt | Bei Strato Port `465` statt `587` versuchen, ggf. zusätzlich `EMAIL_SECURE=true` |
| `connect ETIMEDOUT` aus Vercel | Provider blockt Vercel-IPs | Anderen SMTP-Provider erwägen (Mailgun, Postmark) |

**Prüfe ENV-Vars in Vercel** (Settings → Environment Variables):

```
EMAIL_HOST=smtp.strato.de       # oder anderer Provider
EMAIL_PORT=587                  # 465 oder 587
EMAIL_USER=ki-kompass@derhefter.com
EMAIL_PASS=<Postfach-Passwort>
EMAIL_FROM=KI-Kompass | frimalo <ki-kompass@derhefter.com>
EMAIL_REPLY_TO=ki-kompass@derhefter.com
```

**Hinweise:**
- `EMAIL_USER` muss ein **echtes Postfach-Login** beim SMTP-Provider sein (kein Alias).
- Bei Gmail muss zudem `EMAIL_USER` ein vollständiges Google-Konto sein (`@gmail.com` / `@googlemail.com`).
- Strato-Standard: 1.000 E-Mails/Tag, 50/Stunde (großzügiger als Gmail).
- Vercel-Logs: Dashboard → Deployments → Functions → Logs → nach `Fehler beim E-Mail-Versand` filtern.

#### Google Sheets-Fehler

1. **"Google Sheets nicht konfiguriert":**
   - Prüfe `GOOGLE_SERVICE_ACCOUNT_KEY` in Vercel (kompettes JSON, kein Zeilenumbruch)
   - Prüfe Sheet-IDs in den jeweiligen Env-Vars
2. **"Permission denied":**
   - Service Account E-Mail (`derhefter-com@gen-lang-client-...`) als Editor in allen Sheets einladen
3. **"Sheet not found":**
   - Tab-Name prüfen (exakt: "Ergebnisse", "Einzelantworten", "Kunden", "Zugangscodes", "FollowUps", "Freigaben", "Berichte", "Artikel", "Entwuerfe")

#### Mollie-Zahlung fehlgeschlagen / Kunde hat keinen Zugangscode bekommen

1. **Prüfe `MOLLIE_API_KEY` in Vercel** – muss mit `live_` beginnen (nicht `test_`)
2. **Mollie Dashboard:** my.mollie.com → Zahlungen → Status prüfen (`paid`, `failed`, `expired`).
3. **Webhook-Log einsehen:** Mollie Dashboard → die jeweilige Zahlung öffnen → Tab "Webhooks". Dort sieht man, ob Vercel HTTP 200 zurückgegeben hat.
4. **Webhook manuell erneut auslösen:** Mollie-Webhook-Eintrag → "Erneut senden". Vercel verarbeitet idempotent (Doppelzahlungs-Check via Sheets).
5. **Manueller Notfall-Workflow:**
   - Mollie-Zahlung verifizieren (Status `paid`).
   - In Sheet "Kundendaten" → Tab "Zugangscodes" eine neue Zeile manuell anlegen (Code-Format `<FIRMA6>-<HEX16>`, Status `aktiv`, Ablaufdatum `+7 Tage`).
   - Aus Mollie-Metadaten (Dashboard) `name`, `email`, `company`, `phone` ziehen.
   - Kunden manuell per Mail kontaktieren mit dem Zugangs-Link nach Schema:
     `https://www.derhefter.com/<zugangsseite>?code=<CODE>` (siehe Mapping in Mollie-Webhook).
6. **Häufigster Fehler ohne Handlungsbedarf:** Kunde bricht Zahlung ab (Status `canceled`/`expired`) → keine Aktion nötig.

#### Cron-Jobs laufen nicht

1. **Prüfe `vercel.json`:** Muss die Cron-Konfiguration enthalten
2. **Prüfe `CRON_SECRET` in Vercel:** Muss gesetzt sein
3. **Vercel Dashboard:** → Crons → Run History prüfen
4. **Manuell auslösen (Artikel-Cron):**
   - Komfort-Weg: Dashboard → Blog → "+ KI-Artikel generieren"
   - Direkt-Aufruf: `POST https://www.derhefter.com/api/cron/generate-article` mit Header `x-admin-token: <Token aus Login>`. Optional Body: `{"category":"…","topic":"…"}` für Themen-Override.
5. **Follow-Ups manuell:** Nicht über Dashboard möglich – Cron muss laufen. Notfalls direkt: `GET https://www.derhefter.com/api/process-followups` mit Header `Authorization: Bearer <CRON_SECRET>`.

#### Vercel-Deployment-Probleme

1. **Push auf `main`** → Vercel deployed automatisch
2. **Build-Fehler:** Vercel Dashboard → Deployments → Build Logs lesen
3. **Env-Vars vergessen:** Nach Hinzufügen neuer Env-Vars → Redeploy nötig
4. **Rollback:** Vercel Dashboard → Deployments → altes Deployment → "Promote to Production"

---

## TEIL E: UMGEBUNGSVARIABLEN (Referenz)

Alle Variablen müssen in **Vercel** unter Settings → Environment Variables eingetragen sein.

### Website & Kontakt

| Variable                      | Wert/Beschreibung                                | Wo zu finden  |
| ----------------------------- | ------------------------------------------------ | ------------- |
| `NEXT_PUBLIC_BASE_URL`        | `https://www.derhefter.com`                      | Eigene Domain |
| `NEXT_PUBLIC_CONTACT_EMAIL`   | `ki-kompass@derhefter.com`                       | Dein Kontakt  |
| `NEXT_PUBLIC_CONTACT_NAME`    | `Steffen Hefter`                                 | –             |
| `NEXT_PUBLIC_COMPANY_NAME`    | `frimalo`                                        | –             |
| `NEXT_PUBLIC_CONTACT_ADDRESS` | `Wilhelm-Schrader-Str. 27a, 06120 Halle (Saale)` | –             |

### E-Mail (SMTP – Provider-agnostisch)

Funktioniert mit jedem SMTP-Anbieter (Strato, Gmail, IONOS, Mailgun …).
`secure` wird automatisch aus `EMAIL_PORT` abgeleitet (465 → TLS direkt, 587 → STARTTLS).
Manuell überschreibbar via `EMAIL_SECURE=true|false`.

| Variable         | Wert/Beschreibung                                                                       |
| ---------------- | --------------------------------------------------------------------------------------- |
| `EMAIL_HOST`     | SMTP-Server, z.B. `smtp.strato.de`, `smtp.gmail.com`, `smtp.ionos.de`                   |
| `EMAIL_PORT`     | `465` oder `587` (empfohlen)                                                            |
| `EMAIL_SECURE`   | Optional. Default: `true` für 465, sonst `false`. Selten manuell nötig.                 |
| `EMAIL_USER`     | **Echte SMTP-Login-Adresse** (= Postfach-Login beim Provider, nicht zwingend Anzeige-From) |
| `EMAIL_PASS`     | Postfach-Passwort beim Provider (bei Gmail: 16-stelliges App-Passwort, kein Konto-Pwd!) |
| `EMAIL_FROM`     | Anzeige-Absender, z.B. `KI-Kompass \| frimalo <ki-kompass@derhefter.com>`               |
| `EMAIL_REPLY_TO` | Antwortadresse, z.B. `ki-kompass@derhefter.com`                                         |

**Beispiel Strato (empfohlen, da `derhefter.com` dort liegt):**

```
EMAIL_HOST=smtp.strato.de
EMAIL_PORT=587
EMAIL_USER=ki-kompass@derhefter.com
EMAIL_PASS=<Postfach-Passwort aus dem Strato Communication Center>
EMAIL_FROM=KI-Kompass | frimalo <ki-kompass@derhefter.com>
EMAIL_REPLY_TO=ki-kompass@derhefter.com
```

**Wichtig (Falle):** Bei Gmail-SMTP muss `EMAIL_USER` ein echtes Google-Konto sein – Domain-Aliase funktionieren nicht. Für eigene Domain wie `ki-kompass@derhefter.com` ist Strato (oder der jeweilige Hoster) der saubere Weg.

### Terminbuchung

Aktuell sind **vier** Booking-Variablen im Code referenziert (gewachsene Struktur).
Empfohlen: alle vier setzen, dann arbeitet jede Stelle wie vorgesehen.

| Variable                          | Wert/Beschreibung                                                            | Verwendet in                                            |
| --------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------- |
| `NEXT_PUBLIC_BOOKING_URL_30`      | 30-Min.-Termin (kostenlose Erstberatung, Standard-Slot)                      | `src/app/beratung/page.js`, `src/app/dashboard/page.js` |
| `NEXT_PUBLIC_BOOKING_URL_60`      | 60-Min.-Termin (Strategiegespräch nach Kauf)                                 | `src/app/zahlung-erfolgreich/page.js`                   |
| `NEXT_PUBLIC_ERSTBERATUNG_URL`    | Spezieller Erstberatungs-Link (über mich)                                    | `src/app/ueber-mich/page.js`                            |
| `NEXT_PUBLIC_BOOKING_URL`         | **Legacy** – Fallback für `/anfrage` und `purchase-request`-Mail-Templates   | `src/app/anfrage/page.js`, `src/app/api/purchase-request/route.js` |

> **Aufräum-TODO:** Mittelfristig sollten `anfrage` und `purchase-request` auf `BOOKING_URL_30` umgestellt und die Legacy-Variable entfernt werden.

### Google Sheets

| Variable                       | Wert/Beschreibung                    | Wo zu finden                                          |
| ------------------------------ | ------------------------------------ | ----------------------------------------------------- |
| `GOOGLE_SERVICE_ACCOUNT_KEY`   | Komplettes JSON des Service Accounts | Google Cloud → IAM → Service Accounts → Key erstellen |
| `GOOGLE_SHEET_FREE_RESULTS`    | Sheet-ID für Free Results            | URL: `docs.google.com/spreadsheets/d/HIER_ID/edit`    |
| `GOOGLE_SHEET_PREMIUM_RESULTS` | Sheet-ID für Premium Results         | URL der Tabelle                                       |
| `GOOGLE_SHEET_CUSTOMERS`       | Sheet-ID für Kundendaten             | URL der Tabelle                                       |
| `GOOGLE_SHEET_BLOG`            | Sheet-ID für Blog-Artikel            | URL der Tabelle                                       |

### Admin & Security

| Variable         | Wert/Beschreibung                            | Wo zu finden     |
| ---------------- | -------------------------------------------- | ---------------- |
| `ADMIN_PASSWORD`              | Sicheres Passwort für /dashboard                                                                  | Selbst gewählt   |
| `CRON_SECRET`                 | Zufälliger String für Cron-Authentifizierung                                                      | Selbst generiert |
| `OWNER_FALLBACK_WEBHOOK_URL`  | **Optional.** Discord-/Slack-Webhook-URL. Wird genutzt, wenn SMTP fehlschlägt, damit Owner-Notifications nicht verloren gehen. Ohne Wert: kein Fallback aktiv (no-op). | Discord: Channel → ⚙ → Integrationen → Webhooks. Slack: Apps → Incoming Webhooks. |

### Zahlungen (Mollie)

| Variable         | Wert/Beschreibung                  | Wo zu finden                             |
| ---------------- | ---------------------------------- | ---------------------------------------- |
| `MOLLIE_API_KEY` | Live API Key (beginnt mit `live_`) | my.mollie.com → Einstellungen → API-Keys |

### KI-Artikelgenerierung

| Variable         | Wert/Beschreibung | Wo zu finden                   |
| ---------------- | ----------------- | ------------------------------ |
| `OPENAI_API_KEY` | OpenAI API Key    | platform.openai.com → API Keys |

### LinkedIn

| Variable                 | Wert/Beschreibung                          | Wo zu finden                 |
| ------------------------ | ------------------------------------------ | ---------------------------- |
| `LINKEDIN_CLIENT_ID`     | App Client ID                              | linkedin.com/developers/apps |
| `LINKEDIN_CLIENT_SECRET` | App Client Secret                          | linkedin.com/developers/apps |
| `LINKEDIN_ACCESS_TOKEN`  | OAuth2 Token (**läuft nach 60 Tagen ab!**) | Über Dashboard OAuth-Flow    |
| `LINKEDIN_PERSON_URN`    | Person URN (z.B. `urn:li:person:XXXXXXX`)  | Über Dashboard OAuth-Flow    |

### Erneuern von Tokens/Keys

| Was                        | Wann                 | Wie                                                                      |
| -------------------------- | -------------------- | ------------------------------------------------------------------------ |
| LinkedIn Access Token      | Alle 60 Tage         | Dashboard → Blog → LinkedIn verbinden → Token in Vercel aktualisieren    |
| SMTP-Postfach-Passwort     | Bei Kompromittierung | Strato Communication Center → Postfach → Passwort ändern; in Vercel `EMAIL_PASS` aktualisieren + Redeploy |
| Google Service Account Key | Bei Kompromittierung | Google Cloud Console → IAM → Service Accounts → Key rotieren             |
| Mollie API Key             | Bei Kompromittierung | my.mollie.com → neuen Key generieren                                     |
| Admin-Passwort             | Regelmäßig empfohlen | In Vercel ändern → Redeploy                                              |

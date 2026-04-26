# Bedienungsanleitung — KI-Kompass V2 (für den Inhaber)

**Für wen?** Steffen, in der täglichen Nutzung. Kein Tech-Wissen nötig.
**Wofür?** Dashboard bedienen, Kunden bestätigen, Blog freigeben, Probleme erkennen.
**Tech-Referenz:** Falls du tiefer reinwillst → `ADMIN-HANDBUCH.md`.

---

## 0. In 5 Minuten startklar

1. Browser auf: **https://www.derhefter.com/dashboard**
2. Admin-Passwort eingeben → Enter.
3. Du bist 24 Stunden eingeloggt. Tab schließen oder 24 h warten = neu einloggen.
4. Oben siehst du **drei Tabs**:
   - **Übersicht** — Zahlen, Status, Zugangscodes verwalten.
   - **Freigaben** — alles, was vor dem Versand auf deinen Klick wartet.
   - **Blog** — KI-Entwürfe prüfen und veröffentlichen.

> **Logout:** Browser-Tab schließen oder 24 h warten. Es gibt keinen extra Logout-Button — das ist gewollt schlank.

---

## 1. Tagesroutine (~5 Minuten)

**Ziel:** Nichts liegen lassen, alle Kunden zeitnah versorgen.

1. Dashboard öffnen → Tab **Freigaben**.
2. Jedes „pending"-Item kurz öffnen:
   - **Vorschau** anschauen (kurzer Blick: Anrede stimmt? Betrag stimmt? Anhang da?).
   - Optional: Persönliche Notiz von dir hinzufügen (z. B. „Viel Erfolg, Herr X!").
   - **Freigeben** → Mail geht raus, Status ändert sich automatisch.
   - Oder **Ablehnen** → mit kurzer Begründung (Pflichtfeld).
3. Tab **Übersicht** → schauen ob neue Free-Assessment-Leads reingekommen sind. Mehr ist nicht zu tun, die Follow-Up-Mails laufen automatisch.

> **Faustregel:** Wenn rechts oben „Freigaben" eine Zahl steht → kurz reinschauen. Wenn nicht → fertig für heute.

---

## 2. Wochenroutine (~10 Minuten, Montagvormittag)

**Ziel:** KI-generierter Blog-Artikel raus, Wochenüberblick.

1. Du bekommst Montag früh eine **E-Mail**: „✍️ Neuer Blog-Entwurf zur Freigabe".
2. Dashboard → Tab **Blog** → den Entwurf öffnen.
3. **Bearbeiten** klicken — Titel/Excerpt/Inhalt können angepasst werden.
   - Faustregel: Reinschauen, ggf. Einleitung oder Schlussabsatz natürlicher formulieren. Komplett neu schreiben ist selten nötig.
4. **Vorschau** — sieht das Ganze auf der Seite gut aus?
5. **Veröffentlichen** klicken:
   - Haken bei **„Auf LinkedIn teilen"** setzen → wird automatisch gepostet.
   - Datum optional anpassen (z. B. wenn du auf einen späteren Tag zielen willst).
6. Tab **Übersicht** → KPI **Umsatz** kurz checken (Wochenvergleich im Kopf).

> **Wenn am Montag kein Entwurf da ist:** Tab Blog → „**+ KI-Artikel generieren**" klicken. Nach 10–30 Sekunden steht der Entwurf.

---

## 3. Monatsroutine (~20 Minuten, am Monatsanfang)

**Ziel:** Aufräumen + sicherstellen, dass nichts Wichtiges abläuft.

1. **Zugangscodes prüfen** — Tab Übersicht → „Zugangscodes":
   - Abgelaufene Codes mit Hinweis vom Kunden? → unten **Code verlängern** (Code + Tage eingeben → klick).
2. **Google Sheets Aufräumen** (kein Muss, gegen Wildwuchs):
   - Sheet „Kundendaten" → Tab „FollowUps": Zeilen mit Status `gesendet` und älter als 30 Tage können gelöscht werden.
   - Sheet „Blog" → Tab „Entwuerfe": abgelehnte Entwürfe können raus.
3. **LinkedIn-Token-Status prüfen** — alle 60 Tage muss neu autorisiert werden.
   - Tab Blog → „LinkedIn verbinden" → durch den OAuth-Dialog → die zwei angezeigten Werte (Access Token + Person URN) kopieren → in **Vercel** unter Settings → Environment Variables eintragen (`LINKEDIN_ACCESS_TOKEN`, ggf. `LINKEDIN_PERSON_URN`) → Redeploy auslösen.
   - **Tipp:** Trag dir alle 50 Tage einen Kalender-Reminder ein, nicht erst am Tag 60.
4. **Mail-Limit checken** — Gmail erlaubt 500 Mails/Tag. Wenn du je nahe rankommst (Massen-Newsletter o.ä.): zweites Mail-Konto erwägen.
5. **Backup der Google Sheets** (5 Min):
   - Drive → Ordner "KI-Kompass" → jedes der 4 Sheets öffnen
   - Datei → Herunterladen → Microsoft Excel (.xlsx)
   - Sicher in Cloud-Backup oder externer Festplatte ablegen
   - Empfehlung: 1× im Monat reicht. Bei wichtigen Änderungen ad hoc.
6. **LinkedIn-Token-Status** — Wenn du eine Mail mit Betreff "[REMINDER] LinkedIn-Token..." bekommst, ist das Token abgelaufen. Schritte siehe Abschnitt 4.

---

## 4. Häufige Aufgaben — Kochbuch

### Kunde sagt „mein Code geht nicht mehr"
- Tab Übersicht → Bereich „Zugangscode verlängern" → Code einfügen → +30 Tage → Verlängern.
- Falls der Code gar nicht in der Liste auftaucht: Sheet „Kundendaten" → Tab „Zugangscodes" → mit Strg+F suchen. Wenn dort nichts → siehe unten „Manuell Zugangscode anlegen".

### Manuell Zugangscode anlegen (Notfall, z. B. Webhook fiel aus)
- Sheet „Kundendaten" → Tab „Zugangscodes" → neue Zeile:
  - **Code:** Format `<FIRMA6>-<HEX16>`, z. B. `MUSTER-A1B2C3D4E5F60718`. Du kannst die Hex-Hälfte auf jeder beliebigen Online-Seite generieren („random hex 16 chars").
  - **Name / E-Mail / Firma:** wie vom Kunden bekannt.
  - **Plan:** `premium`, `kurs`, `toolbox-starter`, etc. (siehe Plan-Liste im Admin-Handbuch).
  - **Erstellt:** heute (ISO-Format, z. B. `2026-04-26T10:00:00Z`).
  - **Ablaufdatum:** +7 Tage.
  - **Status:** `aktiv`.
- Kunde anschreiben mit Link `https://www.derhefter.com/<zugangsseite>?code=<CODE>` (`/premium`, `/kurs-zugang`, `/toolbox-zugang`, `/benchmark-zugang`, `/monitoring-zugang`).

### Verkauf einsehen
- Tab Übersicht → KPI-Karte „Umsatz" zeigt geschätzten Gesamtumsatz.
- Detailliert: Sheet „Kundendaten" → Tab „Kunden" → dort steht jede Zahlung mit Datum, Plan, Betrag, Zahlungsart, Mollie-ID.

### Rechnung neu erstellen / korrigieren
- Tab Freigaben → Item Typ „Rechnung" öffnen → Felder bearbeiten (Rechnungsnummer, Betrag, Beschreibung) → speichern → freigeben.
- Wenn die Rechnung schon raus ist: neue Rechnung manuell anlegen, alte als Storno markieren (z. B. in Notiz festhalten).

### Manuell einen Blog-Artikel schreiben (ohne KI)
- Schnellweg: Sheet „Blog" → Tab „Artikel" → neue Zeile (siehe Spalten-Header). Nach max. 30 Min auf der Website.
- Code-Weg (für dauerhafte Artikel mit Versionskontrolle): siehe Admin-Handbuch Abschnitt D5.

### Mollie-Test ausführen
- Mollie-Dashboard → in den **Test-Modus** wechseln → Test-Zahlung mit Test-Karte → schauen, ob Webhook 200 zurückgibt und der Code im Sheet landet.

---

## 5. Wenn etwas nicht stimmt — Mini-Troubleshooting

| Symptom                                                | Erste Schritte                                                                                                  |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Dashboard fragt plötzlich nach Login (war eingeloggt)  | 24-h-Token abgelaufen → einfach neu einloggen.                                                                  |
| „Mein Code geht nicht" (Kunde meldet sich)             | Tab Übersicht → Zugangscode verlängern. Wenn Code nicht existiert → siehe Kochbuch „Manuell Zugangscode anlegen". |
| Mollie-Zahlung kam, aber **kein Mail an Kunden**       | Mollie-Dashboard → Zahlung → Tab Webhooks → „Erneut senden". (Idempotent, kein Risiko von doppeltem Code.)      |
| Kunden bekommen gar keine Mails mehr                   | Gmail → in `Gesendet` schauen. Wenn leer → Gmail-Limit (500/Tag) oder Passwort-Problem. Vercel-ENV `EMAIL_PASS` prüfen. |
| Cron lief nicht (kein Mail Mo. früh, keine Follow-Ups) | Vercel → Functions → Logs → Filter `cron` oder `process-followups`. Manuell antriggern: siehe Handbuch D6.      |
| Dashboard ist leer / lädt ewig                         | Browser-Tab schließen, neu öffnen. Wenn weiter leer → Vercel → Status-Page checken; Google Sheets API hängt manchmal kurz. |
| GA zeigt keine Besucher                                | Aktuell **vor DSGVO-Banner-Update** noch normal. Sobald Banner kommt: Besucher müssen zustimmen, sonst keine Daten. |
| Etwas anderes Komisches                                | Vercel-Logs sind die Wahrheit: vercel.com → Project → Functions → letzte 100 Aufrufe → nach `error` filtern.    |

---

## 6. Sicherheits-Hygiene (in 5 Minuten erledigt)

- **Admin-Passwort** alle ~6 Monate rotieren: in Vercel `ADMIN_PASSWORD` ändern → einmal Redeploy auslösen → einmal neu einloggen.
- **Service-Account-Key** (Google Sheets) **niemals** in Repo, niemals per Mail teilen. Nur in Vercel als ENV.
- **LinkedIn-Token** alle 60 Tage erneuern (siehe Monatsroutine).
- **Mollie-API-Key** nur in Vercel. Wenn jemals geleakt: my.mollie.com → neuen Key generieren → in Vercel ersetzen → Redeploy.
- **Niemals** Anhänge oder „komische" Inhalte aus der Freigabe-Queue auf eigene Faust freigeben. Lieber kurz nachfragen.

---

## 7. Wichtige Links & Konten

| Wozu                          | Link                                                       |
| ----------------------------- | ---------------------------------------------------------- |
| Dein Dashboard                | https://www.derhefter.com/dashboard                        |
| Vercel-Hosting                | https://vercel.com/dashboard                               |
| Google Sheets (Daten)         | https://drive.google.com/ → Ordner „KI-Kompass"            |
| Google Cloud (Service Account)| https://console.cloud.google.com/iam-admin/serviceaccounts |
| Mollie (Zahlungen)            | https://my.mollie.com/                                     |
| LinkedIn Developer            | https://www.linkedin.com/developers/apps                   |
| OpenAI (Blog-Generator)       | https://platform.openai.com/                               |
| GitHub Repo                   | https://github.com/derhefter/KI-Kompass-2.0                |
| Eigene Mail (Posteingang)     | ki-kompass@derhefter.com                                   |

---

## 8. Was du **nicht** anfassen musst

- Code-Dateien im `src/`-Ordner (außer du willst bewusst etwas am Inhalt ändern wie Preise, FAQs, Texte).
- Spalten in Google Sheets, die das System automatisch füllt — siehe Admin-Handbuch D5 „NICHT direkt bearbeiten".
- Cron-Schedules in `vercel.json` — laufen wie sie sollen.

---

## 9. Bekannte offene Themen (Stand 2026-04-26)

Damit du weißt, was im Hintergrund noch ansteht (Details im Admin-Handbuch B1b):

1. **Kritisch:** Bestellungen für `kurs`, `toolbox-*`, `benchmark`, `monitoring-*` führen aktuell wegen eines Routing-Konflikts dazu, dass der Kunde nach Bezahlung **nicht** auf seiner Zugangsseite landet. Bis Fix: solche Käufe **manuell** per Mail mit Zugangscode bedienen.
2. Blog-Inhalte werden derzeit unsanitisiert gerendert — solange du der einzige bist, der Sheet-Schreibrechte hat, ist das kein akutes Risiko, sollte aber gefixt werden.
3. DSGVO-Consent-Banner für Google Analytics fehlt noch — rechtlich relevant.
4. Backup der Google Sheets ist nicht eingerichtet — manuell ab und zu „Datei → Herunterladen → xlsx" zur Sicherheit.

Sobald die Härtungs-Phase 1 + 2 (siehe Plan im `~/.claude/plans/`-Ordner bzw. künftiger PR) durch ist, verschwinden diese Punkte aus der Liste.

---

**Letzte Aktualisierung:** 2026-04-26

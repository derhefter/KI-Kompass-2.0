# Dependencies Audit – KI-Kompass V2

**Stand:** 2026-04-26
**Quelle:** `npm audit` auf der gepflegten lockfile.

## Übersicht

| Total | Critical | High | Moderate | Low |
|-------|----------|------|----------|-----|
| 6     | 0        | 4    | 2        | 0   |

Keine kritischen Lücken. Alle High-Findings sind **DoS** oder **SMTP-Header-Injection**, keine RCE/Datenleck-Vektoren.

---

## Befunde im Detail

### 🟡 Direct: `nodemailer` (high) → Update auf v8.0.6 empfohlen

| CVE / Advisory | Schwere | Relevanz für uns |
|---|---|---|
| [GHSA-rcmh-qjqh-p98v](https://github.com/advisories/GHSA-rcmh-qjqh-p98v) – addressparser DoS | high | Niedrig: Adressen kommen von uns selbst (kontrolliert), nicht von externen Bots. |
| [GHSA-vvjj-xcjg-gr5g](https://github.com/advisories/GHSA-vvjj-xcjg-gr5g) – SMTP CRLF Injection in transport name | moderate | **Bereits mitigiert**: Wir setzen den Transport-Namen statisch; trotzdem Update wertvoll. |
| [GHSA-c7w3-x93f-qmm8](https://github.com/advisories/GHSA-c7w3-x93f-qmm8) – envelope.size SMTP-Injection | low | Wir setzen `envelope.size` nicht. |
| [GHSA-mm7p-fcc7-pg87](https://github.com/advisories/GHSA-mm7p-fcc7-pg87) – Email an unbeabsichtigte Domain | moderate | Empfänger-Adressen kommen aus Sheets/Mollie-Metadata, sollten sauber sein. `sanitizeEmailField` in `mail.js` filtert CRLF. |

**Empfehlung:** Update auf `nodemailer@8.0.6`. Major-Bump, aber API ist seit v6 weitestgehend stabil. Risiko: niedrig.

**Vorgehen:**
```bash
npm install nodemailer@^8.0.6
npm run build               # muss grün bleiben
# Manuell testen: Health-Check via Dashboard, mail: { ok: true }
git commit -am "deps: nodemailer 6.x -> 8.0.6 (sec advisories)"
git push                    # triggert Vercel-Deploy
```

Falls der Build bricht: Nodemailer-Migration-Notes prüfen (https://nodemailer.com/about/upgrade/). In der Praxis fast immer kompatibel — wir nutzen nur `createTransport`, `sendMail`, `verify`.

---

### 🟡 Direct: `next` (high) → Update auf v16.2.4 empfohlen, aber MAJOR-Sprung

| CVE | Schwere | Relevanz |
|---|---|---|
| GHSA-9g9p-9gw9-jx7f – Image Optimizer DoS | moderate | Wir nutzen Next-Images. **Relevant.** |
| GHSA-h25m-26qc-wcjf – HTTP request deserialization DoS (RSC) | high | Wir nutzen kaum RSC, aber latente Gefahr. |
| GHSA-ggv3-7p47-pfv8 – HTTP request smuggling in rewrites | moderate | Wir haben Rewrites in `next.config.js`. Relevant. |
| GHSA-3x4c-7xq6-9pq8 – Unbounded next/image disk cache | moderate | Auf Vercel weniger relevant (managed). |
| GHSA-q4gf-8mx6-v5v3 – DoS with Server Components | high | Wir nutzen App Router → relevant. |

**Empfehlung:** Update **nicht** in einem Aufwasch. Sprung von Next.js **14.2 → 16.2** = zwei Major-Versionen. Breaking Changes u.a.:

- App Router: geänderte Caching-Defaults (Next 15)
- `headers()`/`cookies()` async (Next 15)
- React 19 als Default (Next 15)
- Mehrere `next/*` Imports umbenannt (Next 16)

**Vorgehen (eigener PR, ~½ Tag Arbeit):**

1. `npm install next@15.x react@19 react-dom@19` (Zwischenschritt)
2. Migration-Codemod: `npx @next/codemod@latest`
3. Alle Pages testen (Dashboard, Assessment, Premium, Blog)
4. Wenn 15 läuft: weiter auf 16
5. Erst dann mergen + deployen

**Bis dahin Mitigation:**
- Image Optimizer: in `next.config.js` ggf. `images.remotePatterns` einschränken (haben wir nicht aktiv → kein akutes Risiko).
- Rewrites: unsere sind statisch (`/toolbox` → `/#preise` etc.), kein User-Input → kein Smuggling-Risiko.
- DoS-Vektoren generell: Vercel-Edge hat eigene Rate-Limits → zusätzliche Pufferschicht.

**Risiko aktuell:** akzeptabel zum Verschieben, sollte aber im Q3 angegangen werden.

---

### 🟢 Direct: `postcss` (moderate)

XSS in CSS-Stringifier. Wir nutzen PostCSS nur via Next/Tailwind im Build — kein User-Input geht durch. **Wird mit Next-Update mitgefixt.**

### 🟢 Transitive: `minimatch`, `picomatch`, `brace-expansion` (high/moderate)

ReDoS-Issues in Glob-Pattern-Matching. Wir matchen keine User-Input-Patterns. Werden auto-gefixt mit `npm audit fix` (kein --force nötig).

---

## Empfohlene Reihenfolge

### Sofort (5 Min, geringes Risiko)

```bash
cd KI-Kompass-V2
npm audit fix              # fixt minimatch/picomatch/brace-expansion (transitiv)
npm run build              # muss grün bleiben
git diff package-lock.json # sanity-check
git commit -am "deps: npm audit fix für transitive Glob-Pattern-Vulns"
```
→ Bringt 4 von 6 Findings weg.

### Diese Woche (15 Min, Major-Bump nodemailer)

```bash
npm install nodemailer@^8.0.6
npm run build
# Health-Check nach Deploy → mail.ok prüfen
git commit -am "deps: nodemailer 6.x → 8.0.6 (sec advisories)"
```

→ Bringt nodemailer auf grün. **Vorher Vercel-Deploy-Limit-Reset abwarten.**

### Q3 / freier Slot (½ Tag, Next.js Major-Migration)

Eigener PR, eigene Branch, eigenes Risiko-Budget.
→ Bringt next + postcss auf grün.

---

## Nach kompletter Bereinigung

Erwartetes Ergebnis: `0 vulnerabilities` für eine ganze Weile. Dependencies-Audit dann als monatlichen Routine-Task einplanen (siehe `BEDIENUNGSANLEITUNG.md` → Monatsroutine, `npm audit` einmal anwerfen).

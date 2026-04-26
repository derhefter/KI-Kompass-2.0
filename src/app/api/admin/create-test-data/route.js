// ============================================================
// TEST-DATEN – Erstellt 3 Freigaben + 3 Blog-Entwürfe zum Testen
// Nach dem Test die Einträge im Dashboard ablehnen/löschen.
// ============================================================
import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../../lib/admin-auth'
import { saveToQueue } from '../../../../lib/content-queue'
import { saveDraft } from '../../../../lib/blog-sheets'

// ── 3 Freigaben-Testeinträge ─────────────────────────────────

const TEST_QUEUE_ITEMS = [
  {
    type: 'assessment',
    recipientName: 'Max Mustermann',
    recipientEmail: 'test@beispiel.de',
    companyName: 'Mustermann GmbH',
    subject: 'Ihr KI-Readiness Assessment – Mustermann GmbH (72%)',
    metadata: { percentage: 72, level: 3, levelTitle: 'KI-Anwender', plan: 'premium' },
    attachmentHtml: '',
    htmlContent: `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1e293b;">
      <div style="background:linear-gradient(135deg,#1e3a5f,#2563eb);padding:28px 24px;border-radius:12px 12px 0 0;text-align:center;">
        <h1 style="color:white;margin:0;font-size:22px;">Ihr KI-Readiness Assessment</h1>
        <p style="color:#93c5fd;margin:8px 0 0;font-size:14px;">KI-Kompass – Persönliche Auswertung</p>
      </div>
      <div style="background:white;padding:28px 24px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;">
        <p style="font-size:16px;">Hallo Max,</p>
        <p>vielen Dank für die Teilnahme am KI-Kompass Assessment. Hier ist Ihre persönliche Auswertung.</p>
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:20px;text-align:center;margin:20px 0;">
          <div style="font-size:48px;font-weight:bold;color:#1d4ed8;">72%</div>
          <div style="color:#3b82f6;font-weight:600;font-size:16px;margin-top:4px;">KI-Anwender</div>
          <div style="color:#64748b;font-size:13px;margin-top:8px;">Ihr Unternehmen nutzt KI bereits punktuell und hat gutes Wachstumspotenzial.</div>
        </div>
        <h2 style="font-size:16px;color:#1e293b;">Ihre Kategorie-Ergebnisse</h2>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;background:#f8fafc;">Datenstrategie</td><td style="padding:8px 12px;border:1px solid #e2e8f0;text-align:right;font-weight:bold;color:#2563eb;">78%</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;background:#f8fafc;">Prozessautomatisierung</td><td style="padding:8px 12px;border:1px solid #e2e8f0;text-align:right;font-weight:bold;color:#2563eb;">65%</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;background:#f8fafc;">Team &amp; Kompetenzen</td><td style="padding:8px 12px;border:1px solid #e2e8f0;text-align:right;font-weight:bold;color:#2563eb;">71%</td></tr>
          <tr><td style="padding:8px 12px;border:1px solid #e2e8f0;background:#f8fafc;">KI-Infrastruktur</td><td style="padding:8px 12px;border:1px solid #e2e8f0;text-align:right;font-weight:bold;color:#2563eb;">74%</td></tr>
        </table>
        <p style="margin-top:24px;font-size:14px;color:#475569;">Mit freundlichen Grüßen,<br><strong>Steffen Hefter</strong><br>KI-Berater, frimalo</p>
      </div>
    </body></html>`,
  },
  {
    type: 'certificate',
    recipientName: 'Anna Schmidt',
    recipientEmail: 'anna.schmidt@test.de',
    companyName: 'Schmidt & Partner',
    subject: 'Ihr KI-Kompass Zertifikat – Schmidt & Partner',
    metadata: { percentage: 85, level: 4, levelTitle: 'KI-Pionier', certificateId: 'CERT-TEST-001', productLabel: 'Premium', filename: 'ki-kompass-zertifikat-schmidt.pdf' },
    htmlContent: `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1e293b;">
      <div style="background:linear-gradient(135deg,#064e3b,#059669);padding:28px 24px;border-radius:12px 12px 0 0;text-align:center;">
        <h1 style="color:white;margin:0;font-size:22px;">Ihr KI-Kompass Zertifikat</h1>
        <p style="color:#a7f3d0;margin:8px 0 0;font-size:14px;">ist bereit zum Download</p>
      </div>
      <div style="background:white;padding:28px 24px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;">
        <p style="font-size:16px;">Hallo Anna,</p>
        <p>herzlichen Glückwunsch! Ihr Zertifikat ist beigefügt.</p>
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;text-align:center;margin:20px 0;">
          <div style="font-size:36px;margin-bottom:8px;">🏅</div>
          <div style="font-size:20px;font-weight:bold;color:#065f46;">KI-Pionier</div>
          <div style="color:#047857;font-size:14px;margin-top:4px;">85% KI-Readiness-Score</div>
          <div style="color:#64748b;font-size:12px;margin-top:8px;">Zertifikat-ID: CERT-TEST-001</div>
        </div>
        <p style="font-size:14px;color:#475569;">Mit freundlichen Grüßen,<br><strong>Steffen Hefter</strong></p>
      </div>
    </body></html>`,
    attachmentHtml: `<!DOCTYPE html><html><body style="font-family:Georgia,serif;width:794px;height:1123px;margin:0;padding:60px;box-sizing:border-box;background:#fafaf8;border:3px solid #1e3a5f;">
      <div style="text-align:center;border:1px solid #cbd5e1;padding:40px;height:calc(100% - 80px);box-sizing:border-box;">
        <div style="color:#1e3a5f;font-size:13px;letter-spacing:4px;text-transform:uppercase;margin-bottom:32px;">KI-Kompass von frimalo</div>
        <div style="font-size:40px;margin:16px 0;">🏅</div>
        <h1 style="font-size:36px;color:#1e3a5f;margin:0 0 8px;font-weight:normal;">Zertifikat</h1>
        <p style="color:#64748b;font-size:15px;">Hiermit wird bestätigt, dass</p>
        <p style="font-size:28px;color:#1e3a5f;font-style:italic;margin:8px 0;">Anna Schmidt</p>
        <p style="color:#475569;font-size:15px;">für <strong>Schmidt &amp; Partner</strong></p>
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px 32px;display:inline-block;margin:24px 0;">
          <div style="font-size:32px;font-weight:bold;color:#1d4ed8;">85%</div>
          <div style="color:#3b82f6;font-weight:600;">KI-Pionier</div>
        </div>
        <p style="color:#475569;font-size:14px;">im KI-Kompass Assessment erreicht hat.</p>
        <div style="margin-top:48px;border-top:1px solid #e2e8f0;padding-top:24px;font-size:12px;color:#94a3b8;">
          CERT-TEST-001 · ${new Date().toLocaleDateString('de-DE')}
        </div>
      </div>
    </body></html>`,
  },
  {
    type: 'invoice',
    recipientName: 'Thomas Weber',
    recipientEmail: 'thomas.weber@firma.de',
    companyName: 'Weber Consulting',
    subject: 'Ihre Rechnung – KI-Kompass Strategie-Paket',
    metadata: {
      plan: 'strategie',
      planName: 'Strategie-Paket',
      planPrice: '€497',
      netto: 417.65,
      ust: 79.35,
      brutto: 497.00,
      zahlungsziel: '14',
      datum: new Date().toLocaleDateString('de-DE'),
      invoiceNumber: '',
      accessCode: 'TEST-CODE-123',
      accessLink: 'https://www.derhefter.com/premium?code=TEST-CODE-123',
    },
    htmlContent: `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1e293b;">
      <div style="background:linear-gradient(135deg,#7c2d12,#ea580c);padding:28px 24px;border-radius:12px 12px 0 0;text-align:center;">
        <h1 style="color:white;margin:0;font-size:22px;">Ihre Bestellung ist eingegangen</h1>
        <p style="color:#fed7aa;margin:8px 0 0;font-size:14px;">KI-Kompass – Strategie-Paket</p>
      </div>
      <div style="background:white;padding:28px 24px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;">
        <p style="font-size:16px;">Hallo Thomas,</p>
        <p>vielen Dank für Ihre Bestellung. Ihre Rechnung und den Zugangs-Code finden Sie anbei.</p>
        <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:12px;padding:20px;margin:20px 0;">
          <p style="margin:0 0 8px;font-weight:bold;color:#9a3412;">Ihr Zugangs-Code</p>
          <p style="font-family:monospace;font-size:20px;color:#ea580c;margin:0;letter-spacing:2px;">TEST-CODE-123</p>
        </div>
        <p style="font-size:14px;color:#475569;">Die Rechnung ist als PDF beigefügt. Zahlungsziel: 14 Tage.</p>
        <p style="font-size:14px;color:#475569;">Mit freundlichen Grüßen,<br><strong>Steffen Hefter</strong></p>
      </div>
    </body></html>`,
    attachmentHtml: `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;width:794px;margin:0;padding:48px;box-sizing:border-box;color:#1e293b;font-size:13px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:40px;">
        <div><strong style="font-size:18px;color:#1e3a5f;">frimalo</strong><br>Steffen Hefter<br>Musterstraße 1<br>06108 Halle (Saale)</div>
        <div style="text-align:right;"><h1 style="font-size:24px;color:#1e3a5f;margin:0 0 4px;">RECHNUNG</h1><div style="color:#64748b;">[RE-XXXX]<br>${new Date().toLocaleDateString('de-DE')}</div></div>
      </div>
      <div style="margin-bottom:32px;"><strong>Rechnungsempfänger:</strong><br>Thomas Weber<br>Weber Consulting</div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <thead><tr style="background:#1e3a5f;color:white;"><th style="padding:10px 12px;text-align:left;">Leistung</th><th style="padding:10px 12px;text-align:right;">Betrag</th></tr></thead>
        <tbody>
          <tr><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;">KI-Kompass Strategie-Paket</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;text-align:right;">417,65 €</td></tr>
          <tr><td style="padding:10px 12px;color:#64748b;">zzgl. 19% MwSt.</td><td style="padding:10px 12px;text-align:right;color:#64748b;">79,35 €</td></tr>
          <tr style="font-weight:bold;"><td style="padding:12px;background:#f8fafc;">Gesamtbetrag</td><td style="padding:12px;background:#f8fafc;text-align:right;color:#1e3a5f;font-size:16px;">497,00 €</td></tr>
        </tbody>
      </table>
      <p style="color:#64748b;font-size:12px;">Zahlungsziel: 14 Tage · IBAN: DE00 0000 0000 0000 0000 00</p>
    </body></html>`,
  },
]

// ── 3 Blog-Entwürfe ──────────────────────────────────────────

const TEST_BLOG_DRAFTS = [
  {
    id: `ART-TEST-${Date.now()}-1`,
    slug: 'ki-im-mittelstand-praxisbeispiele-2026',
    title: 'KI im Mittelstand: 5 Praxisbeispiele die wirklich funktionieren',
    excerpt: 'Viele KMU fragen sich, ob KI wirklich für sie geeignet ist. Diese fünf konkreten Beispiele aus dem deutschen Mittelstand zeigen: Ja – und zwar ohne riesiges IT-Budget.',
    category: 'Praxisbeispiele',
    topic: 'KI-Erfolgsbeispiele aus dem Mittelstand',
    content: `<h2>KI im Mittelstand: Zwischen Hype und echtem Nutzen</h2>
<p>Künstliche Intelligenz ist kein Thema mehr nur für Konzerne. Immer mehr mittelständische Unternehmen in Deutschland setzen KI-Werkzeuge produktiv ein – oft mit überschaubarem Aufwand und messbarem Ergebnis.</p>
<h3>1. Automatisierte Rechnungsverarbeitung beim Metallbaubetrieb</h3>
<p>Ein Metallbaubetrieb aus Sachsen-Anhalt mit 45 Mitarbeitern verarbeitet heute rund 300 Eingangsrechnungen pro Monat vollautomatisch. Die KI erkennt Lieferant, Betrag und Kostenstelle – der Buchhalter prüft nur noch Ausnahmen. Zeitersparnis: 12 Stunden pro Monat.</p>
<h3>2. KI-gestützter Kundenservice beim Fachhandel</h3>
<p>Ein Werkzeugfachhändler in Bayern nutzt einen KI-Chatbot für häufige Anfragen zu Lieferzeiten und Produktverfügbarkeit. 70% der eingehenden Chat-Anfragen werden vollständig automatisch beantwortet – rund um die Uhr.</p>
<h3>3. Predictive Maintenance in der Produktion</h3>
<p>Ein Maschinenbauer aus Baden-Württemberg überwacht seine Fertigungsanlagen mit KI-Sensoren. Ungeplante Stillstandszeiten sanken im ersten Jahr um 34%. Der ROI war nach 8 Monaten erreicht.</p>
<h3>4. Personalisierte Angebote im E-Commerce</h3>
<p>Ein mittelständischer Onlinehändler für Bürobedarf verwendet KI zur Produktempfehlung. Der durchschnittliche Warenkorbwert stieg um 18% – ohne zusätzlichen Vertriebsaufwand.</p>
<h3>5. KI-Unterstützung in der Buchhaltung</h3>
<p>Eine Steuerkanzlei mit 12 Mitarbeitern nutzt KI für die Vorklassifizierung von Belegen. Die Bearbeitungszeit pro Mandant sank um durchschnittlich 2,5 Stunden im Monat.</p>
<h2>Fazit: Klein anfangen, konkret denken</h2>
<p>Alle fünf Beispiele haben eines gemeinsam: Sie begannen mit einem konkreten Problem, nicht mit einem großen KI-Projekt. Genau das ist der richtige Ansatz für den Mittelstand.</p>`,
  },
  {
    id: `ART-TEST-${Date.now()}-2`,
    slug: 'chatgpt-fuer-kmu-so-starten-sie-richtig',
    title: 'ChatGPT für KMU: So starten Sie ohne Umwege direkt produktiv',
    excerpt: 'ChatGPT klingt interessant, aber wie nutzt man es konkret im Arbeitsalltag? Diese Schritt-für-Schritt-Anleitung zeigt, womit kleine und mittlere Unternehmen am schnellsten starten sollten.',
    category: 'Tools & Tipps',
    topic: 'Einstieg in ChatGPT für Unternehmen',
    content: `<h2>Warum ChatGPT für KMU besonders interessant ist</h2>
<p>ChatGPT ist eines der wenigen KI-Werkzeuge, das ohne technisches Vorwissen sofort nutzbar ist. Für KMU ohne dedizierte IT-Abteilung ist das ein entscheidender Vorteil.</p>
<h3>Schritt 1: Den richtigen Einstiegspunkt finden</h3>
<p>Fangen Sie nicht mit dem größten Problem an – fangen Sie mit dem lästigsten an. Typische Einstiegs-Anwendungsfälle:</p>
<ul>
<li><strong>E-Mails formulieren:</strong> Angebote, Absagen, Beschwerden – ChatGPT liefert in Sekunden eine professionelle Vorlage.</li>
<li><strong>Texte zusammenfassen:</strong> Lange Reports oder Verträge auf das Wesentliche kürzen.</li>
<li><strong>Ideen generieren:</strong> Produktnamen, Blogtitel, Social-Media-Texte.</li>
</ul>
<h3>Schritt 2: Prompts richtig formulieren</h3>
<p>Die Qualität der Antwort hängt direkt von der Qualität Ihrer Frage ab. Gute Prompts sind konkret, haben einen Kontext und nennen das gewünschte Format.</p>
<p><em>Schlecht:</em> "Schreib mir ein Angebot"<br>
<em>Gut:</em> "Schreib mir ein professionelles Angebot auf Deutsch für einen Malermeister, der einem Privatkunden einen Innenauftrag (3 Zimmer, Wohnfläche 80m²) anbietet. Ton: freundlich-professionell. Länge: max. 1 DIN-A4-Seite."</p>
<h3>Schritt 3: Eigene Prompts sammeln</h3>
<p>Sobald Sie einen Prompt gefunden haben, der gut funktioniert, speichern Sie ihn. Legen Sie eine einfache Textdatei oder ein Notion-Dokument an. Über Zeit entsteht so Ihre eigene Prompt-Bibliothek – ein echter Wettbewerbsvorteil.</p>
<h2>Was Sie bei ChatGPT nie eingeben sollten</h2>
<p>Keine echten Kundendaten, keine Passwörter, keine vertraulichen Verträge. ChatGPT kann Trainingsdaten für OpenAI liefern – im Zweifelsfall alles anonymisieren.</p>`,
  },
  {
    id: `ART-TEST-${Date.now()}-3`,
    slug: 'ki-foerderung-mittelstand-2026',
    title: 'KI-Förderung für den Mittelstand: Diese Programme gibt es 2026',
    excerpt: 'Wer KI-Projekte im Unternehmen umsetzen möchte, muss nicht alles selbst finanzieren. Ein Überblick über aktuelle Förderprogramme für KMU in Deutschland.',
    category: 'Förderung',
    topic: 'Förderprogramme für KI-Einführung im KMU',
    content: `<h2>Förderung für KI: Warum jetzt der richtige Zeitpunkt ist</h2>
<p>Bund und Länder investieren erheblich in die Digitalisierung des Mittelstands. Wer jetzt plant, kann einen erheblichen Teil seiner KI-Investitionen fördern lassen.</p>
<h3>1. go-digital (Bundesministerium für Wirtschaft)</h3>
<p>Das Programm fördert Beratungsleistungen zur Digitalisierung mit bis zu 50% Zuschuss. KI-Strategie und -Einführung sind explizit förderfähig. Antragsberechtigt sind Unternehmen mit weniger als 100 Mitarbeitern und einem Jahresumsatz unter 20 Millionen Euro.</p>
<p><strong>Förderhöhe:</strong> Bis zu 16.500 € Zuschuss pro Unternehmen.</p>
<h3>2. Digital Jetzt (BMWK)</h3>
<p>Fördert Investitionen in digitale Technologien und die Qualifizierung der Mitarbeiter. KI-Software, Hardware und Schulungen sind förderfähig.</p>
<p><strong>Förderhöhe:</strong> 15–50% der förderfähigen Ausgaben, je nach Unternehmensgröße.</p>
<h3>3. Länderprogramme</h3>
<p>Viele Bundesländer haben eigene Digitalisierungsförderungen, die sich mit Bundesprogrammen kombinieren lassen. Sachsen-Anhalt, Bayern und NRW haben besonders aktive Programme.</p>
<h3>Wie beantrage ich Förderung?</h3>
<ol>
<li>Prüfen, ob Ihr Unternehmen die Grundvoraussetzungen erfüllt</li>
<li>Antrag <strong>vor</strong> Projektbeginn stellen (rückwirkende Förderung ist ausgeschlossen)</li>
<li>Förderberater hinzuziehen – die meisten IHKs bieten kostenlose Erstberatungen an</li>
</ol>
<h2>Fazit</h2>
<p>Es gibt kaum ein besseres Argument, ein KI-Projekt jetzt anzugehen als: "Der Staat zahlt die Hälfte." Nutzen Sie die Fenster, solange sie offen sind.</p>`,
  },
]

// ── Handler ──────────────────────────────────────────────────

export async function POST(request) {
  const unauthorized = requireAdmin(request)
  if (unauthorized) return unauthorized

  const queueResults = []
  const queueErrors = []
  const blogResults = []
  const blogErrors = []

  // Freigaben-Einträge
  for (const item of TEST_QUEUE_ITEMS) {
    try {
      const queueId = await saveToQueue(item)
      queueResults.push({ type: item.type, recipient: item.recipientName, queueId })
    } catch (err) {
      queueErrors.push({ type: item.type, error: err.message })
    }
  }

  // Blog-Entwürfe
  for (const draft of TEST_BLOG_DRAFTS) {
    try {
      const saved = await saveDraft(draft)
      blogResults.push({ title: draft.title, saved })
    } catch (err) {
      blogErrors.push({ title: draft.title, error: err.message })
    }
  }

  const allOk = queueErrors.length === 0 && blogErrors.length === 0

  return NextResponse.json({
    success: allOk,
    queue: { created: queueResults.length, results: queueResults, errors: queueErrors.length > 0 ? queueErrors : undefined },
    blog: { created: blogResults.length, results: blogResults, errors: blogErrors.length > 0 ? blogErrors : undefined },
  })
}

// ============================================================
// FOLLOW-UP EMAIL SYSTEM - KI-Kompass V2
// ============================================================
// Automatische E-Mail-Sequenzen nach Free Assessment
// Tag 1: Quick-Wins | Tag 3: Social Proof | Tag 7: Angebot | Tag 14: Letzte Chance
// ============================================================

const FOLLOW_UP_TYPES = ['day1', 'day3', 'day7', 'day14']
const FOLLOW_UP_DELAYS = { day1: 1, day3: 3, day7: 7, day14: 14 }

export function getFollowUpSchedule(baseDate = new Date()) {
  return FOLLOW_UP_TYPES.map((type) => ({
    type,
    sendAt: new Date(baseDate.getTime() + FOLLOW_UP_DELAYS[type] * 24 * 60 * 60 * 1000).toISOString(),
  }))
}

export function getFollowUpEmailHTML(type, data) {
  const { company = 'Ihr Unternehmen', score = 0, level = 1, levelTitle = 'Einsteiger' } = data
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ki-kompass.de'

  const header = `
    <div style="background:linear-gradient(135deg,#2563eb,#1e40af);padding:24px;text-align:center;">
      <h1 style="color:white;margin:0;font-size:20px;">KI-Kompass</h1>
    </div>`

  const footer = `
    <div style="padding:16px;text-align:center;font-size:12px;color:#9ca3af;border-top:1px solid #e5e7eb;">
      <p>frimalo &ndash; Steffen Hefter | Wilhelm-Schrader-Str. 27a, 06120 Halle (Saale)</p>
      <p>Sie erhalten diese E-Mail, weil Sie den kostenlosen KI-Readiness Check durchgef&uuml;hrt haben.</p>
    </div>`

  const cta = `
    <div style="text-align:center;margin:24px 0;">
      <a href="${baseUrl}/anfrage?plan=premium" style="display:inline-block;background:#2563eb;color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;">Premium Report anfragen (€197)</a>
    </div>`

  const templates = {
    day1: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        ${header}
        <div style="padding:32px;">
          <h2 style="color:#1e3a8a;">3 Quick-Wins f&uuml;r Ihr KI-Level</h2>
          <p>Hallo,</p>
          <p>gestern haben Sie den KI-Readiness Check f&uuml;r <strong>${company}</strong> durchgef&uuml;hrt und dabei <strong>${score}% (Level ${level}: ${levelTitle})</strong> erreicht.</p>
          <p>Hier sind <strong>3 sofort umsetzbare Tipps</strong> f&uuml;r Ihr Level:</p>

          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;margin:16px 0;">
            <h3 style="margin-top:0;color:#166534;">Quick-Win 1: KI-Tools im Alltag testen</h3>
            <p>Testen Sie diese Woche ChatGPT oder Microsoft Copilot f&uuml;r eine allt&auml;gliche Aufgabe: z.B. E-Mail-Entwurf, Meeting-Zusammenfassung oder Recherche.</p>
          </div>

          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;margin:16px 0;">
            <h3 style="margin-top:0;color:#166534;">Quick-Win 2: Prozesse identifizieren</h3>
            <p>Listen Sie 5 wiederkehrende Aufgaben auf, die viel Zeit kosten. Mindestens 2 davon lassen sich mit KI automatisieren.</p>
          </div>

          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;margin:16px 0;">
            <h3 style="margin-top:0;color:#166534;">Quick-Win 3: Team einbinden</h3>
            <p>Sprechen Sie in Ihrem n&auml;chsten Team-Meeting 10 Minuten &uuml;ber KI-M&ouml;glichkeiten. Fragen Sie: &bdquo;Welche Aufgabe w&uuml;rdet ihr gerne automatisieren?&ldquo;</p>
          </div>

          <p>M&ouml;chten Sie einen <strong>detaillierten Fahrplan mit individuellen Empfehlungen</strong> f&uuml;r ${company}?</p>
          ${cta}
          <p>Beste Gr&uuml;&szlig;e<br>Steffen Hefter<br>frimalo &ndash; KI-Beratung</p>
        </div>
        ${footer}
      </div>`,

    day3: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        ${header}
        <div style="padding:32px;">
          <h2 style="color:#1e3a8a;">So nutzen andere KMU K&uuml;nstliche Intelligenz</h2>
          <p>Hallo,</p>
          <p>vor 3 Tagen haben Sie den KI-Check mit <strong>${score}%</strong> abgeschlossen. Wussten Sie, dass immer mehr KMU KI bereits erfolgreich einsetzen?</p>

          <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:16px 0;">
            <h3 style="margin-top:0;color:#1e40af;">Handwerksbetrieb spart 8 Stunden/Woche</h3>
            <p style="color:#374151;">Ein Elektrobetrieb aus Sachsen nutzt KI f&uuml;r automatische Angebotserstellung und digitale Dokumentation. <strong>Ergebnis:</strong> 8 Stunden weniger B&uuml;roarbeit pro Woche.</p>
          </div>

          <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:16px 0;">
            <h3 style="margin-top:0;color:#1e40af;">Dienstleister steigert Conversion um 35%</h3>
            <p style="color:#374151;">Eine Beratungsfirma setzt einen KI-Chatbot auf ihrer Website ein. <strong>Ergebnis:</strong> 35% mehr qualifizierte Anfragen bei gleichem Marketing-Budget.</p>
          </div>

          <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:16px 0;">
            <h3 style="margin-top:0;color:#1e40af;">Produzent reduziert Fehlerquote um 60%</h3>
            <p style="color:#374151;">Ein mittelst&auml;ndischer Hersteller nutzt KI-gest&uuml;tzte Qualit&auml;tskontrolle. <strong>Ergebnis:</strong> Fehlerquote von 5% auf 2% gesenkt.</p>
          </div>

          <p><strong>Was k&ouml;nnte KI f&uuml;r ${company} bewirken?</strong> Unser Premium Report zeigt Ihnen genau das.</p>
          ${cta}
          <p>Beste Gr&uuml;&szlig;e<br>Steffen Hefter</p>
        </div>
        ${footer}
      </div>`,

    day7: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        ${header}
        <div style="padding:32px;">
          <h2 style="color:#1e3a8a;">Ihr individueller KI-Fahrplan f&uuml;r ${company}</h2>
          <p>Hallo,</p>
          <p>vor einer Woche haben Sie Ihren KI-Readiness Score erfahren: <strong>${score}% (${levelTitle})</strong>.</p>
          <p>Haben Sie schon erste Schritte umgesetzt? Falls ja &ndash; toll! Falls nicht, ist jetzt der perfekte Zeitpunkt.</p>

          <div style="background:#fef3c7;border:2px solid #f59e0b;border-radius:8px;padding:20px;margin:20px 0;text-align:center;">
            <p style="margin:0 0 8px;font-size:18px;font-weight:bold;color:#92400e;">Sonderangebot diese Woche</p>
            <p style="margin:0;font-size:14px;color:#78350f;">Bestellen Sie den <strong>Premium Report</strong> und erhalten Sie zus&auml;tzlich unsere <strong>KI-Policy-Vorlage</strong> (Wert: €49) gratis dazu!</p>
          </div>

          <h3 style="color:#1e3a8a;">Was Sie im Premium Report erhalten:</h3>
          <ul style="color:#374151;">
            <li>20+ Seiten individueller Report</li>
            <li>Detaillierte Analyse aller 6 KI-Bereiche</li>
            <li>Priorisierte Handlungsempfehlungen</li>
            <li>6-Monats-Roadmap f&uuml;r Ihr Unternehmen</li>
            <li>Tool-Empfehlungen passend zu Ihrem Level</li>
            <li>F&ouml;rdermittel-&Uuml;bersicht</li>
          </ul>
          ${cta}
          <p>Beste Gr&uuml;&szlig;e<br>Steffen Hefter</p>
        </div>
        ${footer}
      </div>`,

    day14: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        ${header}
        <div style="padding:32px;">
          <h2 style="color:#1e3a8a;">Letzte Erinnerung: Ihr KI-Potenzial wartet</h2>
          <p>Hallo,</p>
          <p>vor zwei Wochen haben Sie den KI-Check f&uuml;r ${company} gemacht. Seitdem hat sich die KI-Welt weiterentwickelt &ndash; und Ihre Wettbewerber ebenfalls.</p>

          <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px;margin:16px 0;">
            <p style="margin:0;color:#991b1b;font-weight:bold;">73% der KMU, die jetzt nicht handeln, verlieren laut Studien in den n&auml;chsten 3 Jahren Marktanteile an KI-nutzende Wettbewerber.</p>
          </div>

          <p>Ihr Score von <strong>${score}%</strong> zeigt: Es gibt konkretes Potenzial. Die Frage ist nicht ob, sondern <strong>wie schnell</strong> Sie es nutzen.</p>

          <p>Dies ist unsere letzte Erinnerung. Danach h&ouml;ren Sie nur noch von uns, wenn Sie es w&uuml;nschen.</p>
          ${cta}
          <p>Ich w&uuml;nsche Ihnen viel Erfolg auf Ihrem KI-Weg!<br>Steffen Hefter<br>frimalo &ndash; KI-Beratung</p>
        </div>
        ${footer}
      </div>`,
  }

  return templates[type] || templates.day1
}

export const FOLLOW_UP_SUBJECTS = {
  day1: (company) => `3 Quick-Wins für ${company} - starten Sie heute mit KI`,
  day3: (company) => `So nutzen andere KMU KI erfolgreich - Inspiration für ${company}`,
  day7: (company) => `Ihr individueller KI-Fahrplan für ${company} (+ Bonus)`,
  day14: (company) => `Letzte Erinnerung: Das KI-Potenzial von ${company}`,
}

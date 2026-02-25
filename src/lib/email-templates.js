// ============================================================
// PRODUKTSPEZIFISCHE E-MAIL-TEMPLATES - KI-Kompass V2
// ============================================================
// Wird vom Mollie-Webhook aufgerufen, um je nach Produkt
// eine passende Bestätigungs-E-Mail an den Kunden zu senden.
// ============================================================

/**
 * Gibt produktspezifische E-Mail-Daten (subject + html) zurück.
 */
export function getCustomerEmailForPlan({ plan, safeName, safeCompany, amount, accessCode, accessLink, expiresAtFormatted, planName }) {
  switch (plan) {
    case 'strategie':
      return getStrategieEmail({ safeName, safeCompany, amount, accessCode, accessLink, expiresAtFormatted, planName })

    case 'zertifikat':
    case 'zertifikat-basic':
      return getZertifikatEmail({ safeName, safeCompany, amount, accessCode, accessLink, expiresAtFormatted, planName, isBasic: plan === 'zertifikat-basic' })

    case 'kurs':
      return getKursEmail({ safeName, safeCompany, amount, accessCode, accessLink, expiresAtFormatted })

    case 'toolbox-starter':
    case 'toolbox-pro':
      return getToolboxEmail({ safeName, safeCompany, amount, planName, isPro: plan === 'toolbox-pro' })

    case 'monitoring-basic':
    case 'monitoring-pro':
      return getMonitoringEmail({ safeName, safeCompany, amount, accessCode, accessLink, expiresAtFormatted, planName, isPro: plan === 'monitoring-pro' })

    case 'benchmark':
      return getBenchmarkEmail({ safeName, safeCompany, amount, accessCode, accessLink, expiresAtFormatted })

    case 'premium':
    default:
      return getPremiumEmail({ safeName, safeCompany, amount, accessCode, accessLink, expiresAtFormatted, planName })
  }
}

// ============================================================
// Wrapper: E-Mail-Grundgerüst
// ============================================================
function wrapEmail({ headerBg, headerTitle, headerSub, bodyHtml }) {
  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><div style="background:${headerBg};color:white;padding:24px;border-radius:12px 12px 0 0;text-align:center;"><h1 style="margin:0;font-size:24px;">${headerTitle}</h1>${headerSub ? `<p style="margin:8px 0 0;opacity:0.9;">${headerSub}</p>` : ''}</div><div style="background:white;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">${bodyHtml}<p style="margin-top:24px;">Bei Fragen antworten Sie einfach auf diese E-Mail.</p><p>Mit freundlichen Gr&uuml;&szlig;en<br><strong>Steffen Hefter</strong><br>frimalo &ndash; KI-Beratung</p></div></div>`
}

function accessCodeBlock(accessCode, accessLink, expiresAtFormatted) {
  return `<div style="background:#ecfdf5;border:2px solid #22c55e;border-radius:12px;padding:24px;margin:24px 0;text-align:center;"><p style="margin:0 0 8px;font-weight:bold;color:#065f46;">Ihr pers&ouml;nlicher Zugangscode:</p><div style="font-size:28px;font-weight:bold;font-family:monospace;color:#1e3a8a;background:white;padding:12px;border-radius:8px;letter-spacing:2px;">${accessCode}</div></div><div style="text-align:center;margin:24px 0;"><a href="${accessLink}" style="display:inline-block;background:#2563eb;color:white;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">Jetzt Premium Assessment starten</a></div><div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px;margin:16px 0;text-align:center;"><p style="margin:0;font-size:14px;color:#991b1b;font-weight:bold;">G&uuml;ltig bis: ${expiresAtFormatted} (7 Tage)</p></div>`
}

// ============================================================
// PREMIUM REPORT (€197) - Standard-Flow
// ============================================================
function getPremiumEmail({ safeName, safeCompany, amount, accessCode, accessLink, expiresAtFormatted, planName }) {
  return {
    subject: `Ihr Zugangscode - KI-Kompass ${planName}`,
    html: wrapEmail({
      headerBg: 'linear-gradient(135deg,#22c55e,#16a34a)',
      headerTitle: 'Zahlung erfolgreich!',
      headerSub: `KI-Kompass ${planName}`,
      bodyHtml: `<h2 style="color:#1e3a8a;margin-top:0;">Vielen Dank, ${safeName}!</h2><p>Ihre Zahlung &uuml;ber <strong>${amount} &euro;</strong> wurde erfolgreich verarbeitet.</p>${accessCodeBlock(accessCode, accessLink, expiresAtFormatted)}<h3 style="color:#1e3a8a;">So geht es weiter:</h3><ol><li>Klicken Sie auf den Button oben oder geben Sie den Zugangscode ein</li><li>Beantworten Sie 30+ Detailfragen zu Ihrem Unternehmen</li><li>Erhalten Sie Ihren individuellen KI-Readiness Report (20+ Seiten) per E-Mail</li></ol>`,
    }),
  }
}

// ============================================================
// STRATEGIE-PAKET (€497) - Premium + Strategiegespräch
// ============================================================
function getStrategieEmail({ safeName, safeCompany, amount, accessCode, accessLink, expiresAtFormatted, planName }) {
  return {
    subject: `Ihr Zugangscode - KI-Kompass ${planName}`,
    html: wrapEmail({
      headerBg: 'linear-gradient(135deg,#22c55e,#16a34a)',
      headerTitle: 'Zahlung erfolgreich!',
      headerSub: `KI-Kompass ${planName}`,
      bodyHtml: `<h2 style="color:#1e3a8a;margin-top:0;">Vielen Dank, ${safeName}!</h2><p>Ihre Zahlung &uuml;ber <strong>${amount} &euro;</strong> f&uuml;r das <strong>Strategie-Paket</strong> wurde erfolgreich verarbeitet.</p>${accessCodeBlock(accessCode, accessLink, expiresAtFormatted)}<h3 style="color:#1e3a8a;">Ihr Strategie-Paket umfasst:</h3><ol><li><strong>Premium Assessment:</strong> Starten Sie jetzt mit dem Button oben (30+ Detailfragen)</li><li><strong>KI-Readiness Report:</strong> Sie erhalten Ihren individuellen Report (20+ Seiten) per E-Mail</li><li><strong>60-Min. Strategiegespr&auml;ch:</strong> Nach Erhalt Ihres Reports vereinbaren wir einen Termin</li><li><strong>Pers&ouml;nliche KI-Strategie:</strong> Basierend auf Ihren Ergebnissen</li><li><strong>F&ouml;rdermittelberatung:</strong> Wir pr&uuml;fen passende F&ouml;rderprogramme</li><li><strong>30 Tage E-Mail-Support:</strong> Fragen jederzeit per E-Mail</li></ol><div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:16px 0;"><p style="margin:0;font-size:14px;color:#1e40af;"><strong>N&auml;chster Schritt:</strong> Starten Sie jetzt das Assessment. Nach Erhalt Ihres Reports melden wir uns f&uuml;r die Terminvereinbarung zum Strategiegespr&auml;ch.</p></div>`,
    }),
  }
}

// ============================================================
// KI-ZERTIFIKAT (€47 Basic / €97 Premium)
// ============================================================
function getZertifikatEmail({ safeName, safeCompany, amount, accessCode, accessLink, expiresAtFormatted, planName, isBasic }) {
  const productLabel = isBasic ? 'Basic Badge' : 'Premium Zertifikat'
  const beschreibung = isBasic
    ? `<ul><li>Digitales KI-Readiness Badge (HTML/PDF)</li><li>Level-Badge f&uuml;r Ihre Website</li><li>Online-Verifizierungslink</li></ul>`
    : `<ul><li>Digitales KI-Readiness Zertifikat (A4, druckoptimiert)</li><li>Detaillierte Score-Aufschl&uuml;sselung nach Kategorien</li><li>Level-Badge f&uuml;r Ihre Website</li><li>Online-Verifizierungslink</li></ul>`

  return {
    subject: `Ihr Zugangscode - KI-Kompass ${productLabel}`,
    html: wrapEmail({
      headerBg: 'linear-gradient(135deg,#22c55e,#16a34a)',
      headerTitle: 'Zahlung erfolgreich!',
      headerSub: `KI-Kompass ${productLabel}`,
      bodyHtml: `<h2 style="color:#1e3a8a;margin-top:0;">Vielen Dank, ${safeName}!</h2><p>Ihre Zahlung &uuml;ber <strong>${amount} &euro;</strong> f&uuml;r das <strong>${productLabel}</strong> wurde erfolgreich verarbeitet.</p>${accessCodeBlock(accessCode, accessLink, expiresAtFormatted)}<h3 style="color:#1e3a8a;">So erhalten Sie Ihr ${productLabel}:</h3><ol><li><strong>Assessment absolvieren:</strong> Klicken Sie auf den Button oben und beantworten Sie die 30+ Detailfragen</li><li><strong>${productLabel} wird erstellt:</strong> Nach Abschluss des Assessments wird Ihr ${productLabel} automatisch generiert</li><li><strong>Per E-Mail erhalten:</strong> Ihr ${productLabel} wird Ihnen als HTML-Datei per E-Mail zugesendet</li></ol><div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:16px 0;"><p style="margin:0 0 8px;font-weight:bold;color:#1e40af;">Ihr ${productLabel} enth&auml;lt:</p>${beschreibung}</div>${isBasic ? '<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;margin:16px 0;"><p style="margin:0;font-size:14px;color:#166534;"><strong>Tipp:</strong> Sie k&ouml;nnen das Badge als Screenshot speichern und auf Ihrer Unternehmenswebsite einbetten. Ein Embed-Code ist in der HTML-Datei enthalten.</p></div>' : ''}`,
    }),
  }
}

// ============================================================
// ONLINE-KURS (€297)
// ============================================================
function getKursEmail({ safeName, safeCompany, amount, accessCode, accessLink, expiresAtFormatted }) {
  const moduleList = [
    { nr: 1, title: 'KI verstehen', dauer: '45 Min.' },
    { nr: 2, title: 'Strategie & Vision', dauer: '60 Min.' },
    { nr: 3, title: 'Daten & Infrastruktur', dauer: '45 Min.' },
    { nr: 4, title: 'Prozesse & Automatisierung', dauer: '60 Min.' },
    { nr: 5, title: 'KI-Tools in der Praxis', dauer: '90 Min.' },
    { nr: 6, title: 'Governance & Compliance', dauer: '45 Min.' },
    { nr: 7, title: 'Roadmap erstellen', dauer: '60 Min.' },
  ]
  const moduleRows = moduleList.map(m => `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:bold;color:#2563eb;">Modul ${m.nr}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${m.title}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;text-align:center;color:#6b7280;">${m.dauer}</td></tr>`).join('')

  return {
    subject: 'Willkommen zum Online-Kurs: KI-Einf\u00fchrung f\u00fcr KMU',
    html: wrapEmail({
      headerBg: 'linear-gradient(135deg,#1e3a8a,#2563eb)',
      headerTitle: 'Willkommen zum Online-Kurs!',
      headerSub: 'KI-Einf&uuml;hrung f&uuml;r KMU &bull; 7 Module &bull; 7+ Stunden',
      bodyHtml: `<h2 style="color:#1e3a8a;margin-top:0;">Herzlich willkommen, ${safeName}!</h2><p>Ihre Zahlung &uuml;ber <strong>${amount} &euro;</strong> f&uuml;r den <strong>Online-Kurs: KI-Einf&uuml;hrung f&uuml;r KMU</strong> wurde erfolgreich verarbeitet.</p><div style="background:#ecfdf5;border:2px solid #22c55e;border-radius:12px;padding:20px;margin:24px 0;text-align:center;"><p style="margin:0;font-size:16px;font-weight:bold;color:#065f46;">Ihr Zugang ist aktiviert!</p><p style="margin:8px 0 0;font-size:14px;color:#064e3b;">Ihre Kursunterlagen werden Ihnen in K&uuml;rze per E-Mail zugesendet.</p></div><h3 style="color:#1e3a8a;">Ihre 7 Module im &Uuml;berblick:</h3><table style="width:100%;border-collapse:collapse;margin:16px 0;"><thead><tr style="background:#f0f4ff;"><th style="padding:8px 12px;border:1px solid #e5e7eb;text-align:left;">Nr.</th><th style="padding:8px 12px;border:1px solid #e5e7eb;text-align:left;">Modul</th><th style="padding:8px 12px;border:1px solid #e5e7eb;text-align:center;">Dauer</th></tr></thead><tbody>${moduleRows}</tbody></table><h3 style="color:#1e3a8a;">Was im Kurs enthalten ist:</h3><ul><li>&Uuml;ber 7 Stunden Videomaterial mit praxisnahen Beispielen</li><li>Arbeitsbl&auml;tter und Worksheets zum Mitmachen</li><li>30+ fertige Prompt-Templates f&uuml;r sofortigen Einsatz</li><li>Quizzes zur Lernkontrolle nach jedem Modul</li><li>Teilnahme-Zertifikat nach erfolgreichem Abschluss</li><li>12 Monate Zugang zu allen Materialien</li></ul><div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:16px 0;"><p style="margin:0;font-size:14px;color:#1e40af;"><strong>N&auml;chster Schritt:</strong> Wir bereiten Ihre Kursunterlagen vor und senden Ihnen diese innerhalb von 24 Stunden per E-Mail zu. Starten Sie dann in Ihrem eigenen Tempo!</p></div>`,
    }),
  }
}

// ============================================================
// KI-TOOLBOX (€29/€49 pro Monat)
// ============================================================
function getToolboxEmail({ safeName, safeCompany, amount, planName, isPro }) {
  const resourcesStarter = [
    'KI-Tool-Empfehlungen (regelm&auml;&szlig;ig aktualisiert)',
    '50+ Prompt-Templates (Marketing, Vertrieb, HR, Buchhaltung)',
    'KI-Policy Vorlage (DSGVO-konform)',
    'Checklisten &amp; Vorlagen f&uuml;r KI-Einf&uuml;hrung',
    'Monatliche Updates mit neuen Ressourcen',
  ]
  const resourcesPro = [
    ...resourcesStarter,
    'Video-Tutorials zu KI-Tools',
    'Branchen-spezifische Vorlagen',
    'Compliance-Templates (EU AI Act, DSFA)',
    'KI-Anbieter-Vergleich (30+ Tools)',
    'Priority E-Mail-Support',
  ]
  const resources = isPro ? resourcesPro : resourcesStarter
  const resourceHtml = resources.map(r => `<li>${r}</li>`).join('')

  return {
    subject: `Willkommen zur ${planName}`,
    html: wrapEmail({
      headerBg: 'linear-gradient(135deg,#059669,#10b981)',
      headerTitle: `Willkommen zur ${planName}!`,
      headerSub: isPro ? 'Professional Membership' : 'Starter Membership',
      bodyHtml: `<h2 style="color:#1e3a8a;margin-top:0;">Herzlich willkommen, ${safeName}!</h2><p>Ihre Zahlung &uuml;ber <strong>${amount} &euro;/Monat</strong> f&uuml;r die <strong>${planName}</strong> wurde erfolgreich verarbeitet.</p><div style="background:#ecfdf5;border:2px solid #22c55e;border-radius:12px;padding:20px;margin:24px 0;text-align:center;"><p style="margin:0;font-size:16px;font-weight:bold;color:#065f46;">Ihre Membership ist aktiviert!</p><p style="margin:8px 0 0;font-size:14px;color:#064e3b;">Ihre Toolbox-Ressourcen werden Ihnen in K&uuml;rze zugesendet.</p></div><h3 style="color:#1e3a8a;">In Ihrer ${isPro ? 'Professional' : 'Starter'} Membership enthalten:</h3><ul>${resourceHtml}</ul><div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:16px 0;"><p style="margin:0;font-size:14px;color:#1e40af;"><strong>N&auml;chster Schritt:</strong> Wir senden Ihnen Ihre Toolbox-Ressourcen innerhalb von 24 Stunden per E-Mail zu. Jeden Monat erhalten Sie automatisch Updates und neue Inhalte.</p></div>`,
    }),
  }
}

// ============================================================
// KI-MONITORING (€49/€99 pro Monat)
// ============================================================
function getMonitoringEmail({ safeName, safeCompany, amount, accessCode, accessLink, expiresAtFormatted, planName, isPro }) {
  const featuresBasic = [
    'Quartalweises KI-Readiness Re-Assessment',
    'Fortschritts-Dashboard mit Score-Verlauf',
    'KI-Newsletter mit aktuellen Entwicklungen',
    'EU AI Act &amp; Regulierungs-Updates',
  ]
  const featuresPro = [
    ...featuresBasic,
    'Pers&ouml;nlicher KI-News-Digest',
    'Branchen-Benchmark Vergleich',
    'Priority E-Mail-Support',
    'J&auml;hrliches Strategie-Update-Gespr&auml;ch',
  ]
  const features = isPro ? featuresPro : featuresBasic
  const featureHtml = features.map(f => `<li>${f}</li>`).join('')

  return {
    subject: `Ihr Zugangscode - KI-Kompass ${planName}`,
    html: wrapEmail({
      headerBg: 'linear-gradient(135deg,#7c3aed,#8b5cf6)',
      headerTitle: 'Zahlung erfolgreich!',
      headerSub: `KI-Kompass ${planName}`,
      bodyHtml: `<h2 style="color:#1e3a8a;margin-top:0;">Vielen Dank, ${safeName}!</h2><p>Ihre Zahlung &uuml;ber <strong>${amount} &euro;/Monat</strong> f&uuml;r <strong>${planName}</strong> wurde erfolgreich verarbeitet.</p>${accessCodeBlock(accessCode, accessLink, expiresAtFormatted)}<h3 style="color:#1e3a8a;">So starten Sie:</h3><ol><li><strong>Erst-Assessment:</strong> Klicken Sie auf den Button oben und absolvieren Sie Ihr erstes KI-Readiness Assessment</li><li><strong>Ergebnisse erhalten:</strong> Sie bekommen Ihren individuellen Report per E-Mail</li><li><strong>Quartals-Updates:</strong> Alle 3 Monate erhalten Sie eine Einladung zum Re-Assessment</li></ol><h3 style="color:#1e3a8a;">Ihr ${isPro ? 'Pro' : 'Basic'} Monitoring umfasst:</h3><ul>${featureHtml}</ul><div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:16px 0;"><p style="margin:0;font-size:14px;color:#1e40af;"><strong>N&auml;chster Schritt:</strong> Starten Sie jetzt Ihr erstes Assessment. Danach richten wir Ihr Monitoring ein.</p></div>`,
    }),
  }
}

// ============================================================
// BRANCHEN-BENCHMARK (€297)
// ============================================================
function getBenchmarkEmail({ safeName, safeCompany, amount, accessCode, accessLink, expiresAtFormatted }) {
  return {
    subject: 'Ihr Zugangscode - KI-Kompass Branchen-Benchmark',
    html: wrapEmail({
      headerBg: 'linear-gradient(135deg,#22c55e,#16a34a)',
      headerTitle: 'Zahlung erfolgreich!',
      headerSub: 'KI-Kompass Branchen-Benchmark Report',
      bodyHtml: `<h2 style="color:#1e3a8a;margin-top:0;">Vielen Dank, ${safeName}!</h2><p>Ihre Zahlung &uuml;ber <strong>${amount} &euro;</strong> f&uuml;r den <strong>Branchen-Benchmark Report</strong> wurde erfolgreich verarbeitet.</p>${accessCodeBlock(accessCode, accessLink, expiresAtFormatted)}<h3 style="color:#1e3a8a;">So erhalten Sie Ihren Benchmark Report:</h3><ol><li><strong>Assessment absolvieren:</strong> Klicken Sie auf den Button oben und beantworten Sie die 30+ Detailfragen</li><li><strong>Benchmark-Vergleich:</strong> Ihre Ergebnisse werden mit anonymisierten Branchendaten verglichen</li><li><strong>Report erhalten:</strong> Ihr umfassender Benchmark Report wird per E-Mail zugesendet</li></ol><div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin:16px 0;"><p style="margin:0 0 8px;font-weight:bold;color:#1e40af;">Ihr Benchmark Report enth&auml;lt:</p><ul><li>Ihren KI-Reifegrad im Branchenvergleich</li><li>Anonymisierte Vergleichsdaten Ihrer Branche</li><li>St&auml;rken- und Schw&auml;chen-Analyse</li><li>Priorisierte Handlungsempfehlungen</li><li>Best Practices aus Ihrer Branche</li></ul></div>`,
    }),
  }
}

// ============================================================
// PDF REPORT GENERATOR - KI-Kompass V2
// ============================================================
// Generiert einen umfassenden, druckfertigen HTML-Report (20+ Seiten)
// der als PDF gespeichert werden kann (Strg+P → PDF speichern)
// ============================================================

// frimalo Logo Base64 (gleich wie in invoice-request)
const FRIMALO_LOGO_BASE64 = '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'

// Tool-Empfehlungen nach Level
const toolEmpfehlungen = {
  1: [
    { name: 'ChatGPT (OpenAI)', kategorie: 'Textgenerierung', beschreibung: 'Einstieg in KI-gestützte Textarbeit: E-Mails, Zusammenfassungen, Brainstorming', kosten: 'Kostenlos / €20/Monat (Plus)' },
    { name: 'Microsoft Copilot', kategorie: 'Office-Assistent', beschreibung: 'KI-Integration in Word, Excel, PowerPoint, Outlook', kosten: '€30/Nutzer/Monat' },
    { name: 'DeepL', kategorie: 'Übersetzung', beschreibung: 'Professionelle KI-Übersetzung für Geschäftsdokumente', kosten: 'Kostenlos / ab €8,74/Monat' },
    { name: 'Canva mit KI', kategorie: 'Design', beschreibung: 'KI-gestützte Erstellung von Präsentationen und Social-Media-Grafiken', kosten: 'Kostenlos / €12/Monat (Pro)' },
  ],
  2: [
    { name: 'Make.com (Integromat)', kategorie: 'Automatisierung', beschreibung: 'Visuelle Workflow-Automatisierung zwischen 1000+ Apps', kosten: 'Kostenlos / ab €9/Monat' },
    { name: 'HubSpot CRM', kategorie: 'Kundenmanagement', beschreibung: 'CRM mit KI-gestütztem Lead-Scoring und E-Mail-Automatisierung', kosten: 'Kostenlos / ab €20/Monat' },
    { name: 'Notion AI', kategorie: 'Wissensmanagement', beschreibung: 'KI-gestütztes Projektmanagement und Dokumentation', kosten: '€8/Nutzer/Monat' },
    { name: 'Jasper AI', kategorie: 'Content-Erstellung', beschreibung: 'KI-gestützte Marketing-Texte und Content-Produktion', kosten: 'Ab €39/Monat' },
  ],
  3: [
    { name: 'Power BI + Copilot', kategorie: 'Datenanalyse', beschreibung: 'KI-gestützte Business Intelligence und Datenvisualisierung', kosten: 'Ab €9,40/Nutzer/Monat' },
    { name: 'Tidio / Intercom', kategorie: 'KI-Chatbot', beschreibung: 'Automatisierter Kundenservice mit KI-Chatbot', kosten: 'Ab €29/Monat' },
    { name: 'Zapier + AI', kategorie: 'Prozessautomatisierung', beschreibung: 'Fortgeschrittene Automatisierung mit KI-Bausteinen', kosten: 'Ab €19,99/Monat' },
    { name: 'Midjourney / DALL-E', kategorie: 'Bildgenerierung', beschreibung: 'KI-generierte Produktbilder und Marketingmaterialien', kosten: 'Ab $10/Monat' },
  ],
  4: [
    { name: 'Azure AI Services', kategorie: 'Cloud-KI-Plattform', beschreibung: 'Enterprise-KI mit Custom Vision, Speech, Language Understanding', kosten: 'Pay-per-Use' },
    { name: 'AWS SageMaker', kategorie: 'ML-Plattform', beschreibung: 'Eigene Machine-Learning-Modelle trainieren und deployen', kosten: 'Pay-per-Use' },
    { name: 'LangChain + GPT-4', kategorie: 'Custom AI Apps', beschreibung: 'Maßgeschneiderte KI-Anwendungen mit eigenen Daten', kosten: 'API-Kosten variabel' },
    { name: 'Dataiku / H2O.ai', kategorie: 'Data Science Platform', beschreibung: 'End-to-End Data-Science- und ML-Plattform für Teams', kosten: 'Auf Anfrage' },
  ],
}

function getScoreColor(percentage) {
  if (percentage > 60) return '#22c55e'
  if (percentage > 35) return '#f59e0b'
  return '#ef4444'
}

function getScoreLabel(percentage) {
  if (percentage > 75) return 'Sehr gut - Starke Grundlage vorhanden'
  if (percentage > 60) return 'Gut - Solide Basis mit Optimierungspotenzial'
  if (percentage > 40) return 'Ausbaufähig - Deutliches Verbesserungspotenzial'
  if (percentage > 25) return 'Grundlegend - Erheblicher Handlungsbedarf'
  return 'Kritisch - Dringender Handlungsbedarf identifiziert'
}

export function generatePDFReportHTML(data) {
  const {
    companyName = 'Unternehmen',
    contactName = '',
    contactEmail = '',
    datum = new Date().toLocaleDateString('de-DE'),
    percentage = 0,
    level = 1,
    levelTitle = 'Einsteiger',
    levelDescription = '',
    levelColor = '#ef4444',
    categoryScores = [],
    recommendations = [],
    quickWins = [],
    foerderprogramme = [],
    answers = [],
    questions = [],
  } = data

  // Branche-Antworten extrahieren (601-605)
  const brancheIds = [601, 602, 603, 604, 605]
  const brancheAnswers = brancheIds.map((id) => {
    const answer = answers.find((a) => a.questionId === id)
    const question = questions.find((q) => q.id === id)
    return { question: question?.question || '', answer: answer?.text || '', score: answer?.score || 0 }
  })

  // Kategorien gruppieren
  const categoryGroups = {}
  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId)
    if (question) {
      const cat = question.categoryLabel
      if (!categoryGroups[cat]) categoryGroups[cat] = []
      categoryGroups[cat].push({ ...answer, questionText: question.question })
    }
  })

  const tools = toolEmpfehlungen[level] || toolEmpfehlungen[1]

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>KI-Readiness Report - ${companyName}</title>
  <style>
    @page { size: A4; margin: 20mm 20mm 25mm 20mm; }
    @media print {
      .page-break { page-break-before: always; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; font-size: 10pt; line-height: 1.6; color: #1f2937; max-width: 210mm; margin: 0 auto; }

    /* Cover Page */
    .cover { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%); color: white; text-align: center; padding: 40px; }
    .cover-logo { height: 60px; margin-bottom: 30px; }
    .cover h1 { font-size: 32pt; margin-bottom: 10px; }
    .cover h2 { font-size: 18pt; font-weight: normal; opacity: 0.9; margin-bottom: 40px; }
    .cover-company { font-size: 24pt; font-weight: bold; margin-bottom: 8px; }
    .cover-meta { font-size: 12pt; opacity: 0.8; }
    .cover-badge { display: inline-block; padding: 12px 32px; border-radius: 50px; font-size: 16pt; font-weight: bold; margin: 30px 0; border: 3px solid rgba(255,255,255,0.5); }
    .cover-score { font-size: 64pt; font-weight: bold; margin: 20px 0; }

    /* Content Pages */
    .content { padding: 20mm; }
    .page-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 8px; border-bottom: 2px solid #2563eb; margin-bottom: 20px; font-size: 8pt; color: #6b7280; }
    .page-header img { height: 24px; }

    h2 { font-size: 18pt; color: #1e3a8a; margin: 24px 0 12px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb; }
    h3 { font-size: 13pt; color: #2563eb; margin: 16px 0 8px; }
    h4 { font-size: 11pt; color: #374151; margin: 12px 0 6px; }
    p { margin-bottom: 8px; }

    .summary-box { background: #eff6ff; border: 2px solid #bfdbfe; border-radius: 8px; padding: 20px; margin: 16px 0; }
    .score-big { font-size: 48pt; font-weight: bold; color: #2563eb; text-align: center; }
    .level-badge { display: inline-block; padding: 8px 24px; border-radius: 50px; color: white; font-weight: bold; font-size: 12pt; }

    .progress-bar-container { background: #e5e7eb; border-radius: 8px; height: 16px; margin: 6px 0 4px; overflow: hidden; }
    .progress-bar-fill { height: 100%; border-radius: 8px; transition: width 0.3s; }

    .category-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 12px 0; }
    .category-score { font-size: 18pt; font-weight: bold; float: right; }

    table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 9pt; }
    th { background: #f3f4f6; padding: 8px 10px; text-align: left; font-weight: bold; border-bottom: 2px solid #2563eb; }
    td { padding: 6px 10px; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
    tr:nth-child(even) { background: #f9fafb; }

    .rec-card { border-left: 4px solid; padding: 12px 16px; margin: 12px 0; background: #f9fafb; border-radius: 0 8px 8px 0; }
    .rec-high { border-color: #ef4444; }
    .rec-medium { border-color: #f59e0b; }
    .rec-low { border-color: #22c55e; }
    .priority-badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 8pt; font-weight: bold; text-transform: uppercase; color: white; }
    .priority-hoch { background: #ef4444; }
    .priority-mittel { background: #f59e0b; }

    .quickwin-card { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 14px; margin: 8px 0; }
    .quickwin-effort { font-size: 8pt; color: #16a34a; font-weight: bold; text-transform: uppercase; }

    .roadmap-phase { display: flex; margin: 16px 0; }
    .roadmap-number { width: 40px; height: 40px; background: #2563eb; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14pt; flex-shrink: 0; margin-right: 16px; }
    .roadmap-content { flex: 1; }
    .roadmap-line { width: 2px; background: #bfdbfe; margin: 4px 19px; min-height: 20px; }

    .foerder-card { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; margin: 8px 0; }
    .foerder-betrag { display: inline-block; background: #2563eb; color: white; padding: 2px 10px; border-radius: 12px; font-size: 9pt; font-weight: bold; }

    .tool-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin: 8px 0; }
    .tool-name { font-weight: bold; color: #1e3a8a; }
    .tool-cat { font-size: 8pt; color: #6b7280; text-transform: uppercase; }
    .tool-cost { font-size: 9pt; color: #2563eb; font-weight: bold; }

    .footer { text-align: center; padding: 16px; color: #9ca3af; font-size: 8pt; border-top: 1px solid #e5e7eb; margin-top: 20px; }

    ul { padding-left: 20px; margin: 6px 0; }
    li { margin-bottom: 4px; }

    .toc { margin: 20px 0; }
    .toc-item { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dotted #d1d5db; }
    .toc-item span:first-child { color: #1e3a8a; font-weight: 500; }
    .toc-item span:last-child { color: #6b7280; }
  </style>
</head>
<body>

<!-- ==================== DECKBLATT ==================== -->
<div class="cover">
  <img src="data:image/png;base64,${FRIMALO_LOGO_BASE64}" alt="frimalo" class="cover-logo" />
  <h1>KI-Readiness Report</h1>
  <h2>Umfassende Analyse &amp; individueller Fahrplan</h2>
  <div style="margin: 40px 0;">
    <div class="cover-company">${companyName}</div>
    <div class="cover-meta">Erstellt f&uuml;r ${contactName} &bull; ${datum}</div>
  </div>
  <div class="cover-score">${percentage}%</div>
  <div class="cover-badge" style="background: ${levelColor};">
    Level ${level}: ${levelTitle}
  </div>
  <div class="cover-meta" style="margin-top: 60px;">
    frimalo &ndash; KI-Beratung f&uuml;r den Mittelstand<br>
    Steffen Hefter &bull; Wilhelm-Schrader-Str. 27a &bull; 06120 Halle (Saale)
  </div>
</div>

<!-- ==================== INHALTSVERZEICHNIS ==================== -->
<div class="content page-break">
  <div class="page-header">
    <img src="data:image/png;base64,${FRIMALO_LOGO_BASE64}" alt="frimalo" />
    <span>KI-Readiness Report | ${companyName} | ${datum}</span>
  </div>

  <h2>Inhaltsverzeichnis</h2>
  <div class="toc">
    <div class="toc-item"><span>1. Executive Summary</span><span>Seite 3</span></div>
    <div class="toc-item"><span>2. Detailauswertung nach Bereichen</span><span>Seite 4-7</span></div>
    <div class="toc-item"><span>3. Handlungsempfehlungen</span><span>Seite 8-10</span></div>
    <div class="toc-item"><span>4. Quick-Wins zum Sofort-Start</span><span>Seite 11</span></div>
    <div class="toc-item"><span>5. KI-Implementierungs-Roadmap</span><span>Seite 12-13</span></div>
    <div class="toc-item"><span>6. F&ouml;rderprogramme</span><span>Seite 14-15</span></div>
    <div class="toc-item"><span>7. Tool-Empfehlungen</span><span>Seite 16-17</span></div>
    <div class="toc-item"><span>8. Branchenprofil</span><span>Seite 18</span></div>
    <div class="toc-item"><span>9. Alle Antworten im &Uuml;berblick</span><span>Seite 19-22</span></div>
    <div class="toc-item"><span>10. N&auml;chste Schritte &amp; Kontakt</span><span>Seite 23</span></div>
  </div>

  <div class="summary-box" style="margin-top: 30px;">
    <h3 style="margin-top: 0;">Hinweis zur Nutzung dieses Reports</h3>
    <p>Dieser Report wurde auf Basis Ihrer Antworten im KI-Readiness Assessment erstellt. Er gibt Ihnen einen umfassenden &Uuml;berblick &uuml;ber den aktuellen KI-Reifegrad Ihres Unternehmens und liefert konkrete, umsetzbare Handlungsempfehlungen.</p>
    <p><strong>Tipp:</strong> Speichern Sie diesen Report als PDF (Strg+P &rarr; &bdquo;Als PDF speichern&ldquo;) f&uuml;r Ihre Unterlagen.</p>
  </div>
</div>

<!-- ==================== 1. EXECUTIVE SUMMARY ==================== -->
<div class="content page-break">
  <div class="page-header">
    <img src="data:image/png;base64,${FRIMALO_LOGO_BASE64}" alt="frimalo" />
    <span>KI-Readiness Report | ${companyName} | ${datum}</span>
  </div>

  <h2>1. Executive Summary</h2>

  <div class="summary-box" style="text-align: center;">
    <p style="font-size: 12pt; color: #6b7280; margin-bottom: 12px;">Ihr KI-Readiness Score</p>
    <div class="score-big">${percentage}%</div>
    <div style="margin: 12px 0;">
      <span class="level-badge" style="background: ${levelColor};">Level ${level}: ${levelTitle}</span>
    </div>
    <p style="font-size: 11pt; color: #374151; max-width: 500px; margin: 12px auto 0;">${levelDescription}</p>
  </div>

  <h3>Zusammenfassung der Ergebnisse</h3>
  <p>Das Unternehmen <strong>${companyName}</strong> erreicht im KI-Readiness Assessment einen Gesamtscore von <strong>${percentage}%</strong> und wird damit als <strong>&bdquo;${levelTitle}&ldquo; (Level ${level})</strong> eingestuft.</p>

  <h4>St&auml;rken</h4>
  <ul>
    ${categoryScores.filter(c => c.percentage > 60).map(c => `<li><strong>${c.label}</strong> (${c.percentage}%) &ndash; ${getScoreLabel(c.percentage)}</li>`).join('') || '<li>Noch keine ausgepr&auml;gten St&auml;rken identifiziert &ndash; das &auml;ndert sich mit den richtigen Ma&szlig;nahmen!</li>'}
  </ul>

  <h4>Handlungsbedarf</h4>
  <ul>
    ${categoryScores.filter(c => c.percentage <= 40).map(c => `<li><strong>${c.label}</strong> (${c.percentage}%) &ndash; ${getScoreLabel(c.percentage)}</li>`).join('') || '<li>Kein kritischer Handlungsbedarf identifiziert &ndash; Fokus auf Optimierung!</li>'}
  </ul>

  <h3>&Uuml;bersicht aller Bereiche</h3>
  ${categoryScores.map(cat => `
    <div style="margin: 8px 0;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <strong>${cat.label}</strong>
        <span style="color: ${getScoreColor(cat.percentage)}; font-weight: bold; font-size: 12pt;">${cat.percentage}%</span>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar-fill" style="width: ${cat.percentage}%; background: ${getScoreColor(cat.percentage)};"></div>
      </div>
    </div>
  `).join('')}
</div>

<!-- ==================== 2. DETAILAUSWERTUNG ==================== -->
${categoryScores.map((cat, idx) => `
<div class="content ${idx === 0 ? 'page-break' : ''}" ${idx > 0 && idx % 2 === 0 ? 'style="page-break-before: always;"' : ''}>
  ${idx === 0 ? `
  <div class="page-header">
    <img src="data:image/png;base64,${FRIMALO_LOGO_BASE64}" alt="frimalo" />
    <span>KI-Readiness Report | ${companyName} | ${datum}</span>
  </div>
  <h2>2. Detailauswertung nach Bereichen</h2>
  ` : ''}

  <div class="category-card">
    <span class="category-score" style="color: ${getScoreColor(cat.percentage)};">${cat.percentage}%</span>
    <h3 style="margin-top: 0;">${cat.label}</h3>
    <div class="progress-bar-container">
      <div class="progress-bar-fill" style="width: ${cat.percentage}%; background: ${getScoreColor(cat.percentage)};"></div>
    </div>
    <p style="margin-top: 8px;"><strong>Bewertung:</strong> ${getScoreLabel(cat.percentage)}</p>

    ${categoryGroups[cat.label] ? `
    <table style="margin-top: 12px;">
      <thead>
        <tr><th style="width: 60%;">Frage</th><th>Ihre Antwort</th><th style="width: 60px; text-align: center;">Score</th></tr>
      </thead>
      <tbody>
        ${categoryGroups[cat.label].map(a => `
        <tr>
          <td>${a.questionText}</td>
          <td>${a.text}</td>
          <td style="text-align: center; font-weight: bold; color: ${a.score >= 3 ? '#22c55e' : a.score >= 2 ? '#f59e0b' : '#ef4444'};">${a.score}/4</td>
        </tr>
        `).join('')}
      </tbody>
    </table>
    ` : ''}
  </div>
</div>
`).join('')}

<!-- ==================== 3. HANDLUNGSEMPFEHLUNGEN ==================== -->
<div class="content page-break">
  <div class="page-header">
    <img src="data:image/png;base64,${FRIMALO_LOGO_BASE64}" alt="frimalo" />
    <span>KI-Readiness Report | ${companyName} | ${datum}</span>
  </div>

  <h2>3. Individuelle Handlungsempfehlungen</h2>
  <p>Basierend auf Ihren Assessment-Ergebnissen haben wir folgende priorisierte Handlungsempfehlungen f&uuml;r ${companyName} erstellt:</p>

  ${recommendations.map(rec => `
  <div class="rec-card rec-${rec.priority === 'hoch' ? 'high' : rec.priority === 'mittel' ? 'medium' : 'low'}">
    <div style="margin-bottom: 6px;">
      <span class="priority-badge priority-${rec.priority}">${rec.priority}</span>
      <span style="font-size: 9pt; color: #6b7280; margin-left: 8px;">${rec.category}</span>
    </div>
    <h4 style="margin: 4px 0 8px;">${rec.title}</h4>
    <ul>
      ${rec.actions.map(a => `<li>${a}</li>`).join('')}
    </ul>
  </div>
  `).join('')}
</div>

<!-- ==================== 4. QUICK-WINS ==================== -->
<div class="content page-break">
  <div class="page-header">
    <img src="data:image/png;base64,${FRIMALO_LOGO_BASE64}" alt="frimalo" />
    <span>KI-Readiness Report | ${companyName} | ${datum}</span>
  </div>

  <h2>4. Quick-Wins zum Sofort-Start</h2>
  <p>Diese Ma&szlig;nahmen k&ouml;nnen Sie <strong>sofort und mit minimalem Aufwand</strong> umsetzen:</p>

  ${quickWins.map((qw, i) => `
  <div class="quickwin-card">
    <div class="quickwin-effort">Quick-Win ${i + 1} &bull; ${qw.effort}</div>
    <h4 style="margin: 4px 0;">${qw.title}</h4>
    <p>${qw.desc}</p>
  </div>
  `).join('')}

  <div class="summary-box" style="margin-top: 20px;">
    <h4 style="margin-top: 0;">Empfohlene Reihenfolge</h4>
    <p>Beginnen Sie mit Quick-Win 1 und arbeiten Sie sich schrittweise vor. Jeder Quick-Win baut auf dem vorherigen auf und bereitet Ihr Unternehmen systematisch auf den n&auml;chsten KI-Reifegrad vor.</p>
  </div>
</div>

<!-- ==================== 5. ROADMAP ==================== -->
<div class="content page-break">
  <div class="page-header">
    <img src="data:image/png;base64,${FRIMALO_LOGO_BASE64}" alt="frimalo" />
    <span>KI-Readiness Report | ${companyName} | ${datum}</span>
  </div>

  <h2>5. KI-Implementierungs-Roadmap</h2>
  <p>Ihr individueller 6-Monats-Fahrplan basierend auf der bew&auml;hrten 3-Phasen-Methodik:</p>

  <div class="roadmap-phase">
    <div class="roadmap-number">1</div>
    <div class="roadmap-content">
      <h3 style="margin-top: 0;">Phase 1: AI Awareness (Monat 1&ndash;2)</h3>
      <p style="color: #6b7280; font-size: 9pt;">Grundlagen schaffen &amp; Bewusstsein erzeugen</p>
      <ul>
        <li>KI-Awareness-Schulung f&uuml;r F&uuml;hrungskr&auml;fte und Schl&uuml;sselmitarbeiter durchf&uuml;hren</li>
        <li>Interne KI-Richtlinie erstellen (Nutzung, Datenschutz, Verantwortlichkeiten)</li>
        <li>Erste KI-Tools im Alltag testen (ChatGPT, Microsoft Copilot)</li>
        <li>Use-Cases sammeln: Wo kann KI konkret helfen?</li>
        <li>KI-Champion im Team benennen (interne/r Ansprechpartner/in)</li>
      </ul>
    </div>
  </div>
  <div class="roadmap-line"></div>

  <div class="roadmap-phase">
    <div class="roadmap-number">2</div>
    <div class="roadmap-content">
      <h3 style="margin-top: 0;">Phase 2: AI Readiness (Monat 3&ndash;4)</h3>
      <p style="color: #6b7280; font-size: 9pt;">Infrastruktur aufbauen &amp; erste Projekte starten</p>
      <ul>
        <li>Datenqualit&auml;t analysieren und Datensilos identifizieren</li>
        <li>Digitale Infrastruktur pr&uuml;fen (Cloud-Readiness, API-F&auml;higkeit)</li>
        <li>Top-3 Use-Cases als Pilotprojekte definieren und priorisieren</li>
        <li>Budget und Ressourcen f&uuml;r KI-Projekte einplanen</li>
        <li>F&ouml;rdermittel beantragen (siehe Kapitel 6)</li>
      </ul>
    </div>
  </div>
  <div class="roadmap-line"></div>

  <div class="roadmap-phase">
    <div class="roadmap-number">3</div>
    <div class="roadmap-content">
      <h3 style="margin-top: 0;">Phase 3: AI Steadiness (Monat 5&ndash;6)</h3>
      <p style="color: #6b7280; font-size: 9pt;">Skalieren &amp; verstetigen</p>
      <ul>
        <li>Pilotprojekte umsetzen und Ergebnisse messen</li>
        <li>Erfolge intern kommunizieren und Change-Management betreiben</li>
        <li>Prozesse dokumentieren und standardisieren</li>
        <li>Skalierung der erfolgreichen Projekte planen</li>
        <li>N&auml;chste Ausbaustufe definieren (Automatisierung, Custom AI)</li>
      </ul>
    </div>
  </div>
</div>

<!-- ==================== 6. FÖRDERPROGRAMME ==================== -->
<div class="content page-break">
  <div class="page-header">
    <img src="data:image/png;base64,${FRIMALO_LOGO_BASE64}" alt="frimalo" />
    <span>KI-Readiness Report | ${companyName} | ${datum}</span>
  </div>

  <h2>6. Relevante F&ouml;rderprogramme</h2>
  <p>Diese F&ouml;rderprogramme k&ouml;nnten f&uuml;r ${companyName} relevant sein. Die Verf&uuml;gbarkeit und Bedingungen k&ouml;nnen sich &auml;ndern &ndash; wir empfehlen eine individuelle Pr&uuml;fung.</p>

  ${foerderprogramme.map(fp => `
  <div class="foerder-card">
    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
      <h4 style="margin: 0;">${fp.name}</h4>
      <span class="foerder-betrag">${fp.betrag}</span>
    </div>
    <p style="margin-top: 8px;">${fp.beschreibung}</p>
  </div>
  `).join('')}

  <div class="summary-box" style="margin-top: 20px;">
    <h4 style="margin-top: 0;">F&ouml;rdermittelberatung</h4>
    <p>Sie m&ouml;chten wissen, welche F&ouml;rderprogramme konkret f&uuml;r Ihr Unternehmen in Frage kommen? Im Rahmen unseres <strong>Strategie-Pakets (€497)</strong> erhalten Sie eine individuelle F&ouml;rdermittelberatung inklusive Unterst&uuml;tzung bei der Antragstellung.</p>
    <p><strong>Kontakt:</strong> steffenhefter@googlemail.com</p>
  </div>
</div>

<!-- ==================== 7. TOOL-EMPFEHLUNGEN ==================== -->
<div class="content page-break">
  <div class="page-header">
    <img src="data:image/png;base64,${FRIMALO_LOGO_BASE64}" alt="frimalo" />
    <span>KI-Readiness Report | ${companyName} | ${datum}</span>
  </div>

  <h2>7. Tool-Empfehlungen f&uuml;r Level ${level}</h2>
  <p>Basierend auf Ihrem KI-Reifegrad (Level ${level}: ${levelTitle}) empfehlen wir folgende Tools:</p>

  ${tools.map(tool => `
  <div class="tool-card">
    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
      <div>
        <span class="tool-cat">${tool.kategorie}</span>
        <div class="tool-name">${tool.name}</div>
      </div>
      <span class="tool-cost">${tool.kosten}</span>
    </div>
    <p style="margin-top: 6px; font-size: 9pt; color: #4b5563;">${tool.beschreibung}</p>
  </div>
  `).join('')}

  <div class="summary-box" style="margin-top: 20px;">
    <h4 style="margin-top: 0;">Hinweis</h4>
    <p>Die genannten Preise sind Richtwerte und k&ouml;nnen sich &auml;ndern. Viele Tools bieten kostenlose Testphasen an. Wir empfehlen, mit den kostenlosen Versionen zu starten und bei Bedarf zu upgraden.</p>
  </div>
</div>

<!-- ==================== 8. BRANCHENPROFIL ==================== -->
<div class="content page-break">
  <div class="page-header">
    <img src="data:image/png;base64,${FRIMALO_LOGO_BASE64}" alt="frimalo" />
    <span>KI-Readiness Report | ${companyName} | ${datum}</span>
  </div>

  <h2>8. Ihr Branchenprofil</h2>
  <p>Basierend auf Ihren Angaben zu Branche, Unternehmensgr&ouml;&szlig;e und Marktsituation:</p>

  <table>
    <thead>
      <tr><th>Aspekt</th><th>Ihre Angabe</th></tr>
    </thead>
    <tbody>
      ${brancheAnswers.map(ba => `
      <tr>
        <td style="width: 40%;">${ba.question}</td>
        <td><strong>${ba.answer}</strong></td>
      </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="summary-box" style="margin-top: 20px;">
    <h4 style="margin-top: 0;">Branchenspezifische Empfehlung</h4>
    <p>Unternehmen Ihrer Branche und Gr&ouml;&szlig;e profitieren besonders von:</p>
    <ul>
      <li>Automatisierung wiederkehrender Verwaltungsaufgaben (Angebotserstellung, Rechnungswesen)</li>
      <li>KI-gest&uuml;tzte Kundenanalyse und personalisierte Kommunikation</li>
      <li>Intelligente Prozessoptimierung in der Wertsch&ouml;pfungskette</li>
      <li>Pr&auml;diktive Analyse f&uuml;r bessere Gesch&auml;ftsentscheidungen</li>
    </ul>
  </div>
</div>

<!-- ==================== 9. ALLE ANTWORTEN ==================== -->
<div class="content page-break">
  <div class="page-header">
    <img src="data:image/png;base64,${FRIMALO_LOGO_BASE64}" alt="frimalo" />
    <span>KI-Readiness Report | ${companyName} | ${datum}</span>
  </div>

  <h2>9. Alle Antworten im &Uuml;berblick</h2>
  <p>Vollst&auml;ndige Dokumentation aller ${answers.length} Fragen und Ihrer Antworten:</p>

  <table>
    <thead>
      <tr>
        <th style="width: 15%;">Bereich</th>
        <th style="width: 40%;">Frage</th>
        <th style="width: 35%;">Ihre Antwort</th>
        <th style="width: 10%; text-align: center;">Score</th>
      </tr>
    </thead>
    <tbody>
      ${answers.map(a => {
        const q = questions.find(qu => qu.id === a.questionId)
        return `
        <tr>
          <td style="font-size: 8pt; color: #6b7280;">${q ? q.categoryLabel : ''}</td>
          <td style="font-size: 9pt;">${q ? q.question : ''}</td>
          <td style="font-size: 9pt;">${a.text}</td>
          <td style="text-align: center; font-weight: bold; color: ${a.score >= 3 ? '#22c55e' : a.score >= 2 ? '#f59e0b' : '#ef4444'};">${a.score}/4</td>
        </tr>`
      }).join('')}
    </tbody>
  </table>
</div>

<!-- ==================== 10. NÄCHSTE SCHRITTE ==================== -->
<div class="content page-break">
  <div class="page-header">
    <img src="data:image/png;base64,${FRIMALO_LOGO_BASE64}" alt="frimalo" />
    <span>KI-Readiness Report | ${companyName} | ${datum}</span>
  </div>

  <h2>10. N&auml;chste Schritte &amp; Kontakt</h2>

  <div class="summary-box">
    <h3 style="margin-top: 0;">Ihre Top-3 n&auml;chsten Schritte</h3>
    <ol style="font-size: 11pt; line-height: 2;">
      <li><strong>Quick-Wins umsetzen:</strong> Starten Sie diese Woche mit Quick-Win 1 aus Kapitel 4</li>
      <li><strong>Team informieren:</strong> Teilen Sie die Ergebnisse mit Ihrem F&uuml;hrungsteam</li>
      <li><strong>Roadmap starten:</strong> Beginnen Sie mit Phase 1 der KI-Implementierungs-Roadmap</li>
    </ol>
  </div>

  <h3>Weiterf&uuml;hrende Unterst&uuml;tzung</h3>

  <div class="rec-card rec-medium" style="margin: 16px 0;">
    <h4 style="margin-top: 0;">Strategie-Paket (€497)</h4>
    <p>Sie m&ouml;chten die Ergebnisse dieses Reports im Detail besprechen und eine individuelle KI-Strategie f&uuml;r Ihr Unternehmen entwickeln?</p>
    <ul>
      <li>60-min&uuml;tiges pers&ouml;nliches Video-Strategiegespr&auml;ch</li>
      <li>Individuelle KI-Strategie f&uuml;r Ihr Unternehmen</li>
      <li>Pers&ouml;nliche F&ouml;rdermittelberatung</li>
      <li>30 Tage E-Mail-Support</li>
    </ul>
  </div>

  <h3>Kontakt</h3>
  <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-top: 12px;">
    <p style="margin: 0;">
      <strong>Steffen Hefter</strong><br>
      frimalo &ndash; KI-Beratung f&uuml;r den Mittelstand<br><br>
      E-Mail: steffenhefter@googlemail.com<br>
      Web: ki-kompass.de<br><br>
      Wilhelm-Schrader-Str. 27a<br>
      06120 Halle (Saale)
    </p>
  </div>

  <div class="footer" style="margin-top: 40px;">
    <p>&copy; ${new Date().getFullYear()} frimalo &ndash; KI-Kompass. Alle Rechte vorbehalten.</p>
    <p>Dieser Report wurde automatisch erstellt und ist vertraulich. Eine Weitergabe an Dritte ist nur mit Zustimmung von ${companyName} und frimalo gestattet.</p>
  </div>
</div>

</body>
</html>`
}

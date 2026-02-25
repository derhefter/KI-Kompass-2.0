// ============================================================
// KI-READINESS ZERTIFIKAT & BADGE GENERATOR - KI-Kompass V2
// ============================================================
// generateCertificateHTML() = Premium Zertifikat (€97) - A4 Querformat
// generateBadgeHTML()       = Basic Badge (€47) - Kompaktes Website-Badge
// ============================================================

import crypto from 'crypto'

export function generateCertificateId() {
  const year = new Date().getFullYear()
  const hex = crypto.randomBytes(4).toString('hex').toUpperCase()
  return `CERT-${year}-${hex}`
}

export function generateCertificateHTML({ companyName, contactName, date, level, levelTitle, percentage, categoryScores, certificateId }) {
  const levelColors = {
    1: { bg: '#fef2f2', border: '#ef4444', text: '#991b1b', badge: '#ef4444' },
    2: { bg: '#fffbeb', border: '#f59e0b', text: '#92400e', badge: '#f59e0b' },
    3: { bg: '#eff6ff', border: '#3b82f6', text: '#1e40af', badge: '#3b82f6' },
    4: { bg: '#f0fdf4', border: '#22c55e', text: '#166534', badge: '#22c55e' },
  }
  const colors = levelColors[level] || levelColors[1]

  const categoryHTML = (categoryScores || []).map(cat => `
    <div style="display:inline-block;text-align:center;margin:0 12px;">
      <div style="font-size:18pt;font-weight:bold;color:${cat.percentage > 60 ? '#22c55e' : cat.percentage > 35 ? '#f59e0b' : '#ef4444'};">${cat.percentage}%</div>
      <div style="font-size:7pt;color:#6b7280;max-width:80px;">${cat.label}</div>
    </div>
  `).join('')

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>KI-Readiness Zertifikat - ${companyName}</title>
  <style>
    @page { size: A4 landscape; margin: 15mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Georgia', 'Times New Roman', serif;
      background: white;
      width: 277mm;
      height: 190mm;
      margin: 0 auto;
      position: relative;
    }
    .certificate {
      border: 3px solid #1e3a8a;
      padding: 20px;
      height: 100%;
      position: relative;
      background: linear-gradient(135deg, #fafbff 0%, #f0f4ff 100%);
    }
    .certificate::before {
      content: '';
      position: absolute;
      top: 8px; left: 8px; right: 8px; bottom: 8px;
      border: 1px solid #bfdbfe;
      pointer-events: none;
    }
    .header { text-align: center; margin-bottom: 16px; }
    .header img { height: 36px; margin-bottom: 8px; }
    .title { font-size: 28pt; color: #1e3a8a; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 4px; }
    .subtitle { font-size: 11pt; color: #6b7280; font-style: italic; letter-spacing: 2px; }
    .divider { width: 120px; height: 2px; background: #2563eb; margin: 12px auto; }
    .body { text-align: center; margin: 12px 0; }
    .confirm-text { font-size: 10pt; color: #6b7280; margin-bottom: 8px; }
    .company-name { font-size: 24pt; color: #1e3a8a; font-weight: bold; margin: 8px 0; }
    .level-section { margin: 16px 0; }
    .level-badge {
      display: inline-block;
      padding: 10px 40px;
      border-radius: 50px;
      color: white;
      font-size: 16pt;
      font-weight: bold;
      font-family: Arial, sans-serif;
      letter-spacing: 1px;
    }
    .score-display { font-size: 36pt; font-weight: bold; color: #2563eb; margin: 8px 0; font-family: Arial, sans-serif; }
    .categories { margin: 12px 0; text-align: center; font-family: Arial, sans-serif; }
    .footer-section { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 16px; padding: 0 40px; }
    .signature { text-align: center; }
    .signature-line { width: 180px; border-bottom: 1px solid #374151; margin-bottom: 4px; }
    .signature-name { font-size: 10pt; font-weight: bold; color: #374151; }
    .signature-title { font-size: 8pt; color: #6b7280; }
    .cert-id { font-family: monospace; font-size: 8pt; color: #9ca3af; text-align: center; margin-top: 8px; }
    .verify-text { font-size: 7pt; color: #9ca3af; text-align: center; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="header">
      <div class="title">KI-Readiness Zertifikat</div>
      <div class="subtitle">Ausgestellt durch den KI-Kompass &mdash; frimalo</div>
    </div>

    <div class="divider"></div>

    <div class="body">
      <div class="confirm-text">Hiermit wird best&auml;tigt, dass</div>
      <div class="company-name">${companyName}</div>
      <div class="confirm-text">vertreten durch ${contactName}</div>
      <div class="confirm-text" style="margin-top:8px;">den KI-Readiness Check erfolgreich absolviert hat und folgenden Reifegrad erreicht:</div>

      <div class="level-section">
        <div class="score-display">${percentage}%</div>
        <div class="level-badge" style="background:${colors.badge};">Level ${level}: ${levelTitle}</div>
      </div>

      <div class="categories">
        ${categoryHTML}
      </div>
    </div>

    <div class="footer-section">
      <div class="signature">
        <div class="signature-line"></div>
        <div class="signature-name">Datum: ${date}</div>
        <div class="signature-title">Ausstellungsdatum</div>
      </div>
      <div class="signature">
        <div class="signature-line"></div>
        <div class="signature-name">Steffen Hefter</div>
        <div class="signature-title">KI-Berater | frimalo</div>
      </div>
    </div>

    <div class="cert-id">Zertifikat-Nr.: ${certificateId}</div>
    <div class="verify-text">Verifizierbar unter ki-kompass.de/verify/${certificateId}</div>
  </div>
</body>
</html>`
}

// ============================================================
// BASIC BADGE (€47) - Kompaktes, website-einbettbares Badge
// ============================================================
export function generateBadgeHTML({ companyName, contactName, date, level, levelTitle, percentage, certificateId }) {
  const levelColors = {
    1: { bg: '#fef2f2', border: '#ef4444', badge: '#ef4444', light: '#fee2e2' },
    2: { bg: '#fffbeb', border: '#f59e0b', badge: '#f59e0b', light: '#fef3c7' },
    3: { bg: '#eff6ff', border: '#3b82f6', badge: '#3b82f6', light: '#dbeafe' },
    4: { bg: '#f0fdf4', border: '#22c55e', badge: '#22c55e', light: '#dcfce7' },
  }
  const colors = levelColors[level] || levelColors[1]

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="badge-type" content="basic">
  <title>KI-Readiness Badge - ${companyName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: Arial, Helvetica, sans-serif;
      background: #f8fafc;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }
    .badge-container {
      width: 400px;
      background: white;
      border-radius: 20px;
      border: 3px solid ${colors.border};
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    }
    .badge-header {
      background: linear-gradient(135deg, #1e3a8a, #2563eb);
      padding: 20px;
      text-align: center;
      color: white;
    }
    .badge-header h1 {
      font-size: 14pt;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .badge-header p {
      font-size: 9pt;
      opacity: 0.8;
    }
    .badge-body {
      padding: 24px;
      text-align: center;
    }
    .badge-score {
      font-size: 48pt;
      font-weight: bold;
      color: ${colors.badge};
      line-height: 1;
      margin: 8px 0;
    }
    .badge-level {
      display: inline-block;
      background: ${colors.badge};
      color: white;
      padding: 8px 24px;
      border-radius: 30px;
      font-size: 12pt;
      font-weight: bold;
      margin: 12px 0;
    }
    .badge-company {
      font-size: 16pt;
      font-weight: bold;
      color: #1e3a8a;
      margin: 16px 0 4px;
    }
    .badge-contact {
      font-size: 10pt;
      color: #6b7280;
    }
    .badge-footer {
      background: ${colors.light};
      padding: 12px 20px;
      text-align: center;
      border-top: 1px solid ${colors.border};
    }
    .badge-footer .cert-id {
      font-family: monospace;
      font-size: 8pt;
      color: #6b7280;
    }
    .badge-footer .verify {
      font-size: 7pt;
      color: #9ca3af;
      margin-top: 4px;
    }
    .badge-footer .date {
      font-size: 8pt;
      color: #6b7280;
      margin-top: 4px;
    }
    .badge-footer .brand {
      font-size: 8pt;
      color: #9ca3af;
      margin-top: 6px;
    }
    @media print {
      body { background: white; min-height: auto; }
      .badge-container { box-shadow: none; }
    }
  </style>
</head>
<body>
  <!--
  ============================================================
  WEBSITE-EINBETTUNG: Kopieren Sie den folgenden Code in Ihre Website,
  um das Badge als Bild/Link einzubetten:

  <a href="https://ki-kompass-v2-seven.vercel.app/verify/${certificateId}" target="_blank" rel="noopener">
    <img src="[BADGE-BILD-URL]" alt="KI-Readiness Badge - Level ${level}: ${levelTitle} - ${percentage}%" width="200" />
  </a>

  Tipp: Speichern Sie diese HTML-Datei als Screenshot/PNG und
  laden Sie das Bild auf Ihre Website hoch.
  ============================================================
  -->

  <div class="badge-container">
    <div class="badge-header">
      <h1>KI-Readiness</h1>
      <p>Zertifiziert durch KI-Kompass &bull; frimalo</p>
    </div>

    <div class="badge-body">
      <div class="badge-score">${percentage}%</div>
      <div class="badge-level">Level ${level}: ${levelTitle}</div>
      <div class="badge-company">${companyName}</div>
      <div class="badge-contact">vertreten durch ${contactName}</div>
    </div>

    <div class="badge-footer">
      <div class="cert-id">Nr.: ${certificateId}</div>
      <div class="verify">Verifizierbar unter ki-kompass.de/verify/${certificateId}</div>
      <div class="date">Ausgestellt am ${date}</div>
      <div class="brand">frimalo &ndash; KI-Beratung f&uuml;r den Mittelstand</div>
    </div>
  </div>
</body>
</html>`
}

// ============================================================
// WHITEPAPER PDF GENERATOR — KI-Kompass V2
// ============================================================
// Erzeugt ein druckfertiges HTML-Dokument zum Whitepaper
// "Pragmatische KI im Mittelstand". Wird via headless Chrome
// nach public/Pragmatische_KI_im_Mittelstand.pdf gerendert.
//
// Inhalts-Quelle: NotebookLM-Slides, neu aufgebaut im V2-Brand:
//   primary-500 #0369A1  primary-700 #1E293B
//   warm-500    #D97706  warm-50    #FFFBEB
//   accent-500  #059669  accent-50  #ECFDF5
//   slate-700   #374151  slate-500  #64748B
// ============================================================

const FRIMALO_LOGO_BASE64 = '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'

export function generateWhitepaperHTML() {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Künstliche Intelligenz im Mittelstand — Der pragmatische Einstieg</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

    @page { size: A4 landscape; margin: 0; }
    @media print {
      .page-break { page-break-before: always; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', Arial, Helvetica, sans-serif;
      color: #374151;
      background: white;
      font-size: 11pt;
      line-height: 1.5;
    }

    /* ===== Page wrapper (one slide per page in landscape A4) ===== */
    .page {
      width: 297mm;
      height: 210mm;
      padding: 18mm 24mm;
      position: relative;
      overflow: hidden;
      background: white;
      display: flex;
      flex-direction: column;
    }

    /* Page number / brand footer */
    .page-foot {
      position: absolute;
      bottom: 10mm;
      left: 24mm;
      right: 24mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 8pt;
      color: #94A3B8;
      letter-spacing: 0.04em;
    }
    .page-foot .brand { font-weight: 600; color: #1E293B; }
    .page-foot .num { font-feature-settings: "tnum"; }

    /* ===== Headlines ===== */
    h1, h2, h3, h4 { font-weight: 700; color: #1E293B; letter-spacing: -0.01em; }
    h1 { font-size: 28pt; line-height: 1.1; margin-bottom: 12pt; }
    h2 { font-size: 22pt; line-height: 1.15; margin-bottom: 14pt; }
    h2.center { text-align: center; }
    h3 { font-size: 14pt; line-height: 1.25; margin-bottom: 6pt; }

    .lead {
      font-size: 13pt;
      line-height: 1.5;
      color: #475569;
      max-width: 800px;
    }

    /* Underline accent on h1/h2 */
    .accent-rule {
      width: 80px; height: 4px; background: #D97706;
      border-radius: 2px; margin: 4pt 0 16pt;
    }

    /* ===== Cards / Boxes ===== */
    .card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 16pt;
    }
    .card-dark {
      background: #1E293B;
      color: white;
      border-radius: 10px;
      padding: 18pt;
    }
    .card-warm {
      background: #FFFBEB;
      border-left: 4px solid #D97706;
      border-radius: 0 10px 10px 0;
      padding: 14pt 18pt;
    }
    .card-accent {
      background: #ECFDF5;
      border-left: 4px solid #059669;
      border-radius: 0 10px 10px 0;
      padding: 14pt 18pt;
    }
    .card-primary {
      background: #F0F9FF;
      border: 1px solid #BAE6FD;
      border-radius: 10px;
      padding: 16pt;
    }

    /* Tag badges */
    .tag {
      display: inline-block;
      padding: 3pt 10pt;
      border-radius: 999px;
      font-size: 8pt;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      background: #FEF3C7;
      color: #B45309;
    }
    .tag-primary { background: #BAE6FD; color: #0369A1; }
    .tag-accent { background: #A7F3D0; color: #047857; }
    .tag-ink { background: #1E293B; color: white; }

    /* Tables (clean, branded) */
    table { width: 100%; border-collapse: collapse; font-size: 10pt; }
    th { background: #F1F5F9; padding: 8pt 10pt; text-align: left; font-weight: 600; color: #1E293B; border-bottom: 2px solid #0369A1; font-size: 9.5pt; }
    td { padding: 7pt 10pt; border-bottom: 1px solid #E2E8F0; vertical-align: top; color: #374151; }
    tr:nth-child(even) td { background: #F8FAFC; }
    tr.highlight td { background: #FFFBEB; font-weight: 600; }
    tr.highlight td:first-child { color: #B45309; }

    /* Lists */
    ul.clean { list-style: none; padding: 0; }
    ul.clean li { display: flex; gap: 8pt; padding: 4pt 0; }
    ul.clean li::before { content: ""; flex-shrink: 0; width: 6pt; height: 6pt; border-radius: 50%; background: #0369A1; margin-top: 7pt; }

    ul.check li::before {
      content: "✓"; background: transparent; color: #059669;
      font-weight: 700; font-size: 12pt; width: 14pt; height: auto;
      margin-top: 0;
    }
    ul.cross li::before {
      content: "×"; background: transparent; color: #DC2626;
      font-weight: 700; font-size: 14pt; width: 14pt; height: auto;
      margin-top: -1pt;
    }

    /* ===== COVER ===== */
    .cover {
      background: linear-gradient(135deg, #1E293B 0%, #075985 50%, #0369A1 100%);
      color: white;
      padding: 24mm;
    }
    .cover::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(circle at 80% 25%, rgba(217, 119, 6, 0.18) 0%, transparent 55%),
                  radial-gradient(circle at 15% 75%, rgba(255,255,255,0.06) 0%, transparent 50%);
      pointer-events: none;
    }
    .cover-inner { position: relative; z-index: 1; height: 100%; display: flex; flex-direction: column; justify-content: space-between; }
    .cover h1 { color: white; font-size: 36pt; max-width: 720px; line-height: 1.05; margin-bottom: 0; }
    .cover h1 em { font-style: normal; color: #FCD34D; }
    .cover .sub {
      font-size: 14pt; color: rgba(255,255,255,0.85);
      max-width: 600px; line-height: 1.55;
      margin-top: 16pt;
    }
    .cover .meta {
      font-size: 10pt;
      color: rgba(255,255,255,0.6);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .cover-toc {
      margin-top: 24pt;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10pt 30pt;
      max-width: 720px;
    }
    .cover-toc-item {
      display: flex; gap: 10pt; align-items: baseline;
      font-size: 11pt;
      color: rgba(255,255,255,0.92);
    }
    .cover-toc-item .ix { color: #FCD34D; font-weight: 700; min-width: 18pt; }

    /* ===== Slide-Layouts ===== */
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14pt; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18pt; }
    .grid-2-eq { display: grid; grid-template-columns: 1fr auto 1fr; gap: 18pt; align-items: center; }

    .pillar { padding: 16pt; border-radius: 10px; background: #F8FAFC; border: 1px solid #E2E8F0; }
    .pillar h3 { color: #0369A1; margin-bottom: 8pt; font-size: 12.5pt; }
    .pillar p { font-size: 10pt; color: #475569; line-height: 1.5; }

    .plus-sign {
      font-size: 36pt; color: #94A3B8; font-weight: 300;
      text-align: center;
    }

    .formula-box {
      display: flex; flex-direction: column;
      gap: 4pt;
      padding: 16pt;
      border-radius: 12px;
      flex: 1;
      border: 2px solid;
      min-height: 220pt;
    }
    .formula-box.left { background: #FFFBEB; border-color: #D97706; }
    .formula-box.right { background: #F0F9FF; border-color: #0369A1; }
    .formula-box .pct { font-size: 28pt; font-weight: 800; color: #1E293B; }
    .formula-box.left .pct { color: #B45309; }
    .formula-box.right .pct { color: #075985; }
    .formula-box .ttl { font-size: 13pt; font-weight: 700; color: #1E293B; margin: 4pt 0 8pt; }
    .formula-box .desc { font-size: 10.5pt; color: #475569; line-height: 1.55; }

    /* ===== Page-specific overrides ===== */
    .key-takeaway {
      margin-top: auto;
      padding: 12pt 16pt;
      background: #1E293B; color: white;
      border-radius: 8px;
      font-size: 11pt;
      font-weight: 500;
      line-height: 1.5;
    }
    .key-takeaway b { color: #FCD34D; font-weight: 700; }

    .stat-box {
      padding: 18pt;
      border-radius: 10px;
      background: #F0F9FF;
      border: 1px solid #BAE6FD;
    }
    .stat-box .num {
      font-size: 36pt; font-weight: 800; color: #0369A1;
      line-height: 1; letter-spacing: -0.02em;
    }
    .stat-box .num.warm { color: #D97706; }
    .stat-box .lbl { font-size: 11pt; font-weight: 600; color: #1E293B; margin-top: 6pt; }
    .stat-box .desc { font-size: 9.5pt; color: #475569; margin-top: 4pt; line-height: 1.5; }
    .stat-box.warm { background: #FFFBEB; border-color: #FDE68A; }

    /* Decision tree */
    .tree { display: flex; flex-direction: column; gap: 8pt; }
    .tree-row { display: flex; gap: 12pt; align-items: stretch; }
    .tree-q {
      flex: 1.2;
      padding: 10pt 14pt;
      background: #F1F5F9;
      border-left: 3px solid #0369A1;
      border-radius: 4px 8px 8px 4px;
      font-size: 10pt;
    }
    .tree-q b { display: block; color: #0369A1; font-size: 9pt; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 3pt; }
    .tree-yes, .tree-no {
      padding: 10pt 14pt;
      border-radius: 8px;
      font-size: 9.5pt;
      display: flex; align-items: center; flex: 1;
      line-height: 1.4;
    }
    .tree-yes { background: #ECFDF5; color: #047857; }
    .tree-no { background: #FEF2F2; color: #B91C1C; }
    .tree-yes b, .tree-no b { font-weight: 700; margin-right: 4pt; }

    /* Roof / Foundation diagram — Dach so breit wie Fundament (380pt) */
    .house { display: flex; flex-direction: column; align-items: center; gap: 0; margin: 6pt 0; }
    .roof {
      width: 0; height: 0;
      border-left: 190pt solid transparent;
      border-right: 190pt solid transparent;
      border-bottom: 120pt solid #D97706;
      position: relative;
      z-index: 2;
    }
    .roof-content {
      position: absolute; top: 65pt; left: -115pt; width: 230pt;
      text-align: center; color: white; font-size: 9.5pt; font-weight: 600; line-height: 1.35;
      z-index: 3;
    }
    .roof-content b { display: block; font-size: 11pt; margin-bottom: 3pt; }
    .building {
      width: 380pt; padding: 18pt;
      background: #1E293B; color: white;
      border-radius: 0 0 8px 8px;
      text-align: center;
    }
    .building b { display: block; font-size: 12pt; margin-bottom: 4pt; color: #FCD34D; }
    .building span { font-size: 10pt; line-height: 1.5; opacity: 0.9; }

    /* 5-Dim spider polygon — vereinfacht als 5 Kreis-Indikatoren */
    .dims {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 10pt;
    }
    .dim {
      text-align: center;
      padding: 12pt 8pt;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
    }
    .dim .ix {
      width: 28pt; height: 28pt; line-height: 28pt;
      border-radius: 50%;
      background: #0369A1; color: white;
      font-weight: 700; font-size: 12pt;
      margin: 0 auto 6pt;
    }
    .dim .ttl { font-size: 11pt; font-weight: 700; color: #1E293B; }
    .dim .sub { font-size: 8.5pt; color: #64748B; margin-top: 2pt; }

    /* Last page: nächste Schritte */
    .step-stack { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16pt; }
    .step-card {
      background: white;
      border: 2px solid;
      border-radius: 10px;
      padding: 16pt;
      position: relative;
    }
    .step-card.heute { border-color: #0369A1; }
    .step-card.diesewoche { border-color: #D97706; }
    .step-card.naechste { border-color: #059669; }
    .step-card .when {
      position: absolute; top: -10pt; left: 14pt;
      background: white;
      padding: 0 8pt;
      font-size: 9pt; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
    }
    .step-card.heute .when { color: #0369A1; }
    .step-card.diesewoche .when { color: #D97706; }
    .step-card.naechste .when { color: #059669; }
    .step-card h3 { color: #1E293B; font-size: 12pt; margin-top: 6pt; margin-bottom: 8pt; }
    .step-card p { font-size: 10pt; color: #475569; line-height: 1.5; }
  </style>
</head>
<body>

<!-- ============ Slide 1: COVER ============ -->
<div class="page cover">
  <div class="cover-inner">
    <div>
      <span class="meta">White Paper · KI-Kompass</span>
      <h1 style="margin-top: 14pt;">Künstliche Intelligenz im Mittelstand:<br><em>Der pragmatische Einstieg.</em></h1>
      <p class="sub">Warum der Weg zur KI mehr mit klaren Prozessen als mit riesigen IT-Budgets zu tun hat.</p>
    </div>
    <div>
      <span class="meta">Inhalt &amp; Struktur</span>
      <div class="cover-toc">
        <div class="cover-toc-item"><span class="ix">01</span><span>Die Ausgangslage: Herausforderungen für den Mittelstand</span></div>
        <div class="cover-toc-item"><span class="ix">02</span><span>Was bedeutet „KI-Readiness"? (80 % Hausaufgaben, 20 % Technologie)</span></div>
        <div class="cover-toc-item"><span class="ix">03</span><span>Der pragmatische Weg zur Umsetzung: Klare Prozesse vor IT-Budget</span></div>
        <div class="cover-toc-item"><span class="ix">04</span><span>Fazit &amp; Handlungsempfehlungen für KMU</span></div>
      </div>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span class="meta">frimalo · Steffen Hefter · Halle (Saale)</span>
      <span class="meta">www.derhefter.com</span>
    </div>
  </div>
</div>

<!-- ============ Slide 2: Die Ausgangslage ============ -->
<div class="page page-break">
  <span class="tag">Kapitel 1 · Ausgangslage</span>
  <h2 style="margin-top: 8pt;">Wer regional bleibt,<br>muss effizienter werden.</h2>
  <div class="accent-rule"></div>

  <div class="grid-3" style="margin-top: 14pt;">
    <div class="pillar">
      <h3>Demografischer Wandel &amp; Personalmangel</h3>
      <p>Die Region verliert Fachkräfte. KMU müssen mit weniger Personal mehr leisten.</p>
    </div>
    <div class="pillar">
      <h3>Regionale Wettbewerbsfähigkeit</h3>
      <p>Großkonzerne nutzen bereits Skaleneffekte. Der Mittelstand muss nachziehen, um den Standortfaktor zu sichern.</p>
    </div>
    <div class="pillar">
      <h3>Heterogene IT-Strukturen</h3>
      <p>Historisch gewachsene Systeme und fehlende Datenintegration bremsen den Fortschritt.</p>
    </div>
  </div>

  <div class="key-takeaway" style="margin-top: 18pt;">
    Digitalisierung ist <b>kein Großprojekt</b>, sondern der essenzielle Enabler, um diesen dreifachen Druck aufzulösen.
  </div>

  <div class="page-foot"><span class="brand">KI-Kompass</span><span class="num">02 / 14</span></div>
</div>

<!-- ============ Slide 3: KI-Readiness Definition ============ -->
<div class="page page-break">
  <span class="tag">Kapitel 2 · Definition</span>
  <h2 class="center" style="margin-top: 8pt;">Was bedeutet eigentlich „KI-Readiness"?</h2>
  <div class="accent-rule" style="margin: 4pt auto 24pt;"></div>

  <div class="grid-2-eq" style="flex: 1;">
    <div class="formula-box left">
      <span class="pct">80 %</span>
      <div class="ttl">Die Hausaufgaben:<br>Mensch, Prozesse &amp; Strategie</div>
      <div class="desc">Prozesswissen nutzen, Zuständigkeiten klären, Daten aufräumen.</div>
    </div>
    <div class="plus-sign">+</div>
    <div class="formula-box right">
      <span class="pct">20 %</span>
      <div class="ttl">Das Werkzeug:<br>Technologie &amp; IT</div>
      <div class="desc">Software, Schnittstellen, Hardware.</div>
    </div>
  </div>

  <div class="key-takeaway" style="margin-top: 18pt; text-align: center;">
    Das „Bereitsein" für Künstliche Intelligenz bedeutet:<br><b>Mehr Schritte ohne Technik als mit Technik.</b>
  </div>

  <div class="page-foot"><span class="brand">KI-Kompass</span><span class="num">03 / 14</span></div>
</div>

<!-- ============ Slide 4: Fundament & Dach ============ -->
<div class="page page-break">
  <span class="tag tag-primary">Metapher</span>
  <h2 style="margin-top: 8pt;">Digitalisierung ist das Fundament. KI ist das Dach.</h2>
  <div class="accent-rule"></div>

  <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0;">
    <div class="house">
      <div class="roof">
        <div class="roof-content">
          <b>Das Dach: Künstliche Intelligenz</b>
          <span>Muster erkennen, Vorhersagen treffen, Entscheidungen unterstützen.</span>
        </div>
      </div>
      <div class="building">
        <b>Das Fundament: Digitalisierung &amp; Automatisierung</b>
        <span>Strukturierte Daten, RPA (Robotic Process Automation), integrierte Schnittstellen. Hier entstehen bereits massive Effizienzgewinne.</span>
      </div>
    </div>
  </div>

  <div class="key-takeaway" style="margin-top: 14pt;">
    Nicht jedes Digitalisierungsprojekt ist ein KI-Projekt – aber <b>jedes erfolgreiche KI-Projekt setzt digitalisierte Prozesse voraus.</b>
  </div>

  <div class="page-foot"><span class="brand">KI-Kompass</span><span class="num">04 / 14</span></div>
</div>

<!-- ============ Slide 5: 5 Dimensionen ============ -->
<div class="page page-break">
  <span class="tag">Reifegrad</span>
  <h2 style="margin-top: 8pt;">Die 5 Dimensionen der Bereitschaft.</h2>
  <div class="accent-rule"></div>

  <div class="dims" style="margin-top: 22pt;">
    <div class="dim"><div class="ix">1</div><div class="ttl">Daten</div><div class="sub">Verfügbarkeit</div></div>
    <div class="dim"><div class="ix">2</div><div class="ttl">Kultur</div><div class="sub">Lernbereitschaft</div></div>
    <div class="dim"><div class="ix">3</div><div class="ttl">Kompetenz</div><div class="sub">Prozesswissen</div></div>
    <div class="dim"><div class="ix">4</div><div class="ttl">Infrastruktur</div><div class="sub">Schnittstellen</div></div>
    <div class="dim"><div class="ix">5</div><div class="ttl">Budget</div><div class="sub">Realismus</div></div>
  </div>

  <div style="margin-top: 22pt; display: grid; grid-template-columns: repeat(5, 1fr); gap: 10pt;">
    <p style="font-size: 9.5pt; color: #475569; line-height: 1.45;"><b style="color:#1E293B;">Daten:</b> Sind Daten digital, auffindbar und strukturiert?</p>
    <p style="font-size: 9.5pt; color: #475569; line-height: 1.45;"><b style="color:#1E293B;">Kultur:</b> Ist das Team offen für Experimente und Trial-and-Error?</p>
    <p style="font-size: 9.5pt; color: #475569; line-height: 1.45;"><b style="color:#1E293B;">Kompetenz:</b> Verstehen Führungskräfte das Potenzial und die Grenzen?</p>
    <p style="font-size: 9.5pt; color: #475569; line-height: 1.45;"><b style="color:#1E293B;">Infrastruktur:</b> Erlauben die Systeme die Anbindung neuer Tools?</p>
    <p style="font-size: 9.5pt; color: #475569; line-height: 1.45;"><b style="color:#1E293B;">Budget:</b> Sind Mittel für Pilotprojekte realistisch eingeplant?</p>
  </div>

  <div class="card-warm" style="margin-top: 22pt;">
    <b style="color: #B45309;">Vollausbau ist nicht nötig.</b> Pragmatismus reicht für den ersten Schritt völlig aus.
  </div>

  <div class="page-foot"><span class="brand">KI-Kompass</span><span class="num">05 / 14</span></div>
</div>

<!-- ============ Slide 6: Reality Check ============ -->
<div class="page page-break">
  <span class="tag">Marktdaten</span>
  <h2 style="margin-top: 8pt;">Reality Check: Wo steht Mitteldeutschland aktuell?</h2>
  <div class="accent-rule"></div>

  <div class="grid-2" style="margin-top: 18pt; flex: 1;">
    <div class="stat-box warm">
      <div class="num warm">45 Nennungen</div>
      <div class="lbl">Effizienzsteigerung</div>
      <div class="desc">… ist der absolute Haupttreiber für KI-Einsatz bei regionalen KMU.</div>
    </div>
    <div class="stat-box">
      <div class="num">Top Einsatzort</div>
      <div class="lbl">Kundenservice und Verwaltung</div>
      <div class="desc">… sind die mit Abstand am häufigsten genannten Profiteure.</div>
    </div>
    <div class="stat-box warm">
      <div class="num warm">Größtes Hemmnis</div>
      <div class="lbl">Die unklare Datenlage</div>
      <div class="desc">Relevante Daten sind zu oft in E-Mails, Excel und Ordnern verteilt.</div>
    </div>
    <div class="stat-box">
      <div class="num">Status Quo</div>
      <div class="lbl">Individuelles Experimentieren</div>
      <div class="desc">KI-Einsatz ist oft noch individuelles Ausprobieren (z. B. private ChatGPT-Accounts) statt systematische Integration.</div>
    </div>
  </div>

  <div class="page-foot"><span class="brand">KI-Kompass</span><span class="num">06 / 14</span></div>
</div>

<!-- ============ Slide 7: Entscheidungsbaum ============ -->
<div class="page page-break">
  <span class="tag tag-primary">Entscheidungshilfe</span>
  <h2 style="margin-top: 8pt;">Der Entscheidungsbaum: Brauchen wir überhaupt KI?</h2>
  <div class="accent-rule"></div>

  <div class="tree" style="margin-top: 16pt;">
    <div class="tree-row">
      <div class="tree-q"><b>Frage 1</b>Kostet uns das aktuelle Problem mehr als 500 € pro Monat?</div>
      <div class="tree-yes"><b>JA →</b>Weiter</div>
      <div class="tree-no"><b>NEIN →</b>Erst Prozesse aufräumen.</div>
    </div>
    <div class="tree-row">
      <div class="tree-q"><b>Frage 2</b>Ist es ein echtes Daten- oder Vorhersageproblem (und nicht nur ein Prozess-Chaos)?</div>
      <div class="tree-yes"><b>JA →</b>Weiter</div>
      <div class="tree-no"><b>NEIN →</b>Digitalisierung &amp; RPA nutzen.</div>
    </div>
    <div class="tree-row">
      <div class="tree-q"><b>Frage 3</b>Würde eine Lösung messbar Zeit oder Geld sparen?</div>
      <div class="tree-yes"><b>JA →</b>KI-Check starten.</div>
      <div class="tree-no"><b>NEIN →</b>Projekt stoppen.</div>
    </div>
  </div>

  <div class="key-takeaway" style="margin-top: 16pt;">
    <b>3× Ja:</b> KI ist der richtige Weg. Bei einem <b>NEIN:</b> Zurück zu den Hausaufgaben.
  </div>

  <div class="page-foot"><span class="brand">KI-Kompass</span><span class="num">07 / 14</span></div>
</div>

<!-- ============ Slide 8: Tools-Übersicht ============ -->
<div class="page page-break">
  <span class="tag">Werkzeugkasten</span>
  <h2 style="margin-top: 8pt;">Übersicht der KI-Readiness-Tools.</h2>
  <div class="accent-rule"></div>

  <table style="margin-top: 14pt;">
    <thead>
      <tr>
        <th style="width: 24%;">Tool</th>
        <th style="width: 32%;">Fokus</th>
        <th style="width: 14%;">Aufwand</th>
        <th>Eignung für KMU</th>
      </tr>
    </thead>
    <tbody>
      <tr class="highlight">
        <td>KI-Readiness-Check der Seite derhefter.com</td>
        <td>Erste Orientierung ohne Technikwissen</td>
        <td>&lt; 3 min</td>
        <td>Sehr einfach verständlich. <b>(Meine Empfehlung.)</b></td>
      </tr>
      <tr>
        <td>TIQ Solutions Check</td>
        <td>Erste Orientierung</td>
        <td>&lt; 3 min</td>
        <td>Sehr gut. Kompakt, verständlich, idealer Einstieg.</td>
      </tr>
      <tr>
        <td>KIRC Mittelstand-Digital</td>
        <td>Selbstanalyse &amp; Handlungsempfehlung</td>
        <td>~ 20 min</td>
        <td>Gut. Wissenschaftlich fundiert, umfassende Betrachtung.</td>
      </tr>
      <tr>
        <td>Fraunhofer IIS Selbsttest</td>
        <td>Konkreter Anwendungsfall</td>
        <td>~ 15 min</td>
        <td>Spezifisch. Für Unternehmen, die schon eine exakte KI-Idee haben.</td>
      </tr>
      <tr>
        <td>Cisco AI Readiness Index</td>
        <td>Internationales Benchmarking</td>
        <td>~ 20 min</td>
        <td>Konzern-Englischsprachig. Für KMU nur als Kontext sinnvoll.</td>
      </tr>
    </tbody>
  </table>

  <div class="page-foot"><span class="brand">KI-Kompass</span><span class="num">08 / 14</span></div>
</div>

<!-- ============ Slide 9: Rechtliche Leitplanken ============ -->
<div class="page page-break">
  <span class="tag">Compliance</span>
  <h2 style="margin-top: 8pt;">Rechtliche Leitplanken – Pragmatisch betrachtet.</h2>
  <div class="accent-rule"></div>

  <table style="margin-top: 14pt;">
    <thead>
      <tr>
        <th style="width: 22%;">Gesetzgebung</th>
        <th style="width: 38%;">Relevanz für KI</th>
        <th>Was KMU tun müssen</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><b>DSGVO</b></td>
        <td>KI-Systeme verarbeiten oft massenhaft personenbezogene Daten.</td>
        <td>VVT (Verfahrensverzeichnis) führen und AVV (Auftragsverarbeitungsvertrag) mit Anbietern prüfen.</td>
      </tr>
      <tr>
        <td><b>US CLOUD Act</b></td>
        <td>US-Behörden können auf US-Hoster zugreifen, auch in der EU.</td>
        <td>TIA (Transfer Impact Assessment) dokumentieren und europäische Anbieter bevorzugen.</td>
      </tr>
      <tr>
        <td><b>NIS2 / KRITIS</b></td>
        <td>KI in kritischen Sektoren (Logistik, Energie) ist meldepflichtig bei Ausfall.</td>
        <td>Sektor-Betroffenheit prüfen, Incident-Runbook erstellen.</td>
      </tr>
    </tbody>
  </table>

  <div class="card-warm" style="margin-top: 18pt;">
    <b style="color: #B45309;">Faustregel für 99 % der Einstiegsprojekte:</b> IT-Dienstleister mit nachgewiesenem DSGVO-Know-how beauftragen.
  </div>

  <div class="page-foot"><span class="brand">KI-Kompass</span><span class="num">09 / 14</span></div>
</div>

<!-- ============ Slide 10: Mensch & KI ============ -->
<div class="page page-break">
  <span class="tag tag-accent">Arbeit der Zukunft</span>
  <h2 style="margin-top: 8pt;">Mensch &amp; KI: Die neue Arbeit.</h2>
  <div class="accent-rule"></div>

  <div class="grid-2" style="margin-top: 18pt; flex: 1;">
    <div class="card" style="border-left: 4px solid #DC2626;">
      <h3 style="color: #B91C1C;">Vorher: Fachkräftemangel &amp; Überlastung</h3>
      <ul class="cross" style="margin-top: 10pt;">
        <li>Hohe Routine-Belastung</li>
        <li>Daten suchen, repetitive Administration</li>
        <li>Fokus auf Abwicklung</li>
      </ul>
    </div>
    <div class="card" style="border-left: 4px solid #059669; background: #ECFDF5;">
      <h3 style="color: #047857;">Mit KI: Fokus auf Wertschöpfung</h3>
      <ul class="check" style="margin-top: 10pt;">
        <li><b>Reduktion</b> von Routine</li>
        <li><b>Freiräume</b> für Beratung &amp; Innovation</li>
        <li><b>Entlastung</b> älterer Beschäftigter durch Assistenzsysteme</li>
      </ul>
    </div>
  </div>

  <div class="key-takeaway" style="margin-top: 18pt;">
    KI ist <b>kein Ersatz</b> für Menschen. Sie ist das strategische Werkzeug, um den Standort Mitteldeutschland gegen den Fachkräftemangel zu stärken.
  </div>

  <div class="page-foot"><span class="brand">KI-Kompass</span><span class="num">10 / 14</span></div>
</div>

<!-- ============ Slide 11: 90-Tage-Plan ============ -->
<div class="page page-break">
  <span class="tag">Roadmap</span>
  <h2 style="margin-top: 8pt;">Der pragmatische 90-Tage-Plan.</h2>
  <div class="accent-rule"></div>

  <div class="grid-3" style="margin-top: 18pt; flex: 1;">
    <div class="card">
      <span class="tag tag-primary">Woche 1–4</span>
      <h3 style="margin-top: 8pt;">Quick Win finden</h3>
      <ul class="clean" style="margin-top: 8pt; font-size: 10pt;">
        <li><span>2-Stunden-Team-Workshop: „Wo verbringen wir Zeit mit Routine-Mist?"</span></li>
        <li><span>Auswahl von <b>exakt 1 Use Case</b> (z. B. Termin-Bot, FAQ-Assistent).</span></li>
      </ul>
    </div>
    <div class="card">
      <span class="tag">Monat 2–3</span>
      <h3 style="margin-top: 8pt;">Förderung &amp; Partner sichern</h3>
      <ul class="clean" style="margin-top: 8pt; font-size: 10pt;">
        <li><span>Regionale Partner mit KMU-Erfahrung suchen.</span></li>
        <li><span><b>Wichtig:</b> Fördermittel vor dem Start beantragen.</span></li>
      </ul>
    </div>
    <div class="card">
      <span class="tag tag-accent">Monat 4–9</span>
      <h3 style="margin-top: 8pt;">Pilot testen &amp; messen</h3>
      <ul class="clean" style="margin-top: 8pt; font-size: 10pt;">
        <li><span>Klein starten (max. 6 Monate in einem Bereich).</span></li>
        <li><span>Erste Version nach 6 Wochen testen.</span></li>
        <li><span>Zeitersparnis rigoros messen.</span></li>
        <li><span><b>Entscheidung im Monat 9:</b> Ausrollen oder stoppen.</span></li>
      </ul>
    </div>
  </div>

  <div class="page-foot"><span class="brand">KI-Kompass</span><span class="num">11 / 14</span></div>
</div>

<!-- ============ Slide 12: Budget & ROI ============ -->
<div class="page page-break">
  <span class="tag">Wirtschaftlichkeit</span>
  <h2 style="margin-top: 8pt;">Budget &amp; ROI: Ein realistisches Rechenbeispiel.</h2>
  <div class="accent-rule"></div>

  <div class="grid-2" style="margin-top: 22pt; flex: 1;">
    <div>
      <h3 style="color: #1E293B; font-size: 13pt; margin-bottom: 12pt;">Typisches Pilotprojekt</h3>
      <table>
        <tbody>
          <tr><td style="width: 70%;">Beratung + Konzept</td><td style="text-align: right; font-weight: 600;">8.000 €</td></tr>
          <tr><td>Software (12 Mon.)</td><td style="text-align: right; font-weight: 600;">6.000 €</td></tr>
          <tr><td>Schulungen</td><td style="text-align: right; font-weight: 600;">3.000 €</td></tr>
          <tr style="background: #1E293B;"><td style="background: #1E293B; color: white; font-weight: 700; font-size: 11pt;">Gesamtkosten</td><td style="background: #1E293B; color: white; text-align: right; font-weight: 700; font-size: 14pt;">17.000 €</td></tr>
        </tbody>
      </table>
    </div>
    <div style="display: flex; flex-direction: column; gap: 14pt;">
      <div class="card-warm">
        <span class="tag">Mit Förderung („Digital Jetzt" / „go-digital")</span>
        <h3 style="margin-top: 8pt; color: #B45309; font-size: 22pt; font-weight: 800;">– 50 %</h3>
        <p style="font-size: 13pt; font-weight: 600; color: #1E293B; margin-top: 4pt;">Nur noch <b style="font-size: 18pt; color: #B45309;">8.500 €</b> Eigenanteil.</p>
      </div>
      <div class="card-accent">
        <span class="tag tag-accent">ROI-Faktor</span>
        <p style="margin-top: 6pt; font-size: 10.5pt; color: #1E293B; line-height: 1.55;">
          Wenn die KI täglich <b>2–3 Stunden Arbeitszeit im Team spart</b>, hat sich das Projekt nach <b>12–18 Monaten amortisiert.</b>
        </p>
      </div>
    </div>
  </div>

  <div class="page-foot"><span class="brand">KI-Kompass</span><span class="num">12 / 14</span></div>
</div>

<!-- ============ Slide 13: Do's & Don'ts ============ -->
<div class="page page-break">
  <span class="tag">Praxis-Checkliste</span>
  <h2 style="margin-top: 8pt;">Die Do's &amp; Don'ts beim KI-Einstieg.</h2>
  <div class="accent-rule"></div>

  <div class="grid-2" style="margin-top: 22pt; flex: 1;">
    <div class="card" style="border-left: 4px solid #DC2626; background: #FEF2F2;">
      <h3 style="color: #B91C1C; font-size: 18pt;">Don't <span style="font-size: 14pt;">×</span></h3>
      <ul class="cross" style="margin-top: 14pt; font-size: 11.5pt; line-height: 1.7;">
        <li>ChatGPT für alles.</li>
        <li>Die große SAP-Lösung anstreben.</li>
        <li>Alles intern selbst machen.</li>
        <li>Die IT regelt das allein.</li>
      </ul>
    </div>
    <div class="card" style="border-left: 4px solid #059669; background: #ECFDF5;">
      <h3 style="color: #047857; font-size: 18pt;">Do <span style="font-size: 14pt;">✓</span></h3>
      <ul class="check" style="margin-top: 14pt; font-size: 11.5pt; line-height: 1.7;">
        <li><b>1 konkreten, messbaren Use Case</b> definieren.</li>
        <li><b>Klein starten</b> (FAQ-Bot, intelligente Dokumentenablage).</li>
        <li><b>Fördermittel</b> (50 %) und das Cluster-Netzwerk aktiv nutzen.</li>
        <li><b>KI ist Chefsache</b> und ein fachliches Prozessthema.</li>
      </ul>
    </div>
  </div>

  <div class="page-foot"><span class="brand">KI-Kompass</span><span class="num">13 / 14</span></div>
</div>

<!-- ============ Slide 14: Nächste Schritte ============ -->
<div class="page page-break">
  <span class="tag tag-ink">Aktion</span>
  <h2 style="margin-top: 8pt;">Ihre nächsten Schritte.</h2>
  <div class="accent-rule"></div>

  <div class="step-stack" style="margin-top: 28pt; flex: 1; align-items: start;">
    <div class="step-card heute">
      <span class="when">Heute</span>
      <h3>15 Minuten</h3>
      <p>Den TIQ-Schnellcheck online durchführen zur ersten Standortbestimmung.</p>
    </div>
    <div class="step-card diesewoche">
      <span class="when">Diese Woche</span>
      <h3>2 Stunden</h3>
      <p>Team-Workshop ansetzen.<br>Die Frage: <b>„Welcher fehleranfällige Routine-Prozess nervt uns am meisten?"</b></p>
    </div>
    <div class="step-card naechste">
      <span class="when">Nächste Woche</span>
      <h3>Termin</h3>
      <p>Erstberatung bei IHK / HWK vereinbaren, um Förderprogramme („go-digital") abzuklären.</p>
    </div>
  </div>

  <div class="card-dark" style="margin-top: 22pt; text-align: center;">
    <p style="font-size: 13pt; color: white; margin-bottom: 4pt;">Ich unterstütze Sie pragmatisch auf diesem Weg.</p>
    <p style="font-size: 11pt; color: #FCD34D; font-weight: 600;">Sprechen Sie mich an unter <span style="color: white;">ki-kompass@derhefter.com</span></p>
  </div>

  <div class="page-foot"><span class="brand">KI-Kompass · frimalo · Halle (Saale)</span><span class="num">14 / 14</span></div>
</div>

</body>
</html>`
}

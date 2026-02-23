export const metadata = {
  title: 'Admin Guide V2 | KI-Kompass',
  robots: 'noindex, nofollow',
}

export default function AdminGuide() {
  const sections = [
    {
      title: '1. SETUP: Umgebungsvariablen (.env.local)',
      file: '.env.local',
      items: [
        'EMAIL_HOST=smtp.gmail.com',
        'EMAIL_PORT=587',
        'EMAIL_USER=steffenhefter@googlemail.com',
        'EMAIL_PASS=xxxx xxxx xxxx xxxx (Gmail App-Passwort, 16 Zeichen)',
        'EMAIL_FROM="KI-Kompass | frimalo"',
        'NEXT_PUBLIC_CONTACT_EMAIL=steffenhefter@googlemail.com',
        'NEXT_PUBLIC_BOOKING_URL=https://calendar.google.com/...',
        'GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...} (komplettes JSON)',
        'GOOGLE_SHEET_FREE_RESULTS=SHEET_ID_HIER',
        'GOOGLE_SHEET_PREMIUM_RESULTS=SHEET_ID_HIER',
        'GOOGLE_SHEET_CUSTOMERS=SHEET_ID_HIER',
        'STRIPE_SECRET_KEY=sk_live_... (von Stripe Dashboard)',
        'STRIPE_WEBHOOK_SECRET=whsec_... (von Stripe Webhooks)',
        'ADMIN_PASSWORD=DeinSicheresPasswort (fuer /dashboard)',
        'CRON_SECRET=EinZufaelligerString (fuer Follow-Up Cron)',
      ],
      hint: 'ALLE Variablen muessen auch in Vercel unter Settings > Environment Variables eingetragen werden!',
    },
    {
      title: '2. SETUP: Google Sheets vorbereiten',
      file: 'Google Sheets',
      items: [
        'Sheet 1 (Free Results): Tab "Ergebnisse" anlegen mit Spalten: Datum | Firma | E-Mail | Score | Level | Level-Titel',
        'Sheet 1: Tab "Einzelantworten" anlegen mit Spalten: Datum | Firma | Name | E-Mail | Check-Art | Frage-Nr | Kategorie | Frage | Antwort | Score',
        'Sheet 2 (Premium Results): Tab "Ergebnisse" mit Spalten: Datum | Firma | Name | E-Mail | Plan | Prozent | Level | Titel | Kat1-6',
        'Sheet 2: Tab "Einzelantworten" (gleiche Spalten wie oben)',
        'Sheet 3 (Customers): Tab "Kunden" mit Spalten: Datum | Sortierung | Name | E-Mail | Firma | Telefon | Plan | Zahlungsart | Betrag',
        'Sheet 3: Tab "Zugangscodes" mit Spalten: Code | Name | E-Mail | Firma | Plan | Erstellt | Ablaufdatum | Status',
        'Sheet 3: Tab "FollowUps" mit Spalten: E-Mail | Typ | Geplant | Faellig | Status | Gesendet | Firma | Name | Score | Level',
      ],
      hint: 'Die Sheet-ID findest du in der URL: docs.google.com/spreadsheets/d/HIER_IST_DIE_ID/edit. Service Account muss als Editor eingeladen werden!',
    },
    {
      title: '3. SETUP: Stripe einrichten',
      file: 'Stripe Dashboard',
      items: [
        'Stripe-Konto erstellen unter stripe.com',
        'API-Keys kopieren: Secret Key -> STRIPE_SECRET_KEY',
        'Webhook erstellen: Endpoint URL = https://deine-domain.vercel.app/api/stripe-webhook',
        'Webhook-Event: checkout.session.completed',
        'Webhook Signing Secret -> STRIPE_WEBHOOK_SECRET',
        'Produkte werden automatisch im Code definiert (Premium 197, Strategie 497, Zertifikat 97, Kurs 297)',
      ],
      hint: 'Im Testmodus erst mit sk_test_ testen, dann auf sk_live_ umstellen!',
    },
    {
      title: '4. SETUP: Vercel Deployment',
      file: 'Vercel',
      items: [
        'GitHub-Repo mit Vercel verbinden',
        'Framework: Next.js (wird automatisch erkannt)',
        'Build Command: npm run build (Standard)',
        'ALLE Umgebungsvariablen unter Settings > Environment Variables eintragen',
        'Cron Job wird automatisch durch vercel.json konfiguriert (taeglich 8:00 Uhr Follow-Ups)',
        'Custom Domain unter Settings > Domains hinzufuegen',
      ],
    },
    {
      title: 'Startseite (Landing Page)',
      file: 'src/app/page.js',
      items: [
        'Hero-Text und Untertitel',
        'Problem-Section (3 Karten)',
        'Vorteile-Section (4 Karten)',
        'Ablauf "So funktioniert\'s" (3 Schritte)',
        'Preise (Kostenlos / Premium 197 / Strategie 497)',
        'Trust-Statistiken',
        'FAQ-Fragen und Antworten',
        'NEU V2: Sektion "Weitere Produkte & Services" (Zertifikat, Foerder-Kompass, Toolbox, Kurs)',
        'NEU V2: White-Label-Hinweis fuer Berater',
      ],
    },
    {
      title: 'Navigation + Footer (Layout)',
      file: 'src/app/layout.js',
      items: [
        'NEU V2: Dropdown-Menue "Produkte" mit 6 Unterseiten',
        'NEU V2: Link "Fuer Berater" -> /white-label',
        'NEU V2: 4-Spalten Footer (Assessment | Produkte & Services | Kontakt)',
        'Bestehend: Vorteile, Preise, Ueber mich, Impressum, Datenschutz',
      ],
    },
    {
      title: 'Premium Assessment mit Auto-PDF',
      file: 'src/app/premium/page.js',
      items: [
        '35 Detailfragen mit Zugangscode-Pruefung',
        'NEU V2: Automatischer PDF-Report (20+ Seiten) per E-Mail nach Abschluss',
        'Report generiert durch src/lib/pdf-report.js',
        'API-Endpunkt: /api/generate-report',
      ],
    },
    {
      title: 'Stripe-Zahlungen (automatisch)',
      file: 'src/app/api/create-checkout + stripe-webhook',
      items: [
        '4 Produkte: premium (197), strategie (497), zertifikat (97), kurs (297)',
        'Kunde wird zu Stripe Checkout weitergeleitet',
        'Nach Zahlung: Zugangscode wird automatisch generiert',
        'Code wird per E-Mail an Kunde + Benachrichtigung an dich gesendet',
        'Zahlungs-Erfolgsseite: /zahlung-erfolgreich',
      ],
    },
    {
      title: 'Follow-Up E-Mail System',
      file: 'src/lib/follow-up.js + src/app/api/process-followups',
      items: [
        'Automatische E-Mail-Sequenz nach kostenlosem Assessment',
        'Tag 1: Quick-Wins E-Mail',
        'Tag 3: Social Proof E-Mail',
        'Tag 7: Special Offer E-Mail',
        'Tag 14: Last Chance E-Mail',
        'Verarbeitung taeglich um 8:00 Uhr via Vercel Cron',
        'Status im Admin Dashboard einsehbar',
      ],
    },
    {
      title: 'Admin Dashboard',
      file: '/dashboard (Zugangscode: ADMIN_PASSWORD)',
      items: [
        'KPI-Cards: Kunden, aktive Codes, Free Assessments, Umsatz',
        'Tabs: Uebersicht, Kunden, Zugangscodes, Leads, Follow-Ups',
        'Zugangscodes verlaengern direkt im Dashboard',
        'Letzte Aktivitaeten und Produkt-Statistiken',
      ],
    },
    {
      title: 'Neue Produkt-Seiten (V2)',
      file: 'Verschiedene',
      items: [
        '/foerder-kompass \u2013 Interaktiver Foerdermittel-Finder (Lead-Magnet, kostenlos)',
        '/zertifikat \u2013 KI-Readiness Zertifikat (ab 47)',
        '/kurs \u2013 7-Module Online-Kurs (297)',
        '/benchmarking \u2013 Branchen-Benchmark Report (297)',
        '/toolbox \u2013 KI-Toolbox Mitgliedschaft (ab 29/Monat)',
        '/monitoring \u2013 KI-Monitoring Abo (ab 49/Monat)',
        '/white-label \u2013 White-Label Partnerschaft fuer Berater (ab 99/Monat)',
      ],
    },
    {
      title: 'Kundenzugaenge verwalten',
      file: 'src/data/customers.js + Google Sheets',
      items: [
        'Automatisch: Stripe erzeugt Codes nach Zahlung -> Google Sheets',
        'Manuell im Code: src/data/customers.js bearbeiten',
        'Manuell im Dashboard: /dashboard -> Code verlaengern',
        'Kundenlink: /premium?code=DER_CODE',
      ],
    },
    {
      title: 'E-Mail-Einstellungen',
      file: '.env.local',
      items: [
        'EMAIL_HOST=smtp.gmail.com, EMAIL_PORT=587',
        'EMAIL_USER \u2013 Gmail-Adresse',
        'EMAIL_PASS \u2013 Gmail App-Passwort (Google Konto > Sicherheit > App-Passwoerter)',
        'EMAIL_FROM \u2013 Absendername in E-Mails',
      ],
    },
    {
      title: 'Impressum + Datenschutz',
      file: 'src/app/impressum/page.js + datenschutz/page.js',
      items: [
        'Firmenname, Adresse, E-Mail',
        'USt-IdNr. ergaenzen (vor Go-Live!)',
        'Datenschutz um Stripe-Hinweis ergaenzen',
        'Cookie-Hinweis pruefen',
      ],
      hint: 'Vor Go-Live von einem Anwalt pruefen lassen! Stripe-Datenschutz muss ergaenzt werden.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="card mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">KI-Kompass V2 &ndash; Setup &amp; Bearbeitungsguide</h1>
              <p className="text-gray-500 text-sm">Einrichtung, Konfiguration und Inhaltspflege</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm">
            <p className="text-yellow-800 font-medium mb-2">So bearbeitest du Inhalte:</p>
            <ol className="text-yellow-700 space-y-1 list-decimal list-inside">
              <li>&Ouml;ffne die Datei im angegebenen Pfad mit einem Texteditor (z.B. VS Code)</li>
              <li>&Auml;ndere den gew&uuml;nschten Text direkt im Code</li>
              <li>Speichere die Datei</li>
              <li>Pr&uuml;fe lokal mit <code className="bg-yellow-100 px-1 rounded">npm run dev</code></li>
              <li>F&uuml;r Produktion: <code className="bg-yellow-100 px-1 rounded">npm run build</code> und neu deployen</li>
            </ol>
          </div>
        </div>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <div key={i} className="card">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                <code className="text-xs bg-gray-100 text-primary-700 px-2 py-1 rounded font-mono flex-shrink-0 ml-4">
                  {section.file}
                </code>
              </div>

              <ul className="space-y-2 mb-4">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-start text-sm text-gray-600">
                    <svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {section.hint && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-700">
                  <strong>Tipp:</strong> {section.hint}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="card mt-8 bg-primary-50 border-primary-200">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Wichtige Dateien auf einen Blick</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-primary-200">
                  <th className="text-left py-2 pr-4 font-semibold text-gray-900">Was</th>
                  <th className="text-left py-2 font-semibold text-gray-900">Datei</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {[
                  ['Startseite', 'src/app/page.js'],
                  ['Navigation + Footer', 'src/app/layout.js'],
                  ['Premium Assessment + Auto-PDF', 'src/app/premium/page.js'],
                  ['Kostenloser Check', 'src/app/assessment/page.js'],
                  ['Alle Fragen + Scoring', 'src/data/questions.js'],
                  ['PDF-Report Generator', 'src/lib/pdf-report.js'],
                  ['Zertifikat-Generator', 'src/lib/certificate.js'],
                  ['Follow-Up E-Mails', 'src/lib/follow-up.js'],
                  ['F\u00f6rderprogramm-Datenbank', 'src/data/foerderprogramme.js'],
                  ['Google Sheets + Follow-Ups', 'src/lib/google-sheets.js'],
                  ['E-Mail-Versand', 'src/lib/mail.js'],
                  ['Kundenzug\u00e4nge (manuell)', 'src/data/customers.js'],
                  ['Stripe Checkout', 'src/app/api/create-checkout/route.js'],
                  ['Stripe Webhook', 'src/app/api/stripe-webhook/route.js'],
                  ['Admin Dashboard', 'src/app/dashboard/page.js'],
                  ['Admin API Login', 'src/app/api/admin/login/route.js'],
                  ['Admin API Dashboard', 'src/app/api/admin/dashboard/route.js'],
                  ['Admin API Code-Verl\u00e4ngerung', 'src/app/api/admin/extend-code/route.js'],
                  ['Report-API', 'src/app/api/generate-report/route.js'],
                  ['Zertifikat-API', 'src/app/api/generate-certificate/route.js'],
                  ['Follow-Up Cron', 'src/app/api/process-followups/route.js'],
                  ['Benchmark-API', 'src/app/api/benchmark-data/route.js'],
                  ['White-Label-API', 'src/app/api/white-label-inquiry/route.js'],
                  ['F\u00f6rder-Lead-API', 'src/app/api/foerder-lead/route.js'],
                  ['F\u00f6rder-Kompass', 'src/app/foerder-kompass/page.js'],
                  ['Zertifikat-Seite', 'src/app/zertifikat/page.js'],
                  ['Online-Kurs', 'src/app/kurs/page.js'],
                  ['Benchmarking', 'src/app/benchmarking/page.js'],
                  ['KI-Toolbox', 'src/app/toolbox/page.js'],
                  ['KI-Monitoring', 'src/app/monitoring/page.js'],
                  ['White-Label', 'src/app/white-label/page.js'],
                  ['Zahlung-Erfolgreich', 'src/app/zahlung-erfolgreich/page.js'],
                  ['Bestellseite', 'src/app/anfrage/page.js'],
                  ['\u00dcber mich', 'src/app/ueber-mich/page.js'],
                  ['Impressum', 'src/app/impressum/page.js'],
                  ['Datenschutz', 'src/app/datenschutz/page.js'],
                  ['Cron-Konfiguration', 'vercel.json'],
                  ['Konfiguration', '.env.local'],
                  ['Profilbild', 'public/Steffen2025.jpg'],
                  ['CSS/Styles', 'src/app/globals.css'],
                ].map(([was, datei], i) => (
                  <tr key={i} className="border-b border-primary-100 last:border-0">
                    <td className="py-2 pr-4">{was}</td>
                    <td className="py-2"><code className="text-xs bg-white px-1.5 py-0.5 rounded font-mono text-primary-700">{datei}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

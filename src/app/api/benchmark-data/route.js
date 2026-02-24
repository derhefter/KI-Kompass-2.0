import { NextResponse } from 'next/server'
import { rateLimit } from '../../../lib/rate-limit'
import { sendNotificationToOwner, sendConfirmationToCustomer } from '../../../lib/mail'

const limiter = rateLimit({ maxRequests: 10, windowMs: 60 * 1000 })

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }
  return String(text).replace(/[&<>"]/g, (m) => map[m])
}

const benchmarkData = {
  handwerk: { branche: 'Handwerk & Baugewerbe', avgScore: 32, teilnehmer: 14, topCategory: 'Bereitschaft & Mindset', weakCategory: 'Daten & Infrastruktur', trend: '+5% seit Q3 2025', topTools: ['ChatGPT fuer Angebotserstellung', 'Planungssoftware mit KI', 'Automatisierte Rechnungsstellung'], insights: ['Hohe Bereitschaft aber geringe digitale Infrastruktur', 'Groesstes Potenzial bei Angebots- und Rechnungsprozessen', 'Fachkraeftemangel treibt KI-Interesse'] },
  dienstleistung: { branche: 'Dienstleistung & Beratung', avgScore: 45, teilnehmer: 18, topCategory: 'Strategie & Vision', weakCategory: 'Governance & Compliance', trend: '+8% seit Q3 2025', topTools: ['KI-Chatbots fuer Kundenservice', 'Automatisierte Berichterstellung', 'CRM mit KI-Analyse'], insights: ['Ueberdurchschnittliches Bewusstsein', 'Governance oft noch unklar', 'Hoher ROI bei automatisierten Kundeninteraktionen'] },
  produktion: { branche: 'Produktion & Fertigung', avgScore: 38, teilnehmer: 11, topCategory: 'Daten & Infrastruktur', weakCategory: 'Kompetenz & Schulung', trend: '+3% seit Q3 2025', topTools: ['Predictive Maintenance', 'Qualitaetskontrolle mit Computer Vision', 'Produktionsplanung mit KI'], insights: ['Gute Datenbasis durch Maschinendaten', 'Schulungen als groesste Herausforderung', 'Enormes Einsparpotenzial'] },
  handel: { branche: 'Handel & E-Commerce', avgScore: 52, teilnehmer: 15, topCategory: 'Prozessautomatisierung', weakCategory: 'Kompetenz & Schulung', trend: '+12% seit Q3 2025', topTools: ['Personalisierte Produktempfehlungen', 'Bestandsoptimierung', 'Dynamische Preisgestaltung'], insights: ['Hoechste KI-Adoptionsrate', 'E-Commerce deutlich weiter als stationaer', 'Personalisierung als Haupttreiber'] },
  gesundheit: { branche: 'Gesundheitswesen', avgScore: 35, teilnehmer: 8, topCategory: 'Bereitschaft & Mindset', weakCategory: 'Daten & Infrastruktur', trend: '+4% seit Q3 2025', topTools: ['KI-gestuetzte Terminplanung', 'Dokumentationsassistenten', 'Befundanalyse-Unterstuetzung'], insights: ['Strenge Datenschutzanforderungen', 'Hoher Bedarf an zeitsparenden Loesungen', 'KI-Dokumentation bietet groessten Nutzen'] },
  it: { branche: 'IT & Technologie', avgScore: 65, teilnehmer: 12, topCategory: 'Daten & Infrastruktur', weakCategory: 'Governance & Compliance', trend: '+6% seit Q3 2025', topTools: ['GitHub Copilot', 'KI-Testing-Tools', 'Automatisierte Code-Reviews'], insights: ['Hoechster Reifegrad', 'Governance oft noch informell', 'Entwickler-Produktivitaet steigt 30-50%'] },
}

export async function GET(request) {
  const { allowed } = limiter(request)
  if (!allowed) return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 })
  const { searchParams } = new URL(request.url)
  const branche = searchParams.get('branche')
  if (branche && benchmarkData[branche]) return NextResponse.json(benchmarkData[branche])
  const overview = Object.entries(benchmarkData).map(([key, data]) => ({ key, branche: data.branche, avgScore: data.avgScore, teilnehmer: data.teilnehmer, trend: data.trend }))
  return NextResponse.json({ branches: overview })
}

export async function POST(request) {
  try {
    const { allowed } = limiter(request)
    if (!allowed) return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 })
    const { name, email, company, branche, message } = await request.json()
    if (!name || !email || !company || !branche) return NextResponse.json({ error: 'Alle Felder sind erforderlich' }, { status: 400 })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Ungueltige E-Mail' }, { status: 400 })
    const safeName = escapeHtml((name || '').slice(0, 200))
    const safeEmail = (email || '').slice(0, 254).replace(/[<>\r\n]/g, '')
    const safeCompany = escapeHtml((company || '').slice(0, 200))
    const brancheLabel = benchmarkData[branche] ? benchmarkData[branche].branche : escapeHtml((branche || '').slice(0, 100))
    await sendNotificationToOwner({
      subject: 'Benchmark-Report Bestellung: ' + safeCompany + ' - ' + brancheLabel,
      html: '<h2>Neue Benchmark-Report Bestellung</h2><table style="border-collapse:collapse;width:100%;max-width:500px;"><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">' + safeName + '</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Firma</td><td style="padding:8px;border:1px solid #ddd;">' + safeCompany + '</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">E-Mail</td><td style="padding:8px;border:1px solid #ddd;">' + safeEmail + '</td></tr><tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Branche</td><td style="padding:8px;border:1px solid #ddd;">' + brancheLabel + '</td></tr></table>',
    })
    await sendConfirmationToCustomer({
      to: safeEmail,
      subject: 'Ihre Benchmark-Report Anfrage - ' + brancheLabel,
      html: '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><div style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:30px;text-align:center;border-radius:12px 12px 0 0;"><h1 style="color:white;margin:0;font-size:24px;">Benchmark-Report Anfrage</h1></div><div style="padding:30px;background:white;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;"><p>Hallo ' + safeName + ',</p><p>vielen Dank fuer Ihre Bestellung des <strong>Branchen-Benchmark Reports</strong> fuer <strong>' + brancheLabel + '</strong>.</p><p>Ihr individueller Report wird innerhalb von <strong>3-5 Werktagen</strong> erstellt.</p><p>Mit freundlichen Gruessen,<br><strong>Steffen Hefter</strong><br>KI-Berater | frimalo</p></div></div>',
    })
    return NextResponse.json({ success: true })
  } catch { return NextResponse.json({ error: 'Serverfehler' }, { status: 500 }) }
}

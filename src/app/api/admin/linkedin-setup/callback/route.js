// LinkedIn OAuth2 Callback – tauscht Authorization Code gegen Access Token.
//
// BEWUSST OHNE requireAdmin: LinkedIn ruft diesen Endpoint von außen auf
// und sendet keinen Admin-Token mit. Der OAuth-State sollte prüfen, dass
// der Aufruf zu einer initiierten Session gehört (TODO: state-Param signieren).
// Aktuelles Risiko: Beliebige Person kann Endpoint mit Müll-Code aufrufen
// und löst nur einen LinkedIn-Roundtrip-Error aus → kein Datenleck.
import { NextResponse } from 'next/server'
import { exchangeLinkedInCode } from '../../../../../lib/linkedin'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?linkedin_error=${encodeURIComponent(error)}`
    )
  }
  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?linkedin_error=no_code`)
  }

  const result = await exchangeLinkedInCode(code)

  if (!result.success) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?linkedin_error=${encodeURIComponent(result.error)}`
    )
  }

  // Tokens anzeigen – der User muss sie manuell in Vercel eintragen
  // (Vercel Env Vars können nicht programmatisch aus einer Serverless Function heraus gesetzt werden)
  const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>LinkedIn verbunden</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; background: #f8fafc; }
    .card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; }
    .success { color: #16a34a; font-weight: bold; font-size: 18px; margin-bottom: 16px; }
    .field { background: #f1f5f9; border-radius: 8px; padding: 12px; margin: 8px 0; font-family: monospace; font-size: 13px; word-break: break-all; }
    .label { font-weight: bold; color: #475569; font-size: 12px; margin-bottom: 4px; }
    .btn { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 16px; }
    .warn { background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 12px; margin-top: 16px; font-size: 14px; color: #92400e; }
  </style>
</head>
<body>
  <div class="card">
    <div class="success">✅ LinkedIn erfolgreich verbunden!</div>
    <p>Hallo ${result.profileName} – bitte jetzt diese beiden Werte in <strong>Vercel → Settings → Environment Variables</strong> eintragen:</p>

    <div class="label">LINKEDIN_ACCESS_TOKEN</div>
    <div class="field" id="token">${result.accessToken}</div>

    <div class="label">LINKEDIN_PERSON_URN</div>
    <div class="field">${result.personUrn}</div>

    <div class="warn">
      ⚠️ <strong>Wichtig:</strong> Der Token ist ${Math.floor(result.expiresIn / 86400)} Tage gültig (bis ca. ${new Date(Date.now() + result.expiresIn * 1000).toLocaleDateString('de-DE')}).
      Danach muss dieser Schritt wiederholt werden. Nach dem Eintragen in Vercel: Neu deployen.
    </div>

    <a href="https://vercel.com/steffens-projects-89ed6db5/ki-kompass-v2/settings/environment-variables" target="_blank" class="btn">
      → In Vercel eintragen
    </a>
    &nbsp;
    <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard" class="btn" style="background:#475569;">
      Zum Dashboard
    </a>
  </div>
</body>
</html>`

  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
}

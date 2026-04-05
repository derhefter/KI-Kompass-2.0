// ============================================================
// LINKEDIN API INTEGRATION – KI-Kompass
// ============================================================
import { projectConfig } from '../config/project-config'
// Benötigte Env Vars (in Vercel setzen):
//   LINKEDIN_ACCESS_TOKEN  – OAuth2 Access Token (60 Tage gültig)
//   LINKEDIN_PERSON_URN    – z.B. urn:li:person:XXXXXXX
//   LINKEDIN_CLIENT_ID     – LinkedIn App Client ID (für OAuth)
//   LINKEDIN_CLIENT_SECRET – LinkedIn App Client Secret
//
// SETUP-SCHRITTE (einmalig):
//   1. LinkedIn Developer App anlegen: https://www.linkedin.com/developers/apps
//   2. Permissions: r_liteprofile, w_member_social
//   3. OAuth2 redirect URL: https://www.derhefter.com/api/admin/linkedin-setup/callback
//   4. Im KI-Kompass Dashboard → Blog → LinkedIn verbinden
//   5. Access Token + Person URN in Vercel speichern
// ============================================================

const LINKEDIN_API = 'https://api.linkedin.com/v2'

// LinkedIn UGC Post erstellen (Share)
export async function postToLinkedIn({ title, excerpt, url, imageUrl = null }) {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN
  const personUrn = process.env.LINKEDIN_PERSON_URN

  if (!accessToken || !personUrn) {
    return { success: false, error: 'LinkedIn nicht konfiguriert (LINKEDIN_ACCESS_TOKEN oder LINKEDIN_PERSON_URN fehlt)' }
  }

  // Post-Text formulieren (max 3000 Zeichen)
  const postText = `${title}\n\n${excerpt}\n\n🔗 Jetzt lesen: ${url}\n\n#KIFürKMU #KünstlicheIntelligenz #Mittelstand #Digitalisierung #KIKompass`

  // UGC Post Payload
  const payload = {
    author: personUrn,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: { text: postText },
        shareMediaCategory: 'ARTICLE',
        media: [
          {
            status: 'READY',
            description: { text: excerpt.slice(0, 256) },
            originalUrl: url,
            title: { text: title.slice(0, 200) },
          },
        ],
      },
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
    },
  }

  try {
    const res = await fetch(`${LINKEDIN_API}/ugcPosts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
      body: JSON.stringify(payload),
    })

    if (res.status === 201) {
      const data = await res.json()
      const postId = data.id || ''
      return { success: true, postId }
    }

    // Token abgelaufen?
    if (res.status === 401) {
      return { success: false, error: 'LinkedIn Token abgelaufen – bitte neu verbinden im Dashboard' }
    }

    const errData = await res.text()
    return { success: false, error: `LinkedIn API Fehler ${res.status}: ${errData}` }
  } catch (err) {
    return { success: false, error: `LinkedIn Netzwerkfehler: ${err.message}` }
  }
}

// OAuth2 Authorization URL generieren (für Dashboard-Setup)
export function getLinkedInAuthUrl() {
  const clientId = process.env.LINKEDIN_CLIENT_ID
  if (!clientId) return null

  const redirectUri = encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/linkedin-setup/callback`)
  const scope = encodeURIComponent('openid profile email w_member_social')
  const state = Buffer.from(Date.now().toString()).toString('base64')

  return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`
}

// OAuth2 Token aus Code holen (Callback)
export async function exchangeLinkedInCode(code) {
  const clientId = process.env.LINKEDIN_CLIENT_ID
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/linkedin-setup/callback`

  if (!clientId || !clientSecret) {
    return { success: false, error: 'LinkedIn Client ID oder Secret fehlt' }
  }

  try {
    const res = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    })

    const data = await res.json()
    if (data.access_token) {
      // Person URN über OpenID UserInfo-Endpoint laden (r_liteprofile ist deprecated)
      const profileRes = await fetch('https://api.linkedin.com/v2/userinfo', {
        headers: { Authorization: `Bearer ${data.access_token}` },
      })
      const profile = await profileRes.json()
      // sub enthält die LinkedIn Person-ID
      const personUrn = `urn:li:person:${profile.sub}`
      const profileName = [profile.given_name, profile.family_name].filter(Boolean).join(' ') || profile.name || 'Unbekannt'

      return {
        success: true,
        accessToken: data.access_token,
        expiresIn: data.expires_in,
        personUrn,
        profileName,
      }
    }
    return { success: false, error: data.error_description || 'Token-Austausch fehlgeschlagen' }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

// Token-Status prüfen
export function isLinkedInConfigured() {
  return !!(process.env.LINKEDIN_ACCESS_TOKEN && process.env.LINKEDIN_PERSON_URN)
}

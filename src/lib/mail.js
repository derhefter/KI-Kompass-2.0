import nodemailer from 'nodemailer'

let transporterInstance = null

// Sicherheit: E-Mail Header-Injection verhindern
// Zeilenumbrüche in E-Mail-Feldern können missbraucht werden um
// zusätzliche Header zu injizieren (z.B. BCC an Angreifer)
function sanitizeEmailField(value) {
  if (!value || typeof value !== 'string') return value
  return value.replace(/[\r\n]/g, '').trim()
}

function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false
  // Basale Validierung + Zeilenumbruch-Check
  if (/[\r\n]/.test(email)) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Health-Check: prüft, ob der SMTP-Transport authentifizieren kann.
// Wirft bei Konfigurationsfehler. Aufrufer sollte try/catch.
export async function verifyMailTransport() {
  const transporter = getTransporter()
  if (!transporter) throw new Error('SMTP nicht konfiguriert (EMAIL_HOST/USER/PASS prüfen)')
  await transporter.verify()
  return true
}

function getTransporter() {
  if (!transporterInstance) {
    const host = process.env.EMAIL_HOST
    const user = process.env.EMAIL_USER
    const pass = process.env.EMAIL_PASS

    if (!host || !user || !pass || pass === 'DEIN_16_STELLIGES_APP_PASSWORT') {
      return null
    }

    const port = parseInt(process.env.EMAIL_PORT || '587')
    // secure: explizit via EMAIL_SECURE überschreibbar, sonst aus Port abgeleitet
    // (465 = TLS direkt; 587 = STARTTLS, also secure=false und nodemailer
    // verhandelt TLS automatisch). Funktioniert für Gmail, Strato, IONOS etc.
    const secure = process.env.EMAIL_SECURE === 'true'
      ? true
      : process.env.EMAIL_SECURE === 'false'
      ? false
      : port === 465

    transporterInstance = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    })
  }
  return transporterInstance
}

// Fallback-Notification an einen Webhook (Discord/Slack), wenn Mail fehlschlägt.
// Aktivierung via ENV `OWNER_FALLBACK_WEBHOOK_URL`. Discord/Slack akzeptieren
// beide ein POST mit JSON `{ content }` bzw. `{ text }` – wir senden beides.
async function notifyFallback(subject, htmlOrText) {
  const url = process.env.OWNER_FALLBACK_WEBHOOK_URL
  if (!url) return false
  try {
    // Plain-Text Version (Webhooks rendern HTML nicht)
    const plain = String(htmlOrText)
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 1500)
    const message = `*${subject}*\n${plain}`
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message, text: message }),
    })
    return true
  } catch (err) {
    console.error('Owner-Fallback-Webhook fehlgeschlagen:', err.message)
    return false
  }
}

// E-Mail an Steffen senden (Benachrichtigung bei neuem Lead / Kaufanfrage).
// Bei SMTP-Ausfall wird – falls konfiguriert – der Fallback-Webhook genutzt.
export async function sendNotificationToOwner({ subject, html, attachments }) {
  const transporter = getTransporter()
  if (!transporter) {
    console.error('E-Mail nicht konfiguriert – versuche Fallback-Webhook')
    return notifyFallback(subject, html)
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: process.env.EMAIL_REPLY_TO || process.env.EMAIL_USER,
      subject,
      html,
    }
    if (attachments && attachments.length > 0) {
      mailOptions.attachments = attachments
    }
    await transporter.sendMail(mailOptions)
    return true
  } catch (err) {
    console.error('Fehler beim E-Mail-Versand:', err.message)
    // Fallback: Webhook benachrichtigen, damit Steffen es überhaupt erfährt.
    notifyFallback(`[MAIL FAIL] ${subject}`, html).catch(() => {})
    return false
  }
}

// Bestätigungsmail an den Kunden senden
export async function sendConfirmationToCustomer({ to, subject, html, attachments }) {
  const transporter = getTransporter()
  if (!transporter) {
    console.error('E-Mail nicht konfiguriert – Bestätigung konnte nicht gesendet werden')
    return false
  }

  // Header-Injection-Schutz
  const safeTo = sanitizeEmailField(to)
  const safeSubject = sanitizeEmailField(subject)
  if (!isValidEmail(safeTo)) {
    console.error('Ungültige Empfänger-Adresse (mögliche Injection):', to)
    return false
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: safeTo,
      replyTo: process.env.EMAIL_REPLY_TO || process.env.EMAIL_USER,
      subject: safeSubject,
      html,
    }
    if (attachments && attachments.length > 0) {
      mailOptions.attachments = attachments
    }
    await transporter.sendMail(mailOptions)
    return true
  } catch (err) {
    console.error('Fehler beim E-Mail-Versand:', err.message)
    return false
  }
}

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

function getTransporter() {
  if (!transporterInstance) {
    const host = process.env.EMAIL_HOST
    const user = process.env.EMAIL_USER
    const pass = process.env.EMAIL_PASS

    if (!host || !user || !pass || pass === 'DEIN_16_STELLIGES_APP_PASSWORT') {
      return null
    }

    transporterInstance = nodemailer.createTransport({
      host,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: { user, pass },
    })
  }
  return transporterInstance
}

// E-Mail an Steffen senden (Benachrichtigung bei neuem Lead / Kaufanfrage)
// Unterstützt optionale Attachments: [{ filename, content, contentType }]
export async function sendNotificationToOwner({ subject, html, attachments }) {
  const transporter = getTransporter()
  if (!transporter) {
    console.error('E-Mail nicht konfiguriert – Nachricht konnte nicht gesendet werden')
    return false
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

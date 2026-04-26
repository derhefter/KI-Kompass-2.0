// Zentrale Sanitize-Helper. Eine Quelle der Wahrheit für HTML-Escape,
// User-Text-Bereinigung, Honeypot-Erkennung und Blog-HTML-Sanitization.

import sanitizeHtml from 'sanitize-html'

const HTML_ENTITIES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
}

// Escape für direkte Einbettung in HTML-Bodies (E-Mail-Templates etc.)
export function escapeHtml(input) {
  return String(input ?? '').replace(/[&<>"'`/]/g, (c) => HTML_ENTITIES[c])
}

// User-Eingaben säubern: Länge begrenzen, CRLF entfernen (Header-Injection),
// optional HTML-escapen. Default: maxLen=500, stripCRLF=true, escape=true.
export function sanitizeUserText(value, opts = {}) {
  const { maxLen = 500, stripCRLF = true, escape = true } = opts
  let s = String(value ?? '').slice(0, maxLen)
  if (stripCRLF) s = s.replace(/[\r\n]+/g, ' ')
  if (escape) s = escapeHtml(s)
  return s.trim()
}

// E-Mail-Adressen: trimmen, Header-Injection-Zeichen raus, max 254 Zeichen
// (RFC 5321). KEIN HTML-Escape – Adresse wird typischerweise als Header
// oder mailto verwendet.
export function sanitizeEmail(value) {
  return String(value ?? '')
    .slice(0, 254)
    .replace(/[<>\r\n]/g, '')
    .trim()
}

// Honeypot: Bots füllen alle Felder aus, Menschen ignorieren versteckte.
// Frontend-Konvention:
//   <input name="hp_field_xy" tabindex="-1" autocomplete="off"
//          aria-hidden="true" style="position:absolute;left:-9999px;opacity:0">
// Wenn das Feld befüllt ist → Bot. Backend tut so, als sei alles OK (200),
// schreibt aber nichts.
//
// Bewusst NICHT "website" o.ä. – kollidiert in einigen Forms mit echten Feldern.
export const HONEYPOT_FIELD = 'hp_field_xy'

export function isHoneypotTriggered(body, fieldName = HONEYPOT_FIELD) {
  if (!body || typeof body !== 'object') return false
  const v = body[fieldName]
  return typeof v === 'string' && v.trim().length > 0
}

// Blog-HTML: Allowlist von Tags & Attributen, alles andere fliegt raus.
// Wird genau einmal in src/app/blog/[slug]/page.js angewendet, bevor wir
// dangerouslySetInnerHTML aufrufen.
const BLOG_ALLOWED_TAGS = [
  'h2', 'h3', 'h4', 'p', 'br', 'hr',
  'strong', 'em', 'b', 'i', 'u', 'mark', 'small', 'sub', 'sup',
  'ul', 'ol', 'li',
  'blockquote', 'q', 'cite',
  'a',
  'code', 'pre',
  'img', 'figure', 'figcaption',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'span', 'div',
]

export function sanitizeBlogHtml(html) {
  if (!html) return ''
  return sanitizeHtml(String(html), {
    allowedTags: BLOG_ALLOWED_TAGS,
    allowedAttributes: {
      a: ['href', 'title', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
      span: ['class'],
      div: ['class'],
      code: ['class'],
      pre: ['class'],
      th: ['scope'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: { img: ['http', 'https', 'data'] },
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { target: '_blank', rel: 'noopener noreferrer' }),
    },
    disallowedTagsMode: 'discard',
  })
}

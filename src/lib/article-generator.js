// ============================================================
// KI-ARTIKEL-GENERATOR – KI-Kompass Blog
// Verwendet Claude (Anthropic API) um wöchentlich neue
// Praxis-Artikel für KMU-Unternehmer zu generieren.
// Benötigt: ANTHROPIC_API_KEY in Vercel Env Vars
// ============================================================

import { projectConfig } from '../config/project-config'

// Content-Kalender: aus zentraler Projekt-Konfiguration
const CONTENT_CALENDAR = projectConfig.blog.contentCalendar

// Thema der aktuellen Woche bestimmen (deterministisch nach KW)
export function getCurrentTopic() {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const weekNum = Math.floor((now - startOfYear) / (7 * 24 * 60 * 60 * 1000))
  const categoryIndex = weekNum % CONTENT_CALENDAR.length
  const category = CONTENT_CALENDAR[categoryIndex]
  const topicIndex = Math.floor(weekNum / CONTENT_CALENDAR.length) % category.topics.length
  return {
    category: category.category,
    topic: category.topics[topicIndex],
    weekNum,
  }
}

// Slug aus Titel generieren
export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[äÄ]/g, 'ae').replace(/[öÖ]/g, 'oe').replace(/[üÜ]/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

// Lesezeit schätzen (200 Wörter/Min.)
export function estimateReadTime(html) {
  const text = html.replace(/<[^>]+>/g, ' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(2, Math.ceil(words / 200))
}

// Artikel mit Claude generieren
export async function generateArticle(topicOverride = null) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY nicht konfiguriert')

  const { category, topic } = topicOverride || getCurrentTopic()
  const today = new Date().toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })

  const systemPrompt = projectConfig.blog.systemPrompt

  const userPrompt = projectConfig.blog.userPromptTemplate
    .replace('{{topic}}', topic)
    .replace('{{category}}', category)
    .replace('{{date}}', today)
    .replace('{{domain}}', projectConfig.domain)

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-5',
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Anthropic API Fehler ${response.status}: ${err}`)
  }

  const data = await response.json()
  const rawText = data.content?.[0]?.text || ''

  // JSON-Metadaten und HTML trennen
  const separatorIndex = rawText.indexOf('---ARTIKEL---')
  if (separatorIndex === -1) throw new Error('Artikelformat ungültig – kein ---ARTIKEL--- Separator gefunden')

  const jsonPart = rawText.slice(0, separatorIndex).trim()
  const htmlPart = rawText.slice(separatorIndex + 13).trim()

  let meta = { title: topic, excerpt: '' }
  try {
    const jsonMatch = jsonPart.match(/\{[\s\S]*\}/)
    if (jsonMatch) meta = JSON.parse(jsonMatch[0])
  } catch {}

  const slug = generateSlug(meta.title || topic)
  const readTime = estimateReadTime(htmlPart)

  return {
    id: `ART-${Date.now()}`,
    slug,
    title: meta.title || topic,
    excerpt: meta.excerpt || '',
    content: htmlPart,
    category,
    topic,
    date: new Date().toISOString().slice(0, 10),
    readTime,
  }
}

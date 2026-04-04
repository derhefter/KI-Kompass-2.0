'use client'

import { useState, useEffect, useCallback } from 'react'

// ============================================================
// Admin Dashboard – KI-Kompass V2
// Tabs: Übersicht | Freigaben | Blog
// ============================================================

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [ld, setLd] = useState(false)
  const [data, setData] = useState(null)
  const [tab, setTab] = useState('overview')

  const token = () => typeof window !== 'undefined' ? sessionStorage.getItem('adminToken') || '' : ''

  const load = useCallback(async () => {
    try {
      const r = await fetch('/api/admin/dashboard', { headers: { 'x-admin-token': token() } })
      const d = await r.json()
      if (d.error) { setIsLoggedIn(false); return }
      setData(d)
    } catch {}
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('adminToken')) {
      setIsLoggedIn(true)
      load()
    }
  }, [load])

  async function login(e) {
    e.preventDefault(); setLd(true); setErr('')
    try {
      const r = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw }) })
      const d = await r.json()
      if (d.token) { sessionStorage.setItem('adminToken', d.token); setIsLoggedIn(true); load() }
      else setErr('Falsches Passwort')
    } catch { setErr('Verbindungsfehler') }
    setLd(false)
  }

  if (!isLoggedIn) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-4 bg-white rounded-xl border border-slate-200 p-8">
        <h1 className="text-xl font-bold text-primary-700 mb-1 text-center">KI-Kompass Admin</h1>
        <p className="text-slate-400 text-sm text-center mb-6">Version 2</p>
        <form onSubmit={login} className="space-y-4">
          <input type="password" value={pw} onChange={e => { setPw(e.target.value); setErr('') }}
            placeholder="Admin-Passwort" autoFocus
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 outline-none text-sm" />
          {err && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{err}</div>}
          <button type="submit" disabled={ld || !pw}
            className="w-full px-5 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 text-sm">
            {ld ? 'Prüfe…' : 'Anmelden'}
          </button>
        </form>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-14">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold text-primary-700">KI-Kompass Admin</h1>
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">V2</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={load} className="text-xs text-slate-500 hover:text-slate-700">↻ Aktualisieren</button>
            <button onClick={() => { sessionStorage.removeItem('adminToken'); setIsLoggedIn(false); setData(null) }}
              className="text-xs text-red-500 hover:text-red-700">Abmelden</button>
          </div>
        </div>
        {/* Tab Bar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1">
          {[
            { id: 'overview', label: '📊 Übersicht' },
            { id: 'queue', label: '📋 Freigaben', badge: data?.pendingCount },
            { id: 'blog', label: '✏️ Blog' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${tab === t.id ? 'border-primary-500 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
              {t.label}
              {t.badge > 0 && <span className="bg-amber-100 text-amber-700 text-xs font-bold px-1.5 py-0.5 rounded-full">{t.badge}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {tab === 'overview' && <OverviewTab data={data} />}
        {tab === 'queue' && <QueueTab token={token} onCountChange={count => setData(d => ({ ...(d || {}), pendingCount: count }))} />}
        {tab === 'blog' && <BlogTab />}
      </div>
    </div>
  )
}

// ============================================================
// TAB: Übersicht
// ============================================================
const CHECKLIST_ITEMS = [
  { key: 'mollie',     label: 'Mollie Live API-Key setzen (MOLLIE_API_KEY)',            hint: 'my.mollie.com → Einstellungen → API-Keys → live_...' },
  { key: 'email',      label: 'E-Mail-Konto ki-kompass@derhefter.com einrichten',       hint: 'Google Workspace App-Passwort → EMAIL_PASS in Vercel' },
  { key: 'openai',     label: 'OpenAI API-Key gesetzt (OPENAI_API_KEY)',                hint: 'platform.openai.com → API Keys' },
  { key: 'cron',       label: 'CRON_SECRET in Vercel setzen',                           hint: 'Beliebiger sicherer String, z.B. blog-cron-2026' },
  { key: 'freigaben',  label: 'Tab "Freigaben" im Premium-Sheet angelegt',              hint: 'GOOGLE_SHEET_PREMIUM_RESULTS → neuer Tab "Freigaben" mit 13 Spalten' },
  { key: 'blogsheet',  label: 'Blog-Sheet angelegt & GOOGLE_SHEET_BLOG gesetzt',        hint: 'Tabs: "Artikel" und "Entwuerfe" – Service Account als Editor einladen' },
  { key: 'booking',    label: 'Booking-URL gesetzt (NEXT_PUBLIC_BOOKING_URL_30)',        hint: 'Google Calendar Buchungslink → Vercel Env Var' },
  { key: 'admin',      label: 'ADMIN_PASSWORD gesetzt',                                 hint: 'Sicheres Passwort für dieses Dashboard' },
  { key: 'testdata',   label: 'Testdaten aus Google Sheets gelöscht',                   hint: 'Kunden-, Zugangscodes- und Ergebnisse-Tabs bereinigen' },
]

function OverviewTab({ data }) {
  const d = data
  const [checked, setChecked] = useState(() => {
    if (typeof window === 'undefined') return {}
    try { return JSON.parse(localStorage.getItem('ki_checklist') || '{}') } catch { return {} }
  })

  function toggleCheck(key) {
    setChecked(prev => {
      const next = { ...prev, [key]: !prev[key] }
      try { localStorage.setItem('ki_checklist', JSON.stringify(next)) } catch {}
      return next
    })
  }

  const doneCount = CHECKLIST_ITEMS.filter(i => checked[i.key]).length
  const allDone = doneCount === CHECKLIST_ITEMS.length

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Kunden gesamt', val: d?.totalCustomers || 0, color: 'text-primary-600 bg-primary-50' },
          { label: 'Codes aktiv', val: d?.activeCodes || 0, color: 'text-green-600 bg-green-50' },
          { label: 'Free Checks', val: d?.freeAssessments || 0, color: 'text-purple-600 bg-purple-50' },
          { label: 'Umsatz', val: `€${d?.estimatedRevenue || 0}`, color: 'text-amber-600 bg-amber-50' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl p-5 border border-slate-200 ${s.color}`}>
            <div className="text-2xl font-bold">{s.val}</div>
            <div className="text-sm opacity-70 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-400 -mt-5 mb-8">
        Zahlen aus Google Sheets. Zum Zurücksetzen Testzeilen direkt in den Sheets löschen (Tabs: Kunden, Zugangscodes, Ergebnisse).
      </p>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-primary-700">Setup-Checkliste</h2>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${allDone ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
            {doneCount} / {CHECKLIST_ITEMS.length} erledigt
          </span>
        </div>

        {allDone && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 text-sm text-green-700 font-medium">
            Alles erledigt – KI-Kompass ist produktionsbereit.
          </div>
        )}

        <div className="space-y-2">
          {CHECKLIST_ITEMS.map(item => {
            const done = !!checked[item.key]
            return (
              <button key={item.key} onClick={() => toggleCheck(item.key)}
                className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-colors ${
                  done
                    ? 'bg-green-50 border-green-200 hover:bg-green-100'
                    : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
                }`}>
                <div className={`w-5 h-5 rounded flex-shrink-0 mt-0.5 flex items-center justify-center border-2 transition-colors ${
                  done ? 'bg-green-500 border-green-500' : 'border-slate-300'
                }`}>
                  {done && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <div>
                  <p className={`text-sm font-medium transition-colors ${done ? 'text-green-700 line-through decoration-green-400' : 'text-slate-700'}`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">{item.hint}</p>
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Env Vars setzen unter:{' '}
            <a href="https://vercel.com/steffens-projects-89ed6db5/ki-kompass-v2/settings/environment-variables"
              target="_blank" rel="noopener noreferrer"
              className="text-primary-500 hover:underline">
              Vercel → Settings → Environment Variables
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// TAB: Freigaben (Unified Content Queue)
// ============================================================
const TYPE_CONFIG = {
  report:      { label: 'Report',      icon: '📋', color: 'blue',   bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-200' },
  assessment:  { label: 'Assessment',  icon: '📊', color: 'amber',  bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200' },
  certificate: { label: 'Zertifikat', icon: '🏅', color: 'green',  bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200' },
  invoice:     { label: 'Rechnung',   icon: '🧾', color: 'orange', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
}

function QueueTab({ token, onCountChange }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)      // item für Freigabe-Modal
  const [preview, setPreview] = useState(null)        // item für Vorschau-Modal (mit HTML)
  const [previewLoading, setPreviewLoading] = useState(false)
  const [persNote, setPersNote] = useState('')
  const [sending, setSending] = useState(false)
  const [rejecting, setRejecting] = useState(null)
  const [rejectReason, setRejectReason] = useState('')
  // Rechnungs-Edits
  const [invEdits, setInvEdits] = useState({ invoiceNumber: '', netto: '', leistungsbeschreibung: '', zahlungsziel: '' })

  useEffect(() => { loadItems() }, [])

  async function loadItems() {
    setLoading(true); setError('')
    try {
      const r = await fetch('/api/admin/content-queue', { headers: { 'x-admin-token': token() } })
      const d = await r.json()
      const list = d.items || []
      setItems(list)
      onCountChange?.(list.length)
      if (d.error) setError(d.error)
    } catch { setError('Verbindungsfehler') }
    setLoading(false)
  }

  async function loadPreview(item) {
    setPreviewLoading(true)
    try {
      const r = await fetch(`/api/admin/content-queue?row=${item.rowIndex}`, { headers: { 'x-admin-token': token() } })
      const d = await r.json()
      setPreview(d.item || item)
    } catch { setPreview(item) }
    setPreviewLoading(false)
  }

  async function approveItem() {
    setSending(true)
    try {
      const body = { rowIndex: selected.rowIndex, personalNote: persNote }
      if (selected.type === 'invoice') body.invoiceEdits = invEdits
      const r = await fetch('/api/admin/content-queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token() },
        body: JSON.stringify(body),
      })
      const d = await r.json()
      if (d.success) {
        setMsg(`✓ Freigegeben & gesendet an ${selected.recipientEmail}`)
        setSelected(null); setPersNote('')
        setTimeout(loadItems, 800)
      } else {
        setMsg('Fehler: ' + (d.error || 'Unbekannt'))
      }
    } catch { setMsg('Verbindungsfehler') }
    setSending(false)
  }

  async function rejectItem() {
    try {
      const r = await fetch('/api/admin/content-queue', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token() },
        body: JSON.stringify({ rowIndex: rejecting.rowIndex, reason: rejectReason || 'Abgelehnt' }),
      })
      const d = await r.json()
      if (d.success) {
        setMsg('Abgelehnt')
        setRejecting(null); setRejectReason('')
        setTimeout(loadItems, 800)
      }
    } catch { setMsg('Verbindungsfehler') }
  }

  const filtered = filter === 'all' ? items : items.filter(i => i.type === filter)
  const counts = items.reduce((acc, i) => { acc[i.type] = (acc[i.type] || 0) + 1; return acc }, {})

  if (loading) return <div className="text-center py-20 text-slate-400">Lade Freigaben…</div>

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-primary-700">Freigaben</h2>
          <p className="text-sm text-slate-500 mt-0.5">Reports, Assessments, Zertifikate und Rechnungen prüfen und freigeben</p>
        </div>
        <button onClick={loadItems} className="text-sm text-slate-500 hover:text-slate-700">↻</button>
      </div>

      {msg && (
        <div className={`rounded-lg p-4 mb-6 text-sm ${msg.startsWith('✓') ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
          {msg}<button onClick={() => setMsg('')} className="float-right opacity-60 hover:opacity-100">×</button>
        </div>
      )}
      {error && <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-sm text-amber-700">{error}</div>}

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: 'all', label: `Alle (${items.length})` },
          ...Object.entries(TYPE_CONFIG).map(([k, v]) => ({ key: k, label: `${v.icon} ${v.label} ${counts[k] ? `(${counts[k]})` : ''}` }))
        ].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${filter === f.key ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Item-Liste */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
          <div className="text-4xl mb-3">✓</div>
          <p className="text-slate-600 font-medium">Keine ausstehenden Freigaben</p>
          <p className="text-slate-400 text-sm mt-1">Alle Dokumente wurden freigegeben oder es liegen noch keine Anfragen vor.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(item => {
            const tc = TYPE_CONFIG[item.type] || TYPE_CONFIG.report
            const meta = item.metadata || {}
            return (
              <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tc.bg} ${tc.text}`}>{tc.icon} {tc.label}</span>
                      <span className="text-xs text-slate-400">{item.createdAt ? new Date(item.createdAt).toLocaleDateString('de-DE') : '–'}</span>
                    </div>
                    <p className="text-sm font-bold text-primary-700 truncate">{item.companyName || '–'}</p>
                    <p className="text-xs text-slate-500">{item.recipientName} &bull; {item.recipientEmail}</p>
                    {item.type === 'report' || item.type === 'assessment' ? (
                      <p className="text-xs text-slate-400 mt-0.5">{meta.percentage}% – Level {meta.level}: {meta.levelTitle}</p>
                    ) : item.type === 'certificate' ? (
                      <p className="text-xs text-slate-400 mt-0.5">{meta.productLabel} – {meta.percentage}% – Zert.-Nr.: {meta.certificateId}</p>
                    ) : item.type === 'invoice' ? (
                      <p className="text-xs text-slate-400 mt-0.5">{meta.planName} – {meta.brutto} € brutto</p>
                    ) : null}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => { loadPreview(item) }}
                      className="px-3 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors">
                      {previewLoading ? '…' : 'Vorschau'}
                    </button>
                    <button onClick={() => {
                      setSelected(item); setPersNote('')
                      if (item.type === 'invoice') {
                        const m = item.metadata || {}
                        setInvEdits({ invoiceNumber: '', netto: m.netto || '', leistungsbeschreibung: '', zahlungsziel: m.zahlungsziel || '' })
                      }
                    }}
                      className="px-3 py-2 bg-primary-500 text-white text-xs font-semibold rounded-lg hover:bg-primary-600 transition-colors">
                      Freigeben →
                    </button>
                    <button onClick={() => { setRejecting(item); setRejectReason('') }}
                      className="px-3 py-2 bg-red-50 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors">
                      ×
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal: Vorschau */}
      {preview && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 flex-shrink-0">
              <h3 className="font-bold text-primary-700">E-Mail-Vorschau: {preview.companyName}</h3>
              <button onClick={() => setPreview(null)} className="text-slate-400 hover:text-slate-600 text-xl">×</button>
            </div>
            <div className="overflow-y-auto flex-1 p-5">
              <div className="bg-slate-50 rounded-lg p-3 mb-4 text-xs text-slate-500 space-y-1">
                <p><strong>An:</strong> {preview.recipientName} &lt;{preview.recipientEmail}&gt;</p>
                <p><strong>Betreff:</strong> {preview.subject}</p>
              </div>
              {preview.htmlContent ? (
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div dangerouslySetInnerHTML={{ __html: preview.htmlContent }} />
                </div>
              ) : (
                <p className="text-slate-400 text-sm">Kein E-Mail-Body – Dokument wird als Anhang gesendet.</p>
              )}
              {preview.attachmentHtml && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-slate-600 mb-2">Anhang (Vorschau):</p>
                  <div className="border-2 border-dashed border-slate-200 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
                    <div dangerouslySetInnerHTML={{ __html: preview.attachmentHtml }} className="scale-75 origin-top-left" style={{ width: '133%' }} />
                  </div>
                </div>
              )}
            </div>
            <div className="p-5 border-t border-slate-200 flex gap-3 flex-shrink-0">
              <button onClick={() => { setSelected(preview); setPreview(null); setPersNote('') }}
                className="flex-1 px-5 py-2.5 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 text-sm">
                Freigeben →
              </button>
              <button onClick={() => setPreview(null)}
                className="px-4 py-2.5 bg-slate-100 text-slate-600 font-semibold rounded-lg hover:bg-slate-200 text-sm">
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Freigeben */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-primary-700 text-lg">
                  {TYPE_CONFIG[selected.type]?.icon} {TYPE_CONFIG[selected.type]?.label} freigeben
                </h3>
                <p className="text-sm text-slate-500">{selected.companyName} &bull; {selected.recipientEmail}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 text-xl">×</button>
            </div>

            {/* Rechnungs-Edits */}
            {selected.type === 'invoice' && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-5 space-y-3">
                <p className="text-xs font-bold text-amber-800">Rechnungsdetails prüfen und ggf. anpassen:</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Rechnungsnummer</label>
                    <input value={invEdits.invoiceNumber} onChange={e => setInvEdits(v => ({ ...v, invoiceNumber: e.target.value }))}
                      placeholder="RE-2026-0042"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Nettobetrag (€)</label>
                    <input value={invEdits.netto} onChange={e => setInvEdits(v => ({ ...v, netto: e.target.value }))}
                      placeholder={selected.metadata?.netto || '147'}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                    {invEdits.netto && (
                      <p className="text-xs text-slate-400 mt-1">
                        USt: {(parseFloat(invEdits.netto) * 0.19).toFixed(2)} € | Brutto: {(parseFloat(invEdits.netto) * 1.19).toFixed(2)} €
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Zahlungsziel</label>
                  <input value={invEdits.zahlungsziel} onChange={e => setInvEdits(v => ({ ...v, zahlungsziel: e.target.value }))}
                    placeholder={selected.metadata?.zahlungsziel || ''}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                </div>
              </div>
            )}

            <div className="mb-5">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Persönliche Notiz <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <textarea value={persNote} onChange={e => setPersNote(e.target.value)}
                placeholder={`Liebe/r ${selected.recipientName},\n\nIch habe Ihre Unterlagen geprüft und…`}
                rows={4}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none resize-none" />
              <p className="text-xs text-slate-400 mt-1">Wird als persönliche Einleitung in die E-Mail eingebaut.</p>
            </div>

            <div className="flex gap-3">
              <button onClick={approveItem} disabled={sending}
                className="flex-1 px-5 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 text-sm">
                {sending ? 'Wird gesendet…' : `→ ${TYPE_CONFIG[selected.type]?.label} freigeben & senden`}
              </button>
              <button onClick={() => setSelected(null)}
                className="px-4 py-3 bg-slate-100 text-slate-600 font-semibold rounded-lg hover:bg-slate-200 text-sm">
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Ablehnen */}
      {rejecting && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <h3 className="font-bold text-primary-700 mb-2">Ablehnen</h3>
            <p className="text-sm text-slate-500 mb-4">{rejecting.companyName} &bull; {TYPE_CONFIG[rejecting.type]?.label}</p>
            <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)}
              placeholder="Begründung (optional)…" rows={3}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none resize-none mb-4" />
            <div className="flex gap-3">
              <button onClick={rejectItem}
                className="flex-1 px-5 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 text-sm">
                Ablehnen
              </button>
              <button onClick={() => setRejecting(null)}
                className="px-4 py-3 bg-slate-100 text-slate-600 font-semibold rounded-lg hover:bg-slate-200 text-sm">
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================
// TAB: Blog-Redaktion (KI-Entwürfe + veröffentlichte Artikel)
// ============================================================
function BlogTab() {
  const [drafts, setDrafts] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [generating, setGenerating] = useState(false)
  const [editing, setEditing] = useState(null) // draft being edited
  const [editForm, setEditForm] = useState({ title: '', excerpt: '', content: '', category: 'KI-Grundlagen' })
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(null) // draft being published
  const [shareLinkedIn, setShareLinkedIn] = useState(false)
  const [publishDate, setPublishDate] = useState(new Date().toISOString().slice(0, 10))
  const [pubLoading, setPubLoading] = useState(false)
  const [rejecting, setRejecting] = useState(null)
  const [rejectNotes, setRejectNotes] = useState('')

  const token = () => typeof window !== 'undefined' ? sessionStorage.getItem('adminToken') || '' : ''
  const CATEGORIES = ['KI-Grundlagen', 'Förderung', 'Praxisbeispiele', 'Tools & Tipps', 'Rechtliches']

  useEffect(() => { loadAll() }, [])

  async function loadAll() {
    setLoading(true); setError('')
    try {
      const [dRes, pRes] = await Promise.all([
        fetch('/api/admin/blog-drafts', { headers: { 'x-admin-token': token() } }),
        fetch('/api/admin/blog-posts'),
      ])
      const dData = await dRes.json()
      const pData = await pRes.json()
      setDrafts(dData.drafts || [])
      setPosts(pData.posts || [])
      if (dData.error) setError(dData.error)
    } catch { setError('Verbindungsfehler') }
    setLoading(false)
  }

  async function generateArticle() {
    setGenerating(true); setMsg('')
    try {
      const r = await fetch('/api/cron/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token() },
        body: JSON.stringify({}),
      })
      const d = await r.json()
      if (d.success) {
        setMsg(`Neuer Entwurf erstellt: "${d.article.title}"`)
        setTimeout(loadAll, 1000)
      } else {
        setMsg('Fehler: ' + (d.error || 'Unbekannter Fehler'))
      }
    } catch { setMsg('Verbindungsfehler bei der Generierung') }
    setGenerating(false)
  }

  async function saveDraft() {
    setSaving(true)
    try {
      const r = await fetch('/api/admin/blog-drafts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token() },
        body: JSON.stringify({ rowIndex: editing.rowIndex, ...editForm }),
      })
      const d = await r.json()
      if (d.success) {
        setMsg('Entwurf gespeichert')
        setEditing(null)
        loadAll()
      } else {
        setMsg('Fehler beim Speichern')
      }
    } catch { setMsg('Verbindungsfehler') }
    setSaving(false)
  }

  async function publishDraft() {
    setPubLoading(true)
    try {
      const r = await fetch('/api/admin/blog-publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token() },
        body: JSON.stringify({
          rowIndex: publishing.rowIndex,
          postToLinkedIn: shareLinkedIn,
          customDate: publishDate,
        }),
      })
      const d = await r.json()
      if (d.success) {
        let successMsg = `Artikel veröffentlicht: ${d.url}`
        if (d.linkedIn?.success) successMsg += ' + LinkedIn gepostet'
        else if (d.linkedIn && !d.linkedIn.success) successMsg += ` (LinkedIn-Fehler: ${d.linkedIn.error})`
        setMsg(successMsg)
        setPublishing(null)
        setShareLinkedIn(false)
        loadAll()
      } else {
        setMsg('Fehler: ' + (d.error || 'Veröffentlichung fehlgeschlagen'))
      }
    } catch { setMsg('Verbindungsfehler') }
    setPubLoading(false)
  }

  async function rejectDraft() {
    try {
      const r = await fetch('/api/admin/blog-drafts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token() },
        body: JSON.stringify({ rowIndex: rejecting.rowIndex, notes: rejectNotes || 'Abgelehnt' }),
      })
      const d = await r.json()
      if (d.success) {
        setMsg('Entwurf abgelehnt')
        setRejecting(null)
        setRejectNotes('')
        loadAll()
      }
    } catch { setMsg('Verbindungsfehler') }
  }

  if (loading) return <div className="text-center py-20 text-slate-400">Lade Blog-Daten…</div>

  // ── Edit Modal ──
  if (editing) return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setEditing(null)} className="text-sm text-slate-500 hover:text-slate-700">← Zurück</button>
        <h2 className="text-lg font-bold text-primary-700">Entwurf bearbeiten</h2>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Titel</label>
          <input value={editForm.title} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Kurztext</label>
          <textarea value={editForm.excerpt} onChange={e => setEditForm(f => ({ ...f, excerpt: e.target.value }))}
            rows={2} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none resize-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Kategorie</label>
          <select value={editForm.category} onChange={e => setEditForm(f => ({ ...f, category: e.target.value }))}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none">
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Inhalt (HTML)</label>
          <textarea value={editForm.content} onChange={e => setEditForm(f => ({ ...f, content: e.target.value }))}
            rows={20} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none resize-y font-mono" />
        </div>
        <div className="flex gap-3">
          <button onClick={saveDraft} disabled={saving}
            className="flex-1 px-5 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 text-sm">
            {saving ? 'Wird gespeichert…' : 'Änderungen speichern'}
          </button>
          <button onClick={() => setEditing(null)}
            className="px-4 py-3 bg-slate-100 text-slate-600 font-semibold rounded-lg hover:bg-slate-200 text-sm">
            Abbrechen
          </button>
        </div>
      </div>
      {/* HTML-Vorschau */}
      <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-sm font-bold text-slate-600 mb-3">Vorschau</h3>
        <div className="prose prose-slate prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: editForm.content }} />
      </div>
    </div>
  )

  // ── Main List View ──
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-primary-700">Blog-Redaktion</h2>
          <p className="text-sm text-slate-500 mt-0.5">KI-Entwürfe prüfen, bearbeiten und veröffentlichen</p>
        </div>
        <div className="flex gap-2">
          <button onClick={loadAll} className="text-sm text-slate-500 hover:text-slate-700">↻</button>
          <button onClick={generateArticle} disabled={generating}
            className="px-4 py-2 bg-primary-500 text-white text-sm font-semibold rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50">
            {generating ? 'Generiert…' : '+ KI-Artikel generieren'}
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {msg && (
        <div className={`rounded-lg p-4 mb-6 text-sm ${msg.startsWith('Fehler') || msg.startsWith('Verbindung') ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-700'}`}>
          {msg}
          <button onClick={() => setMsg('')} className="float-right text-xs opacity-60 hover:opacity-100">×</button>
        </div>
      )}
      {error && <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-sm text-amber-700">{error}</div>}

      {/* Pending Drafts */}
      <div className="mb-10">
        <h3 className="text-base font-bold text-primary-700 mb-4 flex items-center gap-2">
          Entwürfe zur Freigabe
          {drafts.length > 0 && <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">{drafts.length}</span>}
        </h3>

        {drafts.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <p className="text-slate-500 text-sm">Keine ausstehenden Entwürfe.</p>
            <p className="text-slate-400 text-xs mt-1">Jeden Montag wird automatisch ein neuer KI-Artikel generiert, oder manuell oben auslösen.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {drafts.map(d => (
              <div key={d.id} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">Entwurf</span>
                      <span className="text-xs text-slate-400">{d.category}</span>
                      <span className="text-xs text-slate-400">{d.generatedAt ? new Date(d.generatedAt).toLocaleDateString('de-DE') : ''}</span>
                    </div>
                    <h4 className="text-sm font-bold text-primary-700 leading-snug mb-1">{d.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{d.excerpt}</p>
                    <p className="text-xs text-slate-400 mt-1 font-mono">/blog/{d.slug}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => { setEditing(d); setEditForm({ title: d.title, excerpt: d.excerpt, content: d.content, category: d.category }) }}
                      className="px-3 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors">
                      Bearbeiten
                    </button>
                    <button onClick={() => { setPublishing(d); setPublishDate(new Date().toISOString().slice(0, 10)); setShareLinkedIn(false) }}
                      className="px-3 py-2 bg-primary-500 text-white text-xs font-semibold rounded-lg hover:bg-primary-600 transition-colors">
                      Veröffentlichen →
                    </button>
                    <button onClick={() => { setRejecting(d); setRejectNotes('') }}
                      className="px-3 py-2 bg-red-50 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors">
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Published Articles */}
      <div>
        <h3 className="text-base font-bold text-primary-700 mb-4">Veröffentlichte Artikel ({posts.length})</h3>
        {posts.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-6">Noch keine Artikel veröffentlicht.</p>
        ) : (
          <div className="space-y-2">
            {posts.map(p => (
              <div key={p.id || p.slug} className="bg-white rounded-lg border border-slate-200 p-4 flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-700">Live</span>
                    <span className="text-xs text-slate-400">{p.category}</span>
                    <span className="text-xs text-slate-400">{p.date}</span>
                    {p.source === 'ai' && <span className="text-xs text-slate-300">KI</span>}
                  </div>
                  <p className="text-sm font-semibold text-primary-700 truncate">{p.title}</p>
                </div>
                <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-primary-500 hover:underline flex-shrink-0 ml-3">Ansehen</a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LinkedIn-Setup Info */}
      <div className="mt-10 bg-slate-50 rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-2">LinkedIn-Integration</h3>
        <p className="text-xs text-slate-500 mb-3">
          Artikel beim Veröffentlichen automatisch auf LinkedIn teilen. Dafür werden in Vercel benötigt:
          LINKEDIN_ACCESS_TOKEN und LINKEDIN_PERSON_URN.
        </p>
        <a href="/api/admin/linkedin-setup/callback?setup=info"
          className="text-xs font-semibold text-primary-500 hover:underline">
          LinkedIn verbinden (OAuth-Setup) →
        </a>
      </div>

      {/* Publish Modal */}
      {publishing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-primary-700 text-lg">Artikel veröffentlichen</h3>
                <p className="text-sm text-slate-500 mt-0.5">{publishing.title}</p>
              </div>
              <button onClick={() => setPublishing(null)} className="text-slate-400 hover:text-slate-600 text-lg">×</button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Veröffentlichungsdatum</label>
                <input type="date" value={publishDate} onChange={e => setPublishDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
              </div>

              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 cursor-pointer">
                <input type="checkbox" checked={shareLinkedIn} onChange={e => setShareLinkedIn(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Auf LinkedIn teilen</p>
                  <p className="text-xs text-slate-400">Artikel wird automatisch als LinkedIn-Post geteilt</p>
                </div>
              </label>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 mb-5 text-xs text-slate-500">
              <p><strong>Kategorie:</strong> {publishing.category}</p>
              <p><strong>URL:</strong> /blog/{publishing.slug}</p>
              <p><strong>Kurztext:</strong> {publishing.excerpt?.slice(0, 120)}…</p>
            </div>

            <div className="flex gap-3">
              <button onClick={publishDraft} disabled={pubLoading}
                className="flex-1 px-5 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 text-sm">
                {pubLoading ? 'Wird veröffentlicht…' : '→ Jetzt veröffentlichen'}
              </button>
              <button onClick={() => setPublishing(null)}
                className="px-4 py-3 bg-slate-100 text-slate-600 font-semibold rounded-lg hover:bg-slate-200 text-sm">
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejecting && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <h3 className="font-bold text-primary-700 mb-2">Entwurf ablehnen</h3>
            <p className="text-sm text-slate-500 mb-4">"{rejecting.title}"</p>
            <textarea value={rejectNotes} onChange={e => setRejectNotes(e.target.value)}
              placeholder="Begründung (optional)…" rows={3}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none resize-none mb-4" />
            <div className="flex gap-3">
              <button onClick={rejectDraft}
                className="flex-1 px-5 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors text-sm">
                Ablehnen
              </button>
              <button onClick={() => setRejecting(null)}
                className="px-4 py-3 bg-slate-100 text-slate-600 font-semibold rounded-lg hover:bg-slate-200 text-sm">
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

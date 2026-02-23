'use client'

import { useState, useEffect, useCallback } from 'react'

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [ld, setLd] = useState(false)
  const [data, setData] = useState(null)
  const [tab, setTab] = useState('overview')
  const [extC, setExtC] = useState('')
  const [extD, setExtD] = useState(30)
  const [extM, setExtM] = useState('')

  const load = useCallback(async () => {
    try {
      const r = await fetch('/api/admin/dashboard', { headers: { 'x-admin-token': sessionStorage.getItem('adminToken') || '' } })
      const d = await r.json()
      if (d.error) { setIsLoggedIn(false); return }
      setData(d)
    } catch {}
  }, [])

  useEffect(() => { if (sessionStorage.getItem('adminToken')) { setIsLoggedIn(true); load() } }, [load])

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
  async function extend(e) {
    e.preventDefault(); setExtM('')
    try {
      const r = await fetch('/api/admin/extend-code', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-token': sessionStorage.getItem('adminToken') || '' }, body: JSON.stringify({ code: extC, days: extD }) })
      const d = await r.json()
      if (d.success) { setExtM('Code verl\u00e4ngert!'); setExtC(''); load() } else setExtM(d.error || 'Fehler')
    } catch { setExtM('Verbindungsfehler') }
  }
  if (!isLoggedIn) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-4"><div className="card text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-500 mb-6">KI-Kompass V2</p>
        <form onSubmit={login} className="space-y-4">
          <input type="password" value={pw} onChange={e=>{setPw(e.target.value);setErr('')}} placeholder="Admin-Passwort" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 outline-none" autoFocus />
          {err && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{err}</div>}
          <button type="submit" disabled={ld||!pw} className="btn-primary w-full disabled:opacity-50">{ld?'Pr\u00fcfe...':'Anmelden'}</button>
        </form>
      </div></div>
    </div>
  )
  const d = data
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-14">
          <div className="flex items-center space-x-3"><h1 className="text-lg font-bold text-gray-900">Admin Dashboard</h1><span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">V2</span></div>
          <div className="flex items-center space-x-4">
            <button onClick={load} className="text-sm text-gray-500 hover:text-gray-700">Aktualisieren</button>
            <button onClick={()=>{sessionStorage.removeItem('adminToken');setIsLoggedIn(false);setData(null)}} className="text-sm text-red-600">Abmelden</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {d&&<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card bg-blue-50 text-blue-700"><div className="text-2xl font-bold">{d.totalCustomers||0}</div><div className="text-sm opacity-70">Kunden</div></div>
          <div className="card bg-green-50 text-green-700"><div className="text-2xl font-bold">{d.activeCodes||0}</div><div className="text-sm opacity-70">Codes aktiv</div></div>
          <div className="card bg-purple-50 text-purple-700"><div className="text-2xl font-bold">{d.freeAssessments||0}</div><div className="text-sm opacity-70">Free Checks</div></div>
          <div className="card bg-amber-50 text-amber-700"><div className="text-2xl font-bold">&euro;{d.estimatedRevenue||0}</div><div className="text-sm opacity-70">Umsatz</div></div>
        </div>}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Dashboard Inhalt</h2>
          <p className="text-gray-600">Verbinden Sie Google Sheets und setzen Sie die Umgebungsvariablen (GOOGLE_SHEET_CUSTOMERP usw.), um Daten hier anzuzeigen.</p>
        </div>
      </div>
    </div>
  )
}

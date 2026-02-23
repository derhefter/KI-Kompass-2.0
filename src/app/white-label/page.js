'use client'

import { useState } from 'react'

export default function WhiteLabel() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', plan: 'professional', message: '' })

  async function handleSubmit(e) {
    e.preventDefault()
    try { await fetch('/api/white-label-inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }) } catch {}
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">B2B Lizenzmodell</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">KI-Kompass als White-Label</h1>
          <p className="text-xl text-gray-300 mb-8">Nutzen Sie unsere bew&auml;hrte KI-Assessment-Plattform unter Ihrem eigenen Branding. F&uuml;r Berater, IHKs und Wirtschaftsf&ouml;rderungen.</p>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4">
        <h2 className="section-title text-center mb-12">Lizenz-Pakete</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Starter', price: '99', features: ['1 Berater-Account', 'Eigenes Logo', 'Bis 10 Assessments/Monat', 'Standard-Fragen', 'E-Mail-Support'] },
            { name: 'Professional', price: '199', popular: true, features: ['3 Berater-Accounts', 'Custom Branding', 'Bis 50 Assessments/Monat', 'Eigene Fragen hinzuf\u00fcgen', 'White-Label Reports', 'Priority Support'] },
            { name: 'Enterprise', price: '499', features: ['Unbegrenzt Berater', 'Full Customization', 'Unbegrenzt Assessments', 'API-Zugang', 'Custom Domain', 'Dedicated Support'] },
          ].map((p, i) => (
            <div key={i} className={`card text-center ${p.popular ? 'border-2 border-primary-500 shadow-xl' : 'border border-gray-200'}`}>
              {p.popular && <div className="text-xs bg-primary-600 text-white px-3 py-1 rounded-full inline-block mb-2">Beliebteste Wahl</div>}
              <div className="text-sm font-semibold text-gray-500 uppercase mb-2">{p.name}</div>
              <div className="text-4xl font-extrabold text-gray-900 mb-1">&euro;{p.price}<span className="text-lg font-normal text-gray-500">/Monat</span></div>
              <ul className="space-y-2 text-left text-sm mb-6 mt-6">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center"><svg className="w-4 h-4 text-accent-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>{f}</li>
                ))}
              </ul>
              <a href="#demo" className={p.popular ? 'btn-primary w-full' : 'btn-secondary w-full'}>Demo anfragen</a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section id="demo" className="py-16 bg-white">
        <div className="max-w-lg mx-auto px-4">
          <h2 className="section-title text-center mb-8">Demo anfragen</h2>
          {sent ? (
            <div className="card bg-accent-50 border-accent-200 text-center">
              <svg className="w-12 h-12 text-accent-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="font-semibold text-gray-900">Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card space-y-4">
              <input type="text" placeholder="Ihr Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 outline-none" />
              <input type="email" placeholder="E-Mail" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 outline-none" />
              <input type="text" placeholder="Unternehmen" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 outline-none" />
              <textarea placeholder="Ihre Nachricht (optional)" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 outline-none" />
              <button type="submit" className="btn-primary w-full">Demo anfragen</button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}

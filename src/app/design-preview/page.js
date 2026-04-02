'use client'

import { useState } from 'react'

// ============================================================
// DESIGN PREVIEW - 3 Varianten zum Vergleichen
// Aufruf: /design-preview
// Diese Seite ist nur für die interne Auswahl gedacht.
// ============================================================

const designs = {
  a: {
    name: 'Klarer Kurs',
    mood: 'Corporate Calm',
    desc: 'Ruhig, professionell, vertrauenserweckend. Wie eine seri\u00f6se Unternehmensberatung, aber zug\u00e4nglich.',
    fonts: 'Inter + Source Sans 3',
    bg: 'bg-[#F8FAFC]',
    heroBg: 'bg-gradient-to-br from-[#F8FAFC] to-[#E8F0FE]',
    headlineColor: 'text-[#1B2B4B]',
    accentColor: 'text-[#2D5BFF]',
    btnPrimary: 'bg-[#2D5BFF] hover:bg-[#1A45E0] text-white',
    btnSecondary: 'border-2 border-[#CBD5E1] text-[#334155] hover:bg-[#E8F0FE]',
    trustBg: 'bg-[#1B2B4B]',
    trustText: 'text-white',
    accentBg: 'bg-[#0D9488]',
    accentText: 'text-[#0D9488]',
    cardBorder: 'border-[#E8F0FE]',
    badgeBg: 'bg-[#FEF3C7] text-[#92400E]',
    palette: [
      { hex: '#1B2B4B', label: 'Navy' },
      { hex: '#2D5BFF', label: 'Primary Blue' },
      { hex: '#E8F0FE', label: 'Light Blue' },
      { hex: '#0D9488', label: 'Teal' },
      { hex: '#F8FAFC', label: 'Background' },
      { hex: '#334155', label: 'Text' },
      { hex: '#FEF3C7', label: 'Warm Yellow' },
      { hex: '#FFFFFF', label: 'White' },
    ],
  },
  b: {
    name: 'Digitale Klarheit',
    mood: 'Modern Minimal',
    desc: 'Sauber, modern, tech-affin aber warm. Wie ein modernes SaaS-Produkt f\u00fcr Nicht-Techniker.',
    fonts: 'Plus Jakarta Sans + Inter',
    bg: 'bg-[#F9FAFB]',
    heroBg: 'bg-gradient-to-br from-[#F9FAFB] to-[#EEF2FF]',
    headlineColor: 'text-[#0F172A]',
    accentColor: 'text-[#6366F1]',
    btnPrimary: 'bg-[#6366F1] hover:bg-[#4F46E5] text-white',
    btnSecondary: 'border-2 border-[#E2E8F0] text-[#475569] hover:bg-[#EEF2FF]',
    trustBg: 'bg-[#0F172A]',
    trustText: 'text-white',
    accentBg: 'bg-[#10B981]',
    accentText: 'text-[#10B981]',
    cardBorder: 'border-[#E2E8F0]',
    badgeBg: 'bg-[#FDE68A] text-[#92400E]',
    palette: [
      { hex: '#0F172A', label: 'Ink' },
      { hex: '#6366F1', label: 'Indigo' },
      { hex: '#EEF2FF', label: 'Indigo Tint' },
      { hex: '#10B981', label: 'Emerald' },
      { hex: '#F9FAFB', label: 'Background' },
      { hex: '#475569', label: 'Text' },
      { hex: '#FDE68A', label: 'Amber' },
      { hex: '#FFFFFF', label: 'White' },
    ],
  },
  c: {
    name: 'Mittelstand Modern',
    mood: 'Warm Professional',
    desc: 'Wie ein vertrauensw\u00fcrdiger Berater, der Technologie versteht. Warm, geerdet, einladend.',
    fonts: 'DM Sans + Nunito Sans',
    bg: 'bg-[#F9FAFB]',
    heroBg: 'bg-gradient-to-br from-[#FFFBEB] to-[#F0F9FF]',
    headlineColor: 'text-[#1E293B]',
    accentColor: 'text-[#0369A1]',
    btnPrimary: 'bg-[#0369A1] hover:bg-[#075985] text-white',
    btnSecondary: 'border-2 border-[#CBD5E1] text-[#374151] hover:bg-[#F0F9FF]',
    trustBg: 'bg-[#1E293B]',
    trustText: 'text-white',
    accentBg: 'bg-[#059669]',
    accentText: 'text-[#059669]',
    cardBorder: 'border-[#E2E8F0]',
    badgeBg: 'bg-[#D97706] text-white',
    palette: [
      { hex: '#1E293B', label: 'Dark Slate' },
      { hex: '#0369A1', label: 'Ocean Blue' },
      { hex: '#F0F9FF', label: 'Sky Light' },
      { hex: '#059669', label: 'Green' },
      { hex: '#FFFBEB', label: 'Warm BG' },
      { hex: '#374151', label: 'Text' },
      { hex: '#D97706', label: 'Amber' },
      { hex: '#FFFFFF', label: 'White' },
    ],
  },
}

function DesignPreview({ d }) {
  return (
    <div className={`${d.bg} rounded-2xl overflow-hidden shadow-xl border border-slate-200`}>
      {/* Hero */}
      <div className={`${d.heroBg} p-8 md:p-12`}>
        <div className="max-w-2xl mx-auto text-center">
          <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium mb-4 ${d.badgeBg}`}>
            Kostenfrei &middot; 5 Minuten &middot; Sofort Ergebnis
          </div>
          <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${d.headlineColor}`}>
            Finden Sie heraus, wie Ihr Unternehmen{' '}
            <span className={d.accentColor}>KI sinnvoll einsetzen</span> kann
          </h2>
          <p className="text-slate-600 mb-6 text-sm">
            Unser Readiness-Check analysiert Ihre Ausgangslage und zeigt konkrete n&auml;chste Schritte.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className={`px-6 py-3 rounded-xl font-semibold text-sm shadow-md transition-all ${d.btnPrimary}`}>
              Kostenlosen Check starten &rarr;
            </button>
            <button className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${d.btnSecondary}`}>
              30 Min Erstberatung buchen
            </button>
          </div>
          <div className="mt-6 flex justify-center gap-6 text-xs text-slate-500">
            {['DSGVO-konform', 'Praxisorientiert', '50+ KMU'].map((t) => (
              <span key={t} className="flex items-center">
                <svg className={`w-3.5 h-3.5 mr-1 ${d.accentText}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Preview */}
      <div className="p-8">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {['KI-Bewusstsein', 'Daten & Tools', 'Nachhaltigkeit'].map((cat) => (
            <div key={cat} className={`bg-white rounded-xl p-4 border ${d.cardBorder} text-center`}>
              <p className="text-xs text-slate-500 mb-1">{cat}</p>
              <p className={`text-lg font-bold ${d.headlineColor}`}>62%</p>
            </div>
          ))}
        </div>

        {/* Pricing Preview */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`bg-white rounded-xl p-5 border ${d.cardBorder}`}>
            <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Schnell-Check</p>
            <p className={`text-xl font-extrabold ${d.headlineColor} mb-2`}>Kostenfrei</p>
            <button className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition-all ${d.btnSecondary}`}>
              Jetzt starten
            </button>
          </div>
          <div className={`bg-white rounded-xl p-5 border-2 ${d.accentColor.replace('text-', 'border-')} relative`}>
            <div className={`absolute -top-2 left-1/2 -translate-x-1/2 ${d.accentBg} text-white px-3 py-0.5 rounded-full text-xs font-semibold`}>
              Beliebt
            </div>
            <p className={`text-xs uppercase font-semibold mb-1 ${d.accentColor}`}>Premium</p>
            <p className={`text-xl font-extrabold ${d.headlineColor} mb-2`}>&euro;197</p>
            <button className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition-all ${d.btnPrimary}`}>
              Kaufen
            </button>
          </div>
        </div>
      </div>

      {/* Trust Bar Preview */}
      <div className={`${d.trustBg} p-6`}>
        <div className="grid grid-cols-4 gap-4 text-center">
          {[
            { num: '50+', label: 'Unternehmen' },
            { num: '94%', label: 'Empfehlung' },
            { num: '12', label: 'Fragen' },
            { num: '5 Min', label: 'Ergebnis' },
          ].map((s) => (
            <div key={s.label} className={d.trustText}>
              <p className="text-lg font-extrabold">{s.num}</p>
              <p className="text-xs opacity-70">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function DesignPreviewPage() {
  const [selected, setSelected] = useState('a')

  return (
    <div className="min-h-screen bg-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Design-Varianten Vergleich</h1>
          <p className="text-slate-600">W&auml;hlen Sie eine Richtung, um die Vorschau zu sehen. Diese Seite ist nur intern.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {Object.entries(designs).map(([key, d]) => (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selected === key
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="text-sm font-bold uppercase">Variante {key.toUpperCase()}</span>
              <span className="block text-xs mt-0.5 opacity-70">{d.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Design Info */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-slate-200">
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{designs[selected].name} &ndash; {designs[selected].mood}</h2>
              <p className="text-slate-600 text-sm mt-1">{designs[selected].desc}</p>
              <p className="text-slate-500 text-xs mt-1">Fonts: {designs[selected].fonts}</p>
            </div>
            <div className="flex gap-2 ml-auto">
              {designs[selected].palette.map((c) => (
                <div key={c.hex} className="text-center">
                  <div className="w-10 h-10 rounded-lg shadow-inner border border-slate-200" style={{ backgroundColor: c.hex }} title={c.label} />
                  <p className="text-[10px] text-slate-500 mt-1">{c.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Design Preview */}
        <DesignPreview d={designs[selected]} />

        {/* All Three Side by Side (smaller) */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Alle drei im Vergleich</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {Object.entries(designs).map(([key, d]) => (
              <div key={key}>
                <h3 className="text-sm font-bold text-slate-700 mb-2 text-center">
                  Variante {key.toUpperCase()}: {d.name}
                </h3>
                <div className="transform scale-[0.85] origin-top">
                  <DesignPreview d={d} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

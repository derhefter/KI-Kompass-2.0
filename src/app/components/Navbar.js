'use client'

import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            <img src="/frimalo logo.png" alt="frimalo" className="h-10 w-auto" />
            <span className="text-lg font-bold text-primary-700">KI-Kompass</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#so-funktionierts" className="text-slate-600 hover:text-primary-500 transition-colors text-sm">So funktioniert&apos;s</a>
            <a href="/#preise" className="text-slate-600 hover:text-primary-500 transition-colors text-sm">Preise</a>
            <a href="/blog" className="text-slate-600 hover:text-primary-500 transition-colors text-sm">Blog</a>
            <a href="/ueber-mich" className="text-slate-600 hover:text-primary-500 transition-colors text-sm">&Uuml;ber mich</a>
            <a href="/assessment" className="inline-flex items-center px-5 py-2 text-sm font-semibold text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors">
              Jetzt starten
              <svg className="w-3.5 h-3.5 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Mobile: Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Menü öffnen"
          >
            <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-300 ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-5 h-0.5 bg-slate-700 mt-1 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-slate-700 mt-1 transition-all duration-300 ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border-t border-slate-100 px-4 py-3 space-y-1">
          <a href="/#so-funktionierts" onClick={() => setOpen(false)}
            className="block px-4 py-3 text-slate-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg text-sm font-medium transition-colors">
            So funktioniert&apos;s
          </a>
          <a href="/#preise" onClick={() => setOpen(false)}
            className="block px-4 py-3 text-slate-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg text-sm font-medium transition-colors">
            Preise
          </a>
          <a href="/blog" onClick={() => setOpen(false)}
            className="block px-4 py-3 text-slate-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg text-sm font-medium transition-colors">
            Blog
          </a>
          <a href="/ueber-mich" onClick={() => setOpen(false)}
            className="block px-4 py-3 text-slate-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg text-sm font-medium transition-colors">
            &Uuml;ber mich
          </a>
          <div className="pt-2 pb-1">
            <a href="/assessment" onClick={() => setOpen(false)}
              className="block w-full text-center px-5 py-3 text-sm font-semibold text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors">
              Jetzt starten
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

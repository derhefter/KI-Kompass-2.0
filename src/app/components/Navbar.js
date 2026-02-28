'use client'

import { useState } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [produkteOpen, setProduktOpen] = useState(false)

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setProduktOpen(false)
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            <img src="/frimalo logo.png" alt="frimalo" className="h-10 w-auto" />
            <span className="text-xl font-bold text-gray-900">KI-Kompass</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/#vorteile" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">Vorteile</a>
            <a href="/#preise" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">Preise</a>
            <div className="relative group">
              <button className="text-gray-600 hover:text-primary-600 transition-colors text-sm flex items-center">
                Produkte
                <svg className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <a href="/foerder-kompass" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700">F&ouml;rder-Kompass</a>
                  <a href="/zertifikat" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700">KI-Zertifikat</a>
                  <a href="/kurs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700">Online-Kurs</a>
                  <a href="/benchmarking" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700">Branchen-Benchmark</a>
                  <a href="/toolbox" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700">KI-Toolbox</a>
                  <a href="/monitoring" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700">KI-Monitoring</a>
                </div>
              </div>
            </div>
            <a href="/white-label" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">F&uuml;r Berater</a>
            <a href="/ueber-mich" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">&Uuml;ber mich</a>
            <a href="/assessment" className="btn-primary !py-2 !px-6 !text-base">Jetzt starten</a>
          </div>

          {/* Mobile: Hamburger Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menü öffnen"
          >
            <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 mt-1 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 mt-1 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          <a
            href="/#vorteile"
            onClick={closeMobileMenu}
            className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg text-sm font-medium transition-colors"
          >
            Vorteile
          </a>
          <a
            href="/#preise"
            onClick={closeMobileMenu}
            className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg text-sm font-medium transition-colors"
          >
            Preise
          </a>

          {/* Produkte Accordion */}
          <div>
            <button
              onClick={() => setProduktOpen(!produkteOpen)}
              className="w-full flex justify-between items-center px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg text-sm font-medium transition-colors"
            >
              Produkte
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${produkteOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {produkteOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l-2 border-primary-100 pl-4">
                <a href="/foerder-kompass" onClick={closeMobileMenu} className="block py-2 text-sm text-gray-600 hover:text-primary-700 transition-colors">F&ouml;rder-Kompass</a>
                <a href="/zertifikat" onClick={closeMobileMenu} className="block py-2 text-sm text-gray-600 hover:text-primary-700 transition-colors">KI-Zertifikat</a>
                <a href="/kurs" onClick={closeMobileMenu} className="block py-2 text-sm text-gray-600 hover:text-primary-700 transition-colors">Online-Kurs</a>
                <a href="/benchmarking" onClick={closeMobileMenu} className="block py-2 text-sm text-gray-600 hover:text-primary-700 transition-colors">Branchen-Benchmark</a>
                <a href="/toolbox" onClick={closeMobileMenu} className="block py-2 text-sm text-gray-600 hover:text-primary-700 transition-colors">KI-Toolbox</a>
                <a href="/monitoring" onClick={closeMobileMenu} className="block py-2 text-sm text-gray-600 hover:text-primary-700 transition-colors">KI-Monitoring</a>
              </div>
            )}
          </div>

          <a
            href="/white-label"
            onClick={closeMobileMenu}
            className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg text-sm font-medium transition-colors"
          >
            F&uuml;r Berater
          </a>
          <a
            href="/ueber-mich"
            onClick={closeMobileMenu}
            className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg text-sm font-medium transition-colors"
          >
            &Uuml;ber mich
          </a>

          {/* CTA Button */}
          <div className="pt-3 pb-2">
            <a
              href="/assessment"
              onClick={closeMobileMenu}
              className="btn-primary w-full text-center !py-3 !text-sm block"
            >
              Jetzt starten
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

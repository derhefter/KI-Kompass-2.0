'use client'

import { useEffect, useRef } from 'react'

export default function ForWho() {
  const cardRefs = useRef([])
  const headingRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0
            setTimeout(() => {
              entry.target.classList.remove('scroll-hidden')
              entry.target.classList.add('scroll-visible')
            }, Number(delay))
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })
    if (headingRef.current) observer.observe(headingRef.current)

    return () => observer.disconnect()
  }, [])

  const situations = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      situation: '\u201eKI ist \u00fcberall Thema \u2013 aber ist das auch was f\u00fcr uns?\u201c',
      desc: 'Sie h\u00f6ren viel von KI, wissen aber nicht, ob Ihr Betrieb davon wirklich profitiert oder ob es Zeitverschwendung ist.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      situation: '\u201eWir verlieren t\u00e4glich Zeit mit Aufgaben, die ein Computer erledigen k\u00f6nnte.\u201c',
      desc: 'Angebote schreiben, E-Mails sortieren, Berichte erstellen \u2013 manuelle Routinen kosten Ihr Team wertvolle Stunden.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      situation: '\u201eIch h\u00f6re, man kann F\u00f6rdermittel bekommen \u2013 wei\u00df aber nicht wie.\u201c',
      desc: 'Bis zu 50\u202f% der Digitalisierungskosten sind f\u00f6rderf\u00e4hig. Die meisten KMU wissen nicht, welche Programme zu ihnen passen.',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Karten zuerst – erscheinen nacheinander beim Scrollen */}
        <div className="grid md:grid-cols-3 gap-6">
          {situations.map((s, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              data-delay={i * 200}
              className="bg-warm-50 rounded-xl p-6 scroll-hidden"
            >
              <div className="w-12 h-12 bg-white text-primary-500 rounded-lg flex items-center justify-center mb-5 border border-slate-100">
                {s.icon}
              </div>
              <p className="text-base font-semibold text-primary-700 mb-2 leading-snug">{s.situation}</p>
              <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Überschrift erscheint NACH den Karten */}
        <div
          ref={headingRef}
          data-delay="200"
          className="text-center mt-14 scroll-hidden"
        >
          <h2 className="text-xl md:text-2xl font-bold text-primary-700 mb-3">
            Kommt Ihnen das bekannt vor?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Dann sind Sie hier richtig. Der KI-Kompass gibt Ihnen in 5 Minuten
            klare Antworten &ndash; ohne Beratersprech.
          </p>
          <div className="mt-10">
            <a href="/assessment" className="btn-primary">
              Jetzt kostenlos pr&uuml;fen
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

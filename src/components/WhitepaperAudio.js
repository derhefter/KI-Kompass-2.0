'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const AUDIO_SRC = '/Pragmatischer_KI-Einstieg_für_den_Mittelstand.m4a'
const PDF_SRC = '/Pragmatische_KI_im_Mittelstand.pdf'
const FREE_SECONDS = 180 // 3-Min Lead-Gate
const STORAGE_KEY = 'kk_whitepaper_unlocked'
const WAVE_BARS = 56

// Pseudo-Waveform: deterministische Bar-Höhen, keine externe Library nötig.
function buildWavePattern(n = WAVE_BARS) {
  const out = []
  let seed = 73
  for (let i = 0; i < n; i++) {
    seed = (seed * 9301 + 49297) % 233280
    const r = seed / 233280
    const hill = 0.45 + 0.45 * Math.sin((i / n) * Math.PI * 2.2)
    const h = 0.25 + Math.min(1, hill + (r - 0.5) * 0.55) * 0.75
    out.push(Math.max(0.18, Math.min(1, h)))
  }
  return out
}
const WAVE = buildWavePattern()

function fmt(seconds) {
  if (!Number.isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function WhitepaperAudio() {
  const audioRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [unlocked, setUnlocked] = useState(false)
  const [showGate, setShowGate] = useState(false)
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Unlock-Status laden
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') setUnlocked(true)
    } catch (_) {}
  }, [])

  // Audio-Listener
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const onTime = () => setCurrent(el.currentTime || 0)
    const onMeta = () => setDuration(el.duration || 0)
    const onEnd = () => setPlaying(false)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    el.addEventListener('timeupdate', onTime)
    el.addEventListener('loadedmetadata', onMeta)
    el.addEventListener('ended', onEnd)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    return () => {
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('loadedmetadata', onMeta)
      el.removeEventListener('ended', onEnd)
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
    }
  }, [])

  // Lead-Gate bei 3 min
  useEffect(() => {
    if (unlocked) return
    if (current >= FREE_SECONDS && playing) {
      const el = audioRef.current
      if (el) {
        el.pause()
        el.currentTime = FREE_SECONDS
      }
      setShowGate(true)
    }
  }, [current, playing, unlocked])

  // Globaler Trigger (Hero-CTA → kk:wp-play Event)
  useEffect(() => {
    const handler = () => startPlayback()
    window.addEventListener('kk:wp-play', handler)
    return () => window.removeEventListener('kk:wp-play', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocked])

  const startPlayback = useCallback(() => {
    setIsOpen(true)
    const el = audioRef.current
    if (!el) return
    el.play().catch(() => {})
  }, [])

  const togglePlay = () => {
    const el = audioRef.current
    if (!el) return
    if (playing) el.pause()
    else el.play().catch(() => {})
  }

  const seek = (e) => {
    const el = audioRef.current
    if (!el || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    let target = ratio * duration
    if (!unlocked && target > FREE_SECONDS) {
      target = FREE_SECONDS
      setShowGate(true)
    }
    el.currentTime = target
    setCurrent(target)
  }

  const closePlayer = () => {
    const el = audioRef.current
    if (el) el.pause()
    setIsOpen(false)
  }

  const submitGate = async (e) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailErr('Bitte eine gültige E-Mail-Adresse eingeben.')
      return
    }
    setEmailErr('')
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 350))
    try {
      localStorage.setItem(STORAGE_KEY, '1')
      localStorage.setItem('kk_whitepaper_email', trimmed)
    } catch (_) {}
    setUnlocked(true)
    setShowGate(false)
    setSubmitting(false)
    const el = audioRef.current
    if (el) el.play().catch(() => {})
  }

  const ratioPlayed = duration ? current / duration : 0
  const gateRatio = duration ? FREE_SECONDS / duration : 0

  return (
    <>
      <audio ref={audioRef} src={AUDIO_SRC} preload="metadata" />

      {/* Sticky Player */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-primary-700 text-white shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
        role="region"
        aria-label="Audio-Player Whitepaper"
      >
        {!unlocked && (
          <div className="bg-warm-100 text-warm-600 text-xs text-center py-1.5 px-4 border-b border-warm-200">
            Vorschau: <span className="font-semibold">3 Minuten</span> kostenfrei · für die vollen 20 Min E-Mail eintragen
          </div>
        )}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
          <button
            type="button"
            onClick={togglePlay}
            disabled={!duration}
            aria-label={playing ? 'Pause' : 'Abspielen'}
            className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-500 hover:bg-primary-400 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {playing ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
            ) : (
              <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="hidden md:block text-sm font-semibold text-white truncate">
              Pragmatischer KI-Einstieg für den Mittelstand
            </div>
            <div
              onClick={seek}
              role="slider"
              aria-label="Position"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(current)}
              tabIndex={0}
              className="cursor-pointer h-7 flex items-center gap-[2px] mt-1.5 select-none"
            >
              {WAVE.map((h, i) => {
                const barRatio = i / WAVE.length
                const played = barRatio <= ratioPlayed
                const isLive = playing && barRatio > ratioPlayed - 1.5 / WAVE.length && barRatio <= ratioPlayed
                const blocked = !unlocked && barRatio > gateRatio
                return (
                  <span
                    key={i}
                    className={`flex-1 min-w-[2px] rounded-sm ${played ? 'bg-accent-400' : 'bg-white/25'}`}
                    style={{
                      height: `${Math.round(h * 100)}%`,
                      opacity: blocked ? 0.4 : 1,
                      animation: isLive ? `wpWave 0.9s ease-in-out infinite` : undefined,
                      animationDelay: `${(i % 8) * 80}ms`,
                    }}
                  />
                )
              })}
            </div>
          </div>

          <div className="hidden sm:block flex-shrink-0 text-xs font-mono text-white/85 whitespace-nowrap">
            {fmt(current)} <span className="text-white/50">/ {fmt(unlocked ? duration : Math.min(duration, 20 * 60))}</span>
          </div>

          <button
            type="button"
            onClick={closePlayer}
            aria-label="Player schließen"
            className="flex-shrink-0 w-9 h-9 rounded-full border border-white/25 text-white/70 hover:text-white hover:border-white/60 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      {/* Lead-Gate Modal */}
      {showGate && (
        <div
          className="fixed inset-0 z-[60] bg-primary-900/60 backdrop-blur-sm flex items-center justify-center p-4 fade-in-up"
          role="dialog"
          aria-modal="true"
          aria-labelledby="wp-gate-title"
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <div className="inline-flex items-center px-3 py-1 bg-warm-100 text-warm-600 rounded-full text-xs font-semibold mb-4">
              🎧 17 Min verbleiben
            </div>
            <h2 id="wp-gate-title" className="text-2xl font-bold text-primary-700 mb-3 leading-tight">
              Spannend, oder?
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-5">
              Trag kurz deine E-Mail-Adresse ein, um die restlichen <strong>17 Minuten</strong> zu hören
              und dir das komplette PDF-Whitepaper als Nachschlagewerk zu sichern.
            </p>
            <form onSubmit={submitGate} noValidate>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="ihre@email.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!emailErr}
                aria-describedby={emailErr ? 'wp-gate-err' : undefined}
                autoFocus
                className={`w-full px-4 py-3 rounded-lg border ${emailErr ? 'border-red-400' : 'border-slate-300'} focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm`}
              />
              {emailErr && (
                <p id="wp-gate-err" className="text-red-600 text-xs mt-2">{emailErr}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-4 px-6 py-3.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center"
              >
                {submitting ? 'Wird freigeschaltet…' : 'Weiter hören & PDF sichern'}
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <p className="text-xs text-slate-400 leading-relaxed mt-4">
                Kein Newsletter-Spam. Wir nutzen Ihre E-Mail nur für die Zusendung des Whitepapers
                und einer optionalen Folgeinfo. Jederzeit abbestellbar.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Local keyframes für Wave-Live-Bars (V2 hat sie nicht global) */}
      <style jsx global>{`
        @keyframes wpWave {
          0%, 100% { transform: scaleY(0.45); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </>
  )
}

export { PDF_SRC }

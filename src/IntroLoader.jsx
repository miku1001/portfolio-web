import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import AssistantOrb from './AssistantOrb.jsx'
import './intro.css'

/* ─────────────────────────────── Tweakables ───────────────────────────────
   Everything you might want to tune lives here.
   ───────────────────────────────────────────────────────────────────────── */

// Persistence. sessionStorage = play once per tab session.
// Swap this single line to `window.localStorage` for play-once-ever.
const PERSIST = typeof window !== 'undefined' ? window.sessionStorage : null
const STORAGE_KEY = 'tedev_intro_seen'

// Persona / copy — PLACEHOLDERS, confirm or swap.
// e.g. a Taglish line: const GREETING = "Uy! Si Ted 'to"
const GREETING = "Hey, I'm Ted"
const STATUS_CONNECTING = 'Loading portfolio…'
const STATUS_CONNECTED = 'Ready'

// Orb sizes (px)
const ORB_SIZE_LOADER = 120
const ORB_SIZE_FAB = 56
const FAB_OFFSET = 28 // gap from the bottom-left corner

// Timings (ms) — total = boot + greet + dock
const T_BOOT = 800    // 0.0 → 0.8s : orb boots in
const T_GREET = 2400  // 0.8 → 3.2s : greeting types
const T_DOCK = 1800   // 3.2 → 5.0s : dock + reveal
const TYPE_INTERVAL = Math.max(20, Math.floor(T_GREET / (GREETING.length + 2)))

/* ─────────────────────────────── helpers ──────────────────────────────── */
const safeGet = (k) => { try { return PERSIST?.getItem(k) } catch { return null } }
const safeSet = (k, v) => { try { PERSIST?.setItem(k, v) } catch { /* private mode */ } }
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// The real site lives in #root; we briefly scale it 0.98 → 1 behind the overlay.
// Content is never unmounted — this is purely a cosmetic transform that is fully
// removed at the end (so it never leaves a containing block on position:fixed kids).
const getRoot = () => (typeof document !== 'undefined' ? document.getElementById('root') : null)
function startRootScale() {
  const r = getRoot(); if (!r) return
  r.style.transition = 'none'
  // origin at the top so the fixed navbar (which #root becomes the containing
  // block for while transformed) stays pinned to the top and only scales — no drift.
  r.style.transformOrigin = 'top center'
  r.style.transform = 'scale(0.98)'
  r.style.willChange = 'transform'
}
function revealRootScale() {
  const r = getRoot(); if (!r) return
  r.style.transition = `transform ${T_DOCK}ms cubic-bezier(0.22, 1, 0.36, 1)`
  void r.offsetWidth // commit the 0.98 before transitioning to 1
  r.style.transform = 'scale(1)'
}
function clearRootScale() {
  const r = getRoot(); if (!r) return
  r.style.transition = ''
  r.style.transform = ''
  r.style.transformOrigin = ''
  r.style.willChange = ''
}

/* ─────────────────────────────── component ─────────────────────────────────
   Mounted at the app root. Renders an overlay + the shared orb via a portal to
   <body>, so the page content (#root) is NEVER gated/unmounted behind it.
   Phases: boot → greet → dock → idle.
   ───────────────────────────────────────────────────────────────────────── */
export default function IntroLoader() {
  const seenRef = useRef(safeGet(STORAGE_KEY))
  const reducedRef = useRef(prefersReducedMotion())
  const animate = !seenRef.current && !reducedRef.current

  const [phase, setPhase] = useState(animate ? 'boot' : 'idle')
  const [typed, setTyped] = useState(animate ? 0 : GREETING.length)
  const finishedRef = useRef(false)
  const timersRef = useRef([])

  const finish = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    // Cancel any pending phase timers so they can't flip the phase back / re-apply
    // the #root transform after we've already jumped to the end state.
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    safeSet(STORAGE_KEY, '1')
    clearRootScale()
    setPhase('idle')
    setTyped(GREETING.length)
  }, [])

  // Orchestrate the sequence (first visit, motion allowed).
  useEffect(() => {
    if (!animate) {
      if (!seenRef.current) safeSet(STORAGE_KEY, '1') // mark seen on reduced-motion / instant path
      return
    }
    startRootScale()
    timersRef.current = [
      setTimeout(() => { if (!finishedRef.current) setPhase('greet') }, T_BOOT),
      setTimeout(() => {
        if (finishedRef.current) return
        setPhase('dock')
        revealRootScale()
      }, T_BOOT + T_GREET),
      setTimeout(finish, T_BOOT + T_GREET + T_DOCK),
    ]
    return () => {
      timersRef.current.forEach(clearTimeout)
      if (!finishedRef.current) clearRootScale()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Type the greeting during the greet phase.
  useEffect(() => {
    if (phase !== 'greet') return
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTyped(i)
      if (i >= GREETING.length) clearInterval(id)
    }, TYPE_INTERVAL)
    return () => clearInterval(id)
  }, [phase])

  // Skippable: any click / tap / key during the intro jumps to the end.
  useEffect(() => {
    if (phase === 'idle') return
    const onSkip = () => finish()
    window.addEventListener('pointerdown', onSkip)
    window.addEventListener('keydown', onSkip)
    return () => {
      window.removeEventListener('pointerdown', onSkip)
      window.removeEventListener('keydown', onSkip)
    }
  }, [phase, finish])

  const handleOrbClick = () => {
    if (phase !== 'idle') { finish(); return }
    // Idle: the docked orb replaces the old scroll-to-top button.
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // TODO: wire the chat assistant here later if it should open chat instead.
  }

  const intro = phase !== 'idle'
  const connected = phase === 'dock'
  const docked = phase === 'dock' || phase === 'idle'

  // Same element, two geometries → continuous loader → FAB morph.
  // Docked in the bottom-RIGHT corner (replaces the old scroll-to-top arrow).
  // Anchored with `left` (not `right`) so it interpolates smoothly from centre.
  const geom = docked
    ? {
        top: `calc(100% - ${ORB_SIZE_FAB + FAB_OFFSET}px)`,
        left: `calc(100% - ${ORB_SIZE_FAB + FAB_OFFSET}px)`,
        width: ORB_SIZE_FAB,
        height: ORB_SIZE_FAB,
        transform: 'translate(0, 0)',
      }
    : {
        top: '50%',
        left: '50%',
        width: ORB_SIZE_LOADER,
        height: ORB_SIZE_LOADER,
        transform: 'translate(-50%, -50%)',
      }

  return createPortal(
    <>
      {intro && (
        <div
          className={`intro-overlay intro-overlay--${phase}`}
          style={{ '--intro-dock': `${T_DOCK}ms` }}
        >
          <div className="intro-greet">
            <p className="intro-greeting">
              <span>{GREETING.slice(0, typed)}</span>
              <span className="intro-cursor" aria-hidden="true" />
            </p>
            <p
              className={`intro-status ${connected ? 'intro-status--connected' : ''}`}
              aria-live="polite"
            >
              {connected ? (
                <svg
                  className="intro-status__check"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className="intro-status__spinner" aria-hidden="true" />
              )}
              {connected ? STATUS_CONNECTED : STATUS_CONNECTING}
            </p>
          </div>

          {/* subtle, keyboard-focusable skip */}
          <button type="button" className="intro-skip" onClick={finish}>
            Skip
          </button>
        </div>
      )}

      {/* SHARED orb: full-screen loader centre → docked chat FAB (same element). */}
      <button
        type="button"
        className={`assistant-fab assistant-fab--${phase}`}
        style={{ ...geom, '--intro-dock': `${T_DOCK}ms` }}
        onClick={handleOrbClick}
        aria-label={intro ? 'Skip intro' : 'Scroll to top'}
      >
        <AssistantOrb pulse={phase === 'idle'} />
        {phase === 'idle' && (
          <svg
            className="assistant-fab__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 15l7-7 7 7" />
          </svg>
        )}
      </button>
    </>,
    document.body,
  )
}

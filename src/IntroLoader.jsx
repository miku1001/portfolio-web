import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './intro.css'

const PERSIST = typeof window !== 'undefined' ? window.sessionStorage : null
const STORAGE_KEY = 'tedev_intro_seen'

const GREETING = "Hey, I'm Ted"
const STATUS_CONNECTING = 'Loading portfolio…'
const STATUS_CONNECTED = 'Ready'

const ORB_SIZE_LOADER = 120

const T_BOOT = 800
const T_GREET = 2400
const T_DOCK = 1800
const TYPE_INTERVAL = Math.max(20, Math.floor(T_GREET / (GREETING.length + 2)))

const safeGet = (k) => { try { return PERSIST?.getItem(k) } catch { return null } }
const safeSet = (k, v) => { try { PERSIST?.setItem(k, v) } catch {} }
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const getRoot = () => (typeof document !== 'undefined' ? document.getElementById('root') : null)
function startRootScale() {
  const r = getRoot(); if (!r) return
  r.style.transition = 'none'
  r.style.transformOrigin = 'top center'
  r.style.transform = 'scale(0.98)'
  r.style.willChange = 'transform'
}
function revealRootScale() {
  const r = getRoot(); if (!r) return
  r.style.transition = `transform ${T_DOCK}ms cubic-bezier(0.22, 1, 0.36, 1)`
  void r.offsetWidth
  r.style.transform = 'scale(1)'
}
function clearRootScale() {
  const r = getRoot(); if (!r) return
  r.style.transition = ''
  r.style.transform = ''
  r.style.transformOrigin = ''
  r.style.willChange = ''
}

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
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    safeSet(STORAGE_KEY, '1')
    clearRootScale()
    setPhase('idle')
    setTyped(GREETING.length)
  }, [])

  useEffect(() => {
    if (!animate) {
      if (!seenRef.current) safeSet(STORAGE_KEY, '1')
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
  }, [])

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

  const intro = phase !== 'idle'
  const connected = phase === 'dock'

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

          <button type="button" className="intro-skip" onClick={finish}>
            Skip
          </button>
        </div>
      )}
    </>,
    document.body,
  )
}
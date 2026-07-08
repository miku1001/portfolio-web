import { useEffect, useRef } from 'react'

export default function CursorFollower() {
  const cursorRef = useRef(null)
  const pos = useRef({ x: -200, y: -200 })
  const target = useRef({ x: -200, y: -200 })
  const suckRef = useRef(false)

  useEffect(() => {
    const el = cursorRef.current
    const suckEl = el?.querySelector('.cursor-follower-suck')
    if (!el) return

    const onMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }

      const overGrid = e.target.closest('.hero-grid, .noise')
      if (overGrid && !suckRef.current) {
        suckRef.current = true
        suckEl?.classList.add('active')
      } else if (!overGrid && suckRef.current) {
        suckRef.current = false
        suckEl?.classList.remove('active')
      }
    }

    const isTouch = 'ontouchstart' in window
    if (isTouch) return

    const tick = () => {
      const { x: cx, y: cy } = pos.current
      const { x: tx, y: ty } = target.current
      const dx = tx - cx
      const dy = ty - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist > 0.5) {
        pos.current = {
          x: cx + dx * 0.1,
          y: cy + dy * 0.1,
        }
        el.style.left = pos.current.x + 'px'
        el.style.top = pos.current.y + 'px'
      }

      raf = requestAnimationFrame(tick)
    }

    let raf = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div ref={cursorRef} className="cursor-follower" aria-hidden="true">
      <div className="cursor-follower-core" />
      <div className="cursor-follower-ring" />
      <div className="cursor-follower-suck" />
    </div>
  )
}

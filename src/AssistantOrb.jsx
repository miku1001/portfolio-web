import './intro.css'

/**
 * AssistantOrb — the glowing brand orb.
 *
 * Intentionally presentational and size-agnostic: it fills 100% of its parent,
 * so the SAME orb is reused for the full-screen loader (120px wrapper) and the
 * docked chat FAB (56px wrapper) with no visual discontinuity.
 *
 * Colors come from the existing theme tokens (--accent / --accent-2 / glow vars)
 * so it matches the navbar "TeDev" gradient and adapts to light mode for free.
 */
export default function AssistantOrb({ pulse = false, className = '', ...rest }) {
  return (
    <span className={`assistant-orb ${pulse ? 'assistant-orb--pulse' : ''} ${className}`} {...rest}>
      <span className="assistant-orb__glow" aria-hidden="true" />
      <span className="assistant-orb__ring" aria-hidden="true" />
      <span className="assistant-orb__core" aria-hidden="true" />
    </span>
  )
}

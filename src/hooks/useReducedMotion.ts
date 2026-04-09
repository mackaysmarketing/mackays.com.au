'use client'

import { useEffect, useState } from 'react'

const MEDIA_QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Subscribes to the user's `prefers-reduced-motion` preference and returns
 * a boolean that updates reactively if they toggle the OS setting.
 *
 * Use this as the single source of truth for animation gating across the
 * codebase. Pair with `useGSAP({ dependencies: [prefersReducedMotion] })`
 * so that GSAP set-ups re-run when the preference changes, and GSAP's
 * built-in cleanup disposes of the old tweens/scroll triggers.
 *
 * Returns `false` on the server and on the first client render (to avoid
 * a hydration mismatch) — the real value is read on mount.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mql = window.matchMedia(MEDIA_QUERY)
    setReduced(mql.matches)

    const handler = (event: MediaQueryListEvent) => {
      setReduced(event.matches)
    }

    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return reduced
}

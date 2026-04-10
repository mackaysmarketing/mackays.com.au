'use client'

import { useEffect } from 'react'

/**
 * Dev-only accessibility reporter. Lazy-imports `@axe-core/react` and
 * `react-dom` only in development so it never ships to production, and
 * logs violations to the browser console. No-op in production builds.
 */
export function AxeCore() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    if (typeof window === 'undefined') return

    let cancelled = false

    void (async () => {
      try {
        const [{ default: React }, { default: ReactDOM }, axeModule] =
          await Promise.all([
            import('react'),
            import('react-dom'),
            import('@axe-core/react'),
          ])
        if (cancelled) return
        const axe = axeModule.default ?? axeModule
        await axe(React, ReactDOM, 1000)
      } catch (error) {
        console.warn('[axe-core] failed to initialise', error)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return null
}

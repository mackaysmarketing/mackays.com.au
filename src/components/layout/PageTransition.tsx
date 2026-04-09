'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

export interface PageTransitionProps {
  children: ReactNode
}

/**
 * Fades + slides the page content in and out on route change.
 *
 * - `AnimatePresence mode="wait"` keeps the exiting page mounted until
 *   its animation finishes, preventing layout jank.
 * - Keyed on `usePathname()` so Framer treats every route as a fresh
 *   subtree.
 * - The `reducedMotion="user"` `MotionConfig` set in
 *   `SmoothScrollProvider` means this transition is automatically
 *   collapsed to a static swap for users who have requested reduced
 *   motion — no extra guard needed here.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

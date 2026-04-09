/**
 * Mobile breakpoint used by every animated component in the codebase.
 * Must stay in sync with Tailwind's `md` breakpoint (768 px).
 */
export const MOBILE_BREAKPOINT_PX = 768

/**
 * Returns a simple set of scaling factors that every GSAP tween can use
 * to reduce intensity on small screens — smaller stagger, smaller
 * translate distance, slightly shorter duration. On desktop all factors
 * are 1 so the call is a no-op.
 *
 * Intended usage inside a `useGSAP` callback:
 *
 *     const { stagger, y, duration } = getMotionFactors()
 *     gsap.from(el, { y: 60 * y, stagger: 0.08 * stagger, duration: 0.85 * duration, ... })
 *
 * Safe to call from inside useGSAP because useGSAP runs on the client.
 */
export function getMotionFactors(): {
  isMobile: boolean
  stagger: number
  y: number
  duration: number
} {
  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT_PX

  return {
    isMobile,
    stagger: isMobile ? 0.5 : 1,
    y: isMobile ? 0.6 : 1,
    duration: isMobile ? 0.8 : 1,
  }
}

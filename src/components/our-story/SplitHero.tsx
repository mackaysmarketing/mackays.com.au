'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'

gsap.registerPlugin(useGSAP)

export interface SplitHeroProps {
  eyebrow: string
  headline: string
  subheadline: string
  imageSeed: number
  imageAlt: string
}

/**
 * Full 100svh 50/50 split hero used on the Our Story page.
 * Left: ImagePlaceholder fill. Right: bg-parchment-warm with eyebrow +
 * headline + subheadline, centered vertically. On load the right panel
 * slides in from x:80 → 0 with opacity 0 → 1 over 0.8s ease-out.
 * Reduced motion skips the animation and snaps to the final state.
 */
export function SplitHero({
  eyebrow,
  headline,
  subheadline,
  imageSeed,
  imageAlt,
}: SplitHeroProps) {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (prefersReducedMotion) {
        gsap.set('[data-split-hero-right]', { x: 0, opacity: 1 })
        return
      }

      gsap.from('[data-split-hero-right]', {
        x: 80,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      })
    },
    { scope: containerRef },
  )

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] grid grid-cols-1 md:grid-cols-2"
    >
      <div className="relative overflow-hidden min-h-[40vh] md:min-h-full order-1 md:order-none">
        <ImagePlaceholder
          fill
          seed={imageSeed}
          alt={imageAlt}
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>

      <div
        data-split-hero-right
        className="relative bg-parchment-warm flex items-center px-10 md:px-16 py-16 md:py-0 order-2"
      >
        <div className="max-w-[440px]">
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-crimson mb-6">
            {eyebrow}
          </p>
          <h1 className="font-heading font-bold text-[clamp(32px,5vw,52px)] leading-[1.05] tracking-[-0.025em] text-ink mb-6">
            {headline}
          </h1>
          <p className="font-body text-[17px] text-ink-mid leading-[1.7]">
            {subheadline}
          </p>
        </div>
      </div>
    </section>
  )
}

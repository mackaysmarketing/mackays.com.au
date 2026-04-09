'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Button } from '@/components/ui/Button'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { getMotionFactors } from '@/lib/motion'
import type { CtaLink } from '@/content/types'

gsap.registerPlugin(useGSAP)

export interface KineticHeroProps {
  headline: string
  subheadline: string
  eyebrow?: string
  ctaPrimary?: CtaLink
  ctaSecondary?: CtaLink
  imageSeed: number
  imageAlt?: string
}

/**
 * Full 100svh hero with background image, dark overlay and GSAP word-level
 * reveal. The headline prop supports a single `|` delimiter to split the
 * headline into a "primary" segment (rendered normally) and an "accent"
 * segment (rendered in Lora italic harvest-gold) — used on the People &
 * Environment page for the two-line headline.
 */
export function KineticHero({
  headline,
  subheadline,
  eyebrow,
  ctaPrimary,
  ctaSecondary,
  imageSeed,
  imageAlt,
}: KineticHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  /**
   * Split the headline into an ordered list of lines so that word-by-word
   * GSAP reveal still works per line.
   *
   *  - "\n" is a hard line break, same visual style as the line before it
   *  - "|" is a line break AND a switch to the Lora italic harvest-gold
   *    accent treatment (used on People & Environment — "550 people. Three
   *    regions.|One standard — theirs.")
   */
  type HeadlineLine = { text: string; accent: boolean }

  const lines: HeadlineLine[] = []
  for (const newlineSegment of headline.split('\n')) {
    if (newlineSegment.includes('|')) {
      const [before, after] = newlineSegment.split('|', 2)
      if (before.trim()) lines.push({ text: before.trim(), accent: false })
      if (after && after.trim()) lines.push({ text: after.trim(), accent: true })
    } else if (newlineSegment.trim()) {
      lines.push({ text: newlineSegment.trim(), accent: false })
    }
  }

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            '[data-kh-word]',
            '[data-kh-eyebrow]',
            '[data-kh-subheadline]',
            '[data-kh-cta]',
          ],
          { opacity: 1, y: 0, rotationX: 0 },
        )
        return
      }

      const { stagger, y, duration } = getMotionFactors()

      gsap.from('[data-kh-eyebrow]', {
        y: 20 * y,
        opacity: 0,
        duration: 0.6 * duration,
        ease: 'power3.out',
      })
      gsap.from('[data-kh-word]', {
        y: 60 * y,
        opacity: 0,
        rotationX: -15,
        transformOrigin: '50% 100% -20',
        stagger: 0.08 * stagger,
        ease: 'power3.out',
        duration: 0.85 * duration,
        delay: 0.15,
      })
      gsap.from('[data-kh-subheadline]', {
        y: 30 * y,
        opacity: 0,
        duration: 0.8 * duration,
        ease: 'power3.out',
        delay: 0.55,
      })
      gsap.from('[data-kh-cta]', {
        y: 20 * y,
        opacity: 0,
        stagger: 0.1 * stagger,
        duration: 0.6 * duration,
        ease: 'power3.out',
        delay: 0.9,
      })
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] },
  )

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <ImagePlaceholder
          fill
          seed={imageSeed}
          alt={imageAlt ?? 'Mackays farmland in Far North Queensland'}
          priority
          sizes="100vw"
        />
      </div>
      <div aria-hidden className="absolute inset-0 z-10 bg-ink/20" />

      <div className="relative z-20 h-full flex flex-col justify-end pb-20 px-10 md:px-16 max-w-7xl mx-auto">
        {eyebrow && (
          <p
            data-kh-eyebrow
            className="font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-harvest-gold mb-6"
          >
            {eyebrow}
          </p>
        )}

        <h1
          className="font-heading font-bold text-[clamp(40px,7vw,96px)] leading-[1.02] tracking-[-0.03em] text-white max-w-5xl mb-6"
          style={{ perspective: '800px' }}
        >
          {lines.map((line, lineIndex) => {
            const words = line.text.split(/\s+/)
            const accentClass = line.accent
              ? 'font-body italic font-normal text-harvest-gold'
              : ''
            return (
              <span
                key={`line-${lineIndex}`}
                className={lineIndex === 0 ? 'block' : 'block mt-2'}
              >
                {words.map((word, wordIndex) => (
                  <span
                    key={`line-${lineIndex}-w-${wordIndex}`}
                    className="inline-block overflow-hidden mr-[0.25em]"
                  >
                    <span
                      data-kh-word
                      className={`inline-block ${accentClass}`}
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </span>
            )
          })}
        </h1>

        <p
          data-kh-subheadline
          className="font-body text-[17px] md:text-[19px] text-white/85 max-w-2xl leading-[1.65] mb-10"
        >
          {subheadline}
        </p>

        {(ctaPrimary || ctaSecondary) && (
          <div className="flex flex-col sm:flex-row gap-4">
            {ctaPrimary && (
              <div data-kh-cta>
                <Button variant="primary" size="lg" href={ctaPrimary.href}>
                  {ctaPrimary.label}
                </Button>
              </div>
            )}
            {ctaSecondary && (
              <div data-kh-cta>
                <Button variant="secondary" size="lg" href={ctaSecondary.href}>
                  {ctaSecondary.label}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-px h-10 bg-harvest-gold animate-scroll-indicator z-20"
      />
    </section>
  )
}

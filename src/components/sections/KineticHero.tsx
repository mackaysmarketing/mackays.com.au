'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Button } from '@/components/ui/Button'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
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

  const [primarySegment, accentSegment] = headline.includes('|')
    ? headline.split('|')
    : [headline, undefined]

  const primaryWords = primarySegment.trim().split(/\s+/)
  const accentWords = accentSegment?.trim().split(/\s+/) ?? []

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (prefersReducedMotion) {
        gsap.set(
          [
            '[data-kh-word]',
            '[data-kh-eyebrow]',
            '[data-kh-subheadline]',
            '[data-kh-cta]',
          ],
          { opacity: 1, y: 0 },
        )
        return
      }

      gsap.from('[data-kh-eyebrow]', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
      gsap.from('[data-kh-word]', {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        ease: 'power3.out',
        duration: 0.85,
        delay: 0.15,
      })
      gsap.from('[data-kh-subheadline]', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.55,
      })
      gsap.from('[data-kh-cta]', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.9,
      })
    },
    { scope: containerRef },
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

        <h1 className="font-heading font-bold text-[clamp(40px,7vw,96px)] leading-[1.02] tracking-[-0.03em] text-white max-w-5xl mb-6">
          <span className="block">
            {primaryWords.map((word, index) => (
              <span
                key={`p-${index}`}
                className="inline-block overflow-hidden mr-[0.25em]"
              >
                <span data-kh-word className="inline-block">
                  {word}
                </span>
              </span>
            ))}
          </span>
          {accentSegment && (
            <span className="block mt-2">
              {accentWords.map((word, index) => (
                <span
                  key={`a-${index}`}
                  className="inline-block overflow-hidden mr-[0.25em]"
                >
                  <span
                    data-kh-word
                    className="inline-block font-body italic font-normal text-harvest-gold"
                  >
                    {word}
                  </span>
                </span>
              ))}
            </span>
          )}
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

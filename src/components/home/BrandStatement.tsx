'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Button } from '@/components/ui/Button'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { HomeBrandStatement } from '@/content/types'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export interface BrandStatementProps {
  content: HomeBrandStatement
  imageSeed: number
  imageAlt: string
}

export function BrandStatement({
  content,
  imageSeed,
  imageAlt,
}: BrandStatementProps) {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (prefersReducedMotion) {
        gsap.set('[data-brand-image]', { x: 0, opacity: 1 })
        return
      }

      gsap.from('[data-brand-image]', {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
        },
      })
    },
    { scope: containerRef },
  )

  return (
    <section
      ref={containerRef}
      className="max-w-7xl mx-auto px-10 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
    >
      <div>
        <SectionHeader
          eyebrow={content.eyebrow}
          headline={content.headline}
        />
        <p className="font-body text-[16px] text-ink-mid leading-[1.75] mt-6 mb-8 max-w-xl">
          {content.body}
        </p>
        <Button variant="ghost-link" href={content.cta.href}>
          {content.cta.label} →
        </Button>
      </div>
      <div
        data-brand-image
        className="relative w-full aspect-[6/7] rounded-xl overflow-hidden"
      >
        <ImagePlaceholder
          fill
          seed={imageSeed}
          alt={imageAlt}
          sizes="(min-width: 768px) 50vw, 90vw"
        />
      </div>
    </section>
  )
}

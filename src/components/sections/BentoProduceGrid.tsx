'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Badge } from '@/components/ui/Badge'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { getMotionFactors } from '@/lib/motion'
import type { BentoGridItem, CropData, CropSlug } from '@/content/types'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export interface BentoProduceGridProps {
  items: BentoGridItem[]
  crops: Record<CropSlug, CropData>
  className?: string
}

export function BentoProduceGrid({
  items,
  crops,
  className,
}: BentoProduceGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set('[data-bento-card]', { opacity: 1, y: 0 })
        return
      }

      const { stagger, y, duration } = getMotionFactors()

      gsap.from('[data-bento-card]', {
        opacity: 0,
        y: 30 * y,
        stagger: 0.1 * stagger,
        duration: 0.8 * duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] },
  )

  return (
    <div
      ref={containerRef}
      className={[
        'grid grid-cols-1 md:grid-cols-5 gap-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {items.map((item) => {
        const crop = crops[item.slug]
        return (
          <Link
            key={item.slug}
            href={`/our-produce/${item.slug}`}
            data-bento-card
            className={[
              'relative overflow-hidden rounded-xl group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson',
              item.span,
              item.minHeight,
            ].join(' ')}
          >
            <ImagePlaceholder
              fill
              seed={item.seed}
              alt={`${crop.name} — ${crop.tagline}`}
              sizes="(min-width: 768px) 40vw, 90vw"
              className="transition-transform duration-500 group-hover:scale-[1.05]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col gap-3">
              <Badge variant={item.badgeVariant} label={item.stat} />
              <span className="font-heading font-bold text-[24px] md:text-[28px] text-white leading-tight transition-transform duration-200 group-hover:-translate-y-[3px]">
                {crop.name}
              </span>
              <span className="font-body italic text-[14px] text-white/75 max-w-xs">
                {crop.tagline}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

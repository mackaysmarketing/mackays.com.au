'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { getMotionFactors } from '@/lib/motion'
import type { TimelineItem } from '@/content/types'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export interface StickyTimelineProps {
  items: TimelineItem[]
  abbreviated?: boolean
  className?: string
}

export function StickyTimeline({
  items,
  abbreviated = false,
  className,
}: StickyTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const visibleItems = abbreviated ? items.slice(0, 6) : items
  const [activeYear, setActiveYear] = useState<string>(
    visibleItems[0]?.year ?? '',
  )
  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set('[data-timeline-item]', { opacity: 1, y: 0 })
        setActiveYear(visibleItems[0]?.year ?? '')
        return
      }

      const { y: yFactor, duration } = getMotionFactors()

      // Per-item fade-in (not scrub — each entry plays once as it arrives).
      itemRefs.current.forEach((el) => {
        if (!el) return
        gsap.from(el, {
          opacity: 0,
          y: 40 * yFactor,
          duration: 0.8 * duration,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      // Year tracker — single ScrollTrigger with scrub:1 over the whole
      // container, mapping progress → active index.
      if (containerRef.current && visibleItems.length > 0) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress
            const index = Math.min(
              visibleItems.length - 1,
              Math.max(0, Math.floor(progress * visibleItems.length)),
            )
            setActiveYear(visibleItems[index]?.year ?? '')
          },
        })
      }
    },
    {
      scope: containerRef,
      dependencies: [prefersReducedMotion, visibleItems.length],
    },
  )

  return (
    <section
      ref={containerRef}
      className={[
        'relative max-w-7xl mx-auto px-10',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="grid grid-cols-1 md:grid-cols-[35%_65%] gap-8">
        <div className="relative">
          <div className="sticky top-0 h-screen flex flex-col justify-center">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-dust mb-3">
              Timeline
            </p>
            <div
              className="font-heading font-bold text-[clamp(80px,12vw,140px)] tracking-[-0.05em] text-ink/10 leading-none transition-colors"
              aria-live="polite"
            >
              {activeYear}
            </div>
          </div>
        </div>

        <div className="py-20 space-y-32">
          {visibleItems.map((item, index) => (
            <div
              key={`${item.year}-${index}`}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              data-timeline-item
              className="max-w-xl"
            >
              <p className="font-mono text-[11px] text-crimson mb-3">
                {item.year}
              </p>
              <h3 className="font-heading font-bold text-[24px] md:text-[28px] tracking-[-0.02em] text-ink leading-tight mb-4">
                {item.headline}
              </h3>
              <p className="font-body text-[15px] text-ink-mid leading-[1.75] mb-6">
                {item.body}
              </p>
              {item.imageSeed !== undefined && (
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <ImagePlaceholder
                    fill
                    seed={item.imageSeed}
                    alt={`${item.year} — ${item.headline}`}
                    sizes="(min-width: 768px) 520px, 90vw"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

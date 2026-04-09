'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { getMotionFactors } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export interface LivingPhotoGridProps {
  seeds: number[]
  captions?: string[]
  className?: string
}

const HEIGHT_PATTERN = [200, 280, 240, 320]

export function LivingPhotoGrid({
  seeds,
  captions,
  className,
}: LivingPhotoGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set('[data-living-photo]', { clipPath: 'inset(0% 0 0 0)' })
        return
      }

      const { stagger, duration } = getMotionFactors()

      gsap.fromTo(
        '[data-living-photo]',
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          stagger: 0.1 * stagger,
          duration: 0.9 * duration,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] },
  )

  return (
    <div
      ref={containerRef}
      className={[
        'columns-2 md:columns-4 gap-4 max-w-7xl mx-auto px-10',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {seeds.map((seed, index) => {
        const height = HEIGHT_PATTERN[index % HEIGHT_PATTERN.length]
        const caption = captions?.[index]
        return (
          <figure
            key={`${seed}-${index}`}
            data-living-photo
            className="break-inside-avoid mb-4 overflow-hidden rounded-lg relative group"
            style={{ height }}
          >
            <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-[1.04]">
              <ImagePlaceholder
                fill
                seed={seed}
                alt={caption ?? 'Mackays farming imagery'}
                sizes="(min-width: 768px) 25vw, 50vw"
              />
            </div>
            {caption && (
              <figcaption className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="absolute bottom-3 left-3 font-heading text-[11px] text-white/80">
                  {caption}
                </span>
              </figcaption>
            )}
          </figure>
        )
      })}
    </div>
  )
}

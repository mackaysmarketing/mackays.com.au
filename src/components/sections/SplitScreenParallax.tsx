'use client'

import { useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export interface SplitScreenParallaxProps {
  imageSeed: number
  imageAlt: string
  imageLeft?: boolean
  children: ReactNode
  className?: string
}

export function SplitScreenParallax({
  imageSeed,
  imageAlt,
  imageLeft = false,
  children,
  className,
}: SplitScreenParallaxProps) {
  const containerRef = useRef<HTMLElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      const isMobile = window.innerWidth < 768

      if (prefersReducedMotion || isMobile || !imageWrapRef.current) return

      gsap.to(imageWrapRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    },
    { scope: containerRef },
  )

  const imageColumn = (
    <div className="relative overflow-hidden min-h-[50vh] md:min-h-[70vh]">
      <div ref={imageWrapRef} className="absolute inset-0 -top-[15%] -bottom-[15%]">
        <ImagePlaceholder
          fill
          seed={imageSeed}
          alt={imageAlt}
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
    </div>
  )

  const textColumn = (
    <div className="flex items-center px-10 md:px-16 py-16 md:py-24 bg-parchment">
      <div className="max-w-xl">{children}</div>
    </div>
  )

  return (
    <section
      ref={containerRef}
      className={[
        'grid grid-cols-1 md:grid-cols-2 min-h-[70vh] bg-parchment-cool',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {imageLeft ? (
        <>
          {imageColumn}
          {textColumn}
        </>
      ) : (
        <>
          {textColumn}
          {imageColumn}
        </>
      )}
    </section>
  )
}

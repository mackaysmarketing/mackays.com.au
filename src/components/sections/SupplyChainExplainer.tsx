'use client'

import { useRef } from 'react'
import { MapPin, Package, ShoppingCart } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { getMotionFactors } from '@/lib/motion'
import type { SupplyChainIcon, SupplyChainStep } from '@/content/types'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export interface SupplyChainExplainerProps {
  steps: SupplyChainStep[]
  className?: string
}

const ICON_MAP: Record<SupplyChainIcon, ComponentType<SVGProps<SVGSVGElement>>> =
  {
    MapPin,
    Package,
    ShoppingCart,
  }

export function SupplyChainExplainer({
  steps,
  className,
}: SupplyChainExplainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set('[data-sc-connector]', { scaleX: 1 })
        gsap.set('[data-sc-step]', { opacity: 1, y: 0 })
        return
      }

      const { stagger, y, duration } = getMotionFactors()

      gsap.from('[data-sc-step]', {
        opacity: 0,
        y: 20 * y,
        stagger: 0.15 * stagger,
        duration: 0.6 * duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('[data-sc-connector]', {
        scaleX: 0,
        transformOrigin: 'left center',
        stagger: 0.2 * stagger,
        duration: 0.7 * duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
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
        'max-w-5xl mx-auto',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-6">
        {steps.map((step, index) => {
          const Icon = ICON_MAP[step.icon]
          const isLast = index === steps.length - 1
          return (
            <div
              key={step.title}
              className="flex items-center gap-6 w-full md:w-auto md:flex-1"
            >
              <div
                data-sc-step
                className="flex flex-col items-start gap-3 flex-1"
              >
                <div className="w-12 h-12 rounded-full bg-parchment-deep flex items-center justify-center">
                  <Icon className="w-5 h-5 text-crimson" aria-hidden />
                </div>
                <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-dust">
                  {step.stepLabel}
                </p>
                <p className="font-heading font-semibold text-[16px] text-ink">
                  {step.title}
                </p>
                <p className="font-body text-[13px] text-ink-mid leading-[1.5]">
                  {step.subtitle}
                </p>
              </div>
              {!isLast && (
                <span
                  data-sc-connector
                  aria-hidden
                  className="hidden md:block h-px w-10 bg-parchment-deep shrink-0"
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

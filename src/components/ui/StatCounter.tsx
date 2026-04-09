'use client'

import { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup'

export interface StatCounterProps {
  value: number
  prefix?: string
  suffix?: string
  label: string
  duration?: number
  className?: string
}

export function StatCounter({
  value,
  prefix,
  suffix,
  label,
  duration = 2,
  className,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    )
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      <div className="font-heading font-bold text-[clamp(40px,6vw,56px)] tracking-[-0.03em] text-ink leading-none">
        {prefix && <span>{prefix}</span>}
        {inView ? (
          prefersReducedMotion ? (
            <span>{value.toLocaleString('en-AU')}</span>
          ) : (
            <CountUp
              end={value}
              duration={duration}
              separator=","
              preserveValue
            />
          )
        ) : (
          <span aria-hidden>0</span>
        )}
        {suffix && <span className="text-crimson">{suffix}</span>}
      </div>
      <div className="font-heading text-[11px] font-medium uppercase tracking-[0.1em] text-dust mt-1">
        {label}
      </div>
    </div>
  )
}

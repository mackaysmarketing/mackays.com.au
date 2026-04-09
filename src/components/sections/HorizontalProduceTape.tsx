'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'

export interface ProduceSlide {
  seed: number
  name: string
  tagline: string
  stat: string
  href: string
}

export interface HorizontalProduceTapeProps {
  slides: ProduceSlide[]
  className?: string
}

export function HorizontalProduceTape({
  slides,
  className,
}: HorizontalProduceTapeProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const onScroll = () => {
      const cards = slideRefs.current.filter(
        (el): el is HTMLAnchorElement => el !== null,
      )
      if (cards.length === 0) return

      const scrollerRect = scroller.getBoundingClientRect()
      const centerX = scrollerRect.left + scrollerRect.width / 2

      let nearestIndex = 0
      let nearestDistance = Number.POSITIVE_INFINITY

      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        const distance = Math.abs(cardCenter - centerX)
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestIndex = index
        }
      })

      setActiveIndex(nearestIndex)
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => scroller.removeEventListener('scroll', onScroll)
  }, [slides.length])

  const scrollToIndex = (index: number) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, index))
    const target = slideRefs.current[clamped]
    if (!target) return
    target.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    })
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollToIndex(activeIndex + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollToIndex(activeIndex - 1)
    }
  }

  return (
    <div className={className}>
      <div
        ref={scrollerRef}
        onKeyDown={onKeyDown}
        className="overflow-x-scroll scroll-smooth snap-x snap-mandatory scrollbar-hide flex flex-nowrap gap-4 px-10 pb-4"
        role="region"
        aria-label="Produce slides"
        tabIndex={0}
      >
        {slides.map((slide, index) => (
          <Link
            key={slide.href}
            href={slide.href}
            ref={(el) => {
              slideRefs.current[index] = el
            }}
            className="snap-start flex-shrink-0 w-[min(80vw,580px)] h-[480px] relative overflow-hidden rounded-xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson"
          >
            <ImagePlaceholder
              fill
              seed={slide.seed}
              alt={`${slide.name} — ${slide.tagline}`}
              sizes="(min-width: 768px) 580px, 80vw"
              className="transition-transform duration-500 group-hover:scale-[1.05]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10 flex flex-col gap-3">
              <Badge variant="gold" label={slide.stat} />
              <span className="font-heading font-bold text-[28px] text-white leading-tight transition-transform duration-200 group-hover:-translate-y-[3px]">
                {slide.name}
              </span>
              <span className="font-body italic text-[15px] text-white/75 max-w-xs">
                {slide.tagline}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex gap-2 justify-center mt-6">
        {slides.map((slide, index) => (
          <button
            key={slide.href}
            type="button"
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to ${slide.name}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === activeIndex ? 'bg-crimson' : 'bg-parchment-deep'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

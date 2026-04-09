'use client'

import { Fragment } from 'react'

const MARQUEE_ITEMS: string[] = [
  'Coles',
  'Woolworths',
  'ALDI',
  'Supplying Australia since 1945',
  "13% of Australia's Bananas",
  '550+ Team Members',
  '5,800 Hectares',
]

function MarqueeRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex gap-12 items-center whitespace-nowrap shrink-0 pr-12"
      aria-hidden={ariaHidden || undefined}
    >
      {MARQUEE_ITEMS.map((item, index) => (
        <Fragment key={`${item}-${index}`}>
          <span className="font-heading text-sm font-medium text-dust/60">
            {item}
          </span>
          <span
            aria-hidden
            className="w-1.5 h-1.5 rounded-full bg-harvest-gold shrink-0"
          />
        </Fragment>
      ))}
    </div>
  )
}

export function MarqueeBand() {
  return (
    <section
      className="bg-ink py-4 overflow-hidden group"
      aria-label="Mackays supply partners and facts"
    >
      <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
        <MarqueeRow />
        <MarqueeRow ariaHidden />
      </div>
    </section>
  )
}

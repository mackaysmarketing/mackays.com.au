'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Badge } from '@/components/ui/Badge'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { StatCounter } from '@/components/ui/StatCounter'
import type {
  EnvironmentContent,
  EnvironmentTabKey,
} from '@/content/types'

export interface EnvironmentTabsProps {
  content: EnvironmentContent
}

const TAB_ORDER: EnvironmentTabKey[] = [
  'biosecurity',
  'water',
  'carbon',
  'iqf',
]

const TRIGGER_CLASS =
  'px-6 py-3 font-heading text-[12px] font-semibold uppercase tracking-[0.1em] text-dust hover:text-ink transition-colors data-[state=active]:text-crimson data-[state=active]:border-b-2 data-[state=active]:border-harvest-gold -mb-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2 focus-visible:ring-offset-parchment'

export function EnvironmentTabs({ content }: EnvironmentTabsProps) {
  return (
    <Tabs.Root defaultValue="biosecurity" className="mt-12">
      <Tabs.List
        aria-label="Environment commitments"
        className="flex gap-0 border-b border-parchment-deep mb-12 overflow-x-auto"
      >
        {TAB_ORDER.map((key) => (
          <Tabs.Trigger key={key} value={key} className={TRIGGER_CLASS}>
            {content.tabLabels[key]}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {/* Biosecurity */}
      <Tabs.Content
        value="biosecurity"
        className="focus-visible:outline-none"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <Badge
              variant="crimson"
              label={content.biosecurityBadge}
              className="mb-6"
            />
            <p className="font-body text-[16px] text-ink-mid leading-[1.75]">
              {content.bodies.biosecurity}
            </p>
          </div>
          <div className="relative w-full h-80 rounded-xl overflow-hidden">
            <ImagePlaceholder
              fill
              seed={content.biosecurityImage.seed}
              alt={content.biosecurityImage.alt}
              sizes="(min-width: 768px) 500px, 90vw"
            />
          </div>
        </div>
      </Tabs.Content>

      {/* Water */}
      <Tabs.Content
        value="water"
        className="focus-visible:outline-none"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <p className="font-body text-[16px] text-ink-mid leading-[1.75]">
            {content.bodies.water}
          </p>
          <div className="grid grid-cols-2 gap-8">
            {content.waterStats.map((stat) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </Tabs.Content>

      {/* Carbon */}
      <Tabs.Content
        value="carbon"
        className="focus-visible:outline-none"
      >
        <div className="max-w-2xl">
          <p className="font-body text-[16px] text-ink-mid leading-[1.75] mb-8">
            {content.bodies.carbon}
          </p>
          <p
            className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-dust mb-3"
            aria-hidden
          >
            {content.carbonProgressLabel}
          </p>
          <div
            className="w-full h-2 bg-parchment-deep rounded-full overflow-hidden"
            role="progressbar"
            aria-label={content.carbonProgressLabel}
            aria-valuenow={66}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full w-2/3 rounded-full bg-[linear-gradient(90deg,var(--harvest-gold)_0%,var(--harvest-gold-dark)_50%,var(--harvest-gold)_100%)] bg-[length:200%_100%] animate-shimmer motion-reduce:animate-none"
            />
          </div>
          <p className="font-body text-[13px] text-dust mt-3">
            {content.carbonFootnote}
          </p>
        </div>
      </Tabs.Content>

      {/* Zero Waste / IQF */}
      <Tabs.Content
        value="iqf"
        className="focus-visible:outline-none"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="relative w-full h-80 rounded-xl overflow-hidden">
            <ImagePlaceholder
              fill
              seed={content.iqfImage.seed}
              alt={content.iqfImage.alt}
              sizes="(min-width: 768px) 500px, 90vw"
            />
          </div>
          <div>
            <p className="font-body text-[16px] text-ink-mid leading-[1.75] mb-8">
              {content.bodies.iqf}
            </p>
            <StatCounter
              value={content.iqfStat.value}
              suffix={content.iqfStat.suffix}
              label={content.iqfStat.label}
            />
          </div>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  )
}

import { Heart, Leaf, Recycle, Shield } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type {
  SustainabilityPillar,
  HomeContent,
} from '@/content/types'

export interface SustainabilityBandProps {
  content: HomeContent['sustainability']
}

type IconName = SustainabilityPillar['icon']
type IconColor = SustainabilityPillar['iconColor']

const ICON_MAP: Record<IconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  Shield,
  Recycle,
  Leaf,
  Heart,
}

const ICON_COLOR_CLASS: Record<IconColor, string> = {
  crimson: 'text-crimson',
  'harvest-gold': 'text-harvest-gold',
  'sage-light': 'text-sage-light',
  'sage-field': 'text-sage-field',
}

const HEADING_COLOR_CLASS: Record<IconColor, string> = {
  crimson: 'text-crimson',
  'harvest-gold': 'text-harvest-gold',
  'sage-light': 'text-sage-light',
  'sage-field': 'text-sage-light',
}

export function SustainabilityBand({ content }: SustainabilityBandProps) {
  return (
    <section className="bg-ink">
      <div className="max-w-7xl mx-auto px-10 py-24">
        <SectionHeader
          tone="parchment"
          eyebrow={content.eyebrow}
          headline={content.headline}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {content.pillars.map((pillar) => {
            const Icon = ICON_MAP[pillar.icon]
            return (
              <div key={pillar.heading}>
                <Icon
                  className={`w-7 h-7 mb-4 ${ICON_COLOR_CLASS[pillar.iconColor]}`}
                  aria-hidden
                />
                <h3
                  className={`font-heading font-semibold text-[14px] mb-3 ${HEADING_COLOR_CLASS[pillar.iconColor]}`}
                >
                  {pillar.heading}
                </h3>
                <p className="font-body text-[13px] text-dust/60 leading-[1.7]">
                  {pillar.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

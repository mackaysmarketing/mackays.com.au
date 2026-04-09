import { SectionHeader } from '@/components/ui/SectionHeader'
import type { ValueAccent, WorkPillar } from '@/content/types'

export interface WhyMackaysPillarsProps {
  eyebrow: string
  headline: string
  pillars: WorkPillar[]
}

const BORDER_CLASS: Record<ValueAccent, string> = {
  crimson: 'border-crimson',
  'harvest-gold': 'border-harvest-gold',
  'sage-field': 'border-sage-field',
}

export function WhyMackaysPillars({
  eyebrow,
  headline,
  pillars,
}: WhyMackaysPillarsProps) {
  return (
    <section className="max-w-7xl mx-auto px-10 py-24">
      <SectionHeader eyebrow={eyebrow} headline={headline} />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        {pillars.map((pillar) => (
          <article
            key={pillar.number}
            className={`relative overflow-hidden bg-parchment-cool rounded-xl p-8 border-t-[3px] ${BORDER_CLASS[pillar.accent]}`}
          >
            <span
              aria-hidden
              className="absolute top-4 right-6 font-heading font-extrabold text-[100px] text-ink/5 leading-none select-none pointer-events-none"
            >
              {pillar.number}
            </span>
            <h3 className="relative font-heading font-bold text-[18px] text-ink mb-3">
              {pillar.title}
            </h3>
            <p className="relative font-body text-[14px] text-ink-mid leading-[1.65]">
              {pillar.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

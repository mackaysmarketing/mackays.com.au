import { Button } from '@/components/ui/Button'
import type { CtaLink } from '@/content/types'

export interface GoldCalloutBandProps {
  eyebrow?: string
  headline: string
  body: string
  cta?: CtaLink
  className?: string
}

export function GoldCalloutBand({
  eyebrow,
  headline,
  body,
  cta,
  className,
}: GoldCalloutBandProps) {
  return (
    <section
      className={[
        'bg-harvest-gold border-l-4 border-crimson py-12 px-10',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-start md:items-center">
        <div className="flex-1 max-w-xl">
          {eyebrow && (
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/50 mb-2">
              {eyebrow}
            </p>
          )}
          <h2 className="font-heading font-bold text-[24px] md:text-[28px] tracking-[-0.02em] text-ink leading-tight mb-3">
            {headline}
          </h2>
          <p className="font-body text-[14px] text-ink-mid leading-relaxed">
            {body}
          </p>
        </div>
        {cta && (
          <div className="shrink-0">
            <Button variant="primary" size="md" href={cta.href}>
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

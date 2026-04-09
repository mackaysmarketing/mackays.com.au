import type { OurStoryValue, ValueAccent } from '@/content/types'

export interface ValuesTriptychProps {
  values: OurStoryValue[]
  className?: string
}

const BORDER_CLASS: Record<ValueAccent, string> = {
  crimson: 'border-crimson',
  'harvest-gold': 'border-harvest-gold',
  'sage-field': 'border-sage-field',
}

export function ValuesTriptych({ values, className }: ValuesTriptychProps) {
  return (
    <section
      className={[
        'max-w-7xl mx-auto px-10 py-24 grid grid-cols-1 md:grid-cols-3 gap-6',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {values.map((value) => (
        <article
          key={value.heading}
          className={`relative overflow-hidden bg-parchment-warm rounded-xl p-10 border-t-[3px] ${BORDER_CLASS[value.accent]}`}
        >
          <span
            aria-hidden
            className="absolute top-4 right-6 font-heading font-extrabold text-[120px] text-ink/5 leading-none select-none pointer-events-none"
          >
            {value.number}
          </span>
          <h3 className="relative font-heading font-bold text-[22px] tracking-[-0.02em] text-ink mb-4">
            {value.heading}
          </h3>
          <p className="relative font-body text-[15px] text-ink-mid leading-[1.7]">
            {value.body}
          </p>
        </article>
      ))}
    </section>
  )
}

import { StatCounter } from '@/components/ui/StatCounter'
import type { StatItem } from '@/content/types'

export interface FloatStatBandProps {
  stats: StatItem[]
  className?: string
}

export function FloatStatBand({ stats, className }: FloatStatBandProps) {
  return (
    <section
      className={[
        'border-t border-b border-parchment-deep py-12 px-10',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, index) => {
          const isLast = index === stats.length - 1
          return (
            <div
              key={stat.label}
              className={[
                'px-4 md:px-8 py-4',
                !isLast ? 'md:border-r border-parchment-deep' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <StatCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                label={stat.label}
                separator={stat.separator}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

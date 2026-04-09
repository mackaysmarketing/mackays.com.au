export type BadgeVariant = 'crimson' | 'gold' | 'sage' | 'neutral'

export interface BadgeProps {
  label: string
  variant?: BadgeVariant
  className?: string
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  crimson: 'bg-crimson-pale text-crimson',
  gold: 'bg-harvest-gold text-ink',
  sage: 'bg-sage-pale text-sage-field',
  neutral: 'bg-parchment-warm text-dust',
}

export function Badge({ label, variant = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center font-heading text-[11px] font-semibold uppercase tracking-[0.08em] px-3 py-1 rounded-[var(--radius-sm)]',
        VARIANT_CLASSES[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {label}
    </span>
  )
}

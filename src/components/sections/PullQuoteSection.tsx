export interface PullQuoteSectionProps {
  quote: string
  attribution?: string
  className?: string
}

export function PullQuoteSection({
  quote,
  attribution,
  className,
}: PullQuoteSectionProps) {
  return (
    <section
      className={[
        'py-20 px-10 max-w-3xl mx-auto text-center',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        aria-hidden
        className="w-16 h-[3px] bg-harvest-gold mx-auto mb-8"
      />
      <blockquote className="font-body italic text-[22px] md:text-[28px] text-ink-mid leading-[1.65] mb-6">
        &ldquo;{quote}&rdquo;
      </blockquote>
      {attribution && (
        <figcaption className="font-heading text-[11px] font-semibold uppercase tracking-[0.1em] text-crimson">
          {attribution}
        </figcaption>
      )}
    </section>
  )
}

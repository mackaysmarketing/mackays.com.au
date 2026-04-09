import type { ReactElement } from 'react'

export interface SectionHeaderProps {
  eyebrow?: string
  headline: string
  subheadline?: string
  align?: 'left' | 'center'
  tone?: 'ink' | 'parchment'
  className?: string
}

/**
 * Renders a headline string with optional <em>...</em> markers as
 * Lora italic in crimson. Only plain <em> tags are supported — the
 * rest of the headline is rendered as plain text.
 */
function renderHeadline(headline: string, tone: 'ink' | 'parchment'): ReactElement[] {
  const parts: ReactElement[] = []
  const regex = /<em>(.*?)<\/em>/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = regex.exec(headline)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={key++}>{headline.slice(lastIndex, match.index)}</span>,
      )
    }
    parts.push(
      <em
        key={key++}
        className="font-body italic font-normal text-crimson"
      >
        {match[1]}
      </em>,
    )
    lastIndex = regex.lastIndex
  }

  if (lastIndex < headline.length) {
    parts.push(<span key={key++}>{headline.slice(lastIndex)}</span>)
  }

  if (parts.length === 0) {
    parts.push(
      <span key="only" className={tone === 'parchment' ? 'text-parchment' : undefined}>
        {headline}
      </span>,
    )
  }

  return parts
}

export function SectionHeader({
  eyebrow,
  headline,
  subheadline,
  align = 'left',
  tone = 'ink',
  className,
}: SectionHeaderProps) {
  const alignment =
    align === 'center' ? 'mx-auto text-center' : 'text-left'

  const eyebrowTone =
    tone === 'parchment' ? 'text-dust/60' : 'text-dust'
  const headlineTone =
    tone === 'parchment' ? 'text-parchment' : 'text-ink'
  const subheadlineTone =
    tone === 'parchment' ? 'text-dust/70' : 'text-ink-mid'

  return (
    <header className={[alignment, className].filter(Boolean).join(' ')}>
      {eyebrow && (
        <p
          className={`font-heading text-[11px] font-semibold uppercase tracking-[0.14em] ${eyebrowTone} mb-3`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-heading font-bold text-[clamp(32px,5vw,52px)] leading-[1.05] tracking-[-0.025em] ${headlineTone} mb-4`}
      >
        {renderHeadline(headline, tone)}
      </h2>
      {subheadline && (
        <p
          className={`font-body text-[17px] ${subheadlineTone} max-w-[520px] leading-[1.7] ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {subheadline}
        </p>
      )}
    </header>
  )
}

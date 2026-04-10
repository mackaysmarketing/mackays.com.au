import Image from 'next/image'

export interface MackaysLogoProps {
  /** Width in px — height auto-scales from the SVG's aspect ratio (≈ 2.2:1). */
  width?: number
  /** Height in px — width auto-scales if only height is given. */
  height?: number
  className?: string
  /** For dark backgrounds, apply a CSS filter or use the light variant. */
  variant?: 'default' | 'light'
}

/**
 * Renders the official Mackays wordmark SVG from `public/logo/`.
 * Uses next/image so the SVG is cached and responsive. The SVG
 * viewBox is 638 × 290 — roughly a 2.2:1 aspect ratio.
 */
export function MackaysLogo({
  width = 140,
  height,
  className,
  variant = 'default',
}: MackaysLogoProps) {
  const resolvedHeight = height ?? Math.round(width / 2.2)
  const filterClass = variant === 'light' ? 'brightness-0 invert' : ''

  return (
    <Image
      src="/logo/mackays-logo.svg"
      alt="Mackays Marketing logo"
      width={width}
      height={resolvedHeight}
      priority
      className={[filterClass, className].filter(Boolean).join(' ')}
    />
  )
}

import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'gold'
  | 'ink-gold'
  | 'ghost-link'

export type ButtonSize = 'sm' | 'md' | 'lg'

type CommonProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

type LinkProps = CommonProps & {
  href: string
  onClick?: never
  type?: never
}

type NativeButtonProps = CommonProps & {
  href?: never
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  disabled?: boolean
  'aria-busy'?: boolean
}

export type ButtonProps = LinkProps | NativeButtonProps

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-crimson text-white hover:bg-crimson-dark active:scale-[0.98] shadow-[0_0_0_0_var(--crimson-pale)] hover:shadow-[0_0_0_4px_var(--crimson-pale)]',
  secondary:
    'bg-transparent text-ink border border-parchment-deep hover:bg-parchment-warm hover:border-dust active:scale-[0.98]',
  gold: 'bg-harvest-gold text-ink hover:bg-harvest-gold-dark active:scale-[0.98]',
  'ink-gold': 'bg-ink text-harvest-gold hover:bg-ink-mid active:scale-[0.98]',
  'ghost-link':
    'bg-transparent text-crimson border-b border-crimson rounded-none px-0 py-1 inline-block hover:text-crimson-dark hover:border-crimson-dark',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'text-[12px] px-3 py-2',
  md: 'text-[14px] px-5 py-3',
  lg: 'text-[15px] px-6 py-[14px]',
}

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-[var(--radius-md)] transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2 focus-visible:ring-offset-parchment disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none'

function composeClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  extra?: string,
) {
  return [BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], extra]
    .filter(Boolean)
    .join(' ')
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    className,
    children,
  } = props

  const composed = composeClassName(variant, size, className)

  if ('href' in props && props.href !== undefined) {
    const { href } = props
    const isExternal = /^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')

    if (isExternal) {
      return (
        <a
          href={href}
          className={composed}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    }

    return (
      <Link href={href} className={composed}>
        {children}
      </Link>
    )
  }

  const {
    onClick,
    type = 'button',
    disabled,
    'aria-busy': ariaBusy,
  } = props as NativeButtonProps
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-busy={ariaBusy}
      className={composed}
    >
      {children}
    </button>
  )
}

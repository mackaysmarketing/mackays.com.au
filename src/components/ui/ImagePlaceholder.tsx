import Image from 'next/image'

type BaseProps = {
  seed: number
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
}

type FixedProps = BaseProps & {
  fill?: false
  width: number
  height: number
}

type FillProps = BaseProps & {
  fill: true
  width?: never
  height?: never
}

export type ImagePlaceholderProps = FixedProps | FillProps

/**
 * Wraps next/image with a picsum.photos source keyed on a numeric seed,
 * so layouts remain deterministic across builds until real photography is
 * wired in. Two modes: fixed (width/height) or fill.
 */
export function ImagePlaceholder(props: ImagePlaceholderProps) {
  const {
    seed,
    alt,
    className,
    priority = false,
    sizes,
  } = props

  if (props.fill) {
    return (
      <Image
        src={`https://picsum.photos/seed/${seed}/1600/1000`}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? '100vw'}
        className={['object-cover', className].filter(Boolean).join(' ')}
      />
    )
  }

  return (
    <Image
      src={`https://picsum.photos/seed/${seed}/${props.width}/${props.height}`}
      alt={alt}
      width={props.width}
      height={props.height}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  )
}

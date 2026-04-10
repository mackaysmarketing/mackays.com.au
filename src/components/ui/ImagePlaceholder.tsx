import Image from 'next/image'
import { IMAGE_MAP } from '@/content/images'

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
 * Wraps next/image with a picsum.photos source keyed on a numeric seed.
 * If the seed has a real photo mapped in `src/content/images.ts`, that
 * local image is used instead. Two modes: fixed (width/height) or fill.
 */
export function ImagePlaceholder(props: ImagePlaceholderProps) {
  const {
    seed,
    alt,
    className,
    priority = false,
    sizes,
  } = props

  const localSrc = IMAGE_MAP[seed]

  if (props.fill) {
    const src =
      localSrc ?? `https://picsum.photos/seed/${seed}/1600/1000`
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? '100vw'}
        className={['object-cover', className].filter(Boolean).join(' ')}
      />
    )
  }

  const src =
    localSrc ??
    `https://picsum.photos/seed/${seed}/${props.width}/${props.height}`

  return (
    <Image
      src={src}
      alt={alt}
      width={props.width}
      height={props.height}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  )
}

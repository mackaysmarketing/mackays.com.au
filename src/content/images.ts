/**
 * Image seed map. When a seed has a corresponding real photo in
 * `public/images/`, add it here. Any seed NOT in this map falls back
 * to the picsum.photos placeholder automatically.
 *
 * To replace an image:
 * 1. Drop the .jpg/.webp into public/images/
 * 2. Add one line below: `<seed>: '/images/<filename>',`
 * 3. Commit. Done.
 */
export const IMAGE_MAP: Record<number, string> = {
  90: '/images/home-hero.jpg',
}

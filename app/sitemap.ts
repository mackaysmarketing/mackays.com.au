import type { MetadataRoute } from 'next'
import { CROP_SLUGS, MEDIA, SITE } from '@/content'

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/our-story', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/our-produce', priority: 0.95, changeFrequency: 'weekly' },
  { path: '/people-and-environment', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/work-with-us', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/media', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.85, changeFrequency: 'monthly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const cropEntries: MetadataRoute.Sitemap = CROP_SLUGS.map((slug) => ({
    url: `${SITE.url}/our-produce/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  const mediaEntries: MetadataRoute.Sitemap = MEDIA.pressReleases.map((pr) => ({
    url: `${SITE.url}/media/${pr.slug}`,
    lastModified: new Date(pr.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...staticEntries, ...cropEntries, ...mediaEntries]
}

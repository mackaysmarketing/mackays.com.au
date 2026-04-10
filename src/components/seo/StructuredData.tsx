import { SITE } from '@/content'
import type { CropData } from '@/content/types'

/**
 * Small JSON-LD helper. Every consumer passes a plain object matching
 * one of the schema.org types we use (Organization / Article / Product)
 * and we emit it inside a `<script type="application/ld+json">` tag
 * inside the page body. Next.js App Router renders these inline into
 * the static HTML so search engines pick them up without JavaScript.
 */
function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/* ─── Organization ────────────────────────────────────────── */

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: `${SITE.brand} Marketing`,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/icon.png`,
    foundingDate: SITE.foundingDate,
    description: SITE.metaDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address,
      addressLocality: SITE.addressLocality,
      addressRegion: SITE.addressRegion,
      postalCode: SITE.postalCode,
      addressCountry: SITE.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.latitude,
      longitude: SITE.longitude,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE.phoneTel,
        contactType: 'customer service',
        email: SITE.emails.info,
        areaServed: 'AU',
        availableLanguage: ['en'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: SITE.emails.trade,
        areaServed: 'AU',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'press',
        email: SITE.emails.media,
        areaServed: 'AU',
      },
    ],
    sameAs: [],
  }
  return <JsonLd data={data} />
}

/* ─── Article (Our Story) ─────────────────────────────────── */

export interface ArticleJsonLdProps {
  headline: string
  description: string
  url: string
  image?: string
  datePublished: string
}

export function ArticleJsonLd({
  headline,
  description,
  url,
  image,
  datePublished,
}: ArticleJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    image: image ? [image] : undefined,
    datePublished,
    author: {
      '@type': 'Organization',
      name: `${SITE.brand} Marketing`,
      url: SITE.url,
    },
    publisher: {
      '@type': 'Organization',
      name: `${SITE.brand} Marketing`,
      url: SITE.url,
    },
  }
  return <JsonLd data={data} />
}

/* ─── Product (Crop pages) ────────────────────────────────── */

export interface ProductJsonLdProps {
  crop: CropData
}

export function ProductJsonLd({ crop }: ProductJsonLdProps) {
  const url = `${SITE.url}/our-produce/${crop.slug}`
  const image = `https://picsum.photos/seed/${crop.heroSeed}/1600/1000`

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: crop.name,
    description: `${crop.tagline} ${crop.story.slice(0, 160)}`,
    url,
    image: [image],
    brand: {
      '@type': 'Brand',
      name: SITE.brand,
    },
    manufacturer: {
      '@type': 'Organization',
      name: `${SITE.brand} Marketing`,
      url: SITE.url,
    },
    category: 'Fresh produce',
    countryOfOrigin: {
      '@type': 'Country',
      name: 'Australia',
    },
    offers: {
      '@type': 'AggregateOffer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'AUD',
      seller: {
        '@type': 'Organization',
        name: `${SITE.brand} Marketing`,
      },
    },
  }

  return <JsonLd data={data} />
}

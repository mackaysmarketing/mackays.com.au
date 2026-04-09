import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, CloudRain, Layers, MapPin } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { Button } from '@/components/ui/Button'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { SectionHeader } from '@/components/ui/SectionHeader'
import {
  GoldCalloutBand,
  PullQuoteSection,
  SplitScreenParallax,
} from '@/components/sections'
import {
  CROP_SLUGS,
  PRODUCE,
  PRODUCE_DATA,
} from '@/content'
import type { CropData, CropSlug } from '@/content/types'

type CropPageParams = { crop: string }

export async function generateStaticParams(): Promise<CropPageParams[]> {
  return CROP_SLUGS.map((crop) => ({ crop }))
}

function isCropSlug(value: string): value is CropSlug {
  return (CROP_SLUGS as readonly string[]).includes(value)
}

function getCrop(slug: string): CropData | null {
  if (!isCropSlug(slug)) return null
  return PRODUCE_DATA[slug]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<CropPageParams>
}): Promise<Metadata> {
  const { crop: slug } = await params
  const crop = getCrop(slug)
  if (!crop) {
    return {
      title: 'Crop not found | Mackays',
    }
  }
  return {
    title: `${crop.name} | Mackays — Far North Queensland`,
    description: `${crop.tagline} Grown by Mackays Marketing in Far North Queensland.`,
  }
}

const GROWING_ICON_MAP: Record<
  keyof CropData['growing'],
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  soil: Layers,
  climate: CloudRain,
  region: MapPin,
  harvest: Calendar,
}

export default async function CropPage({
  params,
}: {
  params: Promise<CropPageParams>
}) {
  const { crop: slug } = await params
  const crop = getCrop(slug)
  if (!crop) notFound()

  const related = CROP_SLUGS.filter((s) => s !== crop.slug)
    .slice(0, 3)
    .map((s) => PRODUCE_DATA[s])

  const growingOrder: (keyof CropData['growing'])[] = [
    'soil',
    'climate',
    'region',
    'harvest',
  ]
  const growingLabels = PRODUCE.cropPage.growing
  const varietiesHeadline = PRODUCE.cropPage.varieties.headlineTemplate.replace(
    '{crop}',
    crop.name.toLowerCase(),
  )

  return (
    <>
      {/* 1. Hero */}
      <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
        <ImagePlaceholder
          fill
          priority
          seed={crop.heroSeed}
          alt={`${crop.name} growing in Far North Queensland`}
          sizes="100vw"
        />
        <div aria-hidden className="absolute inset-0 bg-ink/40" />
        <div className="absolute bottom-12 left-10 md:left-16 max-w-3xl z-10">
          <nav
            aria-label="Breadcrumb"
            className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60 mb-6"
          >
            <Link
              href="/our-produce"
              className="hover:text-white transition-colors"
            >
              {PRODUCE.cropPage.breadcrumb}
            </Link>
            <span aria-hidden className="mx-3">
              /
            </span>
            <span className="text-white/90">{crop.name}</span>
          </nav>
          <h1 className="font-heading font-bold text-[clamp(52px,8vw,88px)] leading-[1.02] tracking-[-0.04em] text-white mb-3">
            {crop.name}
          </h1>
          <p className="font-body italic text-[20px] text-harvest-gold">
            {crop.tagline}
          </p>
        </div>
      </section>

      {/* 2. Story */}
      <SplitScreenParallax
        imageSeed={crop.storySeed}
        imageAlt={`${crop.name} farm — Mackays, Far North Queensland`}
      >
        <SectionHeader
          eyebrow={crop.eyebrow}
          headline={crop.storyHeadline}
        />
        <p className="font-body text-[16px] text-ink-mid leading-[1.75] mt-6">
          {crop.story}
        </p>
      </SplitScreenParallax>

      {/* 3. Growing Conditions */}
      <section className="max-w-7xl mx-auto px-10 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {growingOrder.map((key) => {
            const Icon = GROWING_ICON_MAP[key]
            return (
              <div
                key={key}
                className="bg-parchment-cool border border-parchment-deep rounded-lg p-6"
              >
                <Icon
                  className="w-5 h-5 text-crimson mb-3"
                  aria-hidden
                />
                <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-dust mb-1">
                  {growingLabels[key]}
                </p>
                <p className="font-heading font-semibold text-[15px] text-ink leading-snug">
                  {crop.growing[key]}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* 4. Varieties (optional) */}
      {crop.varieties && crop.varieties.length > 0 && (
        <section className="max-w-7xl mx-auto px-10 py-24 border-t border-parchment-deep">
          <div className="mb-12">
            <SectionHeader
              eyebrow={PRODUCE.cropPage.varieties.eyebrow}
              headline={varietiesHeadline}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {crop.varieties.map((variety) => (
              <article
                key={variety.name}
                className="bg-parchment-cool rounded-xl p-8"
              >
                <h3 className="font-heading font-bold text-[22px] text-ink mb-4">
                  {variety.name}
                </h3>
                <p className="font-body text-[15px] text-ink-mid leading-[1.7]">
                  {variety.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 5. Pull Quote */}
      <PullQuoteSection quote={crop.pullQuote} />

      {/* 6. Related Produce */}
      <section className="max-w-7xl mx-auto px-10 py-24 border-t border-parchment-deep">
        <div className="mb-12">
          <SectionHeader
            eyebrow={PRODUCE.cropPage.related.eyebrow}
            headline={PRODUCE.cropPage.related.headline}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((rel) => (
            <Link
              key={rel.slug}
              href={`/our-produce/${rel.slug}`}
              className="group relative rounded-xl overflow-hidden h-64 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson"
            >
              <ImagePlaceholder
                fill
                seed={rel.heroSeed}
                alt={`${rel.name} — Mackays`}
                sizes="(min-width: 768px) 33vw, 90vw"
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <span className="font-heading font-bold text-[20px] text-white leading-tight block mb-1 transition-transform duration-200 group-hover:-translate-y-1">
                  {rel.name}
                </span>
                <span className="font-body italic text-[13px] text-white/75">
                  {rel.tagline}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Trade Callout */}
      <GoldCalloutBand
        eyebrow={PRODUCE.cropPage.tradeCallout.eyebrow}
        headline={PRODUCE.cropPage.tradeCallout.headline}
        body={PRODUCE.tradeEnquiryBody}
        cta={{
          label: PRODUCE.cropPage.tradeCallout.ctaLabel,
          href: `/contact?ref=${crop.slug}`,
        }}
      />
    </>
  )
}

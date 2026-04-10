import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { SectionHeader } from '@/components/ui/SectionHeader'
import {
  BentoProduceGrid,
  KineticHero,
  SplitScreenParallax,
  SupplyChainExplainer,
} from '@/components/sections'
import { PRODUCE, PRODUCE_DATA } from '@/content'

const PRODUCE_DESCRIPTION =
  'Six crops from three distinct growing regions in Far North Queensland: bananas, red papaya, avocados, sugar cane, grass-fed cattle and passionfruit.'

export const metadata: Metadata = {
  title: 'Our Produce — Six Crops, Three Regions, One Standard',
  description: PRODUCE_DESCRIPTION,
  alternates: { canonical: '/our-produce' },
  openGraph: {
    type: 'website',
    title: 'Our Produce | Mackays — Six Crops, Three Regions',
    description: PRODUCE_DESCRIPTION,
    url: '/our-produce',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Produce | Mackays',
    description: PRODUCE_DESCRIPTION,
  },
}

export default function OurProduceOverviewPage() {
  const { hero, bento, supplyChain, iqfBand, tradeBand } = PRODUCE.overview

  return (
    <>
      {/* 1. Hero */}
      <KineticHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        subheadline={PRODUCE.overview.intro}
        ctaPrimary={hero.ctaPrimary}
        imageSeed={10}
        imageAlt={hero.imageAlt}
      />

      {/* 2. Bento Grid */}
      <section className="max-w-7xl mx-auto px-10 py-24">
        <div className="mb-12">
          <SectionHeader
            eyebrow={bento.eyebrow}
            headline={bento.headline}
          />
        </div>
        <BentoProduceGrid items={bento.items} crops={PRODUCE_DATA} />
      </section>

      {/* 3. Supply Chain Explainer */}
      <section className="max-w-7xl mx-auto px-10 py-24 border-t border-parchment-deep">
        <div className="mb-12">
          <SectionHeader
            eyebrow={supplyChain.eyebrow}
            headline={supplyChain.headline}
          />
        </div>
        <SupplyChainExplainer steps={supplyChain.steps} />
      </section>

      {/* 4. Smart Banana — Split Screen Parallax */}
      <SplitScreenParallax
        imageSeed={20}
        imageAlt="Smart Banana packaging line"
      >
        <div className="border-t-4 border-harvest-gold pt-6">
          <SectionHeader
            eyebrow={PRODUCE.smartBanana.eyebrow}
            headline={PRODUCE.smartBanana.headline}
          />
          <p className="font-body text-[16px] text-ink-mid leading-[1.75] mt-6">
            {PRODUCE.smartBanana.body}
          </p>
        </div>
      </SplitScreenParallax>

      {/* 5 & 6. IQF Band + Trade CTA */}
      <section className="bg-ink">
        <div className="max-w-7xl mx-auto px-10 py-24">
          <SectionHeader
            tone="parchment"
            eyebrow={iqfBand.eyebrow}
            headline={iqfBand.headline}
          />
          <p className="font-body text-[16px] text-dust/80 leading-[1.75] mt-6 max-w-2xl">
            {PRODUCE.iqf.body}
          </p>
          <div className="mt-10 relative w-full max-w-2xl h-72 rounded-xl overflow-hidden">
            <ImagePlaceholder
              fill
              seed={iqfBand.imageSeed}
              alt={iqfBand.imageAlt}
              sizes="(min-width: 768px) 600px, 90vw"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-10 pb-24 pt-8 text-center">
          <p className="font-heading font-bold text-[28px] text-parchment mb-6">
            {tradeBand.headline}
          </p>
          <Button variant="gold" size="lg" href={tradeBand.cta.href}>
            {tradeBand.cta.label}
          </Button>
        </div>
      </section>
    </>
  )
}

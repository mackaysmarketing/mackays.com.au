import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import {
  FloatStatBand,
  HorizontalProduceTape,
  LivingPhotoGrid,
  MarqueeBand,
  PullQuoteSection,
  QldFarmMap,
  StickyTimeline,
  KineticHero,
} from '@/components/sections'
import { BrandStatement, SustainabilityBand } from '@/components/home'
import {
  FARM_MARKERS,
  HOME,
  PRODUCE_DATA,
  TIMELINE_ITEMS,
} from '@/content'
import type { ProduceSlide } from '@/components/sections/HorizontalProduceTape'

export const metadata: Metadata = {
  title: "Australia's Leading Tropical Produce Grower",
  description:
    'Fourth-generation family farming from Tully, Far North Queensland. Bananas, papaya, avocados, cane, cattle and passionfruit supplied to Coles, Woolworths and ALDI.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: "Mackays | Australia's Leading Tropical Produce Grower",
    description:
      'Fourth-generation family farming from Tully, Far North Queensland. Bananas, papaya, avocados, cane, cattle and passionfruit supplied to Coles, Woolworths and ALDI.',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mackays | Australia's Leading Tropical Produce Grower",
    description:
      'Fourth-generation family farming from Tully, Far North Queensland. Bananas, papaya, avocados, cane, cattle and passionfruit.',
  },
}

function buildProduceSlides(): ProduceSlide[] {
  return HOME.produceTape.map((slide) => {
    const crop = PRODUCE_DATA[slide.slug]
    return {
      seed: slide.seed,
      name: crop.name,
      tagline: crop.tagline,
      stat: slide.stat,
      href: slide.href,
    }
  })
}

export default function HomePage() {
  const produceSlides = buildProduceSlides()

  return (
    <>
      {/* 1. Hero */}
      <KineticHero
        eyebrow={HOME.hero.eyebrow}
        headline={HOME.hero.headline}
        subheadline={HOME.hero.subheadline}
        ctaPrimary={HOME.hero.ctaPrimary}
        ctaSecondary={HOME.hero.ctaSecondary}
        imageSeed={90}
        imageAlt="Mackays banana plantation, Tully Valley"
      />

      {/* 2. Stats */}
      <FloatStatBand stats={HOME.stats} />

      {/* 3. Brand Statement */}
      <BrandStatement
        content={HOME.brandStatement}
        imageSeed={20}
        imageAlt="Banana plantation, Tully Valley"
      />

      {/* 4. Produce Tape */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-10 mb-10">
          <SectionHeader
            eyebrow={HOME.sectionLabels.produce.eyebrow}
            headline={HOME.sectionLabels.produce.headline}
          />
        </div>
        <HorizontalProduceTape slides={produceSlides} />
      </section>

      {/* 5. Abbreviated Timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-10 mb-10">
          <SectionHeader
            eyebrow={HOME.sectionLabels.story.eyebrow}
            headline={HOME.sectionLabels.story.headline}
          />
        </div>
        <StickyTimeline
          items={TIMELINE_ITEMS.slice(0, 6)}
          abbreviated
        />
        <div className="max-w-7xl mx-auto px-10 pt-8">
          <Button variant="ghost-link" href="/our-story">
            {HOME.sectionLabels.story.fullHistoryCta} →
          </Button>
        </div>
      </section>

      {/* 6. Farm Map */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-10 mb-10">
          <SectionHeader
            eyebrow={HOME.mapSection.eyebrow}
            headline={HOME.mapSection.headline}
            subheadline={HOME.mapSection.body}
          />
        </div>
        <div className="max-w-7xl mx-auto px-10">
          <QldFarmMap markers={FARM_MARKERS} />
        </div>
      </section>

      {/* 7. Pull Quote */}
      <PullQuoteSection
        quote={HOME.pullQuote.quote}
        attribution={HOME.pullQuote.attribution}
      />

      {/* 8. Sustainability Band */}
      <SustainabilityBand content={HOME.sustainability} />

      {/* 9. Life at Mackays */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-10 mb-12">
          <SectionHeader
            eyebrow={HOME.sectionLabels.lifeAtMackays.eyebrow}
            headline={HOME.sectionLabels.lifeAtMackays.headline}
            align="center"
          />
        </div>
        <LivingPhotoGrid
          seeds={HOME.lifePhotoGrid.map((item) => item.seed)}
          captions={HOME.lifePhotoGrid.map((item) => item.caption)}
        />
      </section>

      {/* 10. Marquee */}
      <MarqueeBand />
    </>
  )
}

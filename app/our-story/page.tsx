import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import {
  FamilyTree,
  PullQuoteSection,
  SplitScreenParallax,
  StickyTimeline,
  ValuesTriptych,
} from '@/components/sections'
import { SplitHero } from '@/components/our-story'
import { ArticleJsonLd } from '@/components/seo/StructuredData'
import {
  OUR_STORY,
  PEOPLE_ENVIRONMENT,
  SITE,
  TIMELINE_ITEMS,
} from '@/content'

const OUR_STORY_DESCRIPTION =
  "From one hand-cleared block in 1945 to 5,800 hectares across three growing regions. The story of Australia's largest banana-growing family."

export const metadata: Metadata = {
  title: 'Our Story — 80 Years of Family Farming',
  description: OUR_STORY_DESCRIPTION,
  alternates: { canonical: '/our-story' },
  openGraph: {
    type: 'article',
    title: 'Our Story | Mackays — 80 Years of Family Farming',
    description: OUR_STORY_DESCRIPTION,
    url: '/our-story',
    publishedTime: '2025-01-01',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Story | Mackays — 80 Years of Family Farming',
    description: OUR_STORY_DESCRIPTION,
  },
}

export default function OurStoryPage() {
  return (
    <>
      <ArticleJsonLd
        headline={OUR_STORY.hero.headline}
        description={OUR_STORY_DESCRIPTION}
        url={`${SITE.url}/our-story`}
        image={`https://picsum.photos/seed/110/1600/1000`}
        datePublished="2025-01-01"
      />

      {/* 1. Split Hero */}
      <SplitHero
        eyebrow={OUR_STORY.hero.eyebrow}
        headline={OUR_STORY.hero.headline}
        subheadline={OUR_STORY.hero.subheadline}
        imageSeed={110}
        imageAlt="The Mackay family"
      />

      {/* 2. Founding — Split Screen Parallax */}
      <SplitScreenParallax
        imageSeed={120}
        imageAlt="Rainforest edge near Tully farmland"
        imageLeft
      >
        <SectionHeader
          eyebrow={OUR_STORY.sectionLabels.founding.eyebrow}
          headline={OUR_STORY.sectionLabels.founding.headline}
        />
        <p className="font-body text-[16px] text-ink-mid leading-[1.75] mt-6">
          {OUR_STORY.founding}
        </p>
        <blockquote className="border-l-4 border-harvest-gold pl-5 my-6 font-body italic text-ink-mid text-[17px] leading-[1.6]">
          &ldquo;{OUR_STORY.foundingBlockquote}&rdquo;
        </blockquote>
        <p className="font-body text-[16px] text-ink-mid leading-[1.75]">
          {OUR_STORY.cyclone}
        </p>
      </SplitScreenParallax>

      {/* 3. Full Timeline */}
      <section className="py-24">
        <StickyTimeline items={TIMELINE_ITEMS} />
      </section>

      {/* 4. Family Tree */}
      <FamilyTree
        eyebrow={OUR_STORY.sectionLabels.familyTree.eyebrow}
        headline={OUR_STORY.sectionLabels.familyTree.headline}
        tree={OUR_STORY.familyTree}
        directors={PEOPLE_ENVIRONMENT.directors}
      />

      {/* 5. Pull Quote */}
      <PullQuoteSection
        quote={OUR_STORY.pullQuote.quote}
        attribution={OUR_STORY.pullQuote.attribution}
      />

      {/* 6. Values Triptych */}
      <ValuesTriptych values={OUR_STORY.values} />

      {/* 7. Future Vision */}
      <section className="py-24 px-10 max-w-2xl mx-auto text-center">
        <SectionHeader
          eyebrow={OUR_STORY.sectionLabels.futureVision.eyebrow}
          headline={OUR_STORY.sectionLabels.futureVision.headline}
          align="center"
        />
        <p className="font-body text-[17px] text-ink-mid leading-[1.75] mt-6 mb-10">
          {OUR_STORY.futureVision}
        </p>
        <Button
          variant="primary"
          size="lg"
          href={OUR_STORY.ctas.futureVision.href}
        >
          {OUR_STORY.ctas.futureVision.label}
        </Button>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import {
  GoldCalloutBand,
  KineticHero,
  LivingPhotoGrid,
  SplitScreenParallax,
} from '@/components/sections'
import {
  DirectorsGrid,
  EnvironmentTabs,
} from '@/components/people-environment'
import { PEOPLE_ENVIRONMENT } from '@/content'

const PEOPLE_DESCRIPTION =
  "The 550+ people behind Australia's largest banana operation. Biosecurity, carbon commitments, IQF zero-waste processing, and community partnerships."

export const metadata: Metadata = {
  title: 'People & Environment',
  description: PEOPLE_DESCRIPTION,
  alternates: { canonical: '/people-and-environment' },
  openGraph: {
    type: 'website',
    title: 'People & Environment | Mackays',
    description: PEOPLE_DESCRIPTION,
    url: '/people-and-environment',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'People & Environment | Mackays',
    description: PEOPLE_DESCRIPTION,
  },
}

export default function PeopleAndEnvironmentPage() {
  const {
    hero,
    ourPeople,
    ourPeopleImage,
    directors,
    boardNote,
    fourthGenStatement,
    fourthGenCta,
    sectionLabels,
    environment,
    community,
    lifePhotoGrid,
  } = PEOPLE_ENVIRONMENT

  return (
    <>
      {/* 1. Hero */}
      <KineticHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        subheadline={hero.subheadline}
        ctaPrimary={hero.ctaPrimary}
        imageSeed={100}
        imageAlt="Mackays team at work in Tully"
      />

      {/* 2. Our People — SplitScreenParallax */}
      <SplitScreenParallax
        imageSeed={ourPeopleImage.seed}
        imageAlt={ourPeopleImage.alt}
        imageLeft
      >
        <SectionHeader
          eyebrow={ourPeople.eyebrow}
          headline={ourPeople.headline}
        />
        <p className="font-body text-[16px] text-ink-mid leading-[1.75] mt-6">
          {ourPeople.body1}
        </p>
        <p className="font-body text-[16px] text-ink-mid leading-[1.75] mt-4">
          {ourPeople.body2}
        </p>
      </SplitScreenParallax>

      {/* 3. Directors grid */}
      <DirectorsGrid
        eyebrow={sectionLabels.leadership.eyebrow}
        headline={sectionLabels.leadership.headline}
        directors={directors}
        boardNote={boardNote}
      />

      {/* 4. Fourth Generation statement */}
      <section className="py-24 px-10 max-w-3xl mx-auto text-center">
        <div
          aria-hidden
          className="w-16 h-[3px] bg-harvest-gold mx-auto mb-10"
        />
        <p className="font-body italic text-[22px] text-ink-mid leading-[1.8]">
          {fourthGenStatement}
        </p>
        <div className="mt-8">
          <Button variant="ghost-link" href={fourthGenCta.href}>
            {fourthGenCta.label} →
          </Button>
        </div>
      </section>

      {/* 5. Environment tabs */}
      <section className="max-w-7xl mx-auto px-10 py-24">
        <SectionHeader
          eyebrow={environment.eyebrow}
          headline={environment.headline}
        />
        <EnvironmentTabs content={environment} />
      </section>

      {/* 6. Life at Mackays photo grid */}
      <section className="py-24">
        <LivingPhotoGrid
          seeds={lifePhotoGrid.map((item) => item.seed)}
          captions={lifePhotoGrid.map((item) => item.caption)}
        />
      </section>

      {/* 7. Foodbank band */}
      <GoldCalloutBand
        eyebrow={community.eyebrow}
        headline={community.headline}
        body={community.foodbankBody}
        cta={community.cta}
      />
    </>
  )
}

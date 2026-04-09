import type { Metadata } from 'next'
import { SectionHeader } from '@/components/ui/SectionHeader'
import {
  GoldCalloutBand,
  KineticHero,
} from '@/components/sections'
import {
  OpportunitiesAccordion,
  RoleCategories,
  WhyMackaysPillars,
} from '@/components/work-with-us'
import { WORK_WITH_US } from '@/content'

export const metadata: Metadata = {
  title: 'Work With Us | Mackays — Careers in Far North Queensland Farming',
  description:
    "Roles across farming, packing, IQF, logistics, maintenance and office operations at Australia's largest banana grower. Year-round work, local hire, real training.",
}

export default function WorkWithUsPage() {
  const {
    hero,
    sectionLabels,
    pillars,
    roles,
    roleCtaLabel,
    opportunities,
    opportunityApplyLabel,
    alwaysRecruiting,
  } = WORK_WITH_US

  return (
    <>
      {/* 1. Hero */}
      <KineticHero
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        subheadline={hero.subheadline}
        ctaPrimary={hero.ctaPrimary}
        imageSeed={30}
        imageAlt="Mackays team at work in Tully"
      />

      {/* 2. Why Mackays */}
      <WhyMackaysPillars
        eyebrow={sectionLabels.whyMackays.eyebrow}
        headline={sectionLabels.whyMackays.headline}
        pillars={pillars}
      />

      {/* 3. Role Categories */}
      <RoleCategories
        eyebrow={sectionLabels.roleCategories.eyebrow}
        headline={sectionLabels.roleCategories.headline}
        roles={roles}
        ctaLabel={roleCtaLabel}
      />

      {/* 4. Current Opportunities */}
      <section className="max-w-7xl mx-auto px-10 py-24 border-t border-parchment-deep">
        <SectionHeader
          eyebrow={sectionLabels.currentOpportunities.eyebrow}
          headline={sectionLabels.currentOpportunities.headline}
        />
        <OpportunitiesAccordion
          opportunities={opportunities}
          applyLabel={opportunityApplyLabel}
        />
      </section>

      {/* 5. Always Recruiting */}
      <GoldCalloutBand
        eyebrow={alwaysRecruiting.eyebrow}
        headline={alwaysRecruiting.headline}
        body={alwaysRecruiting.body}
        cta={alwaysRecruiting.cta}
      />
    </>
  )
}

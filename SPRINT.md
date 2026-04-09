# Sprint: Phase 6 — People & Environment
Date: 2026-04-10

## Scope
Build `app/people-and-environment/page.tsx` composed of seven sections.
Create one new section component (`EnvironmentTabs`, Radix `Tabs.Root`).
Extend `PEOPLE_ENVIRONMENT` content with section labels, environment tab
labels, biosecurity badge, water stats, carbon footnote, IQF stat,
life-photo grid, foodbank callout and the fourth-generation CTA so the
page has zero inline strings.

## Acceptance Criteria
- [ ] `app/people-and-environment/page.tsx` renders 7 sections in order (KineticHero → SplitScreenParallax → Directors grid → Fourth-Generation statement → Environment Tabs → LivingPhotoGrid → Foodbank GoldCalloutBand)
- [ ] Hero headline uses the `|` delimiter — "550 people. Three regions.|One standard — theirs." renders with the second line in Lora italic harvest-gold via the existing KineticHero support
- [ ] Directors grid: row 1 three cards (Gavin/Barrie/Stephen), row 2 two centred cards (Cameron/Daniel), each with a round 80px portrait, hover translate + shadow, names coloured crimson on hover
- [ ] Fourth-Generation statement: centred, harvest-gold HR above, italic body, ghost-link CTA "Join the team"
- [ ] `EnvironmentTabs` client component built on Radix `Tabs.Root`, four tabs (Biosecurity / Water / Carbon / Zero Waste) with content panels rendered from `PEOPLE_ENVIRONMENT.environment`
- [ ] Water tab shows two `StatCounter`s (8,830 ML + 2,000 ML) with proper suffixes
- [ ] Carbon tab shows a harvest-gold shimmer progress bar + footnote
- [ ] Zero Waste tab shows an image + body + a `StatCounter` (50+ IQF jobs)
- [ ] `LivingPhotoGrid` with 8 captioned images sourced from `PEOPLE_ENVIRONMENT.lifePhotoGrid`
- [ ] `GoldCalloutBand` with the Foodbank Queensland headline and external CTA to the partnership page
- [ ] `shimmer` keyframe added to `tailwind.config.ts`
- [ ] Metadata set per brief
- [ ] `pnpm tsc --noEmit` passes
- [ ] `pnpm build` passes with `/people-and-environment` prerendered as static

## Definition of Done
Committed on main. HANDOFF.md updated with Phase 7 kickoff (Work With Us, Media, Contact).

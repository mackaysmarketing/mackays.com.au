# Sprint: Phase 2 — Content Layer + Component Library
Date: 2026-04-10

## Scope
All site copy as typed TypeScript constants in src/content/. All UI primitives.
All 10 named section components. No full pages yet.

## Acceptance Criteria
- [ ] src/content/index.ts exports HOME, OUR_STORY, PRODUCE, PEOPLE_ENVIRONMENT, WORK_WITH_US, MEDIA, CONTACT, SITE, FARM_MARKERS
- [ ] src/content/produce.ts exports CROP_SLUGS and per-crop data
- [ ] src/content/timeline.ts exports all 25 TIMELINE_ITEMS
- [ ] All UI primitives exist: Button, SectionHeader, StatCounter, ImagePlaceholder, Badge
- [ ] All section components exist and compile: KineticHero, FloatStatBand, HorizontalProduceTape, StickyTimeline, SplitScreenParallax, LivingPhotoGrid, MarqueeBand, PullQuoteSection, QldFarmMap, GoldCalloutBand
- [ ] pnpm tsc --noEmit passes

## Definition of Done
All files committed. HANDOFF.md updated. Ready for evaluator review.

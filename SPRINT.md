# Sprint: Phase 3 — Home Page
Date: 2026-04-10

## Scope
Build app/page.tsx — the home page — by composing the 10 Phase 2 section
components with copy imported from src/content. Zero inline strings.
No new pages or components except the two small home-only wrappers for
(a) the brand statement GSAP reveal and (b) the sustainability band layout.

## Acceptance Criteria
- [ ] app/page.tsx imports every copy string from @/content (no inline text)
- [ ] Section order: KineticHero → FloatStatBand → BrandStatement → HorizontalProduceTape → StickyTimeline (abbreviated) → QldFarmMap → PullQuoteSection → SustainabilityBand → LivingPhotoGrid → MarqueeBand
- [ ] Brand statement: two-column, GSAP scroll reveal on image (x 60→0, opacity 0→1, once:true)
- [ ] Sustainability band: bg-ink full-width, SectionHeader tone="parchment", four pillars with Shield/Recycle/Leaf/Heart icons
- [ ] FloatStatBand renders 1945 (no comma), 5,800+, 550+, 13%
- [ ] Metadata: correct title + description per brief
- [ ] pnpm tsc --noEmit passes
- [ ] pnpm build passes

## Definition of Done
Committed on main. HANDOFF.md updated for Phase 4 handoff.

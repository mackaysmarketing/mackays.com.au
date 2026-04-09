# Sprint: Phase 4 — Our Story Page
Date: 2026-04-10

## Scope
Build `app/our-story/page.tsx` composed of seven sections. Create two new
section components (`FamilyTree`, `ValuesTriptych`) and a page-local
`SplitHero` client component. Extend `OUR_STORY` content with section
labels, values, family-tree labels, founding blockquote, and future-vision
CTA so the page has zero inline strings.

## Acceptance Criteria
- [ ] `app/our-story/page.tsx` renders 7 sections in order (SplitHero → founding SplitScreenParallax → full StickyTimeline → FamilyTree → PullQuoteSection → ValuesTriptych → Future Vision)
- [ ] `src/components/sections/FamilyTree.tsx` renders 4 generations (Gen 1 Stanley+Agnes, Gen 2 John+Robert, Gen 3 five directors, Gen 4 italic caption) with visible connectors
- [ ] `src/components/sections/ValuesTriptych.tsx` renders 3 panels with border-top crimson / harvest-gold / sage-field and oversized bg numbers
- [ ] `src/components/our-story/SplitHero.tsx` renders full 100svh 50/50 split with GSAP right-panel x:80→0 opacity 0→1 on load, reduced-motion guarded
- [ ] `OUR_STORY` content gains: `foundingBlockquote`, `sectionLabels`, `familyTree`, `values`, `ctas.futureVision`
- [ ] Timeline renders all 25 `TIMELINE_ITEMS` (not abbreviated) with decade-assigned image seeds
- [ ] Metadata: correct Our Story title + description
- [ ] `pnpm tsc --noEmit` passes
- [ ] `pnpm build` passes

## Definition of Done
Committed on main. HANDOFF.md updated with Phase 5 kickoff (our-produce overview + 6 crop pages).

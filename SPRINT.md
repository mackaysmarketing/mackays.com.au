# Sprint: Phase 5 — Our Produce (overview + 6 crop pages)
Date: 2026-04-10

## Scope
Build `app/our-produce/page.tsx` (overview) and
`app/our-produce/[crop]/page.tsx` (dynamic crop template rendering 6
static routes). Create two new section components (`BentoProduceGrid`,
`SupplyChainExplainer`). Extend `PRODUCE` content with section labels,
bento items, supply-chain steps, IQF band copy, trade CTA copy, and all
crop-page labels.

## Acceptance Criteria
- [ ] `app/our-produce/page.tsx` renders: KineticHero (3-line headline) → BentoProduceGrid → SupplyChainExplainer → SplitScreenParallax (Smart Banana) → IQF ink band → Trade CTA
- [ ] `app/our-produce/[crop]/page.tsx` with `generateStaticParams()` over `CROP_SLUGS` and `notFound()` guard; 6 static crop routes
- [ ] Each crop page renders: Hero (70vh) → SplitScreenParallax story → Growing conditions (4 cards with Lucide icons) → Varieties (if present) → PullQuoteSection → Related produce (3 other crops) → GoldCalloutBand trade callout
- [ ] `src/components/sections/BentoProduceGrid.tsx` — 5-col CSS grid bento with Bananas `col-span-3 row-span-2`, two 2-col cards on the right, then Sugar Cane / Cattle (2/2) / Passionfruit (1) across the bottom. Mobile single-column. GSAP stagger fade-up.
- [ ] `src/components/sections/SupplyChainExplainer.tsx` — 3 steps with Lucide icons in circles, ScrollTrigger scaleX connectors (desktop only)
- [ ] `KineticHero` supports multi-line headlines via `\n`
- [ ] Every string sourced from `@/content` — no inline copy on any of the 7 new pages
- [ ] Per-crop metadata: `${crop.name} | Mackays — Far North Queensland`
- [ ] `pnpm tsc --noEmit` passes
- [ ] `pnpm build` passes with 6 crop routes prerendered statically

## Definition of Done
Committed on main. HANDOFF.md updated with Phase 6 kickoff (People & Environment).

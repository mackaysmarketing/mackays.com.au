# Handoff: Phase 3 — Home Page
Date: 2026-04-10
Session type: Build

## What was completed

### Home page — `app/page.tsx`
Server component that composes the 10-section home page entirely from the
Phase 2 component library, reading every string from `@/content`. The page
is statically prerendered at build time.

Section order:
1. **KineticHero** — `HOME.hero` eyebrow/headline/subheadline/CTAs, seed 90
2. **FloatStatBand** — `HOME.stats` (1945, 5,800+, 550+, 13%)
3. **BrandStatement** — two-column, GSAP scroll reveal on the image
4. **HorizontalProduceTape** — 6 slides mapped from `HOME.produceTape` × `PRODUCE_DATA`
5. **StickyTimeline (abbreviated)** — `TIMELINE_ITEMS.slice(0, 6)` + "Full history" ghost-link
6. **QldFarmMap** — `FARM_MARKERS` with eyebrow/headline/subheadline wrapper
7. **PullQuoteSection** — `HOME.pullQuote`
8. **SustainabilityBand** — ink background, four-pillar grid, Lucide icons
9. **LivingPhotoGrid** — 8-image set with captions from `HOME.lifePhotoGrid`
10. **MarqueeBand**

Metadata:
- title: `Mackays | Australia's Leading Tropical Produce Grower | Far North Queensland`
- description: `Fourth-generation family farming from Tully, Far North Queensland. Bananas, papaya, avocados, cane, cattle and passionfruit supplied to Coles, Woolworths and ALDI.`

### New home-only components (`src/components/home/`)
- **BrandStatement.tsx** — client component. Two-column layout (SectionHeader + body + ghost-link CTA on the left, image on the right). GSAP `useGSAP` scoped to the container, ScrollTrigger with `once: true`, `x: 60 → 0`, `opacity: 0 → 1`, `power2.out`. Guards on `prefers-reduced-motion` (sets the image to its final state without animating).
- **SustainabilityBand.tsx** — server component. Ink background, `SectionHeader tone="parchment"`, four-column grid. Uses a typed `ICON_MAP` to resolve the string icon names in `HOME.sustainability.pillars` to Lucide components (`Shield`, `Recycle`, `Leaf`, `Heart`). `ICON_COLOR_CLASS` and `HEADING_COLOR_CLASS` maps translate the content-defined colour tokens (`crimson` / `harvest-gold` / `sage-light` / `sage-field`) into Tailwind classes, so the content layer stays data-only and the presentation stays in the component.
- **index.ts** barrel.

### Content layer extensions
- **`HomeContent`** now includes:
  - `produceTape: HomeProduceTapeSlide[]` — per-crop `{ slug, seed, stat, href }` so the home page's short-form crop statistics live in content, not inline in the page
  - `sectionLabels` — eyebrow/headline pairs for the Produce Tape, Story, Life at Mackays sections plus the "Full history" CTA label, so the home page has zero inline strings
  - `lifePhotoGrid: HomePhotoGridItem[]` — 8 `{ seed, caption }` pairs for the LivingPhotoGrid, replacing what was previously inline
- **`StatItem.separator?: string`** — optional thousands separator (defaults to `,`). The 1945 year stat now passes `separator: ''` so it renders as `1945`, not `1,945`.

### Primitive + section changes to support the above
- **`StatCounter.tsx`** — accepts `separator?: string`, default `,`, threaded to `react-countup`. Reduced-motion path also respects the separator (empty string → plain `String(value)`, otherwise `toLocaleString('en-AU')`).
- **`FloatStatBand.tsx`** — threads `stat.separator` through to `StatCounter`.

## Quality gates
- `pnpm tsc --noEmit` — clean (exit 0)
- `pnpm build` — clean; home page (`/`) statically prerendered alongside `/_not-found`
- No inline text strings anywhere in `app/page.tsx` — every visible bit of copy is read from `@/content`
- No hardcoded hex in `src/components/home/` — all colours flow through Tailwind tokens
- `prefers-reduced-motion` honoured in BrandStatement (GSAP) and inherited automatically in every Phase 2 section already guarded in Phase 2

## Known notes / decisions
- **Section header wrappers** — the Phase 3 prompt puts each `SectionHeader` directly above its adjacent section component. I wrap them together in a local `<section>` with consistent vertical padding (`py-24`) so the rhythm across the page is even; headers inside those wrappers sit in a `max-w-7xl mx-auto px-10` container and the carousel/map/grid that follow extend past that container to take the full page width. This matches the original Parchment system's editorial rhythm.
- **Produce tape stats kept in `HOME`**, not `PRODUCE_DATA`. Rationale: the short-form stat lines ("13% of national supply", "Ruby Rise & Red Hill", …) are home-page-specific framing, not canonical crop facts. Putting them on `PRODUCE_DATA` would conflate page-level copy with crop-level data, and Phase 5 will want its own longer `CropData.stats` array on the crop pages (already in place from Phase 2).
- **Section labels kept in `HOME.sectionLabels`**, not fabricated as inline strings — preserves the "zero inline strings" rule even for small eyebrow/headline pairs.
- **Icon colour tokens** are typed as a string union on `SustainabilityPillar` in `types.ts` and resolved to Tailwind classes at render time in `SustainabilityBand`. Keeps content free of presentation details while still type-safe.
- **Page is a server component** (`app/page.tsx`). Only the dynamic/interactive bits (`KineticHero`, `BrandStatement`, `HorizontalProduceTape`, `StickyTimeline`, `LivingPhotoGrid`, `MarqueeBand`, `QldFarmMap`) are client components, loaded individually. `SustainabilityBand`, `SectionHeader`, `Button` and `PullQuoteSection` remain server components.

## What is NOT done
- `/our-story` (Phase 4)
- `/our-produce` and the six crop pages (Phase 5)
- `/people-and-environment` (Phase 6)
- `/work-with-us`, `/media`, `/contact`, the contact API route and MDX press releases (Phase 7)
- Animation polish pass (Phase 8)
- Performance / SEO / accessibility audit + deploy (Phase 9)
- The placeholder homepage with the Phase 1 text is now replaced — nothing to clean up

## Exact next step
Begin **Phase 4** — `app/our-story/page.tsx`. Import `OUR_STORY` and `TIMELINE_ITEMS` from `@/content`, and compose in this order:

1. **Split Hero** (bespoke to this page) — full 100svh, two columns desktop / stacked mobile. Left: `ImagePlaceholder fill seed={110}`. Right: `bg-parchment-warm` centred vertical, with eyebrow + large headline from `OUR_STORY.hero`. GSAP on load: right panel `x: 80 → 0`, `opacity: 0 → 1`, `0.8s ease-out`, guarded on `prefers-reduced-motion`.
2. `<SplitScreenParallax imageSeed={120} imageAlt="Rainforest edge near farmland" imageLeft>` with `SectionHeader eyebrow="1945" headline="Hand-cleared. Hand-built."` + `OUR_STORY.founding` + harvest-gold blockquote ("When something breaks, the family builds it back stronger.") + `OUR_STORY.cyclone`.
3. `<StickyTimeline items={TIMELINE_ITEMS} />` — full 25-item timeline.
4. **FamilyTree** — new component at `src/components/sections/FamilyTree.tsx`. Gen 1 Stanley/Agnes → Gen 2 John/Robert → Gen 3 five directors (crimson names) → Gen 4 single wide "fourth generation active across all divisions" cell. Connectors via Tailwind borders.
5. `<PullQuoteSection quote={OUR_STORY.pullQuote.quote} attribution={OUR_STORY.pullQuote.attribution} />`
6. **ValuesTriptych** — new component at `src/components/sections/ValuesTriptych.tsx`. Three panels (`bg-parchment-warm rounded-xl p-10`), `border-t-[3px]` in crimson/harvest-gold/sage-field, oversized BG number (`text-ink/5`), heading, body. Add `OUR_STORY.values: [{number, heading, body, accent}, …]` to `types.ts` + `our-story.ts`.
7. **Future Vision** section — centred, `SectionHeader align="center"`, `OUR_STORY.futureVision`, `<Button variant="primary" href="/work-with-us">Work with us</Button>`.

Metadata:
- title: `Our Story | Mackays — 80 Years of Family Farming in Far North Queensland`
- description: `From one hand-cleared block in 1945 to 5,800 hectares across three growing regions. The story of Australia's largest banana-growing family.`

Before building: run the evaluator on the current state (Phases 1–3 committed) if the evaluator loop is in use.

## Files added this phase
- `src/components/home/BrandStatement.tsx`
- `src/components/home/SustainabilityBand.tsx`
- `src/components/home/index.ts`

## Files modified this phase
- `SPRINT.md` (rewritten for Phase 3)
- `HANDOFF.md` (this file)
- `app/page.tsx` (replaces the Phase 1 placeholder)
- `src/content/home.ts` (added `produceTape`, `sectionLabels`, `lifePhotoGrid`; added `separator: ''` on the 1945 stat)
- `src/content/types.ts` (extended `HomeContent`; added `StatItem.separator`; new interfaces `HomeProduceTapeSlide`, `HomeSectionLabels`, `HomePhotoGridItem`)
- `src/components/ui/StatCounter.tsx` (accepts `separator` prop)
- `src/components/sections/FloatStatBand.tsx` (threads `stat.separator`)

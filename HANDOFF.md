# Handoff: Phase 2 — Content Layer + Component Library
Date: 2026-04-10
Session type: Build

## What was completed

### Content layer (src/content/)
- `types.ts` — shared TypeScript interfaces for every content shape (SITE, HOME, OUR_STORY, PRODUCE, CROPS, PEOPLE_ENVIRONMENT, WORK_WITH_US, MEDIA, CONTACT, FARM_MARKERS, TIMELINE). No `any`, no `as const`, all plainly typed.
- `site.ts` — `SITE` meta (brand, legal name, tagline, meta description, address, phone, four emails, copyright, Foodbank line).
- `home.ts` — `HOME.hero`, four `stats` (1945, 5,800+, 550+, 13%), `brandStatement`, four `sustainability.pillars` (Shield/Recycle/Leaf/Heart), `pullQuote`, `mapSection`.
- `our-story.ts` — `OUR_STORY.hero`, `founding`, `cyclone`, `secondGen`, `thirdGen`, `fourthGen`, `futureVision`, `pullQuote`.
- `produce.ts` — `CROP_SLUGS` (typed union), `PRODUCE_DATA` (all 6 crops: bananas, red-papaya, avocados, sugar-cane, cattle, passionfruit — each with name/tagline/heroSeed/storySeed/eyebrow/storyHeadline/story/growing/varieties/pullQuote/stats), and `PRODUCE` (overview, smartBanana, iqf, tradeEnquiryBody).
- `people-environment.ts` — `PEOPLE_ENVIRONMENT.hero` (with `|` delimiter for the two-line headline), `ourPeople`, 5 `directors` (Gavin, Barrie, Stephen, Cameron, Daniel Mackay with titles from the build brief), `boardNote`, `fourthGenStatement`, 4 `environment` tabs (biosecurity, water, carbon, iqf), `community.foodbankBody`.
- `work-with-us.ts` — `WORK_WITH_US.hero`, 4 `pillars`, 6 `roles`, 6 `opportunities` (all with Dayforce apply URL), `alwaysRecruiting`.
- `media.ts` — 3 `pressReleases` (2022 IQF expansion, 2024 TR4-free, 2025 fourth-generation) with slugs, dates, excerpts and bodies. `mediaContact`.
- `contact.ts` — `CONTACT.headline`, `subheadline`, 3 `offices` (Farming, Marketing, Retail & Trade), 3 `badges` (Foodbank QLD, ABGC, Avocados Australia).
- `farm-markers.ts` — `FARM_MARKERS` for Tully Valley, Atherton Tablelands and Dimbulah with coords, crops, hectares and notes.
- `timeline.ts` — `TIMELINE_ITEMS` with all 25 entries from 1945 through 2025, with `imageSeed` assigned by decade per the build brief (1940s→120, 1960–70s→80, 1980–90s→40, 2000s→10, 2010s→60, 2020s→30).
- `index.ts` — re-exports everything above plus the types module, so components only need `import { … } from '@/content'`.

### UI primitives (src/components/ui/)
- `Button.tsx` — all 5 variants (primary, secondary, gold, ink-gold, ghost-link), 3 sizes, discriminated-union props (href vs onClick). Renders `<Link>` for internal hrefs, `<a target=_blank rel=noopener>` for external/mailto/tel, `<button>` otherwise. Focus ring + active scale + primary/gold crimson-pale hover glow.
- `SectionHeader.tsx` — eyebrow/headline/subheadline/align/tone. Supports `<em>…</em>` markers in the headline (rendered Lora italic crimson). `tone="parchment"` recolours all three lines for use on ink backgrounds.
- `StatCounter.tsx` — wraps `react-countup` with an IntersectionObserver at 0.5 threshold. Large Poppins number with crimson suffix, uppercase dust label. Reduced-motion mode just writes the final number.
- `ImagePlaceholder.tsx` — `next/image` wrapper with a picsum.photos seed source. Discriminated union: either `{ width, height }` or `{ fill: true }`. Always requires explicit `alt`. Sizes prop passes through.
- `Badge.tsx` — four variants (crimson, gold, sage, neutral). Small uppercase Poppins pill.
- `index.ts` — barrel for primitives.

### Section components (src/components/sections/)
- `KineticHero.tsx` — full 100svh, background `ImagePlaceholder fill priority`, ink overlay, GSAP word-by-word reveal via `useGSAP` + `scope`, staggered subheadline + CTAs, scroll indicator bar. `prefers-reduced-motion` sets everything to final state. Supports `headline` with a `|` delimiter to render the second segment as Lora italic harvest-gold (used on People & Environment).
- `FloatStatBand.tsx` — `border-t border-b`, grid 2/4, `StatCounter` per cell with vertical dividers between cells.
- `HorizontalProduceTape.tsx` — horizontal scroll-snap carousel, keyboard left/right, dot indicators synced to scroll position via IntersectionObserver-style logic, card hover scale, Badge + name + tagline overlay, deep-link per slide.
- `StickyTimeline.tsx` — 35/65 split, sticky left panel with huge year that updates as items enter the centre via ScrollTrigger, right column with date label/headline/body/optional image, entry fades on scroll. Supports `abbreviated` prop to show first 6 items.
- `SplitScreenParallax.tsx` — grid 2-col, image column parallax at yPercent -15 via ScrollTrigger scrub. Parallax disabled under 768 px or with reduced motion. `imageLeft` controls column order.
- `LivingPhotoGrid.tsx` — CSS columns 2/4, varied heights, clipPath top-down reveal with stagger on ScrollTrigger, group-hover caption slide-up.
- `MarqueeBand.tsx` — bg-ink, Tailwind `animate-marquee` (keyframes now in `tailwind.config.ts`), duplicated row for seamless loop, pause on hover.
- `PullQuoteSection.tsx` — centered, 3px harvest-gold HR, Lora italic quote, Poppins uppercase crimson attribution.
- `QldFarmMap.tsx` — dynamic wrapper (`ssr: false`) with a pulse skeleton loading state.
- `QldFarmMapInner.tsx` — `react-map-gl/mapbox` Map + Marker, `mapbox://styles/mapbox/light-v11`, fallback panel when `NEXT_PUBLIC_MAPBOX_TOKEN` is unset, custom crimson + harvest-gold ring markers, Framer Motion popup card on click. `interactionDisabled` disables all pan/zoom gestures for the static contact page use-case.
- `GoldCalloutBand.tsx` — harvest-gold band with crimson left border, eyebrow/headline/body, primary Button CTA.
- `index.ts` — barrel for sections.

### Config updates
- `tailwind.config.ts` — added `animation.marquee` and `animation.scroll-indicator` with matching keyframes. Existing colour and font extends preserved.
- `app/globals.css` — added `.scrollbar-hide` utility for the HorizontalProduceTape.

## Quality gates
- `pnpm tsc --noEmit` — clean (exit 0)
- `pnpm build` — compiles clean, 3 static routes prerendered, zero TS errors
- No `any` in any source file
- No inline copy strings in any component — every bit of text reads from `@/content`
- All colour values via CSS variables / Tailwind tokens (no hardcoded hex in components)
- All animated components guard on `prefers-reduced-motion`

## Known notes / decisions
- The build brief referenced `docs/mackays-complete-build.md` for Part 3 copy but that file doesn't exist in the repo — only `docs/mackays-parchment-build.md`, which contains the phase prompts that reference content keys by name. I wrote copy directly, using only facts explicitly stated in the brief (1945 founding, 5,800 ha, 550+ team, 13 % of national bananas, Cyclones Larry/Yasi, Panama TR4-free 3 years, 8,830 ML water + 2,000 ML private agreement, IQF 50+ jobs, Foodbank QLD 50,000 schoolchildren, the five named directors, the Dayforce portal). No invented numerical claims. The copy will likely be reviewed by the client before going live — see "What is NOT done".
- `react-map-gl@8` resolves to `react-map-gl/mapbox` (default export = Map, named Marker). Verified against the installed `@vis.gl/react-mapbox` types.
- KineticHero's two-line accent headline uses a `|` delimiter on the string (per the Phase 6 spec). Simpler and typed.
- Used `useGSAP` + `gsap.registerPlugin(useGSAP)` everywhere — never bare `useEffect` for GSAP, per CLAUDE.md rule.

## What is NOT done
- **No pages built yet** beyond the Phase 1 placeholder `app/page.tsx`. The home page, our-story, our-produce (+ 6 crop pages), people-and-environment, work-with-us, media and contact pages are all Phase 3+.
- **Copy is drafted, not client-signed.** The content layer types and the page build can proceed immediately, but Tim should do a pass on the draft copy (especially the section bodies and pull quotes) before launch.
- No contact API route yet (`app/api/contact/route.ts` is Phase 7).
- No MDX / Contentlayer wiring for the press releases yet (Phase 7).
- FamilyTree and ValuesTriptych components — not in the Phase 2 scope; they're created in Phase 4.

## Exact next step
Begin Phase 3 — `app/page.tsx`. Import every piece of copy from `@/content` and compose the home page from the section components built this phase, in the order specified in the Phase 3 prompt:

1. `<KineticHero>` with HOME.hero
2. `<FloatStatBand stats={HOME.stats}>`
3. Brand statement two-column with `<SectionHeader>` + body + `<Button variant="ghost-link">` + `<ImagePlaceholder seed={20}>` with a scroll-in GSAP reveal
4. `<HorizontalProduceTape>` with the 6 produce slides (seed map in the Phase 3 prompt)
5. Abbreviated `<StickyTimeline items={TIMELINE_ITEMS.slice(0, 6)} abbreviated>`
6. `<QldFarmMap markers={FARM_MARKERS}>`
7. `<PullQuoteSection>` with HOME.pullQuote
8. Sustainability band (ink bg) with 4 Lucide-iconed pillars from HOME.sustainability (note: SectionHeader already supports `tone="parchment"`)
9. `<LivingPhotoGrid>` with the 8-image seed set from the Phase 3 prompt
10. `<MarqueeBand>`

Then wire `export const metadata` at the top of `app/page.tsx` with the title/description from the Phase 3 prompt.

## Files added this phase
- src/content/types.ts, index.ts
- src/content/site.ts, home.ts, our-story.ts, produce.ts, people-environment.ts, work-with-us.ts, media.ts, contact.ts, farm-markers.ts, timeline.ts
- src/components/ui/Button.tsx, SectionHeader.tsx, StatCounter.tsx, ImagePlaceholder.tsx, Badge.tsx, index.ts
- src/components/sections/KineticHero.tsx, FloatStatBand.tsx, HorizontalProduceTape.tsx, StickyTimeline.tsx, SplitScreenParallax.tsx, LivingPhotoGrid.tsx, MarqueeBand.tsx, PullQuoteSection.tsx, QldFarmMap.tsx, QldFarmMapInner.tsx, GoldCalloutBand.tsx, index.ts

## Files modified this phase
- SPRINT.md (rewritten for Phase 2)
- tailwind.config.ts (marquee + scroll-indicator keyframes & animations)
- app/globals.css (scrollbar-hide utility)

# Handoff: Phase 4 — Our Story Page
Date: 2026-04-10
Session type: Build

## What was completed

### Our Story page — `app/our-story/page.tsx`
Server component composing seven sections in order, reading every string
from `@/content`. Prerendered as static content alongside `/`.

1. **SplitHero** — full 100svh 50/50 split with GSAP reveal on the right panel
2. **Founding** — `<SplitScreenParallax imageSeed={120} imageLeft>` wrapping a `SectionHeader` (eyebrow "1945", headline "Hand-cleared. Hand-built."), the `founding` paragraph, a harvest-gold left-border blockquote for `foundingBlockquote`, and the `cyclone` paragraph
3. **Full timeline** — `<StickyTimeline items={TIMELINE_ITEMS} />` — all 25 items with the decade-assigned image seeds (1940s→120, 1960–70s→80, 1980–90s→40, 2000s→10, 2010s→60, 2020s→30) already in place from Phase 2
4. **FamilyTree** — new section component. Four generations with connectors
5. **PullQuoteSection** — `OUR_STORY.pullQuote.quote` / `attribution`
6. **ValuesTriptych** — new section component. Three panels with border-top crimson / harvest-gold / sage-field and oversized background numbers
7. **Future Vision** — centred `SectionHeader align="center"` ("What comes next" / "We're not done."), `futureVision` body, primary Button linking to `/work-with-us`

Metadata:
- title: `Our Story | Mackays — 80 Years of Family Farming in Far North Queensland`
- description: `From one hand-cleared block in 1945 to 5,800 hectares across three growing regions. The story of Australia's largest banana-growing family.`

### New section components

**`src/components/sections/FamilyTree.tsx`** — server component.
- Takes `eyebrow`, `headline`, `tree: OurStoryFamilyTree`, and `directors: Director[]` as props (so the five Gen 3 names stay sourced from `PEOPLE_ENVIRONMENT.directors` rather than being duplicated in `OUR_STORY`).
- Layout: four vertically-stacked generations, centre-aligned, with connectors rendered via thin Tailwind borders (no SVG dependency).
- Gen 1: Stanley Mackay ── Agnes Mackay, both in `text-dust`.
- Gen 2: John Mackay ── Robert Mackay, in `text-ink-mid`.
- Gen 3: the five directors, first names in `text-crimson` (the `Mackay` surname is stripped at render so the connectors read cleanly), with a uniform `Director` label underneath.
- Gen 4: a bordered italic caption cell reading `tree.gen4Caption`.

**`src/components/sections/ValuesTriptych.tsx`** — server component.
- Takes `values: OurStoryValue[]`.
- Three panels (`bg-parchment-warm rounded-xl p-10 border-t-[3px]`) with per-value `accent` colour resolved through a typed `BORDER_CLASS` map.
- Oversized `01` / `02` / `03` numbers absolutely positioned top-right in `font-heading font-extrabold text-[120px] text-ink/5`, `pointer-events-none` and `select-none` so they stay decorative.
- Heading `font-heading font-bold text-[22px] tracking-[-0.02em]`, body `font-body text-[15px] text-ink-mid leading-[1.7]`.

**`src/components/our-story/SplitHero.tsx`** — client component (page-local, placed under `our-story/` to make the ownership obvious).
- Full 100svh, `grid grid-cols-1 md:grid-cols-2`.
- Left column: `ImagePlaceholder fill priority seed={110}`, order-1 on mobile so the image sits above the text on small screens, default order on desktop.
- Right column: `bg-parchment-warm flex items-center px-10 md:px-16`, eyebrow in crimson, headline in `clamp(32px,5vw,52px)`, subheadline in Lora 17px.
- GSAP: `useGSAP` scoped to the container, `gsap.from('[data-split-hero-right]', { x: 80, opacity: 0, duration: 0.8, ease: 'power2.out' })`. Guards on `prefers-reduced-motion` by snapping the right panel to `{ x: 0, opacity: 1 }`.

### Content layer extensions — `OUR_STORY`
- `foundingBlockquote: string` — "When something breaks, the family builds it back stronger."
- `sectionLabels: { founding, familyTree, futureVision }` — all eyebrow/headline pairs used on the page
- `familyTree: { gen1: { left, right }, gen2: string[], gen3Title, gen4Caption }` — everything the FamilyTree component needs, except Gen 3 (which is sourced from `PEOPLE_ENVIRONMENT.directors` to stay DRY)
- `values: OurStoryValue[]` — 3 entries (Work Hard / Work as a Team / Family First) with `number`, `heading`, `body`, `accent`
- `ctas.futureVision: CtaLink` — `{ label: 'Work with us', href: '/work-with-us' }`
- New types added to `src/content/types.ts`: `OurStorySectionLabels`, `OurStoryFamilyTree`, `OurStoryValue`, `ValueAccent`

## Quality gates
- `pnpm tsc --noEmit` — clean (exit 0)
- `pnpm build` — clean; `/`, `/our-story` and `/_not-found` prerendered as static content
- Zero inline copy strings in `app/our-story/page.tsx` — every bit of text reads from `@/content`, including section labels, blockquote, CTA label and Gen 3 director names
- No hardcoded hex in any component — border accents are resolved through typed colour maps in both `FamilyTree` (implicit via Tailwind class lookups) and `ValuesTriptych` (explicit `BORDER_CLASS` map)
- `prefers-reduced-motion` honoured in `SplitHero` (and already honoured in `SplitScreenParallax` + `StickyTimeline` from Phase 2)

## Known notes / decisions
- **Directors sourced from `PEOPLE_ENVIRONMENT.directors`, not duplicated.** The Gen 3 row of the FamilyTree reads from the same canonical list used on the People & Environment page, so any change to the director roster only needs to happen in one place. FamilyTree strips the `" Mackay"` suffix at render so the five names fit in one row without dominating the layout (the surname is implied by the page context and by the Gen 1/Gen 2 nodes above them).
- **Family tree copy lives in `OUR_STORY.familyTree`, not inlined.** Stanley + Agnes, John + Robert, the "Director" label, and the Gen 4 caption are all typed content fields.
- **Values body copy is lightly drafted.** The accent colours (crimson/harvest-gold/sage-field) come from the brief; the body paragraphs are grounded in facts already stated in the brief (five brothers, 550+ team, fourth generation joining). Worth a client review pass before launch — same caveat as the rest of the Phase 2 draft copy.
- **`SplitHero` is under `src/components/our-story/`** (mirroring `src/components/home/` from Phase 3). Rule of thumb: page-local client components go in a page-named folder; reusable sections go in `src/components/sections/`.
- **Timeline images are already wired** via Phase 2's `TIMELINE_ITEMS.imageSeed` — nothing to change here.

## What is NOT done
- `/our-produce` overview + 6 crop pages (Phase 5)
- `/people-and-environment` (Phase 6)
- `/work-with-us`, `/media`, `/contact`, the contact API route and MDX press releases (Phase 7)
- Animation polish pass (Phase 8)
- Performance / SEO / accessibility audit + deploy (Phase 9)

## Exact next step
Begin **Phase 5** — `app/our-produce/page.tsx` + `app/our-produce/[crop]/page.tsx`. Import `PRODUCE`, `PRODUCE_DATA` and `CROP_SLUGS` from `@/content`.

Overview page:
1. `<KineticHero headline="Six crops.\nThree regions.\nOne standard." eyebrow="Our Produce" subheadline={PRODUCE.overview.intro} ctaPrimary={{ label: "Explore bananas", href: "/our-produce/bananas" }} imageSeed={10}>`
2. **BentoProduceGrid** — new component at `src/components/sections/BentoProduceGrid.tsx`. CSS grid `grid-cols-5` desktop with `col-span` variation: bananas `col-span-3 row-span-2` (520px), others standard (240px), passionfruit `col-span-1`. Each card: ImagePlaceholder fill + gradient overlay + Badge + name + stat. Hover: `scale-105`. GSAP stagger fade-up on ScrollTrigger.
3. **SupplyChainExplainer** — new component at `src/components/sections/SupplyChainExplainer.tsx`. 3 steps (MapPin "Farm" → Package "Packed" → ShoppingCart "Shelf") with 48px circles, 40px horizontal connector arrows between them (desktop only), scaleX reveal on scroll.
4. `<SplitScreenParallax imageSeed={20} imageAlt="Smart Banana packaging">` wrapping a `border-t-4 border-harvest-gold pt-6` block with eyebrow/headline/body from `PRODUCE.smartBanana`.
5. **Zero Waste ink band** — `bg-ink py-24 px-10`, `SectionHeader tone="parchment"` (already supported), `PRODUCE.iqf.body`, `ImagePlaceholder seed={130}` rounded.
6. **Trade CTA** — within the same ink band. "Want to stock Mackays produce?" heading + `<Button variant="gold" href="mailto:trade@mackays.com.au">Enquire about supply</Button>`.

Crop pages (`app/our-produce/[crop]/page.tsx`):
- `export async function generateStaticParams() { return CROP_SLUGS.map(crop => ({ crop })) }`
- Load `const crop = PRODUCE_DATA[params.crop]`; fall back to `notFound()` when unknown
- Sections: hero (70vh, overlay, breadcrumb, crimson headline, italic gold tagline) → SplitScreenParallax for `crop.story` → growing conditions (4-col with Lucide Layers/CloudRain/MapPin/Calendar icons) → varieties grid (if `crop.varieties`) → PullQuoteSection → Related Produce (3 other crops) → `GoldCalloutBand` for trade enquiry.
- Per-crop metadata: `${crop.name} | Mackays — Far North Queensland`.

Add to `PRODUCE` content if needed: overview section labels (eyebrow/headline strings for the bento grid and supply chain), trade band headline + CTA label. The Phase 2 content already has `overview.intro`, `smartBanana`, `iqf.body` and `tradeEnquiryBody`, so only small extensions are required.

## Files added this phase
- `app/our-story/page.tsx`
- `src/components/sections/FamilyTree.tsx`
- `src/components/sections/ValuesTriptych.tsx`
- `src/components/our-story/SplitHero.tsx`
- `src/components/our-story/index.ts`

## Files modified this phase
- `SPRINT.md` (rewritten for Phase 4)
- `HANDOFF.md` (this file)
- `src/content/types.ts` (`OurStorySectionLabels`, `OurStoryFamilyTree`, `OurStoryValue`, `ValueAccent`; extended `OurStoryContent`)
- `src/content/our-story.ts` (added `foundingBlockquote`, `sectionLabels`, `familyTree`, `values`, `ctas`)
- `src/components/sections/index.ts` (re-exports FamilyTree + ValuesTriptych)

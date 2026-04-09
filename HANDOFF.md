# Handoff: Phase 5 — Our Produce (overview + 6 crop pages)
Date: 2026-04-10
Session type: Build

## What was completed

### Our Produce overview — `app/our-produce/page.tsx`
Server component. Six sections in the order specified in the brief,
every string sourced from `@/content`:

1. **KineticHero** — three-line headline `"Six crops.\nThree regions.\nOne standard."` (see the KineticHero change below), `imageSeed={10}`, primary CTA "Explore bananas" → `/our-produce/bananas`, subheadline uses `PRODUCE.overview.intro`
2. **BentoProduceGrid** — wrapped in a `SectionHeader` ("What we grow" / "Every crop chosen for where we farm it.")
3. **SupplyChainExplainer** — wrapped in a `SectionHeader` ("Supply Chain" / "Farm to shelf in 48 hours.")
4. **Smart Banana SplitScreenParallax** — children wrapped in a `border-t-4 border-harvest-gold pt-6` block with eyebrow/headline/body from `PRODUCE.smartBanana`
5. **IQF ink band** — `bg-ink` wrapper, `SectionHeader tone="parchment"`, `PRODUCE.iqf.body`, `ImagePlaceholder seed={130}` rounded
6. **Trade CTA band** — continuation inside the same ink section. "Want to stock Mackays produce?" headline and a gold `Button` linking to `mailto:trade@mackays.com.au`

### Crop pages — `app/our-produce/[crop]/page.tsx`
Dynamic server component with `generateStaticParams()` returning all six
`CROP_SLUGS`. Prerenders six static crop routes at build time:
`/our-produce/bananas`, `/red-papaya`, `/avocados`, `/sugar-cane`,
`/cattle`, `/passionfruit`.

Per-crop sections:
1. **Hero** — `h-[70vh] min-h-[520px]`, `ImagePlaceholder fill priority seed={crop.heroSeed}`, `bg-ink/40` overlay, absolute content block with breadcrumb (`Our Produce` → `{crop.name}`), `clamp(52px,8vw,88px)` crimson-bold headline, Lora italic harvest-gold tagline
2. **Story** — `<SplitScreenParallax>` with `crop.storySeed`, `crop.eyebrow`, `crop.storyHeadline`, `crop.story`
3. **Growing conditions** — `grid-cols-2 md:grid-cols-4`, four bordered cards with Lucide `Layers` / `CloudRain` / `MapPin` / `Calendar` icons, labels from `PRODUCE.cropPage.growing`, values from `crop.growing`
4. **Varieties** — conditional, only when `crop.varieties` is defined and non-empty (bananas, red papaya, avocados). Eyebrow "Our Varieties", headline templated with the crop name lowercased via `PRODUCE.cropPage.varieties.headlineTemplate.replace('{crop}', …)`
5. **PullQuoteSection** — `crop.pullQuote`
6. **Related produce** — three other crops (filtered by slug, sliced to 3) as linked cards with hover scale
7. **GoldCalloutBand** — trade callout with `cta.href={`/contact?ref=${crop.slug}`}`

`generateMetadata()` returns per-crop:
- title: `${crop.name} | Mackays — Far North Queensland`
- description: `${crop.tagline} Grown by Mackays Marketing in Far North Queensland.`

Routing safety: `notFound()` when `params.crop` isn't in `CROP_SLUGS`
(guarded via a `isCropSlug` type predicate), and `generateMetadata` also
falls back to `"Crop not found | Mackays"` rather than throwing.

### New section components

**`src/components/sections/BentoProduceGrid.tsx`** — client component.
- Props: `items: BentoGridItem[]`, `crops: Record<CropSlug, CropData>`
- `grid-cols-1 md:grid-cols-5 gap-4`. Each item's Tailwind `span` + `minHeight` classes come from the content layer, so the bento layout is fully data-driven.
- Auto-placement works because items are listed in CROP_SLUGS order: Bananas (`md:col-span-3 md:row-span-2 min-h-[520px]`) occupies the left 3×2 block, Red Papaya + Avocados stack 2-wide on the right, then Sugar Cane (2), Cattle (2), Passionfruit (1) span the bottom row.
- Each card: `<Link>` to `/our-produce/${slug}`, `ImagePlaceholder fill` that scales on hover, bottom gradient, Badge (with content-driven variant), crop name, tagline.
- GSAP `useGSAP` + ScrollTrigger: `opacity 0→1`, `y 30→0`, stagger 0.1, `power2.out`, `toggleActions 'play none none reverse'`. Reduced-motion snaps to the final state.

**`src/components/sections/SupplyChainExplainer.tsx`** — client component.
- Props: `steps: SupplyChainStep[]`
- Flex row (column on mobile). Each step: 48 px `bg-parchment-deep` circle with a Lucide icon (`MapPin` / `Package` / `ShoppingCart` resolved via a typed `ICON_MAP`), step label, title, subtitle.
- Desktop-only connector: `hidden md:block h-px w-10 bg-parchment-deep` between adjacent steps, animated `scaleX 0→1` with `transformOrigin: 'left center'` on ScrollTrigger.
- Steps also fade+translate in with their own ScrollTrigger. Reduced-motion sets everything to the final state.

### KineticHero update
- Previously split the headline on `|` only, yielding an optional accent segment below the primary one.
- Now first splits on `\n` into lines, then for each line handles an optional `|` that marks a "break + accent styling" boundary. Each resulting line renders as a `span.block` with word-by-word reveal via the existing `[data-kh-word]` hook.
- Phase 3 (`"The land that feeds Australia."`) still produces a single line. Phase 5 (`"Six crops.\nThree regions.\nOne standard."`) now produces three primary lines. Phase 6 (`"550 people. Three regions.|One standard — theirs."`) will produce two lines, the second in Lora italic harvest-gold — no behaviour change on that case.

### Content layer extensions — `PRODUCE`
- **`overview.hero`** — eyebrow, multi-line headline, imageAlt, primary CTA (zero inline strings in the overview page)
- **`overview.bento`** — eyebrow, headline, `items: BentoGridItem[]` with `{ slug, seed, stat, badgeVariant, span, minHeight }` for all six crops
- **`overview.supplyChain`** — eyebrow, headline, `steps: SupplyChainStep[]`  with `{ stepLabel, icon: 'MapPin' | 'Package' | 'ShoppingCart', title, subtitle }`
- **`overview.iqfBand`** — eyebrow, headline, imageAlt, imageSeed (for the IQF section's framing)
- **`overview.tradeBand`** — headline + CTA for the "Want to stock Mackays produce?" band
- **`cropPage`** — `breadcrumb`, `growing: { soil, climate, region, harvest }` labels, `varieties: { eyebrow, headlineTemplate }`, `related: { eyebrow, headline, moreAriaLabel }`, `tradeCallout: { eyebrow, headline, ctaLabel }`
- New types in `src/content/types.ts`: `SupplyChainIcon`, `SupplyChainStep`, `BadgeTone`, `BentoGridItem`, `ProduceOverview`, `CropPageLabels`

## Quality gates
- `pnpm tsc --noEmit` — clean (exit 0)
- `pnpm build` — clean; **10 prerendered routes total**:
  - `/`, `/our-story`, `/our-produce`, and six crop pages (`/our-produce/bananas`, `…/red-papaya`, `…/avocados`, `…/sugar-cane`, `…/cattle`, `…/passionfruit`) under the SSG symbol, plus `/_not-found`
- Zero inline strings anywhere in the 7 new pages (overview + 6 crop pages). All labels, hero copy, growing-card labels, breadcrumb text, trade-callout copy and CTA labels read from `@/content`.
- No hardcoded hex in any new component — `BentoProduceGrid` resolves badge variants from content; `SupplyChainExplainer` resolves icons via a typed `ICON_MAP`; `GROWING_ICON_MAP` in the crop page maps the four growing keys to Lucide components.
- `prefers-reduced-motion` honoured in both new client components, and in KineticHero via the existing guard.

## Known notes / decisions
- **Bento layout is data-driven.** The per-item `span` + `minHeight` classes live on `BentoGridItem` in content rather than being hard-coded in the component. That keeps the layout decision reviewable alongside the copy and makes it easy to reshuffle without touching component code.
- **Banana hero copy / stat:** Bananas is the only crop in the bento with the feature tile, carrying the `13% of national supply` stat line. These stats are page-local framing, same principle as in Phase 3 — they live in the content file for the page that uses them, not on `PRODUCE_DATA`.
- **Growing card labels are content, values are `CropData`.** `PRODUCE.cropPage.growing` holds the four label strings ("Soil", "Climate", "Region", "Harvest"); `crop.growing` holds the per-crop values. Keeps the translation story and copy story separate from the crop data.
- **Varieties template:** `PRODUCE.cropPage.varieties.headlineTemplate = "Two ways we grow {crop}."`. At render the page substitutes `{crop}` with `crop.name.toLowerCase()`, giving e.g. "Two ways we grow bananas." Phase 2 intentionally only populated varieties for bananas / red papaya / avocados — the varieties section is skipped on sugar cane, cattle and passionfruit, per the brief.
- **Related produce picks the first three crops in `CROP_SLUGS` that aren't the current one.** Deterministic and cheap — no shuffling. If a curator wants to hand-pick related crops per page, it's a one-line change to pull from a `related: CropSlug[]` field on `CropData`.
- **Next.js 16 async params:** both `generateMetadata` and the page accept `params: Promise<{ crop: string }>` and `await` it — required by Next 15+/16.
- **KineticHero was the only Phase 2 component I had to update.** Adding `\n` handling was a small additive change and doesn't touch Phase 3/4 behaviour — both paths still work.

## What is NOT done
- `/people-and-environment` (Phase 6)
- `/work-with-us`, `/media`, `/contact`, the contact API route and MDX press releases (Phase 7)
- Animation polish pass (Phase 8)
- Performance / SEO / accessibility audit + deploy (Phase 9)

## Exact next step
Begin **Phase 6** — `app/people-and-environment/page.tsx`. Import `PEOPLE_ENVIRONMENT` and the `FARM_MARKERS` / `TIMELINE_ITEMS` / `OUR_STORY.values` as needed.

Structural outline (per the Phase 6 prompt):
1. `<KineticHero>` with headline `"550 people. Three regions.|One standard — theirs."` (the `|` + italic-gold accent path is already supported in `KineticHero` — no changes needed), eyebrow "Our People", `imageSeed={100}`, primary CTA "Work with us" → `/work-with-us`, subheadline from `PEOPLE_ENVIRONMENT.hero.subheadline`.
2. `<SplitScreenParallax imageSeed={40} imageLeft>` — `PEOPLE_ENVIRONMENT.ourPeople.body1` + `body2`.
3. **Directors grid** — 3-card first row + 2-card second row (centred), reading from `PEOPLE_ENVIRONMENT.directors`. Each card has a small avatar (`ImagePlaceholder width=80 height=80 rounded-full` with `seed={director.imageSeed}`), name, title, role. Below: `PEOPLE_ENVIRONMENT.boardNote`. The five director names, titles, roles and image seeds are already in Phase 2 content.
4. **Fourth Generation statement** — centred, harvest-gold HR above, `PEOPLE_ENVIRONMENT.fourthGenStatement`, ghost-link CTA "Join the team" → `/work-with-us`.
5. **Environment tabs** — Radix `Tabs.Root defaultValue="biosecurity"`. Four tabs (Biosecurity / Water / Carbon / Zero Waste) reading from `PEOPLE_ENVIRONMENT.environment.{biosecurity|water|carbon|iqf}`. Biosecurity tab has a crimson Badge ("Panama TR4-Free — 3 consecutive years") beside the body. Water tab has two `StatCounter`s (8830 ML licences, 2000 ML private). Carbon tab has a shimmer progress bar. Zero Waste tab has an image + a StatCounter (50+ IQF jobs).
6. `<LivingPhotoGrid seeds={[10,30,40,100,110,130,90,80]} captions={…}>`.
7. `<GoldCalloutBand>` with the Foodbank headline "50,000 Queensland schoolchildren. Mackays bananas. Every week." + `PEOPLE_ENVIRONMENT.community.foodbankBody` + an external CTA to the Foodbank partner story.

Metadata:
- title: `People & Environment | Mackays — Our Team, Biosecurity and Sustainability`
- description: `The 550+ people behind Australia's largest banana operation. Biosecurity, carbon commitments, IQF zero-waste processing, and community partnerships.`

Content extensions likely needed for Phase 6:
- `PEOPLE_ENVIRONMENT.sectionLabels` (eyebrow/headline pairs for Our Team, Leadership, Environment tabs, Fourth Generation, Community)
- `PEOPLE_ENVIRONMENT.environment.tabsLabels` for the tab trigger labels
- `PEOPLE_ENVIRONMENT.environment.biosecurityBadge` string ("Panama TR4-Free — 3 consecutive years")
- `PEOPLE_ENVIRONMENT.environment.waterStats` array with `{ value, suffix, label }`
- `PEOPLE_ENVIRONMENT.environment.carbonFootnote`
- `PEOPLE_ENVIRONMENT.lifePhotoGrid` with `{ seed, caption }` pairs (same pattern as `HOME.lifePhotoGrid`)
- `PEOPLE_ENVIRONMENT.community.cta` (label + external href)

## Files added this phase
- `app/our-produce/page.tsx`
- `app/our-produce/[crop]/page.tsx`
- `src/components/sections/BentoProduceGrid.tsx`
- `src/components/sections/SupplyChainExplainer.tsx`

## Files modified this phase
- `SPRINT.md` (rewritten for Phase 5)
- `HANDOFF.md` (this file)
- `src/content/types.ts` (new: `SupplyChainIcon`, `SupplyChainStep`, `BadgeTone`, `BentoGridItem`, `ProduceOverview`, `CropPageLabels`; rewrote `ProduceContent.overview`)
- `src/content/produce.ts` (rewrote `PRODUCE.overview` with hero/bento/supplyChain/iqfBand/tradeBand; added `PRODUCE.cropPage` labels)
- `src/components/sections/index.ts` (re-exports `BentoProduceGrid` + `SupplyChainExplainer`)
- `src/components/sections/KineticHero.tsx` (multi-line headline support via `\n` + existing `|` accent)

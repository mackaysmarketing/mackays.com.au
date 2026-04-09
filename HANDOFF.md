# Handoff: Phase 6 — People & Environment
Date: 2026-04-10
Session type: Build

## What was completed

### People & Environment page — `app/people-and-environment/page.tsx`
Server component composing seven sections in the exact order from the
brief. Every visible string is sourced from `@/content` — no inline copy
anywhere on the page. Prerendered as static content alongside all other
routes.

1. **KineticHero** — `PEOPLE_ENVIRONMENT.hero`. The headline uses the `|` delimiter ("550 people. Three regions.|One standard — theirs.") which the Phase 5 multi-line KineticHero renders as two lines, the second in Lora italic harvest-gold. `imageSeed={100}`, primary CTA "Work with us" → `/work-with-us`. No code change needed on KineticHero.
2. **Our People SplitScreenParallax** — `imageLeft`, `ourPeopleImage.seed = 40`, wrapping a `SectionHeader` ("Our Team" / "The people are the product.") plus the two paragraph bodies `ourPeople.body1` / `body2`.
3. **DirectorsGrid** — new page-local server component. First row `grid-cols-1 md:grid-cols-3` (Gavin / Barrie / Stephen), second row `grid-cols-1 md:grid-cols-2 md:max-w-[66%] md:mx-auto` (Cameron / Daniel). Each card has a round 80 px portrait, name → crimson on hover, uppercase tracking dust title, Lora ink-mid role paragraph, and a hover `-translate-y-0.5` + `shadow-[0_8px_24px_rgba(20,20,19,0.08)]`. `boardNote` rendered centred below the grid. Reads the five directors directly from `PEOPLE_ENVIRONMENT.directors`.
4. **Fourth-Generation statement** — centred, `w-16 h-[3px] bg-harvest-gold mx-auto mb-10`, Lora italic 22px body `fourthGenStatement`, and a ghost-link CTA "Join the team →" linking to `/work-with-us` via the new `fourthGenCta` content field.
5. **Environment tabs** — `SectionHeader` ("Our Commitment to the Land" / "We steward, we don't just farm."), followed by the new `EnvironmentTabs` Radix component.
6. **LivingPhotoGrid** — 8 captioned images from `PEOPLE_ENVIRONMENT.lifePhotoGrid` (seeds `[10,30,40,100,110,130,90,80]` with captions).
7. **GoldCalloutBand (Foodbank)** — `community.eyebrow = "Foodbank Queensland"`, headline "50,000 Queensland schoolchildren. Mackays bananas. Every week.", body `community.foodbankBody`, CTA to the Foodbank partnership page.

Metadata:
- title: `People & Environment | Mackays — Our Team, Biosecurity and Sustainability`
- description: `The 550+ people behind Australia's largest banana operation. Biosecurity, carbon commitments, IQF zero-waste processing, and community partnerships.`

### New components

**`src/components/people-environment/EnvironmentTabs.tsx`** — client component.
- Built on `@radix-ui/react-tabs`, `defaultValue="biosecurity"`.
- Single prop: `content: EnvironmentContent`. All tab labels, bodies, badge text, stats and images come from content.
- `TAB_ORDER` array drives the trigger order (`biosecurity → water → carbon → iqf`), so trigger labels and content panels stay in sync.
- Active trigger styling via Radix data attributes: `data-[state=active]:text-crimson data-[state=active]:border-b-2 data-[state=active]:border-harvest-gold`. Focus-visible rings pass through too.
- Per-tab panels:
  - **Biosecurity** — 2-col grid, crimson Badge ("Panama TR4-Free — 3 consecutive years") above the body, right-column image from `biosecurityImage.seed` (10).
  - **Water** — 2-col grid, body on the left, two `StatCounter`s on the right (`8830 ML` licensed entitlements + `2000 ML` private agreement), each driven by `waterStats` content.
  - **Carbon** — single column, body, uppercase `carbonProgressLabel`, harvest-gold shimmer progress bar (2/3 filled, with `role="progressbar"` + `aria-valuenow={66}` for accessibility), footnote `carbonFootnote`. The shimmer uses the new `animate-shimmer` Tailwind animation and respects `motion-reduce:animate-none`.
  - **Zero Waste (iqf)** — 2-col grid, image from `iqfImage.seed` (130) on the left, body + `StatCounter` (50+ new Tully jobs) on the right.

**`src/components/people-environment/DirectorsGrid.tsx`** — server component.
- Props: `{ eyebrow, headline, directors, boardNote }`.
- Renders `SectionHeader` then two grid rows (3 + 2) with an inner `DirectorCard` helper. All colour tokens are Tailwind variables; no inline styles.
- The round 80 px portrait uses a `<div class="relative w-20 h-20 rounded-full overflow-hidden">` wrapping `<ImagePlaceholder fill>` so Next/Image can still calculate a correct layout.

**`src/components/people-environment/index.ts`** — barrel for the two components.

### Content layer extensions — `PEOPLE_ENVIRONMENT`
Rewritten to support every section label, tab label and presentational
detail the page needs, with no inline strings:

- `ourPeopleImage: { seed, alt }` — image for the Our People SplitScreenParallax
- `fourthGenCta: CtaLink` — "Join the team" → `/work-with-us`
- `sectionLabels.leadership: { eyebrow, headline }` — "Leadership" / "Guided by those who grew up here."
- `environment` rebuilt from a `{biosecurity,water,carbon,iqf}` string map into a richer structure:
  - `eyebrow`, `headline` — "Our Commitment to the Land" / "We steward, we don't just farm."
  - `tabLabels: EnvironmentTabLabels` — per-tab trigger label
  - `bodies: EnvironmentTabBodies` — per-tab body copy (moved from top-level to `.bodies.*`)
  - `biosecurityBadge: string` — "Panama TR4-Free — 3 consecutive years"
  - `biosecurityImage: { seed, alt }`
  - `waterStats: EnvironmentWaterStat[]` — two entries with `value`, `suffix`, `label`
  - `carbonProgressLabel: string` + `carbonFootnote: string`
  - `iqfImage: { seed, alt }` + `iqfStat: { value, suffix, label }`
- `community` now includes `eyebrow`, `headline`, `foodbankBody` and `cta` (label + external href). The `foodbankBody` field is unchanged.
- `lifePhotoGrid: HomePhotoGridItem[]` — 8 `{ seed, caption }` pairs, reusing the `HomePhotoGridItem` interface already defined for the home page.

New types added to `src/content/types.ts`:
- `EnvironmentTabBodies`, `EnvironmentTabKey`, `EnvironmentTabLabels`
- `EnvironmentWaterStat`, `EnvironmentContent`
- `PeopleEnvironmentSectionLabels`, `PeopleEnvironmentCommunity`

### Tailwind / globals update
- `tailwind.config.ts` gains a `shimmer` keyframe (`background-position: -200% 0 → 200% 0`) and a matching `animate-shimmer` utility (`2.2s ease-in-out infinite`), used by the Carbon tab progress bar.

## Quality gates
- `pnpm tsc --noEmit` — clean (exit 0)
- `pnpm build` — clean; **12 prerendered routes total** now:
  - `/`, `/our-story`, `/our-produce`, 6 crop pages under SSG, `/people-and-environment`, `/_not-found`
- Zero inline copy in `app/people-and-environment/page.tsx` — section labels, tab labels, badge text, stat labels, progress label, footnote, CTA labels and Foodbank copy all come from `@/content`
- No hardcoded hex in the new components. `EnvironmentTabs` uses CSS vars for the shimmer gradient (`var(--harvest-gold)`, `var(--harvest-gold-dark)`). All other colours go through Tailwind tokens.
- `prefers-reduced-motion` honoured by the Carbon progress bar (`motion-reduce:animate-none`); `StatCounter` already honours it from Phase 2; `LivingPhotoGrid` and `KineticHero` already guard from Phase 2; Radix Tabs themselves don't animate, so nothing else needs a guard.
- Focus-visible handling on Radix Tabs triggers, the DirectorsGrid card (implicit via inherited `<article>` + focus-within if a link is added later), the ghost-link CTA, and the foodbank CTA button.

## Known notes / decisions
- **Progress bar is decorative at 2/3.** The carbon audit is in progress, not a measured milestone, so the bar is a sentiment indicator rather than a real metric. The body copy and footnote make that explicit ("Audit underway. 2025 results pending."). `aria-valuenow={66}` is set for screen-reader consistency, but the label on the progressbar is the `carbonProgressLabel` content field rather than a hardcoded string. Worth a client tweak on launch if a measured number becomes available.
- **`PEOPLE_ENVIRONMENT.environment.bodies`** replaces the previous flat `environment: { biosecurity, water, carbon, iqf }` shape. No other file in the repo referenced the old shape (the Phase 6 build is its only consumer), so the rename is contained.
- **DirectorsGrid is page-local** under `src/components/people-environment/` — same convention as the page-local `BrandStatement` (home) and `SplitHero` (our-story) from earlier phases. Shared section components live under `src/components/sections/`.
- **Gen 3 names are shared** between the FamilyTree (our-story) and DirectorsGrid (people & environment) — both read from `PEOPLE_ENVIRONMENT.directors`, so any edit to the director roster flows to both pages automatically.
- **No GSAP in this phase.** The page sections that have entry animations (`KineticHero`, `SplitScreenParallax`, `LivingPhotoGrid`) inherit their guarded animations from Phase 2/5. The new components don't add new animations beyond the already-configured Tailwind shimmer.
- **Foodbank CTA is external** (`https://www.foodbank.org.au/meet-a-food-producer-mackays-marketing/`). `Button` already handles external `href`s by rendering `<a target="_blank" rel="noopener noreferrer">` from Phase 2.

## What is NOT done
- `/work-with-us`, `/media`, `/contact`, the contact API route and the three MDX press releases (Phase 7)
- Animation polish pass (Phase 8) — SplitText, page transitions, microinteraction audit, mobile animation reductions
- Performance / SEO / accessibility audit + deploy (Phase 9)

## Exact next step
Begin **Phase 7** — three pages in one session.

1. **Work With Us** — `app/work-with-us/page.tsx`:
   - `<KineticHero headline="Come grow with us." imageSeed={30}>` with `WORK_WITH_US.hero.subheadline` and primary CTA pointing at the Dayforce portal (already in content as `pillars`, `roles`, `opportunities`).
   - **Why Mackays** 4-column grid of `WORK_WITH_US.pillars` with alternating `border-t-[3px]` (crimson/harvest-gold/sage-field/crimson) and oversized `01`-`04` background numbers (same treatment as `ValuesTriptych`).
   - **Role categories** 3-column grid of 6 Lucide-iconed role cards from `WORK_WITH_US.roles` with a 40 px `bg-parchment-deep` circle icon per role.
   - **Current Opportunities** Radix `Accordion.Root type="single" collapsible` reading from `WORK_WITH_US.opportunities`. Trigger: role title + location + type pill + `ChevronDown` that rotates 180° when open. Content: responsibilities paragraph + gold Button linking to Dayforce.
   - `GoldCalloutBand` "Always Recruiting" — `WORK_WITH_US.alwaysRecruiting`.

2. **Media** — `app/media/page.tsx`:
   - Static header (`h-[45vh] bg-parchment-warm`) with eyebrow + large headline + subheadline from `MEDIA.hero`.
   - 3-col press-releases grid from `MEDIA.pressReleases` (date in JetBrains Mono crimson, `line-clamp-2` headline, `line-clamp-3` excerpt, `Button variant="ghost-link"` to `/media/${slug}`).
   - Media contact block from `MEDIA.mediaContact`.
   - Create three MDX files under `content/media/` with frontmatter (title/date/excerpt/slug) wired via Contentlayer2 — or, if Contentlayer2 still has React-19 compatibility friction, read the press releases from `MEDIA.pressReleases` directly and render `/media/[slug]` as a static route from the content layer. **Recommend the latter** to avoid a Contentlayer upgrade detour mid-phase.
   - `app/media/[slug]/page.tsx` — simple Lora-prose article page.

3. **Contact** — `app/contact/page.tsx`:
   - Header from `CONTACT.headline` / `subheadline`.
   - Two-column layout: React Hook Form + Zod form (POST to `/api/contact`) on the left, three office cards on the right, then a static `<QldFarmMap markers={[FARM_MARKERS[0]]} interactionDisabled>` below the cards.
   - Member badges from `CONTACT.badges`.
   - **`app/api/contact/route.ts`** — server route using `resend` + `zod`. Validate body → `resend.emails.send({ from: 'website@mackays.com.au', to: 'info@mackays.com.au', … })` → `NextResponse.json({ success: true })` / field-level error responses.

4. Content extensions for Phase 7:
   - `WORK_WITH_US.sectionLabels` (eyebrow/headline pairs for Why Mackays, Role Categories, Current Opportunities)
   - `WORK_WITH_US` role `icon` strings already typed; add a small ICON_MAP in the page or a shared util
   - `MEDIA.sectionLabels` if needed; `MEDIA.pressReleases` is already complete from Phase 2
   - `CONTACT.form.fields` — labels, placeholders, select options, submit button label, success + error messages (to keep copy out of inline strings)
   - `CONTACT.memberBadges` already covered by `CONTACT.badges`.

## Files added this phase
- `app/people-and-environment/page.tsx`
- `src/components/people-environment/EnvironmentTabs.tsx`
- `src/components/people-environment/DirectorsGrid.tsx`
- `src/components/people-environment/index.ts`

## Files modified this phase
- `SPRINT.md` (rewritten for Phase 6)
- `HANDOFF.md` (this file)
- `src/content/types.ts` (new types for environment tabs, water stats, community, section labels)
- `src/content/people-environment.ts` (restructured environment, added sectionLabels, lifePhotoGrid, fourthGenCta, community shape)
- `tailwind.config.ts` (shimmer keyframe + animate-shimmer)

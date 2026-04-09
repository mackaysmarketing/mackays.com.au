# Handoff: Phase 7 — Work With Us + Media + Contact
Date: 2026-04-10
Session type: Build

## What was completed

### Work With Us — `app/work-with-us/page.tsx`
Server component, 5 sections, every string sourced from `@/content`:

1. **KineticHero** — `WORK_WITH_US.hero`, `imageSeed={30}`, primary CTA "See current roles" → Dayforce portal (already in content).
2. **`<WhyMackaysPillars>`** — 4-column grid of `WORK_WITH_US.pillars` with alternating border-top accents (crimson / harvest-gold / sage-field / crimson, driven by each pillar's `accent` field) and oversized `01`–`04` background numbers in `text-ink/5`.
3. **`<RoleCategories>`** — 3-column grid of all 6 `WORK_WITH_US.roles` with Lucide icons (`Sprout`, `Tractor`, `Package`, `Truck`, `Wrench`, `Users`) resolved through a typed `ICON_MAP`. Each card has a 40px `bg-parchment-deep` circle icon, title, description, and a "See roles →" CTA pulled from `roleCtaLabel`.
4. **Current Opportunities** — section header + `<OpportunitiesAccordion>` (new Radix `Accordion.Root type="single" collapsible` client component). Each item's trigger shows the role title plus two Badges (location + type) on desktop, and `ChevronDown` rotates 180° via `group-data-[state=open]:rotate-180`. Content panel shows responsibilities + a gold `Button` ("Apply via Dayforce →") linking to the Dayforce href.
5. **`<GoldCalloutBand>`** — "Always Recruiting" from `WORK_WITH_US.alwaysRecruiting`.

Metadata: `Work With Us | Mackays — Careers in Far North Queensland Farming` + description.

### Media — `app/media/page.tsx` + `app/media/[slug]/page.tsx`

**Listing page (`app/media/page.tsx`)** — server component:
1. Static header (`h-[45vh] min-h-[360px] bg-parchment-warm`) — NO entry animation per brief. Eyebrow + `clamp(40px,6vw,64px)` headline + subheadline from `MEDIA.hero`.
2. 3-column press-release grid (`grid-cols-1 md:grid-cols-3 gap-8`) reading from `MEDIA.pressReleases`. Each card: JetBrains-Mono crimson date (formatted via the new `formatDate` helper in AU English), Poppins headline `line-clamp-2`, Lora excerpt `line-clamp-3`, "Read more →" Link to `/media/${slug}`.
3. Media contact block (`py-16 text-center border-t`) — eyebrow + crimson email link + tel link from `MEDIA.mediaContact`.

**Article page (`app/media/[slug]/page.tsx`)** — dynamic server component:
- `generateStaticParams()` over `MEDIA.pressReleases.map(pr => pr.slug)` → 3 static routes prerendered: `/media/2022-iqf-expansion`, `/media/2024-tr4-free`, `/media/2025-fourth-generation`.
- `generateMetadata()` returns `${pr.headline} | Mackays` + excerpt as description.
- `notFound()` when the slug isn't in the content.
- Layout: `max-w-2xl mx-auto` Lora prose article with back-link, mono date, headline, italic excerpt, then paragraphs rendered from `pr.body`. `renderParagraphs()` splits on `\n\s*\n` so each prose paragraph becomes a `<p>` in Lora 17px text.
- Footer: "← All news" ghost-link + "Media contact →" secondary button.

**Three MDX source files** created under `content/media/` as the authoring surface:
- `2022-iqf-expansion.mdx`
- `2024-tr4-free.mdx`
- `2025-fourth-generation.mdx`

Each has full frontmatter (`slug`, `title`, `date`, `excerpt`) and a markdown body matching `MEDIA.pressReleases`. Per the Phase 6 handoff recommendation, the slug page reads from `MEDIA.pressReleases` directly rather than parsing MDX at runtime — we avoided the Contentlayer2 / React 19 upgrade detour, and content stays type-safe. The MDX files are the canonical authoring surface for content editors; a future phase can wire a parse step if the CMS workflow demands it.

Metadata (listing): `Media | Mackays — News From the Farm` + description.

### Contact — `app/contact/page.tsx`
Server component composing a header, two-column form+sidebar layout, and member-badges strip:

1. **Header** — `h-[40vh] min-h-[320px] bg-parchment flex items-end pb-12`, `CONTACT.headline` + `CONTACT.subheadline`.
2. **Two-column**: `grid md:grid-cols-[3fr_2fr] gap-16`:
   - **Left — `<ContactForm>`** (new client component, see below).
   - **Right — sidebar**: three `CONTACT.offices` cards (Farming Office / Marketing / Retail & Trade) each with a title, optional `lines[]`, a crimson mailto link, and optional tel link. Below the cards, a static `<QldFarmMap markers={[FARM_MARKERS[0]]} interactionDisabled>` — the Phase 2 map component already supported `interactionDisabled` and falls back to a neutral panel when `NEXT_PUBLIC_MAPBOX_TOKEN` isn't set, so no change was needed.
3. **Member badges** — centred row (`flex justify-center gap-4 flex-wrap`) of `CONTACT.badges` rendered as neutral `Badge`s ("Foodbank Queensland Supporter", "ABGC Member", "Avocados Australia Member") with a small uppercase `badgesHeading` above.

Metadata: `Contact | Mackays — Farming, Marketing, Retail & Trade` + description.

### `<ContactForm>` — new client component
`src/components/contact/ContactForm.tsx`.

- **React Hook Form + Zod + Framer Motion + lucide `CheckCircle2`**.
- Validation schema comes from a **shared module** (`src/lib/contact-schema.ts`) so the client form and the server route validate identically — single source of truth.
- Fields: Name (required, min 2) · Company (optional) · Email (required, email) · Phone (optional) · Enquiry type (required, `enum` over `CONTACT.form.enquiryOptions`) · Message (required, min 20).
- Inputs styled with shared `INPUT_CLASS`/`LABEL_CLASS`/`ERROR_CLASS` constants (no repeated Tailwind soup): parchment background, parchment-deep border, `focus:border-crimson focus:ring-1 focus:ring-crimson`, `aria-invalid` toggled on error.
- State machine: `idle → submitting → success | error`. `AnimatePresence mode="wait"` swaps the form for a harvest-gold confirmation card (CheckCircle2 + `form.successHeading` + `form.successBody`) on success, with a fade-in/slide transition. Error state renders an inline crimson-pale banner above the submit button.
- Submit button label flips to `form.submittingLabel` while `isSubmitting` is true.
- All strings (labels, placeholders, enquiry option labels, submit labels, success heading + body, error body, validation messages) come from `CONTACT.form.*` in content.

### `/api/contact` — new server route
`app/api/contact/route.ts`. Node runtime.

- Parses the incoming JSON body with the **shared `contactSchema`**.
- On validation failure: returns `400` with `{ success: false, error: 'validation_failed', fields: ZodError.flatten().fieldErrors }`.
- If `RESEND_API_KEY` is missing: returns `503` with `{ success: false, error: 'service_not_configured' }` and logs a warning — so production forms fail loudly on a missing key rather than silently.
- On Resend success: `200 { success: true }`. On Resend failure: `500 { success: false, error: 'send_failed' }`.
- The email body is assembled by `formatEmailBody()` as plain-text lines, `from` is a `Mackays Website <website@{domain}>` address derived from `NEXT_PUBLIC_SITE_URL` (falls back to `mackays.com.au`), `to` is `SITE.emails.info`, and `replyTo` is the submitter's email so the inbox team can reply directly.
- `subject` includes the human-readable enquiry label resolved via `CONTACT.form.enquiryOptions` — no hardcoded strings on the server either.

### Shared utilities
- **`src/lib/contact-schema.ts`** — exports `contactSchema` and the inferred `ContactFormValues` type, importing validation messages from `@/content`.
- **`src/lib/format-date.ts`** — small pure helper that parses an ISO `YYYY-MM-DD` string and returns an AU-English long-form date (`"10 November 2022"`), safely handling the timezone as UTC.

### Content layer extensions

**`WORK_WITH_US`**
- `sectionLabels: WorkWithUsSectionLabels` — eyebrow/headline for Why Mackays, Role Categories, and Current Opportunities
- `roleCtaLabel: string` — "See roles" (used under each role card)
- `opportunityApplyLabel: string` — "Apply via Dayforce" (used inside every accordion panel)

**`CONTACT`** — rewritten to cover the entire form surface with zero inline strings:
- `sidebarHeading: string` — "Direct lines"
- `badgesHeading: string` — "Memberships & partnerships"
- `form: ContactFormContent` — `heading`, `labels.{name, company, email, phone, enquiryType, message}`, `placeholders.{name, company, email, phone, enquiryTypePlaceholder, message}`, `enquiryOptions: { value, label }[]` (`general / retail / media / employment / other`), `submitLabel`, `submittingLabel`, `successHeading`, `successBody`, `errorBody`, `validation.{nameMin, emailInvalid, enquiryRequired, messageMin}`
- New types: `ContactEnquiryType`, `ContactEnquiryOption`, `ContactFormLabels`, `ContactFormPlaceholders`, `ContactFormValidation`, `ContactFormContent`
- New `WorkWithUsSectionLabels` interface

## Quality gates
- `pnpm tsc --noEmit` — clean
- `pnpm build` — clean. **19 routes total**:
  - **Static (○)**: `/`, `/_not-found`, `/contact`, `/media`, `/our-produce`, `/our-story`, `/people-and-environment`, `/work-with-us`
  - **SSG (●)**: 3 media slug pages + 6 crop pages
  - **Dynamic (ƒ)**: `/api/contact`
- Zero inline copy strings across the three new pages, the article page, the ContactForm or the API route. Every label, placeholder, enquiry option, error message, submit label, badge label, heading and CTA label reads from `@/content`.
- `prefers-reduced-motion` inherited from Phase 2 sections (KineticHero, StickyTimeline etc.); the new Framer Motion success-state animation uses a 0.3s fade+slide that is small and doesn't violate the motion guard (Framer honours reduced-motion via `MotionConfig` — safe default).
- Focus-visible handling on the Accordion triggers, form inputs (native browser focus), submit button (inherited from Button), media-listing "Read more" links, and the back-link on article pages.
- Client/server validation parity via `src/lib/contact-schema.ts` — the same `contactSchema` runs on both sides, so malformed requests always fail the same way.
- API route tolerates a missing `RESEND_API_KEY` (returns 503, logs a warning, doesn't crash) — important because the build machine's env may not have the secret.

## Known notes / decisions
- **MDX files are authoring source, not the render source.** The brief asked for three MDX files AND an article page. Rather than add Contentlayer2 wiring (which has known React 19 compatibility friction) mid-phase, I created the three MDX source files in `content/media/` with full frontmatter + markdown bodies, AND kept the article page reading from `MEDIA.pressReleases` (which matches the MDX bodies). This keeps the content typed, the build deterministic, and the MDX files available for a future wiring step. Clearly documented so no one is confused by the dual surfaces.
- **Shared contact schema module** (`src/lib/contact-schema.ts`). Rather than duplicating the Zod schema on client and server, both import from the same file. Validation messages in the schema come from `CONTACT.form.validation` so all error strings remain content-driven on both surfaces.
- **Phone field is optional and NOT pattern-validated.** Keeping friction low on a first-touch form; if the inbox team wants stricter phone validation later, it's a one-line addition to the shared schema.
- **503 on missing key, not silent success.** A build can succeed without `RESEND_API_KEY`, but a submitted form should not appear to succeed when no email was ever sent. The 503 + `service_not_configured` error is surfaced to the user as the generic `form.errorBody` (so we never reveal internal config to the outside), and is logged server-side so ops can fix it.
- **`replyTo: parsed.email`** on the Resend send means responses from `info@mackays.com.au` go straight back to the enquirer — a small quality-of-life win for the inbox team that's usually missed on contact forms.
- **ChevronDown rotation** uses Radix's `data-state` attribute via Tailwind's `group-data-[state=open]:rotate-180` — no JS toggling, no extra state, no ref plumbing.
- **`WhyMackaysPillars` `border-t` accents** are driven by each pillar's `accent` field in content. The Phase 2 `WORK_WITH_US.pillars` was already populated with `crimson`, `harvest-gold`, `sage-field`, `crimson` in that order, matching the brief's expected alternation.
- **`Zod v4 .flatten()`** — used directly on the `ZodError` instance in the API route. Zod v4 exports a top-level `z.flattenError()` as well, but the method form still works and kept the diff small.
- **Static QldFarmMap on contact page** — passes `interactionDisabled` to prevent pan/zoom (Phase 2 already supported this), and `!h-[280px]` className override to shrink the map container below its default `h-[340px] md:h-[520px]`. Tailwind's `!` important prefix wins over the component's default classes.

## What is NOT done
- **Animation polish pass (Phase 8)**: `useReducedMotion` hook, `PageTransition` wrapper, microinteraction audit, mobile animation reductions, optional GSAP SplitText on `KineticHero`. Most components already guard on `prefers-reduced-motion` individually; Phase 8 is about factoring a shared hook, page-level transitions, and a consistency pass.
- **Performance / SEO / accessibility audit + deploy (Phase 9)**.
- **Contentlayer2 wiring** — intentionally deferred. See note above.

## Exact next step
Begin **Phase 8 — Animation Polish**. Reference the Phase 8 prompt in `docs/mackays-parchment-build.md` if helpful, but in summary:

1. **`src/hooks/useReducedMotion.ts`** — `'use client'` hook that reads `window.matchMedia('(prefers-reduced-motion: reduce)').matches`, subscribes to `change` events, and returns a boolean. Replace the ad-hoc `window.matchMedia(...).matches` calls inside `KineticHero`, `SmoothScrollProvider`, `BrandStatement`, `SplitHero`, `SplitScreenParallax`, `LivingPhotoGrid`, `StickyTimeline`, `BentoProduceGrid`, `SupplyChainExplainer`, `Navigation` with this single hook. Consistency win and easier to extend.
2. **`src/components/layout/PageTransition.tsx`** — `'use client'` Framer Motion wrapper around `AnimatePresence mode="wait"`, keyed on `usePathname()`. Add it to `app/layout.tsx` around `<main>` only (NOT nav/footer). Transition `{ opacity: 0, y: 12 } → { opacity: 1, y: 0 } → { opacity: 0, y: -12 }`, `duration: 0.25`, cubic-bezier `[0.0, 0.0, 0.2, 1.0]`.
3. **Microinteraction audit**: `Button` hover/active transitions (scale 1.01 on hover, scale 0.98 on active, crimson-pale glow on primary/gold — partially in place already, finish the pass). `ProduceCard` hover: `scale-[1.05]` on image + `-translate-y-1` on title (already in BentoProduceGrid and HorizontalProduceTape). Nav link `::after` underline: bottom-left scaleX 0→1 on hover.
4. **`StickyTimeline`** — verify `ScrollTrigger.scrub: 1` (exactly 1, not `true` or a larger number), `markers: false`. Year counter should update smoothly as scroll progresses.
5. **Mobile animation reductions**: wrap stagger/y/duration values in all GSAP animations to multiply by the `isMobile` factor (0.5/0.6/0.8) when `window.innerWidth < 768`. Simplest implementation: add a `src/lib/motion.ts` helper `scaleMotion(value, isMobile, factor)`.
6. **GSAP SplitText** — ONLY if the GSAP Club licence has been confirmed in `~/.npmrc`. If not, keep the current word-split and add `rotationX: -15` to the existing `gsap.from` tween on `KineticHero` words for depth. Default: skip SplitText.

Zero new pages, zero new content in Phase 8. Purely a polish pass.

## Files added this phase
- `app/work-with-us/page.tsx`
- `app/media/page.tsx`
- `app/media/[slug]/page.tsx`
- `app/contact/page.tsx`
- `app/api/contact/route.ts`
- `content/media/2022-iqf-expansion.mdx`
- `content/media/2024-tr4-free.mdx`
- `content/media/2025-fourth-generation.mdx`
- `src/components/work-with-us/WhyMackaysPillars.tsx`
- `src/components/work-with-us/RoleCategories.tsx`
- `src/components/work-with-us/OpportunitiesAccordion.tsx`
- `src/components/work-with-us/index.ts`
- `src/components/contact/ContactForm.tsx`
- `src/components/contact/index.ts`
- `src/lib/contact-schema.ts`
- `src/lib/format-date.ts`

## Files modified this phase
- `SPRINT.md` (rewritten for Phase 7)
- `HANDOFF.md` (this file)
- `src/content/types.ts` (new `WorkWithUsSectionLabels`, rewritten `ContactContent` + new `ContactFormContent` and friends)
- `src/content/work-with-us.ts` (added `sectionLabels`, `roleCtaLabel`, `opportunityApplyLabel`)
- `src/content/contact.ts` (rewrote with sidebar heading, badges heading, full `form` schema copy)

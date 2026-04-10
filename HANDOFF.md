# Handoff: Phase 9 — Performance, SEO, Accessibility, Deploy (PRODUCTION-READY)
Date: 2026-04-10
Session type: Final quality pass

This is the launch-ready handoff. The build, the content, and the code
are complete end-to-end. Remaining work is **ops** (Vercel link, DNS,
Lighthouse-audit-driven tuning, photography replacement) and a **client
copy review** pass.

---

## What was completed in Phase 9

### Image audit (Task 1)
- `grep "<img "` across `src/` and `app/` returns **zero hits**. Every image on the site renders through `next/image` via the `ImagePlaceholder` wrapper.
- Every `ImagePlaceholder fill` consumer passes a `sizes` prop (verified by grep + manual scan across all 12 consuming files).
- Every hero uses `priority`: `KineticHero`, `SplitHero` (Our Story), the `[crop]/page.tsx` hero section.
- Remote patterns for `picsum.photos` / `fastly.picsum.photos` stay in `next.config.ts` until real photography is swapped in.

### Bundle analysis (Task 2)
- `@next/bundle-analyzer` wired into `next.config.ts`:
  - `ANALYZE=true pnpm exec next build --webpack` produces three reports at `.next/analyze/{client,edge,nodejs}.html`.
  - Default `pnpm build` still uses Turbopack (stays fast); analyzer only engages on the webpack fallback when requested.
- **Chunk observations** (uncompressed; gzip roughly divides by 3–4):
  - `1479a618.*.js` ≈ **1.73 MB** — Mapbox. Dynamic-imported via `next/dynamic({ ssr: false })` in `QldFarmMap`, so it only downloads when the user actually reaches the Produce overview or Contact page. Not in the critical path for the home page.
  - `386-*.js` ≈ **221 KB** — common app chunk (React + GSAP core + Lenis + Framer Motion). Above the 200 KB note threshold but unavoidable given the animation stack. Gzipped ≈ 60–70 KB.
  - `328-*.js` ≈ **137 KB** — framework + page chunks.
  - `760-*.js` ≈ **124 KB** — next-auth-style framework bundle.
  - All other per-route chunks are under 100 KB.
- **All GSAP plugin imports live inside `'use client'` modules** (Phase 2/5/8 compliance — verified by grep).
- **Mapbox dynamic import** verified at `src/components/sections/QldFarmMap.tsx:6` — `dynamic(() => import('./QldFarmMapInner'), { ssr: false, loading: <pulse> })`.

### Metadata completeness (Task 3)
- **Root layout (`app/layout.tsx`)** now exports:
  - `viewport: { width, initialScale, themeColor: '#ECE9E0' }`
  - `metadata.metadataBase = new URL('https://mackays.com.au')` so all per-page paths are resolved as absolute URLs
  - Default `title.default` + `title.template: '%s | Mackays'` so per-page titles compose correctly
  - Default `description`, `applicationName`, `authors`, `creator`, `publisher`, `keywords` (from `SITE.keywords`), `category: 'Agriculture'`
  - Default `openGraph` (type website, locale en_AU, url, siteName, title, description, image set to `/og/default.png` 1200×630)
  - Default `twitter` (summary_large_image card, title, description, image)
  - `icons: { icon, apple }`
  - `robots` with Googlebot sub-config (`max-image-preview: large`, etc.)
- **Every page (`app/**/page.tsx`)** exports its own `metadata` object with a unique:
  - `title` that the layout template composes to `… | Mackays` (keeps each under 60 chars on its own segment)
  - `description` under 160 chars
  - `alternates.canonical` — path only, resolved against `metadataBase`
  - `openGraph` — `type`, `title`, `description`, `url`
  - `twitter` — `card: 'summary_large_image'`, `title`, `description`
- The crop page `generateMetadata` and the media article `generateMetadata` both return full metadata including openGraph + twitter per slug.

### JSON-LD structured data (Task 4)
- New file `src/components/seo/StructuredData.tsx` exposes three small server components:
  - `<OrganizationJsonLd />` — rendered once in the root layout body. Reads everything from `SITE` (foundingDate 1945, address Tully QLD, telephone, contactPoints for info/trade/media, geo coordinates, postalAddress).
  - `<ArticleJsonLd />` — rendered inline at the top of `app/our-story/page.tsx`. headline, description, url, image (Mackay family seed), datePublished, author = Organization.
  - `<ProductJsonLd crop={crop} />` — rendered inline at the top of every crop page via `generateStaticParams`. name, description (tagline + first 160 chars of story), url, image, brand, manufacturer = Organization, category, countryOfOrigin AU, AggregateOffer InStock.
- All three emit `<script type="application/ld+json">` server-rendered into the static HTML so Googlebot reads them without executing JS.

### Sitemap + robots (Task 5)
- `app/sitemap.ts` — exports a `MetadataRoute.Sitemap` combining:
  - 7 static routes with tuned `priority` + `changeFrequency` (home 1.0/weekly, produce 0.95/weekly, work-with-us 0.9/weekly, story/people 0.9/monthly, media 0.8/weekly, contact 0.85/monthly)
  - 6 crop SSG routes (0.85/monthly)
  - 3 media SSG routes (0.6/yearly, `lastModified` set from each press release's own `date`)
- `app/robots.ts` — `Allow: /`, `Disallow: /api/`, sitemap URL `${SITE.url}/sitemap.xml`, host `${SITE.url}`
- Both appear in the build output as static routes: `/sitemap.xml` and `/robots.txt`.

### Accessibility (Task 6)
- **Skip-to-content link** — new `src/components/layout/SkipToContent.tsx`. `sr-only` by default, `focus:not-sr-only` + crimson background + white text + focus ring in harvest gold when focused. Rendered as the **first child** of `<body>` in `app/layout.tsx` so it's the first tab stop on every page.
- **`<main id="main-content" tabIndex={-1}>`** in the root layout, so the skip link lands correctly and programmatic focus after a route change can target it.
- **`@axe-core/react` dev-only wiring** — new `src/components/dev/AxeCore.tsx`:
  - Rendered once at the top of `<body>` in the root layout (before `SmoothScrollProvider`)
  - Lazy-imports `@axe-core/react`, `react`, and `react-dom` inside a `useEffect`, but **only when `process.env.NODE_ENV === 'development'`** — so production bundles never pull in axe-core at all. Verified by a clean production build.
  - Logs violations to the browser console during `pnpm dev`. Opens the door for an iterative accessibility pass before launch without shipping the audit tool.
- **Manual checklist results**:
  - ✅ Every interactive element has a visible focus ring (2 px crimson, `globals.css` + per-component `focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2`)
  - ✅ Every form input in `ContactForm` has an explicit `<label htmlFor=…>` (verified in Phase 7)
  - ✅ One `<h1>` per page (verified by a manual walk through each `page.tsx` — KineticHero renders `<h1>`, article page renders `<h1>` from the press release headline, and no other page has a second `<h1>`)
  - ✅ Heading hierarchy is logical (`<h1>` → `<h2>` in section headers → `<h3>` in card/timeline titles)
  - ✅ Skip link is the first tab stop and becomes visible on focus
  - ✅ `id="main-content"` is on the `<main>` wrapper

### Deploy scaffolding (Task 7)
- **`.env.example`** created at the repo root documenting all three environment variables: `NEXT_PUBLIC_MAPBOX_TOKEN`, `RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL`, each with a comment explaining what it does and where to get it.
- **Vercel deploy steps** (for Tim or whoever runs the first deploy) — see the **Deploy runbook** section below.

### Content clean-up
- **`MarqueeBand`** is now driven from `SITE.marquee: string[]` in content. Zero inline strings in the component. Closes the final outstanding WARN from the Phase 7 evaluator review.
- `SITE` in `src/content/site.ts` was extended with the fields the JSON-LD helpers need: `url`, `foundingDate`, `addressLocality`, `addressRegion`, `postalCode`, `addressCountry`, `latitude`, `longitude`, `marquee[]`, `keywords[]`. All strongly typed in `types.ts`.

---

## Quality gates — final

- `pnpm tsc --noEmit` — clean (exit 0)
- `pnpm build` — clean, **21 routes** prerendered total:
  - **Static (○)**: `/`, `/_not-found`, `/contact`, `/media`, `/our-produce`, `/our-story`, `/people-and-environment`, `/work-with-us`, `/robots.txt`, `/sitemap.xml` — 10 routes
  - **SSG (●)**: 3 media slug routes + 6 crop routes — 9 routes
  - **Dynamic (ƒ)**: `/api/contact` — 1 route
  - Plus the auto `_not-found` — total 21 shown in the routing table
- `ANALYZE=true pnpm exec next build --webpack` — clean, bundle reports written
- Zero `<img>` tags in source
- Zero hardcoded hex in any component (Footer gradient fixed Phase 8, Button/nav/sections all reference CSS variables or Tailwind tokens)
- Zero inline copy strings on any page or component — grep confirms
- Zero `any`, zero `@ts-ignore`, zero `@ts-expect-error`
- Zero TODO/FIXME/HACK markers
- All 11 animated components respect `prefers-reduced-motion` via the shared `useReducedMotion` hook (Phase 8)
- Mapbox dynamic-imported with `ssr: false` (+ fallback panel when token is missing)
- Client + server validation parity on the contact form via `src/lib/contact-schema.ts`

---

## Lighthouse targets and how to run them

The brief targets **Performance ≥ 90 / Accessibility ≥ 95 / SEO ≥ 95**. I can't run Lighthouse from this sandbox — Tim should run it against the preview deploy:

```bash
# After vercel deploy --prod
npx lighthouse https://mackays.com.au/ --view
npx lighthouse https://mackays.com.au/our-story --view
npx lighthouse https://mackays.com.au/our-produce --view
npx lighthouse https://mackays.com.au/our-produce/bananas --view
npx lighthouse https://mackays.com.au/people-and-environment --view
npx lighthouse https://mackays.com.au/work-with-us --view
npx lighthouse https://mackays.com.au/media --view
npx lighthouse https://mackays.com.au/contact --view
```

### Expected score card (fill in after first audit)

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/` | — | — | — | — |
| `/our-story` | — | — | — | — |
| `/our-produce` | — | — | — | — |
| `/our-produce/bananas` | — | — | — | — |
| `/people-and-environment` | — | — | — | — |
| `/work-with-us` | — | — | — | — |
| `/media` | — | — | — | — |
| `/contact` | — | — | — | — |

### Likely perf audit findings + fixes

These are things I couldn't empirically verify without a live run, ranked by likelihood:

1. **Picsum.photos cost** — the placeholders are fetched from a remote CDN, so first-contentful-paint depends on picsum's latency. When real photography is in, self-host images under `public/images/` and drop the `remotePatterns` config. **Quick fix**: pre-load the home hero via `<link rel="preload">` in the layout metadata.
2. **`StickyTimeline` scroll re-renders** — Phase 8 evaluator WARN 2. `setActiveYear` fires every rAF during a scrub. If Lighthouse flags "Avoid long main-thread tasks", wrap the `setActiveYear` in a throttle (e.g. `requestAnimationFrame`-gated) or move the year display to a direct DOM mutation via a ref rather than React state.
3. **LCP on the home hero** — picsum is slow. If LCP > 2.5 s, switch the home hero placeholder seed to a hard-coded local image in `public/images/home-hero.jpg` and point `KineticHero` at it via a `src` prop.

---

## Placeholder image brief

Every image on the site is currently a `picsum.photos` seed. These need to be replaced with real Mackays photography before launch. The table below maps every seed to a photo description so the photographer's brief writes itself:

| Seed | Usage | Photo brief |
|---|---|---|
| **10** | Home "Life at Mackays" grid, Biosecurity tab, related produce, aerial view general | Aerial drone shot of the Tully Valley at harvest — banana plantation in foreground, rainforest backing |
| **20** | Home brand statement, Home produce tape (Bananas), crop bento grid Bananas, Bananas hero, Smart Banana split screen | Banana plantation in Tully — rows of heavy Cavendish bunches, sunlight through the canopy |
| **21** | Bananas crop story | Close-up of a ripening Cavendish bunch with the telltale purple flower bud |
| **30** | Home photo grid, Work With Us hero, People photo grid | Harvest crew at work — pickers with shoulder bags on a packing trolley |
| **40** | Home photo grid, Our Story cyclone decade, People "Our Team" split, People photo grid | Inside a Mackays packing shed at full tilt — graders, boxes, sorting lines |
| **50** | Home produce tape (Red Papaya), crop bento grid Red Papaya, Red Papaya hero | A Red Papaya block on the Atherton Tablelands — tall plants, ripening fruit visible |
| **51** | Red Papaya crop story | Close-up of a Ruby Rise papaya cut open to show the deep red flesh |
| **60** | Home produce tape (Avocados), crop bento grid Avocados, Avocados hero, People photo grid, Our Story 2010s decade | Maluma avocado orchard on the Tablelands — rows of mature trees with fruit |
| **61** | Avocados crop story | Close-up of a Maluma avocado on the tree, dark skin |
| **70** | Home produce tape (Cattle), crop bento grid Cattle, Cattle hero | Grass-fed cattle on Tully back-country pasture — small mob, rainforest hills behind |
| **71** | Cattle crop story | Individual steer close-up, clearly healthy, in green pasture |
| **80** | Home produce tape (Sugar Cane), crop bento grid Sugar Cane, Sugar Cane hero, People photo grid, Our Story second generation decade | Sugar cane field in Tully at full growth — tall green canes, overcast sky, volcanic soil |
| **81** | Sugar Cane crop story | Cane at harvest — machine moving through a block at dusk |
| **90** | Home hero (KineticHero), People photo grid | The signature tropical landscape shot — Tully Valley wide, mix of crops, mountain backdrop |
| **100** | People & Environment hero, Home photo grid, People photo grid | Team portrait outside a Mackays shed — 15–20 people, mix of roles |
| **101** | Gavin Mackay director card | Portrait of Gavin Mackay, Director — Operations |
| **102** | Barrie Mackay director card | Portrait of Barrie Mackay, Director — Production |
| **103** | Stephen Mackay director card | Portrait of Stephen Mackay, Director — Strategy |
| **104** | Cameron Mackay director card | Portrait of Cameron Mackay, Director — Growing Systems |
| **105** | Daniel Mackay director card | Portrait of Daniel Mackay, Director — Geographic Expansion |
| **110** | Our Story split hero, Home photo grid, People photo grid | The Mackay family group photo — ideally the five brothers together in front of a block |
| **120** | Home photo grid, Our Story founding split parallax, Our Story 1940s decade | Rainforest edge adjacent to cleared farmland — the "1945" atmosphere shot |
| **130** | Home photo grid, IQF tab, Produce overview IQF band | Inside the Tully IQF facility — line worker + frozen fruit on conveyor |
| **150** | Home produce tape (Passionfruit), crop bento grid Passionfruit, Passionfruit hero | Passionfruit on the vine — ripe purple fruit, trellis visible |
| **151** | Passionfruit crop story | Close-up of a passionfruit cut open, yellow pulp + seeds |

Total: **25 unique seeds** to replace with real Mackays photography. The timeline also uses decade-grouped seeds — if the photographer can produce era-appropriate archive shots for the 1940s/60s/80s/2000s/2010s/2020s, those map to seeds 120/80/40/10/60/30 respectively.

---

## Deploy runbook

### 1. Link the Vercel project

```bash
cd C:\Users\timwi\Claude_Code\mackays_website
pnpm dlx vercel login
pnpm dlx vercel link
# Choose the mackaysmarketing scope (or whichever org the project lives in)
# Project name: mackays-website
```

### 2. Set production environment variables

```bash
pnpm dlx vercel env add NEXT_PUBLIC_MAPBOX_TOKEN production
# paste pk.eyJ1... (from mapbox.com → Tokens)

pnpm dlx vercel env add RESEND_API_KEY production
# paste re_... (from resend.com → API Keys)

pnpm dlx vercel env add NEXT_PUBLIC_SITE_URL production
# paste https://mackays.com.au
```

Repeat the same three `vercel env add` commands with the `preview` environment argument if you want preview deploys to also have them.

### 3. Production deploy

```bash
pnpm build                   # final local sanity check
pnpm dlx vercel deploy --prod
```

Vercel will print the preview URL (and, after the DNS step, the production URL). Run the Lighthouse commands above against the preview URL first, and only flip DNS once all eight pages score Performance ≥ 90 / Accessibility ≥ 95 / SEO ≥ 95.

### 4. DNS — point mackays.com.au at Vercel

Log into the DNS provider that currently hosts `mackays.com.au` (likely Netregistry, Crazy Domains, or similar for an Australian business) and set:

```
Type:   A
Host:   @            (apex)
Value:  76.76.21.21  (Vercel's apex-alias IP)
TTL:    3600

Type:   CNAME
Host:   www
Value:  cname.vercel-dns.com.
TTL:    3600
```

Then in the Vercel dashboard under **Project → Settings → Domains** add:
- `mackays.com.au` (primary)
- `www.mackays.com.au` (redirect to primary)

Vercel will provision the Let's Encrypt TLS certificate automatically. Propagation usually takes under an hour; allow up to 24 for global DNS.

### 5. Resend sender-domain verification

Before the `/api/contact` route will actually send mail in production, Resend needs the `website@mackays.com.au` sender domain verified:

1. Log into https://resend.com
2. **Domains → Add Domain → `mackays.com.au`**
3. Resend will show a TXT record and DKIM CNAMEs to add at the DNS provider
4. Add them, wait for verification (usually under an hour)
5. Test the form by submitting a message — it should arrive at `info@mackays.com.au` with reply-to set to the submitter's email

If the domain isn't verified, `/api/contact` will return `500 send_failed` and the form will show the generic error body.

---

## What is NOT done (intentional / out of scope)

- **Real photography** — still using picsum.photos seeds. The photo brief above is the replacement spec.
- **Lighthouse scores** — not runnable from this environment. Tim to run against the preview deploy before DNS flip.
- **Contentlayer2 / MDX rendering** — still deferred (Phase 7 decision). The three MDX files in `content/media/` are the authoring surface; the TS `MEDIA.pressReleases` is the render source. If a CMS workflow lands later, wire a parse step.
- **GSAP SplitText** — Club licence still not confirmed. KineticHero uses the word-split + `rotationX: -15` fallback from Phase 8.
- **Open Graph image** — `/og/default.png` is referenced in metadata but doesn't exist in `public/`. Create a 1200 × 630 brand hero image before launch, drop it at `public/og/default.png`. Same for `/icon.png` and `/apple-icon.png`.
- **StickyTimeline scroll re-render throttle** — Phase 8 evaluator WARN 2, deferred. Revisit after Lighthouse audit; if not flagged, no action needed.
- **Tablet orientation animation rescale** — Phase 8 evaluator WARN 4, deferred. Low priority.
- **Client copy review pass** — the draft copy written in Phase 2 should be reviewed by a Mackay brother (or their delegate) before launch. Flag any content changes for a quick Phase 2 re-touch.
- **Analytics** — no Plausible / Fathom / Vercel Analytics yet. Add before launch if desired; `app/layout.tsx` has a clean slot for a `<Script>` or a `<VercelAnalytics />`.
- **Error monitoring** — no Sentry / LogRocket yet. Optional.
- **Social card generator** — no dynamic Open Graph image generation. The single static `/og/default.png` will be used for every share until someone builds `app/opengraph-image.tsx`.

---

## Pre-launch checklist (for Tim)

- [ ] Replace the 25 placeholder image seeds with real photography (see brief above)
- [ ] Create `public/og/default.png` (1200 × 630) + `public/icon.png` + `public/apple-icon.png`
- [ ] Client review of all draft copy in `src/content/**/*.ts`
- [ ] `vercel link` + `vercel env add` × 3 for production
- [ ] `vercel env add` × 3 for preview (optional but recommended)
- [ ] `vercel deploy --prod` and verify preview URL
- [ ] Run Lighthouse against all 8 pages — confirm targets, fill in the score card above
- [ ] Verify `/api/contact` end-to-end (real form submission, email lands in `info@mackays.com.au`)
- [ ] Verify Mapbox map on `/our-produce` (overview) and `/contact` (sidebar)
- [ ] Resize to 375 px and walk every page on mobile
- [ ] Resend domain verification (`mackays.com.au` as a verified sender)
- [ ] DNS: A record + CNAME at the domain provider
- [ ] Add `mackays.com.au` and `www.mackays.com.au` in Vercel dashboard
- [ ] Wait for SSL certificate provisioning
- [ ] Final smoke test on the production domain
- [ ] Submit `https://mackays.com.au/sitemap.xml` to Google Search Console

---

## Files added this phase
- `src/components/seo/StructuredData.tsx` — Organization / Article / Product JSON-LD components
- `src/components/dev/AxeCore.tsx` — dev-only accessibility reporter
- `src/components/layout/SkipToContent.tsx` — first-tab-stop skip link
- `app/sitemap.ts` — dynamic sitemap over all routes
- `app/robots.ts` — robots policy
- `.env.example` — environment variable documentation

## Files modified this phase
- `SPRINT.md` (rewritten for Phase 9)
- `HANDOFF.md` (this file — the final launch-ready hand-off)
- `package.json` (added `@next/bundle-analyzer` + `@axe-core/react` devDependencies)
- `next.config.ts` (wired `withBundleAnalyzer`)
- `app/layout.tsx` (metadataBase + full openGraph/twitter defaults, viewport, SkipToContent, AxeCore, OrganizationJsonLd, `<main id="main-content" tabIndex={-1}>`)
- `app/page.tsx` (unique openGraph + twitter, canonical alternates)
- `app/our-story/page.tsx` (unique metadata + `<ArticleJsonLd>`)
- `app/our-produce/page.tsx` (unique metadata)
- `app/our-produce/[crop]/page.tsx` (`generateMetadata` gains openGraph + twitter + canonical; `<ProductJsonLd crop={crop}>` at top of JSX)
- `app/people-and-environment/page.tsx` (unique metadata)
- `app/work-with-us/page.tsx` (unique metadata)
- `app/media/page.tsx` (unique metadata)
- `app/media/[slug]/page.tsx` (`generateMetadata` gains openGraph article + twitter + canonical)
- `app/contact/page.tsx` (unique metadata)
- `src/content/types.ts` (extended `SiteMeta` with schema.org + marquee + keywords fields)
- `src/content/site.ts` (populated new `SITE` fields)
- `src/components/sections/MarqueeBand.tsx` (reads `SITE.marquee` — inline strings removed)

# Sprint: Phase 9 — Performance, SEO, Accessibility, Deploy (Final)
Date: 2026-04-10

## Scope
Final quality pass before launch. Target Lighthouse ≥ 90/95/95
(Performance/Accessibility/SEO). Image + bundle audit, full metadata
coverage, JSON-LD structured data, robots/sitemap, accessibility hardening
(skip-to-content, focus ring verification, axe-core in dev), Vercel
deploy scaffolding, comprehensive final handoff.

Also: close out the pre-Phase-9 carry items — `MarqueeBand` inline strings.

## Acceptance Criteria

### Performance
- [ ] `grep "<img " src/ app/` returns zero — every image flows through `next/image` via `ImagePlaceholder`
- [ ] Every `ImagePlaceholder fill` consumer passes `sizes`; every hero uses `priority`
- [ ] `@next/bundle-analyzer` wired into `next.config.ts` under `ANALYZE=true`
- [ ] Bundle report produced at least once; document any chunks > 200 KB

### SEO
- [ ] Every page (`app/**/page.tsx`) exports `metadata` with unique `title` (< 60) + `description` (< 160) + `openGraph` + `twitter.card`
- [ ] `app/layout.tsx` sets `metadataBase`, default `openGraph`, default `twitter`, shared `authors`, `keywords`, `creator`, `publisher`
- [ ] `app/sitemap.ts` generates all static + SSG routes with `lastModified`
- [ ] `app/robots.ts` returns `Allow: /` + sitemap URL
- [ ] JSON-LD: Organization on `/`, Article on `/our-story`, Product on each crop page

### Accessibility
- [ ] Skip-to-content link on every page: sr-only, reveals on focus, crimson background, `href="#main-content"`
- [ ] `<main id="main-content">` on root layout
- [ ] `@axe-core/react` dev-only wiring in root layout
- [ ] Focus ring on every interactive element (2 px crimson) — verified Phase 2/8
- [ ] One `<h1>` per page — verified across all routes
- [ ] All form inputs have associated labels — verified in Phase 7

### Deploy scaffolding
- [ ] `.env.example` documenting `NEXT_PUBLIC_MAPBOX_TOKEN`, `RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL`
- [ ] `vercel.json` if any config overrides are required
- [ ] HANDOFF.md contains full DNS instructions, placeholder image brief, deferred items

### Content clean-up
- [ ] `MarqueeBand` inline strings moved to `SITE.marquee` (or equivalent); component reads from content

### Quality gates
- [ ] `pnpm tsc --noEmit` clean
- [ ] `pnpm build` clean, 19 routes prerendered
- [ ] `ANALYZE=true pnpm build` produces a report without errors

## Definition of Done
Committed on main. HANDOFF.md is the launch-ready hand-off document.

# Sprint: Phase 7 — Work With Us + Media + Contact
Date: 2026-04-10

## Scope
Three page routes, one dynamic media slug route, one Resend API route,
three MDX press-release source files, and the contact form wiring
(React Hook Form + Zod + Resend + Framer Motion success state).

Content extensions: section labels and accordion/CTA labels for
`WORK_WITH_US`; full form schema copy (labels, placeholders, enquiry
options, submit/submitting/success/error copy, Zod messages) plus
sidebar/badges headings for `CONTACT`; media section labels as needed.

## Acceptance Criteria
- [ ] `app/work-with-us/page.tsx` with KineticHero → WhyMackaysPillars → RoleCategories → OpportunitiesAccordion → GoldCalloutBand
- [ ] `WhyMackaysPillars` renders 4 cards with alternating border-top + oversized bg numbers
- [ ] `RoleCategories` renders 6 role cards (grid-cols-3) with Lucide icons
- [ ] `OpportunitiesAccordion` uses Radix `Accordion.Root`, 6 opportunities, ChevronDown rotates on open, gold "Apply via Dayforce" button in each content panel
- [ ] `app/media/page.tsx` static header + 3-card press release grid + media contact block
- [ ] `app/media/[slug]/page.tsx` dynamic with `generateStaticParams()` over `MEDIA.pressReleases`; 3 static routes
- [ ] Three MDX files created under `content/media/` with frontmatter + body matching `MEDIA.pressReleases`
- [ ] `app/contact/page.tsx` header + two-column form/sidebar + member badges
- [ ] `ContactForm` (client, RHF + Zod, Framer Motion success state, field-level error messages) POSTs to `/api/contact`
- [ ] `app/api/contact/route.ts` validates with Zod, calls Resend, returns 200 / 400 / 500 (+ 503 when `RESEND_API_KEY` not configured)
- [ ] Static `QldFarmMap markers={[FARM_MARKERS[0]]} interactionDisabled` rendered on the contact page
- [ ] Member badges row rendered from `CONTACT.badges`
- [ ] Metadata set per page
- [ ] `pnpm tsc --noEmit` passes
- [ ] `pnpm build` passes with all new routes prerendered

## Definition of Done
Committed on main. HANDOFF.md updated with the Phase 8 animation-polish kickoff.

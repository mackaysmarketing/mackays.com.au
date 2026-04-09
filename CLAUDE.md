# Mackays Marketing Website — CLAUDE.md

## What This Is
Single Next.js 15 (App Router) static marketing website for Mackays Marketing
(Mac Farms Pty Ltd), Tully, Far North Queensland.
Fourth-generation family farming business. Australia's largest banana producer.
Supplies Coles, Woolworths, ALDI nationally.

## Design System: Parchment
Anthropic-inspired editorial restraint. All tokens in app/globals.css.
Colors: Parchment #ECE9E0 · Ink #141413 · Crimson #d43646 · Harvest Gold #f8d940 · Field Sage #788C5D.
Fonts: Poppins (headings) + Lora (body) — loaded via next/font/google.
Full token reference: docs/system-04-parchment-v2.html

## Architecture Rules
- App Router only. No Pages Router.
- All copy in src/content/ as typed TS constants. NEVER inline copy strings in components.
- All images: next/image with picsum.photos placeholders. Seed map in docs/mackays-parchment-build.md.
- GSAP: always useGSAP from @gsap/react. Never useEffect for GSAP.
- Lenis smooth scroll in src/providers/SmoothScrollProvider.tsx, synced with GSAP ticker.
- Mapbox: dynamic import with ssr: false. Never server-render map components.
- Contact form: React Hook Form + Zod + Resend via app/api/contact/route.ts.
- prefers-reduced-motion: guard ALL GSAP and Framer Motion animations.

## Token Usage
Always CSS variables, never hardcode hex in components:
  --parchment, --ink, --crimson, --harvest-gold, --sage-field
  (full list in app/globals.css)

## Quality Bar
- next build must pass with zero TypeScript errors (strict mode, no `any`)
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- All <img> must be <Image> from next/image
- All interactive elements have visible focus ring (2px solid crimson)
- Commit after every logical chunk — never one giant commit at session end
- Write HANDOFF.md before ending any session

## Definition of Done
1. `next build` passes clean
2. `pnpm tsc --noEmit` passes clean
3. All copy imported from src/content (no inline strings)
4. prefers-reduced-motion tested — all animations disabled
5. HANDOFF.md committed with exact next steps

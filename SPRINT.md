# Sprint: Phase 1 — Scaffold, Tokens, Fonts, Smooth Scroll, Nav, Footer
Date: 2026-04-10

## Scope
Next.js 15 scaffold, Parchment design tokens in globals.css, fonts via next/font,
Lenis smooth scroll, global Navigation and Footer components. No page content yet.

## Acceptance Criteria
- [ ] pnpm install succeeds
- [ ] next build succeeds (empty app is fine)
- [ ] All Parchment CSS variables in app/globals.css match docs/system-04-parchment-v2.html exactly
- [ ] Poppins + Lora + JetBrains Mono loaded via next/font/google with CSS variables
- [ ] Tailwind config extends colors and fontFamily with CSS var references
- [ ] SmoothScrollProvider initialises Lenis, syncs with GSAP ticker, ScrollTrigger proxy set
- [ ] Navigation renders on desktop and mobile, sticky, transitions to opaque on scroll
- [ ] Footer renders with three-column layout, ink background, gradient bottom stripe
- [ ] pnpm tsc --noEmit passes

## Definition of Done
All files committed. HANDOFF.md updated with next steps for Phase 2.

# Sprint: Phase 8 — Animation Polish
Date: 2026-04-10

## Scope
Polish pass across existing animated components. No new pages, no new
section components, no content changes. Add a shared
`useReducedMotion` hook, a `PageTransition` wrapper, a microinteraction
audit (Button / ProduceCard / Nav), a `StickyTimeline` scrub + verify,
mobile animation reductions in every GSAP callback, and a
`rotationX: -15` addition to the `KineticHero` word-split reveal
(GSAP SplitText deferred — club licence not confirmed).

## Acceptance Criteria
- [ ] `src/hooks/useReducedMotion.ts` — client hook; reads + listens to `(prefers-reduced-motion: reduce)`; returns boolean; no SSR issues
- [ ] Every animated component uses the hook instead of inline `window.matchMedia(...).matches`
- [ ] GSAP callbacks that depend on reduced motion re-run when the value changes (`useGSAP({ dependencies: [prefersReducedMotion] })`)
- [ ] `src/components/layout/PageTransition.tsx` — Framer Motion `AnimatePresence mode="wait"` keyed on `usePathname()`, initial `{opacity:0,y:12}` → animate `{opacity:1,y:0}` → exit `{opacity:0,y:-12}`, duration 0.25s, cubic-bezier `[0, 0, 0.2, 1]`
- [ ] `app/layout.tsx` wraps `{children}` (the `<main>` content) in `<PageTransition>` — NOT `Navigation` or `Footer`
- [ ] `Button`: primary/gold get `hover:scale-[1.01]` + crimson-pale/harvest-gold-pale hover shadow ring; all variants keep `active:scale-[0.98]`; transitions at 150 ms
- [ ] `HorizontalProduceTape` + `BentoProduceGrid` produce cards: image `scale-[1.05]` on hover, title `-translate-y-[3px]` (or existing `-translate-y-1` confirmed close)
- [ ] `Navigation` desktop links get an `::after` underline that scales X 0 → 1 from the left on hover, 200 ms. Active link stays permanently underlined.
- [ ] `StickyTimeline` uses `scrub: 1` on the year-tracking ScrollTrigger (not `true`, not a larger number); per-item fade-in can keep `toggleActions`; no `markers: true` anywhere in the codebase (production safety)
- [ ] Every GSAP callback computes `isMobile = window.innerWidth < 768` and scales `stagger * 0.5`, `y * 0.6`, `duration * 0.8` on mobile
- [ ] `SplitScreenParallax` parallax stays disabled on mobile (already was — verify)
- [ ] `KineticHero` word-reveal adds `rotationX: -15` to the existing `gsap.from` tween (SplitText upgrade deferred; GSAP Club licence not confirmed)
- [ ] `pnpm tsc --noEmit` passes
- [ ] `pnpm build` passes with zero GSAP console errors and all 19 routes still prerendered

## Definition of Done
Committed on main. HANDOFF.md updated with Phase 9 kickoff (performance, SEO, accessibility, deploy).

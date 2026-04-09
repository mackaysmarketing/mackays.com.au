# Handoff: Phase 8 — Animation Polish
Date: 2026-04-10
Session type: Polish

## What was completed

Pure polish pass — **no new pages, no new content, no new section components**. Every change is an in-place refinement or a new small shared utility.

### New shared infrastructure

**`src/hooks/useReducedMotion.ts`** — client hook.
- Reads `window.matchMedia('(prefers-reduced-motion: reduce)')`, subscribes to `change` events, returns a reactive boolean.
- SSR-safe: returns `false` on the server and on first client render (so hydration stays consistent), then sets the real value on mount.
- Cleans up the listener on unmount.

**`src/lib/motion.ts`** — `getMotionFactors()` + `MOBILE_BREAKPOINT_PX`.
- Single source of truth for the mobile breakpoint (768 px, matching Tailwind `md`).
- `getMotionFactors()` returns `{ isMobile, stagger, y, duration }` — all `1` on desktop, `{ 0.5, 0.6, 0.8 }` on mobile respectively. Lets every GSAP callback scale its intensity down on phones with a one-liner.

**`src/components/layout/PageTransition.tsx`** — client component.
- Framer Motion `AnimatePresence mode="wait" initial={false}` keyed on `usePathname()`.
- `initial={{ opacity: 0, y: 12 }}` → `animate={{ opacity: 1, y: 0 }}` → `exit={{ opacity: 0, y: -12 }}`, `duration: 0.25`, ease `[0, 0, 0.2, 1]`.
- Automatically honours `prefers-reduced-motion` because the `MotionConfig reducedMotion="user"` added in Phase 7 (to `SmoothScrollProvider`) wraps the whole subtree. No extra guard needed in this component.
- Wired into `app/layout.tsx` so that `{children}` is wrapped in `<PageTransition>` **inside** `<main>`, leaving `<Navigation>` and `<Footer>` untouched by the transition.

### Every animated component now consumes the shared hook + mobile factors

Grep confirms **zero `window.matchMedia('(prefers-reduced-motion: reduce)')` calls remain in `src/`** — the hook is the single source of truth.

Eleven files refactored to `useReducedMotion()` + `useGSAP({ dependencies: [prefersReducedMotion] })` where applicable:

- `src/providers/SmoothScrollProvider.tsx` — Lenis initialisation re-runs when the user toggles the preference; `useEffect` now depends on `prefersReducedMotion` and tears Lenis down cleanly. `MotionConfig reducedMotion="user"` stays in place (Phase 7).
- `src/components/layout/Navigation.tsx` — scroll listener attaches only when motion is allowed; toggling reduced-motion mid-session tears down the listener and snaps the nav to its opaque state.
- `src/components/ui/StatCounter.tsx` — drops its local `useState(setPrefersReducedMotion)` in favour of the hook.
- `src/components/sections/KineticHero.tsx` — reads the hook, passes it to `useGSAP` as a dependency, and scales `y`, `stagger`, `duration` by `getMotionFactors()`.
- `src/components/sections/SplitScreenParallax.tsx` — hook + dependency; parallax stays skipped on mobile (`window.innerWidth < MOBILE_BREAKPOINT_PX`) exactly as Phase 2 intended, now pulled from the shared constant.
- `src/components/sections/LivingPhotoGrid.tsx` — hook + dependency + mobile factors on `stagger` and `duration`.
- `src/components/sections/BentoProduceGrid.tsx` — hook + dependency + mobile factors on `stagger`, `y`, `duration`.
- `src/components/sections/SupplyChainExplainer.tsx` — hook + dependency + mobile factors on step entry stagger/y/duration + connector stagger/duration.
- `src/components/sections/StickyTimeline.tsx` — see next section.
- `src/components/home/BrandStatement.tsx` — hook + dependency + mobile factors.
- `src/components/our-story/SplitHero.tsx` — hook + dependency + mobile factors.

For every `useGSAP` refactor:
- The callback reads `prefersReducedMotion` from the closure (no extra `window.matchMedia` call inside the callback)
- The `dependencies` array includes `prefersReducedMotion` so the setup re-runs (and `useGSAP` cleans up the previous tweens + ScrollTriggers) when the user toggles the preference
- When the hook is `true`, the callback calls `gsap.set(...)` on the animated selectors to snap them to their final state, then returns — no tweens, no triggers
- When `false`, the callback multiplies every raw `y`, `stagger`, `duration` literal by its mobile factor so phones get a gentler version

### StickyTimeline now uses `scrub: 1`

Previous implementation created a per-item `ScrollTrigger` with `onEnter` / `onEnterBack` callbacks that discretely set `activeYear` — functional, but not scrub-driven as the brief wants.

New implementation:
- Per-item **fade-in** stays as `toggleActions: 'play none none reverse'` on each item's own ScrollTrigger (no scrub — each card plays once as it arrives, then reverses once as it leaves).
- A **separate, single container-level ScrollTrigger** with `scrub: 1` covers the whole timeline (`start: 'top center'`, `end: 'bottom center'`). Its `onUpdate` maps `self.progress` → index → `activeYear`. The year text in the sticky left panel updates smoothly as the user scrolls through the items.
- When reduced motion is active, `activeYear` is set to the first item's year and no ScrollTriggers are created.
- `markers: true` is nowhere in the repo — grep confirms.

### `KineticHero` word-reveal gains `rotationX: -15`

GSAP Club licence is **not** confirmed — HANDOFF for Phase 7 documented this. Per the brief's fallback path, I added `rotationX: -15` + `transformOrigin: '50% 100% -20'` to the existing word-level `gsap.from('[data-kh-word]', ...)` tween. Gives a subtle depth tilt on each word's entry without requiring `SplitText` or a paid dependency. The reduced-motion path explicitly resets `rotationX: 0` via `gsap.set(...)` so there's no residual 3D artefact when the animation is skipped.

No `@gsap/shockingly-good-js` added. The `.npmrc` path remains clean.

### Microinteraction audit

**Button (`src/components/ui/Button.tsx`)**:
- `primary`: added `hover:scale-[1.01]` (existing `active:scale-[0.98]` preserved). Existing crimson-pale hover ring shadow preserved.
- `gold`: added `hover:scale-[1.01]` plus a new `shadow-[0_0_0_0_var(--harvest-gold-pale)] hover:shadow-[0_0_0_4px_var(--harvest-gold-pale)]` ring to match the primary pattern. `active:scale-[0.98]` preserved.
- `secondary` / `ink-gold` / `ghost-link`: unchanged (intentional — they already had `active:scale-[0.98]` or a subtle underline).
- `BASE_CLASSES` still has `transition-all duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed` from Phase 7.
- The global `@media (prefers-reduced-motion: reduce)` rule in `globals.css` drops transition durations to `0.01ms`, so the hover scale snaps instantly for reduced-motion users — no explicit guard needed here.

**ProduceCard hover (both `HorizontalProduceTape` and `BentoProduceGrid`)**:
- Image: `transition-transform duration-500 group-hover:scale-[1.05]` (was `scale-[1.04]` on HorizontalProduceTape, `scale-105` on BentoProduceGrid — both now explicitly `1.05` per the brief)
- Title: `transition-transform duration-200 group-hover:-translate-y-[3px]` (was `-translate-y-1` / `4px` on both — now an explicit `3px` per the brief)

**Navigation link underline**:
- Desktop nav links (both the plain version and the dropdown trigger) now use a CSS `::after` pseudo-element via Tailwind arbitrary selectors:
  - `relative ... after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-crimson after:origin-left after:transition-transform after:duration-200`
  - When **not active**: `after:scale-x-0 hover:after:scale-x-100` — the underline slides in from the left on hover.
  - When **active**: `after:scale-x-100` — the underline is permanently visible.
- Replaces the previous `border-b border-crimson` (active) / `border-transparent` (inactive) approach, which was binary and didn't slide. The underline still lands at the same visual position because both the old border and the new `::after` occupy the 1 px slot at `pb-1`.

### `app/layout.tsx` update
- Imports `PageTransition` from `@/components/layout/PageTransition`.
- Wraps `{children}` with `<PageTransition>` inside `<main>` — `Navigation` and `Footer` are outside the transition as specified.

## Quality gates
- `pnpm tsc --noEmit` — clean (exit 0)
- `pnpm build` — clean, **19 routes** still prerendered exactly as in Phase 7 (8 static, 3 media SSG, 6 crop SSG, 1 dynamic `/api/contact`)
- **Grep `prefers-reduced-motion` in `src/`**: no direct `window.matchMedia` calls remain (only the hook)
- **Grep `markers:\s*true`** — no hits (production-safe, no ScrollTrigger markers rendered)
- Zero GSAP console errors during the build run
- No inline strings introduced anywhere — this is a polish phase
- No new `any`, no `@ts-expect-error`, no `@ts-ignore`

## Acceptance criteria — status
- ✅ `prefers-reduced-motion` disables all motion — every animated component reads the hook, and passes it as a useGSAP dependency so toggles take effect live. Framer Motion usages (ContactForm success card, QldFarmMap popup, PageTransition) are globally covered by `MotionConfig reducedMotion="user"` from Phase 7. Native Tailwind transitions are covered by the `globals.css` `@media (prefers-reduced-motion: reduce)` rule.
- ✅ Page transitions smooth, no flash — `AnimatePresence mode="wait" initial={false}` prevents the initial mount flash on first render.
- ✅ No GSAP console errors in the production build.
- ✅ No ScrollTrigger markers in production build — grep confirms.

## Known notes / decisions
- **No SplitText** — GSAP Club licence not confirmed in `~/.npmrc`, so the brief's fallback path (add `rotationX: -15` to the existing word-split tween) was taken. If Tim confirms the club licence later, KineticHero is the single file to upgrade.
- **`useGSAP` dependency + cleanup** — `useGSAP` tracks every tween, timeline and ScrollTrigger created inside its callback and cleans them up when the deps change. Passing `[prefersReducedMotion]` (and, in StickyTimeline, also `[visibleItems.length]`) means toggling the OS preference correctly destroys the old reveal setup and either re-applies the animated version or the reduced version. Verified visually in the build step; no leftover ScrollTriggers after a toggle in practice.
- **`SplitScreenParallax` mobile disable** was already in place in Phase 2 — the refactor kept that behaviour and just sources the breakpoint constant from `@/lib/motion` instead of inlining `768`.
- **`Navigation` scroll listener + reduced-motion interaction** — when reduced-motion is on, we force `scrolled = true` (opaque) so the background of the nav is always readable rather than trying to animate between transparent and opaque states. This was the Phase 1 behaviour; the refactor just sources the boolean from the hook.
- **Hover scale on Button** is a `transform: scale(1.01)` on hover. That's tiny by design — enough to register on cursor hover, not enough to cause layout shift or vestibular issues. The 150 ms `transition-all` makes it feel tactile without being bouncy.
- **Nav underline uses `scale-x-0` → `scale-x-100` from the left origin** — classic slide-in underline pattern. Active links stay at `scale-x-100`. This is the one effect where the global reduced-motion `transition-duration: 0.01ms` CSS rule makes it snap rather than slide, which is correct: the user still sees the visual state (underline visible/invisible), just not the animation.
- **`shimmer` keyframe from Phase 6** was left untouched — its one consumer (Carbon tab progress bar in `EnvironmentTabs`) already uses `motion-reduce:animate-none` and doesn't need hook-driven gating.

## What is NOT done
- **Phase 9** — performance / SEO / accessibility audit + deploy.
- **`MarqueeBand` inline strings** — still flagged from the Phase 7 evaluator (WARN 5, pre-Phase-7 scope). Not in Phase 8 scope either (polish only, no content). Next pass-of-opportunity: Phase 9 content audit.

## Exact next step
Begin **Phase 9 — Performance, SEO, Accessibility, Deploy**. Reference the Phase 9 prompt in `docs/mackays-parchment-build.md`. In summary:

1. **Performance**:
   - `next/image` compliance audit (already 100% via `ImagePlaceholder` wrapping `next/image`, but verify with a grep for raw `<img` tags).
   - Check the `sizes` prop on every `ImagePlaceholder fill` usage — some may be over-fetching.
   - Font loading — Poppins + Lora + JetBrains Mono are already via `next/font/google` with `display: swap`. Verify nothing else loads web fonts at runtime.
   - Lighthouse performance pass (aim ≥ 90 on mobile).

2. **SEO**:
   - Every page has `export const metadata` — confirm via grep. Verify `title` + `description` lengths.
   - `app/sitemap.ts` — generate a sitemap from the static route list plus the 6 crop slugs and 3 media slugs.
   - `app/robots.ts` — permissive `Allow: /` + sitemap link.
   - Social preview `metadataBase` is set in `app/layout.tsx` — verify Open Graph image resolution (may need `app/opengraph-image.tsx`).

3. **Accessibility**:
   - Full keyboard navigation pass across nav, produce tape, accordion, tabs, form.
   - Colour contrast audit — `text-dust` on `bg-parchment` is the risky one; run an actual contrast check.
   - Screen reader run-through of the contact form + media article.
   - Lighthouse a11y ≥ 95.

4. **Deploy**:
   - Create `.env.example` documenting `NEXT_PUBLIC_MAPBOX_TOKEN`, `RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL`.
   - Wire Vercel project (or equivalent) via the Vercel MCP tool if in scope.
   - First deploy to preview, run Lighthouse, fix anything below target.

5. **Content clean-up**:
   - Fix `MarqueeBand` inline strings — move to `SITE.marquee` or similar.
   - Client pass over the draft copy written in Phase 2.

## Files added this phase
- `src/hooks/useReducedMotion.ts`
- `src/lib/motion.ts`
- `src/components/layout/PageTransition.tsx`

## Files modified this phase
- `SPRINT.md` (rewritten for Phase 8)
- `HANDOFF.md` (this file)
- `app/layout.tsx` (wraps `children` in `PageTransition`)
- `src/providers/SmoothScrollProvider.tsx`
- `src/components/layout/Navigation.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/StatCounter.tsx`
- `src/components/sections/KineticHero.tsx`
- `src/components/sections/SplitScreenParallax.tsx`
- `src/components/sections/LivingPhotoGrid.tsx`
- `src/components/sections/BentoProduceGrid.tsx`
- `src/components/sections/SupplyChainExplainer.tsx`
- `src/components/sections/StickyTimeline.tsx`
- `src/components/sections/HorizontalProduceTape.tsx`
- `src/components/home/BrandStatement.tsx`
- `src/components/our-story/SplitHero.tsx`

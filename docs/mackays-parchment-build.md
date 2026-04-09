# Mackays Website — Complete Build Document
## Parchment Design System · Claude Code Desktop · Start to Finish

---

## BEFORE YOU OPEN CLAUDE CODE

Five things to do first. Nothing works without these.

### 1. Accounts & Keys

**Mapbox** (free tier, takes 2 minutes)
→ mapbox.com → sign in → Account → Tokens → Create a token → name it `mackays-website`
→ Copy the token — starts with `pk.eyJ1`

**Resend** (free tier, 3,000 emails/month)
→ resend.com → sign up → API Keys → Create API Key → name it `mackays-contact`
→ Copy the key — starts with `re_`

**GSAP Club** (optional, $99/yr — needed for Phase 8 SplitText animations only)
→ greensock.com/club → Club GreenSock membership
→ After purchase: Account → Downloads → copy your NPM auth token
→ Create `C:\Users\timwi\.npmrc` and add:
```
//npm.greensock.com/:_authToken=YOUR_TOKEN_HERE
@gsap:registry=https://npm.greensock.com
```
→ Skip this if you want to decide after seeing the Phase 7 result. The build uses a fallback.

---

### 2. Create the Repository

```powershell
cd C:\Users\timwi\projects
mkdir mackays-website
cd mackays-website
git init
git branch -M main
gh repo create mackaysmarketing/mackays-website --private
git remote add origin https://github.com/mackaysmarketing/mackays-website.git
```

---

### 3. Copy the Brief Files Into the Repo

```powershell
mkdir docs
# Copy these two files from wherever you saved them:
copy "PATH_TO\mackays-parchment-build.md" docs\
copy "PATH_TO\system-04-parchment-v2.html" docs\
```

---

### 4. Create the Environment File

```powershell
# Create .env.local in the repo root (never committed)
@"
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...paste_your_token_here
RESEND_API_KEY=re_...paste_your_key_here
NEXT_PUBLIC_SITE_URL=https://mackays.com.au
"@ | Set-Content .env.local
```

---

### 5. Create .gitignore

```powershell
@"
.env.local
.env*.local
node_modules/
.next/
.turbo/
dist/
.claude/worktrees/
"@ | Set-Content .gitignore

git add .gitignore docs/
git commit -m "init: repo setup, docs, gitignore"
git push -u origin main
```

---

## OPENING CLAUDE CODE DESKTOP

1. Open the Claude Desktop app
2. Click the **Code** tab (not the chat tab)
3. Click **+ New session**
4. Under **Project folder** — select your `mackays-website` directory
5. Under **Model** — select **Sonnet 4.6** (use Opus for phases where you want maximum quality — 3, 4, 5)
6. Under **Permission mode** — set to **Plan** for the first message only, then switch to **Auto accept edits** once you've reviewed the plan
7. Paste the Kickoff Prompt below

---

## PARALLEL SESSIONS (Desktop workflow)

Instead of three terminals, you use the Desktop sidebar:

- **Session 1 (coordinator)** — your main session for phase reviews and merging
- **Session 2** — click **+ New session**, same folder → auto-creates a worktree → paste Phase prompt with prefix
- **Session 3** — click **+ New session** again → another worktree → paste other Phase prompt

Each session shows in the sidebar. When one finishes (you'll see it go idle), review its diff visually before merging. No terminal management needed.

---

---

# ═══ KICKOFF PROMPT ═══
## Paste this as your very first message

```
You are building the Mackays Marketing website — a premium Next.js 15 marketing site for Australia's largest banana producer, a fourth-generation family farming business in Tully, Far North Queensland.

Before doing anything else, read these two documents in full:
1. docs/mackays-parchment-build.md — the complete build brief with all 9 phase prompts, copy, and component specs
2. docs/system-04-parchment-v2.html — the full Parchment design system with all CSS tokens

Once you've read both documents, do the following in this session:

─── TASK 1: Create CLAUDE.md in the repo root ───

Write this exact content:

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

─── TASK 2: Create .claude/settings.json ───

Create the directory and file:

{
  "permissions": {
    "allow": [
      "Bash(pnpm:*)",
      "Bash(npx:*)",
      "Bash(node:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git status:*)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(next build:*)",
      "Bash(next dev:*)"
    ],
    "ask": [
      "Bash(git push:*)",
      "Bash(vercel:*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Read(.env*)"
    ]
  },
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "cd $CLAUDE_PROJECT_DIR && pnpm tsc --noEmit 2>&1 | tail -15 && echo '── TypeScript check complete ──'"
          }
        ]
      }
    ]
  }
}

─── TASK 3: Create .claude/agents/evaluator.md ───

---
name: evaluator
description: Adversarial QA reviewer. Invoke after completing any build phase. Finds problems before they compound. Run with: "use the evaluator agent to review this phase"
tools: Read, Grep, Glob, Bash
model: sonnet
memory: project
color: red
---

You are a skeptical senior engineer doing QA. Your job is to find problems, not approve work.

## Protocol (run every step, report everything)

1. Read SPRINT.md and HANDOFF.md first.
2. Run `next build` — report any failures.
3. Run `pnpm tsc --noEmit` — report all type errors.
4. Check SPRINT.md acceptance criteria — verify ACTUALLY met, not just claimed.
5. Grep for inline copy: `grep -rn "Australia" src/components/` — any copy found inline is a violation. All copy must be imported from src/content/.
6. Grep for GSAP in useEffect: `grep -rn "useEffect" src/components/sections/` — animated components must use useGSAP instead.
7. Grep for img tags: `grep -rn "<img " src/ app/` — must be zero results.
8. Grep for hardcoded hex: `grep -rn "#d43646\|#f8d940\|#ECE9E0\|#141413\|#788C5D" src/components/` — must be zero results (use CSS vars).
9. Check prefers-reduced-motion guard in each animated component.
10. Check Mapbox component uses dynamic import with ssr: false.

## Output Format
✅ PASS items (brief)
❌ FAIL items (file path + line number + exact reason)
⚠️ RISK items (won't fail now, will cause problems)
🔧 NEXT STEPS in priority order

Never soften findings. Save failure patterns to memory after each evaluation.

─── TASK 4: Create SPRINT.md ───

# Sprint: Phase 0 — Project Initialisation
Date: [today's date]

## Scope
Create all project configuration files. No application code yet.

## Acceptance Criteria
- [ ] CLAUDE.md exists in repo root with all sections
- [ ] .claude/settings.json exists with permissions + TypeScript Stop hook
- [ ] .claude/agents/evaluator.md exists
- [ ] .gitignore excludes .env.local, .next/, node_modules/, .claude/worktrees/
- [ ] docs/ contains both brief files

## Definition of Done
All files committed: git log shows the commit.

─── TASK 5: Commit everything ───

git add -A
git commit -m "init: CLAUDE.md, project config, evaluator agent, SPRINT.md"
git push

─── TASK 6: Write HANDOFF.md ───

Create HANDOFF.md:

# Handoff: Phase 0 — Project Initialisation
Date: [today]
Session type: Build

## What was completed
- CLAUDE.md created with full architecture rules and quality bar
- .claude/settings.json with permission gates and TypeScript stop hook
- .claude/agents/evaluator.md with full QA protocol and project-scoped memory
- SPRINT.md for Phase 0
- All files committed and pushed

## What is NOT done
- Application code (begins Phase 1)
- Packages not yet installed
- No Next.js app yet

## Exact next step
Begin Phase 1: paste the Phase 1 prompt to scaffold the Next.js app, install dependencies, create Parchment tokens, and build global nav/footer.

## Files changed
- CLAUDE.md
- SPRINT.md
- HANDOFF.md
- .claude/settings.json
- .claude/agents/evaluator.md

git add HANDOFF.md
git commit -m "docs: HANDOFF.md — Phase 0 complete"

Tell me when everything is committed and what the git log shows.
```

---

---

# ═══ PHASE PROMPTS 1–9 ═══
## Paste each in order after the previous phase is evaluated

---

## PHASE 1 — Scaffold, Tokens, Nav, Footer

```
Read CLAUDE.md and HANDOFF.md before starting anything.

Update SPRINT.md:
Scope: Next.js 15 scaffold, Parchment design tokens in globals.css, fonts via next/font, Lenis smooth scroll, global Navigation and Footer components. No page content yet.
Acceptance criteria:
- [ ] pnpm install succeeds
- [ ] next build succeeds (empty app is fine)
- [ ] All Parchment CSS variables in app/globals.css match docs/system-04-parchment-v2.html exactly
- [ ] Poppins + Lora + JetBrains Mono loaded via next/font/google with CSS variables
- [ ] Tailwind config extends colors and fontFamily with CSS var references
- [ ] SmoothScrollProvider initialises Lenis, syncs with GSAP ticker, ScrollTrigger proxy set
- [ ] Navigation renders on desktop and mobile, sticky, transitions to opaque on scroll
- [ ] Footer renders with three-column layout, ink background, gradient bottom stripe
- [ ] pnpm tsc --noEmit passes

─── INSTALL ───

pnpm init
pnpm add next@latest react@latest react-dom@latest typescript @types/node @types/react
pnpm add tailwindcss @tailwindcss/postcss postcss
pnpm add gsap @gsap/react
pnpm add @studio-freight/lenis
pnpm add framer-motion
pnpm add react-hook-form zod @hookform/resolvers
pnpm add react-countup countup.js
pnpm add mapbox-gl react-map-gl
pnpm add lucide-react
pnpm add contentlayer2 next-contentlayer2
pnpm add @radix-ui/react-tabs @radix-ui/react-accordion
pnpm add resend
pnpm add -D @types/mapbox-gl

─── FONTS — app/layout.tsx ───

import { Poppins, Lora, JetBrains_Mono } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})
const lora = Lora({
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})
const mono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

Apply all three className variables to the <html> element.

─── GLOBALS.CSS — app/globals.css ───

Copy the EXACT :root block from docs/system-04-parchment-v2.html lines 14–56.
Then add:

body {
  background: var(--parchment);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4, h5, h6 { font-family: var(--font-heading); }
* { box-sizing: border-box; }

─── TAILWIND — tailwind.config.ts ───

Extend theme with:
colors: {
  parchment: 'var(--parchment)',
  'parchment-warm': 'var(--parchment-warm)',
  'parchment-cool': 'var(--parchment-cool)',
  'parchment-deep': 'var(--parchment-deep)',
  ink: 'var(--ink)',
  'ink-mid': 'var(--ink-mid)',
  dust: 'var(--dust)',
  crimson: 'var(--crimson)',
  'crimson-dark': 'var(--crimson-dark)',
  'crimson-pale': 'var(--crimson-pale)',
  'harvest-gold': 'var(--harvest-gold)',
  'harvest-gold-dark': 'var(--harvest-gold-dark)',
  'harvest-gold-pale': 'var(--harvest-gold-pale)',
  'sage-field': 'var(--sage-field)',
  'sage-light': 'var(--sage-light)',
  'sage-pale': 'var(--sage-pale)',
}
fontFamily: {
  heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
  body: ['var(--font-body)', 'Georgia', 'serif'],
  mono: ['var(--font-mono)', 'monospace'],
}

─── SMOOTH SCROLL — src/providers/SmoothScrollProvider.tsx ───

'use client'
import { createContext, useContext, useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext<Lenis | null>(null)
export const useLenis = () => useContext(LenisContext)

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    lenisRef.current = lenis

    gsap.ticker.add((time) => { lenis.raf(time * 1000) })
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number) {
        if (arguments.length && value !== undefined) { lenis.scrollTo(value) }
        return lenis.actualScroll
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
    })
    ScrollTrigger.addEventListener('refresh', () => lenis.resize())
    ScrollTrigger.refresh()

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => { lenis.raf(time * 1000) })
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}

Wrap root layout children in <SmoothScrollProvider>.

─── NAVIGATION — src/components/layout/Navigation.tsx ───

'use client'
Sticky, z-50. Uses useScroll or scroll event listener — background transitions from transparent to 
rgba(236,233,224,0.95) + backdrop-blur-md at 80px scroll depth. Transition: 300ms ease.

Logo: font-heading font-bold text-ink tracking-tight "Mackays"
Nav links: font-heading text-[12px] font-medium text-dust hover:text-ink transition-colors
Active link detection via usePathname() — add 1px border-bottom crimson on active.
CTA button right: bg-crimson text-white rounded-md px-4 py-2 text-sm font-heading font-semibold
  hover:bg-crimson-dark transition-colors

Links:
  Our Story → /our-story
  Our Produce → /our-produce (Dropdown on hover: Bananas, Red Papaya, Avocados, Sugar Cane, Cattle, Passionfruit — each links to /our-produce/[slug])
  People & Environment → /people-and-environment  
  Work With Us → /work-with-us
  Media → /media

Mobile: hamburger (Menu icon lucide), full-screen overlay (fixed inset-0 bg-parchment z-40),
  all links stacked, close button top-right.

prefers-reduced-motion: skip scroll transition.

─── FOOTER — src/components/layout/Footer.tsx ───

Background: bg-ink. Three columns inside max-w-7xl mx-auto px-10 py-16.

Col 1: 
  "Mackays" in font-heading font-bold text-parchment text-xl
  Lora italic text-dust/60 text-sm mt-2: "From Far North Queensland — to your table."
  mt-4 text-dust/40 text-xs: "Proud supporter of Foodbank Queensland."

Col 2: 
  Heading: font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-dust/40 mb-4 "Navigation"
  Links: font-heading text-sm text-dust/60 hover:text-crimson transition-colors block mb-2
  (same links as nav, plus Contact → /contact)

Col 3:
  Heading: font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-dust/40 mb-4 "Contact"
  font-body text-sm text-dust/60 leading-relaxed:
    PO Box 513 Tully QLD 4854
    (07) 4088 7800
    info@mackays.com.au
    marketing@mackays.com.au

Bottom bar: border-t border-white/5 mt-12 pt-6 flex justify-between items-center
  Left: font-heading text-[11px] text-dust/30 "© 2025 Mackays Marketing. Mac Farms Pty Ltd."
  Right: font-body italic text-[11px] text-dust/30 "From Far North Queensland — to your table."

BOTTOM STRIPE (very bottom of footer, 3px tall):
  background: linear-gradient(90deg, #d43646 0%, #f8d940 50%, #788C5D 100%)

Commit: "feat: scaffold, Parchment tokens, fonts, Lenis, nav, footer — Phase 1"
Write and commit HANDOFF.md.
```

---

## PHASE 2 — Content Layer + Component Library

```
Read CLAUDE.md and HANDOFF.md before starting.

Update SPRINT.md for Phase 2:
Scope: All site copy as typed TypeScript constants in src/content/. All UI primitives. All 10 named section components. No full pages yet.
Acceptance criteria:
- [ ] src/content/index.ts exports HOME, OUR_STORY, PRODUCE, PEOPLE_ENVIRONMENT, WORK_WITH_US, MEDIA, CONTACT, SITE, FARM_MARKERS
- [ ] src/content/produce.ts exports CROP_SLUGS and per-crop data
- [ ] src/content/timeline.ts exports all 25 TIMELINE_ITEMS
- [ ] All UI primitives exist: Button, SectionHeader, StatCounter, ImagePlaceholder, Badge
- [ ] All section components exist and compile: KineticHero, FloatStatBand, HorizontalProduceTape, StickyTimeline, SplitScreenParallax, LivingPhotoGrid, MarqueeBand, PullQuoteSection, QldFarmMap, GoldCalloutBand
- [ ] pnpm tsc --noEmit passes

─── CONTENT — src/content/index.ts ───

Using the copy from docs/mackays-parchment-build.md (all of Part 3 of the original brief),
create typed TypeScript constants for all pages. Every string on the site must live here.
Never use `as const` — prefer typed interfaces.

Key objects to export:
  SITE — tagline, metaDescription, address, phone, email
  HOME — hero, stats (array of 4), brandStatement, sustainability (4 pillars), pullQuote, mapSection
  OUR_STORY — hero, founding, cyclone, secondGen, thirdGen, fourthGen, futureVision
  PRODUCE — overview, smartBanana, iqf
  PEOPLE_ENVIRONMENT — hero, ourPeople, directors (array of 5 with name/title/role), environment (4 tabs), community
  WORK_WITH_US — hero, pillars (array of 4), roles (array of 6), opportunities (array of 6)
  MEDIA — hero, pressReleases (array of 3)
  CONTACT — headline, subheadline, offices (array of 3)
  FARM_MARKERS — array of 3 map markers with coords, label, crops, hectares, note

Export CROP_SLUGS and per-crop data in src/content/produce.ts.
Export TIMELINE_ITEMS (all 25 items) in src/content/timeline.ts.

─── UI PRIMITIVES — src/components/ui/ ───

Button.tsx
  Props: variant ('primary'|'secondary'|'gold'|'ink-gold'|'ghost-link'), size ('sm'|'md'|'lg'), href?, onClick?, children, className?
  primary: bg-crimson text-white hover:bg-crimson-dark
  secondary: bg-transparent text-ink border border-parchment-deep hover:bg-parchment-warm
  gold: bg-harvest-gold text-ink hover:bg-harvest-gold-dark
  ink-gold: bg-ink text-harvest-gold hover:bg-ink-mid
  ghost-link: no background/border, text-crimson, border-b border-crimson inline-block
  All: font-heading font-semibold rounded-[var(--radius-md)] transition-all
  Renders <a> if href, <button> if onClick.

SectionHeader.tsx
  Props: eyebrow?, headline, subheadline?, align ('left'|'center')
  eyebrow: font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-dust mb-3
  headline: font-heading font-bold text-[clamp(32px,5vw,52px)] leading-[1.05] tracking-[-0.025em] text-ink mb-4
    headline string supports <em> — render as: Lora italic text-crimson
  subheadline: font-body text-[17px] text-ink-mid max-w-[520px] leading-[1.7]
  align center: add mx-auto text-center (and subheadline mx-auto)

StatCounter.tsx
  Props: value (number), suffix?, prefix?, label
  Wraps react-countup. Trigger on IntersectionObserver (threshold: 0.5).
  Number: font-heading font-bold text-[clamp(40px,6vw,56px)] tracking-[-0.03em] text-ink
  Suffix: text-crimson (makes the accent character crimson)
  Label: font-heading text-[11px] font-medium uppercase tracking-[0.1em] text-dust mt-1

ImagePlaceholder.tsx
  Props: seed (number), width?, height?, fill? (boolean), alt, className?, priority?
  Uses next/image. src: `https://picsum.photos/seed/${seed}/${width}/${height}` for fixed size
  or fill mode with objectFit cover for background images.
  Always include explicit alt text.

Badge.tsx
  Props: label, variant ('crimson'|'gold'|'sage'|'neutral')
  crimson: bg-crimson-pale text-crimson
  gold: bg-harvest-gold text-ink
  sage: bg-sage-pale text-sage-field
  neutral: bg-parchment-warm text-dust
  All: font-heading text-[11px] font-semibold px-3 py-1 rounded-[var(--radius-sm)]

─── SECTION COMPONENTS — src/components/sections/ ───

KineticHero.tsx
  'use client'. Full 100svh. Position relative, overflow hidden.
  Background: <ImagePlaceholder fill priority seed={imageSeed} alt={...} /> 
    with absolute inset-0 z-0 + overlay div absolute inset-0 z-10 bg-ink/20
  Content: relative z-20, flex flex-col justify-end pb-20 px-10 md:px-16

  useGSAP with gsap scope ref on the content container.
  Split headline by spaces → array of word spans.
  Each span wrapped in overflow-hidden div (clips the reveal).
  GSAP: gsap.from(wordRefs, { y: 60, opacity: 0, stagger: 0.08, ease: 'power3.out', duration: 0.85 })
  Subheadline: same treatment, delay: 0.55
  CTAs: same, delay: 0.9

  prefers-reduced-motion: const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  If true: skip gsap.from, just set opacity: 1.

  Scroll indicator: absolute bottom-8 left-1/2 -translate-x-1/2
    thin 1px wide line, height 40px, bg-harvest-gold
    CSS animation: scaleY 0→1 and back, 2s infinite

  Props: headline, subheadline, eyebrow?, ctaPrimary ({label,href}), ctaSecondary? ({label,href}), imageSeed

FloatStatBand.tsx
  'use client'. 
  border-t border-b border-parchment-deep. py-12 px-10.
  Grid grid-cols-2 md:grid-cols-4.
  Each cell: StatCounter + vertical divider on right (last child: no divider).
  Props: stats (Array<{value, suffix?, prefix?, label}>)

HorizontalProduceTape.tsx
  'use client'.
  overflow-x-scroll scroll-smooth scroll-snap-x-mandatory. Hide scrollbar (scrollbar-hide).
  Flex flex-nowrap gap-4 px-10.
  Each slide: scroll-snap-align-start flex-shrink-0 w-[min(60vw,580px)] h-[480px]
    relative overflow-hidden rounded-xl cursor-pointer
    ImagePlaceholder fill + overlay gradient bottom
    Bottom content: absolute bottom-0 left-0 right-0 p-8 z-10
      Badge (variant based on crop), name in font-heading 700 28px text-white
  
  Keyboard: tabIndex on each card, left/right arrow keys scroll to prev/next.
  Dot indicators below: flex gap-2 justify-center mt-6
    Dot: w-2 h-2 rounded-full bg-parchment-deep active: bg-crimson transition-colors

  Props: slides (Array<{seed, name, tagline, stat, href}>)

StickyTimeline.tsx
  'use client'. 
  Two-column layout: left 35% sticky, right 65% scrolling.
  Left panel: sticky top-0 h-screen flex flex-col justify-center pl-10 md:pl-16
    Large year: font-heading font-bold text-[clamp(80px,12vw,140px)] tracking-[-0.05em] text-ink/10
    (updates via GSAP scrub as scroll position changes)
  Right panel: pl-8 pr-10 py-20 space-y-32
    Each item: date label, headline, body, optional image.

  GSAP ScrollTrigger:
    Pin left panel. scrub: 1. As scroll progresses through items, update year display.
    Each item: opacity 0→1 fadeIn on scroll.
  
  If abbreviated (home page): show first 6 items from the array.
  Props: items (TimelineItem[]), abbreviated? (boolean)

SplitScreenParallax.tsx
  'use client'.
  Two-column grid grid-cols-1 md:grid-cols-2. min-h-[70vh].
  Image column: relative overflow-hidden. ImagePlaceholder fill.
  GSAP parallax on image: y movement of scrollY * 0.3 via ScrollTrigger scrub.
  Disable on mobile: useEffect checks window.innerWidth < 768 → skip GSAP.
  imageLeft prop controls column order.
  Children render in the text column (padded, centered vertically).
  Props: imageSeed, imageAlt, children, imageLeft? (boolean)

LivingPhotoGrid.tsx
  'use client'.
  CSS columns: 2 md:columns-4 gap-4.
  Each image: break-inside-avoid mb-4 overflow-hidden rounded-lg relative group cursor-pointer.
  ImagePlaceholder with explicit height variation (alternate 200px/280px/240px pattern).
  GSAP ScrollTrigger per image: clipPath 'inset(100% 0 0 0)' → 'inset(0% 0 0 0)', stagger 0.1s.
  Hover: scale-[1.04] transition-transform duration-300
    Caption overlay: absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink/60 to-transparent
      translate-y-full → translate-y-0 on group-hover. transition-transform duration-300.
      Caption text: absolute bottom-3 left-3 font-heading text-[11px] text-white/80.
  Props: seeds (number[]), captions? (string[])

MarqueeBand.tsx
  Client component. Horizontal infinite scroll band.
  bg-ink py-4 overflow-hidden.
  Inner div: flex gap-12 items-center animate-marquee whitespace-nowrap.
  Duplicated content for seamless loop.
  Content items: "Coles" • "Woolworths" • "ALDI" • "Supplying Australia since 1945" • "13% of Australia's Bananas" • "550+ Team Members" • "5,800 Hectares"
  Separator: w-1.5 h-1.5 rounded-full bg-harvest-gold flex-shrink-0
  Text: font-heading text-sm font-medium text-dust/60
  Hover: pause animation (animation-play-state: paused on hover)
  Add to tailwind.config.ts: animation: { marquee: 'marquee 30s linear infinite' },
    keyframes: { marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } } }

PullQuoteSection.tsx
  py-20 px-10 max-w-3xl mx-auto text-center
  Harvest-gold 3px left-border? No — centered: use a 60px harvest-gold horizontal rule above (w-16 h-[3px] bg-harvest-gold mx-auto mb-8)
  Quote: font-body italic text-[22px] md:text-[28px] text-ink-mid leading-[1.65] mb-6
  Attribution: font-heading text-[11px] font-semibold uppercase tracking-[0.1em] text-crimson
  Props: quote, attribution?

QldFarmMap.tsx
  File structure: QldFarmMap.tsx (re-exports dynamic) + QldFarmMapInner.tsx (actual map)
  QldFarmMap.tsx:
    'use client'
    import dynamic from 'next/dynamic'
    const QldFarmMapInner = dynamic(() => import('./QldFarmMapInner'), { ssr: false, loading: () => <div className="h-[520px] bg-parchment-warm animate-pulse rounded-xl" /> })
    export default function QldFarmMap(props) { return <QldFarmMapInner {...props} /> }
  
  QldFarmMapInner.tsx:
    Uses react-map-gl. mapboxAccessToken from process.env.NEXT_PUBLIC_MAPBOX_TOKEN.
    Style: 'mapbox://styles/mapbox/light-v11'. Height 520px desktop, 340px mobile.
    initialViewState: longitude 145.5, latitude -18.5, zoom 6.
    Custom markers: 12px crimson circles with 2px harvest-gold ring.
    Click/hover: Framer Motion popup card slides up — region name, crops, hectares.
    Props: markers (MapMarker[]), interactionDisabled? (boolean for contact page static map)

GoldCalloutBand.tsx
  bg-harvest-gold py-12 px-10. border-l-4 border-crimson (left accent stripe).
  Flex flex-col md:flex-row gap-8 items-start md:items-center max-w-7xl mx-auto.
  eyebrow: font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/50 mb-2
  headline: font-heading font-bold text-[24px] md:text-[28px] tracking-[-0.02em] text-ink leading-tight
  body: font-body text-[14px] text-ink-mid leading-relaxed flex-1 max-w-xl
  CTA: Button variant="primary" (crimson on gold reads well)
  Props: eyebrow?, headline, body, cta? ({label, href})

Commit: "feat: content layer + component library — Phase 2"
Write and commit HANDOFF.md.
After committing, say: "Phase 2 complete. Ready for evaluator review."
```

---

## BETWEEN PHASES: RUN THE EVALUATOR

After Phase 2 (and after every subsequent phase), paste this:

```
Use the evaluator agent to review the Phase [N] work. 
Check both TypeScript and all the criteria in SPRINT.md.
Report findings before we proceed to Phase [N+1].
```

Fix any ❌ FAIL items before proceeding.

---

## PHASE 3 — Home Page

*(Open a second Desktop session for parallel build if desired)*

```
Read CLAUDE.md and HANDOFF.md. Update SPRINT.md for Phase 3.

Build app/page.tsx — the home page.

Import ALL copy from src/content/index.ts. Zero inline strings.
Use components from src/components/sections/ and src/components/ui/.

SECTION SEQUENCE — build in this exact order:

1. <KineticHero
     headline="The land that feeds Australia."
     subheadline={HOME.hero.subheadline}
     eyebrow="Far North Queensland · Est. 1945"
     ctaPrimary={{ label: "Our story", href: "/our-story" }}
     ctaSecondary={{ label: "Our produce", href: "/our-produce" }}
     imageSeed={90}
   />

2. <FloatStatBand stats={HOME.stats} />
   (stats: 1945, 5800+, 550+, 13%)

3. BRAND STATEMENT SECTION — bespoke two-column layout
   grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-10 py-24

   Left:
     <SectionHeader
       eyebrow="Australia's leading tropical produce grower"
       headline="We grow what thrives where others won't."
     />
     <p className="font-body text-[16px] text-ink-mid leading-[1.75] mt-6 mb-8">
       {HOME.brandStatement.body}
     </p>
     <Button variant="ghost-link" href="/our-story">Read our story →</Button>

   Right:
     <ImagePlaceholder seed={20} width={600} height={700} alt="Banana plantation Tully Valley"
       className="rounded-xl w-full h-full object-cover" />
     GSAP on scroll: image x: 60→0, opacity: 0→1, ease power2.out, ScrollTrigger once:true

4. PRODUCE TAPE
   <SectionHeader eyebrow="Our Produce" headline="Six crops. Three regions. One standard."
     className="max-w-7xl mx-auto px-10 pt-24 pb-10" />
   <HorizontalProduceTape slides={[
     { seed: 20, name: 'Bananas', tagline: PRODUCE.crops.bananas.tagline, stat: '13% of national supply', href: '/our-produce/bananas' },
     { seed: 50, name: 'Red Papaya', tagline: PRODUCE.crops.redPapaya.tagline, stat: 'Ruby Rise & Red Hill', href: '/our-produce/red-papaya' },
     { seed: 60, name: 'Avocados', tagline: PRODUCE.crops.avocados.tagline, stat: 'Maluma & Shepherd', href: '/our-produce/avocados' },
     { seed: 80, name: 'Sugar Cane', tagline: PRODUCE.crops.sugarCane.tagline, stat: '1,000+ hectares', href: '/our-produce/sugar-cane' },
     { seed: 70, name: 'Cattle', tagline: PRODUCE.crops.cattle.tagline, stat: '~800 head, grass-fed', href: '/our-produce/cattle' },
     { seed: 150, name: 'Passionfruit', tagline: PRODUCE.crops.passionfruit.tagline, stat: 'Far North Queensland', href: '/our-produce/passionfruit' },
   ]} />

5. ABBREVIATED TIMELINE
   <div className="max-w-7xl mx-auto px-10">
     <SectionHeader eyebrow="Our Story" headline="Four generations. One unbroken promise." />
   </div>
   <StickyTimeline items={TIMELINE_ITEMS.slice(0, 6)} abbreviated />
   <div className="max-w-7xl mx-auto px-10 pt-8">
     <Button variant="ghost-link" href="/our-story">The full history →</Button>
   </div>

6. FARM MAP
   <div className="max-w-7xl mx-auto px-10 py-24">
     <SectionHeader eyebrow="Growing Regions" headline="Three regions. One reason — resilience." />
   </div>
   <QldFarmMap markers={FARM_MARKERS} />

7. <PullQuoteSection
     quote={HOME.pullQuote}
     attribution="Barrie Mackay, Third Generation Director"
   />

8. SUSTAINABILITY BAND — bg-ink, full width
   py-24 px-10 max-w-7xl mx-auto
   <SectionHeader
     eyebrow="Our Commitment"
     headline="We don't manage land. We steward it."
   />  ← headline should be text-parchment on dark bg — override color in SectionHeader or add className prop

   grid grid-cols-2 md:grid-cols-4 gap-8 mt-16
   Four pillars from HOME.sustainability. Each: Lucide icon + heading + body.
   Icons: Shield (crimson), Recycle (harvest-gold), Leaf (sage-light), Heart (sage-light)
   Heading: font-heading 600 14px, matching icon color
   Body: font-body 13px text-dust/60

9. <LivingPhotoGrid seeds={[10, 20, 30, 40, 100, 110, 120, 130]}
     captions={['Aerial view', 'Banana plantation', 'Harvest', 'Packing shed', 'Our team', 'The Mackay family', 'Rainforest edge', 'IQF facility']}
   />
   Above: <SectionHeader eyebrow="Life at Mackays" headline="The people behind Australia's produce." align="center" />

10. <MarqueeBand />

METADATA — export const metadata: Metadata
title: "Mackays | Australia's Leading Tropical Produce Grower | Far North Queensland"
description: "Fourth-generation family farming from Tully, Far North Queensland. Bananas, papaya, avocados, cane, cattle and passionfruit supplied to Coles, Woolworths and ALDI."

Commit: "feat: home page — Phase 3"
Write and commit HANDOFF.md.
```

---

## PHASE 4 — Our Story Page

```
Read CLAUDE.md and HANDOFF.md. Update SPRINT.md for Phase 4.
Import all copy from OUR_STORY and TIMELINE_ITEMS from src/content/.

FILE: app/our-story/page.tsx

1. SPLIT HERO — full 100svh, two columns desktop (50/50), stacked mobile
   Left: <ImagePlaceholder fill seed={110} alt="The Mackay family" /> (absolute fill)
   Right: bg-parchment-warm flex items-center px-16
     eyebrow + headline (from OUR_STORY.hero)
     headline: font-heading 700 clamp(32px,5vw,52px) tracking-[-0.025em] max-w-[440px]
   GSAP on load: right panel x:80→0, opacity:0→1, 0.8s ease-out

2. <SplitScreenParallax imageSeed={120} imageAlt="Rainforest edge near farmland" imageLeft>
   <SectionHeader eyebrow="1945" headline="Hand-cleared. Hand-built." />
   <p>{OUR_STORY.founding}</p>
   Harvest-gold blockquote (border-l-4 border-harvest-gold pl-5 my-6 font-body italic text-ink-mid):
     "When something breaks, the family builds it back stronger."
   <p>{OUR_STORY.cyclone}</p>
</SplitScreenParallax>

3. <StickyTimeline items={TIMELINE_ITEMS} />
   Image seeds per decade: 1940s→120, 1960-70s→80, 1980-90s→40, 2000s→10, 2010s→60, 2020s→30

4. FAMILY TREE — src/components/sections/FamilyTree.tsx
   <SectionHeader eyebrow="The Mackay Family" headline="Four generations, one philosophy." align="center" />
   Flex column centered, max-w-3xl mx-auto, font-heading throughout.
   Gen 1: "Stanley Mackay ──□── Agnes Mackay" — text-dust, connector lines via border
   Gen 2: two nodes "John Mackay" / "Robert Mackay" with vertical + horizontal connectors
   Gen 3 (5 directors): crimson name color, "Director" in dust below each name
   Gen 4: single wide cell, font-body italic text-dust/60 "Fourth generation active across all divisions"

5. <PullQuoteSection quote={OUR_STORY.pullQuote} attribution="Barrie Mackay" />

6. VALUES TRIPTYCH — src/components/sections/ValuesTriptych.tsx
   Three panels (grid grid-cols-1 md:grid-cols-3 gap-6)
   Each: bg-parchment-warm rounded-xl p-10 relative overflow-hidden
     border-t-[3px] — Panel 1: border-crimson, Panel 2: border-harvest-gold, Panel 3: border-sage-field
     Large BG number: absolute top-4 right-6 font-heading font-extrabold text-[120px] 
       text-ink/5 leading-none select-none — "01" / "02" / "03"
     Heading: font-heading font-bold text-[22px] tracking-[-0.02em] text-ink mb-4 — "Work Hard" etc
     Body: font-body text-[15px] text-ink-mid leading-[1.7]

7. FUTURE VISION — py-24 px-10 max-w-2xl mx-auto text-center
   <SectionHeader eyebrow="What comes next" headline="We're not done." align="center" />
   <p className="font-body text-[17px] text-ink-mid leading-[1.75] mt-6 mb-10">{OUR_STORY.futureVision}</p>
   <Button variant="primary" href="/work-with-us">Work with us</Button>

METADATA:
title: "Our Story | Mackays — 80 Years of Family Farming in Far North Queensland"
description: "From one hand-cleared block in 1945 to 5,800 hectares across three growing regions. The story of Australia's largest banana-growing family."

Commit: "feat: our-story page — Phase 4"
Write and commit HANDOFF.md.
```

---

## PHASE 5 — Our Produce (7 pages)

```
Read CLAUDE.md and HANDOFF.md. Update SPRINT.md for Phase 5.
Import from PRODUCE in src/content/index.ts and CROP_SLUGS from src/content/produce.ts.

─── OVERVIEW: app/our-produce/page.tsx ───

1. <KineticHero headline="Six crops." imageSeed={10} eyebrow="Our Produce"
     subheadline={PRODUCE.overview.intro}
     ctaPrimary={{ label: "Explore bananas", href: "/our-produce/bananas" }}
   />
   Headline split across lines — use \n or <br/> for line breaks in the Kinetic component:
   "Six crops.\nThree regions.\nOne standard."

2. BENTO PRODUCE GRID — max-w-7xl mx-auto px-10 py-24
   <SectionHeader eyebrow="What we grow" headline="Every crop chosen for where we farm it." />
   CSS grid desktop: grid-cols-5 gap-4 (use col-span for different sizes)
   Bananas: col-span-3 row-span-2 (large feature card, tall)
   Red Papaya: col-span-2 (standard)
   Avocados: col-span-2 (standard)
   Sugar Cane: col-span-2 (standard)
   Cattle: col-span-2 (standard)
   Passionfruit: col-span-1 (narrow)
   Mobile: grid-cols-1 all col-span-1

   Each card: rounded-xl overflow-hidden relative cursor-pointer group
     Min height varies (banana: 520px, others: 240px)
     Background: ImagePlaceholder fill
     Overlay: gradient from transparent to ink/70 bottom
     Content absolute bottom-0 p-6: Badge + name + stat
     Hover: image scale-105 transition-transform duration-500
   GSAP: opacity 0→1, y 30→0, stagger 0.1s on ScrollTrigger enter

3. SUPPLY CHAIN EXPLAINER
   <SectionHeader eyebrow="Supply Chain" headline="Farm to shelf in 48 hours." />
   Flex row (col on mobile), items centered, gap-8
   3 steps: [MapPin "Farm" "Far North Queensland"] → [Package "Packed" "Same-day Tully sheds"] → [ShoppingCart "Shelf" "Coles · Woolworths · ALDI"]
   Step: icon in 48px circle bg-parchment-deep, step-number text-[10px] uppercase tracking text-dust, title font-heading 600, subtitle font-body 13px text-ink-mid
   Connector arrows: 40px horizontal lines between steps (hidden mobile)
   GSAP: lines scaleX 0→1 on scroll

4. SMART BANANA CALLOUT — <SplitScreenParallax imageSeed={20} imageAlt="Smart Banana packaging">
   eyebrow "Innovation", headline "The Smart Banana."
   body: {PRODUCE.smartBanana}
   Left text block has border-t-4 border-harvest-gold pt-6

5. IQF / ZERO WASTE — bg-ink section, py-24 px-10
   <SectionHeader eyebrow="Zero Waste" headline="Nothing goes to waste." /> (text-parchment headline)
   {PRODUCE.iqf}
   <ImagePlaceholder seed={130} width={600} height={400} alt="IQF processing facility" className="rounded-xl mt-10" />

6. TRADE CTA — bg-ink py-16 px-10 text-center (continuation of dark section)
   "Want to stock Mackays produce?" font-heading 700 28px text-parchment
   <Button variant="gold" href="mailto:trade@mackays.com.au" className="mt-6">Enquire about supply →</Button>

─── CROP PAGES: app/our-produce/[crop]/page.tsx ───

export async function generateStaticParams() {
  return CROP_SLUGS.map(crop => ({ crop }))
}

Get crop data: const crop = PRODUCE_DATA[params.crop as CropSlug]
Add 404 guard: if (!crop) notFound()

Each page structure:

1. HERO — relative h-[70vh] overflow-hidden
   <ImagePlaceholder fill priority seed={crop.heroSeed} alt={`${crop.name} growing Far North Queensland`} />
   Overlay: absolute inset-0 bg-ink/40
   Content absolute bottom-12 left-10:
     Breadcrumb: <Link href="/our-produce" className="font-heading text-[11px] text-white/50 hover:text-white">Our Produce</Link> → {crop.name}
     headline: font-heading 700 clamp(52px,8vw,88px) tracking-[-0.04em] text-white
     tagline: font-body italic text-[20px] text-harvest-gold mt-2

2. <SplitScreenParallax imageSeed={crop.storySeed} imageAlt={`${crop.name} farm`}>
   <SectionHeader eyebrow={crop.eyebrow} headline={crop.storyHeadline} />
   <p className="font-body text-[16px] text-ink-mid leading-[1.75] mt-4">{crop.story}</p>
</SplitScreenParallax>

3. GROWING CONDITIONS — max-w-7xl mx-auto px-10 py-20
   grid grid-cols-2 md:grid-cols-4 gap-6
   Each card: bg-parchment-cool border border-parchment-deep rounded-lg p-6
     Lucide icon (Layers/CloudRain/MapPin/Calendar) — 20px text-crimson mb-3
     Label: font-heading text-[10px] font-semibold uppercase tracking text-dust mb-1
     Value: font-heading font-semibold text-[15px] text-ink

4. VARIETIES (if crop.varieties exists, skip for sugar-cane/cattle/passionfruit)
   <SectionHeader eyebrow="Our Varieties" headline={`Two ways we grow ${crop.name.toLowerCase()}.`} />
   grid grid-cols-1 md:grid-cols-2 gap-8
   Each: bg-parchment-cool rounded-xl p-8
     variety name font-heading 700 22px, description font-body 15px text-ink-mid

5. <PullQuoteSection quote={crop.pullQuote} />

6. RELATED PRODUCE — 3 ProduceCard links to other crops
   <SectionHeader eyebrow="Also from Mackays" headline="More from the farm." />
   grid grid-cols-1 md:grid-cols-3 gap-6

7. <GoldCalloutBand
     eyebrow="Retail & Trade"
     headline="Enquire about supply."
     body={PRODUCE.tradeEnquiryBody}
     cta={{ label: "Contact our trade team →", href: `/contact?ref=${params.crop}` }}
   />

METADATA per crop:
title: `${crop.name} | Mackays — Far North Queensland`
description: `${crop.tagline}. Grown by Mackays Marketing in Far North Queensland.`

Commit: "feat: our-produce overview + 6 crop pages — Phase 5"
Write and commit HANDOFF.md.
```

---

## PHASE 6 — People & Environment

```
Read CLAUDE.md and HANDOFF.md. Update SPRINT.md for Phase 6.

FILE: app/people-and-environment/page.tsx

1. <KineticHero
     headline="550 people. Three regions."
     subheadline={PEOPLE_ENVIRONMENT.hero.subheadline}
     eyebrow="Our People"
     imageSeed={100}
     ctaPrimary={{ label: "Work with us", href: "/work-with-us" }}
   />
   Second line of headline should be Lora italic in harvest-gold:
   "One standard — theirs."
   Implement by splitting headline into two spans in KineticHero: first span normal, second span with special className. Pass as headline array or use a | delimiter.

2. <SplitScreenParallax imageSeed={40} imageAlt="Mackays packing shed" imageLeft>
   <SectionHeader eyebrow="Our Team" headline="The people are the product." />
   <p>{PEOPLE_ENVIRONMENT.ourPeople.body1}</p>
   <p className="mt-4">{PEOPLE_ENVIRONMENT.ourPeople.body2}</p>
</SplitScreenParallax>

3. DIRECTORS GRID — max-w-7xl mx-auto px-10 py-24
   <SectionHeader eyebrow="Leadership" headline="Guided by those who grew up here." />
   First row: grid grid-cols-3 gap-6 mt-12 (3 cards)
   Second row: grid grid-cols-2 gap-6 max-w-[66%] mx-auto mt-6 (2 cards, centered)
   
   Director card: bg-parchment-cool border border-parchment-deep rounded-xl p-8
     overflow-hidden relative group cursor-default
     ImagePlaceholder seed={director.imageSeed} width={80} height={80}
       className="rounded-full mb-4 object-cover"
     name: font-heading font-semibold text-[16px] text-ink group-hover:text-crimson transition-colors
     title: font-heading text-[11px] font-semibold uppercase tracking text-dust/60 mt-1
     role: font-body text-[13px] text-ink-mid mt-3 leading-[1.5]
     Hover: translate-y-[-2px] shadow-[0_8px_24px_rgba(20,20,19,0.08)] transition-all duration-200
   
   Directors array (from PEOPLE_ENVIRONMENT.directors):
     { name: "Gavin Mackay", title: "Director — Operations", role: "...", imageSeed: 101 }
     { name: "Barrie Mackay", title: "Director — Production", role: "...", imageSeed: 102 }
     { name: "Stephen Mackay", title: "Director — Strategy", role: "...", imageSeed: 103 }
     { name: "Cameron Mackay", title: "Director — Growing Systems", role: "...", imageSeed: 104 }
     { name: "Daniel Mackay", title: "Director — Geographic Expansion", role: "...", imageSeed: 105 }
   
   Below grid (mt-12 text-center max-w-lg mx-auto):
     <p className="font-body text-[15px] text-ink-mid">{PEOPLE_ENVIRONMENT.boardNote}</p>

4. FOURTH GENERATION STATEMENT — py-24 px-10 max-w-3xl mx-auto text-center
   w-16 h-[3px] bg-harvest-gold mx-auto mb-10
   <p className="font-body italic text-[22px] text-ink-mid leading-[1.8]">
     {PEOPLE_ENVIRONMENT.fourthGenStatement}
   </p>
   <Button variant="ghost-link" href="/work-with-us" className="mt-8">Join the team →</Button>

5. ENVIRONMENT TABS — Radix UI Tabs, max-w-7xl mx-auto px-10 py-24
   <SectionHeader eyebrow="Our Commitment to the Land" headline="We steward, we don't just farm." />
   
   <Tabs.Root defaultValue="biosecurity" className="mt-12">
     <Tabs.List className="flex gap-0 border-b border-parchment-deep mb-12">
       Each Tabs.Trigger: px-6 py-3 font-heading text-[12px] font-semibold uppercase tracking-[0.1em]
         text-dust hover:text-ink transition-colors
         data-[state=active]:text-crimson data-[state=active]:border-b-2 data-[state=active]:border-harvest-gold
     
     Tabs: Biosecurity | Water | Carbon | Zero Waste
     
     Biosecurity content:
       Two columns: text left, image right
       <Badge variant="crimson" label="Panama TR4-Free — 3 consecutive years" className="mb-6" />
       <p>{PEOPLE_ENVIRONMENT.environment.biosecurity}</p>
       <ImagePlaceholder seed={10} width={500} height={350} alt="Farm biosecurity protocols" className="rounded-xl" />
     
     Water content:
       <p>{PEOPLE_ENVIRONMENT.environment.water}</p>
       Two stat counters side by side: 8830 (ML water licences) + 2000 (ML private agreement)
     
     Carbon content:
       <p>{PEOPLE_ENVIRONMENT.environment.carbon}</p>
       Progress bar: w-full h-2 bg-parchment-deep rounded-full overflow-hidden mt-6
         Inner: w-2/3 h-full bg-harvest-gold rounded-full animate-[shimmer_2s_ease-in-out_infinite]
       "Carbon sequestration audit underway. 2025 results pending." font-body text-[13px] text-dust mt-3
     
     Zero Waste content:
       <ImagePlaceholder seed={130} width={500} height={350} alt="IQF processing facility" className="rounded-xl mb-6" />
       <p>{PEOPLE_ENVIRONMENT.environment.iqf}</p>
       <StatCounter value={50} suffix="+" label="New Tully jobs from IQF expansion" />
   </Tabs.Root>

6. <LivingPhotoGrid
     seeds={[10, 30, 40, 100, 110, 130, 90, 80]}
     captions={['Aerial view', 'Harvest season', 'Packing shed', 'Field workers', 'The Mackay family', 'IQF facility', 'Tully Valley', 'Sugar cane']}
   />

7. <GoldCalloutBand
     eyebrow="Foodbank Queensland"
     headline="50,000 Queensland schoolchildren. Mackays bananas. Every week."
     body={PEOPLE_ENVIRONMENT.community.foodbankBody}
     cta={{ label: "Read about our partnership →", href: "https://www.foodbank.org.au/meet-a-food-producer-mackays-marketing/" }}
   />

METADATA:
title: "People & Environment | Mackays — Our Team, Biosecurity and Sustainability"
description: "The 550+ people behind Australia's largest banana operation. Biosecurity, carbon commitments, IQF zero-waste processing, and community partnerships."

Commit: "feat: people-and-environment — Phase 6"
Write and commit HANDOFF.md.
```

---

## PHASE 7 — Work With Us + Media + Contact

```
Read CLAUDE.md and HANDOFF.md. Update SPRINT.md for Phase 7.
Three pages this session. Build in order: Work With Us → Media → Contact.

─── WORK WITH US: app/work-with-us/page.tsx ───

1. <KineticHero headline="Come grow with us." imageSeed={30}
     subheadline={WORK_WITH_US.hero.subheadline} eyebrow="Careers"
     ctaPrimary={{ label: "See current roles", href: "https://aus232.dayforcehcm.com/CandidatePortal/en-AU/mfg/SITE/CANDIDATEPORTAL" }}
   />

2. WHY MACKAYS — 4-column grid (stacked on mobile)
   max-w-7xl mx-auto px-10 py-24
   <SectionHeader eyebrow="Why Mackays" headline="A business worth working for." />
   grid grid-cols-1 md:grid-cols-4 gap-6 mt-12
   Each pillar card: bg-parchment-cool rounded-xl p-8
     border-t-[3px] alternating: crimson, harvest-gold, sage-field, crimson
     Large bg number: "01"–"04" absolute top-4 right-6 font-heading 800 100px text-ink/5
     Title: font-heading 700 18px text-ink mb-3
     Body: font-body 14px text-ink-mid leading-[1.65]

3. ROLE CATEGORIES — max-w-7xl mx-auto px-10 py-24
   <SectionHeader eyebrow="What we hire for" headline="Find your place in the operation." />
   grid grid-cols-1 md:grid-cols-3 gap-6 mt-12
   6 role cards from WORK_WITH_US.roles. Each:
     bg-parchment-cool border border-parchment-deep rounded-xl p-8 group cursor-default
     Lucide icon (20px, colored per role type) in 40px circle bg-parchment-deep rounded-full mb-4
     Title: font-heading 600 16px text-ink mb-2
     Description: font-body 13px text-ink-mid leading-[1.5] mb-4
     "See roles →": text-crimson font-heading 12px font-semibold group-hover:underline

4. CURRENT OPPORTUNITIES — Radix Accordion
   <SectionHeader eyebrow="Current Opportunities" headline="Roles we're recruiting for now." />
   <Accordion.Root type="single" collapsible className="space-y-3 mt-12">
     6 roles from WORK_WITH_US.opportunities.
     Trigger: flex justify-between items-center py-5 px-6 bg-parchment-cool rounded-xl
       Role title: font-heading 600 15px text-ink
       Location + type pill: flex gap-2 mr-4
       ChevronDown: rotates 180deg when open, transition-transform duration-200
     Content: px-6 pb-6 pt-2
       responsibilities: font-body 14px text-ink-mid mb-6
       <Button variant="gold" href="https://aus232.dayforcehcm.com/...">Apply via Dayforce →</Button>

5. <GoldCalloutBand
     eyebrow="Always Recruiting"
     headline="Don't see your role? Submit a profile."
     body="We hire year-round. Our Dayforce portal keeps your profile active — we review applications continuously, not just when a role is advertised."
     cta={{ label: "Submit via Dayforce →", href: "https://aus232.dayforcehcm.com/CandidatePortal/en-AU/mfg/SITE/CANDIDATEPORTAL" }}
   />

─── MEDIA: app/media/page.tsx ───

1. STATIC HEADER (no kinetic animation) — h-[45vh] bg-parchment-warm flex items-center
   max-w-7xl mx-auto px-10:
   <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-dust mb-4">News from the farm</p>
   <h1 className="font-heading font-bold text-[clamp(40px,6vw,64px)] tracking-[-0.03em] text-ink">News from the farm.</h1>
   <p className="font-body text-[17px] text-ink-mid mt-4 max-w-[480px] leading-[1.7]">{MEDIA.hero.subheadline}</p>

2. PRESS RELEASES GRID — max-w-7xl mx-auto px-10 py-24
   grid grid-cols-1 md:grid-cols-3 gap-8
   Each card from MEDIA.pressReleases:
     bg-parchment-cool border border-parchment-deep rounded-xl p-8
     Date: font-mono text-[11px] text-crimson mb-3
     Headline: font-heading 600 18px text-ink leading-[1.25] mb-4 line-clamp-2
     Excerpt: font-body 14px text-ink-mid leading-[1.6] mb-6 line-clamp-3
     "Read more →": Button variant="ghost-link" href={`/media/${pr.slug}`}

3. MEDIA CONTACT — py-16 px-10 max-w-lg mx-auto text-center
   border-t border-parchment-deep
   <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-dust mb-4">Media enquiries</p>
   <a href="mailto:media@mackays.com.au" className="font-heading font-semibold text-crimson text-[17px] hover:text-crimson-dark block mb-2">media@mackays.com.au</a>
   <a href="tel:0740887800" className="font-body text-ink-mid">(07) 4088 7800</a>

Create 3 MDX files in content/media/ with frontmatter (title, date, excerpt, slug) + placeholder body content:
  content/media/2022-iqf-expansion.mdx
  content/media/2024-tr4-free.mdx
  content/media/2025-fourth-generation.mdx

app/media/[slug]/page.tsx — simple article layout, Lora prose, max-w-2xl mx-auto.

─── CONTACT: app/contact/page.tsx ───

1. HEADER — h-[40vh] bg-parchment flex items-end pb-12
   max-w-7xl mx-auto px-10:
   <h1 className="font-heading font-bold text-[clamp(40px,6vw,64px)] tracking-[-0.03em] text-ink">{CONTACT.headline}</h1>
   <p className="font-body text-[17px] text-ink-mid mt-3">{CONTACT.subheadline}</p>

2. TWO-COLUMN LAYOUT — grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-16 max-w-7xl mx-auto px-10 py-20

   LEFT — Contact Form (React Hook Form + Zod):
   Define schema: name min(2), company optional, email email(), phone optional, 
     enquiryType z.enum(['general','retail','media','employment','other']), message min(20)
   
   All inputs: bg-parchment border border-parchment-deep rounded-[var(--radius-md)] px-4 py-3
     font-body text-[14px] text-ink placeholder:text-dust
     focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all w-full mb-5
   All labels: font-heading text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-mid block mb-2
   
   Fields: Name* | Company | Email* | Phone | Enquiry type (select) | Message* (textarea 4 rows)
   
   Submit: <Button variant="primary" type="submit" className="w-full">Send message</Button>
   
   POST to /api/contact. On success: show harvest-gold confirmation box (Framer Motion fade in):
     "Message received. We'll be in touch within one business day."
   On error: field-level messages in text-crimson font-body text-[12px] mt-1

   RIGHT — Contact Details:
   Three cards (bg-parchment-cool border border-parchment-deep rounded-xl p-6 mb-4):
     Card 1: "Farming Office" — PO Box 513 Tully QLD 4854, (07) 4088 7800, info@mackays.com.au
     Card 2: "Marketing" — marketing@mackays.com.au
     Card 3: "Retail & Trade" — trade@mackays.com.au
   
   Static map below cards:
   <QldFarmMap markers={[FARM_MARKERS[0]]} interactionDisabled className="h-[280px] rounded-xl mt-6" />

3. MEMBER BADGES — py-8 px-10 border-t border-parchment-deep text-center
   flex justify-center gap-4 flex-wrap
   <Badge variant="neutral" label="Foodbank Queensland Supporter" />
   <Badge variant="neutral" label="ABGC Member" />
   <Badge variant="neutral" label="Avocados Australia Member" />

CREATE: app/api/contact/route.ts
import { Resend } from 'resend'
import { z } from 'zod'
const resend = new Resend(process.env.RESEND_API_KEY)
Validate request body with Zod schema.
On success: resend.emails.send({ from: 'website@mackays.com.au', to: 'info@mackays.com.au', subject: `Website enquiry: ${data.enquiryType}`, text: formatEmail(data) })
Return NextResponse.json({ success: true }) or appropriate error.

METADATA all three pages — unique title + description per page.

Commit: "feat: work-with-us, media, contact — Phase 7"
Write and commit HANDOFF.md.
```

---

## PHASE 8 — Animation Polish

```
Read CLAUDE.md and HANDOFF.md. Update SPRINT.md for Phase 8.
This session only polishes existing animations — no new pages or components.

─── TASK 1: prefers-reduced-motion hook ───

Create src/hooks/useReducedMotion.ts:
  'use client'
  Detects window.matchMedia('(prefers-reduced-motion: reduce)').
  Listens for change events.
  Returns boolean.

Apply in EVERY animated component:
  const prefersReducedMotion = useReducedMotion()
  In useGSAP/Framer: if prefersReducedMotion, skip all translation/rotation.
  Keep only opacity fades at 0 duration.

─── TASK 2: Page transitions ───

Create src/components/layout/PageTransition.tsx using Framer Motion:
  <AnimatePresence mode="wait">
    <motion.div key={pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25, ease: [0.0, 0.0, 0.2, 1.0] }}>
      {children}
    </motion.div>
  </AnimatePresence>
Wrap layout content (not nav/footer) in PageTransition.

─── TASK 3: Microinteraction audit ───

Button component:
  primary/gold: hover → scale(1.01) + box-shadow: 0 0 0 4px var(--crimson-pale)
  secondary: hover → bg-parchment-warm border-dust
  All: active → scale(0.98)
  transition: all 150ms ease

ProduceCard hover (in HorizontalProduceTape and bento grid):
  image inner: scale-[1.05] transition-transform duration-500
  title: translate-y-[-3px] transition-transform duration-200

Navigation links ::after underline:
  position: absolute, bottom 0, left 0, width 100%, height 1px, bg crimson
  transform: scaleX(0), transform-origin: left
  hover: scaleX(1), transition: transform 200ms ease

─── TASK 4: StickyTimeline scrub ───
Verify ScrollTrigger uses scrub: 1 (not true, not a number > 1).
Verify markers: false (must be false in production).
Year counter updates smoothly as scroll progresses.

─── TASK 5: Mobile animation reductions ───
In all GSAP animations, wrap duration and y values:
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  stagger: isMobile ? X * 0.5 : X
  y: isMobile ? Y * 0.6 : Y
  duration: isMobile ? D * 0.8 : D

─── TASK 6: GSAP SplitText (only if GSAP Club licence confirmed) ───
If Tim has confirmed GSAP Club .npmrc setup:
  pnpm add @gsap/shockingly-good-js (the SplitText plugin package)
  In KineticHero.tsx:
    import { SplitText } from 'gsap/SplitText'
    gsap.registerPlugin(SplitText)
    const split = new SplitText(headlineRef.current, { type: 'chars,words' })
    gsap.from(split.chars, {
      y: '115%', opacity: 0, stagger: 0.022,
      ease: 'power4.out', duration: 0.75, rotationX: -15,
    })
    Wrap headline in overflow-hidden to clip the reveal.

If NOT confirmed:
  Keep current word-split, add: rotationX: -15 to existing gsap.from tween.
  This gives depth without requiring SplitText.

Acceptance criteria:
- [ ] prefers-reduced-motion disables all motion in Chrome DevTools Rendering emulation
- [ ] Page transitions smooth — no flash of unstyled content
- [ ] Button hover states feel responsive, not sluggish
- [ ] No GSAP console errors or warnings
- [ ] No ScrollTrigger markers visible in production build

Commit: "feat: animation polish — Phase 8"
Write and commit HANDOFF.md noting any deferred animations.
```

---

## PHASE 9 — Performance, SEO, Accessibility, Deploy

```
Read CLAUDE.md and HANDOFF.md. Final quality pass. 
Update SPRINT.md: target Lighthouse Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.

─── TASK 1: Image audit ───
grep -rn "<img " src/ app/ — must return zero results.
All hero images: add priority prop to ImagePlaceholder.
All images: explicit width+height OR fill+sizes.
In KineticHero: add this to root layout <head> via metadata.metadataBase:
  Add <link rel="preload" as="image"> for the LCP image via generateMetadata.

─── TASK 2: Bundle analysis ───
pnpm add -D @next/bundle-analyzer
In next.config.ts: wrap with bundle analyzer (enabled by env var ANALYZE=true).
ANALYZE=true pnpm build → identify any chunk > 200KB.
Ensure all GSAP plugin imports are inside 'use client' components only.
Ensure Mapbox is only loaded via dynamic import (already done — verify).

─── TASK 3: Metadata completeness ───
Every page: unique title (< 60 chars), description (< 160 chars).
Root layout metadata: metadataBase = new URL('https://mackays.com.au')
All pages: openGraph.title, openGraph.description, openGraph.images, twitter.card.

─── TASK 4: JSON-LD Structured Data ───
app/page.tsx — add Organization schema:
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org", "@type": "Organization",
    "name": "Mackays Marketing", "url": "https://mackays.com.au",
    "foundingDate": "1945", "description": "Australia's largest banana producer...",
    "address": { "@type": "PostalAddress", "addressLocality": "Tully", "addressRegion": "QLD", "addressCountry": "AU" },
    "telephone": "+61740887800"
  })}} />

app/our-story/page.tsx — Article schema.
Each crop page — Product schema with name, description, brand.

─── TASK 5: robots.ts + sitemap.ts ───
app/robots.ts: allow all, sitemap URL.
app/sitemap.ts: all static routes with lastModified today.

─── TASK 6: Accessibility audit ───
Install: pnpm add -D @axe-core/react
Add to root layout (dev only): dynamic import of axe-core, run against ReactDOM.
Fix ALL reported violations.

Manual checklist:
- [ ] Tab through home page — every interactive element reachable + visible
- [ ] Focus ring: 2px outline, 2px offset, color crimson — visible on ALL interactive elements
- [ ] All form inputs have associated <label>
- [ ] One <h1> per page, logical heading hierarchy
- [ ] Skip-to-content: <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-crimson focus:text-white focus:px-4 focus:py-2 focus:rounded-md">Skip to main content</a>
- [ ] Add id="main-content" to main content wrapper in layout

─── TASK 7: Vercel deploy ───
vercel link
vercel env add NEXT_PUBLIC_MAPBOX_TOKEN
vercel env add RESEND_API_KEY  
vercel env add NEXT_PUBLIC_SITE_URL

pnpm build — must pass clean.
vercel deploy --prod

─── TASK 8: Final verification ───
Walk every page at localhost:3000. Check console: zero errors.
Test contact form end-to-end (sends email to info@mackays.com.au).
Test Mapbox loads on Our Produce and Contact pages.
Test mobile at 375px viewport: all sections readable, no overflow.

FINAL HANDOFF.md must include:
- Lighthouse scores per page
- Complete placeholder image list (seed → brief description → real photo needed)
- DNS instructions: add CNAME mackays.com.au → cname.vercel-dns.com in domain registrar
- List of any deferred items

Commit: "feat: perf + SEO + a11y + deploy — Phase 9 — production ready"
git push
```

---

## QUICK REFERENCE

### After each phase
```
Use the evaluator agent to review Phase [N].
Fix all ❌ FAIL items before moving to Phase [N+1].
```

### If Claude drifts
```
Stop. Read CLAUDE.md and SPRINT.md again.
Tell me what you just violated and fix it before continuing.
```

### If context fills up mid-phase
```
Stop where you are.
Write HANDOFF.md with exact next steps.
Commit everything.
I'll start a fresh session.
```

### Starting a fresh session after a break
```
Read HANDOFF.md. Continue from exactly where the previous session stopped.
Do not redo any completed work. First thing: run pnpm tsc --noEmit and tell me the result.
```

---

*Mackays Marketing Website — Parchment Design System*
*Complete build document: Kickoff → Phase 9*
*Claude Code Desktop · April 2025*

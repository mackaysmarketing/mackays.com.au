/**
 * Shared content types used across the Mackays Marketing website.
 * Every data module in src/content imports from here so that the shape
 * of the copy layer is enforced at compile time.
 */

export interface CtaLink {
  label: string
  href: string
}

export interface SiteMeta {
  brand: string
  legalName: string
  tagline: string
  metaDescription: string
  address: string
  phone: string
  phoneTel: string
  emails: {
    info: string
    marketing: string
    trade: string
    media: string
  }
  copyright: string
  foodbankPartner: string
}

export interface StatItem {
  value: number
  prefix?: string
  suffix?: string
  label: string
}

export interface SustainabilityPillar {
  icon: 'Shield' | 'Recycle' | 'Leaf' | 'Heart'
  iconColor: 'crimson' | 'harvest-gold' | 'sage-light' | 'sage-field'
  heading: string
  body: string
}

export interface HomeHero {
  eyebrow: string
  headline: string
  subheadline: string
  ctaPrimary: CtaLink
  ctaSecondary: CtaLink
}

export interface HomeBrandStatement {
  eyebrow: string
  headline: string
  body: string
  cta: CtaLink
}

export interface HomeMapSection {
  eyebrow: string
  headline: string
  body: string
}

export interface HomeContent {
  hero: HomeHero
  stats: StatItem[]
  brandStatement: HomeBrandStatement
  sustainability: {
    eyebrow: string
    headline: string
    pillars: SustainabilityPillar[]
  }
  pullQuote: {
    quote: string
    attribution: string
  }
  mapSection: HomeMapSection
}

export interface OurStoryContent {
  hero: {
    eyebrow: string
    headline: string
    subheadline: string
  }
  founding: string
  cyclone: string
  secondGen: string
  thirdGen: string
  fourthGen: string
  futureVision: string
  pullQuote: {
    quote: string
    attribution: string
  }
}

export interface ProduceContent {
  overview: {
    eyebrow: string
    headline: string
    intro: string
  }
  smartBanana: {
    eyebrow: string
    headline: string
    body: string
  }
  iqf: {
    eyebrow: string
    headline: string
    body: string
  }
  tradeEnquiryBody: string
  crops: ProduceCropReferences
}

export type CropSlug =
  | 'bananas'
  | 'red-papaya'
  | 'avocados'
  | 'sugar-cane'
  | 'cattle'
  | 'passionfruit'

export interface ProduceCropReferences {
  bananas: { tagline: string }
  redPapaya: { tagline: string }
  avocados: { tagline: string }
  sugarCane: { tagline: string }
  cattle: { tagline: string }
  passionfruit: { tagline: string }
}

export interface CropGrowingFacts {
  soil: string
  climate: string
  region: string
  harvest: string
}

export interface CropVariety {
  name: string
  description: string
}

export interface CropStat {
  value: number
  prefix?: string
  suffix?: string
  label: string
}

export interface CropData {
  slug: CropSlug
  name: string
  tagline: string
  heroSeed: number
  storySeed: number
  eyebrow: string
  storyHeadline: string
  story: string
  growing: CropGrowingFacts
  varieties?: CropVariety[]
  pullQuote: string
  stats: CropStat[]
}

export interface Director {
  name: string
  title: string
  role: string
  imageSeed: number
}

export interface EnvironmentTabContent {
  biosecurity: string
  water: string
  carbon: string
  iqf: string
}

export interface PeopleEnvironmentContent {
  hero: {
    eyebrow: string
    headline: string
    subheadline: string
    ctaPrimary: CtaLink
  }
  ourPeople: {
    eyebrow: string
    headline: string
    body1: string
    body2: string
  }
  directors: Director[]
  boardNote: string
  fourthGenStatement: string
  environment: EnvironmentTabContent
  community: {
    foodbankBody: string
  }
}

export interface WorkPillar {
  number: string
  title: string
  body: string
  accent: 'crimson' | 'harvest-gold' | 'sage-field'
}

export interface WorkRole {
  icon:
    | 'Sprout'
    | 'Tractor'
    | 'Package'
    | 'Truck'
    | 'Wrench'
    | 'Users'
    | 'Cpu'
    | 'ClipboardList'
  title: string
  description: string
  accent: 'crimson' | 'harvest-gold' | 'sage-field'
}

export interface WorkOpportunity {
  title: string
  location: string
  type: string
  responsibilities: string
  applyHref: string
}

export interface WorkWithUsContent {
  hero: {
    eyebrow: string
    headline: string
    subheadline: string
    ctaPrimary: CtaLink
  }
  pillars: WorkPillar[]
  roles: WorkRole[]
  opportunities: WorkOpportunity[]
  alwaysRecruiting: {
    eyebrow: string
    headline: string
    body: string
    cta: CtaLink
  }
}

export interface PressRelease {
  slug: string
  date: string
  headline: string
  excerpt: string
  body: string
}

export interface MediaContent {
  hero: {
    eyebrow: string
    headline: string
    subheadline: string
  }
  pressReleases: PressRelease[]
  mediaContact: {
    eyebrow: string
    email: string
    phone: string
  }
}

export interface ContactOffice {
  title: string
  lines: string[]
  email: string
  phone?: string
}

export interface ContactContent {
  headline: string
  subheadline: string
  offices: ContactOffice[]
  badges: string[]
}

export interface FarmMarker {
  id: string
  longitude: number
  latitude: number
  label: string
  crops: string
  hectares: string
  note: string
}

export interface TimelineItem {
  year: string
  headline: string
  body: string
  imageSeed?: number
}

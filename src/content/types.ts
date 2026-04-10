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
  url: string
  foundingDate: string
  address: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  addressCountry: string
  latitude: number
  longitude: number
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
  marquee: string[]
  keywords: string[]
}

export interface StatItem {
  value: number
  prefix?: string
  suffix?: string
  label: string
  /**
   * Thousands separator passed through to CountUp. Defaults to ","; pass ""
   * for year-style values (e.g. 1945) that should not be formatted with a
   * comma.
   */
  separator?: string
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

export interface HomeProduceTapeSlide {
  slug: CropSlug
  seed: number
  stat: string
  href: string
}

export interface HomeSectionLabels {
  produce: {
    eyebrow: string
    headline: string
  }
  story: {
    eyebrow: string
    headline: string
    fullHistoryCta: string
  }
  lifeAtMackays: {
    eyebrow: string
    headline: string
  }
}

export interface HomePhotoGridItem {
  seed: number
  caption: string
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
  produceTape: HomeProduceTapeSlide[]
  sectionLabels: HomeSectionLabels
  lifePhotoGrid: HomePhotoGridItem[]
}

export interface OurStorySectionLabels {
  founding: {
    eyebrow: string
    headline: string
  }
  familyTree: {
    eyebrow: string
    headline: string
  }
  futureVision: {
    eyebrow: string
    headline: string
  }
}

export interface OurStoryFamilyTree {
  gen1: {
    left: string
    right: string
  }
  gen2: string[]
  gen3Title: string
  gen4Caption: string
}

export type ValueAccent = 'crimson' | 'harvest-gold' | 'sage-field'

export interface OurStoryValue {
  number: string
  heading: string
  body: string
  accent: ValueAccent
}

export interface OurStoryContent {
  hero: {
    eyebrow: string
    headline: string
    subheadline: string
  }
  founding: string
  foundingBlockquote: string
  cyclone: string
  secondGen: string
  thirdGen: string
  fourthGen: string
  futureVision: string
  pullQuote: {
    quote: string
    attribution: string
  }
  sectionLabels: OurStorySectionLabels
  familyTree: OurStoryFamilyTree
  values: OurStoryValue[]
  ctas: {
    futureVision: CtaLink
  }
}

export type SupplyChainIcon = 'MapPin' | 'Package' | 'ShoppingCart'

export interface SupplyChainStep {
  stepLabel: string
  icon: SupplyChainIcon
  title: string
  subtitle: string
}

export type BadgeTone = 'crimson' | 'gold' | 'sage' | 'neutral'

export interface BentoGridItem {
  slug: CropSlug
  seed: number
  stat: string
  badgeVariant: BadgeTone
  span: string
  minHeight: string
}

export interface ProduceOverview {
  eyebrow: string
  headline: string
  intro: string
  hero: {
    eyebrow: string
    headline: string
    imageAlt: string
    ctaPrimary: CtaLink
  }
  bento: {
    eyebrow: string
    headline: string
    items: BentoGridItem[]
  }
  supplyChain: {
    eyebrow: string
    headline: string
    steps: SupplyChainStep[]
  }
  iqfBand: {
    eyebrow: string
    headline: string
    imageAlt: string
    imageSeed: number
  }
  tradeBand: {
    headline: string
    cta: CtaLink
  }
}

export interface CropPageLabels {
  breadcrumb: string
  growing: {
    soil: string
    climate: string
    region: string
    harvest: string
  }
  varieties: {
    eyebrow: string
    headlineTemplate: string
  }
  related: {
    eyebrow: string
    headline: string
    moreAriaLabel: string
  }
  tradeCallout: {
    eyebrow: string
    headline: string
    ctaLabel: string
  }
}

export interface ProduceContent {
  overview: ProduceOverview
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
  cropPage: CropPageLabels
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

export interface EnvironmentTabBodies {
  biosecurity: string
  water: string
  carbon: string
  iqf: string
}

export type EnvironmentTabKey = 'biosecurity' | 'water' | 'carbon' | 'iqf'

export interface EnvironmentTabLabels {
  biosecurity: string
  water: string
  carbon: string
  iqf: string
}

export interface EnvironmentWaterStat {
  value: number
  suffix: string
  label: string
}

export interface EnvironmentContent {
  eyebrow: string
  headline: string
  tabLabels: EnvironmentTabLabels
  bodies: EnvironmentTabBodies
  biosecurityBadge: string
  biosecurityImage: {
    seed: number
    alt: string
  }
  waterStats: EnvironmentWaterStat[]
  carbonFootnote: string
  carbonProgressLabel: string
  iqfImage: {
    seed: number
    alt: string
  }
  iqfStat: {
    value: number
    suffix: string
    label: string
  }
}

export interface PeopleEnvironmentSectionLabels {
  leadership: {
    eyebrow: string
    headline: string
  }
}

export interface PeopleEnvironmentCommunity {
  eyebrow: string
  headline: string
  foodbankBody: string
  cta: CtaLink
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
  fourthGenCta: CtaLink
  sectionLabels: PeopleEnvironmentSectionLabels
  environment: EnvironmentContent
  community: PeopleEnvironmentCommunity
  lifePhotoGrid: HomePhotoGridItem[]
  ourPeopleImage: {
    seed: number
    alt: string
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

export interface WorkWithUsSectionLabels {
  whyMackays: {
    eyebrow: string
    headline: string
  }
  roleCategories: {
    eyebrow: string
    headline: string
  }
  currentOpportunities: {
    eyebrow: string
    headline: string
  }
}

export interface WorkWithUsContent {
  hero: {
    eyebrow: string
    headline: string
    subheadline: string
    ctaPrimary: CtaLink
    imageAlt: string
  }
  sectionLabels: WorkWithUsSectionLabels
  pillars: WorkPillar[]
  roles: WorkRole[]
  roleCtaLabel: string
  opportunities: WorkOpportunity[]
  opportunityApplyLabel: string
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

export interface MediaLabels {
  readMore: string
  readMoreAriaTemplate: string
  backToList: string
  mediaContactCta: string
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
  labels: MediaLabels
}

export interface ContactOffice {
  title: string
  lines: string[]
  email: string
  phone?: string
}

export type ContactEnquiryType =
  | 'general'
  | 'retail'
  | 'media'
  | 'employment'
  | 'other'

export interface ContactEnquiryOption {
  value: ContactEnquiryType
  label: string
}

export interface ContactFormLabels {
  name: string
  company: string
  email: string
  phone: string
  enquiryType: string
  message: string
}

export interface ContactFormPlaceholders {
  name: string
  company: string
  email: string
  phone: string
  enquiryTypePlaceholder: string
  message: string
}

export interface ContactFormValidation {
  nameMin: string
  emailInvalid: string
  enquiryRequired: string
  messageMin: string
}

export interface ContactEmailTemplate {
  fromName: string
  subjectPrefix: string
  bodyTitle: string
  bodyDivider: string
  bodyLineLabels: {
    name: string
    company: string
    email: string
    phone: string
    enquiryType: string
  }
  bodyMessageHeading: string
}

export interface ContactFormContent {
  heading: string
  labels: ContactFormLabels
  placeholders: ContactFormPlaceholders
  enquiryOptions: ContactEnquiryOption[]
  submitLabel: string
  submittingLabel: string
  successHeading: string
  successBody: string
  errorBody: string
  validation: ContactFormValidation
  emailTemplate: ContactEmailTemplate
}

export interface ContactContent {
  headline: string
  subheadline: string
  offices: ContactOffice[]
  sidebarHeading: string
  badges: string[]
  badgesHeading: string
  form: ContactFormContent
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

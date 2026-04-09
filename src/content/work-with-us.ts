import type { WorkWithUsContent } from './types'

const DAYFORCE_URL =
  'https://aus232.dayforcehcm.com/CandidatePortal/en-AU/mfg/SITE/CANDIDATEPORTAL'

export const WORK_WITH_US: WorkWithUsContent = {
  hero: {
    eyebrow: 'Careers',
    headline: 'Come grow with us.',
    subheadline:
      "We hire locally, we train continuously, and we offer real careers in a business that isn't going anywhere. Farm, packing shed, IQF facility, workshop, office — there is more than one way into Mackays.",
    ctaPrimary: { label: 'See current roles', href: DAYFORCE_URL },
  },
  sectionLabels: {
    whyMackays: {
      eyebrow: 'Why Mackays',
      headline: 'A business worth working for.',
    },
    roleCategories: {
      eyebrow: 'What we hire for',
      headline: 'Find your place in the operation.',
    },
    currentOpportunities: {
      eyebrow: 'Current Opportunities',
      headline: "Roles we're recruiting for now.",
    },
  },
  roleCtaLabel: 'See roles',
  opportunityApplyLabel: 'Apply via Dayforce',
  pillars: [
    {
      number: '01',
      title: 'Family business, proper scale',
      body: 'Still owned and run by the Mackay family, 80 years in. Big enough to offer a real career path, small enough that your work is seen by the people whose name is on the gate.',
      accent: 'crimson',
    },
    {
      number: '02',
      title: 'Local first',
      body: 'We hire in Tully, on the Tablelands and in Dimbulah first. Many of our team live within 20 minutes of the blocks they work on.',
      accent: 'harvest-gold',
    },
    {
      number: '03',
      title: 'Training that sticks',
      body: 'Forklift, chemical handling, irrigation, agronomy, heavy vehicle, packaging technology, leadership. We train for the career, not just the job.',
      accent: 'sage-field',
    },
    {
      number: '04',
      title: 'Year-round work',
      body: 'Bananas, cane, papaya, avocados and passionfruit overlap across the calendar. For most roles, that means twelve months of work — not a picking season.',
      accent: 'crimson',
    },
  ],
  roles: [
    {
      icon: 'Sprout',
      title: 'Growing & agronomy',
      description:
        'Agronomists, irrigation techs, block supervisors and field hands across bananas, papaya, avocados and cane.',
      accent: 'sage-field',
    },
    {
      icon: 'Tractor',
      title: 'Farm operations',
      description:
        'Tractor operators, sprayer operators, machinery crews. Training provided for the right applicants.',
      accent: 'crimson',
    },
    {
      icon: 'Package',
      title: 'Packing & IQF',
      description:
        'Packing shed team members, IQF facility operators, quality control and despatch.',
      accent: 'harvest-gold',
    },
    {
      icon: 'Truck',
      title: 'Logistics & cold chain',
      description:
        'Cold-chain coordinators, despatch planners, refrigerated transport roles.',
      accent: 'crimson',
    },
    {
      icon: 'Wrench',
      title: 'Workshop & maintenance',
      description:
        'Diesel fitters, electricians, irrigation maintenance, general workshop hands.',
      accent: 'sage-field',
    },
    {
      icon: 'Users',
      title: 'Office, HR & leadership',
      description:
        'HR, payroll, finance, quality, sustainability, IT and leadership roles across the group.',
      accent: 'harvest-gold',
    },
  ],
  opportunities: [
    {
      title: 'Farm Hand — Bananas',
      location: 'Tully, QLD',
      type: 'Full-time',
      responsibilities:
        'General farm duties across our Tully banana blocks — planting, maintenance, deleafing, bunch care and harvest support. Training provided.',
      applyHref: DAYFORCE_URL,
    },
    {
      title: 'Packing Shed Team Member',
      location: 'Tully, QLD',
      type: 'Full-time',
      responsibilities:
        'Grading, quality control and packaging of banana and papaya lines at our Tully packing facility. Day and evening shifts available.',
      applyHref: DAYFORCE_URL,
    },
    {
      title: 'Diesel Fitter',
      location: 'Tully, QLD',
      type: 'Full-time',
      responsibilities:
        'Maintenance and repair of tractors, harvesters, quads and associated farm machinery. Workshop and on-farm work.',
      applyHref: DAYFORCE_URL,
    },
    {
      title: 'IQF Production Operator',
      location: 'Tully, QLD',
      type: 'Full-time',
      responsibilities:
        'Line operation, quality sampling and hygiene-compliant handling across our IQF frozen fruit facility.',
      applyHref: DAYFORCE_URL,
    },
    {
      title: 'Block Supervisor — Avocados',
      location: 'Atherton Tablelands, QLD',
      type: 'Full-time',
      responsibilities:
        'Day-to-day oversight of Maluma and Shepherd blocks, team leadership, irrigation management and harvest scheduling.',
      applyHref: DAYFORCE_URL,
    },
    {
      title: 'HR Coordinator',
      location: 'Tully, QLD',
      type: 'Full-time',
      responsibilities:
        'People coordination across a 550-strong team, onboarding, training, seasonal ramp-up and workplace compliance support.',
      applyHref: DAYFORCE_URL,
    },
  ],
  alwaysRecruiting: {
    eyebrow: 'Always Recruiting',
    headline: "Don't see your role? Submit a profile.",
    body: 'We hire year-round. Our Dayforce portal keeps your profile active — we review applications continuously, not just when a role is advertised.',
    cta: { label: 'Submit via Dayforce', href: DAYFORCE_URL },
  },
}

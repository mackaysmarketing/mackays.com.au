import type { HomeContent } from './types'

export const HOME: HomeContent = {
  hero: {
    eyebrow: 'Far North Queensland · Est. 1945',
    headline: 'The land that feeds Australia.',
    subheadline:
      "Eighty years of family farming across 5,800 hectares of Tully Valley, the Atherton Tablelands and Dimbulah. Australia's largest banana grower — and the people quietly keeping a tropical foodbowl on Coles, Woolworths and ALDI shelves every week of the year.",
    ctaPrimary: { label: 'Our story', href: '/our-story' },
    ctaSecondary: { label: 'Our produce', href: '/our-produce' },
  },
  stats: [
    { value: 1945, label: 'Farming since' },
    { value: 5800, suffix: '+', label: 'Hectares under management' },
    { value: 550, suffix: '+', label: 'Team members' },
    { value: 13, suffix: '%', label: "Of Australia's bananas" },
  ],
  brandStatement: {
    eyebrow: "Australia's leading tropical produce grower",
    headline: "We grow what thrives where others won't.",
    body: "Mackays is a fourth-generation family business rooted in the Tully Valley and the Atherton Tablelands — two of the most unique tropical growing microclimates on earth. We grow bananas, red papaya, avocados, sugar cane, grass-fed cattle and passionfruit. We grow for the country's biggest grocers, and we grow because three generations of our family have already done the hard work of staying.",
    cta: { label: 'Read our story', href: '/our-story' },
  },
  sustainability: {
    eyebrow: 'Our Commitment',
    headline: "We don't manage land. We steward it.",
    pillars: [
      {
        icon: 'Shield',
        iconColor: 'crimson',
        heading: 'Biosecurity',
        body: 'Three consecutive years Panama TR4-free. Strict on-farm protocols, quarantine zones and vehicle wash-downs across every block.',
      },
      {
        icon: 'Recycle',
        iconColor: 'harvest-gold',
        heading: 'Zero waste',
        body: 'Our Tully IQF facility turns cosmetically rejected fruit into frozen product — extending value, cutting waste and adding jobs.',
      },
      {
        icon: 'Leaf',
        iconColor: 'sage-light',
        heading: 'Water & soil',
        body: '8,830 ML of licensed water plus a 2,000 ML private agreement, deployed via efficient drip irrigation and soil-carbon rotations.',
      },
      {
        icon: 'Heart',
        iconColor: 'sage-light',
        heading: 'Community',
        body: 'Fifty-thousand Queensland schoolchildren eat a Mackays banana every week through our partnership with Foodbank Queensland.',
      },
    ],
  },
  pullQuote: {
    quote:
      "We don't farm for the quarter. We farm for the next generation of Mackays — and for the kids in Queensland schools who eat one of our bananas every morning.",
    attribution: 'Barrie Mackay, Third Generation Director',
  },
  mapSection: {
    eyebrow: 'Growing Regions',
    headline: 'Three regions. One reason — resilience.',
    body: "We farm across three distinct tropical and sub-tropical zones in Far North Queensland so that weather, pest and market shocks can't take out the whole operation at once.",
  },
}

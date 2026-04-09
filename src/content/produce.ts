import type {
  CropData,
  CropSlug,
  ProduceContent,
} from './types'

export const CROP_SLUGS: CropSlug[] = [
  'bananas',
  'red-papaya',
  'avocados',
  'sugar-cane',
  'cattle',
  'passionfruit',
]

export const PRODUCE_DATA: Record<CropSlug, CropData> = {
  bananas: {
    slug: 'bananas',
    name: 'Bananas',
    tagline: 'The crop that built the business.',
    heroSeed: 20,
    storySeed: 21,
    eyebrow: 'Cavendish · Far North Queensland',
    storyHeadline: 'The crop that built the business.',
    story:
      "Bananas are what Stanley Mackay planted first in 1945, and they're still the heart of the operation. We grow Cavendish across the Tully Valley — the wettest, warmest, most banana-suited country in Australia — and pack them same-day in our own Tully sheds for next-morning delivery to the eastern seaboard. About thirteen percent of every banana eaten in Australia comes off a Mackays block.",
    growing: {
      soil: 'Rich volcanic alluvial',
      climate: '3,500+ mm rainfall/yr',
      region: 'Tully Valley · Atherton Tablelands',
      harvest: 'Year-round',
    },
    varieties: [
      {
        name: 'Cavendish',
        description:
          'The Australian supermarket standard. Heavy, sweet, consistent — and the variety our growing systems have been refined around for three generations.',
      },
      {
        name: 'Lady Finger',
        description:
          'A smaller, denser, sweeter sub-tropical variety grown in limited volume on selected Atherton Tablelands blocks for specialty retail.',
      },
    ],
    pullQuote:
      "You don't get to be Australia's biggest banana grower by accident. You get there because three generations of the same family turned up every morning and did the next right thing.",
    stats: [
      { value: 13, suffix: '%', label: "Of Australia's bananas" },
      { value: 3500, suffix: 'mm', label: 'Annual rainfall (Tully)' },
      { value: 12, suffix: ' mo', label: 'Continuous harvest window' },
    ],
  },
  'red-papaya': {
    slug: 'red-papaya',
    name: 'Red Papaya',
    tagline: 'Atherton-grown. Two varieties. One standard.',
    heroSeed: 50,
    storySeed: 51,
    eyebrow: 'Red Papaya · Atherton Tablelands',
    storyHeadline: 'Atherton-grown. Tropical-sweet.',
    story:
      'Our red papaya blocks sit on the basalt-rich soils of the Atherton Tablelands, where warm days and cool nights push sugars up without cooking the fruit on the tree. We grow two proprietary selections — Ruby Rise and Red Hill — picked ripe and packed into the same supply chain that carries our bananas south. If you see a red papaya in a major Australian supermarket, there is a good chance it came off one of our blocks.',
    growing: {
      soil: 'Basalt red clay',
      climate: 'Warm days, cool nights',
      region: 'Atherton Tablelands',
      harvest: 'Year-round peak Jun–Dec',
    },
    varieties: [
      {
        name: 'Ruby Rise',
        description:
          'Deep-red flesh, high brix, consistent fruit size. Our flagship retail line.',
      },
      {
        name: 'Red Hill',
        description:
          'A slightly firmer-fleshed selection with a longer shelf life — suited to extended supply chains and export programmes.',
      },
    ],
    pullQuote:
      "Good papaya is 80% where it's grown and 20% how it's picked. The Atherton Tablelands do most of the work for us.",
    stats: [
      { value: 2, label: 'Proprietary varieties' },
      { value: 700, suffix: 'm', label: 'Altitude above sea level' },
      { value: 12, suffix: ' mo', label: 'Harvest window' },
    ],
  },
  avocados: {
    slug: 'avocados',
    name: 'Avocados',
    tagline: 'Maluma and Shepherd from the Tablelands.',
    heroSeed: 60,
    storySeed: 61,
    eyebrow: 'Avocados · Atherton Tablelands',
    storyHeadline: 'Maluma and Shepherd, grown where they should be grown.',
    story:
      "Avocados are a newer chapter of the Mackays story, and they've earned their place because the Atherton Tablelands and Dimbulah are among the best avocado-growing country in the country. We grow two varieties — Maluma and Shepherd — deliberately chosen to give our retail partners a reliable, year-round offer from a single trusted grower rather than a patchwork of sources.",
    growing: {
      soil: 'Free-draining volcanic',
      climate: 'Subtropical upland',
      region: 'Atherton Tablelands · Dimbulah',
      harvest: 'Staggered Feb–Nov',
    },
    varieties: [
      {
        name: 'Maluma',
        description:
          'A premium dark-skinned variety with exceptional oil content and a long ripening window. Our primary retail line.',
      },
      {
        name: 'Shepherd',
        description:
          'A smooth, green-skinned avocado that holds its colour when cut — favoured by foodservice and high-turnover retail programmes.',
      },
    ],
    pullQuote:
      'Avocados reward patience. You plant them expecting to break even in year seven — and you plant them anyway, because the next generation will be the one picking them.',
    stats: [
      { value: 2, label: 'Varieties grown' },
      { value: 10, suffix: ' mo', label: 'Combined harvest window' },
    ],
  },
  'sugar-cane': {
    slug: 'sugar-cane',
    name: 'Sugar Cane',
    tagline: 'A thousand hectares of Tully green.',
    heroSeed: 80,
    storySeed: 81,
    eyebrow: 'Sugar Cane · Tully Valley',
    storyHeadline: 'A thousand hectares of Tully green.',
    story:
      "Sugar cane has always been part of the Tully Valley's rhythm, and Mackays grows more than a thousand hectares of it in rotation with our banana blocks. Cane gives the soil a rest between banana cycles, carries us through the parts of the year when banana prices soften, and feeds into the Tully sugar mill — a century-old piece of regional infrastructure we're proud to keep supplying.",
    growing: {
      soil: 'Alluvial Tully Valley',
      climate: 'Wet tropical',
      region: 'Tully Valley',
      harvest: 'Jun–Dec crush season',
    },
    pullQuote:
      "Cane isn't just a crop here. It's the backbone of the district — and we're not about to let that backbone weaken on our watch.",
    stats: [
      { value: 1000, suffix: '+', label: 'Hectares under cane' },
      { value: 1, suffix: '00yr', label: 'Tully mill heritage' },
    ],
  },
  cattle: {
    slug: 'cattle',
    name: 'Cattle',
    tagline: 'Grass-fed. Tully-raised. No shortcuts.',
    heroSeed: 70,
    storySeed: 71,
    eyebrow: 'Cattle · Tully back country',
    storyHeadline: 'Grass-fed. Tully-raised. No shortcuts.',
    story:
      'We run around eight hundred head of grass-fed cattle on the back country of our Tully holdings — the steeper, wetter blocks that are unsuited to cropping but suited to cattle. They graze on native and improved pasture, are moved regularly to protect ground cover, and are part of how we keep non-arable land producing food rather than weeds.',
    growing: {
      soil: 'Improved and native pasture',
      climate: 'Wet tropical back country',
      region: 'Tully range country',
      harvest: 'Rotational grazing',
    },
    pullQuote:
      'Every acre of back country doing the work of feeding a cow is an acre we don\'t have to watch go to lantana.',
    stats: [
      { value: 800, suffix: ' head', label: 'Grass-fed herd' },
      { value: 100, suffix: '%', label: 'Grass-fed, no finishing lot' },
    ],
  },
  passionfruit: {
    slug: 'passionfruit',
    name: 'Passionfruit',
    tagline: 'The small crop that punches up.',
    heroSeed: 150,
    storySeed: 151,
    eyebrow: 'Passionfruit · Far North Queensland',
    storyHeadline: 'The small crop that punches up.',
    story:
      "Passionfruit is the smallest line in our mix and one of the most demanding to grow well. We grow it on trellises in selected Far North Queensland blocks, pick by hand, and move it through our own packing and cold-chain logistics. It's a premium specialty line for retail programmes that want a reliably Australian-grown passionfruit supply.",
    growing: {
      soil: 'Free-draining tropical loam',
      climate: 'Warm tropical',
      region: 'Far North Queensland',
      harvest: 'Staggered year-round',
    },
    pullQuote:
      "You can't rush passionfruit. You pick it when it tells you it's ready, and if you get it right, it's the best piece of fruit on any shelf.",
    stats: [
      { value: 100, suffix: '%', label: 'Hand-picked' },
    ],
  },
}

export const PRODUCE: ProduceContent = {
  overview: {
    eyebrow: 'Our Produce',
    headline: 'Six crops. Three regions. One standard.',
    intro:
      "Every crop we grow was chosen because the ground we farm is the best place in Australia to grow it. Six crops, three distinct growing regions, a single integrated team that's been doing this for 80 years.",
    hero: {
      eyebrow: 'Our Produce',
      headline: 'Six crops.\nThree regions.\nOne standard.',
      imageAlt: 'A Mackays tropical produce block at harvest',
      ctaPrimary: {
        label: 'Explore bananas',
        href: '/our-produce/bananas',
      },
    },
    bento: {
      eyebrow: 'What we grow',
      headline: 'Every crop chosen for where we farm it.',
      items: [
        {
          slug: 'bananas',
          seed: 20,
          stat: '13% of national supply',
          badgeVariant: 'gold',
          span: 'md:col-span-3 md:row-span-2',
          minHeight: 'min-h-[320px] md:min-h-[520px]',
        },
        {
          slug: 'red-papaya',
          seed: 50,
          stat: 'Ruby Rise & Red Hill',
          badgeVariant: 'crimson',
          span: 'md:col-span-2',
          minHeight: 'min-h-[240px]',
        },
        {
          slug: 'avocados',
          seed: 60,
          stat: 'Maluma & Shepherd',
          badgeVariant: 'sage',
          span: 'md:col-span-2',
          minHeight: 'min-h-[240px]',
        },
        {
          slug: 'sugar-cane',
          seed: 80,
          stat: '1,000+ hectares',
          badgeVariant: 'sage',
          span: 'md:col-span-2',
          minHeight: 'min-h-[240px]',
        },
        {
          slug: 'cattle',
          seed: 70,
          stat: '~800 head, grass-fed',
          badgeVariant: 'neutral',
          span: 'md:col-span-2',
          minHeight: 'min-h-[240px]',
        },
        {
          slug: 'passionfruit',
          seed: 150,
          stat: 'Hand-picked',
          badgeVariant: 'crimson',
          span: 'md:col-span-1',
          minHeight: 'min-h-[240px]',
        },
      ],
    },
    supplyChain: {
      eyebrow: 'Supply Chain',
      headline: 'Farm to shelf in 48 hours.',
      steps: [
        {
          stepLabel: 'Step 01',
          icon: 'MapPin',
          title: 'Farm',
          subtitle: 'Far North Queensland',
        },
        {
          stepLabel: 'Step 02',
          icon: 'Package',
          title: 'Packed',
          subtitle: 'Same-day Tully sheds',
        },
        {
          stepLabel: 'Step 03',
          icon: 'ShoppingCart',
          title: 'Shelf',
          subtitle: 'Coles · Woolworths · ALDI',
        },
      ],
    },
    iqfBand: {
      eyebrow: 'Zero Waste',
      headline: 'Nothing goes to waste.',
      imageAlt: 'Mackays IQF (Individually Quick Frozen) facility in Tully',
      imageSeed: 130,
    },
    tradeBand: {
      headline: 'Want to stock Mackays produce?',
      cta: {
        label: 'Enquire about supply',
        href: 'mailto:trade@mackays.com.au',
      },
    },
  },
  smartBanana: {
    eyebrow: 'Innovation',
    headline: 'The Smart Banana.',
    body: "The Smart Banana is our approach to reducing supply-chain waste between tree and shelf. Better tracking of ripening data, better packaging to reduce bruising, and tighter cold-chain control — so that the banana you pick up on a Thursday is as close as possible to the one we picked on a Monday.",
  },
  iqf: {
    eyebrow: 'Zero Waste',
    headline: 'Nothing goes to waste.',
    body: "Cosmetically rejected fruit — perfectly ripe, perfectly edible, just not supermarket-pretty — used to be a hard loss. Our Tully IQF (Individually Quick Frozen) facility turns it into frozen product for foodservice and retail. It extends the value of every piece of fruit we grow, and the expansion has created more than fifty permanent jobs in Tully alone.",
  },
  tradeEnquiryBody:
    "Whether you're a major retailer, a wholesaler, a foodservice operator or an export buyer, our trade team can talk volume, specifications and supply-continuity planning across every crop in our range.",
  cropPage: {
    breadcrumb: 'Our Produce',
    growing: {
      soil: 'Soil',
      climate: 'Climate',
      region: 'Region',
      harvest: 'Harvest',
    },
    varieties: {
      eyebrow: 'Our Varieties',
      headlineTemplate: 'Two ways we grow {crop}.',
    },
    related: {
      eyebrow: 'Also from Mackays',
      headline: 'More from the farm.',
      moreAriaLabel: 'See more from Mackays',
    },
    tradeCallout: {
      eyebrow: 'Retail & Trade',
      headline: 'Enquire about supply.',
      ctaLabel: 'Contact our trade team',
    },
  },
  crops: {
    bananas: { tagline: PRODUCE_DATA.bananas.tagline },
    redPapaya: { tagline: PRODUCE_DATA['red-papaya'].tagline },
    avocados: { tagline: PRODUCE_DATA.avocados.tagline },
    sugarCane: { tagline: PRODUCE_DATA['sugar-cane'].tagline },
    cattle: { tagline: PRODUCE_DATA.cattle.tagline },
    passionfruit: { tagline: PRODUCE_DATA.passionfruit.tagline },
  },
}

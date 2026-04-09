import type { PeopleEnvironmentContent } from './types'

export const PEOPLE_ENVIRONMENT: PeopleEnvironmentContent = {
  hero: {
    eyebrow: 'Our People',
    headline: '550 people. Three regions.|One standard — theirs.',
    subheadline:
      "The 550-plus people who show up to grow, pick, pack, freeze and move Australia's largest tropical produce operation. Most of them are from Tully. Many of them have worked for more than one generation of the Mackay family. A few of them are Mackays.",
    ctaPrimary: { label: 'Work with us', href: '/work-with-us' },
  },
  ourPeople: {
    eyebrow: 'Our Team',
    headline: 'The people are the product.',
    body1:
      "Everything we grow passes through the hands of one of our 550-plus team members at least once — usually more. Pickers, packers, tractor operators, mechanics, shed foremen, agronomists, HR, logistics, leadership. The quality of a Mackays banana on a Sydney shelf on a Thursday morning is the sum of every one of their decisions.",
    body2:
      "We hire locally wherever we can, we train continuously, and we take the word 'career' seriously in an industry that sometimes treats farm work as a transaction. Many of our team have been with the family for decades. Some are now in their second generation at Mackays.",
  },
  ourPeopleImage: {
    seed: 40,
    alt: 'Mackays packing shed team, Tully',
  },
  directors: [
    {
      name: 'Gavin Mackay',
      title: 'Director — Operations',
      role:
        "Runs day-to-day operations across all growing regions. Where the brothers' instinct about 'what the farm needs today' gets turned into the actual day's plan.",
      imageSeed: 101,
    },
    {
      name: 'Barrie Mackay',
      title: 'Director — Production',
      role:
        'Holds the production standard. The one who walks the blocks, sees the fruit before it sees a packing shed, and says yes or no.',
      imageSeed: 102,
    },
    {
      name: 'Stephen Mackay',
      title: 'Director — Strategy',
      role:
        "Looks ten years out. Retail relationships, capital investment, where the business needs to be when the fourth generation fully steps in.",
      imageSeed: 103,
    },
    {
      name: 'Cameron Mackay',
      title: 'Director — Growing Systems',
      role:
        'Owns agronomy, irrigation, soil health and the ongoing experiments on how we grow better, with less input, on more difficult ground.',
      imageSeed: 104,
    },
    {
      name: 'Daniel Mackay',
      title: 'Director — Geographic Expansion',
      role:
        'Leads the expansion of the Mackays model into new growing regions — and the integration of newly acquired farms into the wider operation.',
      imageSeed: 105,
    },
  ],
  boardNote:
    'All five directors are third-generation Mackays — sons of John and Robert Mackay, grandsons of Stanley and Agnes. Every major decision is made by a board that has collectively spent more than 150 years on the ground in Tully.',
  fourthGenStatement:
    "The fourth generation is already in the business — on the tractors, in the sheds, in logistics, in agtech. When they take over, they'll inherit a farm that's been run, without interruption, by people who share their name.",
  fourthGenCta: { label: 'Join the team', href: '/work-with-us' },
  sectionLabels: {
    leadership: {
      eyebrow: 'Leadership',
      headline: 'Guided by those who grew up here.',
    },
  },
  environment: {
    eyebrow: 'Our Commitment to the Land',
    headline: "We steward, we don't just farm.",
    tabLabels: {
      biosecurity: 'Biosecurity',
      water: 'Water',
      carbon: 'Carbon',
      iqf: 'Zero Waste',
    },
    bodies: {
      biosecurity:
        "Panama TR4 is the most serious biological threat to the Australian banana industry in a generation. Mackays has been TR4-free for three consecutive years — verified — and we treat biosecurity like we treat our payroll: non-negotiable. On-farm protocols, quarantine zones, wash-down stations, visitor restrictions and independent auditing are all part of keeping it that way, for our farm and for every other farm in the valley.",
      water:
        "Our farms operate on 8,830 megalitres of licensed water entitlements plus a long-standing 2,000 ML private agreement — deployed through high-efficiency drip irrigation, soil-moisture monitoring and rotational cropping. Tully gets the rain. Our job is to make sure the water we use on top of that rain is the water the crop actually needs, and nothing more.",
      carbon:
        "We're measuring. An independent carbon sequestration audit is currently underway across our banana and cane blocks, looking at soil organic carbon, canopy carbon and the net effect of our rotational and ground-cover practices. 2025 results pending — and we've committed to publishing them regardless of what they say.",
      iqf:
        "Our Tully IQF (Individually Quick Frozen) facility is the single biggest waste-reduction initiative in the business. Fruit that would previously have been dumped — perfectly edible, just imperfect — is now frozen within hours of picking and sold into foodservice and retail. The expansion has created more than fifty new permanent jobs in Tully.",
    },
    biosecurityBadge: 'Panama TR4-Free — 3 consecutive years',
    biosecurityImage: {
      seed: 10,
      alt: 'On-farm biosecurity protocols at a Mackays block',
    },
    waterStats: [
      { value: 8830, suffix: ' ML', label: 'Licensed water entitlements' },
      { value: 2000, suffix: ' ML', label: 'Private agreement' },
    ],
    carbonProgressLabel: 'Soil + canopy audit progress',
    carbonFootnote:
      'Carbon sequestration audit underway. 2025 results pending.',
    iqfImage: {
      seed: 130,
      alt: 'Mackays IQF (Individually Quick Frozen) facility, Tully',
    },
    iqfStat: {
      value: 50,
      suffix: '+',
      label: 'New Tully jobs from IQF expansion',
    },
  },
  community: {
    eyebrow: 'Foodbank Queensland',
    headline:
      '50,000 Queensland schoolchildren. Mackays bananas. Every week.',
    foodbankBody:
      "Every week, Mackays donates bananas to Foodbank Queensland, and every week those bananas end up in the school breakfast programmes of roughly fifty thousand Queensland schoolchildren. It is the partnership we are proudest of, and the one the family refers to first when anyone asks what Mackays actually stands for.",
    cta: {
      label: 'Read about our partnership',
      href: 'https://www.foodbank.org.au/meet-a-food-producer-mackays-marketing/',
    },
  },
  lifePhotoGrid: [
    { seed: 10, caption: 'Aerial view' },
    { seed: 30, caption: 'Harvest season' },
    { seed: 40, caption: 'Packing shed' },
    { seed: 100, caption: 'Field workers' },
    { seed: 110, caption: 'The Mackay family' },
    { seed: 130, caption: 'IQF facility' },
    { seed: 90, caption: 'Tully Valley' },
    { seed: 80, caption: 'Sugar cane' },
  ],
}

import type { MediaContent } from './types'

export const MEDIA: MediaContent = {
  hero: {
    eyebrow: 'News from the farm',
    headline: 'News from the farm.',
    subheadline:
      'Press releases, biosecurity updates and milestones from the Mackays business, Tully and the Atherton Tablelands.',
  },
  pressReleases: [
    {
      slug: '2022-iqf-expansion',
      date: '2022-11-10',
      headline: 'Mackays opens expanded IQF facility in Tully',
      excerpt:
        "A $multi-million expansion of our Tully IQF facility will turn cosmetically rejected fruit into frozen product and create more than 50 new permanent roles in the town.",
      body:
        "The expansion of our Tully IQF (Individually Quick Frozen) facility is the largest single capital investment in the recent history of the business, and represents a step-change in how Mackays thinks about waste, value and regional jobs. Fruit that would previously have been rejected on cosmetic grounds — perfectly edible, perfectly ripe — is now frozen within hours of picking and sold into foodservice and retail programmes across Australia. The project has created more than 50 new permanent jobs in Tully, many of them year-round roles in a region where seasonal work has historically been the norm.",
    },
    {
      slug: '2024-tr4-free',
      date: '2024-06-18',
      headline: 'Mackays verified Panama TR4-free for a third consecutive year',
      excerpt:
        "Independent auditing confirms a third consecutive year free of Panama TR4 across every Mackays block — a milestone for the Tully Valley and the Australian banana industry.",
      body:
        "Panama TR4 remains the most significant biological threat to the Australian banana industry, and for the third consecutive year every Mackays block has been independently verified free of it. The result reflects a non-negotiable commitment to on-farm biosecurity — quarantine zones, wash-down stations, visitor restrictions, strict vehicle protocols and ongoing investment in monitoring. Mackays thanks its team, its neighbours in the Tully Valley and Biosecurity Queensland for their shared vigilance.",
    },
    {
      slug: '2025-fourth-generation',
      date: '2025-02-03',
      headline:
        "Fourth generation of Mackays joins the business full-time",
      excerpt:
        "Three members of the fourth generation of the Mackay family have moved into full-time roles across growing, logistics and agtech — continuing an unbroken line of family stewardship that began in 1945.",
      body:
        "The Mackay family business was founded in 1945 by Stanley and Agnes Mackay. Their sons John and Robert took it into its second generation, and since the early 2000s the business has been led day-to-day by five third-generation Mackay brothers — Gavin, Barrie, Stephen, Cameron and Daniel. Three members of the fourth generation have now formally moved into full-time roles inside the business, spanning field operations, logistics and agtech. It is, in the family's words, 'exactly the continuity we've been farming for'.",
    },
  ],
  mediaContact: {
    eyebrow: 'Media enquiries',
    email: 'media@mackays.com.au',
    phone: '(07) 4088 7800',
  },
}

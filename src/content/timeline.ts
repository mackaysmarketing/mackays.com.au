import type { TimelineItem } from './types'

/**
 * The full 25-item Mackays timeline, from first block in 1945 through to
 * the fourth generation joining full-time in 2025.
 *
 * Image seeds follow the decade map specified in the build brief:
 *   1940s → 120, 1960–70s → 80, 1980–90s → 40,
 *   2000s → 10, 2010s → 60, 2020s → 30
 */
export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: '1945',
    headline: 'Stanley Mackay clears the first block',
    body: 'Stanley Mackay walks onto an uncleared block behind Tully and cuts the first track in by hand. Bananas go in within the year. His wife Agnes keeps the books on the kitchen table.',
    imageSeed: 120,
  },
  {
    year: '1952',
    headline: 'First shipment south',
    body: "The first Mackays bananas leave the Tully Valley on the coastal rail line heading for the southern markets. Supply runs into Sydney become regular within 18 months.",
    imageSeed: 120,
  },
  {
    year: '1958',
    headline: 'The second block',
    body: 'A second Tully Valley property is purchased and cleared. The business is no longer a single-farm operation.',
    imageSeed: 120,
  },
  {
    year: '1967',
    headline: 'John and Robert Mackay come in',
    body: "Stanley and Agnes's sons John and Robert join the farm full-time. The second generation begins mechanising the operation and extending the planted area block by block.",
    imageSeed: 80,
  },
  {
    year: '1974',
    headline: 'Flood',
    body: 'A major wet-season flood takes out most of the standing crop. The family replants within weeks. The phrase "when something breaks, we build it back stronger" enters the operating vocabulary.',
    imageSeed: 80,
  },
  {
    year: '1978',
    headline: 'First packing shed',
    body: 'Mackays builds its first purpose-designed packing shed in Tully, ending years of packing directly in the paddock.',
    imageSeed: 80,
  },
  {
    year: '1983',
    headline: 'Sugar cane added',
    body: 'Sugar cane is introduced as a rotational crop alongside bananas, both to rest banana ground and to tie the business into the long-standing Tully sugar industry.',
    imageSeed: 40,
  },
  {
    year: '1989',
    headline: 'Third generation born into the business',
    body: 'Gavin, Barrie, Stephen, Cameron and Daniel Mackay — the five brothers who lead the business today — are by now all working on-farm in school holidays.',
    imageSeed: 40,
  },
  {
    year: '1994',
    headline: 'First Atherton Tablelands expansion',
    body: 'Mackays acquires its first block on the Atherton Tablelands, opening up the possibility of diversifying beyond the wet-belt Tully Valley.',
    imageSeed: 40,
  },
  {
    year: '1999',
    headline: 'Red papaya trials begin',
    body: "Experimental red papaya blocks go in on the Tablelands. The family believes the basalt soils and the warm days / cool nights climate make it some of the best papaya country in Australia. They turn out to be right.",
    imageSeed: 40,
  },
  {
    year: '2002',
    headline: 'Third generation take operational control',
    body: 'The five brothers formally take over the day-to-day running of the business. Areas of responsibility — operations, production, strategy, growing systems, expansion — are assigned and have not changed since.',
    imageSeed: 10,
  },
  {
    year: '2006',
    headline: 'Cyclone Larry',
    body: 'Category 5 Cyclone Larry crosses the coast at Innisfail and devastates the Far North Queensland banana industry. Mackays replants within weeks. The entire Australian banana price structure is reshaped for two years.',
    imageSeed: 10,
  },
  {
    year: '2008',
    headline: 'Avocado programme begins',
    body: 'Maluma and Shepherd avocado plantings begin on selected Atherton Tablelands blocks, adding a third major horticultural line alongside bananas and papaya.',
    imageSeed: 10,
  },
  {
    year: '2011',
    headline: 'Cyclone Yasi',
    body: 'Category 5 Cyclone Yasi crosses directly over the Tully Valley. The entire crop is flattened overnight. The family is replanting within days.',
    imageSeed: 60,
  },
  {
    year: '2013',
    headline: 'Fully recovered post-Yasi',
    body: 'Two years after Yasi, Mackays is back to full production — an unusually rapid recovery driven by the scale of the operation, the family\'s replanting discipline and the loyalty of a long-serving workforce.',
    imageSeed: 60,
  },
  {
    year: '2015',
    headline: 'Dimbulah expansion',
    body: 'Mackays acquires the first of several blocks in the Dimbulah district, opening up a third distinct growing region and reducing the concentration risk of farming only in the wet belt.',
    imageSeed: 60,
  },
  {
    year: '2017',
    headline: 'Cattle formalised',
    body: 'Grass-fed cattle — previously a side operation on back-country blocks — become a formal part of the Mackays product mix. The herd is built up to around 800 head.',
    imageSeed: 60,
  },
  {
    year: '2019',
    headline: 'Smart Banana programme',
    body: 'The Smart Banana supply-chain initiative launches, aimed at reducing bruising, ripening loss and waste between tree and supermarket shelf.',
    imageSeed: 60,
  },
  {
    year: '2021',
    headline: 'Panama TR4-free verified',
    body: 'Independent auditing verifies all Mackays blocks as Panama TR4-free for the first time. The family commits to annual re-verification.',
    imageSeed: 30,
  },
  {
    year: '2022',
    headline: 'IQF facility expansion',
    body: "A major expansion of the Tully Individually Quick Frozen facility is completed. Previously rejected fruit is now frozen within hours of picking. The project creates more than 50 new permanent Tully jobs.",
    imageSeed: 30,
  },
  {
    year: '2023',
    headline: 'Foodbank Queensland partnership formalised',
    body: 'Weekly donations of bananas to Foodbank Queensland are formalised as an ongoing partnership, feeding around 50,000 Queensland schoolchildren through school breakfast programmes.',
    imageSeed: 30,
  },
  {
    year: '2024',
    headline: 'Third consecutive TR4-free audit',
    body: 'A third consecutive year of verified Panama TR4-free status is achieved across every block. The family publicly thanks Biosecurity Queensland and its neighbours in the Tully Valley.',
    imageSeed: 30,
  },
  {
    year: '2024',
    headline: 'Carbon audit begins',
    body: 'An independent soil carbon audit commences across our banana and cane blocks, with results to be published in full in 2025 regardless of outcome.',
    imageSeed: 30,
  },
  {
    year: '2025',
    headline: 'Fourth generation joins full-time',
    body: 'Three members of the fourth generation of the Mackay family move into full-time roles across growing, logistics and agtech — continuing an unbroken family line that began in 1945.',
    imageSeed: 30,
  },
  {
    year: '2025',
    headline: '80 years. Same family. Same valley.',
    body: "Mackays marks 80 years of continuous family ownership — the same family, in the same valley, growing food for the same country.",
    imageSeed: 30,
  },
]

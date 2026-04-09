import type { FarmMarker } from './types'

export const FARM_MARKERS: FarmMarker[] = [
  {
    id: 'tully-valley',
    longitude: 145.927,
    latitude: -17.935,
    label: 'Tully Valley',
    crops: 'Bananas · Sugar cane · Cattle',
    hectares: '~3,800 ha',
    note: 'The historical heart of the business — where Stanley Mackay first cleared land in 1945. Wettest banana-growing country in Australia.',
  },
  {
    id: 'atherton-tablelands',
    longitude: 145.478,
    latitude: -17.268,
    label: 'Atherton Tablelands',
    crops: 'Red papaya · Avocados',
    hectares: '~1,400 ha',
    note: 'Basalt-rich upland country, warm days, cool nights. Home of our Ruby Rise papaya and Maluma / Shepherd avocado programmes.',
  },
  {
    id: 'dimbulah',
    longitude: 145.105,
    latitude: -17.152,
    label: 'Dimbulah',
    crops: 'Avocados · Passionfruit',
    hectares: '~600 ha',
    note: 'Drier inland blocks with irrigation from the Mareeba–Dimbulah water supply scheme. Our newest growing region.',
  },
]

import type { ContactContent } from './types'

export const CONTACT: ContactContent = {
  headline: 'Get in touch.',
  subheadline:
    "Whether you're a retailer, a trade buyer, a member of the media, a future employee or a Queensland neighbour — this is the right door.",
  offices: [
    {
      title: 'Farming Office',
      lines: ['PO Box 513 Tully QLD 4854'],
      email: 'info@mackays.com.au',
      phone: '(07) 4088 7800',
    },
    {
      title: 'Marketing',
      lines: ['Brand, communications and partnerships.'],
      email: 'marketing@mackays.com.au',
    },
    {
      title: 'Retail & Trade',
      lines: ['Major retail, wholesale, foodservice and export enquiries.'],
      email: 'trade@mackays.com.au',
    },
  ],
  badges: [
    'Foodbank Queensland Supporter',
    'ABGC Member',
    'Avocados Australia Member',
  ],
}

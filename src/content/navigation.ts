export type NavLink = {
  label: string
  href: string
  children?: NavLink[]
}

export const primaryNav: NavLink[] = [
  { label: 'Our Story', href: '/our-story' },
  {
    label: 'Our Produce',
    href: '/our-produce',
    children: [
      { label: 'Bananas', href: '/our-produce/bananas' },
      { label: 'Red Papaya', href: '/our-produce/red-papaya' },
      { label: 'Avocados', href: '/our-produce/avocados' },
      { label: 'Sugar Cane', href: '/our-produce/sugar-cane' },
      { label: 'Cattle', href: '/our-produce/cattle' },
      { label: 'Passionfruit', href: '/our-produce/passionfruit' },
    ],
  },
  { label: 'People & Environment', href: '/people-and-environment' },
  { label: 'Work With Us', href: '/work-with-us' },
  { label: 'Media', href: '/media' },
]

export const footerNav: NavLink[] = [
  ...primaryNav,
  { label: 'Contact', href: '/contact' },
]

export const ctaLink = {
  label: 'Contact',
  href: '/contact',
}

export const siteMeta = {
  brand: 'Mackays',
  tagline: 'From Far North Queensland — to your table.',
  foodbank: 'Proud supporter of Foodbank Queensland.',
  address: 'PO Box 513 Tully QLD 4854',
  phone: '(07) 4088 7800',
  emails: ['info@mackays.com.au', 'marketing@mackays.com.au'],
  copyright: '© 2025 Mackays Marketing. Mac Farms Pty Ltd.',
}

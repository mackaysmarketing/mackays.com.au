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
  sidebarHeading: 'Direct lines',
  badges: [
    'Foodbank Queensland Supporter',
    'ABGC Member',
    'Avocados Australia Member',
  ],
  badgesHeading: 'Memberships & partnerships',
  form: {
    heading: 'Send us a message',
    labels: {
      name: 'Name',
      company: 'Company',
      email: 'Email',
      phone: 'Phone',
      enquiryType: 'Enquiry type',
      message: 'Message',
    },
    placeholders: {
      name: 'Your full name',
      company: 'Optional',
      email: 'you@example.com',
      phone: 'Optional',
      enquiryTypePlaceholder: 'Select an option',
      message:
        'Tell us a bit about what you need, and someone from the right part of the business will come back to you.',
    },
    enquiryOptions: [
      { value: 'general', label: 'General enquiry' },
      { value: 'retail', label: 'Retail & trade' },
      { value: 'media', label: 'Media enquiry' },
      { value: 'employment', label: 'Employment' },
      { value: 'other', label: 'Other' },
    ],
    submitLabel: 'Send message',
    submittingLabel: 'Sending…',
    successHeading: 'Message received.',
    successBody: "We'll be in touch within one business day.",
    errorBody:
      "Something went wrong sending your message. Please try again, or email info@mackays.com.au directly.",
    validation: {
      nameMin: 'Please include your name.',
      emailInvalid: 'Please enter a valid email address.',
      enquiryRequired: 'Please choose an enquiry type.',
      messageMin: 'Please write a message of at least 20 characters.',
    },
  },
}

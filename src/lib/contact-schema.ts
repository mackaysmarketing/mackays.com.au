import { z } from 'zod'
import { CONTACT } from '@/content'

const enquiryTypeValues = CONTACT.form.enquiryOptions.map((option) => option.value)

/**
 * Single source of truth for the contact form schema. Imported by both
 * the client form (`ContactForm.tsx`) and the server route
 * (`app/api/contact/route.ts`) so validation is identical on both sides.
 */
export const contactSchema = z.object({
  name: z.string().min(2, CONTACT.form.validation.nameMin),
  company: z.string().optional(),
  email: z.string().email(CONTACT.form.validation.emailInvalid),
  phone: z.string().optional(),
  enquiryType: z.enum(
    enquiryTypeValues as [string, ...string[]],
    { message: CONTACT.form.validation.enquiryRequired },
  ),
  message: z.string().min(20, CONTACT.form.validation.messageMin),
})

export type ContactFormValues = z.infer<typeof contactSchema>

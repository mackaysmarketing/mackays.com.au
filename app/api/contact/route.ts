import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z, ZodError } from 'zod'
import { CONTACT, SITE } from '@/content'
import {
  contactSchema,
  type ContactFormValues,
} from '@/lib/contact-schema'

export const runtime = 'nodejs'

const FALLBACK_SITE_URL = 'https://mackays.com.au'

function resolveFromAddress(): string {
  const template = CONTACT.form.emailTemplate
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL
  let hostname: string
  try {
    hostname = new URL(configured).hostname
  } catch {
    console.warn(
      `[contact] NEXT_PUBLIC_SITE_URL "${configured}" is not a valid URL — falling back to ${FALLBACK_SITE_URL}`,
    )
    hostname = new URL(FALLBACK_SITE_URL).hostname
  }
  return `${template.fromName} <website@${hostname}>`
}

function formatEmailBody(values: ContactFormValues): string {
  const template = CONTACT.form.emailTemplate
  const { bodyLineLabels } = template

  const lines: (string | null)[] = [
    template.bodyTitle,
    template.bodyDivider,
    `${bodyLineLabels.name}: ${values.name}`,
    values.company ? `${bodyLineLabels.company}: ${values.company}` : null,
    `${bodyLineLabels.email}: ${values.email}`,
    values.phone ? `${bodyLineLabels.phone}: ${values.phone}` : null,
    `${bodyLineLabels.enquiryType}: ${values.enquiryType}`,
    '',
    `${template.bodyMessageHeading}:`,
    values.message,
  ]
  return lines.filter((line): line is string => line !== null).join('\n')
}

export async function POST(request: Request) {
  let parsed: ContactFormValues
  try {
    const json = (await request.json()) as unknown
    parsed = contactSchema.parse(json)
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'validation_failed',
          fields: z.flattenError(error).fieldErrors,
        },
        { status: 400 },
      )
    }
    return NextResponse.json(
      { success: false, error: 'invalid_request' },
      { status: 400 },
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[contact] RESEND_API_KEY not configured — enquiry not sent')
    return NextResponse.json(
      { success: false, error: 'service_not_configured' },
      { status: 503 },
    )
  }

  try {
    const resend = new Resend(apiKey)
    const template = CONTACT.form.emailTemplate
    const enquiryLabel =
      CONTACT.form.enquiryOptions.find(
        (option) => option.value === parsed.enquiryType,
      )?.label ?? parsed.enquiryType

    await resend.emails.send({
      from: resolveFromAddress(),
      to: SITE.emails.info,
      replyTo: parsed.email,
      subject: `${template.subjectPrefix}: ${enquiryLabel}`,
      text: formatEmailBody(parsed),
    })
  } catch (error) {
    console.error('[contact] Resend send failed', error)
    return NextResponse.json(
      { success: false, error: 'send_failed' },
      { status: 500 },
    )
  }

  return NextResponse.json({ success: true })
}

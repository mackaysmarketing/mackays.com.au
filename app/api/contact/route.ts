import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ZodError } from 'zod'
import { CONTACT, SITE } from '@/content'
import {
  contactSchema,
  type ContactFormValues,
} from '@/lib/contact-schema'

export const runtime = 'nodejs'

function formatEmailBody(values: ContactFormValues): string {
  const lines = [
    'New website enquiry',
    '--------------------',
    `Name: ${values.name}`,
    values.company ? `Company: ${values.company}` : null,
    `Email: ${values.email}`,
    values.phone ? `Phone: ${values.phone}` : null,
    `Enquiry type: ${values.enquiryType}`,
    '',
    'Message:',
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
          fields: error.flatten().fieldErrors,
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
    const enquiryLabel =
      CONTACT.form.enquiryOptions.find(
        (option) => option.value === parsed.enquiryType,
      )?.label ?? parsed.enquiryType

    await resend.emails.send({
      from: `Mackays Website <website@${new URL(
        process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mackays.com.au',
      ).hostname}>`,
      to: SITE.emails.info,
      replyTo: parsed.email,
      subject: `Website enquiry: ${enquiryLabel}`,
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

import type { Metadata } from 'next'
import { Badge } from '@/components/ui/Badge'
import { QldFarmMap } from '@/components/sections'
import { ContactForm } from '@/components/contact'
import { CONTACT, FARM_MARKERS } from '@/content'

export const metadata: Metadata = {
  title: 'Contact | Mackays — Farming, Marketing, Retail & Trade',
  description:
    "Get in touch with Mackays Marketing in Tully, Far North Queensland. Farming office, marketing, retail & trade enquiries and media lines.",
}

export default function ContactPage() {
  const { headline, subheadline, offices, sidebarHeading, badges, badgesHeading } =
    CONTACT

  return (
    <>
      {/* 1. Header */}
      <section className="h-[40vh] min-h-[320px] bg-parchment flex items-end pb-12">
        <div className="max-w-7xl mx-auto px-10 w-full">
          <h1 className="font-heading font-bold text-[clamp(40px,6vw,64px)] tracking-[-0.03em] text-ink leading-[1.05]">
            {headline}
          </h1>
          <p className="font-body text-[17px] text-ink-mid mt-3 max-w-[640px] leading-[1.7]">
            {subheadline}
          </p>
        </div>
      </section>

      {/* 2. Two-column: form + sidebar */}
      <section className="max-w-7xl mx-auto px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-16 items-start">
          <ContactForm />

          <aside>
            <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-dust mb-6">
              {sidebarHeading}
            </h2>
            <div className="space-y-4">
              {offices.map((office) => (
                <div
                  key={office.title}
                  className="bg-parchment-cool border border-parchment-deep rounded-xl p-6"
                >
                  <h3 className="font-heading font-semibold text-[15px] text-ink mb-3">
                    {office.title}
                  </h3>
                  {office.lines.length > 0 && (
                    <address className="not-italic font-body text-[13px] text-ink-mid leading-[1.6] mb-3">
                      {office.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  )}
                  <a
                    href={`mailto:${office.email}`}
                    className="font-heading font-semibold text-[13px] text-crimson hover:text-crimson-dark block break-all"
                  >
                    {office.email}
                  </a>
                  {office.phone && (
                    <a
                      href={`tel:${office.phone.replace(/\s|\(|\)/g, '')}`}
                      className="font-body text-[13px] text-ink-mid hover:text-crimson transition-colors block mt-1"
                    >
                      {office.phone}
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <QldFarmMap
                markers={[FARM_MARKERS[0]]}
                interactionDisabled
                className="!h-[280px] md:!h-[280px]"
              />
            </div>
          </aside>
        </div>
      </section>

      {/* 3. Member badges */}
      <section className="py-12 px-10 border-t border-parchment-deep">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-dust mb-5">
            {badgesHeading}
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {badges.map((label) => (
              <Badge key={label} variant="neutral" label={label} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

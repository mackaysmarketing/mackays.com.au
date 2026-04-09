import type { Metadata } from 'next'
import Link from 'next/link'
import { MEDIA } from '@/content'
import { formatDate } from '@/lib/format-date'

export const metadata: Metadata = {
  title: 'Media | Mackays — News From the Farm',
  description:
    'Press releases, biosecurity updates and milestones from the Mackays business, Tully and the Atherton Tablelands.',
}

export default function MediaPage() {
  const { hero, pressReleases, mediaContact, labels } = MEDIA

  return (
    <>
      {/* 1. Static header (no animation) */}
      <section className="h-[45vh] min-h-[360px] bg-parchment-warm flex items-center">
        <div className="max-w-7xl mx-auto px-10 w-full">
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-dust mb-4">
            {hero.eyebrow}
          </p>
          <h1 className="font-heading font-bold text-[clamp(40px,6vw,64px)] tracking-[-0.03em] text-ink leading-[1.05] max-w-3xl">
            {hero.headline}
          </h1>
          <p className="font-body text-[17px] text-ink-mid mt-4 max-w-[480px] leading-[1.7]">
            {hero.subheadline}
          </p>
        </div>
      </section>

      {/* 2. Press releases grid */}
      <section className="max-w-7xl mx-auto px-10 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pressReleases.map((pr) => (
            <article
              key={pr.slug}
              className="bg-parchment-cool border border-parchment-deep rounded-xl p-8 flex flex-col"
            >
              <time
                dateTime={pr.date}
                className="font-mono text-[11px] text-crimson mb-3"
              >
                {formatDate(pr.date)}
              </time>
              <h2 className="font-heading font-semibold text-[18px] text-ink leading-[1.25] mb-4 line-clamp-2">
                {pr.headline}
              </h2>
              <p className="font-body text-[14px] text-ink-mid leading-[1.6] mb-6 line-clamp-3 flex-1">
                {pr.excerpt}
              </p>
              <Link
                href={`/media/${pr.slug}`}
                aria-label={labels.readMoreAriaTemplate.replace(
                  '{headline}',
                  pr.headline,
                )}
                className="font-heading text-[12px] font-semibold text-crimson border-b border-crimson inline-block self-start hover:text-crimson-dark hover:border-crimson-dark transition-colors"
              >
                {labels.readMore} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Media contact */}
      <section className="py-16 px-10 max-w-lg mx-auto text-center border-t border-parchment-deep">
        <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-dust mb-4">
          {mediaContact.eyebrow}
        </p>
        <a
          href={`mailto:${mediaContact.email}`}
          className="font-heading font-semibold text-crimson text-[17px] hover:text-crimson-dark block mb-2"
        >
          {mediaContact.email}
        </a>
        <a
          href={`tel:${mediaContact.phone.replace(/\s|\(|\)/g, '')}`}
          className="font-body text-ink-mid hover:text-crimson transition-colors"
        >
          {mediaContact.phone}
        </a>
      </section>
    </>
  )
}

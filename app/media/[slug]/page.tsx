import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { MEDIA } from '@/content'
import { formatDate } from '@/lib/format-date'

type ArticleParams = { slug: string }

export async function generateStaticParams(): Promise<ArticleParams[]> {
  return MEDIA.pressReleases.map((pr) => ({ slug: pr.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ArticleParams>
}): Promise<Metadata> {
  const { slug } = await params
  const pr = MEDIA.pressReleases.find((item) => item.slug === slug)
  if (!pr) return { title: 'Article not found' }
  const canonical = `/media/${pr.slug}`
  return {
    title: pr.headline,
    description: pr.excerpt,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      title: `${pr.headline} | Mackays`,
      description: pr.excerpt,
      url: canonical,
      publishedTime: pr.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: pr.headline,
      description: pr.excerpt,
    },
  }
}

/**
 * The body text in MEDIA.pressReleases is plain text with paragraphs
 * separated by blank lines (matching the markdown body of the MDX source
 * files in content/media/). Render each paragraph in Lora prose.
 */
function renderParagraphs(body: string) {
  return body
    .split(/\n\s*\n/)
    .map((paragraph, index) => (
      <p
        key={`p-${index}`}
        className="font-body text-[17px] text-ink-mid leading-[1.8] mb-6 last:mb-0"
      >
        {paragraph.trim()}
      </p>
    ))
}

export default async function PressReleasePage({
  params,
}: {
  params: Promise<ArticleParams>
}) {
  const { slug } = await params
  const pr = MEDIA.pressReleases.find((item) => item.slug === slug)
  if (!pr) notFound()

  const labels = MEDIA.labels

  return (
    <article className="max-w-2xl mx-auto px-10 pt-32 pb-24">
      <Link
        href="/media"
        className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-dust hover:text-crimson transition-colors"
      >
        ← {labels.backToList}
      </Link>

      <header className="mt-8 mb-10 border-b border-parchment-deep pb-8">
        <time
          dateTime={pr.date}
          className="font-mono text-[12px] text-crimson"
        >
          {formatDate(pr.date)}
        </time>
        <h1 className="mt-4 font-heading font-bold text-[clamp(32px,5vw,48px)] tracking-[-0.03em] text-ink leading-[1.1]">
          {pr.headline}
        </h1>
        <p className="mt-4 font-body italic text-[18px] text-ink-mid leading-[1.7]">
          {pr.excerpt}
        </p>
      </header>

      <div className="prose-mackays">{renderParagraphs(pr.body)}</div>

      <footer className="mt-16 pt-8 border-t border-parchment-deep flex flex-col sm:flex-row gap-4 justify-between items-start">
        <Button variant="ghost-link" href="/media">
          ← {labels.backToList}
        </Button>
        <Button variant="secondary" size="md" href="/contact">
          {labels.mediaContactCta} →
        </Button>
      </footer>
    </article>
  )
}

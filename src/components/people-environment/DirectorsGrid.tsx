import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { Director } from '@/content/types'

export interface DirectorsGridProps {
  eyebrow: string
  headline: string
  directors: Director[]
  boardNote: string
}

function DirectorCard({ director }: { director: Director }) {
  return (
    <article className="bg-parchment-cool border border-parchment-deep rounded-xl p-8 group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(20,20,19,0.08)]">
      <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4">
        <ImagePlaceholder
          fill
          seed={director.imageSeed}
          alt={`${director.name}, ${director.title}`}
          sizes="80px"
        />
      </div>
      <h3 className="font-heading font-semibold text-[16px] text-ink group-hover:text-crimson transition-colors">
        {director.name}
      </h3>
      <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-dust/60 mt-1">
        {director.title}
      </p>
      <p className="font-body text-[13px] text-ink-mid mt-3 leading-[1.5]">
        {director.role}
      </p>
    </article>
  )
}

export function DirectorsGrid({
  eyebrow,
  headline,
  directors,
  boardNote,
}: DirectorsGridProps) {
  const firstRow = directors.slice(0, 3)
  const secondRow = directors.slice(3)

  return (
    <section className="max-w-7xl mx-auto px-10 py-24">
      <SectionHeader eyebrow={eyebrow} headline={headline} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {firstRow.map((director) => (
          <DirectorCard key={director.name} director={director} />
        ))}
      </div>

      {secondRow.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:max-w-[66%] md:mx-auto mt-6">
          {secondRow.map((director) => (
            <DirectorCard key={director.name} director={director} />
          ))}
        </div>
      )}

      <p className="font-body text-[15px] text-ink-mid mt-12 max-w-lg mx-auto text-center leading-[1.7]">
        {boardNote}
      </p>
    </section>
  )
}

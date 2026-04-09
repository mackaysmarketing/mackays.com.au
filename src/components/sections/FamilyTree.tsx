import { SectionHeader } from '@/components/ui/SectionHeader'
import type { Director, OurStoryFamilyTree } from '@/content/types'

export interface FamilyTreeProps {
  eyebrow: string
  headline: string
  tree: OurStoryFamilyTree
  directors: Director[]
  className?: string
}

/**
 * Four-generation Mackay family tree.
 *
 * Gen 1: Stanley + Agnes (dust)
 * Gen 2: John + Robert
 * Gen 3: five third-generation directors (names in crimson, role in dust)
 * Gen 4: a single italic caption cell
 *
 * Connectors are rendered with thin Tailwind borders so the tree reads
 * clearly on both desktop and mobile without any SVG dependency.
 */
export function FamilyTree({
  eyebrow,
  headline,
  tree,
  directors,
  className,
}: FamilyTreeProps) {
  return (
    <section
      className={[
        'max-w-3xl mx-auto px-10 py-24',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <SectionHeader eyebrow={eyebrow} headline={headline} align="center" />

      <div className="mt-16 flex flex-col items-center font-heading">
        {/* Gen 1 */}
        <div className="flex flex-col items-center">
          <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-dust/60 mb-2">
            Generation One
          </p>
          <div className="flex items-center gap-0">
            <span className="text-[15px] font-semibold text-dust px-4 py-2">
              {tree.gen1.left}
            </span>
            <span
              aria-hidden
              className="w-10 border-t border-parchment-deep"
            />
            <span className="text-[15px] font-semibold text-dust px-4 py-2">
              {tree.gen1.right}
            </span>
          </div>
        </div>

        <span
          aria-hidden
          className="w-px h-10 bg-parchment-deep"
        />

        {/* Gen 2 */}
        <div className="flex flex-col items-center">
          <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-dust/60 mb-2">
            Generation Two
          </p>
          <div className="flex items-center gap-0">
            {tree.gen2.map((name, index) => (
              <div key={name} className="flex items-center">
                <span className="text-[15px] font-semibold text-ink-mid px-4 py-2">
                  {name}
                </span>
                {index < tree.gen2.length - 1 && (
                  <span
                    aria-hidden
                    className="w-10 border-t border-parchment-deep"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <span
          aria-hidden
          className="w-px h-10 bg-parchment-deep"
        />

        {/* Gen 3 — five directors */}
        <div className="w-full flex flex-col items-center">
          <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-dust/60 mb-4">
            Generation Three
          </p>
          <div className="relative w-full flex flex-wrap justify-center gap-x-6 gap-y-6">
            {directors.map((director) => (
              <div
                key={director.name}
                className="flex flex-col items-center min-w-[140px]"
              >
                <span className="text-[14px] font-semibold text-crimson">
                  {director.name.replace(' Mackay', '')}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-dust/60 mt-1">
                  {tree.gen3Title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <span
          aria-hidden
          className="w-px h-10 bg-parchment-deep mt-4"
        />

        {/* Gen 4 */}
        <div className="w-full max-w-lg text-center border border-parchment-deep rounded-lg px-8 py-5">
          <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-dust/60 mb-2">
            Generation Four
          </p>
          <p className="font-body italic text-dust/60 text-[14px]">
            {tree.gen4Caption}
          </p>
        </div>
      </div>
    </section>
  )
}

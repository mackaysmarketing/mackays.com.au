import type { ComponentType, SVGProps } from 'react'
import {
  ClipboardList,
  Cpu,
  Package,
  Sprout,
  Tractor,
  Truck,
  Users,
  Wrench,
} from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { ValueAccent, WorkRole } from '@/content/types'

export interface RoleCategoriesProps {
  eyebrow: string
  headline: string
  roles: WorkRole[]
  ctaLabel: string
}

const ICON_MAP: Record<WorkRole['icon'], ComponentType<SVGProps<SVGSVGElement>>> =
  {
    Sprout,
    Tractor,
    Package,
    Truck,
    Wrench,
    Users,
    Cpu,
    ClipboardList,
  }

const ICON_COLOR_CLASS: Record<ValueAccent, string> = {
  crimson: 'text-crimson',
  'harvest-gold': 'text-harvest-gold-dark',
  'sage-field': 'text-sage-field',
}

export function RoleCategories({
  eyebrow,
  headline,
  roles,
  ctaLabel,
}: RoleCategoriesProps) {
  return (
    <section className="max-w-7xl mx-auto px-10 py-24 border-t border-parchment-deep">
      <SectionHeader eyebrow={eyebrow} headline={headline} />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => {
          const Icon = ICON_MAP[role.icon]
          return (
            <article
              key={role.title}
              className="group bg-parchment-cool border border-parchment-deep rounded-xl p-8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(20,20,19,0.06)]"
            >
              <div className="w-10 h-10 rounded-full bg-parchment-deep flex items-center justify-center mb-4">
                <Icon
                  className={`w-5 h-5 ${ICON_COLOR_CLASS[role.accent]}`}
                  aria-hidden
                />
              </div>
              <h3 className="font-heading font-semibold text-[16px] text-ink mb-2">
                {role.title}
              </h3>
              <p className="font-body text-[13px] text-ink-mid leading-[1.6] mb-4">
                {role.description}
              </p>
              <p className="font-heading text-[12px] font-semibold text-crimson group-hover:underline">
                {ctaLabel} →
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

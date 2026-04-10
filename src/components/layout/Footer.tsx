import Link from 'next/link'
import { MackaysLogo } from '@/components/ui/MackaysLogo'
import { footerNav, siteMeta } from '@/content/navigation'

export function Footer() {
  return (
    <footer className="bg-ink relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link href="/" aria-label={`${siteMeta.brand} — home`}>
              <MackaysLogo width={120} variant="light" />
            </Link>
            <p className="font-body italic text-dust/60 text-sm mt-2">
              {siteMeta.tagline}
            </p>
            <p className="font-heading text-dust/40 text-xs mt-4">
              {siteMeta.foodbank}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-dust/40 mb-4">
              Navigation
            </h2>
            <ul>
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-heading text-sm text-dust/60 hover:text-crimson transition-colors block mb-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-dust/40 mb-4">
              Contact
            </h2>
            <address className="not-italic font-body text-sm text-dust/60 leading-relaxed">
              {siteMeta.address}
              <br />
              <a
                href={`tel:${siteMeta.phone.replace(/\s|\(|\)/g, '')}`}
                className="hover:text-crimson transition-colors"
              >
                {siteMeta.phone}
              </a>
              <br />
              {siteMeta.emails.map((email) => (
                <span key={email} className="block">
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-crimson transition-colors"
                  >
                    {email}
                  </a>
                </span>
              ))}
            </address>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <p className="font-heading text-[11px] text-dust/30">
            {siteMeta.copyright}
          </p>
          <p className="font-body italic text-[11px] text-dust/30">
            {siteMeta.tagline}
          </p>
        </div>
      </div>

      <div
        aria-hidden
        className="h-[3px] w-full bg-[linear-gradient(90deg,var(--crimson)_0%,var(--harvest-gold)_50%,var(--sage-field)_100%)]"
      />
    </footer>
  )
}

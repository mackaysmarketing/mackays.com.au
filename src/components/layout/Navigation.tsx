'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { primaryNav, ctaLink, siteMeta } from '@/content/navigation'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const SCROLL_THRESHOLD = 80

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setScrolled(true)
      return
    }

    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [prefersReducedMotion])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-out ${
          scrolled
            ? 'bg-[rgba(236,233,224,0.95)] backdrop-blur-md border-b border-[rgba(20,20,19,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <Link
            href="/"
            className="font-heading font-bold text-ink tracking-tight text-xl md:text-[22px]"
            aria-label={`${siteMeta.brand} — home`}
          >
            {siteMeta.brand}
          </Link>

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-8"
          >
            {primaryNav.map((link) => {
              const active = isActive(link.href)
              const hasChildren = !!link.children?.length

              if (hasChildren) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setHoveredDropdown(link.href)}
                    onMouseLeave={() => setHoveredDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={`relative font-heading text-[12px] font-medium tracking-wide uppercase transition-colors inline-flex items-center gap-1 pb-1 after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-crimson after:origin-left after:transition-transform after:duration-200 ${
                        active
                          ? 'text-ink after:scale-x-100'
                          : 'text-dust hover:text-ink after:scale-x-0 hover:after:scale-x-100'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-3 h-3" aria-hidden />
                    </Link>
                    {hoveredDropdown === link.href && (
                      <div
                        role="menu"
                        className="absolute top-full left-0 pt-3 min-w-[200px]"
                      >
                        <div className="bg-parchment-cool border border-parchment-deep rounded-md shadow-lg py-2">
                          {link.children!.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              role="menuitem"
                              className="block px-4 py-2 font-heading text-[12px] font-medium text-ink-mid hover:text-crimson hover:bg-parchment-warm transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-heading text-[12px] font-medium tracking-wide uppercase transition-colors pb-1 after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-crimson after:origin-left after:transition-transform after:duration-200 ${
                    active
                      ? 'text-ink after:scale-x-100'
                      : 'text-dust hover:text-ink after:scale-x-0 hover:after:scale-x-100'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href={ctaLink.href}
              className="hidden md:inline-flex bg-crimson text-white rounded-md px-4 py-2 text-sm font-heading font-semibold hover:bg-crimson-dark transition-colors"
            >
              {ctaLink.label}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="lg:hidden p-2 text-ink"
            >
              <Menu className="w-6 h-6" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 bg-parchment z-40 lg:hidden flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-6 h-16">
            <Link
              href="/"
              className="font-heading font-bold text-ink tracking-tight text-xl"
            >
              {siteMeta.brand}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="p-2 text-ink"
            >
              <X className="w-6 h-6" aria-hidden />
            </button>
          </div>
          <nav
            aria-label="Mobile"
            className="flex-1 flex flex-col px-6 py-10 gap-6 overflow-y-auto"
          >
            {primaryNav.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className={`font-heading text-2xl font-semibold ${
                    isActive(link.href) ? 'text-crimson' : 'text-ink'
                  }`}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="mt-3 ml-4 flex flex-col gap-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="font-heading text-base text-ink-mid hover:text-crimson transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href={ctaLink.href}
              className="mt-4 inline-flex self-start bg-crimson text-white rounded-md px-5 py-3 text-base font-heading font-semibold hover:bg-crimson-dark transition-colors"
            >
              {ctaLink.label}
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}

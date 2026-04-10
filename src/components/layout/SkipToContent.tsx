/**
 * Accessibility skip link. Hidden by default, revealed when focused
 * (first tab-stop on every page). Jumps the focus ring and scroll to
 * `#main-content` which is set on the `<main>` wrapper in the root
 * layout.
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-crimson focus:text-white focus:font-heading focus:text-[12px] focus:font-semibold focus:uppercase focus:tracking-[0.1em] focus:px-4 focus:py-3 focus:rounded-[var(--radius-md)] focus:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest-gold focus-visible:ring-offset-2 focus-visible:ring-offset-parchment"
    >
      Skip to main content
    </a>
  )
}

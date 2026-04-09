/**
 * Format an ISO date string (YYYY-MM-DD) as a human-readable date
 * using Australian English conventions.
 */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map((part) => Number.parseInt(part, 10))
  if (!year || !month || !day) return iso
  const date = new Date(Date.UTC(year, month - 1, day))
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

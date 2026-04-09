import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: 'var(--parchment)',
        'parchment-warm': 'var(--parchment-warm)',
        'parchment-cool': 'var(--parchment-cool)',
        'parchment-deep': 'var(--parchment-deep)',
        ink: 'var(--ink)',
        'ink-mid': 'var(--ink-mid)',
        dust: 'var(--dust)',
        crimson: 'var(--crimson)',
        'crimson-dark': 'var(--crimson-dark)',
        'crimson-pale': 'var(--crimson-pale)',
        'harvest-gold': 'var(--harvest-gold)',
        'harvest-gold-dark': 'var(--harvest-gold-dark)',
        'harvest-gold-pale': 'var(--harvest-gold-pale)',
        'sage-field': 'var(--sage-field)',
        'sage-light': 'var(--sage-light)',
        'sage-pale': 'var(--sage-pale)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-indicator': {
          '0%, 100%': { transform: 'scaleY(0.2)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'scroll-indicator': 'scroll-indicator 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config

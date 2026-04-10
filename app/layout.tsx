import type { Metadata, Viewport } from 'next'
import { Poppins, Lora, JetBrains_Mono } from 'next/font/google'
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { PageTransition } from '@/components/layout/PageTransition'
import { SkipToContent } from '@/components/layout/SkipToContent'
import { AxeCore } from '@/components/dev/AxeCore'
import { OrganizationJsonLd } from '@/components/seo/StructuredData'
import { SITE } from '@/content'
import './globals.css'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const lora = Lora({
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const mono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ECE9E0',
}

const siteUrl = SITE.url

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mackays | Australia's Leading Tropical Produce Grower | Far North Queensland",
    template: '%s | Mackays',
  },
  description: SITE.metaDescription,
  applicationName: `${SITE.brand} Marketing`,
  authors: [{ name: SITE.legalName, url: siteUrl }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  keywords: SITE.keywords,
  category: 'Agriculture',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: siteUrl,
    siteName: `${SITE.brand} Marketing`,
    title: "Mackays | Australia's Leading Tropical Produce Grower",
    description: SITE.metaDescription,
    images: [
      {
        url: '/og/default.png',
        width: 1200,
        height: 630,
        alt: `${SITE.brand} Marketing — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mackays | Australia's Leading Tropical Produce Grower",
    description: SITE.metaDescription,
    images: ['/og/default.png'],
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en-AU"
      className={`${poppins.variable} ${lora.variable} ${mono.variable}`}
    >
      <body>
        <OrganizationJsonLd />
        <AxeCore />
        <SkipToContent />
        <SmoothScrollProvider>
          <Navigation />
          <main id="main-content" tabIndex={-1} className="outline-none">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Poppins, Lora, JetBrains_Mono } from 'next/font/google'
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { PageTransition } from '@/components/layout/PageTransition'
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

export const metadata: Metadata = {
  title: 'Mackays Marketing — From Far North Queensland to your table',
  description:
    'Fourth-generation family farming in Tully, Far North Queensland. Australia\'s largest banana producer, supplying Coles, Woolworths and ALDI nationally.',
  metadataBase: new URL('https://mackays.com.au'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${lora.variable} ${mono.variable}`}
    >
      <body>
        <SmoothScrollProvider>
          <Navigation />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}

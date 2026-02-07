import JsonLd from '@/components/JsonLd'
import SkipToContent from '@/components/SkipToContent'
import { generateOrganizationLD } from '@/lib/structured-data'
import '@/styles/tailwind.css'
import { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import ThemeProvider from './theme-provider'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s - Product Review Site',
    default: 'Product Review Site - Expert Reviews & Comparisons',
  },
  description: 'Expert product reviews with detailed ratings, pros and cons analysis, and buying guides to help you make informed decisions.',
  keywords: ['product reviews', 'tech reviews', 'buying guide', 'comparison', 'ratings'],
  openGraph: {
    type: 'website',
    siteName: 'Product Review Site',
    locale: 'en_US',
    url: SITE_URL,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Product Review Site' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={beVietnamPro.className}>
      <body className="bg-white text-base text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
        <SkipToContent />
        <ThemeProvider>
          <div>{children}</div>
        </ThemeProvider>
        <JsonLd data={generateOrganizationLD()} />
      </body>
    </html>
  )
}

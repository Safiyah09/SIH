import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' })

export const metadata: Metadata = {
  title: {
    default: 'Andhra Pradesh Heritage Explorer',
    template: '%s | Andhra Pradesh Heritage Explorer',
  },
  description:
    'Explore the art, painting, dance, monuments, music, festivals, food and traditional games of Andhra Pradesh.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.webp', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.webp', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.webp',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FFF1D2',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-dvh flex-col bg-background font-sans text-foreground antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

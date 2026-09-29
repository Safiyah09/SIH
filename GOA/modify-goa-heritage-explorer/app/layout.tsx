import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Noto_Sans_Devanagari, Nunito } from 'next/font/google'
import { LanguageProvider } from '@/lib/i18n'
import { getServerLang, getServerT } from '@/lib/server-lang'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' })
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito', display: 'swap' })
const devanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '600', '700'],
  variable: '--font-devanagari',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerT()
  return {
    title: {
      default: t('brand'),
      template: `%s | ${t('brand')}`,
    },
    description: t('siteDescription'),
    ...baseMetadata,
  }
}

const baseMetadata: Metadata = {
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#168AAD',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const lang = await getServerLang()
  return (
    <html lang={lang} className={`${fraunces.variable} ${nunito.variable} ${devanagari.variable} bg-background`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <LanguageProvider initialLang={lang}>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

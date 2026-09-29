'use client'

import Link from 'next/link'
import { categories } from '@/lib/heritage-data'
import type { DictKey } from '@/lib/i18n'
import { T, useLanguage } from '@/lib/i18n'
import { WaveDivider } from './wave-divider'

export function SiteFooter() {
  const { t } = useLanguage()
  return (
    <footer className="mt-16 bg-laterite text-cream">
      <WaveDivider className="-mt-px text-background" flip />
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-10 pt-4 md:flex-row md:justify-between md:px-6">
        <div className="max-w-sm">
          <p className="font-serif text-xl font-bold">
            <T k="brand" />
          </p>
          <p className="mt-2 text-cream/85">
            <T k="footerText" />
          </p>
        </div>
        <nav aria-label={t('footerNav')}>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-4">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}`} className="text-cream/90 hover:text-gold">
                  <T k={`cat.${c.key}` as DictKey} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="h-2 bg-[linear-gradient(90deg,#168aad_0_25%,#f2b84b_25%_50%,#c65a3a_50%_75%,#d6537a_75%)]" />
    </footer>
  )
}

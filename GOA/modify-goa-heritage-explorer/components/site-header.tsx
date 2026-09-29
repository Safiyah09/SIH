'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, Sun, X } from 'lucide-react'
import { categories } from '@/lib/heritage-data'
import { useLanguage, type DictKey } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { LanguageToggle } from './language-toggle'

export function SiteHeader() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-sea text-cream shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-serif text-lg font-bold" onClick={() => setOpen(false)}>
          <span className="flex size-9 items-center justify-center rounded-full bg-gold text-laterite">
            <Sun className="size-5" aria-hidden="true" />
          </span>
          {t('brand')}
        </Link>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <button
            type="button"
            className="rounded-md p-2 hover:bg-cream/15 lg:hidden"
            aria-expanded={open}
            aria-controls="category-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
            <span className="sr-only">{t(open ? 'closeMenu' : 'openMenu')}</span>
          </button>
        </div>
      </div>

      <nav
        id="category-nav"
        aria-label={t('categories')}
        className={cn(
          'border-t border-cream/20 bg-sea',
          open
            ? 'block animate-in fade-in slide-in-from-top-2 duration-300 lg:animate-none'
            : 'hidden lg:block',
        )}
      >
        <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-2 md:px-6 lg:flex-row lg:flex-wrap lg:items-center lg:gap-1">
          {categories.map((c) => {
            const active = pathname.startsWith(`/category/${c.slug}`)
            return (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  onClick={() => setOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'nav-link block rounded-full px-3 py-1.5 text-sm font-semibold transition-colors',
                    active ? 'bg-gold text-laterite' : 'hover:bg-cream/15',
                  )}
                >
                  {t(`cat.${c.key}` as DictKey)}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { getCategory } from '@/lib/heritage-data'
import { useLanguage } from '@/lib/i18n'
import { localizeItem } from '@/lib/heritage-data-kok'
import { ItemCard } from './item-card'

export function CategoryItems({ categorySlug }: { categorySlug: string }) {
  const { t, lang } = useLanguage()
  const [query, setQuery] = useState('')
  const category = getCategory(categorySlug)
  if (!category) return null

  const q = query.trim().toLowerCase()
  const filtered = category.items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => {
      if (!q) return true
      const local = localizeItem(item, lang)
      return `${item.name} ${item.summary} ${local.name} ${local.summary}`.toLowerCase().includes(q)
    })

  return (
    <div>
      <label className="relative block max-w-md">
        <span className="sr-only">{t('search')}</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-laterite/60" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('search')}
          className="w-full rounded-full border-2 border-laterite/20 bg-cream py-3 pl-12 pr-4 text-laterite placeholder:text-laterite/60 focus:border-sea focus:outline-none"
        />
      </label>

      {filtered.length === 0 ? (
        <p className="mt-10 text-laterite/80">{t('noResults')}</p>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(({ item, index }) => (
            <li key={item.slug} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <ItemCard category={category} item={item} index={index} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

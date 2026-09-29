'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Category, HeritageItem } from '@/lib/heritage-data'
import { T, useLocalizedItem } from '@/lib/i18n'
import { toneStyles } from '@/lib/tones'
import { cn } from '@/lib/utils'

export function ItemCard({
  category,
  item,
  index,
}: {
  category: Category
  item: HeritageItem
  index?: number
}) {
  const tone = toneStyles[category.tone]
  const text = useLocalizedItem(item)
  return (
    <Link
      href={`/category/${category.slug}/${item.slug}`}
      className={cn(
        'group flex h-full flex-col gap-3 rounded-2xl border-2 border-laterite/15 bg-cream p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
        tone.ring,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        {typeof index === 'number' && (
          <span
            className={cn('flex size-9 shrink-0 items-center justify-center rounded-full font-serif text-sm font-bold', tone.soft)}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
        <ArrowUpRight
          className="ml-auto size-5 text-laterite/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sea"
          aria-hidden="true"
        />
      </div>
      <h3 className="text-lg font-bold leading-snug text-laterite">{text.name}</h3>
      <p className="flex-1 text-sm leading-relaxed text-laterite/85">{text.summary}</p>
      <span className="text-sm font-bold text-sea">
        <T k="readMore" />
      </span>
    </Link>
  )
}

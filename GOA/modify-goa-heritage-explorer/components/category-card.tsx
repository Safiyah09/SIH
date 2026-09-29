import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Category } from '@/lib/heritage-data'
import { T, type DictKey } from '@/lib/i18n'
import { toneStyles } from '@/lib/tones'
import { cn } from '@/lib/utils'

export function CategoryCard({ category }: { category: Category }) {
  const tone = toneStyles[category.tone]
  return (
    <Link
      href={`/category/${category.slug}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-3xl border-2 border-laterite/15 bg-cream shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
        tone.ring,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={category.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <span className="sheen" aria-hidden="true" />
        <span className={cn('absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold transition-transform duration-300 group-hover:-translate-y-0.5', tone.solid)}>
          {category.items.length} <T k="items" />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-xl font-bold text-laterite">
          <T k={`cat.${category.key}` as DictKey} />
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-laterite/85">
          <T k={`desc.${category.key}` as DictKey} />
        </p>
        <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-sea">
          <T k="explore" />
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}

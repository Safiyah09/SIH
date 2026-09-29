import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { categories, getCategory } from '@/lib/heritage-data'
import { T, type DictKey } from '@/lib/i18n'
import { localizeItem } from '@/lib/heritage-data-kok'
import { getServerT } from '@/lib/server-lang'
import { toneStyles } from '@/lib/tones'
import { cn } from '@/lib/utils'
import { CategoryItems } from '@/components/category-items'
import { WaveDivider } from '@/components/wave-divider'

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) return {}
  const { lang, t } = await getServerT()
  const name = t(`cat.${category.key}` as DictKey)
  return {
    title: t('metaCategoryTitle', { category: name }),
    description: t('metaCategoryDescription', {
      count: category.items.length,
      list: category.items.map((i) => localizeItem(i, lang).name).join(', '),
    }),
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()
  const tone = toneStyles[category.tone]

  return (
    <>
      <section className={cn('relative overflow-hidden', tone.solid)}>
        <Image src={category.image} alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-10 md:px-6 md:pb-24">
          <Link href="/" className="inline-flex items-center gap-1 text-sm font-bold opacity-90 hover:opacity-100">
            <ChevronLeft className="size-4" aria-hidden="true" />
            <T k="home" />
          </Link>
          <h1 className="mt-4 animate-in fade-in slide-in-from-bottom-3 text-4xl font-bold duration-500 md:text-6xl">
            <T k={`cat.${category.key}` as DictKey} />
          </h1>
          <p className="mt-3 max-w-2xl text-lg font-semibold opacity-95">
            <T k={`desc.${category.key}` as DictKey} />
          </p>
          <p className="mt-4 inline-flex rounded-full bg-cream px-3 py-1 text-sm font-bold text-laterite">
            {category.items.length} <T k="items" />
          </p>
        </div>
        <WaveDivider className="absolute inset-x-0 bottom-0 text-background" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <CategoryItems categorySlug={category.slug} />
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { categories, getItem } from '@/lib/heritage-data'
import { ItemText, T, type DictKey } from '@/lib/i18n'
import { localizeItem } from '@/lib/heritage-data-kok'
import { getServerT } from '@/lib/server-lang'
import { toneStyles } from '@/lib/tones'
import { cn } from '@/lib/utils'
import { ItemCard } from '@/components/item-card'
import { Reveal } from '@/components/reveal'

type Params = Promise<{ slug: string; item: string }>

export function generateStaticParams() {
  return categories.flatMap((c) => c.items.map((i) => ({ slug: c.slug, item: i.slug })))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug, item } = await params
  const found = getItem(slug, item)
  if (!found) return {}
  const { lang } = await getServerT()
  const text = localizeItem(found.item, lang)
  return { title: text.name, description: text.summary }
}

export default async function ItemPage({ params }: { params: Params }) {
  const { slug, item: itemSlug } = await params
  const found = getItem(slug, itemSlug)
  if (!found) notFound()
  const { category, item, prev, next } = found
  const tone = toneStyles[category.tone]
  const categoryLabel = `cat.${category.key}` as DictKey
  const related = category.items.filter((i) => i.slug !== item.slug).slice(0, 3)
  const { t, lang } = await getServerT()
  const localized = localizeItem(item, lang)

  return (
    <article className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <nav aria-label={t('breadcrumb')} className="text-sm font-semibold">
        <ol className="flex flex-wrap items-center gap-1 text-laterite/80">
          <li>
            <Link href="/" className="hover:text-sea">
              <T k="home" />
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/category/${category.slug}`} className="hover:text-sea">
              <T k={categoryLabel} />
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-laterite">
            <ItemText item={item} field="name" />
          </li>
        </ol>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-5">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 lg:col-span-3">
          <span className={cn('inline-flex rounded-full px-3 py-1 text-sm font-bold', tone.solid)}>
            <T k={categoryLabel} />
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-laterite md:text-5xl"><ItemText item={item} field="name" /></h1>
          <p className="mt-4 text-xl leading-relaxed text-laterite/90"><ItemText item={item} field="summary" /></p>

          <h2 className="mt-10 text-2xl font-bold text-laterite">
            <T k="about" />
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-laterite/90"><ItemText item={item} field="description" /></p>

          <div className="mt-8 flex items-start gap-4 rounded-2xl border-2 border-tropical/30 bg-tropical/10 p-5">
            <MapPin className="mt-0.5 size-6 shrink-0 text-tropical" aria-hidden="true" />
            <div>
              <h2 className="font-sans text-sm font-bold uppercase tracking-wide text-tropical">
                <T k="where" />
              </h2>
              <p className="mt-1 text-laterite"><ItemText item={item} field="where" /></p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-t-[8rem] rounded-b-3xl border-8 border-gold shadow-xl">
            <Image
              src={item.image}
              alt={localized.name}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="hero-img object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="sheen" aria-hidden="true" />
          </div>
        </div>
      </div>

      <nav aria-label={t('itemNav')} className="mt-12 grid gap-4 border-y-2 border-laterite/15 py-6 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/category/${category.slug}/${prev.slug}`}
            className="group flex items-center gap-3 rounded-xl p-3 hover:bg-sky/15"
          >
            <ChevronLeft className="size-5 text-sea transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            <span>
              <span className="block text-xs font-bold uppercase tracking-wide text-laterite/70">
                <T k="previous" />
              </span>
              <span className="font-bold text-laterite"><ItemText item={prev} field="name" /></span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/category/${category.slug}/${next.slug}`}
            className="group flex items-center justify-end gap-3 rounded-xl p-3 text-right hover:bg-sky/15"
          >
            <span>
              <span className="block text-xs font-bold uppercase tracking-wide text-laterite/70">
                <T k="next" />
              </span>
              <span className="font-bold text-laterite"><ItemText item={next} field="name" /></span>
            </span>
            <ChevronRight className="size-5 text-sea transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        )}
      </nav>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-laterite">
            <T k="moreIn" /> <T k={categoryLabel} />
          </h2>
          <Link
            href={`/category/${category.slug}`}
            className="rounded-full bg-gold px-5 py-2 text-sm font-bold text-laterite transition-transform hover:-translate-y-0.5"
          >
            <T k="viewAll" />
          </Link>
        </div>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r, i) => (
            <Reveal as="li" key={r.slug} delay={(i % 3) * 90}>
              <ItemCard category={category} item={r} />
            </Reveal>
          ))}
        </ul>
      </section>
    </article>
  )
}

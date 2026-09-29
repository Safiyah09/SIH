import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react"
import { categories, getItem, toneClasses } from "@/lib/heritage-data"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ItemCard } from "@/components/item-card"
import { cn } from "@/lib/utils"

type Props = { params: Promise<{ category: string; item: string }> }

export function generateStaticParams() {
  return categories.flatMap((c) => c.items.map((i) => ({ category: c.slug, item: i.slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, item } = await params
  const result = getItem(category, item)
  if (!result) return {}
  return { title: result.item.name, description: result.item.summary }
}

export default async function ItemPage({ params }: Props) {
  const { category: categorySlug, item: itemSlug } = await params
  const result = getItem(categorySlug, itemSlug)
  if (!result) notFound()
  const { category, item, previous, next } = result
  const tone = toneClasses[category.tone]
  const related = category.items.filter((i) => i.slug !== item.slug).slice(0, 3)

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Image src={item.image} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/50" />
        <div className="mx-auto flex max-w-4xl flex-col gap-5 px-4 pb-14 pt-24 md:px-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: category.name, href: `/categories/${category.slug}` },
              { label: item.name },
            ]}
          />
          <span className={cn("w-fit rounded-full px-3 py-1 text-xs font-semibold text-parchment", tone.bg)}>
            {category.singular}
          </span>
          <h1 className="font-serif text-4xl font-semibold text-parchment text-balance md:text-5xl">{item.name}</h1>
          <p className="flex items-center gap-2 text-parchment/85">
            <MapPin className="size-4 text-turmeric" aria-hidden="true" />
            {item.location}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <p className="font-serif text-2xl leading-snug text-pretty">{item.summary}</p>
        <div className="mt-6 h-1 w-20 rounded-full bg-turmeric" aria-hidden="true" />
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">{item.description}</p>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border">
          <div className="relative aspect-[16/9]">
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="(min-width: 896px) 896px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <nav aria-label="Item navigation" className="mt-10 grid gap-4 sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/categories/${category.slug}/${previous.slug}`}
              className="flex flex-col gap-1 rounded-2xl border border-border bg-card p-5 hover:border-primary"
            >
              <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <ArrowLeft className="size-3.5" aria-hidden="true" /> Previous
              </span>
              <span className="font-serif text-lg font-semibold">{previous.name}</span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next && (
            <Link
              href={`/categories/${category.slug}/${next.slug}`}
              className="flex flex-col items-end gap-1 rounded-2xl border border-border bg-card p-5 text-right hover:border-primary"
            >
              <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Next <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
              <span className="font-serif text-lg font-semibold">{next.name}</span>
            </Link>
          )}
        </nav>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-2xl font-semibold md:text-3xl">More {category.name.toLowerCase()}</h2>
            <Link
              href={`/categories/${category.slug}`}
              className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-kumkum"
            >
              View all {category.items.length}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <ItemCard category={category} item={r} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}

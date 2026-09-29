import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { categories, getCategory } from "@/lib/heritage-data"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ItemCard } from "@/components/item-card"
import { cn } from "@/lib/utils"

type Props = { params: Promise<{ category: string }> }

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params
  const category = getCategory(slug)
  if (!category) return {}
  return { title: category.name, description: category.intro }
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Image src={category.image} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/40" />
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 pb-14 pt-24 md:px-6">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category.name }]} />
          <h1 className="font-serif text-4xl font-semibold text-parchment text-balance md:text-5xl">
            {category.name}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-parchment/85 text-pretty">{category.intro}</p>
          <p className="w-fit rounded-full bg-kumkum px-3 py-1 text-sm font-semibold text-parchment">
            {category.items.length} treasures
          </p>
        </div>
      </section>

      <nav aria-label="Other categories" className="border-b border-border bg-card">
        <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 md:px-6">
          {categories.map((c) => (
            <li key={c.slug} className="shrink-0">
              <Link
                href={`/categories/${c.slug}`}
                aria-current={c.slug === category.slug ? "page" : undefined}
                className={cn(
                  "block rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                  c.slug === category.slug
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary",
                )}
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {category.items.map((item, i) => (
            <li key={item.slug}>
              <ItemCard category={category} item={item} index={i} />
            </li>
          ))}
        </ul>
      </section>
      {category.slug === "regional-board-game" && (
        <section className="mx-auto max-w-7xl px-4 pb-12 md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-coastal/30 bg-coastal/10 p-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-coastal">Take it off the page</p>
              <h2 className="mt-1 font-serif text-2xl font-semibold">Play five heritage games</h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">Learn the variant, choose your difficulty and keep your score in the Heritage Passport.</p>
            </div>
            <Link href="/games" className="rounded-full bg-coastal px-5 py-2.5 text-sm font-semibold text-parchment hover:bg-ink">Open game cabinet</Link>
          </div>
        </section>
      )}
    </>
  )
}

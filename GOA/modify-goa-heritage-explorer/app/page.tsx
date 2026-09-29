import { categories } from '@/lib/heritage-data'
import { T } from '@/lib/i18n'
import { Hero } from '@/components/hero'
import { CategoryCard } from '@/components/category-card'
import { ItemCard } from '@/components/item-card'
import { Reveal } from '@/components/reveal'

const featured = [
  ['monument', 'basilica-of-bom-jesus'],
  ['dance', 'fugdi'],
  ['festival', 'goa-carnival'],
  ['food', 'bebinca'],
  ['musical-instrument', 'ghumot'],
  ['painting', 'azulejo-tile-art'],
] as const

export default function HomePage() {
  const featuredItems = featured.flatMap(([catSlug, itemSlug]) => {
    const category = categories.find((c) => c.slug === catSlug)
    const item = category?.items.find((i) => i.slug === itemSlug)
    return category && item ? [{ category, item }] : []
  })

  return (
    <>
      <Hero />

      <section id="categories" className="mx-auto max-w-7xl scroll-mt-32 px-4 py-16 md:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-bold text-laterite md:text-4xl">
            <T k="categoriesTitle" />
          </h2>
          <p className="mt-3 text-lg text-laterite/85">
            <T k="categoriesText" />
          </p>
        </Reveal>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={(i % 4) * 90}>
              <CategoryCard category={c} />
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="tile-pattern border-y-4 border-gold/60 bg-sky/15 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Reveal>
            <h2 className="text-3xl font-bold text-laterite md:text-4xl">
              <T k="featured" />
            </h2>
            <p className="mt-3 text-lg text-laterite/85">
              <T k="featuredText" />
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredItems.map(({ category, item }, i) => (
              <Reveal as="li" key={item.slug} delay={(i % 3) * 90}>
                <ItemCard category={category} item={item} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

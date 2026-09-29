import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Gamepad2, Mountain, Waves, Wheat } from "lucide-react"
import { categories, totalItems } from "@/lib/heritage-data"
import { CategoryCard } from "@/components/category-card"
import { HeritageSearch } from "@/components/heritage-search"

const regions = [
  {
    name: "Coastal Andhra",
    icon: Waves,
    className: "bg-coastal",
    text: "Godavari and Krishna deltas, Kuchipudi village, Uppada looms and Machilipatnam Kalamkari.",
  },
  {
    name: "Uttarandhra",
    icon: Mountain,
    className: "bg-leaf",
    text: "Araku valley, Borra Caves, Simhachalam, Etikoppaka toys and Tappeta Gullu drums.",
  },
  {
    name: "Rayalaseema",
    icon: Wheat,
    className: "bg-kondapalli",
    text: "Lepakshi, Gandikota, Belum Caves, Tirumala and the leather puppets of Nimmalakunta.",
  },
]

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/hero-lepakshi.webp"
          alt="The Lepakshi Veerabhadra temple and monolithic Nandi at golden hour"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/20" />
        <div className="mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center gap-6 px-4 py-20 md:px-6">
          <p className="w-fit rounded-full bg-turmeric px-3 py-1 text-xs font-semibold uppercase tracking-widest text-ink">
            Andhra Pradesh
          </p>
          <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-tight text-parchment text-balance md:text-6xl">
            Discover the living heritage of the Telugu land
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-parchment/85 text-pretty">
            Journey through Kalamkari workshops, Kuchipudi stages, Vijayanagara temples, festival streets and fiery
            Andhra kitchens.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#categories"
              className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-kumkum"
            >
              Start exploring
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/categories/monument"
              className="rounded-full border border-parchment/40 px-6 py-3 font-semibold text-parchment transition-colors hover:bg-parchment/10"
            >
              View monuments
            </Link>
          </div>
          <dl className="mt-6 flex flex-wrap gap-8">
            <div>
              <dt className="text-sm text-parchment/70">Categories</dt>
              <dd className="font-serif text-3xl font-semibold text-turmeric">{categories.length}</dd>
            </div>
            <div>
              <dt className="text-sm text-parchment/70">Heritage treasures</dt>
              <dd className="font-serif text-3xl font-semibold text-turmeric">{totalItems}</dd>
            </div>
            <div>
              <dt className="text-sm text-parchment/70">Regions</dt>
              <dd className="font-serif text-3xl font-semibold text-turmeric">{regions.length}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 md:px-6">
        <div className="flex max-w-2xl flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-kumkum">Categories</p>
          <h2 className="font-serif text-3xl font-semibold text-balance md:text-4xl">
            Eight windows into Andhra culture
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            Each collection brings together the crafts, performances, places and flavours that define Andhra Pradesh.
          </p>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <li key={c.slug}>
              <CategoryCard category={c} />
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-muted/60">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="flex max-w-2xl flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-leaf">Regions</p>
            <h2 className="font-serif text-3xl font-semibold text-balance md:text-4xl">
              From the Bay of Bengal to the Deccan plateau
            </h2>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {regions.map((r) => (
              <li key={r.name} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
                <span className={`flex size-11 items-center justify-center rounded-xl text-parchment ${r.className}`}>
                  <r.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-serif text-xl font-semibold">{r.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="overflow-hidden rounded-3xl bg-ink p-7 text-parchment md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-turmeric"><Gamepad2 className="size-4" /> Play the heritage</p>
              <h2 className="mt-3 max-w-2xl font-serif text-3xl font-semibold text-balance md:text-4xl">Seeds, shells and stories from Andhra courtyards</h2>
              <p className="mt-3 max-w-xl leading-relaxed text-parchment/70">Try five traditional board games with rule-based computer opponents, multiple difficulty levels and a Heritage Passport that remembers every round.</p>
            </div>
            <Link href="/games" className="flex w-fit items-center gap-2 rounded-full bg-turmeric px-5 py-3 font-semibold text-ink transition-colors hover:bg-parchment">
              Explore games <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-8 flex max-w-2xl flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-kumkum">Explore all</p>
          <h2 className="font-serif text-3xl font-semibold text-balance md:text-4xl">Find a heritage treasure</h2>
        </div>
        <HeritageSearch />
      </section>
    </>
  )
}

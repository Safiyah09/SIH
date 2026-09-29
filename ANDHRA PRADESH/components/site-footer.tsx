import Link from "next/link"
import { categories } from "@/lib/heritage-data"

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-ink text-parchment">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 md:flex-row md:justify-between md:px-6">
        <div className="max-w-sm">
          <p className="font-serif text-2xl font-semibold">Andhra Pradesh Heritage Explorer</p>
          <p className="mt-3 text-sm leading-relaxed text-parchment/75">
            A guide to the living traditions of Coastal Andhra, Uttarandhra and Rayalaseema, from Kalamkari and
            Kuchipudi to Gandikota and Gongura.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-xs font-semibold uppercase tracking-widest text-turmeric">Explore</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/categories/${c.slug}`} className="text-parchment/85 hover:text-turmeric">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/games" className="flex items-center gap-1 text-turmeric hover:text-parchment">
                Traditional games
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-parchment/15">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-parchment/60 md:px-6">
          Celebrating the cultural heritage of Andhra Pradesh.
        </p>
      </div>
    </footer>
  )
}

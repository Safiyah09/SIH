import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { type HeritageCategory, toneClasses } from "@/lib/heritage-data"
import { cn } from "@/lib/utils"

export function CategoryCard({ category }: { category: HeritageCategory }) {
  const tone = toneClasses[category.tone]
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-kondapalli/15"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={category.image}
          alt={category.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold text-parchment",
            tone.bg,
          )}
        >
          {category.items.length} treasures
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl font-semibold text-balance">{category.name}</h3>
          <ArrowUpRight
            className="size-5 shrink-0 text-turmeric transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{category.tagline}</p>
      </div>
    </Link>
  )
}

import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { type HeritageCategory, type HeritageItem, toneClasses } from "@/lib/heritage-data"
import { cn } from "@/lib/utils"

export function ItemCard({
  category,
  item,
  index,
}: {
  category: HeritageCategory
  item: HeritageItem
  index?: number
}) {
  const tone = toneClasses[category.tone]
  return (
    <Link
      href={`/categories/${category.slug}/${item.slug}`}
      className={cn(
        "group flex h-full flex-col gap-3 rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-lg hover:shadow-kondapalli/10",
        tone.border,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", tone.soft, tone.text)}>
          {category.singular}
        </span>
        {typeof index === "number" && (
          <span className="font-serif text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
        )}
      </div>
      <h3 className="font-serif text-xl font-semibold text-balance">{item.name}</h3>
      <p className="flex items-center gap-1.5 text-xs font-medium text-coastal">
        <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
        {item.location}
      </p>
      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
      <span className="flex items-center gap-1 text-sm font-semibold text-primary">
        Discover
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  )
}

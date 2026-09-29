"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { categories } from "@/lib/heritage-data"
import { ItemCard } from "@/components/item-card"
import { cn } from "@/lib/utils"

export function HeritageSearch() {
  const [query, setQuery] = useState("")
  const [active, setActive] = useState<string>("all")

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return categories
      .filter((c) => active === "all" || c.slug === active)
      .flatMap((category) =>
        category.items
          .filter(
            (item) =>
              !q ||
              item.name.toLowerCase().includes(q) ||
              item.location.toLowerCase().includes(q) ||
              item.summary.toLowerCase().includes(q),
          )
          .map((item) => ({ category, item })),
      )
  }, [query, active])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <label htmlFor="heritage-search" className="sr-only">
          Search Andhra Pradesh heritage
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id="heritage-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Kuchipudi, Gandikota, Pootharekulu..."
            className="h-12 w-full rounded-full border border-border bg-card pl-12 pr-4 text-base outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {[{ slug: "all", name: "All" }, ...categories].map((c) => (
            <button
              key={c.slug}
              type="button"
              aria-pressed={active === c.slug}
              onClick={() => setActive(c.slug)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                active === c.slug
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary",
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        Showing {results.length} {results.length === 1 ? "treasure" : "treasures"}
      </p>

      {results.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map(({ category, item }) => (
            <li key={`${category.slug}-${item.slug}`}>
              <ItemCard category={category} item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
          No heritage items match your search. Try another name or place.
        </p>
      )}
    </div>
  )
}

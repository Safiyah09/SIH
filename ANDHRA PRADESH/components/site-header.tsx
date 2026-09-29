"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Gamepad2, Landmark, Menu, X } from "lucide-react"
import { categories } from "@/lib/heritage-data"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Landmark className="size-5" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-lg font-semibold">Andhra Pradesh</span>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Heritage Explorer</span>
          </span>
        </Link>

        <nav aria-label="Categories" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {categories.map((c) => {
              const active = pathname.startsWith(`/categories/${c.slug}`)
              return (
                <li key={c.slug}>
                  <Link
                    href={`/categories/${c.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted",
                      active && "bg-primary text-primary-foreground hover:bg-primary",
                    )}
                  >
                    {c.name}
                  </Link>
                </li>
              )
            })}
            <li>
              <Link
                href="/games"
                aria-current={pathname.startsWith("/games") ? "page" : undefined}
                className={cn(
                  "flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted",
                  pathname.startsWith("/games") && "bg-primary text-primary-foreground hover:bg-primary",
                )}
              >
                <Gamepad2 className="size-3.5" aria-hidden="true" /> Games
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-lg border border-border lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Categories" className="border-t border-border bg-background lg:hidden">
          <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-2 p-4">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categories/${c.slug}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-medium hover:border-primary"
                >
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/games" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2.5 text-sm font-semibold text-primary hover:border-primary">
                <Gamepad2 className="size-4" aria-hidden="true" /> Traditional games
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

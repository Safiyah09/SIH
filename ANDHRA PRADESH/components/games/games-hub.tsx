"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Crown, Gamepad2, Sparkles, Trophy } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { gameDefinitions } from "@/lib/game-data"
import { getGameResults, type GameResult } from "@/lib/game-storage"
import { cn } from "@/lib/utils"

const accentClasses = {
  coastal: "bg-coastal",
  turmeric: "bg-turmeric",
  kumkum: "bg-kumkum",
  kondapalli: "bg-kondapalli",
  leaf: "bg-leaf",
}

export function GamesHub() {
  const [results, setResults] = useState<GameResult[]>([])

  useEffect(() => {
    setResults(getGameResults())
  }, [])

  const wins = useMemo(() => results.filter((result) => result.winner === "player"), [results])
  const completedGames = new Set(wins.map((result) => result.game))
  const bestScore = results.length ? Math.max(...results.map((result) => result.score)) : 0
  const bestAccuracy = results.length ? Math.max(...results.map((result) => result.accuracy)) : 0

  return (
    <div className="min-h-screen">
      <section className="relative isolate overflow-hidden bg-ink text-parchment">
        <div className="absolute inset-0 -z-10 heritage-pattern opacity-20" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 lg:grid-cols-[1fr_390px] lg:items-center lg:py-24">
          <div>
            <Link href="/" className="text-sm font-semibold text-parchment/70 hover:text-turmeric">← Back to Heritage Explorer</Link>
            <p className="mt-10 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-turmeric"><Gamepad2 className="size-4" /> Living games of Andhra Pradesh</p>
            <h1 className="mt-4 max-w-3xl font-serif text-5xl font-semibold leading-[1.02] text-balance md:text-7xl">Play the games that travelled through generations.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-parchment/75">Five playable traditions of seeds, shells and chalk grids. Learn the regional variant, choose your difficulty and build your Heritage Passport one win at a time.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#game-cabinet" className="flex items-center gap-2 rounded-full bg-turmeric px-5 py-3 font-semibold text-ink hover:bg-parchment"><Sparkles className="size-4" /> Choose a game</a>
              <div className="flex items-center gap-2 rounded-full border border-parchment/20 px-5 py-3 text-sm text-parchment/75"><Crown className="size-4 text-turmeric" /> Rule-based play · no AI</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-5 rounded-[2.5rem] border border-turmeric/20" />
            <div className="relative overflow-hidden rounded-3xl border border-parchment/20 bg-parchment/10 p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src="/images/cat-board-game.webp" alt="Traditional Andhra Pradesh board games arranged on a woven mat" fill sizes="(min-width: 1024px) 390px, 100vw" className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 right-5 font-serif text-2xl font-semibold">Seeds, shells & stories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-3 sm:grid-cols-3">
          <ProgressCard label="Heritage progress" value={`${completedGames.size}/5`} detail="games won" icon={Trophy} />
          <ProgressCard label="Best score" value={bestScore} detail={`${wins.length} victories`} icon={Crown} />
          <ProgressCard label="Best accuracy" value={`${bestAccuracy}%`} detail={`${results.length} saved attempts`} icon={Check} />
        </div>
      </section>

      <section id="game-cabinet" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-16 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-kumkum">The game cabinet</p><h2 className="mt-2 font-serif text-4xl font-semibold">Pick your board</h2></div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">Every round is tracked locally as a Heritage Passport entry: score, accuracy, time, moves and game-specific stats.</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {gameDefinitions.map((game, index) => {
            const gameWins = wins.filter((result) => result.game === game.slug).length
            return <Link key={game.slug} href={`/games/${game.slug}`} className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-kondapalli/10">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={game.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <span className={cn("absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-parchment", accentClasses[game.accent])}>{String(index + 1).padStart(2, "0")}</span>
                {gameWins > 0 && <span className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-parchment px-3 py-1 text-xs font-bold text-ink"><Trophy className="size-3.5 text-turmeric" /> {gameWins} {gameWins === 1 ? "win" : "wins"}</span>}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{game.players}</p>
                <h3 className="mt-2 font-serif text-2xl font-semibold">{game.name}</h3>
                <p className="mt-2 text-sm font-medium text-primary">{game.subtitle}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{game.description}</p>
                <span className="mt-5 flex items-center gap-2 text-sm font-bold text-primary">Play this game <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          })}
        </div>
      </section>
    </div>
  )
}

function ProgressCard({ label, value, detail, icon: Icon }: { label: string; value: string | number; detail: string; icon: typeof Trophy }) {
  return <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"><span className="flex size-11 items-center justify-center rounded-xl bg-turmeric/15 text-kondapalli"><Icon className="size-5" /></span><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</p><p className="mt-0.5 font-serif text-2xl font-semibold">{value} <span className="font-sans text-xs font-medium text-muted-foreground">{detail}</span></p></div></div>
}

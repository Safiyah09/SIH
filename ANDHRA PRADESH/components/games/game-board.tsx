"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowLeft,
  Check,
  CircleHelp,
  Clock3,
  Gamepad2,
  History,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react"
import type { Difficulty, GameDefinition, GameSlug } from "@/lib/game-data"
import { getGameResults, getPersonalBest, saveGameResult, type GameResult } from "@/lib/game-storage"
import { cn } from "@/lib/utils"

type PlayMode = "computer" | "player-2"
type Accent = GameDefinition["accent"]

const accentClasses: Record<Accent, { solid: string; soft: string; text: string; ring: string }> = {
  coastal: { solid: "bg-coastal", soft: "bg-coastal/10", text: "text-coastal", ring: "ring-coastal/30" },
  turmeric: { solid: "bg-turmeric", soft: "bg-turmeric/15", text: "text-kondapalli", ring: "ring-turmeric/40" },
  kumkum: { solid: "bg-kumkum", soft: "bg-kumkum/10", text: "text-kumkum", ring: "ring-kumkum/30" },
  kondapalli: { solid: "bg-kondapalli", soft: "bg-kondapalli/10", text: "text-kondapalli", ring: "ring-kondapalli/30" },
  leaf: { solid: "bg-leaf", soft: "bg-leaf/10", text: "text-leaf", ring: "ring-leaf/30" },
}

type Session = {
  startedAt: number
  totalMoves: number
  validMoves: number
  invalidMoves: number
  score: number
}

type RaceState = {
  positions: [number[], number[]]
  turn: 0 | 1
  rolled: number
}

type VamanaState = {
  pits: number[]
  captured: [number, number]
  turn: 0 | 1
}

type ParamapadaState = {
  positions: [number, number]
  turn: 0 | 1
  rolled: number
}

type Finished = {
  result: GameResult
  allResults: GameResult[]
}

const PLAYER_COLOURS = ["bg-kumkum", "bg-coastal"]
const PLAYER_NAMES = ["You", "Computer"]
const RACE_SAFE: Record<Extract<GameSlug, "ashta-chamma" | "chowka-bara" | "pagade">, number[]> = {
  "ashta-chamma": [0, 4, 8, 12, 16, 20],
  "chowka-bara": [0, 4, 8, 12, 16, 20, 24],
  pagade: [0, 8, 16, 24],
}
const RACE_LENGTH: Record<Extract<GameSlug, "ashta-chamma" | "chowka-bara" | "pagade">, number> = {
  "ashta-chamma": 24,
  "chowka-bara": 28,
  pagade: 32,
}

const BASE_LADDERS: Record<number, number> = {
  4: 25,
  9: 31,
  20: 38,
  28: 84,
  40: 59,
  51: 67,
  63: 81,
  71: 91,
}
const BASE_SNAKES: Record<number, number> = {
  17: 7,
  54: 34,
  62: 19,
  64: 60,
  87: 36,
  93: 73,
  95: 75,
  99: 78,
}
const EXPERT_SNAKES: Record<number, number> = { ...BASE_SNAKES, 48: 14, 82: 43 }

function randomDie() {
  return Math.floor(Math.random() * 6) + 1
}

function formatDuration(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, "0")}`
}

function createSession(): Session {
  return { startedAt: Date.now(), totalMoves: 0, validMoves: 0, invalidMoves: 0, score: 0 }
}

function createRaceState(): RaceState {
  return { positions: [[-1, -1, -1, -1], [-1, -1, -1, -1]], turn: 0, rolled: 0 }
}

function createVamanaState(): VamanaState {
  return { pits: Array.from({ length: 14 }, () => 4), captured: [0, 0], turn: 0 }
}

function createParamapadaState(): ParamapadaState {
  return { positions: [0, 0], turn: 0, rolled: 0 }
}

function sideOfPit(index: number): 0 | 1 {
  return index < 7 ? 0 : 1
}

function legalRaceMoves(state: RaceState, player: 0 | 1, roll: number, length: number) {
  if (!roll) return []
  return state.positions[player].flatMap((position, index) => {
    if (position === length) return []
    if (position === -1) return roll === 6 ? [index] : []
    return position + roll <= length ? [index] : []
  })
}

function chooseRaceMove(
  state: RaceState,
  player: 0 | 1,
  roll: number,
  length: number,
  safe: number[],
  difficulty: Difficulty,
) {
  const legal = legalRaceMoves(state, player, roll, length)
  if (!legal.length) return -1
  if (difficulty === "easy") return legal[0]
  const opponent = state.positions[player === 0 ? 1 : 0]
  const scored = legal.map((piece) => {
    const current = state.positions[player][piece]
    const next = current === -1 ? 0 : current + roll
    const capture = opponent.some((position) => position === next && !safe.includes(next))
    const finish = next === length
    const safeLanding = safe.includes(next)
    return {
      piece,
      score: (finish ? 1000 : 0) + (capture ? 250 : 0) + (safeLanding ? 35 : 0) + next,
    }
  })
  scored.sort((a, b) => b.score - a.score || a.piece - b.piece)
  return scored[0].piece
}

function applyVamanaMove(state: VamanaState, pit: number, player: 0 | 1) {
  const pits = state.pits.slice()
  let hand = pits[pit]
  pits[pit] = 0
  let index = pit
  let captured = 0
  while (hand > 0) {
    index = (index + 1) % 14
    pits[index] += 1
    hand -= 1
    if (hand === 0 && pits[index] === 1 && sideOfPit(index) === player) {
      const opposite = 13 - index
      captured = pits[opposite] + pits[index]
      pits[opposite] = 0
      pits[index] = 0
    } else if (hand === 0 && pits[index] > 1) {
      hand = pits[index]
      pits[index] = 0
    }
  }
  return { pits, captured }
}

function chooseVamanaMove(state: VamanaState, player: 0 | 1, difficulty: Difficulty) {
  const legal = state.pits.flatMap((seeds, index) => (seeds > 0 && sideOfPit(index) === player ? [index] : []))
  if (difficulty === "easy" || legal.length < 2) return legal[0] ?? -1
  const moves = legal.map((pit) => {
    const next = applyVamanaMove(state, pit, player)
    const ownSeeds = next.pits.filter((_, index) => sideOfPit(index) === player).reduce((sum, value) => sum + value, 0)
    const opponent = next.pits.filter((_, index) => sideOfPit(index) !== player).reduce((sum, value) => sum + value, 0)
    return { pit, value: next.captured * 40 + ownSeeds * 2 - opponent }
  })
  moves.sort((a, b) => b.value - a.value || a.pit - b.pit)
  return moves[0].pit
}

function statLabel(value: string | number) {
  return typeof value === "number" ? value.toLocaleString("en-IN") : value
}

export function GameBoard({ definition }: { definition: GameDefinition }) {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium")
  const [mode, setMode] = useState<PlayMode>("computer")
  const [session, setSession] = useState<Session>(createSession)
  const [finished, setFinished] = useState<Finished | null>(null)
  const [history, setHistory] = useState<GameResult[]>([])
  const [roundKey, setRoundKey] = useState(0)
  const accent = accentClasses[definition.accent]

  useEffect(() => {
    setHistory(getGameResults(definition.slug))
  }, [definition.slug])

  function restart(nextDifficulty = difficulty, nextMode = mode) {
    setDifficulty(nextDifficulty)
    setMode(nextMode)
    setSession(createSession())
    setFinished(null)
    setRoundKey((value) => value + 1)
  }

  function completeGame(
    winner: "player" | "computer" | "player-2",
    latestSession: Session,
    gameStats: Record<string, string | number>,
  ) {
    const now = Date.now()
    const result: GameResult = {
      id: `${definition.slug}-${now}`,
      playerId: "local-player",
      game: definition.slug,
      difficulty,
      score: Math.max(0, latestSession.score),
      accuracy: Math.round((latestSession.validMoves / Math.max(1, latestSession.validMoves + latestSession.invalidMoves)) * 100),
      duration: now - latestSession.startedAt,
      totalMoves: latestSession.totalMoves,
      validMoves: latestSession.validMoves,
      invalidMoves: latestSession.invalidMoves,
      gameStats,
      winner,
      startedAt: new Date(latestSession.startedAt).toISOString(),
      completedAt: new Date(now).toISOString(),
    }
    saveGameResult(result)
    const gameResults = getGameResults(definition.slug)
    setHistory(gameResults)
    setFinished({ result, allResults: getGameResults() })
  }

  const sharedProps = {
    definition,
    accent,
    difficulty,
    mode,
    roundKey,
    session,
    setSession,
    completeGame,
    finished,
    setFinished,
    restart,
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
          <Link href="/games" className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary">
            <ArrowLeft className="size-4" aria-hidden="true" /> All heritage games
          </Link>
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]">
                <span className={cn("rounded-full px-3 py-1 text-parchment", accent.solid)}>Playable tradition</span>
                <span className="text-muted-foreground">{definition.players}</span>
              </div>
              <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight md:text-6xl">{definition.name}</h1>
              <p className="mt-3 text-xl text-muted-foreground">{definition.subtitle}</p>
              <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">{definition.description}</p>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border shadow-xl shadow-kondapalli/10">
              <Image src={definition.image} alt="" fill sizes="(min-width: 1024px) 360px, 100vw" className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-parchment">{definition.variant}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-7 md:px-6">
        <div className="grid gap-4 rounded-3xl border border-border bg-card p-4 shadow-sm md:grid-cols-[1fr_auto] md:p-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Choose your match</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={() => restart(difficulty, "computer")} className={cn("control-chip", mode === "computer" && "control-chip-active")}>
                <Gamepad2 className="size-4" /> Player vs computer
              </button>
              <button type="button" onClick={() => restart(difficulty, "player-2")} className={cn("control-chip", mode === "player-2" && "control-chip-active")}>
                <Users className="size-4" /> Two players
              </button>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Difficulty</p>
            <div className="mt-3 flex gap-2">
              {(["easy", "medium", "hard"] as Difficulty[]).map((level) => (
                <button key={level} type="button" onClick={() => restart(level, mode)} className={cn("difficulty-chip", difficulty === level && `difficulty-${level}`)}>
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {definition.slug === "vamana-guntalu" ? <VamanaGame {...sharedProps} /> : definition.slug === "paramapada-sopanam" ? <ParamapadaGame {...sharedProps} /> : <RaceGame {...sharedProps} slug={definition.slug} />}

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <Instructions definition={definition} difficulty={difficulty} accent={accent} />
          <HistoryPanel game={definition.slug} history={history} accent={accent} />
        </div>
      </section>
    </div>
  )
}

type GameSharedProps = {
  definition: GameDefinition
  accent: (typeof accentClasses)[Accent]
  difficulty: Difficulty
  mode: PlayMode
  roundKey: number
  session: Session
  setSession: React.Dispatch<React.SetStateAction<Session>>
  completeGame: (winner: "player" | "computer" | "player-2", session: Session, stats: Record<string, string | number>) => void
  finished: Finished | null
  setFinished: React.Dispatch<React.SetStateAction<Finished | null>>
  restart: (difficulty?: Difficulty, mode?: PlayMode) => void
}

function GameStatus({
  turn,
  mode,
  accent,
  session,
  extra,
}: {
  turn: 0 | 1
  mode: PlayMode
  accent: (typeof accentClasses)[Accent]
  session: Session
  extra?: React.ReactNode
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center">
      <div className={cn("rounded-2xl px-4 py-3", turn === 0 ? accent.soft : "bg-muted")}>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Turn</p>
        <p className={cn("mt-1 font-serif text-xl font-semibold", turn === 0 && accent.text)}>{turn === 0 ? "Your move" : mode === "computer" ? "Computer thinking…" : "Player 2"}</p>
      </div>
      {extra}
      <MiniStat icon={Target} label="Score" value={session.score} />
      <MiniStat icon={Check} label="Valid moves" value={session.validMoves} />
      <MiniStat icon={Clock3} label="Moves" value={session.totalMoves} />
    </div>
  )
}

function MiniStat({ icon: Icon, label, value }: { icon: typeof Target; label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border bg-background px-4 py-3">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
        <Icon className="size-3.5" /> {label}
      </div>
      <p className="mt-1 font-serif text-xl font-semibold">{statLabel(value)}</p>
    </div>
  )
}

function RaceGame({
  definition,
  accent,
  difficulty,
  mode,
  roundKey,
  session,
  setSession,
  completeGame,
  finished,
  restart,
  slug,
}: GameSharedProps & { slug: Extract<GameSlug, "ashta-chamma" | "chowka-bara" | "pagade"> }) {
  const [state, setState] = useState<RaceState>(createRaceState)
  const [rolling, setRolling] = useState(false)
  const [message, setMessage] = useState("")
  const [hint, setHint] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const length = RACE_LENGTH[slug]
  const safe = RACE_SAFE[slug]
  const legal = legalRaceMoves(state, state.turn, state.rolled, length)
  const suggested = hint && difficulty !== "hard" ? chooseRaceMove(state, 0, state.rolled, length, safe, difficulty) : -1

  useEffect(() => {
    setState(createRaceState())
    setRolling(false)
    setMessage("")
    setHint(true)
  }, [slug, difficulty, mode, roundKey])

  useEffect(() => {
    if (finished || mode !== "computer" || state.turn !== 1 || state.rolled) return
    setRolling(true)
    timerRef.current = setTimeout(() => {
      setState((current) => ({ ...current, rolled: randomDie() }))
      setRolling(false)
    }, 650)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [finished, mode, state.turn, state.rolled])

  useEffect(() => {
    if (finished || mode !== "computer" || state.turn !== 1 || !state.rolled) return
    setRolling(true)
    timerRef.current = setTimeout(() => {
      const piece = chooseRaceMove(state, 1, state.rolled, length, safe, difficulty)
      if (piece === -1) passRaceTurn(1, state.rolled)
      else moveRacePiece(1, piece, state.rolled)
      setRolling(false)
    }, 700)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
    // The move intentionally runs once for each displayed computer roll.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.rolled, state.turn, mode, finished])

  function passRaceTurn(player: 0 | 1, roll: number) {
    const nextSession = { ...session, totalMoves: session.totalMoves + 1, validMoves: session.validMoves + 1 }
    setSession(nextSession)
    setMessage(`${player === 0 ? "No pawn can move" : "Computer has no legal move"} on a ${roll}.`)
    setState((current) => ({ ...current, rolled: 0, turn: player === 0 ? 1 : 0 }))
  }

  function rollRaceDie() {
    if (finished || rolling || state.turn !== 0 || state.rolled) return
    setRolling(true)
    window.setTimeout(() => {
      const roll = randomDie()
      setState((current) => ({ ...current, rolled: roll }))
      setRolling(false)
      const moves = legalRaceMoves(state, 0, roll, length)
      if (!moves.length) {
        const nextSession = { ...session, totalMoves: session.totalMoves + 1, validMoves: session.validMoves + 1 }
        setSession(nextSession)
        setMessage(`No pawn can move on a ${roll}. The turn passes.`)
        window.setTimeout(() => setState((current) => ({ ...current, rolled: 0, turn: 1 })), 700)
      } else {
        setMessage(`Choose a highlighted pawn to move ${roll} spaces.`)
      }
    }, 600)
  }

  function moveRacePiece(player: 0 | 1, piece: number, roll: number) {
    const available = legalRaceMoves(state, player, roll, length)
    if (!available.includes(piece)) {
      setSession((current) => ({ ...current, invalidMoves: current.invalidMoves + 1, totalMoves: current.totalMoves + 1 }))
      setMessage("That pawn cannot make this move. Choose a highlighted pawn.")
      return
    }
    const currentPosition = state.positions[player][piece]
    const nextPosition = currentPosition === -1 ? 0 : currentPosition + roll
    const opponent = player === 0 ? 1 : 0
    const captured = state.positions[opponent].some((position) => position === nextPosition && !safe.includes(nextPosition))
    const positions: [number[], number[]] = [state.positions[0].slice(), state.positions[1].slice()]
    positions[player][piece] = nextPosition
    if (captured) {
      positions[opponent] = positions[opponent].map((position) => (position === nextPosition && !safe.includes(nextPosition) ? -1 : position))
    }
    const finishedPieces = positions[player].filter((position) => position === length).length
    const nextSession = {
      ...session,
      totalMoves: session.totalMoves + 1,
      validMoves: session.validMoves + 1,
      score: session.score + (nextPosition === length ? 120 : 12) + (captured ? 70 : 0),
    }
    if (finishedPieces === 4) {
      setSession(nextSession)
      completeGame(player === 0 ? "player" : mode === "computer" ? "computer" : "player-2", nextSession, {
        pawnsHome: finishedPieces,
        captures: captured ? 1 : 0,
        routeLength: length,
      })
      return
    }
    const bonus = roll === 6 || captured
    setSession(nextSession)
    setState({ positions, rolled: 0, turn: bonus ? player : player === 0 ? 1 : 0 })
    setMessage(captured ? "Capture! Your opponent returns to the nest." : bonus ? "A bonus turn — roll again." : "Move complete.")
  }

  const cells = Array.from({ length: length }, (_, index) => index)
  return (
    <section className="game-panel">
      <GameStatus turn={state.turn} mode={mode} accent={accent} session={session} extra={<DiceBadge value={state.rolled} rolling={rolling} onClick={rollRaceDie} disabled={state.turn !== 0 || !!state.rolled || rolling || !!finished} />} />
      <div className="mt-5 grid gap-6 xl:grid-cols-[1fr_250px]">
        <div className="game-board-shell">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">The playing route</p>
              <p className="mt-1 text-sm text-muted-foreground">Marked spaces are safe · home is the centre</p>
            </div>
            <p className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">{state.rolled ? `Roll: ${state.rolled}` : "Roll the cowries to begin"}</p>
          </div>
          <div className="race-track" style={{ gridTemplateColumns: "repeat(8, minmax(0, 1fr))" }}>
            {cells.map((cell) => {
              const occupants = state.positions.flatMap((positions, player) => positions.flatMap((position, piece) => (position === cell ? [{ player, piece }] : [])))
              const isSafe = safe.includes(cell)
              return (
                <div key={cell} className={cn("race-cell", isSafe && "race-cell-safe", cell === length - 1 && "race-cell-home")}>
                  <span className="race-cell-number">{cell + 1}</span>
                  {occupants.map(({ player, piece }) => (
                    <button
                      key={`${player}-${piece}`}
                      type="button"
                      aria-label={`${PLAYER_NAMES[player]} pawn ${piece + 1} on square ${cell + 1}`}
                      onClick={() => moveRacePiece(state.turn, piece, state.rolled)}
                      className={cn("race-piece", PLAYER_COLOURS[player], state.turn === player && legal.includes(piece) && "race-piece-legal", state.turn === 0 && suggested === piece && "race-piece-hint")}
                    >
                      {piece + 1}
                    </button>
                  ))}
                </div>
              )
            })}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[0, 1].map((player) => (
              <div key={player} className={cn("rounded-2xl border border-border p-4", player === 0 ? "bg-kumkum/5" : "bg-coastal/5")}>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{player === 0 ? "Your nest" : mode === "computer" ? "Computer nest" : "Player 2 nest"}</p>
                  <span className="text-xs text-muted-foreground">{state.positions[player].filter((position) => position === -1).length} waiting</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {state.positions[player].map((position, piece) => position === -1 ? (
                    <button key={piece} type="button" onClick={() => moveRacePiece(state.turn, piece, state.rolled)} className={cn("nest-piece", PLAYER_COLOURS[player], state.turn === player && legal.includes(piece) && "race-piece-legal", state.turn === 0 && suggested === piece && "race-piece-hint")}>{piece + 1}</button>
                  ) : <span key={piece} className="nest-piece nest-piece-muted">{piece + 1}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex min-h-7 items-center gap-2 text-sm text-muted-foreground" aria-live="polite">
            <Sparkles className="size-4 text-turmeric" /> {message || (state.turn === 0 ? "Your move: roll the cowries." : "The computer is considering its route.")}
          </div>
        </div>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 font-semibold"><Lightbulb className={cn("size-4", accent.text)} /> Strategy hint</div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{difficulty === "hard" ? "Hints are off on Hard. Read the safe squares and plan the route yourself." : suggested >= 0 && state.turn === 0 && state.rolled ? `Pawn ${suggested + 1} is a strong move for this roll.` : "Roll to reveal a legal move."}</p>
            {difficulty !== "hard" && <button type="button" onClick={() => setHint((value) => !value)} className="mt-3 text-xs font-bold uppercase tracking-widest text-primary">{hint ? "Hide hint" : "Show hint"}</button>}
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Quick rules</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Six opens a pawn from the nest.</li>
              <li>• Captures and sixes grant a bonus turn.</li>
              <li>• All four pawns must reach home.</li>
            </ul>
          </div>
          <button type="button" onClick={() => restart()} className="flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold hover:border-primary"><RotateCcw className="size-4" /> Restart round</button>
        </aside>
      </div>
      {finished && <GameComplete {...finished} definition={definition} accent={accent} onRestart={() => restart()} />}
    </section>
  )
}

function DiceBadge({ value, rolling, onClick, disabled }: { value: number; rolling: boolean; onClick: () => void; disabled: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cn("dice-button", rolling && "dice-button-rolling", disabled && "cursor-not-allowed opacity-60")}>
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">{rolling ? "Rolling" : "Cowries"}</span>
      <span className="font-serif text-3xl font-semibold">{value || "·"}</span>
      <span className="text-[10px] font-semibold text-primary">{disabled ? "Waiting" : "Roll now"}</span>
    </button>
  )
}

function VamanaGame({
  definition,
  accent,
  difficulty,
  mode,
  roundKey,
  session,
  setSession,
  completeGame,
  finished,
  restart,
}: GameSharedProps) {
  const [state, setState] = useState<VamanaState>(createVamanaState)
  const [message, setMessage] = useState("Choose a pit on your side to sow.")
  const [hint, setHint] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const legal = state.pits.flatMap((seeds, index) => (seeds > 0 && sideOfPit(index) === state.turn ? [index] : []))
  const suggested = hint && difficulty !== "hard" ? chooseVamanaMove(state, 0, difficulty) : -1

  useEffect(() => {
    setState(createVamanaState())
    setMessage("Choose a pit on your side to sow.")
    setHint(true)
  }, [difficulty, mode, roundKey])

  useEffect(() => {
    if (finished || mode !== "computer" || state.turn !== 1) return
    timerRef.current = setTimeout(() => {
      const pit = chooseVamanaMove(state, 1, difficulty)
      playPit(1, pit)
    }, 900)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
    // The computer makes one deterministic choice for each board state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.turn, state.pits, finished, mode])

  function playPit(player: 0 | 1, pit: number) {
    if (pit < 0 || !legal.includes(pit)) {
      setSession((current) => ({ ...current, invalidMoves: current.invalidMoves + 1, totalMoves: current.totalMoves + 1 }))
      setMessage("Choose a non-empty pit on your own side.")
      return
    }
    const result = applyVamanaMove(state, pit, player)
    const captured: [number, number] = [...state.captured]
    captured[player] += result.captured
    const sideSeeds = (side: 0 | 1) => result.pits.filter((_, index) => sideOfPit(index) === side).reduce((sum, value) => sum + value, 0)
    const gameOver = sideSeeds(0) === 0 || sideSeeds(1) === 0
    const nextSession = {
      ...session,
      totalMoves: session.totalMoves + 1,
      validMoves: session.validMoves + 1,
      score: session.score + result.captured * 20 + 5,
    }
    if (gameOver) {
      const totals: [number, number] = [captured[0] + sideSeeds(0), captured[1] + sideSeeds(1)]
      const winner = totals[0] === totals[1] ? "player" : totals[0] > totals[1] ? "player" : mode === "computer" ? "computer" : "player-2"
      setSession(nextSession)
      completeGame(winner, nextSession, { seedsCaptured: captured[player], finalSeeds: totals[player], turns: nextSession.validMoves })
      return
    }
    setSession(nextSession)
    setState({ pits: result.pits, captured, turn: player === 0 ? 1 : 0 })
    setMessage(result.captured ? `${player === 0 ? "You" : "Computer"} captured ${result.captured} seeds.` : "Sown. Count the new board and plan the next pit.")
  }

  return (
    <section className="game-panel">
      <GameStatus turn={state.turn} mode={mode} accent={accent} session={session} extra={<div className="rounded-2xl border border-border bg-background px-4 py-3"><p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Captured</p><p className="mt-1 font-serif text-xl font-semibold">{state.captured[0]} : {state.captured[1]}</p></div>} />
      <div className="mt-5 grid gap-6 xl:grid-cols-[1fr_250px]">
        <div className="game-board-shell">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Four seeds per pit</p><p className="mt-1 text-sm text-muted-foreground">Your row is highlighted in red · relay sowing variant</p></div>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">14 pits</span>
          </div>
          <div className="mancala-board">
            <div className="mancala-player-label mancala-player-top">{mode === "computer" ? "Computer" : "Player 2"} · captured {state.captured[1]}</div>
            <div className="mancala-row">
              {state.pits.slice(7).map((seeds, index) => <Pit key={index + 7} index={index + 7} seeds={seeds} legal={state.turn === 1 && legal.includes(index + 7)} hint={false} onClick={() => playPit(state.turn, index + 7)} />)}
            </div>
            <div className="mancala-centre"><span>Vamana<br />Guntalu</span><small>count · sow · capture</small></div>
            <div className="mancala-row">
              {state.pits.slice(0, 7).map((seeds, index) => <Pit key={index} index={index} seeds={seeds} legal={state.turn === 0 && legal.includes(index)} hint={suggested === index} onClick={() => playPit(state.turn, index)} />)}
            </div>
            <div className="mancala-player-label mancala-player-bottom">You · captured {state.captured[0]}</div>
          </div>
          <div className="mt-4 flex min-h-7 items-center gap-2 text-sm text-muted-foreground" aria-live="polite"><Sparkles className="size-4 text-turmeric" /> {finished ? "Round complete." : message}</div>
        </div>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 font-semibold"><Lightbulb className={cn("size-4", accent.text)} /> Count the relay</div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{difficulty === "hard" ? "Hard mode keeps the board honest: no hint. Look for an empty landing pit on your row." : suggested >= 0 ? `Pit ${suggested + 1} is a strong ${difficulty === "easy" ? "starter" : "capture"} candidate.` : "Choose one of your highlighted pits."}</p>
            {difficulty !== "hard" && <button type="button" onClick={() => setHint((value) => !value)} className="mt-3 text-xs font-bold uppercase tracking-widest text-primary">{hint ? "Hide hint" : "Show hint"}</button>}
          </div>
          <div className="rounded-2xl border border-border bg-card p-4"><p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Quick rules</p><ul className="mt-3 space-y-2 text-sm text-muted-foreground"><li>• Relay sowing continues from a non-empty landing pit.</li><li>• An empty landing pit on your row captures opposite seeds.</li><li>• Most seeds at the end wins.</li></ul></div>
          <button type="button" onClick={() => restart()} className="flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold hover:border-primary"><RotateCcw className="size-4" /> Restart round</button>
        </aside>
      </div>
      {finished && <GameComplete {...finished} definition={definition} accent={accent} onRestart={() => restart()} />}
    </section>
  )
}

function Pit({ index, seeds, legal, hint, onClick }: { index: number; seeds: number; legal: boolean; hint: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={cn("mancala-pit", legal && "mancala-pit-legal", hint && "mancala-pit-hint")} aria-label={`Pit ${index + 1}, ${seeds} seeds`}>{Array.from({ length: Math.min(seeds, 12) }, (_, seed) => <span key={seed} className="seed-dot" />)}<strong>{seeds}</strong><small>Pit {index + 1}</small></button>
}

function ParamapadaGame({
  definition,
  accent,
  difficulty,
  mode,
  roundKey,
  session,
  setSession,
  completeGame,
  finished,
  restart,
}: GameSharedProps) {
  const [state, setState] = useState<ParamapadaState>(createParamapadaState)
  const [rolling, setRolling] = useState(false)
  const [message, setMessage] = useState("Roll the die and begin the ascent.")
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const ladders = BASE_LADDERS
  const snakes = difficulty === "hard" ? EXPERT_SNAKES : BASE_SNAKES
  const hintSquare = difficulty === "easy" && state.positions[0] > 0 ? Object.keys(ladders).map(Number).find((start) => start > state.positions[0]) : undefined

  useEffect(() => {
    setState(createParamapadaState())
    setMessage("Roll the die and begin the ascent.")
    setRolling(false)
  }, [difficulty, mode, roundKey])

  useEffect(() => {
    if (finished || mode !== "computer" || state.turn !== 1 || state.rolled) return
    setRolling(true)
    timerRef.current = setTimeout(() => {
      setState((current) => ({ ...current, rolled: randomDie() }))
      setRolling(false)
    }, 750)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [finished, mode, state.turn, state.rolled])

  useEffect(() => {
    if (finished || !state.rolled) return
    setRolling(true)
    timerRef.current = setTimeout(() => {
      advance(state.turn, state.rolled)
      setRolling(false)
    }, state.turn === 1 ? 700 : 450)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
    // A displayed roll is resolved exactly once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.rolled, state.turn, finished])

  function roll() {
    if (finished || rolling || state.turn !== 0 || state.rolled) return
    setRolling(true)
    window.setTimeout(() => {
      setState((current) => ({ ...current, rolled: randomDie() }))
      setRolling(false)
    }, 550)
  }

  function advance(player: 0 | 1, rollValue: number) {
    const current = state.positions[player]
    const canFinish = current + rollValue <= 100
    const overflow = current + rollValue > 100
    let next = canFinish ? current + rollValue : current
    let event = overflow ? "An exact roll is needed to reach square 100." : ""
    if (next && ladders[next]) {
      event = `Virtue found: climb from ${next} to ${ladders[next]}.`
      next = ladders[next]
    } else if (next && snakes[next]) {
      event = `A vice sends you down from ${next} to ${snakes[next]}.`
      next = snakes[next]
    }
    const positions: [number, number] = [...state.positions]
    positions[player] = next
    const nextSession = { ...session, totalMoves: session.totalMoves + 1, validMoves: session.validMoves + 1, score: session.score + (next === 100 ? 300 : 10) + (ladders[current + rollValue] ? 45 : 0) }
    if (next === 100) {
      setSession(nextSession)
      completeGame(player === 0 ? "player" : mode === "computer" ? "computer" : "player-2", nextSession, { laddersClimbed: Object.keys(ladders).filter((start) => current < Number(start) && Number(start) <= current + rollValue).length, snakesHit: event.startsWith("A vice") ? 1 : 0, finalSquare: next })
      return
    }
    setSession(nextSession)
    setState({ positions, turn: player === 0 ? 1 : 0, rolled: 0 })
    setMessage(`${player === 0 ? "You" : mode === "computer" ? "Computer" : "Player 2"} rolled ${rollValue}. ${event || "The climb continues."}`)
  }

  return (
    <section className="game-panel">
      <GameStatus turn={state.turn} mode={mode} accent={accent} session={session} extra={<DiceBadge value={state.rolled} rolling={rolling} onClick={roll} disabled={state.turn !== 0 || !!state.rolled || rolling || !!finished} />} />
      <div className="mt-5 grid gap-6 xl:grid-cols-[1fr_250px]">
        <div className="game-board-shell">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Virtues rise · vices fall</p><p className="mt-1 text-sm text-muted-foreground">First to the 100th square wins</p></div><span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">{difficulty === "hard" ? "Expert snakes" : "Classic board"}</span></div>
          <div className="paramapada-board">
            {Array.from({ length: 100 }, (_, index) => {
              const square = 100 - index
              const isLadder = !!ladders[square]
              const isSnake = !!snakes[square]
              const tokenHere = state.positions.flatMap((position, player) => position === square ? [player] : [])
              return <div key={square} className={cn("paramapada-cell", (square + Math.floor((square - 1) / 10)) % 2 ? "paramapada-cell-light" : "paramapada-cell-dark", isLadder && "paramapada-ladder", isSnake && "paramapada-snake", hintSquare === square && "paramapada-hint")}>
                <span>{square}</span>
                {isLadder && <span className="paramapada-mark">↗</span>}
                {isSnake && <span className="paramapada-mark">↘</span>}
                {tokenHere.map((player) => <span key={player} className={cn("paramapada-token", PLAYER_COLOURS[player])}>{player + 1}</span>)}
              </div>
            })}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[0, 1].map((player) => <div key={player} className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3"><span className="flex items-center gap-2 text-sm font-semibold"><span className={cn("size-3 rounded-full", PLAYER_COLOURS[player])} />{player === 0 ? "You" : mode === "computer" ? "Computer" : "Player 2"}</span><span className="font-serif text-2xl font-semibold">{state.positions[player]}<small className="ml-1 text-xs font-sans text-muted-foreground">/100</small></span></div>)}
          </div>
          <div className="mt-4 flex min-h-7 items-center gap-2 text-sm text-muted-foreground" aria-live="polite"><Sparkles className="size-4 text-turmeric" /> {finished ? "Round complete." : message}</div>
        </div>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-4"><div className="flex items-center gap-2 font-semibold"><Lightbulb className={cn("size-4", accent.text)} /> {difficulty === "easy" ? "Practice guide" : "Board reading"}</div><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{difficulty === "easy" ? "The next ladder is softly highlighted so first-time players can learn the path." : difficulty === "hard" ? "Two extra snakes are active. No preview is shown on Hard." : "Ladders are virtues and snakes are vices. An exact roll is needed for square 100."}</p></div>
          <div className="rounded-2xl border border-border bg-card p-4"><p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Quick rules</p><ul className="mt-3 space-y-2 text-sm text-muted-foreground"><li>• Land on a ladder's foot to climb.</li><li>• Land on a snake's head to slide.</li><li>• A six does not grant another turn.</li></ul></div>
          <button type="button" onClick={() => restart()} className="flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold hover:border-primary"><RotateCcw className="size-4" /> Restart round</button>
        </aside>
      </div>
      {finished && <GameComplete {...finished} definition={definition} accent={accent} onRestart={() => restart()} />}
    </section>
  )
}

function Instructions({ definition, difficulty, accent }: { definition: GameDefinition; difficulty: Difficulty; accent: (typeof accentClasses)[Accent] }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 md:p-6">
      <div className="flex items-start gap-3"><span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl text-parchment", accent.solid)}><CircleHelp className="size-5" /></span><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">How to play</p><h2 className="mt-1 font-serif text-2xl font-semibold">{definition.variant}</h2></div></div>
      <ol className="mt-6 grid gap-4 md:grid-cols-3">{definition.howToPlay.map((step, index) => <li key={step} className="flex gap-3"><span className={cn("flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-parchment", accent.solid)}>{index + 1}</span><p className="text-sm leading-relaxed text-muted-foreground">{step}</p></li>)}</ol>
      <div className={cn("mt-6 rounded-2xl p-4", accent.soft)}><p className={cn("text-xs font-bold uppercase tracking-[0.16em]", accent.text)}>{difficulty} rule variant</p><p className="mt-1 text-sm leading-relaxed">{definition.difficultyRules[difficulty]}</p></div>
    </div>
  )
}

function HistoryPanel({ game, history, accent }: { game: GameSlug; history: GameResult[]; accent: (typeof accentClasses)[Accent] }) {
  const best = getPersonalBest(game)
  return <aside className="rounded-3xl border border-border bg-card p-5 md:p-6"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><History className={cn("size-5", accent.text)} /><h2 className="font-serif text-2xl font-semibold">Personal best</h2></div><span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold">{history.length} attempts</span></div><div className="mt-5 grid grid-cols-2 gap-3"><SmallBest label="Best score" value={best.bestScore} /><SmallBest label="Best accuracy" value={`${best.bestAccuracy}%`} /><SmallBest label="Fastest win" value={best.fastestTime ? formatDuration(best.fastestTime) : "—"} /><SmallBest label="Wins" value={`${best.wins}/${best.attempts}`} /></div><div className="mt-5 border-t border-border pt-4"><p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Recent rounds</p>{history.length ? <ul className="mt-3 space-y-3">{history.slice(0, 4).map((result) => <li key={result.id} className="flex items-center justify-between gap-3 text-sm"><span><span className="block font-semibold">{result.winner === "player" ? "Victory" : "Round played"}</span><span className="text-xs text-muted-foreground">{result.difficulty} · {formatDuration(result.duration)}</span></span><span className="font-serif text-lg font-semibold">{result.score}</span></li>)}</ul> : <p className="mt-3 text-sm text-muted-foreground">Complete a round and your best will appear here.</p>}</div></aside>
}

function SmallBest({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-2xl bg-muted/60 p-3"><p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-1 font-serif text-xl font-semibold">{statLabel(value)}</p></div>
}

function GameComplete({ result, allResults, definition, accent, onRestart }: Finished & { definition: GameDefinition; accent: (typeof accentClasses)[Accent]; onRestart: () => void }) {
  const wins = allResults.filter((item) => item.winner === "player").length
  return <div className="mt-7 overflow-hidden rounded-3xl border border-turmeric/50 bg-gradient-to-br from-kumkum/10 via-card to-turmeric/15 p-5 md:p-7"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className={cn("flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]", accent.text)}><Trophy className="size-4" /> GAME COMPLETE 🎉</p><h2 className="mt-2 font-serif text-3xl font-semibold">{result.winner === "player" ? "A fine victory." : "The board has spoken."}</h2><p className="mt-2 text-sm text-muted-foreground">{result.winner === "player" ? "Your result is saved to your heritage passport." : "Play again to sharpen your route and reclaim the board."}</p></div><button type="button" onClick={onRestart} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-kumkum"><RotateCcw className="size-4" /> Play again</button></div><div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5"><ResultMetric label="Score" value={result.score} /><ResultMetric label="Accuracy" value={`${result.accuracy}%`} /><ResultMetric label="Time" value={formatDuration(result.duration)} /><ResultMetric label="Moves" value={result.totalMoves} /><ResultMetric label="Result" value={result.winner === "player" ? "Won" : "Played"} /></div><div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-background/70 p-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Andhra Pradesh Heritage Progress</p><p className="mt-1 font-serif text-xl font-semibold">{new Set(allResults.filter((item) => item.winner === "player").map((item) => item.game)).size}/5 games completed</p></div><p className="text-sm text-muted-foreground">{wins} total {wins === 1 ? "win" : "wins"} · {allResults.length} saved attempts</p></div></div>
}

function ResultMetric({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-2xl border border-border bg-background/70 p-3"><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</p><p className="mt-1 font-serif text-xl font-semibold">{statLabel(value)}</p></div>
}
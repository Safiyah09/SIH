import type { Difficulty, GameSlug } from "@/lib/game-data"

export type GameResult = {
  id: string
  playerId: string
  game: GameSlug
  difficulty: Difficulty
  score: number
  accuracy: number
  duration: number
  totalMoves: number
  validMoves: number
  invalidMoves: number
  gameStats: Record<string, string | number>
  winner: "player" | "computer" | "player-2"
  startedAt: string
  completedAt: string
}

const STORAGE_KEY = "andhra-heritage-game-results"

export function readGameResults(): GameResult[] {
  if (typeof window === "undefined") return []
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]")
    return Array.isArray(parsed) ? (parsed as GameResult[]) : []
  } catch {
    return []
  }
}

export function saveGameResult(result: GameResult) {
  if (typeof window === "undefined") return
  const next = [result, ...readGameResults()].slice(0, 100)
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export function getGameResults(game?: GameSlug) {
  const results = readGameResults()
  return game ? results.filter((result) => result.game === game) : results
}

export function getPersonalBest(game: GameSlug) {
  const results = getGameResults(game)
  const wins = results.filter((result) => result.winner === "player")
  return {
    attempts: results.length,
    wins: wins.length,
    bestScore: results.length ? Math.max(...results.map((result) => result.score)) : 0,
    bestAccuracy: results.length ? Math.max(...results.map((result) => result.accuracy)) : 0,
    fastestTime: wins.length ? Math.min(...wins.map((result) => result.duration)) : 0,
  }
}

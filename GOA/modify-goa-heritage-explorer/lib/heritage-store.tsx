'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { categories, totalItems } from './heritage-data'
import { useLanguage } from './i18n'

const STORAGE_KEY = 'goa-heritage-progress'

type Persisted = {
  /** "categorySlug/itemSlug" -> first discovered timestamp */
  discovered: Record<string, number>
  /** "categorySlug/itemSlug" -> bookmarked timestamp */
  bookmarks: Record<string, number>
  /** feature flags, e.g. konkani -> timestamp */
  flags: Record<string, number>
  /** best quiz score */
  quizBest: number
}

const EMPTY: Persisted = { discovered: {}, bookmarks: {}, flags: {}, quizBest: 0 }

export type HeritageStats = {
  total: number
  byCategory: Record<string, number>
  categoriesExplored: number
  mapPlaces: number
  konkani: boolean
  quizBest: number
  progress: number
}

type HeritageContextValue = {
  ready: boolean
  discovered: Record<string, number>
  bookmarks: Record<string, number>
  quizBest: number
  keyOf: (categorySlug: string, itemSlug: string) => string
  isDiscovered: (categorySlug: string, itemSlug: string) => boolean
  discover: (categorySlug: string, itemSlug: string) => boolean
  isBookmarked: (categorySlug: string, itemSlug: string) => boolean
  toggleBookmark: (categorySlug: string, itemSlug: string) => void
  recordQuiz: (score: number) => void
  reset: () => void
  stats: HeritageStats
}

const HeritageContext = createContext<HeritageContextValue | null>(null)

const keyOf = (categorySlug: string, itemSlug: string) => `${categorySlug}/${itemSlug}`

function load(): Persisted {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<Persisted>
    return {
      discovered: parsed.discovered ?? {},
      bookmarks: parsed.bookmarks ?? {},
      flags: parsed.flags ?? {},
      quizBest: parsed.quizBest ?? 0,
    }
  } catch {
    return EMPTY
  }
}

export function HeritageProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage()
  const [state, setState] = useState<Persisted>(EMPTY)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setState(load())
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage may be unavailable (private mode); ignore */
    }
  }, [state, ready])

  // Unlock the Konkani explorer badge the moment the site is used in Konkani.
  useEffect(() => {
    if (!ready || lang !== 'kok' || state.flags.konkani) return
    setState((s) => ({ ...s, flags: { ...s.flags, konkani: Date.now() } }))
  }, [ready, lang, state.flags.konkani])

  const discover = useCallback((categorySlug: string, itemSlug: string) => {
    const key = keyOf(categorySlug, itemSlug)
    let firstTime = false
    setState((s) => {
      if (s.discovered[key]) return s
      firstTime = true
      return { ...s, discovered: { ...s.discovered, [key]: Date.now() } }
    })
    return firstTime
  }, [])

  const toggleBookmark = useCallback((categorySlug: string, itemSlug: string) => {
    const key = keyOf(categorySlug, itemSlug)
    setState((s) => {
      const next = { ...s.bookmarks }
      if (next[key]) delete next[key]
      else next[key] = Date.now()
      return { ...s, bookmarks: next }
    })
  }, [])

  const recordQuiz = useCallback((score: number) => {
    setState((s) => (score > s.quizBest ? { ...s, quizBest: score } : s))
  }, [])

  const reset = useCallback(() => setState(EMPTY), [])

  const stats = useMemo<HeritageStats>(() => {
    const byCategory: Record<string, number> = {}
    for (const c of categories) byCategory[c.slug] = 0
    for (const key of Object.keys(state.discovered)) {
      const slug = key.split('/')[0]
      if (slug in byCategory) byCategory[slug] += 1
    }
    const total = Object.keys(state.discovered).length
    const categoriesExplored = Object.values(byCategory).filter((n) => n > 0).length
    return {
      total,
      byCategory,
      categoriesExplored,
      mapPlaces: byCategory['monument'] ?? 0,
      konkani: Boolean(state.flags.konkani),
      quizBest: state.quizBest,
      progress: totalItems ? Math.round((total / totalItems) * 100) : 0,
    }
  }, [state])

  const value = useMemo<HeritageContextValue>(
    () => ({
      ready,
      discovered: state.discovered,
      bookmarks: state.bookmarks,
      quizBest: state.quizBest,
      keyOf,
      isDiscovered: (c, i) => Boolean(state.discovered[keyOf(c, i)]),
      discover,
      isBookmarked: (c, i) => Boolean(state.bookmarks[keyOf(c, i)]),
      toggleBookmark,
      recordQuiz,
      reset,
      stats,
    }),
    [ready, state, discover, toggleBookmark, recordQuiz, reset, stats],
  )

  return <HeritageContext.Provider value={value}>{children}</HeritageContext.Provider>
}

export function useHeritage() {
  const ctx = useContext(HeritageContext)
  if (!ctx) throw new Error('useHeritage must be used within HeritageProvider')
  return ctx
}

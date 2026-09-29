'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, Brain, Target, Trophy, XCircle, Zap } from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'
import { getTopic } from '@/lib/topics'
import { gamesCategory } from '@/lib/heritage'
import {
  calculateQuizScore,
  calculateQuizXp,
  formatQuizTime,
  getQuizQuestions,
  getQuizText,
  type QuizDifficulty,
  type QuizQuestion,
} from '@/lib/quiz-data'
import { quizUi, type QuizUiKey } from '@/lib/quiz-ui'

type QuizPhase = 'setup' | 'playing' | 'result'
type QuizResult = {
  category: string
  subcategory?: string
  difficulty: QuizDifficulty
  score: number
  accuracy: number
  durationSeconds: number
  correctAnswers: number
  totalQuestions: number
  xp: number
  completedAt: string
  personalBest: boolean
}

type StoredQuizResult = Omit<QuizResult, 'personalBest'>

function getPlayerId() {
  const key = 'karunadu-player-id'
  const existing = window.localStorage.getItem(key)
  if (existing) return existing
  const created = `guest-${crypto.randomUUID()}`
  window.localStorage.setItem(key, created)
  return created
}

function readHistory(): StoredQuizResult[] {
  try {
    const parsed = JSON.parse(window.localStorage.getItem('karunadu-quiz-history') ?? '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveHistory(result: StoredQuizResult) {
  const next = [result, ...readHistory()].slice(0, 100)
  window.localStorage.setItem('karunadu-quiz-history', JSON.stringify(next))
  window.dispatchEvent(new Event('quiz-result-saved'))
}

export function QuizPlayer({ category, subcategory }: { category: string; subcategory?: string }) {
  const { lang, t } = useLanguage()
  const categoryTitle = category === gamesCategory.slug ? gamesCategory.title : getTopic(category)?.title
  const backHref = subcategory ? `/explore/${category}/${subcategory}` : `/explore/${category}`
  const setupQuestions = useMemo(() => getQuizQuestions(category, subcategory, 'easy'), [category, subcategory])
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('easy')
  const [phase, setPhase] = useState<QuizPhase>('setup')
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [seconds, setSeconds] = useState(0)
  const [result, setResult] = useState<QuizResult | null>(null)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle')

  const ui = (key: QuizUiKey) => getQuizText(quizUi[key], lang)
  const question = questions[current]
  const setupCategoryName = categoryTitle ? t(categoryTitle) : category
  const setupCount = setupQuestions.length || 5

  useEffect(() => {
    if (phase !== 'playing' || startedAt === null) return
    const timer = window.setInterval(() => {
      setSeconds(Math.floor((Date.now() - startedAt) / 1000))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [phase, startedAt])

  const finish = (nextAnswers: number[]) => {
    const durationSeconds = startedAt === null ? seconds : Math.max(1, Math.floor((Date.now() - startedAt) / 1000))
    const correctAnswers = nextAnswers.reduce(
      (total, answer, index) => total + (answer === questions[index]?.correctIndex ? 1 : 0),
      0,
    )
    const totalQuestions = questions.length
    const accuracy = totalQuestions ? Math.round((correctAnswers / totalQuestions) * 100) : 0
    const score = calculateQuizScore(correctAnswers, totalQuestions, difficulty, durationSeconds)
    const xp = calculateQuizXp(correctAnswers, difficulty)
    const completedAt = new Date().toISOString()
    const previousBest = readHistory()
      .filter((item) => item.category === category && item.subcategory === subcategory && item.difficulty === difficulty)
      .reduce((best, item) => Math.max(best, item.score), 0)
    const nextResult: QuizResult = {
      category,
      subcategory,
      difficulty,
      score,
      accuracy,
      durationSeconds,
      correctAnswers,
      totalQuestions,
      xp,
      completedAt,
      personalBest: score >= previousBest,
    }
    const storedResult: StoredQuizResult = { ...nextResult }
    delete (storedResult as Partial<QuizResult>).personalBest
    saveHistory(storedResult)
    setResult(nextResult)
    setPhase('result')
    setSaveState('saving')

    void fetch('/api/quiz-results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerId: getPlayerId(),
        category,
        subcategory: subcategory ?? null,
        difficulty,
        score,
        accuracy,
        durationSeconds,
        correctAnswers,
        totalQuestions,
        xp,
        completedAt,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Quiz result save failed: ${response.status}`)
        setSaveState('saved')
      })
      .catch(() => setSaveState('failed'))
  }

  const start = () => {
    setQuestions(getQuizQuestions(category, subcategory, difficulty))
    setCurrent(0)
    setAnswers([])
    setSelected(null)
    setSeconds(0)
    setResult(null)
    setSaveState('idle')
    setStartedAt(Date.now())
    setPhase('playing')
  }

  const answer = (index: number) => {
    if (selected !== null) return
    setSelected(index)
  }

  const advance = () => {
    if (selected === null || !question) return
    const nextAnswers = [...answers, selected]
    if (current === questions.length - 1) {
      finish(nextAnswers)
      return
    }
    setAnswers(nextAnswers)
    setSelected(null)
    setCurrent((value) => value + 1)
  }

  const playAgain = () => {
    setPhase('setup')
    setSelected(null)
    setResult(null)
    setSaveState('idle')
  }

  if (phase === 'setup') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 md:px-8 md:py-16">
        <Link href={backHref} className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-secondary">
          <ArrowLeft className="size-4" aria-hidden="true" />
          {ui('backToCategory')}
        </Link>
        <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="bg-foreground px-6 py-10 text-background sm:px-10">
            <div className="flex items-center gap-3 text-primary">
              <Brain className="size-7" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.3em]">{ui('quiz')}</p>
            </div>
            <h1 className="mt-4 font-serif text-4xl font-bold sm:text-5xl">{setupCategoryName}</h1>
            {subcategory && <p className="mt-2 text-background/70">{subcategory.replaceAll('-', ' ')}</p>}
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-background/75">
              {setupCount} manually verified questions with instant explanations. Choose a level, then test what you know.
            </p>
          </div>
          <div className="p-6 sm:p-10">
            <p className="text-sm font-semibold text-foreground">{ui('chooseDifficulty')}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {(['easy', 'medium', 'hard'] as QuizDifficulty[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficulty(level)}
                  className={`rounded-2xl border-2 p-4 text-left transition ${difficulty === level ? 'border-secondary bg-secondary/10' : 'border-border bg-background hover:border-accent'}`}
                >
                  <span className="block font-serif text-lg font-bold">{ui(level)}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {level === 'easy' ? '100 points per correct answer' : level === 'medium' ? '125 points per correct answer' : '150 points per correct answer'}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{ui('listenHint')}</p>
            <button type="button" onClick={start} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-serif font-bold text-primary-foreground transition hover:bg-secondary">
              {ui('begin')}
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'result' && result) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 md:px-8 md:py-16">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
          <div className="bg-foreground px-6 py-12 text-center text-background sm:px-12">
            <Trophy className="mx-auto size-10 text-primary" aria-hidden="true" />
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-primary">{ui('result')}</p>
            <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
              {result.accuracy >= 80 ? ui('excellent') : ui('keepLearning')}
            </h1>
            <p className="mt-3 text-background/70">{setupCategoryName} · {ui(result.difficulty)}</p>
          </div>
          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: ui('score'), value: result.score, icon: Trophy },
                { label: ui('accuracy'), value: `${result.accuracy}%`, icon: Target },
                { label: ui('timer'), value: formatQuizTime(result.durationSeconds), icon: Clock3 },
                { label: ui('xpEarned'), value: result.xp, icon: Zap },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-2xl border border-border bg-background p-4 text-center">
                  <Icon className="mx-auto size-5 text-accent" aria-hidden="true" />
                  <p className="mt-3 font-mono text-xl font-bold text-secondary">{value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-accent/25 bg-muted/55 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-serif font-bold">{ui('correctAnswers')}</span>
                <span className="font-mono text-secondary">{result.correctAnswers}/{result.totalQuestions}</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-background">
                <div className="h-full rounded-full bg-primary" style={{ width: `${result.accuracy}%` }} />
              </div>
              {result.personalBest && <p className="mt-3 text-sm font-semibold text-accent">{ui('personalBest')}</p>}
              <p className="mt-2 text-xs text-muted-foreground" role="status">
                {saveState === 'saving' ? ui('saving') : saveState === 'saved' ? ui('saved') : saveState === 'failed' ? ui('saveFailed') : ''}
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={playAgain} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-serif font-bold text-primary-foreground">
                <ArrowRight className="size-4" aria-hidden="true" />
                {ui('playAgain')}
              </button>
              <Link href={backHref} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-accent px-5 py-3 font-serif font-bold">
                <ArrowLeft className="size-4" aria-hidden="true" />
                {ui('backToCategory')}
              </Link>
              <Link href="/games/passport" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-secondary px-5 py-3 font-serif font-bold text-secondary">
                <Trophy className="size-4" aria-hidden="true" />
                {ui('viewPassport')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const answeredCount = answers.length + (selected === null ? 0 : 1)
  const liveCorrect = answers.reduce((total, answerValue, index) => total + (answerValue === questions[index]?.correctIndex ? 1 : 0), 0) +
    (selected !== null && question && selected === question.correctIndex ? 1 : 0)
  const liveAccuracy = answeredCount ? Math.round((liveCorrect / answeredCount) * 100) : 0
  const isCorrect = selected !== null && selected === question.correctIndex

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-14">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href={backHref} className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-secondary">
          <ArrowLeft className="size-4" aria-hidden="true" />
          {ui('backToCategory')}
        </Link>
        <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
          <span>{ui('score')}: {calculateQuizScore(liveCorrect, questions.length, difficulty, seconds)}</span>
          <span className="inline-flex items-center gap-1"><Clock3 className="size-3.5 text-accent" /> {formatQuizTime(seconds)}</span>
          <span>{ui('accuracy')}: {liveAccuracy}%</span>
        </div>
      </div>
      <div className="mt-7 flex items-center justify-between gap-4">
        <p className="font-serif text-lg font-bold text-secondary">{ui('question')} {current + 1} / {questions.length}</p>
        <span className="text-xs font-semibold text-muted-foreground">{ui(difficulty)}</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted" aria-label={`${Math.round(((current + (selected !== null ? 1 : 0)) / questions.length) * 100)}% complete`}>
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((current + (selected !== null ? 1 : 0)) / questions.length) * 100}%` }} />
      </div>

      {question && (
        <section className="mt-7 rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-8">
          <p lang={lang} className="text-balance font-serif text-2xl font-bold leading-snug text-foreground sm:text-3xl">
            {getQuizText(question.prompt, lang)}
          </p>
          <div className="mt-7 grid gap-3">
            {question.options.map((optionText, index) => {
              const chosen = selected === index
              const correct = question.correctIndex === index
              const state = selected === null ? 'idle' : correct ? 'correct' : chosen ? 'incorrect' : 'idle'
              return (
                <button
                  key={`${question.id}-${index}`}
                  type="button"
                  disabled={selected !== null}
                  onClick={() => answer(index)}
                  className={`flex min-h-14 items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left text-sm font-semibold transition sm:text-base ${
                    state === 'correct' ? 'border-green-600 bg-green-50 text-green-900' :
                      state === 'incorrect' ? 'border-destructive bg-destructive/10 text-destructive' :
                        'border-border bg-background hover:border-accent hover:bg-muted'
                  }`}
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-current/25 font-mono text-xs">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span lang={lang}>{getQuizText(optionText, lang)}</span>
                  {state === 'correct' && <CheckCircle2 className="ml-auto size-5 shrink-0" aria-hidden="true" />}
                  {state === 'incorrect' && <XCircle className="ml-auto size-5 shrink-0" aria-hidden="true" />}
                </button>
              )
            })}
          </div>
          {selected === null ? (
            <p className="mt-5 text-sm text-muted-foreground">{ui('selectAnswer')}</p>
          ) : (
            <div className={`mt-6 rounded-2xl border p-4 ${isCorrect ? 'border-green-600/30 bg-green-50' : 'border-destructive/30 bg-destructive/10'}`}>
              <p className={`font-serif font-bold ${isCorrect ? 'text-green-800' : 'text-destructive'}`}>
                {isCorrect ? ui('correct') : ui('incorrect')}
              </p>
              <p lang={lang} className="mt-2 text-sm leading-relaxed text-foreground/80">{getQuizText(question.explanation, lang)}</p>
              <button type="button" onClick={advance} className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">
                {current === questions.length - 1 ? ui('seeResult') : ui('next')}
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { QuizPlayer } from '@/components/quiz-player'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { gamesCategory } from '@/lib/heritage'
import { getTopic } from '@/lib/topics'
import { quizCategories } from '@/lib/quiz-data'

export function generateStaticParams() {
  return quizCategories.map((category) => ({ category }))
}

export async function generateMetadata({ params }: PageProps<'/quiz/[category]'>): Promise<Metadata> {
  const { category } = await params
  const title = category === gamesCategory.slug ? gamesCategory.title.en : getTopic(category)?.title.en
  return title ? { title: `${title} quiz | Karunadu` } : {}
}

export default async function QuizCategoryPage({ params }: PageProps<'/quiz/[category]'>) {
  const { category } = await params
  if (!quizCategories.includes(category as (typeof quizCategories)[number])) notFound()

  return (
    <>
      <SiteHeader />
      <main><QuizPlayer category={category} /></main>
      <SiteFooter />
    </>
  )
}
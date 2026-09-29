import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { QuizPlayer } from '@/components/quiz-player'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { allSubcategoryParams, getSubcategory } from '@/lib/heritage'
import { quizCategories } from '@/lib/quiz-data'

export function generateStaticParams() {
  return allSubcategoryParams()
    .filter(({ slug }) => quizCategories.includes(slug as (typeof quizCategories)[number]))
    .map(({ slug, sub }) => ({ category: slug, sub }))
}

export async function generateMetadata({ params }: PageProps<'/quiz/[category]/[sub]'>): Promise<Metadata> {
  const { category, sub } = await params
  const subcategory = getSubcategory(category, sub)
  return subcategory ? { title: `${subcategory.name.en} quiz | Karunadu` } : {}
}

export default async function QuizSubcategoryPage({ params }: PageProps<'/quiz/[category]/[sub]'>) {
  const { category, sub } = await params
  if (!quizCategories.includes(category as (typeof quizCategories)[number]) || !getSubcategory(category, sub)) notFound()

  return (
    <>
      <SiteHeader />
      <main><QuizPlayer category={category} subcategory={sub} /></main>
      <SiteFooter />
    </>
  )
}
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { GameBoard } from "@/components/games/game-board"
import { gameDefinitions, getGameDefinition } from "@/lib/game-data"

type Props = { params: Promise<{ game: string }> }

export function generateStaticParams() {
  return gameDefinitions.map((game) => ({ game: game.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game: slug } = await params
  const game = getGameDefinition(slug)
  return game ? { title: game.name, description: game.description } : {}
}

export default async function GamePage({ params }: Props) {
  const { game: slug } = await params
  const game = getGameDefinition(slug)
  if (!game) notFound()
  return <GameBoard definition={game} />
}

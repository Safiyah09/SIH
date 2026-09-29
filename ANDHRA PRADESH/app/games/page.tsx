import type { Metadata } from "next"
import { GamesHub } from "@/components/games/games-hub"

export const metadata: Metadata = {
  title: "Traditional Games",
  description: "Play five traditional Andhra Pradesh board games.",
}

export default function GamesPage() {
  return <GamesHub />
}

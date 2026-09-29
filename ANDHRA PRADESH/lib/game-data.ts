export type GameSlug =
  | "vamana-guntalu"
  | "ashta-chamma"
  | "chowka-bara"
  | "pagade"
  | "paramapada-sopanam"

export type Difficulty = "easy" | "medium" | "hard"

export type GameDefinition = {
  slug: GameSlug
  name: string
  subtitle: string
  description: string
  image: string
  accent: "coastal" | "turmeric" | "kumkum" | "kondapalli" | "leaf"
  players: string
  variant: string
  howToPlay: string[]
  difficultyRules: Record<Difficulty, string>
}

export const gameDefinitions: GameDefinition[] = [
  {
    slug: "vamana-guntalu",
    name: "Vamana Guntalu",
    subtitle: "Count, sow, capture",
    description: "A relay-sowing pit-and-seed game that rewards careful counting and patient captures.",
    image: "/images/items/regional-board-games/vamana-guntalu.webp",
    accent: "coastal",
    players: "1–2 players",
    variant: "Andhra 14-pit variant · four seeds per pit · relay sowing",
    howToPlay: [
      "Choose one of your seven pits. All its seeds are picked up and sown one by one clockwise.",
      "If the last seed lands in an empty pit on your side, capture it and the opposite pit's seeds.",
      "The round ends when a side has no seeds. The player with more captured seeds wins.",
    ],
    difficultyRules: {
      easy: "Hints show the strongest immediate capture and the computer chooses the first safe move.",
      medium: "Normal hints; the computer prefers captures and then the move that leaves most seeds in play.",
      hard: "No automatic hints; the computer compares each legal move with the opponent's best reply.",
    },
  },
  {
    slug: "ashta-chamma",
    name: "Ashta Chamma",
    subtitle: "Race by cowrie shells",
    description: "Move four tokens around the 5×5 cross, protect safe squares and send rivals home.",
    image: "/images/items/regional-board-games/ashta-chamma.webp",
    accent: "turmeric",
    players: "1–2 players",
    variant: "5×5 cross track · four pawns · six-step cowrie roll",
    howToPlay: [
      "Roll the cowrie die, then choose one highlighted pawn. A six brings a pawn out of the nest.",
      "Land on an unprotected rival to send that pawn back to its nest.",
      "Reach the centre with all four pawns first. Star-marked squares are safe from capture.",
    ],
    difficultyRules: {
      easy: "Hints are shown; the computer advances its first legal pawn.",
      medium: "Hints remain available; the computer prioritises captures and finishing moves.",
      hard: "No automatic hints; the computer looks for finishes, captures and safe landings.",
    },
  },
  {
    slug: "chowka-bara",
    name: "Chowka Bara",
    subtitle: "Crossroads and cowries",
    description: "A four-piece cross-board race where safe chowkas and captures change the route home.",
    image: "/images/items/regional-board-games/chowka-bara.webp",
    accent: "kumkum",
    players: "1–2 players",
    variant: "28-space cross route · four pawns · exact centre finish",
    howToPlay: [
      "Roll and select a highlighted pawn. A six releases a pawn from the nest.",
      "A pawn that lands on an exposed opponent captures it; marked chowka spaces are protected.",
      "Move all four pawns to the centre before your opponent to win.",
    ],
    difficultyRules: {
      easy: "A hint points to an available move; the computer advances the first legal pawn.",
      medium: "The computer values progress and captures, with a normal hint.",
      hard: "No automatic hint; the computer favours finishes, captures and protected squares.",
    },
  },
  {
    slug: "pagade",
    name: "Pagade",
    subtitle: "Plan the long way home",
    description: "A longer Pachisi-style route where timing, safe squares and a well-placed capture matter.",
    image: "/images/items/regional-board-games/pagade.webp",
    accent: "kondapalli",
    players: "1–2 players",
    variant: "32-space cross track · four pawns · long-route race",
    howToPlay: [
      "Roll the cowrie die and choose a highlighted pawn. Six opens a pawn from the nest.",
      "Capture a rival by landing on its space, except on a marked safe square.",
      "The first player to bring all four pawns home wins the round.",
    ],
    difficultyRules: {
      easy: "Hints are on and the computer chooses the first legal move.",
      medium: "The computer balances progress with captures and safe squares.",
      hard: "No automatic hint; the computer plans for a finish, capture or safe landing.",
    },
  },
  {
    slug: "paramapada-sopanam",
    name: "Paramapada Sopanam",
    subtitle: "The ladder to salvation",
    description: "Climb virtues, avoid vices and be the first to reach the final square.",
    image: "/images/items/regional-board-games/paramapada-sopanam.webp",
    accent: "leaf",
    players: "1–2 players",
    variant: "100-square board · virtue ladders · vice snakes · exact finish",
    howToPlay: [
      "Roll the die and move your token forward. You must land exactly on square 100.",
      "Land at the foot of a ladder to climb; land on a snake's head to slide down.",
      "This version uses the traditional first-to-100 rule; a six does not grant an extra turn.",
    ],
    difficultyRules: {
      easy: "Practice board with fewer snakes, a preview of nearby ladders and no exact-roll penalty.",
      medium: "Standard 100-square board with exact finish and no automatic preview.",
      hard: "Expert board adds two vice snakes and keeps the exact-finish rule; no hints are shown.",
    },
  },
]

export function getGameDefinition(slug: string) {
  return gameDefinitions.find((game) => game.slug === slug)
}

import type { CategoryTone } from './heritage-data'

export const toneStyles: Record<CategoryTone, { solid: string; soft: string; ring: string }> = {
  terracotta: {
    solid: 'bg-terracotta text-cream',
    soft: 'bg-terracotta/10 text-terracotta',
    ring: 'hover:border-terracotta',
  },
  pink: {
    solid: 'bg-bougainvillea text-cream',
    soft: 'bg-bougainvillea/10 text-bougainvillea',
    ring: 'hover:border-bougainvillea',
  },
  gold: {
    solid: 'bg-gold text-laterite',
    soft: 'bg-gold/25 text-laterite',
    ring: 'hover:border-gold',
  },
  sea: {
    solid: 'bg-sea text-cream',
    soft: 'bg-sky/20 text-sea',
    ring: 'hover:border-sea',
  },
  sky: {
    solid: 'bg-sky text-laterite',
    soft: 'bg-sky/20 text-sea',
    ring: 'hover:border-sky',
  },
  green: {
    solid: 'bg-tropical text-cream',
    soft: 'bg-tropical/10 text-tropical',
    ring: 'hover:border-tropical',
  },
}

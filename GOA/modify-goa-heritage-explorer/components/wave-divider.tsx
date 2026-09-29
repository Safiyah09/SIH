import { cn } from '@/lib/utils'

export function WaveDivider({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn('block h-8 w-full md:h-12', flip && 'rotate-180', className)}
    >
      <path
        fill="currentColor"
        d="M0 30 C 180 60 360 0 540 30 S 900 60 1080 30 S 1260 0 1440 30 V60 H0 Z"
      />
    </svg>
  )
}

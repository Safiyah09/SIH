'use client'

import Image from 'next/image'
import { useRef } from 'react'

/**
 * Interactive hero image: a gentle cursor-driven 3D tilt with floating
 * coastal orbs and a cinematic clip-path reveal. Pointer tilt is skipped
 * on touch/coarse pointers, and the reveal respects prefers-reduced-motion.
 */
export function HeroVisual({ src, alt }: { src: string; alt: string }) {
  const tiltRef = useRef<HTMLDivElement>(null)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = tiltRef.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--rx', `${(-py * 6).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(px * 6).toFixed(2)}deg`)
    el.style.setProperty('--tx', `${(px * 10).toFixed(1)}px`)
    el.style.setProperty('--ty', `${(py * 10).toFixed(1)}px`)
  }

  function reset() {
    const el = tiltRef.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--tx', '0px')
    el.style.setProperty('--ty', '0px')
  }

  return (
    <div
      className="relative animate-in fade-in zoom-in-95 duration-1000"
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <div
        className="float-slow absolute -right-6 -top-6 size-32 rounded-full bg-bougainvillea/70 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="float absolute -bottom-8 -left-6 size-24 rounded-full bg-gold/50 blur-2xl"
        aria-hidden="true"
      />
      <div
        ref={tiltRef}
        className="relative aspect-[4/3] overflow-hidden rounded-t-[10rem] rounded-b-3xl border-8 border-cream shadow-2xl"
        style={{
          transform:
            'perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translate3d(var(--tx, 0), var(--ty, 0), 0)',
          transition: 'transform 0.3s ease-out',
        }}
      >
        <Image
          src={src || '/placeholder.svg'}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="hero-img object-cover"
        />
      </div>
    </div>
  )
}

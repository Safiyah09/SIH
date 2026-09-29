import Link from 'next/link'
import { ArrowDown } from 'lucide-react'
import { categories, totalItems } from '@/lib/heritage-data'
import { T } from '@/lib/i18n'
import { getServerT } from '@/lib/server-lang'
import { WaveDivider } from './wave-divider'
import { HeroVisual } from './hero-visual'

export async function Hero() {
  const { t } = await getServerT()
  return (
    <section className="relative overflow-hidden bg-sea text-cream">
      <div
        className="sea-anim pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 20%, color-mix(in srgb, #5bc0eb 45%, transparent), transparent 42%), radial-gradient(circle at 82% 0%, color-mix(in srgb, #f2b84b 30%, transparent), transparent 40%), radial-gradient(circle at 60% 100%, color-mix(in srgb, #d6537a 25%, transparent), transparent 45%)',
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-12 md:px-6 lg:grid-cols-2 lg:pb-24 lg:pt-16">
        <div>
          <p className="inline-flex animate-in fade-in slide-in-from-bottom-4 fill-mode-both rounded-full bg-gold px-3 py-1 text-sm font-bold text-laterite duration-700">
            <T k="heroEyebrow" />
          </p>
          <h1 className="mt-5 animate-in fade-in slide-in-from-bottom-4 fill-mode-both text-4xl font-bold leading-tight duration-700 [animation-delay:120ms] md:text-6xl">
            <T k="heroTitle" />
          </h1>
          <p className="mt-5 max-w-xl animate-in fade-in slide-in-from-bottom-4 fill-mode-both text-lg leading-relaxed text-cream/90 duration-700 [animation-delay:240ms]">
            <T k="heroText" />
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6 animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 [animation-delay:360ms]">
            <Link
              href="#categories"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-bold text-laterite shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-10px_rgba(242,184,75,0.9)] active:scale-95"
            >
              <T k="exploreCategories" />
              <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" />
            </Link>
            <dl className="flex gap-6">
              <div>
                <dt className="sr-only">
                  <T k="categories" />
                </dt>
                <dd className="font-serif text-3xl font-bold">{categories.length}</dd>
                <dd className="text-sm text-cream/85">
                  <T k="categories" />
                </dd>
              </div>
              <div>
                <dt className="sr-only">
                  <T k="heritageItems" />
                </dt>
                <dd className="font-serif text-3xl font-bold">{totalItems}</dd>
                <dd className="text-sm text-cream/85">
                  <T k="heritageItems" />
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <HeroVisual src="/images/hero-goa.png" alt={t('heroAlt')} />
      </div>
      <WaveDivider className="absolute inset-x-0 bottom-0 text-background" />
    </section>
  )
}

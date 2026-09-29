import Link from 'next/link'
import { T } from '@/lib/i18n'

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="font-serif text-7xl font-bold text-sea">404</p>
      <h1 className="mt-4 text-2xl font-bold text-laterite">
        <T k="notFound" />
      </h1>
      <Link href="/" className="mt-8 rounded-full bg-gold px-6 py-3 font-bold text-laterite">
        <T k="goHome" />
      </Link>
    </section>
  )
}

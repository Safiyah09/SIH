import Link from "next/link"

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-kumkum">Page not found</p>
      <h1 className="font-serif text-4xl font-semibold text-balance">This path is not on the heritage map</h1>
      <p className="text-muted-foreground">Head back to explore the heritage of Andhra Pradesh.</p>
      <Link
        href="/"
        className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-kumkum"
      >
        Back to home
      </Link>
    </section>
  )
}

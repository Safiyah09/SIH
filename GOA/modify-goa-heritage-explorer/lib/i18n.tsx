'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LANG_COOKIE, parseLang, translate, type DictKey, type Lang } from './dictionary'
import { localizeItem } from './heritage-data-kok'
import type { HeritageItem } from './heritage-data'

export type { DictKey, Lang }

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: DictKey, vars?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function persistLang(lang: Lang) {
  const secure = window.location.protocol === 'https:'
  // SameSite=None + Partitioned keeps the choice working when the site is embedded in an iframe.
  const attrs = secure ? '; SameSite=None; Secure; Partitioned' : '; SameSite=Lax'
  document.cookie = `${LANG_COOKIE}=${lang}; Path=/; Max-Age=31536000${attrs}`
  window.localStorage.setItem(LANG_COOKIE, lang)
}

export function LanguageProvider({ initialLang, children }: { initialLang: Lang; children: React.ReactNode }) {
  const router = useRouter()
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    const saved = window.localStorage.getItem(LANG_COOKIE)
    if (saved && parseLang(saved) !== initialLang) {
      const next = parseLang(saved)
      setLangState(next)
      persistLang(next)
      router.refresh()
    }
  }, [initialLang, router])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback(
    (next: Lang) => {
      setLangState(next)
      persistLang(next)
      // Brief cross-fade over the page content while server text re-renders.
      const root = document.body
      root.classList.remove('lang-swap')
      // force reflow so the animation restarts on repeated toggles
      void root.offsetWidth
      root.classList.add('lang-swap')
      window.setTimeout(() => root.classList.remove('lang-swap'), 550)
      router.refresh()
    },
    [router],
  )

  const t = useCallback(
    (key: DictKey, vars?: Record<string, string | number>) => translate(lang, key, vars),
    [lang],
  )

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export function T({ k }: { k: DictKey }) {
  const { t } = useLanguage()
  return <>{t(k)}</>
}

export function useLocalizedItem<I extends HeritageItem>(item: I): I {
  const { lang } = useLanguage()
  return localizeItem(item, lang)
}

export function ItemText({
  item,
  field,
}: {
  item: HeritageItem
  field: 'name' | 'summary' | 'description' | 'where'
}) {
  return <>{useLocalizedItem(item)[field]}</>
}

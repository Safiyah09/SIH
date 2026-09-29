import { cookies } from 'next/headers'
import { LANG_COOKIE, parseLang, translate, type DictKey, type Lang } from './dictionary'

export async function getServerLang(): Promise<Lang> {
  const store = await cookies()
  return parseLang(store.get(LANG_COOKIE)?.value)
}

export async function getServerT() {
  const lang = await getServerLang()
  return {
    lang,
    t: (key: DictKey, vars?: Record<string, string | number>) => translate(lang, key, vars),
  }
}

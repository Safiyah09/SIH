'use client'

import { useLanguage, type DictKey, type Lang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const options: { value: Lang; label: string; hint: DictKey; langAttr: string }[] = [
  { value: 'en', label: 'EN', hint: 'langEnglish', langAttr: 'en' },
  { value: 'kok', label: 'कोंकणी', hint: 'langKonkani', langAttr: 'kok' },
]

export function LanguageToggle() {
  const { lang, setLang, t } = useLanguage()

  return (
    <div role="group" aria-label={t('language')} className="flex rounded-full bg-cream/15 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={lang === o.value}
          aria-label={t(o.hint)}
          title={t(o.hint)}
          lang={o.langAttr}
          onClick={() => setLang(o.value)}
          className={cn(
            'rounded-full px-3 py-1 text-sm font-bold transition-colors',
            lang === o.value ? 'bg-gold text-laterite' : 'text-cream hover:bg-cream/15',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { TEXT_DEFAULTS } from './text-fields'

// Cache mémoire partagé entre composants (évite les fetchs multiples par page)
let cache: Record<string, string> | null = null

/**
 * Hook de lecture des textes éditables.
 * Retourne une fonction t(key) qui donne le texte personnalisé s'il existe,
 * sinon le texte par défaut. Les pages restent statiques : le défaut s'affiche
 * immédiatement, la personnalisation est appliquée au montage (mise en cache session).
 */
export function useSiteTexts(): (key: string) => string {
  const [texts, setTexts] = useState<Record<string, string>>(cache ?? {})

  useEffect(() => {
    if (cache) { setTexts(cache); return }
    try {
      const s = sessionStorage.getItem('rtTexts')
      if (s) { cache = JSON.parse(s); setTexts(cache!) }
    } catch {}
    fetch('/api/admin/content')
      .then(r => r.json())
      .then(d => {
        const t = (d?.content?.texts && typeof d.content.texts === 'object') ? d.content.texts : {}
        cache = t
        setTexts(t)
        try { sessionStorage.setItem('rtTexts', JSON.stringify(t)) } catch {}
      })
      .catch(() => {})
  }, [])

  return (key: string) => {
    const custom = texts[key]
    if (typeof custom === 'string' && custom.trim() !== '') return custom
    return TEXT_DEFAULTS[key] ?? ''
  }
}

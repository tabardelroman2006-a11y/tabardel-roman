'use client'

import { useEffect } from 'react'

const HEX = /^#[0-9a-fA-F]{6}$/

/**
 * Applique la couleur de marque personnalisée (si définie dans l'admin) en
 * surchargeant la variable CSS --rt-primary. Sinon, la valeur par défaut de
 * globals.css s'applique. Cache session pour éviter le clignotement.
 */
export function ThemeColors() {
  useEffect(() => {
    const apply = (primary?: string) => {
      const root = document.documentElement
      if (primary && HEX.test(primary)) root.style.setProperty('--rt-primary', primary)
      else root.style.removeProperty('--rt-primary')
    }

    try {
      const cached = sessionStorage.getItem('rtPrimary')
      if (cached) apply(cached)
    } catch {}

    fetch('/api/admin/content')
      .then(r => r.json())
      .then(d => {
        const p = d?.content?.colors?.primary
        apply(typeof p === 'string' ? p : undefined)
        try {
          if (p && HEX.test(p)) sessionStorage.setItem('rtPrimary', p)
          else sessionStorage.removeItem('rtPrimary')
        } catch {}
      })
      .catch(() => {})
  }, [])

  return null
}

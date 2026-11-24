'use client'

import { useEffect, useRef } from 'react'

/* Case Cloudflare Turnstile « Verifiez que vous etes humain ».
   Ne s'affiche que si NEXT_PUBLIC_TURNSTILE_SITE_KEY existe. */

type Turnstile = {
  render: (el: HTMLElement, o: Record<string, unknown>) => string
  reset: (id: string) => void
  remove: (id: string) => void
}
declare global { interface Window { turnstile?: Turnstile } }

const CLE = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
const SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
let chargement: Promise<void> | null = null

function charger(): Promise<void> {
  if (window.turnstile) return Promise.resolve()
  if (!chargement) {
    chargement = new Promise((ok, ko) => {
      const s = document.createElement('script')
      s.src = SCRIPT
      s.async = true
      s.onload = () => ok()
      s.onerror = () => { chargement = null; ko(new Error('turnstile')) }
      document.head.appendChild(s)
    })
  }
  return chargement
}

export const caseHumainActive = Boolean(CLE)

export function CaseHumain({ onJeton, remise }: { onJeton: (jeton: string) => void; remise?: number }) {
  const zone = useRef<HTMLDivElement>(null)
  const widget = useRef<string | null>(null)
  const rappel = useRef(onJeton)
  useEffect(() => { rappel.current = onJeton }, [onJeton])

  useEffect(() => {
    if (!CLE) return
    let fini = false
    charger().then(() => {
      if (fini || !zone.current || !window.turnstile) return
      widget.current = window.turnstile.render(zone.current, {
        sitekey: CLE,
        language: 'fr',
        theme: 'light',
        callback: (t: string) => rappel.current(t),
        'expired-callback': () => rappel.current(''),
        'error-callback': () => rappel.current(''),
      })
    }).catch(() => {})
    return () => {
      fini = true
      if (widget.current && window.turnstile) window.turnstile.remove(widget.current)
      widget.current = null
    }
  }, [])

  useEffect(() => {
    if (remise && widget.current && window.turnstile) {
      window.turnstile.reset(widget.current)
      rappel.current('')
    }
  }, [remise])

  if (!CLE) return null
  return <div ref={zone} style={{ minHeight: 65 }} />
}

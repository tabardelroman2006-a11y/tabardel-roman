'use client'

import { Fragment, useEffect, useRef } from 'react'
import { useSiteTexts } from '@/lib/useSiteTexts'
import { DISPLAY_FONT, reducedMotion, smoothstep } from './anim'

/* La phrase de presentation en tres grand. Les mots se colorent un a un au
   defilement ; quelques mots cles passent en bleu et en italique. */

const KEYWORDS = /^(sur|mesure|convertissent|artisans|vraiment|travaille)[,.]?$/i

export function Manifesto() {
  const t = useSiteTexts()
  const ref = useRef<HTMLElement>(null)
  const text = t('hero.description')

  useEffect(() => {
    const root = ref.current!
    if (reducedMotion()) {
      root.querySelectorAll<HTMLElement>('[data-w]').forEach(w => { w.style.opacity = '1' })
      return
    }
    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const words = root.querySelectorAll<HTMLElement>('[data-w]')
      const r = root.getBoundingClientRect()
      if (r.bottom < 0 || r.top > window.innerHeight) return
      const p = smoothstep(0.1, 0.75, (window.innerHeight - r.top) / (r.height + window.innerHeight * 0.4))
      const n = words.length
      words.forEach((w, i) => {
        const lit = smoothstep(i / n - 0.02, i / n + 0.06, p)
        w.style.opacity = String(0.18 + lit * 0.82)
        w.style.transform = `translate3d(0, ${(1 - lit) * 0.12}em, 0)`
      })
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text])

  const words = text.split(/\s+/).filter(Boolean)

  return (
    <section ref={ref} className="relative px-5 md:px-12 lg:px-20 pt-10 pb-28 md:pb-40" style={{ backgroundColor: 'var(--rt-bg)' }}>
      <div className="max-w-6xl mx-auto text-center">
        <p className="font-body text-[11px] font-700 tracking-[0.3em] uppercase mb-10" style={{ color: 'var(--rt-muted)' }}>
          Créateur de sites web · Drôme
        </p>
        <p className="uppercase" style={{ ...DISPLAY_FONT, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 0.98, fontSize: 'clamp(2.1rem, 5.4vw, 5.6rem)', color: 'var(--rt-ink)' }}>
          {words.map((w, i) => {
            const key = KEYWORDS.test(w)
            return (
              <Fragment key={i}>
                <span
                  data-w
                  className="inline-block"
                  style={{
                    opacity: 0.18,
                    ...(key ? { color: 'var(--rt-primary)', fontFamily: 'var(--font-barlow), sans-serif', fontStyle: 'italic', fontWeight: 600, letterSpacing: '-0.01em' } : null),
                  }}
                >
                  {w}
                </span>{' '}
              </Fragment>
            )
          })}
        </p>
      </div>
    </section>
  )
}

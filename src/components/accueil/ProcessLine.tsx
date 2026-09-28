'use client'

import { useEffect, useRef } from 'react'
import { useSiteTexts } from '@/lib/useSiteTexts'
import { STEPS } from '@/components/sections/ProcessSection'
import { DISPLAY_FONT, loop, passProgress, pinnedProgress, reducedMotion, smoothstep } from './anim'

/* Les 4 etapes, collees a l'ecran : une ligne bleue se trace au defilement
   et chaque etape s'allume quand la ligne l'atteint. */

export function ProcessLine() {
  const t = useSiteTexts()
  const rootRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const root = rootRef.current!
    if (reducedMotion()) {
      if (lineRef.current) lineRef.current.style.transform = 'scaleX(1)'
      stepRefs.current.forEach(s => s && (s.dataset.on = '1'))
      return
    }
    /* Ordinateur : section collee a l'ecran. Telephone : defilement normal. */
    const mobile = window.matchMedia('(max-width: 767px)').matches
    return loop(root, mobile ? passProgress : pinnedProgress, p => {
      const q = mobile ? smoothstep(0.15, 0.6, p) : smoothstep(0.05, 0.85, p)
      if (lineRef.current) lineRef.current.style.transform = `scaleX(${q})`
      stepRefs.current.forEach((s, i) => {
        if (!s) return
        const at = i / (STEPS.length - 1)
        const on = q >= at - 0.02
        s.dataset.on = on ? '1' : '0'
        const lift = smoothstep(at - 0.12, at, q)
        s.style.transform = `translate3d(0, ${(1 - lift) * 40}px, 0)`
        s.style.opacity = String(0.35 + lift * 0.65)
      })
    }, 6)
  }, [])

  return (
    <section ref={rootRef} className="relative md:h-[260svh]" style={{ backgroundColor: 'var(--rt-soft)' }}>
      <div className="md:sticky md:top-0 md:h-[100svh] flex flex-col justify-center overflow-hidden px-5 md:px-12 lg:px-20 py-24 md:py-0">
        <div className="max-w-7xl w-full mx-auto">
          <p className="font-body text-[11px] font-700 tracking-[0.3em] uppercase mb-5" style={{ color: 'var(--rt-muted)' }}>{t('process.eyebrow')}</p>
          <h2 className="uppercase mb-14 md:mb-20" style={{ ...DISPLAY_FONT, color: 'var(--rt-primary)', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.03em', fontSize: 'clamp(2.2rem, 5.2vw, 5rem)' }}>
            {t('process.titleLine1')}
            <br />
            <span className="acc-outline">{t('process.titleLine2')}</span>
          </h2>

          <div className="relative">
            <div className="hidden md:block absolute left-0 right-0 top-[22px] h-[2px]" style={{ backgroundColor: 'var(--rt-line)' }}>
              <div ref={lineRef} className="h-full origin-left" style={{ backgroundColor: 'var(--rt-primary)', transform: 'scaleX(0)' }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8 md:gap-8">
              {STEPS.map((s, i) => (
                <div key={s.num} ref={el => { stepRefs.current[i] = el }} data-on="0" className="acc-step relative">
                  <span className="acc-step-dot flex items-center justify-center font-body text-xs font-800">{s.num}</span>
                  <h3 className="mt-6 font-display font-700 text-xl md:text-2xl" style={{ color: 'var(--rt-ink)' }}>{s.title}</h3>
                  <p className="mt-1 font-body text-[10px] font-700 tracking-[0.2em] uppercase" style={{ color: 'var(--rt-primary)' }}>{s.sub}</p>
                  <p className="mt-3 font-body text-sm leading-relaxed" style={{ color: 'var(--rt-muted)' }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

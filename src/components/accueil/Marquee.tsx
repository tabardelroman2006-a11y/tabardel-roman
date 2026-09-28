'use client'

import { SafeImg } from './SafeImg'
import { useEffect, useRef } from 'react'
import { DISPLAY_FONT, passProgress, reducedMotion, scrollVelocity } from './anim'

/* Deux lignes geantes qui defilent en sens inverse. Le defilement de la page
   les accelere et les incline ; au centre, une photo tourne doucement. */

const ROWS = [
  ['Sites vitrines', 'E-commerce', 'Référencement', 'Refonte', 'Sur mesure'],
  ['Design unique', 'Rapide', 'Bien placé sur Google', 'Livré clés en main'],
]

export function Marquee() {
  const rootRef = useRef<HTMLElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion()) return
    const root = rootRef.current!
    const pos = [0, 0]
    let raf = 0
    let last = performance.now()
    let skew = 0
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const r = root.getBoundingClientRect()
      if (r.bottom < 0 || r.top > window.innerHeight) return
      const v = scrollVelocity()
      const boost = 1 + Math.min(6, Math.abs(v) / 250)
      skew += (Math.max(-8, Math.min(8, v / 180)) - skew) * 0.1
      rowRefs.current.forEach((row, i) => {
        if (!row) return
        const dir = i === 0 ? -1 : 1
        const half = row.scrollWidth / 2
        pos[i] += dir * 60 * boost * dt * (v < -20 ? -1 : 1)
        if (pos[i] > 0) pos[i] -= half
        if (pos[i] < -half) pos[i] += half
        row.style.transform = `translate3d(${pos[i]}px, 0, 0) skewX(${-skew}deg)`
      })
      if (imgRef.current) {
        const p = passProgress(root)
        imgRef.current.style.transform = `translate(-50%, -50%) rotate(${(p - 0.5) * 24}deg) scale(${0.9 + Math.sin(p * Math.PI) * 0.15})`
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section id="metiers" ref={rootRef} className="relative overflow-hidden py-24 md:py-36" style={{ backgroundColor: 'var(--rt-bg)' }} aria-label="Mes métiers">
      {ROWS.map((row, i) => (
        <div key={i} className="overflow-hidden" style={{ marginTop: i ? '-0.5vw' : 0 }}>
          <div ref={el => { rowRefs.current[i] = el }} className="flex whitespace-nowrap w-max">
            {[0, 1].map(copy => (
              <div key={copy} aria-hidden={copy === 1} className="flex items-center">
                {row.map(word => (
                  <span key={word} className="flex items-center uppercase" style={{ ...DISPLAY_FONT, fontWeight: 700, letterSpacing: '-0.03em', fontSize: 'clamp(3.2rem, 9vw, 9.5rem)', lineHeight: 1 }}>
                    <span className={i === 1 ? 'acc-outline' : ''} style={i === 0 ? { color: 'var(--rt-primary)' } : undefined}>{word}</span>
                    <span className="mx-[2.5vw] inline-block" style={{ width: '0.28em', height: '0.28em', borderRadius: 999, backgroundColor: 'var(--rt-primary)', opacity: i ? 0.35 : 1 }} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div
        ref={imgRef}
        className="hidden md:block absolute left-1/2 top-1/2 overflow-hidden pointer-events-none"
        style={{ width: 'clamp(160px, 16vw, 260px)', aspectRatio: '3 / 4', borderRadius: 18, transform: 'translate(-50%, -50%)', boxShadow: '0 30px 70px color-mix(in srgb, var(--rt-primary) 30%, transparent)', border: '6px solid #FFFFFF' }}
      >
        <SafeImg src="/images/accueil/roman-dehors.jpg" alt="" className="w-full h-full object-cover" />
      </div>
    </section>
  )
}

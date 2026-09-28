'use client'

import { useEffect, useRef } from 'react'
import { SERVICES_LIST } from '@/components/sections/ServicesPageContent'
import { DARK } from './scrollLoop'
import { Reveal } from './Reveal'

/* Les offres s'empilent : chaque carte reste collee en haut de l'ecran
   pendant que la suivante glisse par-dessus ; celle du dessous recule et
   s'assombrit. */

const TOP = 110
const STEP = 22

export function ServicesStack() {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cards = Array.from(listRef.current!.querySelectorAll<HTMLElement>('[data-card]'))
    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const h = window.innerHeight
      cards.forEach((card, i) => {
        const inner = card.firstElementChild as HTMLElement
        let covered = 0
        for (let j = i + 1; j < cards.length; j++) {
          const top = cards[j].getBoundingClientRect().top - (TOP + j * STEP)
          covered += 1 - Math.min(1, Math.max(0, top / (h * 0.7)))
        }
        inner.style.transform = `scale(${1 - covered * 0.045})`
        inner.style.filter = `brightness(${1 - Math.min(0.6, covered * 0.28)})`
      })
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section id="offres" className="text-white px-6 md:px-12 lg:px-20 pt-10 pb-32" style={{ backgroundColor: DARK }}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-14 md:mb-20">
          <p className="font-body text-xs tracking-[0.25em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>Prestations</p>
          <h2 className="font-display font-800 leading-[0.95]" style={{ fontSize: 'clamp(2.3rem, 5vw, 4.4rem)' }}>
            Ce que je propose.
            <br />
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>Sur mesure, de A à Z.</span>
          </h2>
        </Reveal>

        <div ref={listRef} className="flex flex-col gap-8">
          {SERVICES_LIST.map(({ icon: Icon, title, description, details }, i) => (
            <div key={title} data-card className="sticky" style={{ top: TOP + i * STEP }}>
              <article
                className="grid grid-cols-1 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,0.8fr)] gap-6 md:gap-12 p-8 md:p-12 origin-top"
                style={{ backgroundColor: '#15171c', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 20, minHeight: 'min(56svh, 460px)', boxShadow: '0 -20px 60px rgba(0,0,0,0.45)' }}
              >
                <span className="font-display font-800" style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', lineHeight: 0.85, color: 'rgba(255,255,255,0.14)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <Icon size={24} style={{ color: '#FFFFFF', opacity: 0.8 }} />
                  <h3 className="font-display font-700 mt-5" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)', lineHeight: 1 }}>{title}</h3>
                  <p className="font-body text-base md:text-lg leading-relaxed mt-5" style={{ color: 'rgba(255,255,255,0.7)' }}>{description}</p>
                </div>
                <ul className="space-y-3 md:pt-14">
                  {details.map(d => (
                    <li key={d} className="flex items-center gap-3 font-body text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      <span className="shrink-0 w-1.5 h-1.5" style={{ borderRadius: 999, backgroundColor: 'var(--rt-primary)', boxShadow: '0 0 0 3px rgba(255,255,255,0.08)' }} />
                      {d}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

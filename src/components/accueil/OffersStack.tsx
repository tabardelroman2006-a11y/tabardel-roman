'use client'

import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useModal } from '@/context/ModalContext'
import { SERVICES_LIST } from '@/components/sections/ServicesPageContent'
import { Reveal } from './Reveal'
import { DISPLAY_FONT, reducedMotion } from './anim'

/* Les 5 offres en cartes qui s'empilent : chacune reste collee en haut de
   l'ecran pendant que la suivante glisse par-dessus ; celle du dessous recule
   et palit. Cartes claires, la carte du dessus passe au bleu de la marque. */

const TOP = 110
const STEP = 20

export function OffersStack() {
  const { openDevis } = useModal()
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion()) return
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
        inner.style.transform = `scale(${1 - covered * 0.04})`
        inner.style.opacity = String(1 - Math.min(0.55, covered * 0.25))
      })
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section id="offres" className="px-5 md:px-12 lg:px-20 pt-16 pb-32" style={{ backgroundColor: 'var(--rt-bg)' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-12 md:mb-16">
          <p className="font-body text-[11px] font-700 tracking-[0.3em] uppercase mb-5" style={{ color: 'var(--rt-muted)' }}>Prestations</p>
          <h2 className="uppercase" style={{ ...DISPLAY_FONT, color: 'var(--rt-primary)', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.03em', fontSize: 'clamp(2.4rem, 5.6vw, 5.4rem)' }}>
            Ce que je propose
            <br />
            <span className="acc-outline">de A à Z</span>
          </h2>
        </Reveal>

        <div ref={listRef} className="flex flex-col gap-8">
          {SERVICES_LIST.map(({ icon: Icon, title, description, details }, i) => (
            <div key={title} data-card className="sticky" style={{ top: TOP + i * STEP }}>
              <article
                className="acc-offer grid grid-cols-1 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,0.8fr)] gap-6 md:gap-12 p-7 md:p-12 origin-top"
                style={{ minHeight: 'min(54svh, 440px)' }}
              >
                <span style={{ ...DISPLAY_FONT, fontWeight: 700, fontSize: 'clamp(3.4rem, 7vw, 6rem)', lineHeight: 0.8 }} className="acc-offer-num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <Icon size={24} className="acc-offer-icon" />
                  <h3 className="uppercase mt-5" style={{ ...DISPLAY_FONT, fontWeight: 700, fontSize: 'clamp(1.8rem, 3.2vw, 2.9rem)', lineHeight: 0.95, letterSpacing: '-0.02em' }}>{title}</h3>
                  <p className="acc-offer-text font-body text-base md:text-lg leading-relaxed mt-5">{description}</p>
                  <button onClick={openDevis} className="acc-offer-btn acc-btn mt-7">
                    On en parle
                    <ArrowUpRight size={15} />
                  </button>
                </div>
                <ul className="space-y-3 md:pt-16">
                  {details.map(d => (
                    <li key={d} className="acc-offer-text flex items-center gap-3 font-body text-sm">
                      <span className="acc-offer-dot shrink-0 w-1.5 h-1.5" style={{ borderRadius: 999 }} />
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

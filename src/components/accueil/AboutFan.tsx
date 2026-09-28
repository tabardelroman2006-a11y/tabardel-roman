'use client'

import { SafeImg } from './SafeImg'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useSiteTexts } from '@/lib/useSiteTexts'
import { Reveal } from './Reveal'
import { DISPLAY_FONT, loop, passProgress, reducedMotion, smoothstep } from './anim'

/* Qui sommes-nous : un paquet de photos qui s'ouvre en eventail quand il
   arrive a l'ecran (facon « On socials » de landonorris.com). Au survol,
   une carte se souleve. */

const CARDS = [
  { src: '/images/accueil/pc-composants.jpg', alt: 'Un ordinateur portable en pièces détachées' },
  { src: '/images/accueil/pc-superpose.jpg', alt: 'Le site de Roman affiché sur deux écrans' },
  { src: '/images/photo-identite.jpg', alt: 'Roman Tabardel' },
  { src: '/images/accueil/jardin.jpg', alt: 'Travail en extérieur' },
  { src: '/images/accueil/roman-dehors.jpg', alt: 'Roman au travail' },
]

export function AboutFan() {
  const t = useSiteTexts()
  const rootRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const root = rootRef.current!
    const n = CARDS.length
    const place = (open: number) => {
      cardRefs.current.forEach((c, i) => {
        if (!c) return
        const k = i - (n - 1) / 2
        c.style.setProperty('--fan', `translate3d(${k * 32 * open}%, ${Math.abs(k) * 7 * open}%, 0) rotate(${k * 11 * open}deg)`)
      })
    }
    if (reducedMotion()) {
      place(1)
      return
    }
    return loop(root, passProgress, p => place(smoothstep(0.08, 0.4, p)), 5)
  }, [])

  return (
    <section id="qui-sommes-nous" ref={rootRef} className="relative overflow-hidden px-5 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: 'var(--rt-bg)' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-10 items-center">
        <div className="relative h-[420px] md:h-[520px] order-2 lg:order-1">
          {CARDS.map((c, i) => (
            <div key={c.src} ref={el => { cardRefs.current[i] = el }} className="acc-fan-card absolute left-1/2 top-1/2" style={{ zIndex: i === 2 ? 10 : 5 - Math.abs(i - 2) }}>
              <div className="acc-fan-inner overflow-hidden">
                <SafeImg src={c.src} alt={c.alt} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>

        <Reveal className="order-1 lg:order-2">
          <p className="font-body text-[11px] font-700 tracking-[0.3em] uppercase mb-5" style={{ color: 'var(--rt-muted)' }}>{t('about.eyebrow')}</p>
          <h2 className="uppercase" style={{ ...DISPLAY_FONT, color: 'var(--rt-primary)', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.03em', fontSize: 'clamp(2.4rem, 5vw, 4.8rem)' }}>
            {t('about.titleLine1')}
            <br />
            <span className="acc-outline">{t('about.titleLine2')}</span>
          </h2>
          <div className="mt-8 space-y-5 font-body text-base md:text-lg leading-relaxed max-w-xl" style={{ color: 'var(--rt-muted)' }}>
            <p>{t('about.paragraph1')}</p>
            <p>{t('about.paragraph2')}</p>
          </div>
          <Link href="/notre-histoire" className="acc-btn acc-btn-ghost mt-9">
            Mon histoire
            <ArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

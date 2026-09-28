'use client'

import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowRight, Phone } from 'lucide-react'
import { useModal } from '@/context/ModalContext'
import { useSiteTexts } from '@/lib/useSiteTexts'
import { TopoField } from './TopoField'
import { ScanPortrait } from './ScanPortrait'
import { DISPLAY_FONT, clamp, insecable, reducedMotion } from './anim'

/* Accueil facon landonorris.com : « Mon metier ? » en geant, la reponse juste
   dessous en petit, et Roman detoure au centre avec son scan sous la souris. */

export function HeroScan() {
  const { openDevis } = useModal()
  const t = useSiteTexts()
  const rootRef = useRef<HTMLElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion()) return
    const root = rootRef.current!
    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const r = root.getBoundingClientRect()
      if (r.bottom < 0) return
      const out = clamp(-r.top / r.height)
      if (portraitRef.current) portraitRef.current.style.transform = `translate3d(0, ${out * 14}vh, 0) scale(${1 - out * 0.08})`
      if (titleRef.current) titleRef.current.style.transform = `translate3d(0, ${out * -10}vh, 0)`
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section ref={rootRef} className="relative overflow-hidden" style={{ height: '100svh', minHeight: 640, backgroundColor: 'var(--rt-bg)' }}>
      <TopoField opacity={0.13} />

      <div ref={titleRef} className="absolute inset-x-0 top-[15svh] md:top-[11svh] flex flex-col items-center text-center px-4 pointer-events-none" style={{ zIndex: 1 }}>
        <p className="acc-rise uppercase mb-3 md:mb-4" style={{ ...DISPLAY_FONT, color: 'var(--rt-muted)', fontWeight: 600, letterSpacing: '0.2em', fontSize: 'clamp(0.7rem, 0.95vw, 0.9rem)' }}>
          {t('hero.eyebrow')}
        </p>
        <h1 className="uppercase" style={{ ...DISPLAY_FONT, color: 'var(--rt-primary)', fontWeight: 700, lineHeight: 0.85, letterSpacing: '-0.035em', fontSize: 'clamp(3.2rem, 12vw, 13rem)' }}>
          <span className="acc-rise-mask"><span className="acc-rise" style={{ animationDelay: '0.15s' }}>{insecable(t('hero.title'))}</span></span>
        </h1>
      </div>

      {/* La reponse est cachee derriere la tete : on la decouvre en passant la
          souris sur le visage (la photo devient transparente sous la souris). */}
      <div ref={portraitRef} className="absolute left-1/2 bottom-0 -translate-x-1/2" style={{ zIndex: 2, height: 'min(70svh, 820px)', containerType: 'size', aspectRatio: '900 / 1200' }}>
        <p className="absolute text-center pointer-events-none" style={{ top: '41%', left: '29%', right: '29%', fontFamily: 'var(--font-barlow), sans-serif', fontStyle: 'italic', fontWeight: 700, color: 'var(--rt-primary)', fontSize: '6.6cqw', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
          {t('hero.subtitle')}
        </p>
        <ScanPortrait priority seeThrough className="relative h-full" />
      </div>

      <div className="absolute left-4 md:left-8 bottom-6 md:bottom-8 acc-rise" style={{ zIndex: 3, animationDelay: '0.6s' }}>
        <button onClick={openDevis} className="acc-btn acc-btn-solid">
          <Phone size={15} />
          Appel gratuit
        </button>
      </div>

      <div className="absolute right-4 md:right-8 bottom-6 md:bottom-8 acc-rise" style={{ zIndex: 3, animationDelay: '0.75s' }}>
        <a href="#realisations" className="acc-btn acc-btn-ghost">
          <span className="hidden sm:inline">Mes réalisations</span>
          <span className="sm:hidden">Réalisations</span>
          <ArrowRight size={15} />
        </a>
      </div>

      <a href="#metiers" aria-label="Descendre" className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-5 items-center justify-center acc-bob" style={{ zIndex: 3, width: 44, height: 44, borderRadius: 999, backgroundColor: '#FFFFFF', color: 'var(--rt-primary)', boxShadow: '0 10px 30px color-mix(in srgb, var(--rt-primary) 25%, transparent)' }}>
        <ArrowDown size={18} />
      </a>
    </section>
  )
}

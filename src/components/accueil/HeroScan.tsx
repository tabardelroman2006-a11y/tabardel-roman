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
          <span className="block mt-[0.12em] normal-case" style={{ fontSize: 'clamp(1.15rem, 1.9vw, 1.9rem)', lineHeight: 1.1, letterSpacing: '-0.01em' }}>
            <span className="acc-rise-mask">
              <span className="acc-rise" style={{ animationDelay: '0.4s', fontFamily: 'var(--font-barlow), sans-serif', fontStyle: 'italic', fontWeight: 600, color: 'var(--rt-ink)' }}>
                {insecable(t('hero.subtitle'))}
              </span>
            </span>
          </span>
        </h1>
      </div>

      <div ref={portraitRef} className="absolute left-1/2 bottom-0 -translate-x-1/2" style={{ zIndex: 2, height: 'min(70svh, 820px)' }}>
        <ScanPortrait priority className="relative h-full" />
      </div>

      <div className="hidden md:block absolute left-8 bottom-8 acc-rise" style={{ zIndex: 3, animationDelay: '0.6s' }}>
        <div className="acc-card p-5 w-[260px]">
          <p className="flex items-center gap-2 font-body text-[10px] font-700 tracking-[0.2em] uppercase" style={{ color: 'var(--rt-muted)' }}>
            <span className="acc-pulse" /> Disponible
          </p>
          <p className="mt-2 font-display font-700 leading-tight text-lg" style={{ color: 'var(--rt-ink)' }}>
            Pour de nouveaux projets
          </p>
          <p className="mt-2 font-body text-xs leading-relaxed" style={{ color: 'var(--rt-muted)' }}>
            Sites vitrines, e-commerce et référencement, depuis la Drôme.
          </p>
        </div>
      </div>

      <div className="absolute inset-x-4 md:inset-x-auto md:right-8 bottom-6 md:bottom-8 flex flex-col items-center md:items-end gap-3 acc-rise" style={{ zIndex: 3, animationDelay: '0.75s' }}>
        <button onClick={openDevis} className="acc-btn acc-btn-solid">
          <Phone size={15} />
          Appel gratuit
        </button>
        <a href="#realisations" className="acc-btn acc-btn-ghost hidden md:inline-flex">
          Mes réalisations
          <ArrowRight size={15} />
        </a>
      </div>

      <a href="#metiers" aria-label="Descendre" className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-5 items-center justify-center acc-bob" style={{ zIndex: 3, width: 44, height: 44, borderRadius: 999, backgroundColor: '#FFFFFF', color: 'var(--rt-primary)', boxShadow: '0 10px 30px color-mix(in srgb, var(--rt-primary) 25%, transparent)' }}>
        <ArrowDown size={18} />
      </a>
    </section>
  )
}

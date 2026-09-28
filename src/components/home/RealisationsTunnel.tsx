'use client'

import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { PORTFOLIO } from '@/components/sections/ServicesPageContent'
import { DARK, HERO_FONT, smoothstep, watchScroll } from './scrollLoop'

/* Realisations facon oryzo.ai (« So portable, it's wearable ») : le titre
   reste au centre, et des captures des sites livres arrivent du fond dans
   de petits cadres, grossissent et passent a cote du visiteur. */

const S = '/images/relief/sites/'
type Frame = { src: string; site: 0 | 1; page: string; mobile?: boolean; x: number; y: number }

const FRAMES: Frame[] = [
  { src: S + 'sultan-accueil.jpg', site: 0, page: 'Accueil', x: -30, y: -20 },
  { src: S + 'jr-accueil.jpg', site: 1, page: 'Accueil', x: 29, y: 18 },
  { src: S + 'sultan-mobile.jpg', site: 0, page: 'Sur téléphone', mobile: true, x: 34, y: -22 },
  { src: S + 'jr-domaines.jpg', site: 1, page: 'Domaines', x: -33, y: 22 },
  { src: S + 'sultan-menu.jpg', site: 0, page: 'La carte', x: 12, y: -32 },
  { src: S + 'jr-mobile.jpg', site: 1, page: 'Sur téléphone', mobile: true, x: -40, y: -4 },
  { src: S + 'sultan-galerie.jpg', site: 0, page: 'Galerie', x: -14, y: 32 },
  { src: S + 'jr-realisations.jpg', site: 1, page: 'Réalisations', x: 38, y: 4 },
  { src: S + 'sultan-menu-mobile.jpg', site: 0, page: 'La carte sur téléphone', mobile: true, x: -22, y: -30 },
  { src: S + 'jr-equipe.jpg', site: 1, page: 'Qui sommes-nous', x: 22, y: 30 },
  { src: S + 'sultan-histoire.jpg', site: 0, page: 'Notre histoire', x: -36, y: 12 },
  { src: S + 'jr-galerie-mobile.jpg', site: 1, page: 'Galerie sur téléphone', mobile: true, x: 30, y: -10 },
]

const Z_FAR = -2600
const Z_NEAR = 900
const START = 0.03
const STEP = 0.052
const SPAN = 0.34

export function RealisationsTunnel({ still = false }: { still?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const sites = PORTFOLIO.slice(0, 2)

  useEffect(() => {
    if (still) return
    const wrap = wrapRef.current!
    const stage = stageRef.current!
    const frames = Array.from(stage.querySelectorAll<HTMLElement>('[data-frame]'))
    return watchScroll(wrap, ({ p, visible }) => {
      if (!visible) return
      const vw = window.innerWidth / 100
      const vh = window.innerHeight / 100
      frames.forEach((el, i) => {
        const f = FRAMES[i]
        const k = (p - (START + i * STEP)) / SPAN
        if (k <= 0 || k >= 1) {
          el.style.visibility = 'hidden'
          return
        }
        const z = Z_FAR + (Z_NEAR - Z_FAR) * k
        el.style.visibility = 'visible'
        el.style.opacity = String(smoothstep(0, 0.18, k) * (1 - smoothstep(0.82, 1, k)))
        el.style.transform = `translate3d(calc(-50% + ${f.x * vw}px), calc(-50% + ${f.y * vh}px), ${z}px)`
      })
      if (titleRef.current) {
        const out = smoothstep(0.78, 0.9, p)
        titleRef.current.style.transform = `scale(${1 + p * 0.08 - out * 0.1})`
        titleRef.current.style.opacity = String(1 - out)
      }
      if (endRef.current) {
        const e = smoothstep(0.8, 0.94, p)
        endRef.current.style.opacity = String(e)
        endRef.current.style.transform = `translate3d(0, ${(1 - e) * 40}px, 0)`
        endRef.current.style.pointerEvents = e > 0.5 ? 'auto' : 'none'
      }
    })
  }, [still])

  const title = (
    <>
      <p className="font-body text-xs tracking-[0.3em] uppercase mb-5" style={{ color: 'rgba(255,255,255,0.55)' }}>Réalisations</p>
      <h2 className="uppercase" style={{ ...HERO_FONT, fontWeight: 650, lineHeight: 0.92, letterSpacing: '-0.02em', fontSize: 'clamp(2.6rem, 7.5vw, 7rem)' }}>
        Des sites
        <br />
        qui travaillent,
      </h2>
      <p className="mt-4" style={{ ...HERO_FONT, fontWeight: 500, fontSize: 'clamp(1.2rem, 2.6vw, 2.2rem)', color: 'rgba(255,255,255,0.7)' }}>
        pour de vraies entreprises.
      </p>
    </>
  )

  const siteCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
      {sites.map(s => (
        <a
          key={s.title}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 px-6 py-5 transition-colors duration-300"
          style={{ border: '1px solid rgba(255,255,255,0.18)', borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.04)' }}
        >
          <div className="text-left">
            <p className="font-display font-700 text-lg">{s.title}</p>
            <p className="font-body text-xs mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.category}</p>
          </div>
          <span className="shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45" style={{ width: 40, height: 40, borderRadius: 999, backgroundColor: '#FFFFFF', color: DARK }}>
            <ArrowUpRight size={18} />
          </span>
        </a>
      ))}
    </div>
  )

  if (still) {
    return (
      <section id="realisations" className="px-6 md:px-12 lg:px-20 py-28 text-white text-center" style={{ backgroundColor: DARK }}>
        {title}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto my-14">
          {FRAMES.filter(f => !f.mobile).slice(0, 8).map(f => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={f.src} src={f.src} alt={`${sites[f.site]?.title}, ${f.page}`} loading="lazy" className="w-full" style={{ borderRadius: 8, border: '5px solid #FFFFFF' }} />
          ))}
        </div>
        <div className="flex justify-center">{siteCards}</div>
      </section>
    )
  }

  return (
    <div id="realisations" ref={wrapRef} className="relative" style={{ height: '520svh', backgroundColor: DARK }}>
      <div ref={stageRef} className="sticky top-0 w-full overflow-hidden text-white" style={{ height: '100svh', perspective: '1000px' }}>
        <div aria-hidden="true" className="absolute inset-0" style={{ background: 'radial-gradient(70% 60% at 50% 50%, rgba(40,48,70,0.45) 0%, rgba(11,12,15,0) 70%)' }} />


        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          {FRAMES.map(f => {
            const site = sites[f.site]
            return (
              <a
                key={f.src}
                data-frame
                href={site?.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site?.title}, ${f.page}`}
                className="absolute left-1/2 top-1/2 block"
                style={{ width: f.mobile ? 'clamp(90px, 9vw, 150px)' : 'clamp(170px, 19vw, 320px)', visibility: 'hidden' }}
              >
                <div style={{ padding: 5, backgroundColor: '#FFFFFF', borderRadius: 8, boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.src} alt="" loading="lazy" className="block w-full" style={{ borderRadius: 4 }} />
                </div>
                <p className="hidden md:block mt-2 font-body text-[10px] tracking-[0.18em] uppercase whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {site?.title} · {f.page}
                </p>
              </a>
            )
          })}
        </div>

        <div ref={titleRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none" style={{ mixBlendMode: 'difference', zIndex: 2 }}>
          {title}
        </div>

        <div ref={endRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6" style={{ opacity: 0, pointerEvents: 'none' }}>
          <p className="font-body text-xs tracking-[0.3em] uppercase mb-5" style={{ color: 'rgba(255,255,255,0.55)' }}>Déjà en ligne</p>
          <h3 className="font-display font-800 mb-10" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', lineHeight: 1 }}>
            Allez voir par vous-même.
          </h3>
          {siteCards}
        </div>
      </div>
    </div>
  )
}

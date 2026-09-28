'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { ArrowDown, ArrowRight, ArrowUpRight, Phone } from 'lucide-react'
import { useModal } from '@/context/ModalContext'
import { useSiteTexts } from '@/lib/useSiteTexts'
import { SERVICES } from '@/components/sections/ServicesSection'
import { STEPS } from '@/components/sections/ProcessSection'
import { PORTFOLIO } from '@/components/sections/ServicesPageContent'
import type { GalleryScene } from './GalleryScene'

/* Accueil en galerie 3D : une longue zone de defilement, un decor fixe a
   l'ecran, et une camera qui glisse de salle en salle. Le defilement ne
   deplace pas la camera directement : elle le rattrape avec de l'inertie,
   ce qui donne le mouvement lourd et fluide d'un travelling de cinema. */

const HERO_FONT = {
  fontFamily: 'var(--font-bricolage), Arial, sans-serif',
  fontVariationSettings: "'opsz' 96",
} as const

const WORK_IMAGES: Record<string, string> = {
  'Sultan Kebab Crest': '/images/galerie/sultan.jpg',
  'JR Maçonnerie Rénovation': '/images/galerie/jr.jpg',
}

const CHAPTERS = [
  { label: 'Accueil', p: 0 },
  { label: 'Services', p: 0.135 },
  { label: 'Qui sommes-nous', p: 0.44 },
  { label: 'Réalisations', p: 0.57 },
  { label: 'Processus', p: 0.8 },
]

const insecable = (s: string) => s.replace(/\s+([?!:;»])/g, ' $1').replace(/(«)\s+/g, '$1 ')

function fade(p: number, a: number, b: number, edge = 0.025) {
  if (p < a - edge || p > b + edge) return 0
  if (p < a) return (p - (a - edge)) / edge
  if (p > b) return 1 - (p - b) / edge
  return 1
}

const PANEL_CLASS = {
  center: 'gallery-panel absolute inset-0 flex flex-col items-center justify-center text-center px-6',
  left: 'gallery-panel absolute left-0 right-0 bottom-0 md:top-0 flex flex-col justify-end md:justify-center px-6 pb-10 md:pb-0 md:pl-12 lg:pl-20 md:pr-0 md:max-w-[46%] lg:max-w-[40%]',
  top: 'gallery-panel absolute left-0 right-0 bottom-0 md:bottom-auto md:top-24 flex flex-col justify-end items-start md:items-center md:text-center px-6 pb-10 md:pb-0',
}

function Panel({ range, side = 'left', children }: { range: [number, number]; side?: keyof typeof PANEL_CLASS; children: ReactNode }) {
  return (
    <div
      data-range={range.join(',')}
      className={PANEL_CLASS[side]}
      style={{ opacity: range[0] <= 0 ? 1 : 0, visibility: range[0] <= 0 ? 'visible' : 'hidden' }}
    >
      {children}
    </div>
  )
}

const eyebrow = 'font-body text-xs tracking-[0.25em] uppercase mb-4'
const title = 'font-display font-800 leading-[0.95]'
const titleSize = { fontSize: 'clamp(2.2rem, 4.6vw, 4.2rem)' }

export function GalleryExperience() {
  const { openDevis } = useModal()
  const t = useSiteTexts()
  const wrapRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const wrap = wrapRef.current!
    const stage = stageRef.current!
    const canvas = canvasRef.current!
    const panels = Array.from(stage.querySelectorAll<HTMLElement>('.gallery-panel')).map(el => ({
      el,
      range: el.dataset.range!.split(',').map(Number) as [number, number],
    }))
    const dots = Array.from(dotsRef.current?.querySelectorAll<HTMLElement>('button') ?? [])

    let scene: GalleryScene | null = null
    let raf = 0
    let alive = true
    let current = 0
    let last = performance.now()
    let slowFrames = 0

    const target = () => {
      const r = wrap.getBoundingClientRect()
      const total = r.height - window.innerHeight
      return total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0
    }

    const onMouse = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      scene?.setMouse((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMouse, { passive: true })

    const ro = new ResizeObserver(() => scene?.resize(stage.clientWidth, stage.clientHeight))
    ro.observe(stage)

    const accentWatch = new MutationObserver(() => {
      const c = getComputedStyle(document.documentElement).getPropertyValue('--rt-primary').trim()
      scene?.setAccent(c)
    })
    accentWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] })

    current = target()

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      current += (target() - current) * (1 - Math.exp(-dt * 3.2))

      for (const { el, range } of panels) {
        const o = fade(current, range[0], range[1])
        el.style.opacity = String(o)
        el.style.visibility = o > 0.01 ? 'visible' : 'hidden'
        el.style.transform = `translate3d(0, ${(1 - o) * 24}px, 0)`
      }
      if (veilRef.current) {
        veilRef.current.style.opacity = String(Math.max(0, Math.min(1, (current - 0.95) / 0.045)))
      }
      let active = 0
      CHAPTERS.forEach((c, i) => { if (current >= c.p - 0.05) active = i })
      dots.forEach((d, i) => { d.dataset.active = i === active ? '1' : '0' })

      const r = wrap.getBoundingClientRect()
      if (scene && r.bottom > 0 && r.top < window.innerHeight) {
        scene.render(current, now / 1000)
        if (!document.hidden) {
          slowFrames = dt > 1 / 45 ? slowFrames + 1 : Math.max(0, slowFrames - 1)
          if (slowFrames > 90) {
            slowFrames = 0
            scene.lowerQuality()
          }
        }
      }
    }
    raf = requestAnimationFrame(tick)

    import('./GalleryScene').then(({ GalleryScene }) => {
      if (!alive) return
      scene = new GalleryScene(
        canvas,
        {
          services: SERVICES.map(s => ({ number: s.number, title: s.title, desc: s.desc, points: s.points })),
          steps: STEPS,
          works: PORTFOLIO.map(w => ({ image: WORK_IMAGES[w.title] ?? w.image, title: w.title, category: w.category })),
          portrait: '/images/galerie/portrait.jpg',
          landscape: '/images/galerie/paysage.jpg',
        },
        ratio => alive && setLoaded(ratio),
        () => alive && setReady(true),
      )
      scene.resize(stage.clientWidth, stage.clientHeight)
    })

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMouse)
      ro.disconnect()
      accentWatch.disconnect()
      scene?.dispose()
    }
  }, [])

  const goTo = (p: number) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const top = wrap.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + p * (wrap.offsetHeight - window.innerHeight), behavior: 'smooth' })
  }

  const [sultan, jr] = PORTFOLIO

  return (
    <div id="galerie" ref={wrapRef} style={{ height: '1300svh', position: 'relative', backgroundColor: '#100e0c' }}>
      <div ref={stageRef} className="sticky top-0 w-full overflow-hidden" style={{ height: '100svh' }}>
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full"
          style={{ opacity: ready ? 1 : 0, transition: 'opacity 1.6s ease' }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%), linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 22%)',
          }}
        />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none md:hidden" style={{ background: 'linear-gradient(0deg, rgba(10,9,8,0.85) 0%, rgba(10,9,8,0) 55%)' }} />
        <div aria-hidden="true" data-range="0.1,0.88" className="gallery-panel absolute inset-0 pointer-events-none hidden md:block" style={{ opacity: 0, background: 'linear-gradient(90deg, rgba(10,9,8,0.62) 0%, rgba(10,9,8,0.35) 30%, rgba(10,9,8,0) 52%)' }} />

        <div className="absolute inset-0 text-white" style={{ textShadow: '0 2px 30px rgba(0,0,0,0.45)' }}>
          <Panel range={[0, 0.035]} side="center">
            <p className="uppercase mb-6" style={{ ...HERO_FONT, color: 'rgba(255,255,255,0.9)', fontWeight: 600, letterSpacing: '0.18em', fontSize: 'clamp(0.75rem, 1vw, 0.95rem)' }}>
              {t('hero.eyebrow')}
            </p>
            <h1 className="uppercase" style={{ ...HERO_FONT, fontWeight: 650, lineHeight: 0.9, letterSpacing: '-0.02em', fontSize: 'clamp(3.4rem, 11vw, 10.5rem)' }}>
              {insecable(t('hero.title'))}
            </h1>
            <p className="mt-3 md:mt-4" style={{ ...HERO_FONT, fontWeight: 550, lineHeight: 1.05, fontSize: 'clamp(1.6rem, 4.2vw, 3.8rem)' }}>
              {insecable(t('hero.subtitle'))}
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-10">
              <button
                onClick={openDevis}
                className="flex items-center gap-2.5 uppercase px-8 py-4 transition-transform duration-200 hover:-translate-y-0.5"
                style={{ ...HERO_FONT, borderRadius: '999px', backgroundColor: '#FFFFFF', color: 'var(--rt-primary)', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.06em', textShadow: 'none' }}
              >
                <Phone size={15} />
                Appel gratuit (15 min)
              </button>
              <button
                onClick={() => goTo(CHAPTERS[3].p)}
                className="flex items-center gap-2 uppercase px-8 py-4 transition-colors duration-200 hover:bg-white/10"
                style={{ ...HERO_FONT, borderRadius: '999px', color: '#FFFFFF', border: '1.5px solid rgba(255,255,255,0.85)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.06em' }}
              >
                Voir mes réalisations
                <ArrowRight size={15} />
              </button>
            </div>
            <button
              type="button"
              onClick={() => goTo(CHAPTERS[1].p)}
              aria-label="Entrer dans la galerie"
              className="absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-10 flex flex-col items-center gap-3"
            >
              <span className="font-body text-[11px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {ready ? 'Défilez pour entrer' : `Chargement ${Math.round(loaded * 100)} %`}
              </span>
              <span className="flex items-center justify-center" style={{ borderRadius: '999px', width: 52, height: 52, backgroundColor: 'var(--rt-primary)' }}>
                <ArrowDown size={22} />
              </span>
            </button>
          </Panel>

          <Panel range={[0.12, 0.325]}>
            <p className={eyebrow} style={{ color: 'rgba(255,255,255,0.7)' }}>{t('services.eyebrow')}</p>
            <h2 className={title} style={titleSize}>
              {t('services.titleLine1')}
              <br />
              <span style={{ color: 'rgba(255,255,255,0.55)' }}>{t('services.titleLine2')}</span>
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <p className="font-body font-600 text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>Pas sûr de ce dont vous avez besoin ?</p>
              <button
                onClick={openDevis}
                className="font-body font-700 text-sm px-6 py-3 transition-opacity duration-200 hover:opacity-80"
                style={{ backgroundColor: 'var(--rt-primary)', color: '#FFFFFF', textShadow: 'none' }}
              >
                On en parle gratuitement
              </button>
            </div>
          </Panel>

          <Panel range={[0.41, 0.47]}>
            <p className={eyebrow} style={{ color: 'rgba(255,255,255,0.7)' }}>{t('about.eyebrow')}</p>
            <h2 className={title} style={titleSize}>
              {t('about.titleLine1')}
              <br />
              <span style={{ color: 'rgba(255,255,255,0.55)' }}>{t('about.titleLine2')}</span>
            </h2>
            <div className="mt-6 space-y-4 font-body text-sm md:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)' }}>
              <p>{t('about.paragraph1')}</p>
              <p className="hidden md:block">{t('about.paragraph2')}</p>
            </div>
            <Link href="/notre-histoire" className="mt-6 inline-flex items-center gap-2 font-body font-700 text-sm hover:opacity-70 transition-opacity">
              En savoir plus sur moi
              <ArrowRight size={15} />
            </Link>
          </Panel>

          {[sultan, jr].filter(Boolean).map((w, i) => (
            <Panel key={w.title} range={i === 0 ? [0.55, 0.595] : [0.655, 0.7]}>
              <p className={eyebrow} style={{ color: 'rgba(255,255,255,0.7)' }}>Réalisations · {w.category}</p>
              <h2 className={title} style={titleSize}>{w.title}</h2>
              <p className="mt-6 font-body text-sm md:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)' }}>{w.description}</p>
              <a href={w.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-body font-700 text-sm hover:opacity-70 transition-opacity">
                Voir le site
                <ArrowUpRight size={15} />
              </a>
            </Panel>
          ))}

          <Panel range={[0.75, 0.87]} side="top">
            <p className={eyebrow} style={{ color: 'rgba(255,255,255,0.7)' }}>{t('process.eyebrow')}</p>
            <h2 className={title} style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
              {t('process.titleLine1')}{' '}
              <span style={{ color: 'rgba(255,255,255,0.55)' }}>{t('process.titleLine2')}</span>
            </h2>
            <ol className="md:hidden mt-5 space-y-2 font-body text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {STEPS.map(s => (
                <li key={s.num}>
                  <span style={{ opacity: 0.6 }}>{s.num}</span> {s.title} <span style={{ opacity: 0.6 }}>· {s.sub}</span>
                </li>
              ))}
            </ol>
          </Panel>
        </div>

        <div ref={dotsRef} className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-4" aria-label="Salles de la galerie">
          {CHAPTERS.map(c => (
            <button
              key={c.label}
              onClick={() => goTo(c.p)}
              className="gallery-dot group flex items-center justify-end gap-3"
              aria-label={c.label}
            >
              <span className="font-body text-[11px] tracking-[0.2em] uppercase text-white opacity-0 group-hover:opacity-80 transition-opacity">{c.label}</span>
              <span className="gallery-dot-mark block" />
            </button>
          ))}
        </div>

        <div ref={veilRef} aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ backgroundColor: 'var(--rt-primary)', opacity: 0 }} />
      </div>
    </div>
  )
}

'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import Link from 'next/link'
import { ArrowDown, ArrowRight, ArrowUpRight, Phone } from 'lucide-react'
import { useModal } from '@/context/ModalContext'
import { useSiteTexts } from '@/lib/useSiteTexts'
import { SERVICES } from '@/components/sections/ServicesSection'
import { STEPS } from '@/components/sections/ProcessSection'
import { PORTFOLIO } from '@/components/sections/ServicesPageContent'
import type { ReliefImage, ReliefRenderer } from './ReliefRenderer'

/* Accueil en frise horizontale : on descend a la molette, et chaque section
   arrive de la droite. Les photos sont en relief (carte de profondeur) et
   les textes arrivent en couches decalees. Le defilement ne pilote pas la
   frise directement : elle le rattrape avec de l'inertie. */

const R = '/images/relief/'
const IMAGES: ReliefImage[] = [
  { src: R + 'montagne.jpg', depth: R + 'montagne-profondeur.jpg', focus: [0.5, 0.5] },
  { src: R + 'bureau.jpg', depth: R + 'bureau-profondeur.jpg', focus: [0.34, 0.5] },
  { src: R + 'roman.jpg', depth: R + 'roman-profondeur.jpg', focus: [0.5, 0.42], fitX: 0.7 },
  { src: R + 'jardin.jpg', depth: R + 'jardin-profondeur.jpg', focus: [0.5, 0.6] },
  { src: R + 'telephones.jpg', depth: R + 'telephones-profondeur.jpg', focus: [0.5, 0.5], fitX: 0.7 },
]
const LABELS = ['Accueil', 'Services', 'Qui sommes-nous', 'Réalisations', 'Processus']
/* Cote d'ou arrive chaque scene : droite, gauche, bas, haut. */
const DIRS: [number, number][] = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]
const offset = (dir: [number, number], amount: number, unitX: string, unitY: string) =>
  `translate3d(${dir[0] * amount}${unitX}, ${dir[1] * amount}${unitY}, 0)`
const N = IMAGES.length
const END_HOLD = 0.45
const UNITS = N - 1 + END_HOLD
const SCREEN_PER_UNIT = 130

const WORK_IMAGES: Record<string, string> = {
  'Sultan Kebab Crest': '/images/relief/sultan.jpg',
  'JR Maçonnerie Rénovation': '/images/relief/jr.jpg',
}

const HERO_FONT = {
  fontFamily: 'var(--font-bricolage), Arial, sans-serif',
  fontVariationSettings: "'opsz' 96",
} as const

const insecable = (s: string) => s.replace(/\s+([?!:;»])/g, ' $1').replace(/(«)\s+/g, '$1 ')
const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

/* Position de la frise (0 = accueil, 4 = processus) selon l'avancee du
   defilement : un temps de pause sur chaque section, puis le glissement. */
function frieze(p: number) {
  const u = p * UNITS
  const i = Math.floor(u)
  if (i >= N - 1) return N - 1
  return i + smooth(0.28, 1, u - i)
}

function Layer({ depth, className, style, children }: { depth: number; className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <div data-depth={depth} className={className} style={style}>
      {children}
    </div>
  )
}

function Scene({ index, shade, children }: { index: number; shade: string; children: ReactNode }) {
  return (
    <section
      data-scene={index}
      aria-label={LABELS[index]}
      className="absolute inset-0 text-white"
      style={{ transform: offset(DIRS[index], 100, '%', '%'), visibility: index === 0 ? 'visible' : 'hidden' }}
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: shade }} />
      {children}
    </section>
  )
}

const eyebrow = 'font-body text-xs tracking-[0.25em] uppercase mb-4'
const h2 = 'font-display font-800 leading-[0.95]'
const h2Size = { fontSize: 'clamp(2.3rem, 5vw, 4.6rem)' }
const muted = { color: 'rgba(255,255,255,0.6)' }
const LEFT_SHADE =
  'linear-gradient(90deg, rgba(8,10,14,0.78) 0%, rgba(8,10,14,0.5) 38%, rgba(8,10,14,0.1) 70%), linear-gradient(180deg, rgba(8,10,14,0.45) 0%, rgba(8,10,14,0) 20%)'
const LEFT_COL = 'absolute left-0 top-0 bottom-0 flex flex-col justify-end md:justify-center px-6 pb-28 md:pb-0 md:pl-12 lg:pl-20 w-full md:w-[46%] lg:w-[40%]'

export function ReliefExperience() {
  const { openDevis } = useModal()
  const t = useSiteTexts()
  const wrapRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [loaded, setLoaded] = useState(0)

  useEffect(() => {
    const wrap = wrapRef.current!
    const stage = stageRef.current!
    const canvas = canvasRef.current!
    const scenes = Array.from(stage.querySelectorAll<HTMLElement>('[data-scene]')).map(el => ({
      el,
      index: Number(el.dataset.scene),
      layers: Array.from(el.querySelectorAll<HTMLElement>('[data-depth]')).map(l => ({ el: l, depth: Number(l.dataset.depth) })),
    }))
    const tabs = Array.from(navRef.current?.querySelectorAll<HTMLElement>('button') ?? [])

    let renderer: ReliefRenderer | null = null
    let raf = 0
    let alive = true
    let last = performance.now()
    let slowFrames = 0

    const target = () => {
      const r = wrap.getBoundingClientRect()
      const total = r.height - window.innerHeight
      return total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0
    }
    let current = target()

    const onMouse = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      renderer?.setMouse((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMouse, { passive: true })
    const ro = new ResizeObserver(() => renderer?.resize())
    ro.observe(stage)

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      current += (target() - current) * (1 - Math.exp(-dt * 3.4))
      const x = frieze(current)

      for (const s of scenes) {
        const rel = s.index - x
        const visible = rel > -1.02 && rel < 1.02
        s.el.style.visibility = visible ? 'visible' : 'hidden'
        if (!visible) continue
        const dir = rel >= 0 ? DIRS[s.index] : (DIRS[s.index + 1] ?? DIRS[1])
        s.el.style.transform = offset(dir, rel * 100, '%', '%')
        for (const l of s.layers) {
          const o = 1 - Math.min(1, Math.max(0, Math.abs(rel) * (1.4 + l.depth) - 0.08))
          l.el.style.transform = offset(dir, rel * l.depth * 38, 'vw', 'vh')
          l.el.style.opacity = String(o)
        }
      }

      const active = Math.round(x)
      tabs.forEach((b, i) => { b.dataset.active = i === active ? '1' : '0' })
      if (barRef.current) barRef.current.style.transform = `scaleX(${x / (N - 1)})`
      if (veilRef.current) {
        const u = current * UNITS
        veilRef.current.style.opacity = String(smooth(N - 1 + 0.2, UNITS, u))
      }

      const r = wrap.getBoundingClientRect()
      if (renderer && r.bottom > 0 && r.top < window.innerHeight) {
        renderer.render(x, now / 1000, DIRS[Math.floor(x) + 1] ?? DIRS[1])
        if (!document.hidden) {
          slowFrames = dt > 1 / 45 ? slowFrames + 1 : Math.max(0, slowFrames - 1)
          if (slowFrames > 90) {
            slowFrames = 0
            renderer.lowerQuality()
          }
        }
      }
    }
    raf = requestAnimationFrame(tick)

    import('./ReliefRenderer').then(async ({ ReliefRenderer }) => {
      if (!alive) return
      try {
        const r = new ReliefRenderer(canvas)
        r.resize()
        await r.load(IMAGES, v => alive && setLoaded(v))
        if (!alive) return r.dispose()
        renderer = r
        setReady(true)
      } catch {
        setReady(false)
      }
    })

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMouse)
      ro.disconnect()
      renderer?.dispose()
    }
  }, [])

  const goTo = (index: number) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const top = wrap.getBoundingClientRect().top + window.scrollY
    const p = index === 0 ? 0 : (index + 0.05) / UNITS
    window.scrollTo({ top: top + p * (wrap.offsetHeight - window.innerHeight), behavior: 'smooth' })
  }

  const works = PORTFOLIO.slice(0, 2)

  return (
    <div
      id="relief"
      ref={wrapRef}
      style={{ height: `${UNITS * SCREEN_PER_UNIT + 100}svh`, position: 'relative', backgroundColor: '#0b0c0f' }}
    >
      <div
        ref={stageRef}
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '100svh', backgroundImage: `url(${IMAGES[0].src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full"
          style={{ opacity: ready ? 1 : 0, transition: 'opacity 1.2s ease' }}
        />

        <Scene
          index={0}
          shade="radial-gradient(60% 50% at 50% 50%, rgba(10,14,22,0.4) 0%, rgba(10,14,22,0) 100%), linear-gradient(180deg, rgba(10,14,22,0.5) 0%, rgba(10,14,22,0.2) 35%, rgba(10,14,22,0.25) 65%, rgba(10,14,22,0.6) 100%)"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6" style={{ paddingTop: 80, textShadow: '0 4px 40px rgba(0,0,0,0.25)' }}>
            <Layer depth={0.1}>
              <p className="uppercase mb-6 md:mb-8" style={{ ...HERO_FONT, color: 'rgba(255,255,255,0.9)', fontWeight: 600, letterSpacing: '0.18em', fontSize: 'clamp(0.75rem, 1vw, 0.95rem)' }}>
                {t('hero.eyebrow')}
              </p>
            </Layer>
            <Layer depth={0}>
              <h1 className="uppercase" style={{ ...HERO_FONT, fontWeight: 650, lineHeight: 0.9, letterSpacing: '-0.02em', fontSize: 'clamp(3.4rem, 11vw, 10.5rem)' }}>
                {insecable(t('hero.title'))}
              </h1>
            </Layer>
            <Layer depth={0.2}>
              <p className="mt-3 md:mt-4" style={{ ...HERO_FONT, fontWeight: 550, lineHeight: 1.05, fontSize: 'clamp(1.6rem, 4.2vw, 3.8rem)' }}>
                {insecable(t('hero.subtitle'))}
              </p>
            </Layer>
            <Layer depth={0.35} className="flex flex-wrap justify-center gap-3 md:gap-4 mt-10 md:mt-12">
              <button
                onClick={openDevis}
                className="flex items-center gap-2.5 uppercase px-8 py-4 transition-transform duration-200 hover:-translate-y-0.5"
                style={{ ...HERO_FONT, borderRadius: '999px', backgroundColor: '#FFFFFF', color: 'var(--rt-primary)', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.06em', textShadow: 'none' }}
              >
                <Phone size={15} />
                Appel gratuit (15 min)
              </button>
              <button
                onClick={() => goTo(3)}
                className="flex items-center gap-2 uppercase px-8 py-4 transition-colors duration-200 hover:bg-white/10"
                style={{ ...HERO_FONT, borderRadius: '999px', color: '#FFFFFF', border: '1.5px solid rgba(255,255,255,0.85)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.06em' }}
              >
                Voir mes réalisations
                <ArrowRight size={15} />
              </button>
            </Layer>
          </div>
          <button
            type="button"
            onClick={() => goTo(1)}
            aria-label="Passer à la suite"
            className="relief-scroll absolute left-1/2 -translate-x-1/2 bottom-24 md:bottom-28 flex flex-col items-center gap-3"
          >
            <span className="font-body text-[11px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {ready || loaded === 0 ? 'Défilez' : `Chargement ${Math.round(loaded * 100)} %`}
            </span>
            <span className="relief-bob flex items-center justify-center" style={{ borderRadius: '999px', width: 52, height: 52, backgroundColor: 'var(--rt-primary)' }}>
              <ArrowDown size={22} />
            </span>
          </button>
        </Scene>

        <Scene index={1} shade={LEFT_SHADE}>
          <div className={LEFT_COL}>
            <Layer depth={0}>
              <p className={eyebrow} style={muted}>{t('services.eyebrow')}</p>
              <h2 className={h2} style={h2Size}>
                {t('services.titleLine1')}
                <br />
                <span style={muted}>{t('services.titleLine2')}</span>
              </h2>
            </Layer>
            <Layer depth={0.15} className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={openDevis}
                className="font-body font-700 text-sm px-6 py-3 transition-opacity duration-200 hover:opacity-80"
                style={{ backgroundColor: 'var(--rt-primary)', color: '#FFFFFF' }}
              >
                On en parle gratuitement
              </button>
            </Layer>
            <Layer depth={0.25} className="md:hidden mt-6 space-y-1.5 font-body text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {SERVICES.map(s => (
                <p key={s.number}><span style={muted}>{s.number}</span> {s.title}</p>
              ))}
            </Layer>
          </div>
          <div className="hidden md:flex absolute right-8 lg:right-16 top-0 bottom-0 flex-col justify-center gap-4" style={{ width: 'min(40vw, 70vh, 480px)' }}>
            {SERVICES.map((s, i) => (
              <Layer key={s.number} depth={0.3 + i * 0.18}>
                <article className="p-6 lg:p-7" style={{ backgroundColor: 'rgba(255,255,255,0.94)', color: '#1A1A1A', borderRadius: 14, boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-display font-800" style={{ fontSize: '2rem', color: 'rgba(0,0,0,0.12)', lineHeight: 1 }}>{s.number}</span>
                    <h3 className="font-display font-700 text-xl">{s.title}</h3>
                  </div>
                  <p className="font-body text-sm leading-relaxed mt-3" style={{ color: '#6B6B6B' }}>{s.desc}</p>
                </article>
              </Layer>
            ))}
          </div>
        </Scene>

        <Scene index={2} shade={LEFT_SHADE}>
          <div className={LEFT_COL}>
            <Layer depth={0}>
              <p className={eyebrow} style={muted}>{t('about.eyebrow')}</p>
              <h2 className={h2} style={h2Size}>
                {t('about.titleLine1')}
                <br />
                <span style={muted}>{t('about.titleLine2')}</span>
              </h2>
            </Layer>
            <Layer depth={0.18} className="mt-6 space-y-4 font-body text-sm md:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
              <p>{t('about.paragraph1')}</p>
              <p className="hidden md:block">{t('about.paragraph2')}</p>
            </Layer>
            <Layer depth={0.3}>
              <Link href="/notre-histoire" className="mt-6 inline-flex items-center gap-2 font-body font-700 text-sm hover:opacity-70 transition-opacity">
                En savoir plus sur moi
                <ArrowRight size={15} />
              </Link>
            </Layer>
          </div>
        </Scene>

        <Scene index={3} shade={LEFT_SHADE}>
          <div className={LEFT_COL}>
            <Layer depth={0}>
              <p className={eyebrow} style={muted}>Portfolio</p>
              <h2 className={h2} style={h2Size}>Réalisations</h2>
            </Layer>
            <Layer depth={0.15} className="mt-6 font-body text-sm md:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
              <p>Des sites pensés sur mesure, pour de vraies entreprises de la Drôme.</p>
            </Layer>
            <Layer depth={0.25} className="md:hidden mt-5 flex flex-col gap-2">
              {works.map(w => (
                <a key={w.title} href={w.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-body font-700 text-sm">
                  {w.title}
                  <ArrowUpRight size={15} />
                </a>
              ))}
            </Layer>
          </div>
          <div className="hidden md:flex absolute right-8 lg:right-16 top-0 bottom-0 flex-col justify-center gap-5" style={{ width: 'min(42vw, 58vh, 520px)' }}>
            {works.map((w, i) => (
              <Layer key={w.title} depth={0.35 + i * 0.25} style={{ marginLeft: i === 1 ? '14%' : 0, marginRight: i === 0 ? '14%' : 0 }}>
                <a href={w.href} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden" style={{ borderRadius: 14, backgroundColor: '#FFFFFF', boxShadow: '0 24px 70px rgba(0,0,0,0.35)' }}>
                  <div className="overflow-hidden" style={{ aspectRatio: '1200 / 833' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={WORK_IMAGES[w.title] ?? w.image} alt={w.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5" style={{ color: '#1A1A1A' }}>
                    <div>
                      <p className="font-display font-700 text-base">{w.title}</p>
                      <p className="font-body text-[11px] tracking-[0.15em] uppercase" style={{ color: 'var(--rt-primary)' }}>{w.category}</p>
                    </div>
                    <ArrowUpRight size={18} style={{ color: 'rgba(0,0,0,0.4)' }} />
                  </div>
                </a>
              </Layer>
            ))}
          </div>
        </Scene>

        <Scene index={4} shade={LEFT_SHADE}>
          <div className={LEFT_COL}>
            <Layer depth={0}>
              <p className={eyebrow} style={muted}>{t('process.eyebrow')}</p>
              <h2 className={h2} style={{ fontSize: 'clamp(2rem, 3.6vw, 3.4rem)' }}>
                {t('process.titleLine1')}
                <br />
                <span style={muted}>{t('process.titleLine2')}</span>
              </h2>
            </Layer>
            <div className="mt-7 space-y-4 md:space-y-5">
              {STEPS.map((st, i) => (
                <Layer key={st.num} depth={0.15 + i * 0.12}>
                  <div className="flex gap-4">
                    <span className="font-display font-800 text-lg shrink-0" style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.3 }}>{st.num}</span>
                    <div>
                      <p className="font-display font-700 text-lg" style={{ lineHeight: 1.3 }}>
                        {st.title} <span className="font-body font-600 text-[10px] tracking-[0.18em] uppercase ml-1" style={muted}>{st.sub}</span>
                      </p>
                      <p className="relief-step-desc hidden md:block font-body text-sm leading-relaxed mt-1" style={{ color: 'rgba(255,255,255,0.72)' }}>{st.desc}</p>
                    </div>
                  </div>
                </Layer>
              ))}
            </div>
          </div>
        </Scene>

        <div className="absolute left-0 right-0 bottom-6 md:bottom-8 flex flex-col items-center gap-3 px-6 pointer-events-none">
          <div ref={navRef} className="flex gap-4 md:gap-7 pointer-events-auto" aria-label="Sections">
            {LABELS.map((label, i) => (
              <button key={label} onClick={() => goTo(i)} className="relief-tab font-body text-[10px] md:text-[11px] tracking-[0.18em] uppercase">
                <span className="hidden md:inline">{label}</span>
                <span className="md:hidden">{String(i + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
          <div className="w-full max-w-md h-px overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}>
            <div ref={barRef} className="h-full origin-left" style={{ backgroundColor: '#FFFFFF', transform: 'scaleX(0)' }} />
          </div>
        </div>

        <div ref={veilRef} aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ backgroundColor: 'var(--rt-primary)', opacity: 0 }} />
      </div>
    </div>
  )
}

'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { useModal } from '@/context/ModalContext'
import { useSiteTexts } from '@/lib/useSiteTexts'
import { SERVICES } from '@/components/sections/ServicesSection'
import { STEPS } from '@/components/sections/ProcessSection'
import { SERVICES_LIST } from '@/components/sections/ServicesPageContent'
import { DARK, smoothstep, watchScroll } from './scrollLoop'
import type { ReliefImage, ReliefRenderer } from './ReliefRenderer'

/* Frise horizontale : on descend a la molette, chaque scene arrive de la
   droite. Photos en relief (carte de profondeur : le premier plan entre
   avant le fond), textes en couches decalees. */

const R = '/images/relief/'
const IMAGES: ReliefImage[] = [
  { src: R + 'bureau.jpg', depth: R + 'bureau-profondeur.jpg', focus: [0.34, 0.5] },
  { src: R + 'jardin.jpg', depth: R + 'jardin-profondeur.jpg', focus: [0.5, 0.6] },
  { src: R + 'telephones.jpg', depth: R + 'telephones-profondeur.jpg', focus: [0.5, 0.5], fitX: 0.7 },
  { src: R + 'roman.jpg', depth: R + 'roman-profondeur.jpg', focus: [0.5, 0.42], fitX: 0.7 },
]
const LABELS = ['Services', 'Et aussi', 'Processus', 'Qui sommes-nous']
const N = IMAGES.length
const END_HOLD = 0.5
const UNITS = N - 1 + END_HOLD
const SCREEN_PER_UNIT = 130
const EXTRAS = SERVICES_LIST.filter(s => !/vitrine|e-commerce/i.test(s.title))

/* Un temps de pause sur chaque scene, puis le glissement vers la suivante. */
function frieze(p: number) {
  const u = p * UNITS
  const i = Math.floor(u)
  if (i >= N - 1) return N - 1
  return i + smoothstep(0.28, 1, u - i)
}

function Layer({ depth, className, style, children }: { depth: number; className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <div data-depth={depth} className={className} style={style}>
      {children}
    </div>
  )
}

function Scene({ index, children }: { index: number; children: ReactNode }) {
  return (
    <section
      data-scene={index}
      aria-label={LABELS[index]}
      className="absolute inset-0 text-white"
      style={{ transform: `translate3d(${index * 100}%, 0, 0)`, visibility: index === 0 ? 'visible' : 'hidden' }}
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: SHADE }} />
      {children}
    </section>
  )
}

const SHADE =
  'linear-gradient(90deg, rgba(8,10,14,0.8) 0%, rgba(8,10,14,0.52) 38%, rgba(8,10,14,0.1) 70%), linear-gradient(180deg, rgba(8,10,14,0.5) 0%, rgba(8,10,14,0) 22%)'
const LEFT_COL = 'absolute left-0 top-0 bottom-0 flex flex-col justify-end md:justify-center px-6 pb-24 md:pb-0 md:pl-12 lg:pl-20 w-full md:w-[46%] lg:w-[40%]'
const RIGHT_COL = 'hidden md:flex absolute right-8 lg:right-16 top-0 bottom-0 flex-col justify-center gap-4'
const eyebrow = 'font-body text-xs tracking-[0.25em] uppercase mb-4'
const h2 = 'font-display font-800 leading-[0.95]'
const h2Size = { fontSize: 'clamp(2.3rem, 5vw, 4.6rem)' }
const muted = { color: 'rgba(255,255,255,0.6)' }
const card: CSSProperties = { backgroundColor: 'rgba(255,255,255,0.94)', color: '#1A1A1A', borderRadius: 14, boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }

export function ReliefFrieze() {
  const { openDevis } = useModal()
  const t = useSiteTexts()
  const wrapRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

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
    let alive = true
    let slowFrames = 0

    const onMouse = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      renderer?.setMouse((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMouse, { passive: true })
    const ro = new ResizeObserver(() => renderer?.resize())
    ro.observe(stage)

    const stop = watchScroll(wrap, ({ p, dt, now, visible }) => {
      if (!visible) return
      const x = frieze(p)
      for (const s of scenes) {
        const rel = s.index - x
        const shown = rel > -1.02 && rel < 1.02
        s.el.style.visibility = shown ? 'visible' : 'hidden'
        if (!shown) continue
        s.el.style.transform = `translate3d(${rel * 100}%, 0, 0)`
        for (const l of s.layers) {
          const o = 1 - Math.min(1, Math.max(0, Math.abs(rel) * (1.4 + l.depth) - 0.08))
          l.el.style.transform = `translate3d(${rel * l.depth * 38}vw, 0, 0)`
          l.el.style.opacity = String(o)
        }
      }
      const active = Math.round(x)
      tabs.forEach((b, i) => { b.dataset.active = i === active ? '1' : '0' })
      if (barRef.current) barRef.current.style.transform = `scaleX(${x / (N - 1)})`
      if (renderer) {
        renderer.render(x, now / 1000)
        if (!document.hidden) {
          slowFrames = dt > 1 / 45 ? slowFrames + 1 : Math.max(0, slowFrames - 1)
          if (slowFrames > 90) {
            slowFrames = 0
            renderer.lowerQuality()
          }
        }
      }
    })

    import('./ReliefRenderer').then(async ({ ReliefRenderer }) => {
      if (!alive) return
      try {
        const r = new ReliefRenderer(canvas)
        r.resize()
        await r.load(IMAGES, () => {})
        if (!alive) return r.dispose()
        renderer = r
        setReady(true)
      } catch {}
    })

    return () => {
      alive = false
      stop()
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

  return (
    <div
      id="services"
      ref={wrapRef}
      className="relative"
      style={{ height: `${UNITS * SCREEN_PER_UNIT + 100}svh`, zIndex: 1, backgroundColor: DARK, boxShadow: '0 -40px 80px rgba(0,0,0,0.45)' }}
    >
      <div
        ref={stageRef}
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '100svh', backgroundImage: `url(${IMAGES[0].src})`, backgroundSize: 'cover', backgroundPosition: '34% center' }}
      >
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full" style={{ opacity: ready ? 1 : 0, transition: 'opacity 1s ease' }} />

        <Scene index={0}>
          <div className={LEFT_COL}>
            <Layer depth={0}>
              <p className={eyebrow} style={muted}>{t('services.eyebrow')}</p>
              <h2 className={h2} style={h2Size}>
                {t('services.titleLine1')}
                <br />
                <span style={muted}>{t('services.titleLine2')}</span>
              </h2>
            </Layer>
            <Layer depth={0.12} className="mt-6 font-body text-sm md:text-base leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.82)' }}>
              <p>Un site pour vous présenter, une boutique pour vendre, et le référencement pour être trouvé sur Google.</p>
            </Layer>
            <Layer depth={0.2} className="mt-7">
              <button onClick={openDevis} className="font-body font-700 text-sm px-6 py-3 transition-opacity duration-200 hover:opacity-80" style={{ backgroundColor: 'var(--rt-primary)', color: '#FFFFFF' }}>
                On en parle gratuitement
              </button>
            </Layer>
            <Layer depth={0.28} className="md:hidden mt-6 space-y-1.5 font-body text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {SERVICES.map(s => <p key={s.number}><span style={muted}>{s.number}</span> {s.title}</p>)}
            </Layer>
          </div>
          <div className={RIGHT_COL} style={{ width: 'min(40vw, 70vh, 480px)' }}>
            {SERVICES.map((s, i) => (
              <Layer key={s.number} depth={0.3 + i * 0.18}>
                <article className="p-6 lg:p-7" style={card}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-display font-800" style={{ fontSize: '2rem', color: 'rgba(0,0,0,0.12)', lineHeight: 1 }}>{s.number}</span>
                    <h3 className="font-display font-700 text-xl">{s.title}</h3>
                  </div>
                  <p className="font-body text-sm leading-relaxed mt-3" style={{ color: '#6B6B6B' }}>{s.desc}</p>
                  <p className="relief-step-desc font-body text-xs mt-3" style={{ color: '#888888' }}>{s.points.join(' · ')}</p>
                </article>
              </Layer>
            ))}
          </div>
        </Scene>

        <Scene index={1}>
          <div className={LEFT_COL}>
            <Layer depth={0}>
              <p className={eyebrow} style={muted}>Et aussi</p>
              <h2 className={h2} style={h2Size}>
                Votre site existe déjà ?
                <br />
                <span style={muted}>Rendons-le meilleur.</span>
              </h2>
            </Layer>
            <Layer depth={0.2} className="md:hidden mt-6 space-y-1.5 font-body text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {EXTRAS.map(s => <p key={s.title}>{s.title}</p>)}
            </Layer>
          </div>
          <div className={RIGHT_COL} style={{ width: 'min(40vw, 70vh, 480px)' }}>
            {EXTRAS.map((s, i) => (
              <Layer key={s.title} depth={0.3 + i * 0.18}>
                <article className="p-6 lg:p-7" style={card}>
                  <h3 className="font-display font-700 text-xl">{s.title}</h3>
                  <p className="font-body text-sm leading-relaxed mt-2" style={{ color: '#6B6B6B' }}>{s.description}</p>
                  <p className="relief-step-desc font-body text-xs mt-3" style={{ color: '#888888' }}>{s.details.join(' · ')}</p>
                </article>
              </Layer>
            ))}
          </div>
        </Scene>

        <Scene index={2}>
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

        <Scene index={3}>
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
              <a href="#a-propos" className="mt-6 inline-flex items-center gap-2 font-body font-700 text-sm hover:opacity-70 transition-opacity">
                Mon histoire
                <ArrowRight size={15} />
              </a>
            </Layer>
          </div>
        </Scene>

        <div className="absolute left-0 right-0 bottom-6 md:bottom-8 flex flex-col items-center gap-3 px-6 pointer-events-none">
          <div ref={navRef} className="flex gap-4 md:gap-7 pointer-events-auto" aria-label="Scènes">
            {LABELS.map((label, i) => (
              <button key={label} onClick={() => goTo(i)} className="relief-tab font-body text-[10px] md:text-[11px] tracking-[0.18em] uppercase" data-active={i === 0 ? '1' : '0'}>
                <span className="hidden md:inline">{label}</span>
                <span className="md:hidden">{String(i + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
          <div className="w-full max-w-md h-px overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}>
            <div ref={barRef} className="h-full origin-left" style={{ backgroundColor: '#FFFFFF', transform: 'scaleX(0)' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

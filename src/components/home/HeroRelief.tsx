'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, Phone } from 'lucide-react'
import { useModal } from '@/context/ModalContext'
import { useSiteTexts } from '@/lib/useSiteTexts'
import { HERO_FONT, insecable } from './scrollLoop'
import type { ReliefRenderer } from './ReliefRenderer'

/* Accueil facon leome-and-partners.com : il reste colle a l'ecran pendant
   que la section suivante monte et le recouvre. Pendant ce temps la photo
   (en relief) zoome doucement et s'assombrit. */

const IMAGE = { src: '/images/relief/montagne.jpg', depth: '/images/relief/montagne-profondeur.jpg', focus: [0.5, 0.5] as [number, number] }

export function HeroRelief() {
  const { openDevis } = useModal()
  const t = useSiteTexts()
  const heroRef = useRef<HTMLElement>(null)
  const zoomRef = useRef<HTMLDivElement>(null)
  const dimRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const hero = heroRef.current!
    const canvas = canvasRef.current!
    let renderer: ReliefRenderer | null = null
    let alive = true
    let raf = 0

    const onMouse = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      renderer?.setMouse((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMouse, { passive: true })
    const ro = new ResizeObserver(() => renderer?.resize())
    ro.observe(canvas)

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const parent = hero.parentElement!.getBoundingClientRect()
      const cover = Math.min(1, Math.max(0, -parent.top / window.innerHeight))
      if (zoomRef.current) zoomRef.current.style.transform = `scale(${1 + cover * 0.2})`
      if (dimRef.current) dimRef.current.style.opacity = String(cover * 0.7)
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(0, ${cover * -8}vh, 0) scale(${1 - cover * 0.06})`
        textRef.current.style.opacity = String(1 - cover * 0.9)
      }
      if (renderer && cover < 1) renderer.render(0, now / 1000)
    }
    raf = requestAnimationFrame(tick)

    import('./ReliefRenderer').then(async ({ ReliefRenderer }) => {
      if (!alive) return
      try {
        const r = new ReliefRenderer(canvas)
        r.resize()
        await r.load([IMAGE], () => {})
        if (!alive) return r.dispose()
        renderer = r
        setReady(true)
      } catch {}
    })

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMouse)
      ro.disconnect()
      renderer?.dispose()
    }
  }, [])

  const next = () => {
    const parent = heroRef.current?.parentElement
    if (parent) window.scrollTo({ top: parent.offsetTop + window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section ref={heroRef} className="sticky top-0 w-full overflow-hidden text-white" style={{ height: '100svh', zIndex: 0 }}>
      <div ref={zoomRef} className="absolute inset-0" style={{ backgroundImage: `url(${IMAGE.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full" style={{ opacity: ready ? 1 : 0, transition: 'opacity 1.2s ease' }} />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(60% 50% at 50% 50%, rgba(10,14,22,0.4) 0%, rgba(10,14,22,0) 100%), linear-gradient(180deg, rgba(10,14,22,0.5) 0%, rgba(10,14,22,0.2) 35%, rgba(10,14,22,0.25) 65%, rgba(10,14,22,0.6) 100%)' }}
      />
      <div ref={dimRef} aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ backgroundColor: '#050608', opacity: 0 }} />

      <div ref={textRef} className="relative h-full flex flex-col items-center justify-center text-center px-6" style={{ paddingTop: 80, textShadow: '0 4px 40px rgba(0,0,0,0.25)' }}>
        <p className="hero-rise uppercase mb-6 md:mb-8" style={{ ...HERO_FONT, color: 'rgba(255,255,255,0.9)', fontWeight: 600, letterSpacing: '0.18em', fontSize: 'clamp(0.75rem, 1vw, 0.95rem)' }}>
          {t('hero.eyebrow')}
        </p>
        <div className="overflow-hidden">
          <h1 className="hero-rise uppercase" style={{ ...HERO_FONT, fontWeight: 650, lineHeight: 0.9, letterSpacing: '-0.02em', fontSize: 'clamp(3.4rem, 11vw, 10.5rem)', animationDelay: '0.1s' }}>
            {insecable(t('hero.title'))}
          </h1>
        </div>
        <div className="overflow-hidden mt-3 md:mt-4">
          <p className="hero-rise" style={{ ...HERO_FONT, fontWeight: 550, lineHeight: 1.05, fontSize: 'clamp(1.6rem, 4.2vw, 3.8rem)', animationDelay: '0.22s' }}>
            {insecable(t('hero.subtitle'))}
          </p>
        </div>
        <div className="hero-rise flex flex-wrap justify-center gap-3 md:gap-4 mt-10 md:mt-12" style={{ animationDelay: '0.45s' }}>
          <button
            onClick={openDevis}
            className="flex items-center gap-2.5 uppercase px-8 py-4 transition-transform duration-200 hover:-translate-y-0.5"
            style={{ ...HERO_FONT, borderRadius: '999px', backgroundColor: '#FFFFFF', color: 'var(--rt-primary)', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.06em', textShadow: 'none' }}
          >
            <Phone size={15} />
            Appel gratuit (15 min)
          </button>
          <a
            href="#realisations"
            className="flex items-center gap-2 uppercase px-8 py-4 transition-colors duration-200 hover:bg-white/10"
            style={{ ...HERO_FONT, borderRadius: '999px', color: '#FFFFFF', border: '1.5px solid rgba(255,255,255,0.85)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.06em' }}
          >
            Voir mes réalisations
            <ArrowRight size={15} />
          </a>
        </div>
        <button
          type="button"
          onClick={next}
          aria-label="Descendre vers la suite"
          className="relief-scroll absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-10 flex items-center justify-center relief-bob"
          style={{ borderRadius: '999px', width: 52, height: 52, backgroundColor: 'var(--rt-primary)' }}
        >
          <ArrowDown size={22} />
        </button>
      </div>
    </section>
  )
}

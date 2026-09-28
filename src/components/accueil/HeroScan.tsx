'use client'

import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowRight, Phone } from 'lucide-react'
import { useModal } from '@/context/ModalContext'
import { useSiteTexts } from '@/lib/useSiteTexts'
import { TopoField } from './TopoField'
import { DISPLAY_FONT, accentColor, clamp, insecable, reducedMotion } from './anim'

/* Accueil facon landonorris.com : Roman detoure au centre, et sous la souris
   apparait le « scan » de son visage (ses courbes de niveau en bleu), comme
   le casque sous le visage de Lando. Sans souris, un pinceau automatique
   balaie le visage tout seul. */

const PHOTO = '/images/accueil/roman-detoure.webp'
const LINES = '/images/accueil/roman-lignes.png'

export function HeroScan() {
  const { openDevis } = useModal()
  const t = useSiteTexts()
  const rootRef = useRef<HTMLElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current!
    const box = boxRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const still = reducedMotion()

    const trail = document.createElement('canvas')
    const tctx = trail.getContext('2d')!
    const scan = document.createElement('canvas')
    const sctx = scan.getContext('2d')!
    const photo = new Image()
    const lines = new Image()
    photo.src = PHOTO
    lines.src = LINES
    let ready = false
    let color = accentColor()

    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio, 2)
    const pointer = { x: 0.5, y: 0.4, tx: 0.5, ty: 0.4, last: -9999, inside: false }
    let raf = 0
    let visible = true

    const buildScan = () => {
      if (!ready || !w) return
      scan.width = canvas.width
      scan.height = canvas.height
      sctx.clearRect(0, 0, scan.width, scan.height)
      sctx.drawImage(photo, 0, 0, scan.width, scan.height)
      sctx.globalCompositeOperation = 'source-in'
      sctx.fillStyle = '#EEF3FC'
      sctx.fillRect(0, 0, scan.width, scan.height)
      sctx.globalCompositeOperation = 'source-over'
      const tmp = document.createElement('canvas')
      tmp.width = scan.width
      tmp.height = scan.height
      const t2 = tmp.getContext('2d')!
      t2.drawImage(lines, 0, 0, tmp.width, tmp.height)
      t2.globalCompositeOperation = 'source-in'
      t2.fillStyle = color
      t2.fillRect(0, 0, tmp.width, tmp.height)
      sctx.drawImage(tmp, 0, 0)
    }

    const resize = () => {
      const r = box.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      trail.width = Math.max(1, Math.round(w / 4))
      trail.height = Math.max(1, Math.round(h / 4))
      buildScan()
    }

    Promise.all([photo.decode(), lines.decode()]).then(() => {
      ready = true
      buildScan()
    }).catch(() => {})

    const onMove = (e: PointerEvent) => {
      const r = box.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      pointer.inside = x > -0.1 && x < 1.1 && y > -0.1 && y < 1.1
      if (!pointer.inside) return
      pointer.tx = x
      pointer.ty = y
      pointer.last = performance.now()
    }

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (!visible || !ready) return
      const idle = now - pointer.last > 2200
      if (idle) {
        const s = now / 1000
        pointer.tx = 0.5 + Math.sin(s * 0.9) * 0.26 + Math.sin(s * 2.1) * 0.05
        pointer.ty = 0.42 + Math.sin(s * 0.63 + 1) * 0.22
      }
      pointer.x += (pointer.tx - pointer.x) * (idle ? 0.06 : 0.18)
      pointer.y += (pointer.ty - pointer.y) * (idle ? 0.06 : 0.18)

      tctx.globalCompositeOperation = 'destination-out'
      tctx.fillStyle = 'rgba(0,0,0,0.045)'
      tctx.fillRect(0, 0, trail.width, trail.height)
      tctx.globalCompositeOperation = 'source-over'
      const px = pointer.x * trail.width
      const py = pointer.y * trail.height
      const rad = trail.width * 0.2
      const g = tctx.createRadialGradient(px, py, 0, px, py, rad)
      g.addColorStop(0, 'rgba(0,0,0,1)')
      g.addColorStop(0.55, 'rgba(0,0,0,0.85)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      tctx.fillStyle = g
      tctx.beginPath()
      tctx.arc(px, py, rad, 0, Math.PI * 2)
      tctx.fill()

      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(scan, 0, 0)
      ctx.globalCompositeOperation = 'destination-in'
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(trail, 0, 0, canvas.width, canvas.height)

      if (hintRef.current) {
        hintRef.current.style.transform = `translate3d(${pointer.x * w}px, ${pointer.y * h}px, 0) translate(-50%, -50%)`
        hintRef.current.style.opacity = idle ? '1' : '0'
      }

      const r = root.getBoundingClientRect()
      const out = clamp(-r.top / r.height)
      box.style.transform = `translate3d(0, ${out * 14}vh, 0) scale(${1 - out * 0.08})`
      if (titleRef.current) titleRef.current.style.transform = `translate3d(0, ${out * -10}vh, 0)`
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(box)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(root)
    const mo = new MutationObserver(() => {
      color = accentColor()
      buildScan()
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] })
    if (!still) {
      raf = requestAnimationFrame(tick)
      window.addEventListener('pointermove', onMove, { passive: true })
    }
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <section ref={rootRef} className="relative overflow-hidden" style={{ height: '100svh', minHeight: 640, backgroundColor: 'var(--rt-bg)' }}>
      <TopoField opacity={0.13} />

      <div ref={titleRef} className="absolute inset-x-0 top-[17svh] md:top-[15svh] flex flex-col items-center text-center px-4 pointer-events-none" style={{ zIndex: 1 }}>
        <p className="acc-rise uppercase mb-3 md:mb-5" style={{ ...DISPLAY_FONT, color: 'var(--rt-muted)', fontWeight: 600, letterSpacing: '0.2em', fontSize: 'clamp(0.7rem, 0.95vw, 0.9rem)' }}>
          {t('hero.eyebrow')}
        </p>
        <h1 className="uppercase" style={{ ...DISPLAY_FONT, color: 'var(--rt-primary)', fontWeight: 700, lineHeight: 0.85, letterSpacing: '-0.035em', fontSize: 'clamp(3.2rem, 12vw, 13rem)' }}>
          <span className="acc-rise-mask"><span className="acc-rise" style={{ animationDelay: '0.15s' }}>{insecable(t('hero.title'))}</span></span>
        </h1>
      </div>

      <div ref={boxRef} className="absolute left-1/2 bottom-0 -translate-x-1/2" style={{ zIndex: 2, height: 'min(78svh, 900px)', aspectRatio: '900 / 1200' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={PHOTO} alt="Roman Tabardel, créateur de sites web" className="acc-hero-photo absolute inset-0 w-full h-full select-none" draggable={false} fetchPriority="high" />
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />
        <div ref={hintRef} aria-hidden="true" className="absolute left-0 top-0 hidden md:flex items-center justify-center pointer-events-none transition-opacity duration-500" style={{ width: 92, height: 92, borderRadius: 999, border: '1px solid color-mix(in srgb, var(--rt-primary) 55%, transparent)', color: 'var(--rt-primary)', opacity: 0 }}>
          <span className="font-body text-[9px] font-700 tracking-[0.18em] uppercase text-center leading-tight">Passez<br />la souris</span>
        </div>
      </div>

      <div className="hidden md:block absolute left-8 bottom-8 acc-rise" style={{ zIndex: 3, animationDelay: '0.6s' }}>
        <div className="acc-card p-4 md:p-5 w-[min(62vw,260px)]">
          <p className="flex items-center gap-2 font-body text-[10px] font-700 tracking-[0.2em] uppercase" style={{ color: 'var(--rt-muted)' }}>
            <span className="acc-pulse" /> Disponible
          </p>
          <p className="mt-2 font-display font-700 leading-tight" style={{ color: 'var(--rt-ink)', fontSize: 'clamp(1.05rem, 1.5vw, 1.35rem)' }}>
            {insecable(t('hero.subtitle'))}
          </p>
          <p className="mt-2 font-body text-xs leading-relaxed hidden md:block" style={{ color: 'var(--rt-muted)' }}>
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

'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import { accentColor, reducedMotion } from './anim'

/* Portrait detoure de Roman : sous la souris apparait le « scan » de son
   visage (ses courbes de niveau en bleu), comme le casque sous le visage de
   Lando. Sans souris, un pinceau automatique balaie le visage tout seul. */

const PHOTO = '/images/accueil/roman-detoure.webp'
const LINES = '/images/accueil/roman-lignes.png'

/* seeThrough : la ou passe la souris, la photo devient transparente (on voit ce
   qu'il y a derriere, par exemple un texte cache par la tete) et seules les
   courbes de niveau bleues restent dessinees par-dessus. */
export function ScanPortrait({ className = '', style, priority = false, seeThrough = false }: { className?: string; style?: CSSProperties; priority?: boolean; seeThrough?: boolean }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const box = boxRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const still = reducedMotion()

    const trail = document.createElement('canvas')
    const tctx = trail.getContext('2d')!
    const scan = document.createElement('canvas')
    const sctx = scan.getContext('2d')!
    const mix = document.createElement('canvas')
    const mctx = mix.getContext('2d')!
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
      mix.width = canvas.width
      mix.height = canvas.height
      if (!seeThrough) {
        sctx.drawImage(photo, 0, 0, scan.width, scan.height)
        sctx.globalCompositeOperation = 'source-in'
        sctx.fillStyle = '#EEF3FC'
        sctx.fillRect(0, 0, scan.width, scan.height)
        sctx.globalCompositeOperation = 'source-over'
      }
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
      if (seeThrough && !still && imgRef.current) imgRef.current.style.visibility = 'hidden'
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

      ctx.imageSmoothingEnabled = true
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (seeThrough) {
        ctx.drawImage(photo, 0, 0, canvas.width, canvas.height)
        ctx.globalCompositeOperation = 'destination-out'
        ctx.drawImage(trail, 0, 0, canvas.width, canvas.height)
        mctx.globalCompositeOperation = 'source-over'
        mctx.clearRect(0, 0, mix.width, mix.height)
        mctx.globalAlpha = 0.5
        mctx.drawImage(scan, 0, 0)
        mctx.globalAlpha = 1
        mctx.globalCompositeOperation = 'destination-in'
        mctx.drawImage(trail, 0, 0, mix.width, mix.height)
        ctx.globalCompositeOperation = 'source-over'
        ctx.drawImage(mix, 0, 0)
      } else {
        ctx.drawImage(scan, 0, 0)
        ctx.globalCompositeOperation = 'destination-in'
        ctx.drawImage(trail, 0, 0, canvas.width, canvas.height)
      }

      if (hintRef.current) {
        hintRef.current.style.transform = `translate3d(${pointer.x * w}px, ${pointer.y * h}px, 0) translate(-50%, -50%)`
        hintRef.current.style.opacity = idle ? '1' : '0'
      }

    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(box)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(box)
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
  }, [seeThrough])

  return (
    <div ref={boxRef} className={className} style={{ aspectRatio: '900 / 1200', ...style }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={imgRef} src={PHOTO} alt="Roman Tabardel, créateur de sites web" className="acc-hero-photo absolute inset-0 w-full h-full select-none" draggable={false} fetchPriority={priority ? 'high' : 'auto'} />
      <canvas ref={canvasRef} aria-hidden="true" className={`absolute inset-0 w-full h-full pointer-events-none ${seeThrough ? 'acc-hero-photo' : ''}`} />
      <div ref={hintRef} aria-hidden="true" className="absolute left-0 top-0 hidden md:flex items-center justify-center pointer-events-none transition-opacity duration-500" style={{ width: 92, height: 92, borderRadius: 999, border: '1px solid color-mix(in srgb, var(--rt-primary) 55%, transparent)', color: 'var(--rt-primary)', opacity: 0 }}>
        <span className="font-body text-[9px] font-700 tracking-[0.18em] uppercase text-center leading-tight">Passez<br />la souris</span>
      </div>
    </div>
  )
}

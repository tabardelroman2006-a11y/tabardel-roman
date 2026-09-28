'use client'

import { useEffect, useRef } from 'react'
import { SafeImg } from './SafeImg'
import { reducedMotion } from './anim'

/* Photo detouree (seulement la personne, posee sur le fond de la page) : la
   ou passe la souris, la photo d'origine reapparait avec son vrai decor.
   Sans souris, un pinceau automatique fait apparaitre le decor par moments. */
export function RevealPhoto({ cutout, full, alt, ratio, className = '' }: { cutout: string; full: string; alt: string; ratio: string; className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (reducedMotion()) return
    const box = boxRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const trail = document.createElement('canvas')
    const tctx = trail.getContext('2d')!
    const photo = new Image()
    photo.src = full
    let ready = false
    photo.decode().then(() => { ready = true }).catch(() => {})

    const dpr = Math.min(window.devicePixelRatio, 2)
    const pointer = { x: 0.5, y: 0.4, tx: 0.5, ty: 0.4, last: -9999 }
    let raf = 0
    let visible = true

    const resize = () => {
      const r = box.getBoundingClientRect()
      canvas.width = Math.round(r.width * dpr)
      canvas.height = Math.round(r.height * dpr)
      trail.width = Math.max(1, Math.round(r.width / 4))
      trail.height = Math.max(1, Math.round(r.height / 4))
    }

    const onMove = (e: PointerEvent) => {
      const r = box.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      if (x < -0.1 || x > 1.1 || y < -0.1 || y > 1.1) return
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
        pointer.tx = 0.5 + Math.sin(s * 0.7) * 0.38
        pointer.ty = 0.4 + Math.sin(s * 0.53 + 1.3) * 0.3
      }
      pointer.x += (pointer.tx - pointer.x) * (idle ? 0.05 : 0.18)
      pointer.y += (pointer.ty - pointer.y) * (idle ? 0.05 : 0.18)

      tctx.globalCompositeOperation = 'destination-out'
      tctx.fillStyle = 'rgba(0,0,0,0.04)'
      tctx.fillRect(0, 0, trail.width, trail.height)
      tctx.globalCompositeOperation = 'source-over'
      const px = pointer.x * trail.width
      const py = pointer.y * trail.height
      const rad = trail.width * 0.24
      const g = tctx.createRadialGradient(px, py, 0, px, py, rad)
      g.addColorStop(0, 'rgba(0,0,0,1)')
      g.addColorStop(0.5, 'rgba(0,0,0,0.9)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      tctx.fillStyle = g
      tctx.beginPath()
      tctx.arc(px, py, rad, 0, Math.PI * 2)
      tctx.fill()

      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(photo, 0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'destination-in'
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(trail, 0, 0, canvas.width, canvas.height)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(box)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(box)
    raf = requestAnimationFrame(tick)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [full])

  return (
    <div className={`flex justify-center ${className}`}>
      <div ref={boxRef} className="acc-hero-photo relative h-full" style={{ aspectRatio: ratio, maskImage: 'linear-gradient(to bottom, #000 80%, transparent 99%)', WebkitMaskImage: 'linear-gradient(to bottom, #000 80%, transparent 99%)' }}>
        <SafeImg src={cutout} alt={alt} className="absolute inset-0 w-full h-full select-none" draggable={false} />
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" style={{ borderRadius: 24 }} />
      </div>
    </div>
  )
}

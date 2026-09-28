'use client'

import { useEffect, useRef } from 'react'
import { accentColor, reducedMotion } from './anim'

/* Fond de courbes de niveau (carte topographique) qui ondulent lentement.
   La souris souleve une petite colline : les lignes s'enroulent autour. */

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return s - Math.floor(s)
}
function noise(x: number, y: number) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const u = xf * xf * (3 - 2 * xf)
  const v = yf * yf * (3 - 2 * yf)
  const a = hash(xi, yi)
  const b = hash(xi + 1, yi)
  const c = hash(xi, yi + 1)
  const d = hash(xi + 1, yi + 1)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}

export function TopoField({ opacity = 0.16, levels = 14, className = '' }: { opacity?: number; levels?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const still = reducedMotion()
    let w = 0
    let h = 0
    let dpr = 1
    const STEP = 16
    let cols = 0
    let rows = 0
    let field = new Float32Array(0)
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, s: 0 }
    let color = accentColor()
    let raf = 0
    let visible = true
    let last = 0

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio, 1.5)
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      cols = Math.ceil(w / STEP) + 2
      rows = Math.ceil(h / STEP) + 2
      field = new Float32Array(cols * rows)
    }

    const draw = (t: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.08
      mouse.y += (mouse.ty - mouse.y) * 0.08
      const k = 1 / 260
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * STEP
          const y = j * STEP
          let v = noise(x * k + t * 0.02, y * k - t * 0.015) * 0.7 + noise(x * k * 2.3 - t * 0.03, y * k * 2.3) * 0.3
          const dx = x - mouse.x
          const dy = y - mouse.y
          v += Math.exp(-(dx * dx + dy * dy) / 18000) * 0.28 * mouse.s
          field[j * cols + i] = v
        }
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = color
      ctx.globalAlpha = opacity
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let l = 1; l < levels; l++) {
        const iso = l / levels
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const a = field[j * cols + i]
            const b = field[j * cols + i + 1]
            const c = field[(j + 1) * cols + i + 1]
            const d = field[(j + 1) * cols + i]
            const idx = (a > iso ? 8 : 0) | (b > iso ? 4 : 0) | (c > iso ? 2 : 0) | (d > iso ? 1 : 0)
            if (idx === 0 || idx === 15) continue
            const x = i * STEP
            const y = j * STEP
            const top = [x + STEP * ((iso - a) / (b - a)), y] as const
            const right = [x + STEP, y + STEP * ((iso - b) / (c - b))] as const
            const bottom = [x + STEP * ((iso - d) / (c - d)), y + STEP] as const
            const left = [x, y + STEP * ((iso - a) / (d - a))] as const
            const seg = (p: readonly [number, number], q: readonly [number, number]) => {
              ctx.moveTo(p[0], p[1])
              ctx.lineTo(q[0], q[1])
            }
            switch (idx) {
              case 1: case 14: seg(left, bottom); break
              case 2: case 13: seg(bottom, right); break
              case 3: case 12: seg(left, right); break
              case 4: case 11: seg(top, right); break
              case 5: seg(left, top); seg(bottom, right); break
              case 6: case 9: seg(top, bottom); break
              case 7: case 8: seg(left, top); break
              case 10: seg(left, bottom); seg(top, right); break
            }
          }
        }
      }
      ctx.stroke()
      ctx.globalAlpha = 1
    }

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (!visible || now - last < 33) return
      last = now
      mouse.s += ((mouse.tx > -9000 ? 1 : 0) - mouse.s) * 0.05
      draw(now / 1000)
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.tx = e.clientX - r.left
      mouse.ty = e.clientY - r.top
      if (mouse.x < -9000) {
        mouse.x = mouse.tx
        mouse.y = mouse.ty
      }
    }
    const onLeave = () => {
      mouse.tx = -9999
    }

    resize()
    const ro = new ResizeObserver(() => {
      resize()
      if (still) draw(0)
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)
    const mo = new MutationObserver(() => { color = accentColor() })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] })

    if (still) draw(0)
    else {
      raf = requestAnimationFrame(tick)
      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerleave', onLeave)
    }
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [opacity, levels])

  return <canvas ref={ref} aria-hidden="true" className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} />
}

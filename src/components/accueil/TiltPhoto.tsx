'use client'

import { useRef } from 'react'
import { SafeImg } from './SafeImg'
import { reducedMotion } from './anim'

/* Photo encadree qui s'incline en 3D en suivant la souris, avec une etiquette
   qui flotte devant elle (effet de profondeur). */
export function TiltPhoto({ src, alt, badge, className = '' }: { src: string; alt: string; badge?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || reducedMotion() || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`
  }
  const leave = () => {
    if (ref.current) ref.current.style.transform = 'rotateY(0deg) rotateX(0deg)'
  }

  return (
    <div className={`flex justify-center ${className}`} style={{ perspective: 1100 }} onPointerMove={move} onPointerLeave={leave}>
      <div ref={ref} className="acc-hero-photo relative h-full" style={{ transformStyle: 'preserve-3d', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)', aspectRatio: '3 / 4' }}>
        <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 26, border: '8px solid #FFFFFF', boxShadow: '0 40px 90px color-mix(in srgb, var(--rt-primary) 28%, transparent)' }}>
          <SafeImg src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
        {badge && (
          <div className="acc-card absolute -left-6 bottom-10 px-5 py-4" style={{ transform: 'translateZ(60px)' }}>
            <p className="flex items-center gap-2 font-body text-[10px] font-700 tracking-[0.2em] uppercase" style={{ color: 'var(--rt-muted)' }}>
              <span className="acc-pulse" /> Disponible
            </p>
            <p className="mt-1 font-display font-700 text-lg" style={{ color: 'var(--rt-ink)' }}>{badge}</p>
          </div>
        )}
      </div>
    </div>
  )
}

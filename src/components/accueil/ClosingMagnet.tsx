'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Phone } from 'lucide-react'
import { useModal } from '@/context/ModalContext'
import { Reveal } from './Reveal'
import { DISPLAY_FONT, reducedMotion } from './anim'

/* Conclusion des pages interieures (differente de l'accueil) : un grand
   bouton rond qui est attire par la souris, entoure d'un texte qui tourne. */

export function ClosingMagnet({ title, line }: { title: string; line: string }) {
  const { openDevis } = useModal()
  const zoneRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (reducedMotion()) return
    const zone = zoneRef.current!
    const btn = btnRef.current!
    const target = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }
    let raf = 0
    const onMove = (e: PointerEvent) => {
      const r = zone.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const d = Math.hypot(dx, dy)
      const pull = d < r.width * 0.75 ? 0.35 : 0
      target.x = dx * pull
      target.y = dy * pull
    }
    const tick = () => {
      raf = requestAnimationFrame(tick)
      cur.x += (target.x - cur.x) * 0.12
      cur.y += (target.y - cur.y) * 0.12
      btn.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <section className="px-5 md:px-12 lg:px-20 py-24 md:py-36 overflow-hidden" style={{ backgroundColor: 'var(--rt-bg)' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-14 items-center">
        <Reveal>
          <h2 className="uppercase" style={{ ...DISPLAY_FONT, color: 'var(--rt-primary)', fontWeight: 700, lineHeight: 0.88, letterSpacing: '-0.035em', fontSize: 'clamp(2.8rem, 7vw, 7rem)' }}>
            {title}
          </h2>
          <p className="mt-6 font-body text-base md:text-lg leading-relaxed max-w-lg" style={{ color: 'var(--rt-muted)' }}>{line}</p>
          <Link href="/contact" className="acc-btn acc-btn-ghost mt-8">
            Page contact
            <ArrowUpRight size={15} />
          </Link>
        </Reveal>

        <div ref={zoneRef} className="relative mx-auto" style={{ width: 'min(78vw, 360px)', aspectRatio: '1' }}>
          <svg viewBox="0 0 200 200" className="acc-spin absolute inset-0 w-full h-full" aria-hidden="true">
            <defs>
              <path id="acc-circle" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
            </defs>
            <text style={{ fontFamily: 'var(--font-nunito), sans-serif', fontSize: 11.5, fontWeight: 700, letterSpacing: 3.2, fill: 'var(--rt-primary)' }}>
              <textPath href="#acc-circle">APPEL GRATUIT · 15 MINUTES · SANS ENGAGEMENT · </textPath>
            </text>
          </svg>
          <button
            ref={btnRef}
            onClick={openDevis}
            className="absolute inset-[22%] flex flex-col items-center justify-center gap-2 transition-[box-shadow] duration-500 hover:shadow-2xl"
            style={{ borderRadius: 999, backgroundColor: 'var(--rt-primary)', color: '#FFFFFF', boxShadow: '0 25px 60px color-mix(in srgb, var(--rt-primary) 40%, transparent)' }}
          >
            <Phone size={24} />
            <span className="font-body font-800 text-sm tracking-[0.12em] uppercase">Parlons-en</span>
          </button>
        </div>
      </div>
    </section>
  )
}

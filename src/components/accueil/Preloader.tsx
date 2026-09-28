'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { TopoField } from './TopoField'
import { DISPLAY_FONT } from './anim'

/* Ouverture, une seule fois par visite : compteur 0 a 100 sur les courbes de
   niveau, puis un rideau se leve sur l'accueil. Le script en ligne masque
   l'ecran avant le premier affichage si la visite l'a deja vu. */

const KEY = 'rtIntro'
const HIDE = `try{if(sessionStorage.getItem('${KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches){document.getElementById('rt-intro').style.display='none'}else{document.documentElement.classList.add('rt-intro')}}catch(e){document.getElementById('rt-intro').style.display='none'}`

export function Preloader() {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || el.style.display === 'none') {
      setGone(true)
      return
    }
    try { sessionStorage.setItem(KEY, '1') } catch {}
    const start = performance.now()
    const DURATION = 1700
    let raf = 0
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / DURATION)
      setCount(Math.round((1 - Math.pow(1 - k, 3)) * 100))
      if (k < 1) raf = requestAnimationFrame(tick)
      else {
        setLeaving(true)
        document.documentElement.classList.remove('rt-intro')
        setTimeout(() => setGone(true), 1100)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (gone) return null

  return (
    <>
      <div
        id="rt-intro"
        suppressHydrationWarning
        ref={ref}
        aria-hidden="true"
        className="fixed inset-0 flex flex-col items-center justify-center"
        style={{
          zIndex: 100,
          backgroundColor: 'var(--rt-bg)',
          clipPath: leaving ? 'inset(0 0 100% 0)' : 'inset(0 0 0 0)',
          transition: 'clip-path 1s cubic-bezier(0.76, 0, 0.24, 1)',
        }}
      >
        <TopoField opacity={0.18} />
        <div className="relative flex flex-col items-center">
          <Image src="/images/logo-roman.png" alt="" width={38} height={64} priority />
          <p className="mt-8 tabular-nums" style={{ ...DISPLAY_FONT, color: 'var(--rt-primary)', fontWeight: 700, lineHeight: 0.8, letterSpacing: '-0.04em', fontSize: 'clamp(5rem, 16vw, 13rem)' }}>
            {count}
          </p>
          <p className="mt-6 font-body text-[11px] font-700 tracking-[0.35em] uppercase" style={{ color: 'var(--rt-muted)' }}>Roman Tabardel · Création web</p>
          <div className="mt-6 w-40 h-[2px] overflow-hidden" style={{ backgroundColor: 'var(--rt-line)' }}>
            <div className="h-full origin-left" style={{ backgroundColor: 'var(--rt-primary)', transform: `scaleX(${count / 100})` }} />
          </div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: HIDE }} />
    </>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { Mrs_Saint_Delafield } from 'next/font/google'

const hand = Mrs_Saint_Delafield({ subsets: ['latin'], weight: '400', display: 'swap' })

/* Signature manuscrite qui s'ecrit de gauche a droite quand elle arrive a l'ecran. */
export function Signature({ size = '3.2rem', className = '' }: { size?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setShown(true)
        io.disconnect()
      }
    }, { rootMargin: '0px 0px -10% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <span
      ref={ref}
      className={`${hand.className} inline-block ${className}`}
      style={{
        fontSize: size,
        lineHeight: 1.1,
        color: 'var(--rt-primary)',
        padding: '0 0.3em',
        clipPath: shown ? 'inset(-20% -10% -20% -10%)' : 'inset(-20% 110% -20% -10%)',
        transition: 'clip-path 1.8s cubic-bezier(0.65, 0, 0.35, 1) 0.2s',
      }}
    >
      Roman Tabardel
    </span>
  )
}

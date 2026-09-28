'use client'

import { useEffect, useRef } from 'react'
import { DISPLAY_FONT, loop, pinnedProgress, reducedMotion, smoothstep } from './anim'

/* Les 4 mots de Roman en tres grand, en contour. Au defilement, chaque mot se
   remplit de bleu de gauche a droite, et son explication apparait a cote.
   Les explications reprennent ses propres phrases. */

const VALUES = [
  { word: 'Écouter', text: 'Prendre le temps d’échanger, rencontrer les personnes avec qui je travaille.' },
  { word: 'Comprendre', text: 'Découvrir votre activité et comprendre réellement ce dont vous avez besoin.' },
  { word: 'Créer', text: 'Un site professionnel, moderne et fidèle à votre entreprise, sans modèle tout fait.' },
  { word: 'Accompagner', text: 'Mise en ligne, formation à la gestion du contenu et 1 mois de support inclus.' },
]

export function ValuesFill() {
  const rootRef = useRef<HTMLElement>(null)
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([])
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    const root = rootRef.current!
    const apply = (p: number) => {
      const n = VALUES.length
      VALUES.forEach((_, i) => {
        const k = smoothstep(i / n, (i + 0.75) / n, p)
        const fill = fillRefs.current[i]
        const text = textRefs.current[i]
        if (fill) fill.style.clipPath = `inset(0 ${(1 - k) * 100}% 0 0)`
        if (text) {
          text.style.opacity = String(k)
          text.style.transform = `translate3d(${(1 - k) * 30}px, 0, 0)`
        }
      })
    }
    if (reducedMotion()) {
      apply(1)
      return
    }
    return loop(root, pinnedProgress, p => apply(smoothstep(0.05, 0.9, p)), 6)
  }, [])

  return (
    <section ref={rootRef} className="relative" style={{ height: '280svh', backgroundColor: 'var(--rt-soft)' }}>
      <div className="sticky top-0 flex flex-col justify-center overflow-hidden px-5 md:px-12 lg:px-20" style={{ height: '100svh' }}>
        <div className="max-w-7xl w-full mx-auto">
          <p className="font-body text-[11px] font-700 tracking-[0.3em] uppercase mb-8 md:mb-10" style={{ color: 'var(--rt-muted)' }}>Ma méthode, en quatre mots</p>
          <div className="flex flex-col gap-3 md:gap-2">
            {VALUES.map((v, i) => (
              <div key={v.word} className="grid grid-cols-1 md:grid-cols-[auto_minmax(0,1fr)] md:items-center gap-1 md:gap-10">
                <p className="relative uppercase" style={{ ...DISPLAY_FONT, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.92, fontSize: 'clamp(2.8rem, 8.6vw, 8.8rem)' }}>
                  <span className="acc-outline">{v.word}</span>
                  <span ref={el => { fillRefs.current[i] = el }} aria-hidden="true" className="absolute inset-0" style={{ color: 'var(--rt-primary)', clipPath: 'inset(0 100% 0 0)' }}>
                    {v.word}
                  </span>
                </p>
                <p ref={el => { textRefs.current[i] = el }} className="font-body text-sm md:text-base leading-relaxed max-w-xs" style={{ color: 'var(--rt-muted)', opacity: 0 }}>
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

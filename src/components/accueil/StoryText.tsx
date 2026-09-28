'use client'

import { useEffect, useRef } from 'react'
import { Signature } from './Signature'
import { DISPLAY_FONT, reducedMotion } from './anim'

/* L'histoire de Roman (son texte, a l'identique) : les mots s'allument un a un
   au fil de la lecture, puis sa citation et sa signature. */

const PARAGRAPHS = [
  'Je m’appelle Roman Tabardel, j’ai 20 ans et je suis créateur de sites web indépendant.',
  'J’ai créé ma micro-entreprise avec une idée simple : permettre aux entreprises de mettre en valeur leur savoir-faire et de présenter leur activité de la meilleure manière sur internet.',
  'Ce que j’aime particulièrement dans mon métier, ce sont les relations humaines. Prendre le temps d’échanger, rencontrer les personnes avec qui je travaille, découvrir leur activité et comprendre réellement ce dont elles ont besoin, c’est ce qui me plaît le plus dans chaque projet.',
  'Je ne cherche pas à proposer une solution toute faite. Chaque entreprise a ses propres besoins, ses propres objectifs et sa propre façon de travailler. C’est pourquoi je prends le temps de comprendre votre activité avant de réfléchir à la manière de la mettre en avant sur le web.',
  'À travers mes sites, mon objectif est de créer quelque chose de professionnel, moderne et fidèle à votre entreprise, tout en restant simple et efficace pour vos clients.',
  'Écouter, comprendre, créer et accompagner : c’est cette approche qui me motive dans mon métier.',
]
const QUOTE = 'Je crois que chaque entreprise, quelle que soit sa taille, mérite un site à la hauteur de ses ambitions.'

export function StoryText() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = ref.current!
    const words = Array.from(root.querySelectorAll<HTMLElement>('[data-word]'))
    if (reducedMotion()) {
      words.forEach(w => { w.style.opacity = '1' })
      return
    }
    let tops: number[] = []
    const measure = () => { tops = words.map(w => w.getBoundingClientRect().top + window.scrollY) }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(root)
    document.fonts?.ready.then(measure)
    let raf = 0
    let lastY = -1
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const y = window.scrollY
      if (y === lastY) return
      lastY = y
      const h = window.innerHeight
      for (let i = 0; i < words.length; i++) {
        const pos = (tops[i] - y) / h
        if (pos > 1.1 || pos < -0.2) continue
        const lit = Math.min(1, Math.max(0, (0.8 - pos) / 0.28))
        words[i].style.opacity = String(0.18 + 0.82 * lit)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  const split = (text: string) =>
    text.split(' ').map((w, i) => (
      <span key={i} data-word style={{ opacity: 0.18, transition: 'opacity 0.25s linear' }}>{w} </span>
    ))

  return (
    <section id="histoire" ref={ref} className="px-5 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: 'var(--rt-bg)' }}>
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-[11px] font-700 tracking-[0.3em] uppercase mb-10" style={{ color: 'var(--rt-muted)' }}>Mon histoire</p>
        <div className="space-y-9 md:space-y-12" style={{ ...DISPLAY_FONT, color: 'var(--rt-ink)', fontWeight: 600, lineHeight: 1.18, letterSpacing: '-0.02em', fontSize: 'clamp(1.5rem, 3vw, 2.7rem)' }}>
          {PARAGRAPHS.map((p, i) => <p key={i}>{split(p)}</p>)}
        </div>
        <blockquote className="mt-20 md:mt-28 pl-6 md:pl-10" style={{ borderLeft: '4px solid var(--rt-primary)' }}>
          <p style={{ fontFamily: 'var(--font-barlow), sans-serif', fontStyle: 'italic', fontWeight: 600, color: 'var(--rt-primary)', lineHeight: 1.15, fontSize: 'clamp(1.6rem, 3.2vw, 3rem)' }}>
            {split(`“${QUOTE}”`)}
          </p>
          <div className="mt-4"><Signature size="clamp(2.4rem, 4.5vw, 4rem)" /></div>
        </blockquote>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { DARK } from './scrollLoop'

/* A propos : le texte de Roman, dont les mots s'allument un a un au fil du
   defilement (facon Linear / Stripe). Le portrait reste a gauche. */

const PARAGRAPHS = [
  'Je m’appelle Roman Tabardel, j’ai 20 ans et je suis créateur de sites web indépendant.',
  'J’ai créé ma micro-entreprise avec une idée simple : permettre aux entreprises de mettre en valeur leur savoir-faire et de présenter leur activité de la meilleure manière sur internet.',
  'Ce que j’aime particulièrement dans mon métier, ce sont les relations humaines. Prendre le temps d’échanger, rencontrer les personnes avec qui je travaille, découvrir leur activité et comprendre réellement ce dont elles ont besoin, c’est ce qui me plaît le plus dans chaque projet.',
  'Je ne cherche pas à proposer une solution toute faite. Chaque entreprise a ses propres besoins, ses propres objectifs et sa propre façon de travailler. C’est pourquoi je prends le temps de comprendre votre activité avant de réfléchir à la manière de la mettre en avant sur le web.',
  'À travers mes sites, mon objectif est de créer quelque chose de professionnel, moderne et fidèle à votre entreprise, tout en restant simple et efficace pour vos clients.',
  'Écouter, comprendre, créer et accompagner : c’est cette approche qui me motive dans mon métier.',
]
const QUOTE = 'Je crois que chaque entreprise, quelle que soit sa taille, mérite un site à la hauteur de ses ambitions.'

export function AboutManifesto({ still = false }: { still?: boolean }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (still) return
    const root = ref.current!
    const words = Array.from(root.querySelectorAll<HTMLElement>('[data-word]'))
    let tops: number[] = []
    const measure = () => {
      tops = words.map(w => w.getBoundingClientRect().top + window.scrollY)
    }
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
        const lit = Math.min(1, Math.max(0, (0.82 - pos) / 0.3))
        words[i].style.opacity = String(0.14 + 0.86 * lit)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [still])

  const split = (text: string) =>
    text.split(' ').map((w, i) => (
      <span key={i} data-word style={{ opacity: still ? 1 : 0.14, transition: 'opacity 0.25s linear' }}>
        {w}{' '}
      </span>
    ))

  return (
    <section id="a-propos" ref={ref} className="relative text-white px-6 md:px-12 lg:px-20 pt-36 md:pt-44 pb-28 md:pb-40" style={{ backgroundColor: DARK }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-14 lg:gap-24">
        <div className="lg:sticky lg:top-28 self-start">
          <p className="font-body text-xs tracking-[0.25em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
            À propos · Fondateur
          </p>
          <h1 className="font-display font-800 leading-[0.95] mb-8" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.4rem)' }}>
            Roman
            <br />
            Tabardel
          </h1>
          <div className="relative overflow-hidden w-full max-w-sm" style={{ aspectRatio: '3 / 4', borderRadius: 16 }}>
            <Image src="/images/photo-identite.jpg" alt="Roman Tabardel, créateur de sites web" fill sizes="(max-width: 1024px) 90vw, 384px" style={{ objectFit: 'cover' }} />
          </div>
        </div>

        <div>
          <div className="space-y-8 md:space-y-10 font-display font-600" style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.35rem)', lineHeight: 1.22 }}>
            {PARAGRAPHS.map((p, i) => <p key={i}>{split(p)}</p>)}
          </div>

          <blockquote className="mt-16 md:mt-24 pl-6" style={{ borderLeft: '3px solid var(--rt-primary)' }}>
            <p className="font-display font-600 italic" style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)', lineHeight: 1.3 }}>
              {split(`“${QUOTE}”`)}
            </p>
            <footer className="mt-4 font-body text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Roman Tabardel</footer>
          </blockquote>

          <div className="mt-14 flex flex-wrap gap-4">
            <a href="/contact" className="inline-flex items-center gap-2 font-body font-700 text-sm px-8 py-4 transition-opacity duration-200 hover:opacity-80" style={{ backgroundColor: 'var(--rt-primary)', color: '#FFFFFF' }}>
              Me contacter
              <ArrowRight size={15} />
            </a>
            <a href="/services#realisations" className="inline-flex items-center font-body font-600 text-sm px-8 py-4 transition-colors duration-200 hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.4)' }}>
              Voir mes réalisations
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

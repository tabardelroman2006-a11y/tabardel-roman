'use client'

import { useEffect, useRef, useState } from 'react'
import { Signature } from './Signature'
import { Reveal } from './Reveal'
import { DISPLAY_FONT } from './anim'

/* L'histoire de Roman (son texte, a l'identique), decoupee en chapitres pour
   donner envie de lire : a gauche, le chapitre en cours reste affiche et
   change au fil de la lecture ; a droite, le texte a taille confortable, avec
   la phrase cle de chaque chapitre en bleu. */

const CHAPTERS = [
  {
    title: 'Qui je suis',
    key: 'créateur de sites web indépendant',
    text: ['Je m’appelle Roman Tabardel, j’ai 20 ans et je suis créateur de sites web indépendant.'],
  },
  {
    title: 'Pourquoi je me suis lancé',
    key: 'permettre aux entreprises de mettre en valeur leur savoir-faire',
    text: ['J’ai créé ma micro-entreprise avec une idée simple : permettre aux entreprises de mettre en valeur leur savoir-faire et de présenter leur activité de la meilleure manière sur internet.'],
  },
  {
    title: 'Ce que j’aime',
    key: 'ce sont les relations humaines',
    text: ['Ce que j’aime particulièrement dans mon métier, ce sont les relations humaines. Prendre le temps d’échanger, rencontrer les personnes avec qui je travaille, découvrir leur activité et comprendre réellement ce dont elles ont besoin, c’est ce qui me plaît le plus dans chaque projet.'],
  },
  {
    title: 'Ma façon de travailler',
    key: 'Je ne cherche pas à proposer une solution toute faite.',
    text: [
      'Je ne cherche pas à proposer une solution toute faite. Chaque entreprise a ses propres besoins, ses propres objectifs et sa propre façon de travailler. C’est pourquoi je prends le temps de comprendre votre activité avant de réfléchir à la manière de la mettre en avant sur le web.',
      'À travers mes sites, mon objectif est de créer quelque chose de professionnel, moderne et fidèle à votre entreprise, tout en restant simple et efficace pour vos clients.',
    ],
  },
]
const QUOTE = 'Je crois que chaque entreprise, quelle que soit sa taille, mérite un site à la hauteur de ses ambitions.'

function highlight(text: string, key: string) {
  const i = text.indexOf(key)
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <mark className="acc-mark">{key}</mark>
      {text.slice(i + key.length)}
    </>
  )
}

export function StoryChapters() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach(r => r && io.observe(r))
    return () => io.disconnect()
  }, [])

  return (
    <section id="histoire" className="px-5 md:px-12 lg:px-20 py-24 md:py-36" style={{ backgroundColor: 'var(--rt-bg)' }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 md:gap-20">
        <div className="hidden md:block">
          <div className="sticky top-32">
            <p className="font-body text-[11px] font-700 tracking-[0.3em] uppercase" style={{ color: 'var(--rt-muted)' }}>Mon histoire</p>
            <div className="relative mt-6 h-[7.5rem] overflow-hidden">
              {CHAPTERS.map((c, i) => (
                <div key={c.title} className="absolute inset-0 transition-all duration-700" style={{ opacity: active === i ? 1 : 0, transform: `translate3d(0, ${active === i ? 0 : active > i ? -40 : 40}px, 0)`, transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
                  <p style={{ ...DISPLAY_FONT, fontWeight: 700, fontSize: '3.4rem', lineHeight: 0.8, color: 'var(--rt-line)' }}>{String(i + 1).padStart(2, '0')}</p>
                  <p className="uppercase mt-2" style={{ ...DISPLAY_FONT, fontWeight: 700, fontSize: '1.9rem', lineHeight: 1, color: 'var(--rt-primary)', letterSpacing: '-0.02em' }}>{c.title}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3">
              {CHAPTERS.map((c, i) => (
                <button
                  key={c.title}
                  onClick={() => refs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className="flex items-center gap-3 text-left font-body text-sm transition-colors duration-300"
                  style={{ color: active === i ? 'var(--rt-primary)' : 'var(--rt-muted)', fontWeight: active === i ? 700 : 500 }}
                >
                  <span className="h-[2px] transition-all duration-500" style={{ width: active === i ? 34 : 14, backgroundColor: 'currentColor' }} />
                  {c.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-20 md:space-y-28">
          {CHAPTERS.map((c, i) => (
            <article key={c.title} ref={el => { refs.current[i] = el }} data-index={i}>
              <Reveal>
                <p className="md:hidden font-body text-[11px] font-700 tracking-[0.25em] uppercase mb-4" style={{ color: 'var(--rt-primary)' }}>
                  {String(i + 1).padStart(2, '0')} · {c.title}
                </p>
                <div className="space-y-6 font-body leading-relaxed" style={{ color: 'var(--rt-ink)', fontSize: 'clamp(1.15rem, 1.55vw, 1.4rem)' }}>
                  {c.text.map((t, k) => <p key={k}>{k === 0 ? highlight(t, c.key) : t}</p>)}
                </div>
              </Reveal>
            </article>
          ))}

          <Reveal>
            <blockquote className="acc-card p-8 md:p-12">
              <p style={{ fontFamily: 'var(--font-barlow), sans-serif', fontStyle: 'italic', fontWeight: 600, color: 'var(--rt-primary)', lineHeight: 1.15, fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)' }}>
                “{QUOTE}”
              </p>
              <div className="mt-4"><Signature size="clamp(2.4rem, 4vw, 3.6rem)" /></div>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

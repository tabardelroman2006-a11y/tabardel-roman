'use client'

import { Fragment, type ReactNode } from 'react'
import { ArrowDown } from 'lucide-react'
import { TopoField } from './TopoField'
import { DISPLAY_FONT, insecable } from './anim'

/* Ouverture des pages interieures, dans l'esprit de l'accueil : courbes de
   niveau en fond, titre geant bleu dont les mots montent un par un, la
   phrase d'accroche juste dessous, et un visuel optionnel a droite. */

export function PageIntro({ eyebrow, title, subtitle, text, next, aside }: { eyebrow: string; title: string; subtitle?: string; text?: string; next: string; aside?: ReactNode }) {
  const words = insecable(title).split(' ')
  return (
    <section className="relative overflow-hidden px-5 md:px-12 lg:px-20" style={{ minHeight: '92svh', backgroundColor: 'var(--rt-bg)' }}>
      <TopoField opacity={0.13} />
      <div className={`relative max-w-7xl mx-auto grid grid-cols-1 ${aside ? 'lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]' : ''} gap-10 items-end`} style={{ minHeight: '92svh', paddingTop: 130, paddingBottom: '9svh' }}>
        <div>
          <p className="acc-rise font-body text-[11px] font-700 tracking-[0.3em] uppercase mb-6" style={{ color: 'var(--rt-muted)' }}>{eyebrow}</p>
          <h1 className="uppercase" style={{ ...DISPLAY_FONT, color: 'var(--rt-primary)', fontWeight: 700, lineHeight: 0.86, letterSpacing: '-0.035em', fontSize: aside ? 'clamp(3rem, 7.4vw, 7.8rem)' : 'clamp(3.2rem, 9.5vw, 10rem)' }}>
            {words.map((w, i) => (
              <Fragment key={i}>
                <span className="acc-rise-mask"><span className="acc-rise" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>{w}</span></span>
                {i < words.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </h1>
          {subtitle && (
            <p className="mt-4" style={{ fontSize: 'clamp(1.2rem, 2vw, 2rem)', lineHeight: 1.1 }}>
              <span className="acc-rise-mask">
                <span className="acc-rise" style={{ animationDelay: `${0.2 + words.length * 0.08}s`, fontFamily: 'var(--font-barlow), sans-serif', fontStyle: 'italic', fontWeight: 600, color: 'var(--rt-ink)' }}>
                  {insecable(subtitle)}
                </span>
              </span>
            </p>
          )}
          <div className="acc-rise mt-10 flex flex-col sm:flex-row sm:items-end gap-8" style={{ animationDelay: `${0.35 + words.length * 0.08}s` }}>
            {text && <p className="font-body text-base md:text-lg leading-relaxed max-w-xl" style={{ color: 'var(--rt-muted)' }}>{text}</p>}
            <a href={next} aria-label="Descendre" className="acc-bob-y shrink-0 flex items-center justify-center" style={{ width: 54, height: 54, borderRadius: 999, backgroundColor: 'var(--rt-primary)', color: '#FFFFFF', boxShadow: '0 12px 30px color-mix(in srgb, var(--rt-primary) 35%, transparent)' }}>
              <ArrowDown size={20} />
            </a>
          </div>
        </div>
        {aside && <div className="relative h-full min-h-[380px] lg:min-h-0">{aside}</div>}
      </div>
    </section>
  )
}

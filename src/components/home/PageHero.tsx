'use client'

import { Fragment } from 'react'
import { ArrowDown } from 'lucide-react'
import { DARK, HERO_FONT } from './scrollLoop'

/* Ouverture des pages interieures : les mots du titre montent un par un. */
export function PageHero({ eyebrow, title, subtitle, next }: { eyebrow: string; title: string; subtitle: string; next: string }) {
  const words = title.split(' ')
  return (
    <section className="relative text-white px-6 md:px-12 lg:px-20 flex flex-col justify-end overflow-hidden" style={{ minHeight: '88svh', backgroundColor: DARK, paddingBottom: '10svh', paddingTop: 120 }}>
      <div aria-hidden="true" className="page-hero-glow absolute pointer-events-none" />
      <div className="relative max-w-7xl w-full mx-auto">
        <p className="hero-rise font-body text-xs tracking-[0.3em] uppercase mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>{eyebrow}</p>
        <h1 className="uppercase" style={{ ...HERO_FONT, fontWeight: 650, lineHeight: 0.9, letterSpacing: '-0.02em', fontSize: 'clamp(3rem, 9.5vw, 9rem)' }}>
          {words.map((w, i) => (
            <Fragment key={i}>
              <span className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: '0.06em' }}>
                <span className="hero-rise inline-block" style={{ animationDelay: `${0.08 + i * 0.09}s` }}>{w}</span>
              </span>
              {i < words.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </h1>
        <div className="hero-rise mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8" style={{ animationDelay: `${0.2 + words.length * 0.09}s` }}>
          <p className="font-body text-base md:text-lg leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.72)' }}>{subtitle}</p>
          <a href={next} aria-label="Descendre" className="relief-bob shrink-0 flex items-center justify-center" style={{ width: 56, height: 56, borderRadius: 999, backgroundColor: 'var(--rt-primary)' }}>
            <ArrowDown size={22} />
          </a>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, type ReactNode } from 'react'
import { Plus } from 'lucide-react'
import { Reveal } from '@/components/accueil/Reveal'
import { DISPLAY_FONT } from '@/components/accueil/anim'

/* Questions frequentes qui s'ouvrent une par une. Les reponses restent dans
   le HTML (fermees visuellement) pour que Google les lise. */

export function FaqBlock({ items, id = 'questions', title }: { items: { q: string; a: string }[]; id?: string; title?: ReactNode }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id={id} className="px-5 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: 'var(--rt-soft)' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-24">
        <Reveal>
          <p className="font-body text-[11px] font-700 tracking-[0.3em] uppercase mb-5" style={{ color: 'var(--rt-muted)' }}>Questions fréquentes</p>
          <h2 className="uppercase" style={{ ...DISPLAY_FONT, color: 'var(--rt-primary)', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.03em', fontSize: 'clamp(2.4rem, 4.8vw, 4.6rem)' }}>
            {title ?? <>Vous vous<br /><span className="acc-outline">posez la question</span></>}
          </h2>
        </Reveal>
        <div>
          {items.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div style={{ borderBottom: '1px solid var(--rt-line)' }}>
                  <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="w-full flex items-center justify-between gap-6 py-6 text-left">
                    <h3 className="font-display font-700 text-lg md:text-xl transition-colors duration-300" style={{ color: isOpen ? 'var(--rt-primary)' : 'var(--rt-ink)' }}>{f.q}</h3>
                    <span
                      className="shrink-0 flex items-center justify-center transition-all duration-500"
                      style={{ width: 38, height: 38, borderRadius: 999, border: '1.5px solid var(--rt-line)', transform: isOpen ? 'rotate(45deg)' : 'none', backgroundColor: isOpen ? 'var(--rt-primary)' : '#FFFFFF', color: isOpen ? '#FFFFFF' : 'var(--rt-primary)' }}
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                  <div className="grid transition-[grid-template-rows] duration-500" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
                    <div className="overflow-hidden">
                      <p className="font-body text-base leading-relaxed pb-7 max-w-2xl" style={{ color: 'var(--rt-muted)' }}>{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

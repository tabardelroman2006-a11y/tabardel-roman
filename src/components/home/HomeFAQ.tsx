'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { FAQS } from '@/components/sections/FAQSection'
import { DARK } from './scrollLoop'
import { Reveal } from './Reveal'

export function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="questions" className="text-white px-6 md:px-12 lg:px-20 py-28 md:py-36" style={{ backgroundColor: DARK, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-24">
        <Reveal>
          <p className="font-body text-xs tracking-[0.25em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>Questions fréquentes</p>
          <h2 className="font-display font-800 leading-[0.95]" style={{ fontSize: 'clamp(2.3rem, 4.6vw, 4.2rem)' }}>
            Vous vous
            <br />
            <span style={{ color: 'rgba(255,255,255,0.55)' }}>posez la question.</span>
          </h2>
        </Reveal>

        <div>
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} delay={i * 0.06}>
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                  >
                    <span className="font-display font-600 text-lg md:text-xl transition-colors duration-300" style={{ color: isOpen ? '#FFFFFF' : 'rgba(255,255,255,0.78)' }}>
                      {f.q}
                    </span>
                    <span
                      className="shrink-0 flex items-center justify-center transition-transform duration-500"
                      style={{ width: 36, height: 36, borderRadius: 999, border: '1px solid rgba(255,255,255,0.3)', transform: isOpen ? 'rotate(45deg)' : 'none', backgroundColor: isOpen ? 'var(--rt-primary)' : 'transparent' }}
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                  <div className="grid transition-[grid-template-rows] duration-500" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
                    <div className="overflow-hidden">
                      <p className="font-body text-base leading-relaxed pb-7 max-w-2xl" style={{ color: 'rgba(255,255,255,0.7)' }}>{f.a}</p>
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

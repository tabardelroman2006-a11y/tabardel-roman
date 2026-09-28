'use client'

import { useState } from 'react'
import { ArrowUpRight, Mail, Phone, Plus } from 'lucide-react'
import { useModal } from '@/context/ModalContext'
import { ContactForm } from '@/components/sections/ContactForm'
import { FAQS } from '@/components/sections/FAQSection'
import { Reveal } from './Reveal'
import { DISPLAY_FONT } from './anim'

/* Page contact : grandes cartes telephone / e-mail qui reagissent au survol,
   le formulaire dans une carte, puis les questions frequentes qui s'ouvrent. */

export function ContactPanel() {
  const { openDevis } = useModal()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <>
      <section id="ecrire" className="px-5 md:px-12 lg:px-20 pt-10 pb-24 md:pb-32" style={{ backgroundColor: 'var(--rt-bg)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 lg:gap-12 items-start">
          <div className="flex flex-col gap-4">
            <Reveal>
              <a href="tel:0618135384" className="acc-contact-card group">
                <span className="acc-contact-icon"><Phone size={20} /></span>
                <span>
                  <span className="block font-body text-[10px] font-700 tracking-[0.22em] uppercase" style={{ color: 'var(--rt-muted)' }}>Appelez-moi</span>
                  <span className="block mt-1" style={{ ...DISPLAY_FONT, fontWeight: 700, fontSize: 'clamp(1.5rem, 2.6vw, 2.3rem)', color: 'var(--rt-primary)', lineHeight: 1 }}>06 18 13 53 84</span>
                </span>
                <ArrowUpRight size={20} className="acc-contact-arrow" />
              </a>
            </Reveal>
            <Reveal delay={0.08}>
              <a href="mailto:contact@tabardel-roman.fr" className="acc-contact-card group">
                <span className="acc-contact-icon"><Mail size={20} /></span>
                <span className="min-w-0">
                  <span className="block font-body text-[10px] font-700 tracking-[0.22em] uppercase" style={{ color: 'var(--rt-muted)' }}>Écrivez-moi</span>
                  <span className="block mt-1 truncate" style={{ ...DISPLAY_FONT, fontWeight: 700, fontSize: 'clamp(1.1rem, 1.9vw, 1.7rem)', color: 'var(--rt-primary)', lineHeight: 1.1 }}>contact@tabardel-roman.fr</span>
                </span>
                <ArrowUpRight size={20} className="acc-contact-arrow" />
              </a>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="acc-card p-7">
                <p className="flex items-center gap-2 font-body text-[10px] font-700 tracking-[0.2em] uppercase" style={{ color: 'var(--rt-muted)' }}>
                  <span className="acc-pulse" /> Réponse sous 24 h
                </p>
                <p className="mt-3 font-body text-base leading-relaxed" style={{ color: 'var(--rt-muted)' }}>
                  Vous préférez qu’on en parle de vive voix ? Réservez un appel de 15 minutes, gratuit et sans engagement.
                </p>
                <button onClick={openDevis} className="acc-btn acc-btn-solid mt-6">
                  <Phone size={15} />
                  Réserver un appel
                </button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="p-7 md:p-10" style={{ backgroundColor: '#FFFFFF', borderRadius: 22, border: '1px solid var(--rt-line)', boxShadow: '0 30px 80px color-mix(in srgb, var(--rt-primary) 14%, transparent)' }}>
              <p className="uppercase mb-7" style={{ ...DISPLAY_FONT, fontWeight: 700, color: 'var(--rt-primary)', fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)', lineHeight: 1 }}>Votre projet</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="questions" className="px-5 md:px-12 lg:px-20 py-24 md:py-32" style={{ backgroundColor: 'var(--rt-soft)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-24">
          <Reveal>
            <p className="font-body text-[11px] font-700 tracking-[0.3em] uppercase mb-5" style={{ color: 'var(--rt-muted)' }}>Questions fréquentes</p>
            <h2 className="uppercase" style={{ ...DISPLAY_FONT, color: 'var(--rt-primary)', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.03em', fontSize: 'clamp(2.4rem, 4.8vw, 4.6rem)' }}>
              Vous vous
              <br />
              <span className="acc-outline">posez la question</span>
            </h2>
          </Reveal>
          <div>
            {FAQS.map((f, i) => {
              const isOpen = open === i
              return (
                <Reveal key={f.q} delay={i * 0.05}>
                  <div style={{ borderBottom: '1px solid var(--rt-line)' }}>
                    <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="w-full flex items-center justify-between gap-6 py-6 text-left">
                      <span className="font-display font-700 text-lg md:text-xl transition-colors duration-300" style={{ color: isOpen ? 'var(--rt-primary)' : 'var(--rt-ink)' }}>{f.q}</span>
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
    </>
  )
}

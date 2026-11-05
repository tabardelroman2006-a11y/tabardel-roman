'use client'

import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { useModal } from '@/context/ModalContext'
import { ContactForm } from '@/components/sections/ContactForm'
import { Reveal } from './Reveal'
import { DISPLAY_FONT } from './anim'

/* Page contact : grandes cartes telephone / e-mail qui reagissent au survol,
   le formulaire dans une carte, puis les questions frequentes qui s'ouvrent. */

export function ContactPanel() {
  const { openDevis } = useModal()

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
                  <span className="acc-pulse" /> Appel gratuit
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

    </>
  )
}

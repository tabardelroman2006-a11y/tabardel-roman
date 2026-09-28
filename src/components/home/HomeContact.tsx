'use client'

import { Mail, Phone } from 'lucide-react'
import { useModal } from '@/context/ModalContext'
import { useSiteTexts } from '@/lib/useSiteTexts'
import { ContactForm } from '@/components/sections/ContactForm'
import { Reveal } from './Reveal'

export function HomeContact() {
  const { openDevis } = useModal()
  const t = useSiteTexts()

  return (
    <section id="contact" className="text-white px-6 md:px-12 lg:px-20 py-28 md:py-36" style={{ backgroundColor: 'var(--rt-primary)' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">
        <div>
          <Reveal>
            <p className="font-body text-xs tracking-[0.25em] uppercase mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>{t('cta.eyebrow')}</p>
            <h2 className="font-display font-800 leading-[0.92] tracking-tight" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.6rem)' }}>
              {t('cta.titleLine1')}
              <br />
              {t('cta.titleLine2')}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-body text-base mt-8 max-w-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{t('cta.description')}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 space-y-4">
              <a href="tel:0618135384" className="flex items-center gap-4 font-body text-lg hover:opacity-75 transition-opacity">
                <span className="flex items-center justify-center shrink-0" style={{ width: 44, height: 44, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.12)' }}>
                  <Phone size={17} />
                </span>
                06 18 13 53 84
              </a>
              <a href="mailto:contact@tabardel-roman.fr" className="flex items-center gap-4 font-body text-lg hover:opacity-75 transition-opacity">
                <span className="flex items-center justify-center shrink-0" style={{ width: 44, height: 44, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.12)' }}>
                  <Mail size={17} />
                </span>
                contact@tabardel-roman.fr
              </a>
            </div>
            <button
              onClick={openDevis}
              className="mt-10 flex items-center gap-3 font-body font-700 text-sm px-10 py-5 transition-transform duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: '#FFFFFF', color: 'var(--rt-primary)' }}
            >
              <Phone size={15} />
              Réserver un appel gratuit (15 min)
            </button>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="p-8 md:p-10" style={{ backgroundColor: '#FFFFFF', borderRadius: 16, boxShadow: '0 30px 90px rgba(0,0,0,0.25)' }}>
            <p className="font-display font-700 text-2xl mb-6" style={{ color: '#1A1A1A' }}>Écrivez-moi</p>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

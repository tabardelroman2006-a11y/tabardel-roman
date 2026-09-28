'use client'

import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { useModal } from '@/context/ModalContext'
import { useSiteTexts } from '@/lib/useSiteTexts'
import { TopoField } from './TopoField'
import { Signature } from './Signature'
import { Reveal } from './Reveal'
import { DISPLAY_FONT, insecable } from './anim'

/* Conclusion facon « Always bringing the fight » de landonorris.com : un grand
   cadre a la couleur de la marque, les courbes de niveau, la signature. */

export function FinalCallout() {
  const { openDevis } = useModal()
  const t = useSiteTexts()

  return (
    <section className="px-3 md:px-6 pb-3 md:pb-6 pt-6" style={{ backgroundColor: 'var(--rt-bg)' }}>
      <div className="relative overflow-hidden text-center px-6 py-24 md:py-36" style={{ borderRadius: 28, backgroundColor: '#FFFFFF', border: '10px solid var(--rt-primary)' }}>
        <TopoField opacity={0.14} levels={12} />
        <Reveal className="relative">
          <p className="font-body text-[11px] font-700 tracking-[0.3em] uppercase mb-6" style={{ color: 'var(--rt-muted)' }}>{t('cta.eyebrow')}</p>
          <h2 className="uppercase mx-auto" style={{ ...DISPLAY_FONT, color: 'var(--rt-primary)', fontWeight: 700, lineHeight: 0.88, letterSpacing: '-0.035em', fontSize: 'clamp(2.6rem, 7.5vw, 7.6rem)', maxWidth: '14ch' }}>
            {insecable(t('cta.titleLine1'))} {insecable(t('cta.titleLine2'))}
          </h2>
          <div className="-mt-2 md:-mt-4"><Signature size="clamp(2.6rem, 5vw, 4.6rem)" /></div>
          <p className="font-body text-base md:text-lg mt-6 mx-auto max-w-xl leading-relaxed" style={{ color: 'var(--rt-muted)' }}>{t('cta.description')}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button onClick={openDevis} className="acc-btn acc-btn-solid">
              <Phone size={15} />
              Appel gratuit (15 min)
            </button>
            <a href="/contact" className="acc-btn acc-btn-ghost">
              Envoyer un message
              <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 font-body text-sm" style={{ color: 'var(--rt-ink)' }}>
            <a href="tel:0618135384" className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"><Phone size={14} style={{ color: 'var(--rt-primary)' }} /> 06 18 13 53 84</a>
            <a href="mailto:contact@tabardel-roman.fr" className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"><Mail size={14} style={{ color: 'var(--rt-primary)' }} /> contact@tabardel-roman.fr</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

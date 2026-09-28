'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useModal } from '@/context/ModalContext'
import { useSiteTexts } from '@/lib/useSiteTexts'
import { SERVICES } from '@/components/sections/ServicesSection'
import { Reveal } from './Reveal'
import { DISPLAY_FONT } from './anim'

/* Les trois offres cote a cote, facon « On track / Off track » de
   landonorris.com : celle qu'on survole s'elargit et devoile sa photo,
   sa description et ses points forts. Sur telephone : on touche pour ouvrir. */

const PHOTOS = ['/images/accueil/bureau.jpg', '/images/accueil/jardin.jpg', '/images/accueil/telephones.jpg']

export function ServicesSplit() {
  const { openDevis } = useModal()
  const t = useSiteTexts()
  const [active, setActive] = useState(0)

  return (
    <section id="services" className="relative px-4 md:px-8 py-24 md:py-32" style={{ backgroundColor: 'var(--rt-bg)' }}>
      <div className="max-w-[1500px] mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14 px-2">
          <div>
            <p className="font-body text-[11px] font-700 tracking-[0.3em] uppercase mb-5" style={{ color: 'var(--rt-muted)' }}>{t('services.eyebrow')}</p>
            <h2 className="uppercase" style={{ ...DISPLAY_FONT, color: 'var(--rt-primary)', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.03em', fontSize: 'clamp(2.6rem, 6.5vw, 6.2rem)' }}>
              {t('services.titleLine1')}
              <br />
              <span className="acc-outline">{t('services.titleLine2')}</span>
            </h2>
          </div>
          <p className="font-body text-sm md:text-base max-w-sm leading-relaxed" style={{ color: 'var(--rt-muted)' }}>
            Survolez une offre pour la découvrir. Chaque site est pensé sur mesure, jamais à partir d’un modèle.
          </p>
        </Reveal>

        <div className="flex flex-col md:flex-row gap-3 md:h-[min(72svh,640px)]">
          {SERVICES.map((s, i) => {
            const open = active === i
            return (
              <article
                key={s.number}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="relative overflow-hidden cursor-pointer"
                style={{
                  flexGrow: open ? 2.4 : 1,
                  flexBasis: 0,
                  minHeight: open ? 460 : 120,
                  borderRadius: 22,
                  backgroundColor: open ? 'var(--rt-primary)' : '#FFFFFF',
                  border: '1px solid var(--rt-line)',
                  transition: 'flex-grow 0.9s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.6s, min-height 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${PHOTOS[i]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: open ? 0.22 : 0,
                    transform: open ? 'scale(1)' : 'scale(1.15)',
                    mixBlendMode: 'luminosity',
                    transition: 'opacity 0.8s, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
                <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span style={{ ...DISPLAY_FONT, fontWeight: 700, fontSize: 'clamp(2.4rem, 4vw, 4rem)', lineHeight: 0.8, color: open ? 'rgba(255,255,255,0.35)' : 'var(--rt-line)', transition: 'color 0.6s' }}>
                      {s.number}
                    </span>
                    <span className="flex items-center justify-center shrink-0" style={{ width: 42, height: 42, borderRadius: 999, backgroundColor: open ? '#FFFFFF' : 'var(--rt-soft)', color: 'var(--rt-primary)', transform: open ? 'rotate(0deg)' : 'rotate(-45deg)', transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.6s' }}>
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                  <div>
                    <h3 className="uppercase" style={{ ...DISPLAY_FONT, fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.02em', fontSize: 'clamp(1.8rem, 3.2vw, 3.2rem)', color: open ? '#FFFFFF' : 'var(--rt-primary)', transition: 'color 0.6s' }}>
                      {s.title}
                    </h3>
                    <div className="grid transition-[grid-template-rows] duration-700" style={{ gridTemplateRows: open ? '1fr' : '0fr', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
                      <div className="overflow-hidden">
                        <p className="font-body text-sm md:text-base leading-relaxed mt-4 max-w-md" style={{ color: 'rgba(255,255,255,0.85)' }}>{s.desc}</p>
                        <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 max-w-md">
                          {s.points.map(pt => (
                            <li key={pt} className="flex items-center gap-2 font-body text-xs md:text-sm" style={{ color: '#FFFFFF' }}>
                              <span className="w-1.5 h-1.5 shrink-0" style={{ borderRadius: 999, backgroundColor: '#FFFFFF' }} />
                              {pt}
                            </li>
                          ))}
                        </ul>
                        <button onClick={e => { e.stopPropagation(); openDevis() }} className="acc-btn mt-7" style={{ backgroundColor: '#FFFFFF', color: 'var(--rt-primary)' }}>
                          On en parle
                          <ArrowUpRight size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

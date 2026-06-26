'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useSiteTexts } from '@/lib/useSiteTexts'

const STEPS = [
  {
    num:   '01',
    title: 'Découverte',
    sub:   '15 min, gratuit',
    desc:  "Un appel pour comprendre votre activité, vos objectifs et votre cible. Je pose les bonnes questions pour ne rien rater.",
  },
  {
    num:   '02',
    title: 'Conception',
    sub:   'Semaine 1',
    desc:  "Je crée les maquettes de votre site. On valide ensemble chaque page avant de passer au code. Aucune surprise.",
  },
  {
    num:   '03',
    title: 'Développement',
    sub:   'Semaines 2 à 3',
    desc:  "Je code votre site avec les meilleures technologies : rapide, sécurisé, optimisé pour Google dès la première ligne.",
  },
  {
    num:   '04',
    title: 'Livraison & Suivi',
    sub:   'Mise en ligne',
    desc:  "Mise en ligne, formation à la gestion du contenu, et 1 mois de support inclus. Votre succès, c'est le mien.",
  },
]

export function ProcessSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const t      = useSiteTexts()

  return (
    <section
      ref={ref}
      id="processus"
      className="py-28 md:py-40 px-6 md:px-12 lg:px-20"
      style={{
        position: 'relative',
        backgroundColor: '#EBEBEB',
        backgroundImage: "url('/images/phones-bg.jpg')",
        backgroundSize: 'auto 110%',
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay pour garder le texte lisible */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(235,235,235,0.82)', zIndex: 0 }} />
      <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>

        <div className="mb-20 max-w-xl">
          <motion.p
            className="font-body text-xs tracking-[0.25em] uppercase mb-5"
            style={{ color: 'var(--rt-primary)' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            {t('process.eyebrow')}
          </motion.p>
          <motion.h2
            className="font-display font-800 leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#1A1A1A' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t('process.titleLine1')}
            <br />
            <span style={{ color: '#AAAAAA' }}>{t('process.titleLine2')}</span>
          </motion.h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map(({ num, title, sub, desc }, i) => (
            <motion.div
              key={num}
              className="flex flex-col p-8 md:p-9"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.07)',
              }}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.11 }}
            >
              {/* Step number */}
              <span
                className="font-display font-800 mb-6 select-none"
                style={{ fontSize: '3.5rem', lineHeight: 1, color: 'rgba(0,0,0,0.05)' }}
              >
                {num}
              </span>

              {/* Accent line */}
              <motion.div
                className="w-8 h-0.5 mb-6"
                style={{ backgroundColor: 'var(--rt-primary)' }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.45, delay: 0.22 + i * 0.11 }}
              />

              <h3 className="font-display font-700 text-lg mb-1" style={{ color: '#1A1A1A' }}>
                {title}
              </h3>
              <p className="font-body font-600 text-[10px] tracking-widest uppercase mb-5" style={{ color: 'var(--rt-primary)' }}>
                {sub}
              </p>
              <p className="font-body text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

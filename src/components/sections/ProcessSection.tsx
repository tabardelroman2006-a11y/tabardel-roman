'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  {
    num:   '01',
    title: 'Découverte',
    sub:   '15 min — Gratuit',
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
    sub:   'Semaines 2–3',
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

  return (
    <section
      ref={ref}
      id="processus"
      className="py-28 md:py-40 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: '#0F0F0F' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-20 max-w-xl">
          <motion.p
            className="font-body text-xs tracking-[0.28em] uppercase mb-5"
            style={{ color: '#C8FF00' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            Comment ça marche
          </motion.p>
          <motion.h2
            className="font-display font-bold leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#FFFFFF' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            De l&apos;idée à la mise
            <br />
            <span style={{ color: 'rgba(255,255,255,0.28)' }}>en ligne en 3 semaines.</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
          {STEPS.map(({ num, title, sub, desc }, i) => (
            <motion.div
              key={num}
              className="relative flex flex-col p-8 md:p-10"
              style={{ backgroundColor: '#0F0F0F' }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.12 }}
            >
              {/* Step number */}
              <span
                className="font-display font-black mb-8 select-none"
                style={{
                  fontSize: '4rem',
                  lineHeight: 1,
                  color: 'rgba(255,255,255,0.04)',
                }}
              >
                {num}
              </span>

              {/* Accent line */}
              <motion.div
                className="w-8 h-px mb-6"
                style={{ backgroundColor: '#C8FF00' }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.12 }}
              />

              <h3
                className="font-display font-bold text-xl mb-1"
                style={{ color: '#FFFFFF' }}
              >
                {title}
              </h3>
              <p
                className="font-body text-xs tracking-widest uppercase mb-5"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                {sub}
              </p>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.42)' }}
              >
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

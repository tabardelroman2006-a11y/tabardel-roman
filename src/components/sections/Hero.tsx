'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useModal } from '@/context/ModalContext'

const stats = [
  { num: '12+',  label: 'Projets livrés'     },
  { num: '100%', label: 'Clients satisfaits'  },
  { num: '3–4',  label: 'Semaines de délai'   },
]

export function Hero() {
  const { openDevis } = useModal()

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-32 pb-14 overflow-hidden">

      {/* Badge disponibilité */}
      <motion.div
        className="px-6 lg:px-16"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-[0.2em] uppercase"
          style={{
            border: '1px solid rgba(26,26,26,0.13)',
            color: '#6B6B6B',
            backgroundColor: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Disponible pour de nouveaux projets
        </span>
      </motion.div>

      {/* Titre monumental */}
      <div className="px-6 lg:px-16 w-full">
        <div className="overflow-hidden mb-2">
          <motion.div
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4rem, 11.5vw, 11.5rem)',
                fontWeight: 300,
                lineHeight: 0.88,
                color: '#1A1A1A',
                letterSpacing: '-0.025em',
              }}
            >
              Sites qui
            </h1>
          </motion.div>
        </div>

        <div className="overflow-hidden mb-2">
          <motion.div
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4rem, 11.5vw, 11.5rem)',
                fontWeight: 300,
                lineHeight: 0.88,
                fontStyle: 'italic',
                color: 'rgba(26,26,26,0.28)',
                letterSpacing: '-0.025em',
              }}
            >
              marquent
            </h1>
          </motion.div>
        </div>

        <div className="overflow-hidden">
          <motion.div
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4rem, 11.5vw, 11.5rem)',
                fontWeight: 300,
                lineHeight: 0.88,
                color: '#1A1A1A',
                letterSpacing: '-0.025em',
              }}
            >
              les esprits.
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Barre inférieure */}
      <motion.div
        className="px-6 lg:px-16 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-8"
          style={{ borderTop: '1px solid rgba(26,26,26,0.1)' }}
        >
          {/* Description */}
          <p
            className="max-w-xs text-sm leading-relaxed"
            style={{ color: 'rgba(26,26,26,0.5)' }}
          >
            Création de sites web &amp; référencement naturel
            pour les entrepreneurs qui veulent se démarquer.
          </p>

          {/* Stats */}
          <div className="flex gap-10 lg:gap-16">
            {stats.map(({ num, label }) => (
              <div key={label}>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.6rem, 2.5vw, 2.5rem)',
                    fontWeight: 300,
                    color: '#1A1A1A',
                    lineHeight: 1,
                  }}
                >
                  {num}
                </p>
                <p className="text-xs mt-1.5 tracking-wider uppercase" style={{ color: 'rgba(26,26,26,0.4)' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={openDevis}
            className="group flex items-center gap-3 text-sm font-medium transition-all duration-300 self-start lg:self-auto"
            style={{
              backgroundColor: '#1A1A1A',
              color: '#ffffff',
              padding: '16px 32px',
              borderRadius: '100px',
            }}
            data-cursor-hover
          >
            Demander un devis
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </motion.div>

      {/* Indicateur scroll */}
      <motion.div
        className="absolute right-8 lg:right-16 bottom-14 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="w-px"
          style={{ height: 48, backgroundColor: 'rgba(26,26,26,0.2)' }}
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span
          className="text-[9px] tracking-[0.3em] uppercase"
          style={{ color: 'rgba(26,26,26,0.35)', writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  )
}

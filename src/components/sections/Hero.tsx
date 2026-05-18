'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useModal } from '@/context/ModalContext'

export function Hero() {
  const { openDevis } = useModal()
  const [imgError, setImgError] = useState(false)

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">

      {/* Layout 2 colonnes */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Colonne gauche — texte */}
        <div>
          <div className="overflow-hidden mb-5">
            <motion.h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                fontWeight: 400,
                lineHeight: 1.1,
                color: '#1A1A1A',
              }}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              Votre présence en ligne,{' '}
              <span style={{ fontStyle: 'italic', color: 'rgba(26,26,26,0.55)' }}>
                repensée.
              </span>
            </motion.h1>
          </div>

          <motion.p
            style={{ color: 'rgba(26,26,26,0.6)' }}
            className="text-lg max-w-md mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
          >
            Création de sites web &amp; référencement naturel
            pour les entrepreneurs qui veulent se démarquer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.95 }}
          >
            <button
              onClick={openDevis}
              className="px-8 py-4 text-sm font-medium rounded-xl transition-all hover:scale-105"
              style={{
                backgroundColor: '#1A1A1A',
                color: '#ffffff',
                border: '1px solid transparent',
              }}
            >
              Demander un devis
            </button>
          </motion.div>
        </div>

        {/* Colonne droite — photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="flex justify-center lg:justify-end"
        >
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              width: 'clamp(280px, 40vw, 500px)',
              aspectRatio: '4/5',
              position: 'relative',
              boxShadow: '0 32px 80px rgba(0,0,0,0.15)',
              border: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            {!imgError ? (
              <Image
                src="/images/hero-photo.jpg"
                alt="Setup Roman Tabardel"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                onError={() => setImgError(true)}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(0,0,0,0.04)' }}
              >
                <p className="text-xs text-center px-6" style={{ color: 'rgba(26,26,26,0.4)' }}>
                  [Déposer hero-photo.jpg dans public/images/]
                </p>
              </div>
            )}
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <motion.div
          className="w-px"
          style={{ height: 44, backgroundColor: 'rgba(26,26,26,0.25)' }}
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(26,26,26,0.4)' }}>
          Scroll
        </span>
      </motion.div>
    </section>
  )
}

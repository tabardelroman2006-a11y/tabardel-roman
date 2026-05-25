'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { LiquidHero } from '@/components/effects/LiquidHero'
import { useModal } from '@/context/ModalContext'

export function Hero() {
  const { openDevis } = useModal()

  return (
    <LiquidHero>
      <div className="h-full flex items-center px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-16">

          {/* Left: Text */}
          <div>
            <motion.p
              className="font-inter text-xs tracking-[0.25em] uppercase mb-6"
              style={{ color: 'rgba(255,255,255,0.6)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Création web & SEO — Ardèche & partout en France
            </motion.p>

            <div className="overflow-hidden mb-6">
              <motion.h1
                className="font-playfair text-white leading-[1.05]"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                Votre présence
                <br />
                <em className="italic">en ligne,</em>
                <br />
                repensée.
              </motion.h1>
            </div>

            <motion.p
              className="font-inter text-base max-w-sm leading-relaxed mb-10"
              style={{ color: 'rgba(255,255,255,0.65)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Des sites web sur mesure et un référencement naturel efficace, pour les entreprises qui méritent mieux que le banal.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <button
                onClick={openDevis}
                className="bg-white text-black font-inter text-sm tracking-widest uppercase px-8 py-4 rounded-full hover:bg-white/80 transition-colors duration-300"
                data-cursor-hover
              >
                Demander un devis
              </button>
              <a
                href="/services"
                className="font-inter text-sm tracking-wide text-white px-8 py-4 rounded-full border border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300"
                data-cursor-hover
              >
                Voir les projets →
              </a>
            </motion.div>
          </div>

          {/* Right: Image frame */}
          <motion.div
            className="hidden lg:flex lg:justify-center lg:items-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="relative" style={{ maxHeight: 'calc(100vh - 100px)', width: '100%' }}>
              <div
                className="p-1"
                style={{
                  border: '1px solid rgba(214,211,209,0.8)',
                  backgroundColor: 'rgba(247,245,240,0.3)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: '4/3', maxHeight: 'calc(100vh - 120px)', minHeight: 380 }}
                >
                  <Image
                    src="/images/hero-photo.jpg"
                    alt="Espace de travail — Roman Tabardel"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 0vw, 40vw"
                    style={{ filter: 'grayscale(100%)' }}
                  />
                  <div className="absolute inset-0" style={{ backgroundColor: 'rgba(250,250,248,0.10)' }} />
                </div>
              </div>
              {/* Floating label */}
              <div
                className="absolute -bottom-4 -left-4 px-4 py-2"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <p className="font-playfair text-xs italic" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Design & Développement
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="font-inter text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Défiler
        </span>
        <motion.div
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)' }}
          animate={{ scaleY: [0, 1, 0], transformOrigin: 'top' }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    </LiquidHero>
  )
}

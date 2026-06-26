'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { useModal } from '@/context/ModalContext'

export function Hero() {
  const { openDevis } = useModal()

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: '#F4F4F4', paddingTop: '80px' }}
    >
      <div className="relative max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-20 py-20 md:py-28">

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT — text ── */}
          <div>

            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-3 mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <span className="block h-px w-8 shrink-0" style={{ backgroundColor: '#1B3A6B' }} />
              <p className="font-body text-xs tracking-[0.25em] uppercase" style={{ color: '#6B6B6B' }}>
                Création web &amp; SEO, Drôme &amp; partout en France
              </p>
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden">
              <motion.h1
                className="font-display font-800 leading-[0.92] tracking-tight mb-4"
                style={{ fontSize: 'clamp(3.2rem, 7vw, 7rem)', color: '#1A1A1A' }}
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                Mon métier ?
              </motion.h1>
            </div>

            {/* Sub headline */}
            <div className="overflow-hidden mb-12">
              <motion.p
                className="font-display font-700 tracking-tight leading-tight"
                style={{
                  fontSize: 'clamp(1.6rem, 3.5vw, 3.5rem)',
                  color: '#AAAAAA',
                  fontStyle: 'italic',
                }}
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                Mettre en avant le vôtre.
              </motion.p>
            </div>

            {/* Description */}
            <motion.p
              className="font-body text-base md:text-lg max-w-lg mb-12 leading-relaxed"
              style={{ color: '#6B6B6B' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              Je conçois des sites web sur mesure qui convertissent, pour les artisans,
              indépendants et PME qui veulent une présence en ligne qui travaille vraiment
              pour eux.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <button
                onClick={openDevis}
                className="flex items-center gap-2.5 font-body font-700 text-sm px-8 py-4 tracking-wide transition-opacity duration-200 hover:opacity-80"
                style={{ backgroundColor: '#1B3A6B', color: '#FFFFFF' }}
              >
                <Phone size={14} />
                Appel gratuit (15 min)
              </button>

              <a
                href="/services"
                className="btn-ghost flex items-center gap-2 font-body font-600 text-sm px-8 py-4"
              >
                Voir mes réalisations
                <ArrowRight size={14} />
              </a>
            </motion.div>


          </div>{/* end left col */}

          {/* ── RIGHT — image ── */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: '12px',
                height: 'clamp(440px, 58vh, 640px)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.10)',
              }}
            >
              <Image
                src="/images/hero-desk.jpg"
                alt="Espace de travail Roman Tabardel"
                fill
                className="object-cover object-center"
                priority
                sizes="50vw"
              />
              {/* subtle navy overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(27,58,107,0.10) 0%, transparent 55%)' }}
              />
            </div>
          </motion.div>

        </div>{/* end grid */}
      </div>

      {/* Scroll pulse */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="w-px h-12 mx-auto"
          style={{ background: 'linear-gradient(to bottom, #1B3A6B, transparent)' }}
          animate={{ scaleY: [0, 1, 0], transformOrigin: 'top' }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    </section>
  )
}

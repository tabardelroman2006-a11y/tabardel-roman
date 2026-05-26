'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, ArrowRight } from 'lucide-react'
import { useModal } from '@/context/ModalContext'

export function CTAFinal() {
  const { openDevis } = useModal()
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      className="py-28 md:py-40 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: '#C8FF00' }}
    >
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">

          {/* Left */}
          <div>
            <motion.p
              className="font-body text-xs tracking-[0.28em] uppercase mb-6"
              style={{ color: 'rgba(10,10,10,0.5)' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              Passons à l&apos;action
            </motion.p>

            <div className="overflow-hidden">
              <motion.h2
                className="font-display font-extrabold leading-[0.92] tracking-tight"
                style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', color: '#0A0A0A' }}
                initial={{ y: '100%', opacity: 0 }}
                animate={inView ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                Votre prochain site
                <br />
                commence par un appel.
              </motion.h2>
            </div>

            <motion.p
              className="font-body text-base mt-8 max-w-lg"
              style={{ color: 'rgba(10,10,10,0.6)' }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              15 minutes, sans engagement. On parle de votre projet, je vous dis exactement
              ce que je peux faire pour vous — et pour combien.
            </motion.p>
          </div>

          {/* Right: CTAs */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <button
              onClick={openDevis}
              className="flex items-center justify-center gap-3 font-body font-bold text-sm px-10 py-5 transition-opacity duration-200 hover:opacity-75 whitespace-nowrap"
              style={{ backgroundColor: '#0A0A0A', color: '#C8FF00' }}
            >
              <Phone size={15} />
              Appel gratuit — 15 min
            </button>

            <a
              href="/contact"
              className="flex items-center justify-center gap-2 font-body text-sm px-10 py-5 border-2 transition-all duration-200 whitespace-nowrap"
              style={{ borderColor: 'rgba(10,10,10,0.25)', color: 'rgba(10,10,10,0.65)' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = '#0A0A0A'
                ;(e.currentTarget as HTMLElement).style.color = '#0A0A0A'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(10,10,10,0.25)'
                ;(e.currentTarget as HTMLElement).style.color = 'rgba(10,10,10,0.65)'
              }}
            >
              Envoyer un message
              <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

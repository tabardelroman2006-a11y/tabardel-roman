'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { MouseDecoration } from '@/components/decorations/MouseDecoration'

export function MessageSection() {
  const impactRef = useRef<HTMLDivElement>(null)
  const impactInView = useInView(impactRef, { once: true, margin: '-100px' })

  return (
    <section className="py-32 md:py-48 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto flex items-center gap-12">
        {/* Text centered */}
        <div className="flex-1 text-center">
          <ScrollReveal>
            <p className="font-inter text-xs tracking-[0.25em] text-[#6B6B6B] uppercase mb-8">
              La vision
            </p>
          </ScrollReveal>

          <div ref={impactRef} className="overflow-hidden">
            <motion.h2
              className="font-playfair text-4xl md:text-6xl lg:text-7xl text-[#1A1A1A] leading-[1.1]"
              initial={{ y: '100%', opacity: 0 }}
              animate={impactInView ? { y: '0%', opacity: 1 } : {}}
              transition={{ duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              Au service de votre entreprise
              <br />
              <em className="italic text-[#6B6B6B]">et de votre univers.</em>
            </motion.h2>
          </div>

          <ScrollReveal delay={0.3}>
            <p className="mt-10 font-inter text-base text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
              Chaque projet est unique. Je conçois des expériences numériques qui reflètent
              véritablement l'identité et les valeurs de votre entreprise — pas des templates,
              mais des créations sur mesure.
            </p>
          </ScrollReveal>
        </div>

        {/* Mouse decoration — right side */}
        <MouseDecoration className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-500" />
      </div>
    </section>
  )
}

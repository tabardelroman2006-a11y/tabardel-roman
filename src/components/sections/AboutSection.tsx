'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useSiteTexts } from '@/lib/useSiteTexts'

export function AboutSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const t      = useSiteTexts()

  return (
    <section
      ref={ref}
      id="qui-sommes-nous"
      className="py-28 md:py-40 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: '#F4F4F4' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">

        <motion.div
          className="w-full max-w-md mx-auto lg:mx-0 overflow-hidden"
          style={{ position: 'relative', aspectRatio: '3 / 4', borderRadius: '16px' }}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/photo-identite.jpg"
            alt="Roman Tabardel, créateur de sites web"
            fill
            sizes="(max-width: 1024px) 90vw, 448px"
            style={{ objectFit: 'cover' }}
          />
        </motion.div>

        <div>
          <motion.p
            className="font-body text-xs tracking-[0.25em] uppercase mb-5"
            style={{ color: 'var(--rt-primary)' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('about.eyebrow')}
          </motion.p>
          <motion.h2
            className="font-display font-800 leading-tight mb-8"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#1A1A1A' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {t('about.titleLine1')}
            <br />
            <span style={{ color: '#AAAAAA' }}>{t('about.titleLine2')}</span>
          </motion.h2>

          <motion.div
            className="space-y-5 font-body text-base leading-relaxed max-w-xl"
            style={{ color: '#6B6B6B' }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <p>{t('about.paragraph1')}</p>
            <p>{t('about.paragraph2')}</p>
          </motion.div>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link
              href="/notre-histoire"
              className="inline-flex items-center gap-2 font-body font-700 text-sm transition-opacity duration-200 hover:opacity-70"
              style={{ color: 'var(--rt-primary)' }}
            >
              En savoir plus sur moi
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

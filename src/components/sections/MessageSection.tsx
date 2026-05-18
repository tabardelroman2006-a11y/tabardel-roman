'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const words = [
  'Je', 'crois', 'qu\'un', 'site', 'web', 'n\'est', 'pas', 'un',
  'outil.', 'C\'est', 'une', 'première', 'impression,', 'une',
  'promesse,', 'et', 'parfois', 'la', 'seule', 'chance', 'de',
  'convaincre.', 'Je', 'construis', 'des', 'sites', 'qui',
  'marquent', 'les', 'esprits', '—', 'et', 'convertissent.'
]

function Word({ word, progress, range }: { word: string; progress: ReturnType<typeof useScroll>['scrollYProgress']; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [8, 0])
  return (
    <motion.span style={{ opacity, y }} className="inline-block mr-[0.35em]">
      {word}
    </motion.span>
  )
}

export function MessageSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.3'],
  })

  return (
    <section
      ref={ref}
      className="py-32 md:py-48"
      style={{ backgroundColor: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(2px)' }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Label */}
        <motion.p
          className="text-xs tracking-[0.35em] uppercase mb-12"
          style={{ color: 'rgba(26,26,26,0.35)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Manifeste
        </motion.p>

        {/* Texte mot par mot */}
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.9rem, 4vw, 3.5rem)',
            fontWeight: 400,
            lineHeight: 1.25,
            color: '#1A1A1A',
          }}
        >
          {words.map((word, i) => (
            <Word
              key={i}
              word={word}
              progress={scrollYProgress}
              range={[i / words.length, (i + 6) / words.length]}
            />
          ))}
        </p>

        {/* Signature */}
        <motion.div
          className="mt-16 flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <div className="w-8 h-px" style={{ backgroundColor: 'rgba(26,26,26,0.3)' }} />
          <span
            className="text-sm"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'rgba(26,26,26,0.45)' }}
          >
            Roman Tabardel
          </span>
        </motion.div>
      </div>
    </section>
  )
}

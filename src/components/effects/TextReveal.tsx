'use client'

import { motion } from 'framer-motion'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function TextReveal({
  text,
  className,
  delay = 0,
  as: Tag = 'h1',
}: TextRevealProps) {
  const words = text.split(' ')

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  }

  const wordVariant = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={container}
      className={className}
    >
      <Tag style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em' }}>
        {words.map((word, i) => (
          <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
            <motion.span
              style={{ display: 'inline-block' }}
              variants={wordVariant}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  )
}

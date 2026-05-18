'use client'

import { motion } from 'framer-motion'

export function MessageSection() {
  return (
    <section className="bg-cream-50 py-32 md:py-40 flex items-center justify-center min-h-[60vh]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {['Au service de votre', 'entreprise et de votre univers.'].map((line, li) => (
            <div key={li} className="overflow-hidden">
              <motion.p
                variants={{
                  hidden: { y: '110%', opacity: 0 },
                  visible: { y: '0%', opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
                }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 5vw, 3.75rem)',
                  fontWeight: 400,
                  lineHeight: 1.15,
                  color: '#1A1A1A',
                }}
              >
                {line}
              </motion.p>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="mx-auto mt-10 bg-stone-300"
          style={{ height: 1 }}
          initial={{ width: 0 }}
          whileInView={{ width: '80px' }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.p
          className="mt-10 max-w-2xl mx-auto leading-relaxed"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.4rem, 2.8vw, 2rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'rgba(26,26,26,0.75)',
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          Je crée des sites web sur-mesure et optimise votre référencement naturel
          pour que votre entreprise soit trouvée, reconnue, et choisie —
          avant même que vos concurrents ne soient remarqués.
        </motion.p>
      </div>
    </section>
  )
}

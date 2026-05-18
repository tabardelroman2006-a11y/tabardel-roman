'use client'

import { useRef, useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'

function FountainPen() {
  return (
    <svg viewBox="0 0 80 360" fill="none" xmlns="http://www.w3.org/2000/svg" width="80" height="360">
      {/* Capuchon */}
      <rect x="22" y="0" width="36" height="16" rx="8" fill="#111" />
      {/* Corps principal */}
      <rect x="22" y="14" width="36" height="200" rx="5" fill="#1A1A1A" />
      {/* Bague dorée */}
      <rect x="20" y="210" width="40" height="10" rx="3" fill="#C8A96E" />
      {/* Grip (partie centrale plus fine) */}
      <rect x="25" y="218" width="30" height="90" rx="4" fill="#111" />
      {/* Reflet sur le corps */}
      <rect x="28" y="18" width="6" height="185" rx="3" fill="rgba(255,255,255,0.07)" />
      {/* Clip */}
      <rect x="54" y="4" width="5" height="160" rx="2.5" fill="#2A2A2A" />
      <circle cx="56.5" cy="168" r="4" fill="#2A2A2A" />
      {/* Transition vers la plume */}
      <path d="M25 308 L40 308 L55 308 L55 310 L25 310 Z" fill="#111" />
      <path d="M25 308 L30 360 L50 360 L55 308 Z" fill="#222" />
      {/* Plume (nib) */}
      <path d="M30 348 L40 360 L50 348 L45 335 L35 335 Z" fill="#C8A96E" />
      {/* Fente de la plume */}
      <line x1="40" y1="340" x2="40" y2="360" stroke="#111" strokeWidth="1.5" />
      {/* Anneau de séparation */}
      <rect x="23" y="304" width="34" height="6" rx="2" fill="#C8A96E" />
    </svg>
  )
}

export function MessageSection() {
  const penRef = useRef<HTMLDivElement>(null)

  const springConfig = { stiffness: 180, damping: 22 }
  const penX      = useSpring(0, springConfig)
  const penY      = useSpring(0, springConfig)
  const penRotate = useSpring(0, { stiffness: 140, damping: 18 })

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!penRef.current) return

      const rect   = penRef.current.getBoundingClientRect()
      const cx     = rect.left + rect.width  / 2
      const cy     = rect.top  + rect.height / 2
      const dx     = e.clientX - cx
      const dy     = e.clientY - cy
      const dist   = Math.sqrt(dx * dx + dy * dy)
      const radius = 260
      const maxMove = 90

      if (dist < radius) {
        const force = Math.pow((radius - dist) / radius, 1.4)
        penX.set(-(dx / dist) * maxMove * force)
        penY.set(-(dy / dist) * maxMove * force)
        penRotate.set(-(dx / dist) * 20 * force)
      } else {
        penX.set(0)
        penY.set(0)
        penRotate.set(0)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [penX, penY, penRotate])

  return (
    <section className="bg-cream-50 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-16 items-center">

          {/* Texte — colonne gauche, format long */}
          <div>
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
                      hidden:   { y: '110%', opacity: 0 },
                      visible:  { y: '0%',   opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize:   'clamp(2rem, 5vw, 3.75rem)',
                      fontWeight: 400,
                      lineHeight: 1.15,
                      color:      '#1A1A1A',
                    }}
                  >
                    {line}
                  </motion.p>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="mx-auto mt-8 mb-10 bg-stone-300"
              style={{ height: 1, marginLeft: 0 }}
              initial={{ width: 0 }}
              whileInView={{ width: '80px' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize:   'clamp(1.4rem, 2.8vw, 2rem)',
                fontWeight: 400,
                fontStyle:  'italic',
                color:      'rgba(26,26,26,0.75)',
                lineHeight: 1.5,
                maxWidth:   '720px',
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

          {/* Stylo — colonne droite, esquive la souris */}
          <div className="hidden lg:flex justify-center items-center" ref={penRef}>
            <motion.div
              style={{
                x:      penX,
                y:      penY,
                rotate: penRotate,
                cursor: 'none',
              }}
              animate={{ rotate: [0, 3, -2, 1, 0] }}
              transition={{
                rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <FountainPen />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'

const REVIEWS = [
  {
    name:    'Thomas Girard',
    company: 'Le Bistrot du Marché',
    role:    'Gérant de restaurant',
    text:
      "Roman a totalement transformé notre présence en ligne. Les réservations ont augmenté de 40% dès le premier mois. Un professionnel réactif, à l'écoute et d'une précision remarquable.",
    stars: 5,
  },
  {
    name:    'Éric Fontaine',
    company: 'Fontaine Plomberie',
    role:    'Artisan plombier',
    text:
      "Enfin un site qui me ressemble. Roman a su capturer l'essence de mon métier. Mes clients me disent que c'est pro — et j'ai eu 3 nouveaux chantiers grâce au référencement en 2 semaines.",
    stars: 5,
  },
  {
    name:    'Léa Moreau',
    company: 'Studio Léa Coiffure',
    role:    'Coiffeuse indépendante',
    text:
      "Je n'y connaissais rien, mais Roman m'a guidée à chaque étape. Le résultat est magnifique et mes clientes adorent prendre rendez-vous en ligne maintenant.",
    stars: 5,
  },
  {
    name:    'Sophie & Marc Chevallier',
    company: 'Menuiserie Chevallier',
    role:    'PME artisanale',
    text:
      "Vieux site daté depuis 10 ans. Roman l'a entièrement refondu — professionnalisme exemplaire, délais respectés, et un référencement qui porte déjà ses fruits.",
    stars: 5,
  },
  {
    name:    'Julien Perrot',
    company: 'Perrot Shop',
    role:    'Entrepreneur e-commerce',
    text:
      "Roman m'a créé une boutique performante et optimisée SEO. Ses conseils en référencement sont concrets et efficaces. Je recommande à 100% pour toute entreprise sérieuse.",
    stars: 5,
  },
]

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={11} fill="#C8FF00" color="#C8FF00" />
      ))}
    </div>
  )
}

export function ReviewsSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="avis"
      className="py-28 md:py-40 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.p
              className="font-body text-xs tracking-[0.28em] uppercase mb-5"
              style={{ color: '#C8FF00' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              Témoignages
            </motion.p>
            <motion.h2
              className="font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#FFFFFF' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Ce qu&apos;ils disent.
              <br />
              <span style={{ color: 'rgba(255,255,255,0.28)' }}>Sans filtre.</span>
            </motion.h2>
          </div>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <StarRow count={5} />
            <span className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              5/5 · 100% satisfaits
            </span>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map(({ name, company, role, text, stars }, i) => (
            <motion.div
              key={name}
              className="flex flex-col p-7"
              style={{
                backgroundColor: '#111111',
                border:          '1px solid rgba(255,255,255,0.06)',
              }}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.12 + i * 0.09 }}
            >
              <StarRow count={stars} />

              <p
                className="font-body text-sm leading-relaxed my-6 flex-1"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                &ldquo;{text}&rdquo;
              </p>

              <div
                className="pt-5"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="font-display font-semibold text-sm" style={{ color: '#FFFFFF' }}>
                  {name}
                </p>
                <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {company} · {role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

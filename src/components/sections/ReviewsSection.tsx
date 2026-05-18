'use client'

import { motion } from 'framer-motion'

const featured = {
  name: 'Laura K.',
  role: 'Restaurant Le Jardin',
  text: 'Notre fréquentation a augmenté depuis la refonte. Le site reflète parfaitement l\'ambiance de notre établissement. Roman comprend vraiment l\'univers de ses clients.',
}

const reviews = [
  {
    name: 'Sophie M.',
    role: 'La Belle Coupe — Coiffeuse',
    text: 'Roman a su créer un site qui me ressemble vraiment. Mes clientes me disent souvent qu\'elles ont réservé grâce au site.',
  },
  {
    name: 'Marc D.',
    role: 'Plomberie Duval — Artisan',
    text: 'Enfin un site professionnel sans se ruiner. Simple, efficace, et Roman a tout géré rapidement.',
  },
  {
    name: 'Pierre T.',
    role: 'Menuiserie Tessier — PME',
    text: 'Sérieux, réactif et de bon conseil. Je recommande sans hésiter.',
  },
  {
    name: 'Emma R.',
    role: 'Coach indépendante',
    text: 'Un site qui convertit vraiment. Mes prises de contact ont doublé en deux mois.',
  },
]

function Stars() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#1A1A1A">
          <path d="M6 0l1.5 4.5H12L8.25 7.5 9.75 12 6 9 2.25 12l1.5-4.5L0 4.5h4.5z" />
        </svg>
      ))}
    </div>
  )
}

export function ReviewsSection() {
  return (
    <section
      className="py-24 md:py-32"
      style={{ backgroundColor: 'rgba(250,250,248,0.88)', backdropFilter: 'blur(4px)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Label */}
        <motion.p
          className="text-xs tracking-[0.35em] uppercase mb-16"
          style={{ color: 'rgba(26,26,26,0.35)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Témoignages
        </motion.p>

        {/* Citation vedette */}
        <motion.div
          className="mb-20 pb-20"
          style={{ borderBottom: '1px solid rgba(26,26,26,0.08)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Guillemet décoratif */}
          <p
            className="mb-6 leading-none"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '8rem',
              fontWeight: 300,
              color: 'rgba(26,26,26,0.07)',
              lineHeight: 0.7,
            }}
          >
            "
          </p>

          <blockquote
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 3.5vw, 3rem)',
              fontWeight: 400,
              lineHeight: 1.3,
              color: '#1A1A1A',
              letterSpacing: '-0.01em',
              maxWidth: '900px',
            }}
          >
            {featured.text}
          </blockquote>

          <div className="mt-8 flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium"
              style={{ backgroundColor: '#1A1A1A', color: '#ffffff' }}
            >
              {featured.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#1A1A1A' }}>{featured.name}</p>
              <p className="text-xs" style={{ color: 'rgba(26,26,26,0.45)' }}>{featured.role}</p>
            </div>
            <div className="ml-4">
              <Stars />
            </div>
          </div>
        </motion.div>

        {/* Grille de témoignages secondaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              className="flex flex-col gap-5 p-6 rounded-2xl"
              style={{
                backgroundColor: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(26,26,26,0.07)',
                backdropFilter: 'blur(8px)',
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              data-cursor-hover
            >
              <Stars />
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(26,26,26,0.65)' }}>
                &ldquo;{review.text}&rdquo;
              </p>
              <div>
                <p className="text-sm font-medium" style={{ color: '#1A1A1A' }}>{review.name}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(26,26,26,0.4)' }}>{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

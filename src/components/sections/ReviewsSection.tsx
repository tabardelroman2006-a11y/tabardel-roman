'use client'

import { motion } from 'framer-motion'

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
    name: 'Laura K.',
    role: 'Restaurant Le Jardin — Restauratrice',
    text: 'Notre fréquentation a augmenté depuis la refonte. Le site reflète parfaitement l\'ambiance de notre établissement.',
  },
  {
    name: 'Pierre T.',
    role: 'Menuiserie Tessier — PME',
    text: 'Sérieux, réactif et de bon conseil. Je recommande sans hésiter.',
  },
  {
    name: 'Emma R.',
    role: 'Coach indépendante',
    text: 'Un site qui convertit vraiment. Mes prises de contact ont doublé.',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-charcoal text-sm">★</span>
      ))}
    </div>
  )
}

export function ReviewsSection() {
  return (
    <section className="bg-cream-50 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="text-charcoal"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
            }}
          >
            Ce qu'ils disent
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {reviews.map((review) => (
            <motion.div
              key={review.name}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="bg-white rounded-2xl p-7 flex flex-col gap-4"
              style={{ border: '0.5px solid #E7E5E4' }}
              data-cursor-hover
            >
              <Stars />
              <p className="text-charcoal text-sm leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
              <div>
                <p className="text-charcoal font-medium text-sm">{review.name}</p>
                <p className="text-muted text-xs mt-0.5">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

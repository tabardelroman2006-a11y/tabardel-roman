'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    title: 'Livron BMX Club',
    description: 'Site vitrine pour un club BMX local. Design dynamique, moderne et adapté à tous les supports.',
    url: 'https://livron-bmx-club.base44.app/',
    available: true,
    image: '/images/bmx-livron.jpg',
  },
  {
    title: 'Chalet La Taiga',
    description: 'Site vitrine pour un chalet de montagne à Lans-en-Vercors. Ambiance chaleureuse, réservations et expérience premium.',
    url: 'https://chalet-taiga.fr/',
    available: true,
    image: '',
  },
  {
    title: 'Bientôt disponible',
    description: 'Un nouveau projet en cours de finalisation.',
    url: '',
    available: false,
    image: '',
  },
  {
    title: 'Bientôt disponible',
    description: 'Un nouveau projet en cours de finalisation.',
    url: '',
    available: false,
    image: '',
  },
]

export function Portfolio() {
  return (
    <section className="bg-cream-50 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="text-charcoal"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 400,
            }}
          >
            Nos réalisations
          </h1>
          <p className="text-muted mt-4 max-w-xl">
            Des sites pensés pour convertir, conçus pour durer.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
              className={`rounded-2xl overflow-hidden ${!project.available ? 'opacity-50 pointer-events-none' : ''}`}
            >
              {project.available ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-stone-100 hover:bg-stone-200 transition-colors p-8 rounded-2xl"
                  data-cursor-hover
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-full h-48 rounded-xl overflow-hidden relative bg-stone-200">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-xs text-muted">[Aperçu à fournir]</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-charcoal font-medium text-lg mb-2">{project.title}</h3>
                      <p className="text-muted text-sm leading-relaxed">{project.description}</p>
                    </div>
                    <ArrowUpRight size={18} className="text-muted group-hover:text-charcoal shrink-0 mt-1 ml-4 transition-colors" />
                  </div>
                  <span className="inline-flex items-center gap-1 mt-5 text-xs text-charcoal font-medium group-hover:gap-2 transition-all">
                    Voir le site <ArrowUpRight size={12} />
                  </span>
                </a>
              ) : (
                <div className="bg-stone-50 p-8 rounded-2xl">
                  <div className="w-full h-48 bg-stone-100 rounded-xl flex items-center justify-center blur-sm">
                    <span className="text-xs text-muted">Bientôt disponible</span>
                  </div>
                  <div className="mt-6">
                    <p className="text-xs text-muted uppercase tracking-widest">Bientôt disponible</p>
                    <p className="text-muted text-sm mt-2 blur-sm">{project.description}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

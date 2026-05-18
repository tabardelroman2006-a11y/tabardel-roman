'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    num: '01',
    title: 'Livron BMX Club',
    description: 'Site vitrine pour un club BMX local. Design dynamique, moderne et adapté à tous les supports.',
    url: 'https://livron-bmx-club.base44.app/',
    tag: 'Site vitrine',
    available: true,
    image: '/images/bmx-livron.jpg',
  },
  {
    num: '02',
    title: 'Chalet La Taiga',
    description: 'Site vitrine pour un chalet de montagne à Lans-en-Vercors. Ambiance chaleureuse et expérience premium.',
    url: 'https://chalet-taiga.fr/',
    tag: 'Hébergement',
    available: true,
    image: '/images/chalet-taiga.jpg',
  },
  {
    num: '03',
    title: 'Bientôt disponible',
    description: '',
    url: '',
    tag: '',
    available: false,
    image: '',
  },
  {
    num: '04',
    title: 'Bientôt disponible',
    description: '',
    url: '',
    tag: '',
    available: false,
    image: '',
  },
]

export function Portfolio() {
  return (
    <section
      className="py-24 md:py-32"
      style={{ backgroundColor: 'rgba(245,243,239,0.9)', backdropFilter: 'blur(4px)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: 'rgba(26,26,26,0.35)' }}>
              Réalisations
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 300,
                lineHeight: 1,
                color: '#1A1A1A',
                letterSpacing: '-0.02em',
              }}
            >
              Nos derniers<br />
              <em style={{ fontStyle: 'italic', color: 'rgba(26,26,26,0.35)' }}>projets.</em>
            </h2>
          </div>
          <p className="text-sm max-w-xs md:text-right leading-relaxed" style={{ color: 'rgba(26,26,26,0.5)' }}>
            Des sites pensés pour convertir, conçus pour durer.
          </p>
        </motion.div>

        {/* Grille 2×2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              {project.available ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-3xl overflow-hidden"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    border: '1px solid rgba(26,26,26,0.07)',
                    backdropFilter: 'blur(8px)',
                  }}
                  data-cursor-hover
                >
                  {/* Image */}
                  <div className="relative w-full overflow-hidden" style={{ height: '280px' }}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Overlay on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(26,26,26,0.35)' }}
                    >
                      <span
                        className="flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-full"
                        style={{ backgroundColor: '#ffffff', color: '#1A1A1A' }}
                      >
                        Voir le site <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-7 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="text-xs tracking-widest uppercase"
                          style={{ color: 'rgba(26,26,26,0.35)' }}
                        >
                          {project.num}
                        </span>
                        {project.tag && (
                          <span
                            className="text-xs px-2.5 py-1 rounded-full"
                            style={{
                              border: '1px solid rgba(26,26,26,0.12)',
                              color: 'rgba(26,26,26,0.5)',
                            }}
                          >
                            {project.tag}
                          </span>
                        )}
                      </div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.4rem',
                          fontWeight: 400,
                          color: '#1A1A1A',
                        }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-sm mt-1.5 leading-relaxed max-w-xs" style={{ color: 'rgba(26,26,26,0.5)' }}>
                        {project.description}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="shrink-0 mt-1 ml-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: 'rgba(26,26,26,0.35)' }}
                    />
                  </div>
                </a>
              ) : (
                <div
                  className="rounded-3xl overflow-hidden opacity-40"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    border: '1px solid rgba(26,26,26,0.07)',
                  }}
                >
                  <div
                    className="w-full flex items-center justify-center"
                    style={{
                      height: '280px',
                      background: 'repeating-linear-gradient(45deg, rgba(26,26,26,0.03) 0px, rgba(26,26,26,0.03) 1px, transparent 1px, transparent 20px)',
                    }}
                  />
                  <div className="p-7">
                    <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(26,26,26,0.35)' }}>
                      {project.num}
                    </span>
                    <p
                      className="mt-2"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.4rem',
                        fontWeight: 400,
                        color: 'rgba(26,26,26,0.4)',
                      }}
                    >
                      Bientôt disponible
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

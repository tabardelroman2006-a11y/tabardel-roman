'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useModal } from '@/context/ModalContext'

const services = [
  {
    title: 'Création de site vitrine',
    description: 'Un site sur mesure qui reflète votre identité et convertit vos visiteurs en clients. Design unique, responsive, rapide.',
    tag: 'Le plus demandé',
  },
  {
    title: 'Création de site e-commerce',
    description: 'Vendez en ligne avec une boutique élégante et performante. Paiement sécurisé, gestion des stocks, expérience d\'achat premium.',
    tag: null,
  },
  {
    title: 'Refonte de site existant',
    description: 'Donnez une nouvelle vie à votre présence en ligne. Design modernisé, performances optimisées, contenu réorganisé.',
    tag: null,
  },
  {
    title: 'Référencement naturel (SEO)',
    description: 'Apparaissez en tête des résultats Google et attirez des clients qualifiés sans payer de publicité.',
    tag: null,
  },
  {
    title: 'Audit SEO',
    description: 'Analyse complète de votre site avec recommandations prioritaires. Identifiez les blocages qui vous coûtent des clients.',
    tag: null,
  },
]

export function ServicesSection() {
  const { openDevis } = useModal()

  return (
    <>
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)' }}
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
                Prestations
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
                Ce que je<br/>
                <em style={{ fontStyle: 'italic', color: 'rgba(26,26,26,0.35)' }}>propose.</em>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed md:text-right" style={{ color: 'rgba(26,26,26,0.5)' }}>
              Chaque prestation est pensée pour répondre à un besoin précis et produire des résultats mesurables.
            </p>
          </motion.div>

          {/* Liste numérotée */}
          <div>
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                className="group flex items-start gap-6 lg:gap-12 py-7 border-b cursor-pointer"
                style={{ borderColor: 'rgba(26,26,26,0.08)' }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                whileHover={{ x: 4 }}
                data-cursor-hover
              >
                {/* Numéro */}
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                    fontWeight: 300,
                    color: 'rgba(26,26,26,0.1)',
                    lineHeight: 1,
                    minWidth: '4rem',
                    transition: 'color 0.4s',
                  }}
                  className="group-hover:!text-stone-300 select-none"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Contenu */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.2rem, 2vw, 1.75rem)',
                        fontWeight: 400,
                        color: '#1A1A1A',
                      }}
                    >
                      {service.title}
                    </h3>
                    {service.tag && (
                      <span
                        className="text-xs px-2.5 py-1 rounded-full hidden md:inline-flex"
                        style={{
                          border: '1px solid rgba(26,26,26,0.15)',
                          color: 'rgba(26,26,26,0.5)',
                          backgroundColor: 'rgba(26,26,26,0.04)',
                        }}
                      >
                        {service.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'rgba(26,26,26,0.5)' }}>
                    {service.description}
                  </p>
                </div>

                {/* Flèche */}
                <ArrowUpRight
                  size={20}
                  className="mt-2 shrink-0 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: '#1A1A1A' }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-32 overflow-hidden relative"
        style={{ backgroundColor: '#1A1A1A' }}
      >
        {/* Topo lines décoratifs */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(ellipse at 60% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                fontWeight: 300,
                lineHeight: 0.95,
                color: '#ffffff',
                letterSpacing: '-0.025em',
              }}
            >
              Prêt à lancer<br />
              <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.35)' }}>votre projet ?</em>
            </h2>

            <div className="flex flex-col gap-4">
              <p className="text-sm max-w-xs" style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
                Réponse sous 24h. Devis gratuit et sans engagement.
              </p>
              <button
                onClick={openDevis}
                className="group self-start flex items-center gap-3 text-sm font-medium transition-all duration-300"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#1A1A1A',
                  padding: '18px 36px',
                  borderRadius: '100px',
                }}
                data-cursor-hover
              >
                Demander un devis
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

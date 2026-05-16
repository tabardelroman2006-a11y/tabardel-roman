'use client'

import { motion } from 'framer-motion'
import { Globe, ShoppingCart, RefreshCw, Search, BarChart2 } from 'lucide-react'
import { useModal } from '@/context/ModalContext'

const services = [
  {
    icon: Globe,
    title: 'Création de site vitrine',
    description: 'Un site sur mesure qui reflète votre identité et convertit vos visiteurs.',
  },
  {
    icon: ShoppingCart,
    title: 'Création de site e-commerce',
    description: 'Vendez en ligne avec une boutique élégante et performante.',
  },
  {
    icon: RefreshCw,
    title: 'Refonte de site existant',
    description: 'Donnez une nouvelle vie à votre présence en ligne.',
  },
  {
    icon: Search,
    title: 'Référencement naturel (SEO)',
    description: 'Apparaissez en tête des résultats Google et attirez des clients qualifiés.',
  },
  {
    icon: BarChart2,
    title: 'Audit SEO',
    description: 'Analyse complète de votre site avec recommandations prioritaires.',
  },
]

export function ServicesSection() {
  const { openDevis } = useModal()

  return (
    <>
      <section className="bg-cream-100 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="mb-16"
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
              Ce que je propose
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
            {services.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="group bg-cream-50 rounded-2xl p-7 border border-stone-200 hover:border-stone-400 hover:-translate-y-1 transition-all"
                data-cursor-hover
              >
                <Icon size={22} className="text-muted group-hover:text-charcoal transition-colors mb-4" />
                <h3 className="text-charcoal font-medium mb-2">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-cream-50 py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="text-charcoal mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 400,
              }}
            >
              Prêt à lancer votre projet ?
            </h2>
            <button
              onClick={openDevis}
              className="px-8 py-4 bg-charcoal text-white text-sm font-medium rounded-xl hover:bg-stone-800 transition-all hover:scale-105"
            >
              Demander un devis
            </button>
          </motion.div>
        </div>
      </section>
    </>
  )
}

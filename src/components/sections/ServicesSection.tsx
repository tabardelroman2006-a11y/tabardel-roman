'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Monitor, ShoppingBag, Search } from 'lucide-react'
import { useModal } from '@/context/ModalContext'

const SERVICES = [
  {
    icon:   Monitor,
    number: '01',
    title:  'Site Vitrine',
    price:  'À partir de 800 €',
    desc:   'Un site professionnel qui présente votre activité, inspire confiance et capte vos prospects. Design unique, mobile-first, rapide.',
    points: ['Design 100 % sur mesure', 'Responsive & rapide', 'SEO technique inclus', 'Livré en 2–3 semaines'],
  },
  {
    icon:   ShoppingBag,
    number: '02',
    title:  'E-commerce',
    price:  'À partir de 1 500 €',
    desc:   "Une boutique en ligne qui vend, même quand vous dormez. Tunnel de commande optimisé, gestion de stock intuitive.",
    points: ['Paiement sécurisé', 'Gestion produits simple', 'Emails transactionnels', 'Analytics intégrés'],
  },
  {
    icon:   Search,
    number: '03',
    title:  'SEO & Référencement',
    price:  'Sur devis',
    desc:   "Être beau sur internet ne suffit pas — il faut être trouvé. J'optimise votre visibilité pour que Google vous mette devant vos concurrents.",
    points: ['Audit complet', 'Optimisation on-page', 'Stratégie de liens', 'Rapport mensuel'],
  },
]

export function ServicesSection() {
  const { openDevis } = useModal()
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="services"
      className="py-28 md:py-40 px-6 md:px-12 lg:px-20"
      style={{
        position: 'relative',
        backgroundColor: '#F4F4F4',
        backgroundImage: "url('/images/services-bg.jpg')",
        backgroundSize: 'auto 110%',
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'center',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(244,244,244,0.83)', zIndex: 0 }} />
      <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>

        <div className="mb-20 max-w-xl">
          <motion.p
            className="font-body text-xs tracking-[0.25em] uppercase mb-5"
            style={{ color: '#1B3A6B' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            Ce que je fais
          </motion.p>
          <motion.h2
            className="font-display font-800 leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#1A1A1A' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Trois offres.
            <br />
            <span style={{ color: '#AAAAAA' }}>Zéro compromis.</span>
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {SERVICES.map(({ icon: Icon, number, title, price, desc, points }, i) => (
            <motion.div
              key={title}
              className="group relative flex flex-col p-8 md:p-10 cursor-default"
              style={{
                backgroundColor: '#FFFFFF',
                border:          '1px solid rgba(0,0,0,0.07)',
                transition:      'border-color 0.3s, box-shadow 0.3s',
              }}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.12 }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(27,58,107,0.3)'
                el.style.boxShadow   = '0 8px 32px rgba(27,58,107,0.08)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(0,0,0,0.07)'
                el.style.boxShadow   = 'none'
              }}
            >
              {/* Background number */}
              <span
                className="font-display font-800 leading-none mb-6 select-none"
                style={{ fontSize: '5rem', color: 'rgba(0,0,0,0.04)', lineHeight: 1 }}
              >
                {number}
              </span>

              <div className="flex items-start justify-between mb-4">
                <Icon size={20} style={{ color: '#1B3A6B' }} />
                <ArrowUpRight size={15} style={{ color: 'rgba(0,0,0,0.2)' }} />
              </div>

              <h3 className="font-display font-700 text-xl mb-2" style={{ color: '#1A1A1A' }}>
                {title}
              </h3>

              <p className="font-body font-600 text-xs tracking-wide uppercase mb-6" style={{ color: '#1B3A6B' }}>
                {price}
              </p>

              <p className="font-body text-sm leading-relaxed mb-8 flex-1" style={{ color: '#6B6B6B' }}>
                {desc}
              </p>

              <ul className="space-y-2.5">
                {points.map(pt => (
                  <li key={pt} className="flex items-center gap-2.5 font-body text-xs" style={{ color: '#888888' }}>
                    <span className="shrink-0 w-1 h-1 rounded-full" style={{ backgroundColor: '#1B3A6B' }} />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10"
          style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <p className="font-body text-sm" style={{ color: '#AAAAAA' }}>
            Pas sûr de ce dont vous avez besoin ?
          </p>
          <button
            onClick={openDevis}
            className="font-body font-700 text-sm px-8 py-3.5 transition-opacity duration-200 hover:opacity-80 shrink-0"
            style={{ backgroundColor: '#1B3A6B', color: '#FFFFFF' }}
          >
            On en parle gratuitement
          </button>
        </motion.div>

      </div>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Monitor, ShoppingBag, RefreshCw, Search, BarChart2 } from 'lucide-react'
import { useModal } from '@/context/ModalContext'

const SERVICES_LIST = [
  {
    icon: Monitor,
    title: 'Site vitrine',
    price: 'À partir de 800 €',
    description: 'Un site sur mesure qui reflète votre identité professionnelle. Design élégant, responsive, optimisé pour la conversion et le référencement.',
    details: ['Design personnalisé', 'Responsive mobile', 'Optimisé SEO', 'Formation incluse'],
  },
  {
    icon: ShoppingBag,
    title: 'Site e-commerce',
    price: 'À partir de 1 500 €',
    description: "Votre boutique en ligne professionnelle avec paiement sécurisé, gestion des stocks et expérience d'achat optimisée.",
    details: ['Paiement sécurisé', 'Gestion catalogue', "Tunnel d'achat optimisé", 'Tableau de bord'],
  },
  {
    icon: RefreshCw,
    title: 'Refonte de site',
    price: 'Sur devis',
    description: "Votre site actuel mérite mieux. Modernisation complète du design, amélioration des performances et de l'expérience utilisateur.",
    details: ['Audit complet', 'Nouveau design', 'Migration sécurisée', 'Performance +60%'],
  },
  {
    icon: Search,
    title: 'Référencement naturel (SEO)',
    price: 'Sur devis',
    description: 'Apparaître en première page de Google pour vos clients. Stratégie SEO sur mesure, durable et efficace.',
    details: ['Recherche mots-clés', 'Optimisation on-page', 'Contenu optimisé', 'Suivi mensuel'],
  },
  {
    icon: BarChart2,
    title: 'Audit SEO',
    price: 'À partir de 150 €',
    description: "Analyse complète de votre site web : points forts, points faibles, opportunités et plan d'action prioritaire.",
    details: ['Analyse technique', 'Analyse sémantique', 'Rapport détaillé', "Plan d'action"],
  },
]

const PORTFOLIO = [
  {
    image:    '/images/sultan-kebab.jpg',
    alt:      'Sultan Kebab Crest — Application de commande en ligne',
    category: 'Application web & commande en ligne',
    title:    'Sultan Kebab Crest',
    description: 'Application de commande en ligne pour un restaurant kebab à Crest. Menu interactif, paiement intégré, interface caisse en temps réel.',
    href: 'https://sultan-crest-eats.vercel.app/',
  },
]

export function ServicesPageContent() {
  const { openDevis } = useModal()
  const titleRef    = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <div style={{ backgroundColor: '#F4F4F4' }} className="pt-20 md:pt-24">

      {/* ── HERO ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <p className="font-display font-700 text-xs tracking-[0.28em] uppercase mb-6" style={{ color: '#1B3A6B' }}>
            Services &amp; Réalisations
          </p>
          <div ref={titleRef} className="overflow-hidden">
            <motion.h1
              className="font-display font-800 leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)', color: '#1A1A1A' }}
              initial={{ y: '100%', opacity: 0 }}
              animate={titleInView ? { y: '0%', opacity: 1 } : {}}
              transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              Le savoir-faire
              <br />
              <span style={{ color: '#AAAAAA', fontStyle: 'italic' }}>mis en œuvre.</span>
            </motion.h1>
          </div>
        </div>
      </section>

      <div className="section-divider mx-6 md:mx-12 lg:mx-20" />

      {/* ── PORTFOLIO ── */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="font-display font-700 text-xs tracking-[0.28em] uppercase mb-5" style={{ color: '#1B3A6B' }}>
              Portfolio
            </p>
            <h2 className="font-display font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#1A1A1A' }}>
              Réalisations
            </h2>
          </div>

          <div className="flex justify-center">
            {PORTFOLIO.map((project, i) => (
              <motion.div
                key={project.title}
                className="group flex flex-col overflow-hidden w-full max-w-2xl"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.07)',
                  borderRadius: '8px',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(27,58,107,0.25)'
                  el.style.boxShadow   = '0 8px 32px rgba(27,58,107,0.08)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(0,0,0,0.07)'
                  el.style.boxShadow   = 'none'
                }}
              >
                <div className="relative overflow-hidden" style={{ height: 340 }}>
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <p className="font-display font-600 text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: '#AAAAAA' }}>
                    {project.category}
                  </p>
                  <h3 className="font-display font-700 text-xl mb-3" style={{ color: '#1A1A1A' }}>
                    {project.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed flex-1" style={{ color: '#6B6B6B' }}>
                    {project.description}
                  </p>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center gap-2 font-display font-600 text-xs tracking-widest uppercase transition-opacity duration-200 hover:opacity-60 w-fit"
                    style={{ color: '#1B3A6B' }}
                  >
                    <ExternalLink size={11} />
                    Voir le site
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-6 md:mx-12 lg:mx-20" />

      {/* ── SERVICES ── */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="font-display font-700 text-xs tracking-[0.28em] uppercase mb-5" style={{ color: '#1B3A6B' }}>
              Prestations
            </p>
            <h2 className="font-display font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#1A1A1A' }}>
              Ce que je propose
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES_LIST.map(({ icon: Icon, title, price, description, details }, i) => (
              <motion.div
                key={title}
                className="group flex flex-col p-8"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.07)',
                  borderRadius: '8px',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(27,58,107,0.25)'
                  el.style.boxShadow   = '0 8px 32px rgba(27,58,107,0.08)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(0,0,0,0.07)'
                  el.style.boxShadow   = 'none'
                }}
              >
                <Icon size={20} style={{ color: '#1B3A6B', marginBottom: 16 }} />
                <h3 className="font-display font-700 text-lg mb-1" style={{ color: '#1A1A1A' }}>
                  {title}
                </h3>
                <p className="font-display font-600 text-xs tracking-widest uppercase mb-5" style={{ color: '#1B3A6B' }}>
                  {price}
                </p>
                <p className="font-body text-sm leading-relaxed flex-1" style={{ color: '#6B6B6B' }}>
                  {description}
                </p>
                <div className="mt-6 pt-6 space-y-2" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  {details.map(d => (
                    <div key={d} className="flex items-center gap-2 font-body text-xs" style={{ color: '#888888' }}>
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: '#1B3A6B' }} />
                      {d}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#1B3A6B' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-display font-800 leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#FFFFFF' }}
          >
            Votre prochain projet
            <br />mérite le meilleur.
          </h2>
          <p className="font-body text-base mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Discutons de vos objectifs lors d&apos;un appel gratuit de 15 minutes.
            Aucun engagement, juste une vision claire et concrète.
          </p>
          <button
            onClick={openDevis}
            className="font-display font-700 text-sm tracking-widest uppercase px-12 py-4 transition-opacity duration-200 hover:opacity-80"
            style={{ backgroundColor: '#FFFFFF', color: '#1B3A6B', borderRadius: '8px' }}
          >
            Appel gratuit — 15 min
          </button>
        </div>
      </section>

    </div>
  )
}

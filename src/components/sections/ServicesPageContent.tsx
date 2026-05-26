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
    description:
      'Un site sur mesure qui reflète votre identité professionnelle. Design élégant, responsive, optimisé pour la conversion et le référencement.',
    details: ['Design personnalisé', 'Responsive mobile', 'Optimisé SEO', 'Formation incluse'],
  },
  {
    icon: ShoppingBag,
    title: 'Site e-commerce',
    price: 'À partir de 1 500 €',
    description:
      "Votre boutique en ligne professionnelle avec paiement sécurisé, gestion des stocks et expérience d'achat optimisée.",
    details: ['Paiement sécurisé', 'Gestion catalogue', "Tunnel d'achat optimisé", 'Tableau de bord'],
  },
  {
    icon: RefreshCw,
    title: 'Refonte de site',
    price: 'Sur devis',
    description:
      "Votre site actuel mérite mieux. Modernisation complète du design, amélioration des performances et de l'expérience utilisateur.",
    details: ['Audit complet', 'Nouveau design', 'Migration sécurisée', 'Performance +60%'],
  },
  {
    icon: Search,
    title: 'Référencement naturel (SEO)',
    price: 'Sur devis',
    description:
      'Apparaître en première page de Google pour vos clients. Stratégie SEO sur mesure, durable et efficace.',
    details: ['Recherche mots-clés', 'Optimisation on-page', 'Contenu optimisé', 'Suivi mensuel'],
  },
  {
    icon: BarChart2,
    title: 'Audit SEO',
    price: 'À partir de 150 €',
    description:
      "Analyse complète de votre site web : points forts, points faibles, opportunités et plan d'action prioritaire.",
    details: ['Analyse technique', 'Analyse sémantique', 'Rapport détaillé', "Plan d'action"],
  },
]

const PORTFOLIO = [
  {
    image:    '/images/bmx-livron.jpg',
    alt:      'Livron BMX Club',
    category: 'Site vitrine sportif',
    title:    'Livron BMX Club',
    description:
      'Site vitrine pour un club BMX local. Design dynamique et moderne, navigation intuitive pour les licenciés et compétiteurs.',
    href: 'https://livron-bmx-club.base44.app/',
  },
  {
    image:    '/images/chalet-taiga.jpg',
    alt:      'Chalet La Taïga — Lans-en-Vercors',
    category: 'Site vitrine & hébergement',
    title:    'Chalet La Taïga',
    description:
      "Site vitrine pour un chalet de montagne à Lans-en-Vercors. Ambiance chaleureuse et premium, optimisé pour les réservations en ligne.",
    href: 'https://chalet-taiga.fr/',
  },
]

export function ServicesPageContent() {
  const { openDevis } = useModal()
  const titleRef   = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <div style={{ backgroundColor: '#0A0A0A' }} className="pt-20 md:pt-24">

      {/* ── HERO ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <p
            className="font-body text-xs tracking-[0.28em] uppercase mb-6"
            style={{ color: '#C8FF00' }}
          >
            Services &amp; Réalisations
          </p>

          <div ref={titleRef} className="overflow-hidden">
            <motion.h1
              className="font-display font-extrabold leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)', color: '#FFFFFF' }}
              initial={{ y: '100%', opacity: 0 }}
              animate={titleInView ? { y: '0%', opacity: 1 } : {}}
              transition={{ duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              Le savoir-faire
              <br />
              <span style={{ color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>mis en œuvre.</span>
            </motion.h1>
          </div>
        </div>
      </section>

      <div className="section-divider mx-6 md:mx-12 lg:mx-20" />

      {/* ── PORTFOLIO ── */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="font-body text-xs tracking-[0.28em] uppercase mb-5" style={{ color: '#C8FF00' }}>
              Portfolio
            </p>
            <h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#FFFFFF' }}
            >
              Réalisations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PORTFOLIO.map((project, i) => (
              <motion.div
                key={project.title}
                className="group flex flex-col overflow-hidden"
                style={{
                  backgroundColor: '#111111',
                  border:          '1px solid rgba(255,255,255,0.06)',
                  transition:      'border-color 0.3s',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,255,0,0.18)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'}
              >
                <div className="relative overflow-hidden" style={{ height: 200 }}>
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 transition-colors duration-300"
                    style={{ backgroundColor: 'rgba(10,10,10,0.15)' }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p
                    className="font-body text-[10px] tracking-[0.2em] uppercase mb-2"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    {project.category}
                  </p>
                  <h3
                    className="font-display font-semibold text-lg mb-3"
                    style={{ color: '#FFFFFF' }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="font-body text-sm leading-relaxed flex-1"
                    style={{ color: 'rgba(255,255,255,0.42)' }}
                  >
                    {project.description}
                  </p>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center gap-2 font-body text-xs tracking-widest uppercase transition-opacity duration-200 hover:opacity-60 w-fit"
                    style={{ color: '#C8FF00' }}
                  >
                    <ExternalLink size={11} />
                    Voir le site
                  </a>
                </div>
              </motion.div>
            ))}

            {/* Coming soon slots */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center justify-center text-center p-12 min-h-[300px]"
                style={{ border: '1px dashed rgba(255,255,255,0.08)' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <p
                  className="font-display font-semibold italic text-lg mb-2"
                  style={{ color: 'rgba(255,255,255,0.1)' }}
                >
                  Prochainement
                </p>
                <p
                  className="font-body text-xs tracking-widest uppercase"
                  style={{ color: 'rgba(255,255,255,0.1)' }}
                >
                  En cours de réalisation
                </p>
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
            <p className="font-body text-xs tracking-[0.28em] uppercase mb-5" style={{ color: '#C8FF00' }}>
              Prestations
            </p>
            <h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#FFFFFF' }}
            >
              Ce que je propose
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES_LIST.map(({ icon: Icon, title, price, description, details }, i) => (
              <motion.div
                key={title}
                className="group flex flex-col p-8"
                style={{
                  backgroundColor: '#111111',
                  border:          '1px solid rgba(255,255,255,0.06)',
                  transition:      'border-color 0.3s',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,255,0,0.18)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'}
              >
                <Icon size={20} style={{ color: '#C8FF00', marginBottom: 16 }} />
                <h3
                  className="font-display font-bold text-lg mb-1"
                  style={{ color: '#FFFFFF' }}
                >
                  {title}
                </h3>
                <p
                  className="font-body text-xs tracking-widest uppercase mb-5"
                  style={{ color: '#C8FF00' }}
                >
                  {price}
                </p>
                <p
                  className="font-body text-sm leading-relaxed flex-1"
                  style={{ color: 'rgba(255,255,255,0.43)' }}
                >
                  {description}
                </p>
                <div
                  className="mt-6 pt-6 space-y-2"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {details.map((d) => (
                    <div key={d} className="flex items-center gap-2 font-body text-xs"
                      style={{ color: 'rgba(255,255,255,0.4)' }}>
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: '#C8FF00' }} />
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
      <section
        className="py-24 md:py-32 px-6 md:px-12 lg:px-20"
        style={{ backgroundColor: '#C8FF00' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-display font-extrabold leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#0A0A0A' }}
          >
            Votre prochain projet
            <br />
            mérite le meilleur.
          </h2>
          <p
            className="font-body text-base mb-10 leading-relaxed"
            style={{ color: 'rgba(10,10,10,0.6)' }}
          >
            Discutons de vos objectifs lors d&apos;un appel gratuit de 15 minutes.
            Aucun engagement, juste une vision claire et concrète.
          </p>
          <button
            onClick={openDevis}
            className="font-body font-bold text-sm tracking-widest uppercase px-12 py-4 transition-opacity duration-200 hover:opacity-75"
            style={{ backgroundColor: '#0A0A0A', color: '#C8FF00' }}
          >
            Appel gratuit — 15 min
          </button>
        </div>
      </section>

    </div>
  )
}

'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Globe, ShoppingCart, RefreshCw, Search, BarChart2 } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { useModal } from '@/context/ModalContext'

const SERVICES_LIST = [
  {
    icon: Globe,
    title: 'Création de site vitrine',
    description:
      'Un site sur mesure qui reflète votre identité professionnelle. Design élégant, responsive, optimisé pour la conversion et le référencement.',
    details: ['Design personnalisé', 'Responsive mobile', 'Optimisé SEO', 'Formation incluse'],
  },
  {
    icon: ShoppingCart,
    title: 'Création de site e-commerce',
    description:
      "Votre boutique en ligne professionnelle avec paiement sécurisé, gestion des stocks et expérience d'achat optimisée.",
    details: ['Paiement sécurisé', 'Gestion catalogue', "Tunnel d'achat optimisé", 'Tableau de bord'],
  },
  {
    icon: RefreshCw,
    title: 'Refonte de site existant',
    description:
      "Votre site actuel mérite mieux. Modernisation complète du design, amélioration des performances et de l'expérience utilisateur.",
    details: ['Audit complet', 'Nouveau design', 'Migration sécurisée', 'Performance +60%'],
  },
  {
    icon: Search,
    title: 'Référencement naturel (SEO)',
    description:
      'Apparaître en première page de Google pour vos clients locaux. Stratégie SEO sur mesure, durable et efficace.',
    details: ['Recherche mots-clés', 'Optimisation on-page', 'Contenu optimisé', 'Suivi mensuel'],
  },
  {
    icon: BarChart2,
    title: 'Audit SEO & Recommandations',
    description:
      "Analyse complète de votre site web : points forts, points faibles, opportunités et plan d'action prioritaire.",
    details: ['Analyse technique', 'Analyse sémantique', 'Rapport détaillé', "Plan d'action"],
  },
]

const PORTFOLIO = [
  {
    image: '/images/bmx-livron.jpg',
    alt: 'Livron BMX Club',
    category: 'Site vitrine sportif',
    title: 'Livron BMX Club',
    description:
      'Site vitrine pour un club BMX local. Design dynamique, moderne et énergique, avec une navigation intuitive pour les licenciés et compétiteurs.',
    href: 'https://livron-bmx-club.base44.app/',
  },
  {
    image: '/images/chalet-taiga.jpg',
    alt: 'Chalet La Taïga — Lans-en-Vercors',
    category: 'Site vitrine & hébergement',
    title: 'Chalet La Taïga',
    description:
      "Site vitrine pour un chalet de montagne à Lans-en-Vercors. Ambiance chaleureuse et premium, optimisé pour les réservations en ligne.",
    href: 'https://chalet-taiga.fr/',
  },
]

export function ServicesPageContent() {
  const { openDevis } = useModal()
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <div className="pt-20 md:pt-24 bg-white">

      {/* ── HERO ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="font-inter text-xs tracking-[0.25em] text-[#6B6B6B] uppercase mb-6">
              Services & Réalisations
            </p>
          </ScrollReveal>
          <div ref={titleRef} className="overflow-hidden">
            <motion.h1
              className="font-playfair text-5xl md:text-7xl lg:text-8xl text-[#1A1A1A] leading-[1.0]"
              initial={{ y: '100%', opacity: 0 }}
              animate={titleInView ? { y: '0%', opacity: 1 } : {}}
              transition={{ duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              Le savoir-faire
              <br />
              <em className="italic text-[#6B6B6B]">mis en œuvre.</em>
            </motion.h1>
          </div>
        </div>
      </section>

      <div className="section-divider mx-6 md:mx-12 lg:mx-20" />

      {/* ── PORTFOLIO ── */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-16">
              <p className="font-inter text-xs tracking-[0.25em] text-[#6B6B6B] uppercase mb-4">
                Portfolio
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl text-[#1A1A1A]">Réalisations</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO.map((project, i) => (
              <ScrollReveal key={project.title} delay={i * 0.1}>
                <div className="group border border-[#D6D3D1] hover:border-[#1A1A1A]/40 transition-all duration-300 overflow-hidden h-full flex flex-col bg-[#FAFAF8]">
                  <div className="relative overflow-hidden" style={{ height: 220 }}>
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="font-inter text-xs tracking-[0.15em] text-[#6B6B6B] uppercase mb-2">
                      {project.category}
                    </p>
                    <h3 className="font-playfair text-xl text-[#1A1A1A] mb-3">{project.title}</h3>
                    <p className="font-inter text-sm text-[#6B6B6B] leading-relaxed flex-1">
                      {project.description}
                    </p>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 flex items-center gap-2 font-inter text-xs tracking-[0.15em] text-[#1A1A1A] uppercase border-b border-[#1A1A1A]/40 pb-0.5 w-fit hover:opacity-60 transition-opacity duration-200"
                    >
                      <ExternalLink size={12} />
                      Voir le site
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            {/* Coming soon slots */}
            {[1, 2, 3].map((i) => (
              <ScrollReveal key={i} delay={0.1 * (i + 1)}>
                <div className="border border-dashed border-[#D6D3D1] h-full flex flex-col items-center justify-center text-center p-12 min-h-[320px]">
                  <p className="font-playfair text-lg italic text-[#6B6B6B]/40 mb-2">Prochainement</p>
                  <p className="font-inter text-xs text-[#6B6B6B]/40 tracking-[0.15em] uppercase">
                    En cours de réalisation
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-6 md:mx-12 lg:mx-20" />

      {/* ── SERVICES ── */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-16">
              <p className="font-inter text-xs tracking-[0.25em] text-[#6B6B6B] uppercase mb-4">
                Prestations
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl text-[#1A1A1A]">
                Ce que je propose
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_LIST.map(({ icon: Icon, title, description, details }, i) => (
              <ScrollReveal key={title} delay={i * 0.08}>
                <div
                  className="bg-[#FAFAF8] border border-[#D6D3D1]/60 p-8 hover:border-[#1A1A1A]/30 hover:shadow-[0_4px_40px_rgba(0,0,0,0.04)] transition-all duration-300 h-full flex flex-col group"
                  data-cursor-hover
                >
                  <div className="mb-6">
                    <Icon size={24} className="text-[#6B6B6B] group-hover:text-[#1A1A1A] transition-colors duration-300" />
                  </div>
                  <h3 className="font-playfair text-xl text-[#1A1A1A] mb-3">{title}</h3>
                  <p className="font-inter text-sm text-[#6B6B6B] leading-relaxed flex-1">
                    {description}
                  </p>
                  <div className="mt-6 pt-6 border-t border-[#D6D3D1]/60">
                    <ul className="space-y-1">
                      {details.map((d) => (
                        <li key={d} className="flex items-center gap-2 font-inter text-xs text-[#6B6B6B]">
                          <span className="w-1 h-1 rounded-full bg-[#D6D3D1] flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[#F7F5F0]">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-playfair text-4xl md:text-5xl text-[#1A1A1A] mb-6 leading-tight">
              Votre prochain projet
              <br />
              <em className="italic text-[#6B6B6B]">mérite le meilleur.</em>
            </h2>
            <p className="font-inter text-base text-[#6B6B6B] mb-10 leading-relaxed">
              Discutons de vos objectifs et construisons ensemble une solution digitale à la
              hauteur de vos ambitions.
            </p>
            <button
              onClick={openDevis}
              className="bg-[#1A1A1A] text-white font-inter text-sm tracking-widest uppercase px-12 py-4 rounded-full hover:bg-[#333] transition-colors duration-300"
              data-cursor-hover
            >
              Demander un devis gratuit
            </button>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}

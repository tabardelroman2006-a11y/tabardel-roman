'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  {
    q: 'Combien coûte un site web ?',
    a: "Un site vitrine commence à 800 €, un site e-commerce à 1 500 €. Le tarif dépend de votre besoin, de la complexité du design et des fonctionnalités souhaitées. On établit un devis détaillé lors de notre premier appel, sans surprise.",
  },
  {
    q: 'Quel est le délai de réalisation ?',
    a: "En moyenne 2 à 3 semaines pour un site vitrine, 4 à 6 semaines pour un e-commerce. Tout dépend de la rapidité avec laquelle vous me fournissez les contenus (textes, photos). Je m'adapte à vos contraintes de calendrier.",
  },
  {
    q: "Je n'ai pas encore de logo ni de charte graphique. Est-ce un problème ?",
    a: "Non. Je peux travailler avec ce que vous avez, ou vous proposer une direction visuelle cohérente avec votre activité. Précisez-le lors de notre appel et on trouvera la meilleure approche ensemble.",
  },
  {
    q: "Est-ce que vous vous occupez de la maintenance après la livraison ?",
    a: "Le premier mois de support est inclus dans chaque projet. Ensuite, je propose des contrats de maintenance mensuels pour les mises à jour, sauvegardes et petites modifications de contenu. Tarifs sur demande.",
  },
  {
    q: 'Vous intervenez seulement en Ardèche ?',
    a: "Non, je travaille avec des clients partout en France (et même à l'international). Tout se fait à distance, via appels vidéo et partages d'écran. La distance n'est pas un obstacle.",
  },
  {
    q: "Je peux modifier mon site moi-même après livraison ?",
    a: "Oui. Je livre chaque site avec une formation à son interface d'administration. Vous pourrez modifier vos textes, images et produits en toute autonomie. Je reste disponible si vous avez des questions.",
  },
]

function FAQItem({ q, a, index, inView }: { q: string; a: string; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.07 }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-6 py-6 text-left"
      >
        <span
          className="font-body font-600 text-base"
          style={{ color: open ? '#1B3A6B' : '#1A1A1A', transition: 'color 0.2s' }}
        >
          {q}
        </span>
        <span
          className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full border transition-all duration-200"
          style={{
            borderColor: open ? '#1B3A6B' : 'rgba(0,0,0,0.15)',
            color:       open ? '#1B3A6B' : '#888888',
          }}
        >
          {open ? <Minus size={12} /> : <Plus size={12} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="font-body text-sm leading-relaxed pb-6" style={{ color: '#6B6B6B' }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="faq"
      className="py-28 md:py-40 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: '#EBEBEB' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">

        {/* Left */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <motion.p
            className="font-body text-xs tracking-[0.25em] uppercase mb-5"
            style={{ color: '#1B3A6B' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            Questions fréquentes
          </motion.p>
          <motion.h2
            className="font-display font-800 leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#1A1A1A' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Vous avez
            <br />
            des questions ?
            <br />
            <span style={{ color: '#AAAAAA' }}>J&apos;ai les réponses.</span>
          </motion.h2>
          <motion.p
            className="font-body text-sm leading-relaxed"
            style={{ color: '#888888' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            Une question qui ne figure pas ici ?{' '}
            <a href="/contact" className="link-accent font-600">
              Posez-la directement.
            </a>
          </motion.p>
        </div>

        {/* Right: accordion */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '0 2rem' }}>
          {FAQS.map((faq, i) => (
            <FAQItem key={faq.q} {...faq} index={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  )
}

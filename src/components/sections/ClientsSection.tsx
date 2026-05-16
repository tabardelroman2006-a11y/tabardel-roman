'use client'

import { motion } from 'framer-motion'
import { Building2, Wrench, Scissors, UtensilsCrossed, Briefcase, Store } from 'lucide-react'

const clients = [
  { icon: Building2, label: 'TPE' },
  { icon: Briefcase, label: 'PME' },
  { icon: Wrench, label: 'Artisans' },
  { icon: Scissors, label: 'Coiffeurs' },
  { icon: UtensilsCrossed, label: 'Restaurants' },
  { icon: Store, label: 'Entrepreneurs' },
]

export function ClientsSection() {
  return (
    <section className="bg-cream-100 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.p
          className="text-center text-xs text-muted uppercase tracking-widest mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ils nous font confiance
        </motion.p>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {clients.map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="group flex flex-col items-center gap-3 p-6 bg-cream-50 rounded-xl border border-stone-200 hover:border-stone-400 hover:-translate-y-1 transition-all"
              data-cursor-hover
            >
              <Icon
                size={24}
                className="text-muted group-hover:text-charcoal transition-colors"
              />
              <span className="text-sm text-charcoal font-medium">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

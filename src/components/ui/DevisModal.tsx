'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useModal } from '@/context/ModalContext'

export function DevisModal() {
  const { isDevisOpen, closeDevis } = useModal()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    date: '',
    heure: '',
    prenom: '',
    nom: '',
    telephone: '',
    description: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {isDevisOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDevis}
          />
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-cream-50 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-display text-2xl text-charcoal" style={{ fontFamily: 'var(--font-display)' }}>
                      Réserver un appel
                    </h2>
                    <p className="text-muted text-sm mt-1">
                      Échangeons sur votre projet — c'est gratuit.
                    </p>
                  </div>
                  <button
                    onClick={closeDevis}
                    className="text-muted hover:text-charcoal transition-colors p-1"
                    aria-label="Fermer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="py-12 text-center"
                    >
                      <p className="text-charcoal text-lg font-medium">Merci !</p>
                      <p className="text-muted mt-2">Je vous contacte très vite.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
                            Date souhaitée
                          </label>
                          <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2.5 bg-cream-100 border border-stone-200 rounded-lg text-charcoal text-sm focus:outline-none focus:border-charcoal transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
                            Heure
                          </label>
                          <select
                            name="heure"
                            value={form.heure}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2.5 bg-cream-100 border border-stone-200 rounded-lg text-charcoal text-sm focus:outline-none focus:border-charcoal transition-colors"
                          >
                            <option value="">Choisir</option>
                            {['9h', '10h', '11h', '14h', '15h', '16h', '17h'].map((h) => (
                              <option key={h} value={h}>{h}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
                            Prénom
                          </label>
                          <input
                            type="text"
                            name="prenom"
                            value={form.prenom}
                            onChange={handleChange}
                            required
                            placeholder="Votre prénom"
                            className="w-full px-3 py-2.5 bg-cream-100 border border-stone-200 rounded-lg text-charcoal text-sm placeholder:text-stone-400 focus:outline-none focus:border-charcoal transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
                            Nom
                          </label>
                          <input
                            type="text"
                            name="nom"
                            value={form.nom}
                            onChange={handleChange}
                            required
                            placeholder="Votre nom"
                            className="w-full px-3 py-2.5 bg-cream-100 border border-stone-200 rounded-lg text-charcoal text-sm placeholder:text-stone-400 focus:outline-none focus:border-charcoal transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          name="telephone"
                          value={form.telephone}
                          onChange={handleChange}
                          required
                          placeholder="07 69 34 11 23"
                          className="w-full px-3 py-2.5 bg-cream-100 border border-stone-200 rounded-lg text-charcoal text-sm placeholder:text-stone-400 focus:outline-none focus:border-charcoal transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-muted mb-1 uppercase tracking-wider">
                          Décrivez votre projet
                        </label>
                        <textarea
                          name="description"
                          value={form.description}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Quelques mots sur votre projet, votre activité, vos besoins..."
                          className="w-full px-3 py-2.5 bg-cream-100 border border-stone-200 rounded-lg text-charcoal text-sm placeholder:text-stone-400 focus:outline-none focus:border-charcoal transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-charcoal text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors"
                      >
                        Envoyer ma demande
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

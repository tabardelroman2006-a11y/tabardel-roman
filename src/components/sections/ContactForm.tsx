'use client'

import { useState } from 'react'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="py-16 text-center">
        <p className="text-charcoal text-lg font-medium" style={{ fontFamily: 'var(--font-display)' }}>Message envoyé !</p>
        <p className="text-muted mt-2">Je vous réponds très rapidement.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">Prénom</label>
          <input
            type="text"
            required
            placeholder="Votre prénom"
            className="w-full px-4 py-3 bg-cream-100 border border-stone-200 rounded-xl text-charcoal text-sm placeholder:text-stone-400 focus:outline-none focus:border-charcoal transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">Nom</label>
          <input
            type="text"
            required
            placeholder="Votre nom"
            className="w-full px-4 py-3 bg-cream-100 border border-stone-200 rounded-xl text-charcoal text-sm placeholder:text-stone-400 focus:outline-none focus:border-charcoal transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">Email</label>
        <input
          type="email"
          required
          placeholder="votre@email.fr"
          className="w-full px-4 py-3 bg-cream-100 border border-stone-200 rounded-xl text-charcoal text-sm placeholder:text-stone-400 focus:outline-none focus:border-charcoal transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">Téléphone</label>
        <input
          type="tel"
          placeholder="07 69 34 11 23"
          className="w-full px-4 py-3 bg-cream-100 border border-stone-200 rounded-xl text-charcoal text-sm placeholder:text-stone-400 focus:outline-none focus:border-charcoal transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">Sujet</label>
        <input
          type="text"
          placeholder="Création de site, SEO, refonte..."
          className="w-full px-4 py-3 bg-cream-100 border border-stone-200 rounded-xl text-charcoal text-sm placeholder:text-stone-400 focus:outline-none focus:border-charcoal transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">Message</label>
        <textarea
          required
          rows={5}
          placeholder="Décrivez votre projet, vos besoins, vos questions..."
          className="w-full px-4 py-3 bg-cream-100 border border-stone-200 rounded-xl text-charcoal text-sm placeholder:text-stone-400 focus:outline-none focus:border-charcoal transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-charcoal text-white text-sm font-medium rounded-xl hover:bg-stone-800 transition-all"
        data-cursor-hover
      >
        Envoyer
      </button>
    </form>
  )
}

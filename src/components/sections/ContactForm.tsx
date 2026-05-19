'use client'

import { useState } from 'react'

const inputClass =
  'w-full px-4 py-3 border rounded-xl text-sm placeholder:text-[#B0ABAA] focus:outline-none focus:border-[#1A1A1A] transition-colors'
const inputStyle = {
  backgroundColor: '#F0ECE6',
  borderColor: '#D6D3D1',
  color: '#1A1A1A',
}

const labelClass = 'block text-xs mb-1.5 uppercase tracking-wider'
const labelStyle = { color: '#6B6B6B' }

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="py-16 text-center">
        <p
          className="text-lg font-medium"
          style={{ fontFamily: 'var(--font-display)', color: '#1A1A1A' }}
        >
          Message envoyé !
        </p>
        <p className="mt-2" style={{ color: '#6B6B6B' }}>
          Je vous réponds très rapidement.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={labelStyle}>Prénom</label>
          <input
            type="text"
            required
            placeholder="Votre prénom"
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div>
          <label className={labelClass} style={labelStyle}>Nom</label>
          <input
            type="text"
            required
            placeholder="Votre nom"
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} style={labelStyle}>Email</label>
        <input
          type="email"
          required
          placeholder="votre@email.fr"
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label className={labelClass} style={labelStyle}>Téléphone</label>
        <input
          type="tel"
          placeholder="07 69 34 11 23"
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label className={labelClass} style={labelStyle}>Sujet</label>
        <input
          type="text"
          placeholder="Création de site, SEO, refonte..."
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <div>
        <label className={labelClass} style={labelStyle}>Message</label>
        <textarea
          required
          rows={5}
          placeholder="Décrivez votre projet, vos besoins, vos questions..."
          className={`${inputClass} resize-none`}
          style={inputStyle}
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 text-white text-sm font-medium rounded-xl transition-all hover:opacity-80"
        style={{ backgroundColor: '#1A1A1A' }}
        data-cursor-hover
      >
        Envoyer
      </button>
    </form>
  )
}

'use client'

import { useState } from 'react'

const inputStyle: React.CSSProperties = {
  width:           '100%',
  padding:         '10px 14px',
  backgroundColor: 'rgba(255,255,255,0.05)',
  border:          '1px solid rgba(255,255,255,0.1)',
  color:           '#FFFFFF',
  fontSize:        '14px',
  outline:         'none',
  transition:      'border-color 0.2s',
}

const labelStyle: React.CSSProperties = {
  display:       'block',
  fontSize:      '10px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color:         'rgba(255,255,255,0.35)',
  marginBottom:  6,
}

function Field({
  label, children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const focusOn  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = 'rgba(200,255,0,0.5)')
  const focusOff = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = 'rgba(255,255,255,0.1)')

  if (submitted) {
    return (
      <div className="py-20 text-center">
        <div
          className="w-12 h-12 flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: '#C8FF00' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="font-display font-bold text-xl mb-2" style={{ color: '#FFFFFF' }}>
          Message envoyé !
        </p>
        <p className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.42)' }}>
          Je vous réponds sous 24 h.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Prénom">
          <input
            type="text"
            required
            placeholder="Votre prénom"
            style={inputStyle}
            onFocus={focusOn}
            onBlur={focusOff}
          />
        </Field>
        <Field label="Nom">
          <input
            type="text"
            required
            placeholder="Votre nom"
            style={inputStyle}
            onFocus={focusOn}
            onBlur={focusOff}
          />
        </Field>
      </div>

      <Field label="Email">
        <input
          type="email"
          required
          placeholder="vous@exemple.com"
          style={inputStyle}
          onFocus={focusOn}
          onBlur={focusOff}
        />
      </Field>

      <Field label="Téléphone">
        <input
          type="tel"
          placeholder="07 00 00 00 00"
          style={inputStyle}
          onFocus={focusOn}
          onBlur={focusOff}
        />
      </Field>

      <Field label="Sujet">
        <input
          type="text"
          placeholder="Création de site, SEO, refonte…"
          style={inputStyle}
          onFocus={focusOn}
          onBlur={focusOff}
        />
      </Field>

      <Field label="Message">
        <textarea
          required
          rows={5}
          placeholder="Décrivez votre projet, vos besoins, votre budget…"
          style={{ ...inputStyle, resize: 'none' }}
          onFocus={focusOn}
          onBlur={focusOff}
        />
      </Field>

      <button
        type="submit"
        className="w-full py-4 font-body font-bold text-sm tracking-widest uppercase transition-opacity duration-200 hover:opacity-80"
        style={{ backgroundColor: '#C8FF00', color: '#0A0A0A' }}
      >
        Envoyer
      </button>

      <p className="text-center font-body text-xs" style={{ color: 'rgba(255,255,255,0.22)' }}>
        Réponse garantie sous 24 h
      </p>
    </form>
  )
}

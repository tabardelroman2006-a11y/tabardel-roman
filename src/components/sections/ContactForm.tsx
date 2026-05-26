'use client'

import { useState } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px',
  backgroundColor: '#F4F4F4',
  border: '1px solid rgba(0,0,0,0.12)',
  color: '#1A1A1A', fontSize: '14px', outline: 'none',
  transition: 'border-color 0.2s',
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '10px', letterSpacing: '0.18em',
  textTransform: 'uppercase' as const, color: '#888888', marginBottom: 6,
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const focusOn  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = '#1B3A6B')
  const focusOff = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = 'rgba(0,0,0,0.12)')

  if (submitted) {
    return (
      <div className="py-20 text-center">
        <div className="w-12 h-12 flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: '#1B3A6B' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="font-display font-700 text-xl mb-2" style={{ color: '#1A1A1A' }}>Message envoyé !</p>
        <p className="font-body text-sm" style={{ color: '#888888' }}>Je vous réponds sous 24 h.</p>
      </div>
    )
  }

  return (
    <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Prénom</label>
          <input type="text" required placeholder="Votre prénom" style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
        </div>
        <div>
          <label style={labelStyle}>Nom</label>
          <input type="text" required placeholder="Votre nom" style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Email</label>
        <input type="email" required placeholder="vous@exemple.com" style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
      </div>

      <div>
        <label style={labelStyle}>Téléphone</label>
        <input type="tel" placeholder="07 00 00 00 00" style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
      </div>

      <div>
        <label style={labelStyle}>Sujet</label>
        <input type="text" placeholder="Création de site, SEO, refonte…" style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
      </div>

      <div>
        <label style={labelStyle}>Message</label>
        <textarea required rows={5} placeholder="Décrivez votre projet, vos besoins, votre budget…"
          style={{ ...inputStyle, resize: 'none' }} onFocus={focusOn} onBlur={focusOff} />
      </div>

      <button type="submit"
        className="w-full py-4 font-body font-700 text-sm tracking-wide uppercase transition-opacity duration-200 hover:opacity-80"
        style={{ backgroundColor: '#1B3A6B', color: '#FFFFFF' }}>
        Envoyer
      </button>

      <p className="text-center font-body text-xs" style={{ color: '#AAAAAA' }}>
        Réponse garantie sous 24 h
      </p>
    </form>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone } from 'lucide-react'
import { useModal } from '@/context/ModalContext'

export function DevisModal() {
  const { isDevisOpen, closeDevis } = useModal()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    prenom: '', nom: '', telephone: '', email: '', description: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
        subject: `📞 Demande d'appel — ${form.prenom} ${form.nom}`,
        from_name: `${form.prenom} ${form.nom}`,
        replyto: form.email,
        Téléphone: form.telephone,
        Email: form.email,
        Projet: form.description || '—',
      }),
    })
    setSubmitted(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px',
    backgroundColor: '#F4F4F4',
    border: '1px solid rgba(0,0,0,0.12)',
    color: '#1A1A1A', fontSize: '14px', outline: 'none',
    transition: 'border-color 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '10px', letterSpacing: '0.18em',
    textTransform: 'uppercase', color: '#888888', marginBottom: 6,
  }

  return (
    <AnimatePresence>
      {isDevisOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[100]"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
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
              className="w-full max-w-lg max-h-[92vh] overflow-y-auto"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 24px 80px rgba(0,0,0,0.12)' }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8">

                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-5 h-px" style={{ backgroundColor: 'var(--rt-primary)' }} />
                      <p className="font-body text-xs tracking-[0.22em] uppercase" style={{ color: 'var(--rt-primary)' }}>
                        Appel gratuit
                      </p>
                    </div>
                    <h2 className="font-display font-800 text-2xl" style={{ color: '#1A1A1A' }}>
                      Réservez votre appel
                    </h2>
                    <p className="font-body text-sm mt-1" style={{ color: '#888888' }}>
                      15 minutes, gratuit, sans engagement
                    </p>
                  </div>
                  <button
                    onClick={closeDevis}
                    className="p-1.5 transition-opacity duration-200 hover:opacity-50"
                    style={{ color: '#888888' }}
                    aria-label="Fermer"
                  >
                    <X size={18} />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="py-16 text-center"
                    >
                      <div className="w-12 h-12 flex items-center justify-center mx-auto mb-5"
                        style={{ backgroundColor: 'var(--rt-primary)' }}>
                        <Phone size={20} color="#FFFFFF" />
                      </div>
                      <p className="font-display font-700 text-xl mb-2" style={{ color: '#1A1A1A' }}>
                        C&apos;est noté !
                      </p>
                      <p className="font-body text-sm" style={{ color: '#888888' }}>
                        Je vous contacte dans les 24 h pour convenir d&apos;un créneau.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label style={labelStyle}>Prénom</label>
                          <input type="text" name="prenom" value={form.prenom} onChange={handleChange} required
                            placeholder="Votre prénom" style={inputStyle}
                            onFocus={e => (e.target.style.borderColor = 'var(--rt-primary)')}
                            onBlur={e  => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')} />
                        </div>
                        <div>
                          <label style={labelStyle}>Nom</label>
                          <input type="text" name="nom" value={form.nom} onChange={handleChange} required
                            placeholder="Votre nom" style={inputStyle}
                            onFocus={e => (e.target.style.borderColor = 'var(--rt-primary)')}
                            onBlur={e  => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')} />
                        </div>
                      </div>

                      <div>
                        <label style={labelStyle}>Téléphone</label>
                        <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} required
                          placeholder="07 00 00 00 00" style={inputStyle}
                          onFocus={e => (e.target.style.borderColor = 'var(--rt-primary)')}
                          onBlur={e  => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')} />
                      </div>

                      <div>
                        <label style={labelStyle}>Email</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange}
                          placeholder="vous@exemple.com" style={inputStyle}
                          onFocus={e => (e.target.style.borderColor = 'var(--rt-primary)')}
                          onBlur={e  => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')} />
                      </div>

                      <div>
                        <label style={labelStyle}>Votre projet (en quelques mots)</label>
                        <textarea name="description" value={form.description} onChange={handleChange} rows={4}
                          placeholder="Type de site, secteur d'activité, budget approximatif…"
                          style={{ ...inputStyle, resize: 'none' }}
                          onFocus={e => (e.target.style.borderColor = 'var(--rt-primary)')}
                          onBlur={e  => (e.target.style.borderColor = 'rgba(0,0,0,0.12)')} />
                      </div>

                      <button type="submit"
                        className="w-full py-4 font-body font-700 text-sm tracking-wide uppercase transition-opacity duration-200 hover:opacity-80"
                        style={{ backgroundColor: 'var(--rt-primary)', color: '#FFFFFF' }}>
                        Envoyer ma demande
                      </button>

                      <p className="text-center font-body text-xs" style={{ color: '#AAAAAA' }}>
                        Réponse garantie sous 24 h · Aucun engagement
                      </p>

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

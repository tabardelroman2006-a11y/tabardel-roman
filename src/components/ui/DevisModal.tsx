'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone } from 'lucide-react'
import { useModal } from '@/context/ModalContext'

export function DevisModal() {
  const { isDevisOpen, closeDevis } = useModal()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    prenom:      '',
    nom:         '',
    telephone:   '',
    email:       '',
    description: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

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
    textTransform: 'uppercase',
    color:         'rgba(255,255,255,0.35)',
    marginBottom:  6,
  }

  return (
    <AnimatePresence>
      {isDevisOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100]"
            style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDevis}
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-lg max-h-[92vh] overflow-y-auto"
              style={{
                backgroundColor: '#111111',
                border:          '1px solid rgba(255,255,255,0.08)',
              }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <div className="p-8">

                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-5 h-px" style={{ backgroundColor: '#C8FF00' }} />
                      <p className="font-body text-xs tracking-[0.22em] uppercase" style={{ color: '#C8FF00' }}>
                        Appel gratuit
                      </p>
                    </div>
                    <h2 className="font-display font-bold text-2xl" style={{ color: '#FFFFFF' }}>
                      Réservez votre appel
                    </h2>
                    <p className="font-body text-sm mt-1" style={{ color: 'rgba(255,255,255,0.38)' }}>
                      15 minutes — gratuit — sans engagement
                    </p>
                  </div>
                  <button
                    onClick={closeDevis}
                    className="p-1.5 transition-opacity duration-200 hover:opacity-50"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
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
                      <div
                        className="w-12 h-12 flex items-center justify-center mx-auto mb-5"
                        style={{ backgroundColor: '#C8FF00' }}
                      >
                        <Phone size={20} color="#0A0A0A" />
                      </div>
                      <p className="font-display font-bold text-xl mb-2" style={{ color: '#FFFFFF' }}>
                        C&apos;est noté !
                      </p>
                      <p className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.42)' }}>
                        Je vous contacte dans les 24 h pour convenir d&apos;un créneau.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      {/* Name row */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label style={labelStyle}>Prénom</label>
                          <input
                            type="text"
                            name="prenom"
                            value={form.prenom}
                            onChange={handleChange}
                            required
                            placeholder="Votre prénom"
                            style={inputStyle}
                            onFocus={e => (e.target.style.borderColor = 'rgba(200,255,0,0.5)')}
                            onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Nom</label>
                          <input
                            type="text"
                            name="nom"
                            value={form.nom}
                            onChange={handleChange}
                            required
                            placeholder="Votre nom"
                            style={inputStyle}
                            onFocus={e => (e.target.style.borderColor = 'rgba(200,255,0,0.5)')}
                            onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                          />
                        </div>
                      </div>

                      {/* Téléphone */}
                      <div>
                        <label style={labelStyle}>Téléphone</label>
                        <input
                          type="tel"
                          name="telephone"
                          value={form.telephone}
                          onChange={handleChange}
                          required
                          placeholder="07 00 00 00 00"
                          style={inputStyle}
                          onFocus={e => (e.target.style.borderColor = 'rgba(200,255,0,0.5)')}
                          onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label style={labelStyle}>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="vous@exemple.com"
                          style={inputStyle}
                          onFocus={e => (e.target.style.borderColor = 'rgba(200,255,0,0.5)')}
                          onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label style={labelStyle}>Votre projet (en quelques mots)</label>
                        <textarea
                          name="description"
                          value={form.description}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Type de site, secteur d'activité, budget approximatif…"
                          style={{ ...inputStyle, resize: 'none' }}
                          onFocus={e => (e.target.style.borderColor = 'rgba(200,255,0,0.5)')}
                          onBlur={e  => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 font-body font-bold text-sm tracking-widest uppercase transition-opacity duration-200 hover:opacity-80"
                        style={{ backgroundColor: '#C8FF00', color: '#0A0A0A' }}
                      >
                        Envoyer ma demande
                      </button>

                      <p className="text-center font-body text-xs" style={{ color: 'rgba(255,255,255,0.22)' }}>
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

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone } from 'lucide-react'
import { useModal } from '@/context/ModalContext'
import { formatSlotLabel } from '@/lib/booking'

export function DevisModal() {
  const { isDevisOpen, closeDevis } = useModal()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    prenom: '', nom: '', telephone: '', email: '', description: '',
  })

  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [allSlots, setAllSlots] = useState<string[]>([])
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [bookingError, setBookingError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isDevisOpen) return
    setSubmitted(false)
    setSelectedDate('')
    setSelectedTime('')
    setBookingError('')
    setSlotsLoading(true)
    fetch('/api/booking')
      .then(res => res.json())
      .then(data => {
        setAvailableDates(data.dates || [])
        setAllSlots(data.slots || [])
        setBookedSlots(data.booked || [])
      })
      .catch(() => setBookingError('Impossible de charger les disponibilités.'))
      .finally(() => setSlotsLoading(false))
  }, [isDevisOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const dateLabel = (dateStr: string) =>
    new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }).format(new Date(`${dateStr}T00:00:00`))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) {
      setBookingError('Choisissez une date et un horaire.')
      return
    }
    setSubmitting(true)
    setBookingError('')

    try {
      const bookRes = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate, time: selectedTime }),
      })
      const bookData = await bookRes.json()

      if (!bookRes.ok) {
        setBookedSlots(prev => [...prev, `${selectedDate}T${selectedTime}`])
        setSelectedTime('')
        setBookingError(bookData.error || 'Ce créneau n’est plus disponible, choisissez-en un autre.')
        setSubmitting(false)
        return
      }

      const slotLabel = formatSlotLabel(selectedDate, selectedTime)
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: `Demande d'appel — ${form.prenom} ${form.nom}`,
          from_name: `${form.prenom} ${form.nom}`,
          replyto: form.email,
          'Créneau choisi': slotLabel,
          'Prénom': form.prenom,
          'Nom': form.nom,
          'Téléphone': form.telephone,
          'Email': form.email,
          'Projet': form.description || '—',
        }),
      })
      setSubmitted(true)
    } catch {
      setBookingError('Une erreur est survenue, réessayez.')
    } finally {
      setSubmitting(false)
    }
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
              data-lenis-prevent
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

                      <div>
                        <label style={labelStyle}>Choisissez une date</label>
                        {slotsLoading ? (
                          <p className="font-body text-sm" style={{ color: '#888888' }}>Chargement des disponibilités…</p>
                        ) : (
                          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin' }}>
                            {availableDates.map(d => {
                              const active = d === selectedDate
                              return (
                                <button
                                  key={d}
                                  type="button"
                                  onClick={() => { setSelectedDate(d); setSelectedTime(''); setBookingError('') }}
                                  className="shrink-0 px-3 py-2 font-body text-xs capitalize transition-colors duration-150"
                                  style={{
                                    border: '1px solid ' + (active ? 'var(--rt-primary)' : 'rgba(0,0,0,0.12)'),
                                    backgroundColor: active ? 'var(--rt-primary)' : '#F4F4F4',
                                    color: active ? '#FFFFFF' : '#1A1A1A',
                                  }}
                                >
                                  {dateLabel(d)}
                                </button>
                              )
                            })}
                          </div>
                        )}
                      </div>

                      {selectedDate && (
                        <div>
                          <label style={labelStyle}>Choisissez un horaire</label>
                          <div className="grid grid-cols-4 gap-2">
                            {allSlots.map(t => {
                              const isBooked = bookedSlots.includes(`${selectedDate}T${t}`)
                              const active = t === selectedTime
                              return (
                                <button
                                  key={t}
                                  type="button"
                                  disabled={isBooked}
                                  onClick={() => { setSelectedTime(t); setBookingError('') }}
                                  className="px-2 py-2 font-body text-xs transition-colors duration-150"
                                  style={{
                                    border: '1px solid ' + (active ? 'var(--rt-primary)' : 'rgba(0,0,0,0.12)'),
                                    backgroundColor: isBooked ? '#EAEAEA' : (active ? 'var(--rt-primary)' : '#F4F4F4'),
                                    color: isBooked ? '#BBBBBB' : (active ? '#FFFFFF' : '#1A1A1A'),
                                    textDecoration: isBooked ? 'line-through' : 'none',
                                    cursor: isBooked ? 'not-allowed' : 'pointer',
                                  }}
                                >
                                  {t}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      {bookingError && (
                        <p className="font-body text-xs" style={{ color: '#C0392B' }}>{bookingError}</p>
                      )}

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
                        disabled={submitting || !selectedDate || !selectedTime}
                        className="w-full py-4 font-body font-700 text-sm tracking-wide uppercase transition-opacity duration-200 hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ backgroundColor: 'var(--rt-primary)', color: '#FFFFFF' }}>
                        {submitting ? 'Envoi…' : 'Confirmer ma réservation'}
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

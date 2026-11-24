'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Case, Champ, Piege, champStyle, prevenirRoman } from './champs'

export function InscriptionParrain() {
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', telephone: '' })
  const [reglement, setReglement] = useState(false)
  const [piege, setPiege] = useState('')
  const [envoi, setEnvoi] = useState(false)
  const [erreur, setErreur] = useState('')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function envoyer(e: React.FormEvent) {
    e.preventDefault()
    if (!reglement) { setErreur('Merci d’accepter le règlement du parrainage.'); return }
    setEnvoi(true)
    setErreur('')
    try {
      const res = await fetch('/api/parrainage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, reglement, site: piege }),
      })
      const d = await res.json().catch(() => ({}))
      if (!res.ok || !d.id) {
        setErreur(d.error || 'Une erreur est survenue. Réessayez.')
        setEnvoi(false)
        return
      }
      prevenirRoman(`Parrainage : nouveau parrain, ${form.prenom} ${form.nom}`, {
        'Parrain': `${form.prenom} ${form.nom}`,
        'Email': form.email,
        'Téléphone': form.telephone,
        'Suivi': 'Admin, onglet Parrainage',
      })
      window.location.assign(new URL(`/parrainage/suivi#${d.id}`, window.location.origin))
    } catch {
      setErreur('Erreur réseau. Réessayez.')
      setEnvoi(false)
    }
  }

  return (
    <form onSubmit={envoyer} className="relative grid gap-5">
      <Piege value={piege} onChange={setPiege} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Champ label="Prénom"><input required autoComplete="given-name" value={form.prenom} onChange={set('prenom')} style={champStyle} /></Champ>
        <Champ label="Nom"><input required autoComplete="family-name" value={form.nom} onChange={set('nom')} style={champStyle} /></Champ>
      </div>
      <Champ label="E-mail"><input required type="email" autoComplete="email" value={form.email} onChange={set('email')} style={champStyle} /></Champ>
      <Champ label="Téléphone" aide="Pour vous prévenir quand votre récompense est prête."><input required type="tel" autoComplete="tel" value={form.telephone} onChange={set('telephone')} style={champStyle} /></Champ>
      <Case checked={reglement} onChange={setReglement}>
        J’ai lu et j’accepte le <a href="#reglement" className="underline" style={{ color: 'var(--rt-primary)' }}>règlement du parrainage</a>. Mes coordonnées servent uniquement au suivi du parrainage (<Link href="/politique-confidentialite" className="underline">confidentialité</Link>).
      </Case>
      {erreur && <p role="alert" className="font-body text-sm" style={{ color: '#b91c1c' }}>{erreur}</p>}
      <button type="submit" disabled={envoi} className="acc-btn acc-btn-solid justify-center" style={{ opacity: envoi ? 0.7 : 1 }}>
        {envoi ? 'Inscription…' : 'Devenir parrain'} <ArrowRight size={16} />
      </button>
    </form>
  )
}

'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Case, Champ, Piege, prevenirRoman } from './champs'

export function InscriptionParrain({ voirReglement }: { voirReglement: () => void }) {
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
      if (!d.mail) prevenirRoman(`Parrainage : nouveau parrain, ${form.prenom} ${form.nom}`, {
        'Parrain': `${form.prenom} ${form.nom}`,
        'Email': form.email,
        'Téléphone': form.telephone,
        'Suivi': 'Admin, onglet Parrainage',
      })
      window.location.assign(new URL(`/parrainage/suivi?bienvenue=1#${d.id}`, window.location.origin))
    } catch {
      setErreur('Erreur réseau. Réessayez.')
      setEnvoi(false)
    }
  }

  return (
    <form onSubmit={envoyer} className="pr-form relative">
      <Piege value={piege} onChange={setPiege} />
      <div className="pr-row2">
        <Champ label="Prénom"><input className="pr-input" required autoComplete="given-name" value={form.prenom} onChange={set('prenom')} /></Champ>
        <Champ label="Nom"><input className="pr-input" required autoComplete="family-name" value={form.nom} onChange={set('nom')} /></Champ>
      </div>
      <Champ label="E-mail"><input className="pr-input" required type="email" inputMode="email" autoComplete="email" value={form.email} onChange={set('email')} /></Champ>
      <Champ label="Téléphone" aide="Pour vous prévenir quand vos 100 € sont prêts."><input className="pr-input" required type="tel" inputMode="tel" autoComplete="tel" value={form.telephone} onChange={set('telephone')} /></Champ>
      <Case checked={reglement} onChange={setReglement}>
        J’accepte le <a href="#reglement" onClick={e => { e.preventDefault(); voirReglement() }}>règlement du parrainage</a>. Mes coordonnées servent uniquement au parrainage.
      </Case>
      {erreur && <p role="alert" className="pr-error">{erreur}</p>}
      <button type="submit" disabled={envoi} className="pr-btn">
        {envoi ? 'Création de votre espace…' : 'Créer mon espace parrain'} {!envoi && <ArrowRight size={18} />}
      </button>
    </form>
  )
}

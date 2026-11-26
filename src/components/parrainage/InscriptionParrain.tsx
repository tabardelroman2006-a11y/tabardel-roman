'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Case, Champ, Piege, prevenirRoman } from './champs'
import { CaseHumain, caseHumainActive } from './CaseHumain'
import { ouvrirEspace } from './RetrouverEspace'

export function InscriptionParrain({ voirReglement }: { voirReglement: () => void }) {
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', telephone: '' })
  const [reglement, setReglement] = useState(false)
  const [piege, setPiege] = useState('')
  const [envoi, setEnvoi] = useState(false)
  const [erreur, setErreur] = useState('')
  const [jeton, setJeton] = useState('')
  const [remise, setRemise] = useState(0)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function envoyer(e: React.FormEvent) {
    e.preventDefault()
    if (!reglement) { setErreur('Merci d’accepter le règlement du parrainage.'); return }
    if (caseHumainActive && !jeton) { setErreur('Merci de cocher la case « Vérifiez que vous êtes humain ».'); return }
    setEnvoi(true)
    setErreur('')
    try {
      const res = await fetch('/api/parrainage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, reglement, site: piege, turnstile: jeton }),
      })
      const d = await res.json().catch(() => ({}))
      if (!res.ok || !d.id) {
        setErreur(d.error || 'Une erreur est survenue. Réessayez.')
        setRemise(n => n + 1)
        setEnvoi(false)
        return
      }
      if (d.deja) { ouvrirEspace(d.id); return }
      if (!d.mail) prevenirRoman(`Nouveau parrain : ${form.prenom} ${form.nom}`, {
        'En bref': `${form.prenom} ${form.nom} vient de s’inscrire au parrainage. Cette personne peut maintenant vous recommander des clients.`,
        'Nom': `${form.prenom} ${form.nom}`,
        'Téléphone': form.telephone,
        'E-mail': form.email,
        'Voir dans mon admin': 'https://www.tabardel-roman.fr/admin-maintenance',
      })
      ouvrirEspace(d.id, true)
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
      <CaseHumain onJeton={setJeton} remise={remise} />
      {erreur && <p role="alert" className="pr-error">{erreur}</p>}
      <button type="submit" disabled={envoi} className="pr-btn">
        {envoi ? 'Création de votre espace…' : 'Créer mon espace parrain'} {!envoi && <ArrowRight size={18} />}
      </button>
    </form>
  )
}

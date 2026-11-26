'use client'

import { useState } from 'react'
import { ArrowRight, Phone } from 'lucide-react'
import { CLE_LIEN_PARRAIN } from '@/lib/parrainage'
import { Champ } from './champs'
import { CaseHumain, caseHumainActive } from './CaseHumain'

export function ouvrirEspace(id: string, bienvenue = false) {
  try { localStorage.setItem(CLE_LIEN_PARRAIN, id) } catch {}
  window.location.assign(new URL(`/parrainage/suivi${bienvenue ? '?bienvenue=1' : ''}#${id}`, window.location.origin))
}

export function RetrouverEspace() {
  const [form, setForm] = useState({ nom: '', telephone: '' })
  const [envoi, setEnvoi] = useState(false)
  const [erreur, setErreur] = useState('')
  const [jeton, setJeton] = useState('')
  const [remise, setRemise] = useState(0)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function envoyer(e: React.FormEvent) {
    e.preventDefault()
    if (caseHumainActive && !jeton) { setErreur('Merci de cocher la case « Vérifiez que vous êtes humain ».'); return }
    setEnvoi(true)
    setErreur('')
    try {
      const res = await fetch('/api/parrainage/retrouver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstile: jeton }),
      })
      const d = await res.json().catch(() => ({}))
      if (!res.ok || !d.id) {
        setErreur(d.error || 'Une erreur est survenue. Réessayez.')
        setRemise(n => n + 1)
        setEnvoi(false)
        return
      }
      ouvrirEspace(d.id)
    } catch {
      setErreur('Erreur réseau. Réessayez.')
      setEnvoi(false)
    }
  }

  return (
    <form onSubmit={envoyer} className="pr-form relative">
      <Champ label="Votre nom"><input className="pr-input" required autoComplete="name" value={form.nom} onChange={set('nom')} /></Champ>
      <Champ label="Votre téléphone" aide="Le numéro donné à l’inscription."><input className="pr-input" required type="tel" inputMode="tel" autoComplete="tel" value={form.telephone} onChange={set('telephone')} /></Champ>
      <CaseHumain onJeton={setJeton} remise={remise} />
      {erreur && <p role="alert" className="pr-error">{erreur}</p>}
      <button type="submit" disabled={envoi} className="pr-btn">
        {envoi ? 'Recherche…' : 'Ouvrir mon espace'} {!envoi && <ArrowRight size={18} />}
      </button>
      <a href="tel:+33618135384" className="pr-link" style={{ textDecoration: 'none' }}>Un souci ? <strong><Phone size={13} /> 06 18 13 53 84</strong></a>
    </form>
  )
}

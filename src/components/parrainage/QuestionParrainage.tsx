'use client'

import { useState } from 'react'
import { Check, Send } from 'lucide-react'
import { Champ, Piege } from './champs'

/* « Une question ? » : envoie la question par e-mail a Roman (Web3Forms). */
export function QuestionParrainage({ onFini }: { onFini: () => void }) {
  const [form, setForm] = useState({ prenom: '', nom: '', contact: '', question: '' })
  const [piege, setPiege] = useState('')
  const [envoi, setEnvoi] = useState(false)
  const [envoye, setEnvoye] = useState(false)
  const [erreur, setErreur] = useState('')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function envoyer(e: React.FormEvent) {
    e.preventDefault()
    if (piege) { setEnvoye(true); return }
    const cle = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
    if (!cle) { setErreur('Envoi indisponible pour le moment. Appelez-moi au 06 18 13 53 84.'); return }
    setEnvoi(true)
    setErreur('')
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact.trim()) ? form.contact.trim() : undefined
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: cle,
          subject: `Parrainage : question de ${form.prenom} ${form.nom}`,
          from_name: `${form.prenom} ${form.nom}`,
          ...(email ? { replyto: email } : {}),
          'Prénom': form.prenom,
          'Nom': form.nom,
          'Pour répondre': form.contact,
          'Question': form.question,
        }),
      })
      const d = await res.json().catch(() => ({}))
      if (!res.ok || d.success === false) throw new Error()
      setEnvoye(true)
    } catch {
      setErreur('L’envoi n’a pas marché. Réessayez, ou appelez-moi au 06 18 13 53 84.')
    }
    setEnvoi(false)
  }

  if (envoye) {
    return (
      <div style={{ textAlign: 'center', padding: '10px 0 4px' }}>
        <span style={{ display: 'inline-grid', placeItems: 'center', width: 56, height: 56, borderRadius: '50%', background: '#dcfce7', color: '#15803d' }}><Check size={26} /></span>
        <p className="pr-sheet__title" style={{ marginTop: 14 }}>Question envoyée</p>
        <p className="pr-sheet__lead" style={{ marginTop: 6 }}>Merci {form.prenom}, je vous réponds rapidement.</p>
        <button type="button" className="pr-btn pr-btn--ghost" onClick={onFini}>Fermer</button>
      </div>
    )
  }

  return (
    <form onSubmit={envoyer} className="pr-form relative">
      <Piege value={piege} onChange={setPiege} />
      <div className="pr-row2">
        <Champ label="Prénom"><input className="pr-input" required autoComplete="given-name" value={form.prenom} onChange={set('prenom')} /></Champ>
        <Champ label="Nom"><input className="pr-input" required autoComplete="family-name" value={form.nom} onChange={set('nom')} /></Champ>
      </div>
      <Champ label="Téléphone ou e-mail" aide="Pour que je puisse vous répondre.">
        <input className="pr-input" required autoComplete="email" value={form.contact} onChange={set('contact')} />
      </Champ>
      <Champ label="Votre question">
        <textarea className="pr-input" required rows={4} maxLength={1500} value={form.question} onChange={set('question')} />
      </Champ>
      {erreur && <p role="alert" className="pr-error">{erreur}</p>}
      <button type="submit" disabled={envoi} className="pr-btn">
        <Send size={17} /> {envoi ? 'Envoi…' : 'Envoyer ma question'}
      </button>
    </form>
  )
}

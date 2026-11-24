'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Check, Copy, Plus, Send } from 'lucide-react'
import { DISPLAY_FONT } from '@/components/accueil/anim'
import { PRIME, STATUTS, type EtatRecompense, type Statut } from '@/lib/parrainage'
import { Case, Champ, Piege, champStyle, prevenirRoman } from './champs'

type Vue = {
  parrain: { prenom: string }
  filleuls: { id: string; nom: string; entreprise: string; creeLe: string; statut: Statut; recompense: EtatRecompense; recompenseVerseeLe: string | null }[]
}

const ETAPES = STATUTS.filter(s => s.id !== 'sans_suite')
const VIDE = { nom: '', entreprise: '', telephone: '', email: '', ville: '', projet: '' }
const dateFr = (iso: string) => new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export function SuiviParrain() {
  const idRef = useRef('')
  const [vue, setVue] = useState<Vue | null>(null)
  const [erreur, setErreur] = useState('')
  const [form, setForm] = useState(VIDE)
  const [accord, setAccord] = useState(false)
  const [piege, setPiege] = useState('')
  const [envoi, setEnvoi] = useState(false)
  const [ouvert, setOuvert] = useState(false)
  const [message, setMessage] = useState('')
  const [copie, setCopie] = useState(false)

  useEffect(() => {
    const lien = window.location.hash.slice(1)
    idRef.current = lien
    const requete = lien
      ? fetch('/api/parrainage/suivi', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: lien }) })
        .then(async r => ({ ok: r.ok, d: await r.json().catch(() => ({})) }))
      : Promise.resolve({ ok: false, d: { error: 'Lien de suivi incomplet.' } })
    requete
      .then(({ ok, d }) => {
        if (ok) { setVue(d); setOuvert(d.filleuls.length === 0) } else setErreur(d.error || 'Lien de suivi invalide.')
      })
      .catch(() => setErreur('Erreur réseau. Rechargez la page.'))
  }, [])

  const set = (k: keyof typeof VIDE) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function recommander(e: React.FormEvent) {
    e.preventDefault()
    if (!accord) { setMessage('Merci de confirmer que cette personne est d’accord pour être contactée.'); return }
    setEnvoi(true)
    setMessage('')
    try {
      const res = await fetch('/api/parrainage/suivi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: idRef.current, filleul: { ...form, accord, site: piege } }),
      })
      const d = await res.json().catch(() => ({}))
      if (!res.ok) { setMessage(d.error || 'Une erreur est survenue.'); setEnvoi(false); return }
      prevenirRoman(`Parrainage : ${vue?.parrain.prenom ?? 'un parrain'} recommande ${form.nom}`, {
        'Parrain': vue?.parrain.prenom ?? '',
        'Personne recommandée': form.nom,
        'Entreprise': form.entreprise || 'non précisée',
        'Téléphone': form.telephone,
        'Email': form.email || 'non précisé',
        'Ville': form.ville || 'non précisée',
        'Projet': form.projet,
        'Suivi': 'Admin, onglet Parrainage',
      })
      setVue(d)
      setForm(VIDE)
      setAccord(false)
      setOuvert(false)
      setMessage(`Merci ! Je contacte ${form.nom} très bientôt de votre part.`)
    } catch {
      setMessage('Erreur réseau. Réessayez.')
    }
    setEnvoi(false)
  }

  async function copierLien() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopie(true)
      setTimeout(() => setCopie(false), 2000)
    } catch {}
  }

  return (
    <section className="px-5 md:px-12 lg:px-20 pb-24" style={{ paddingTop: 140, minHeight: '100svh', backgroundColor: 'var(--rt-bg)' }}>
      <div className="max-w-4xl mx-auto">
        <p className="font-body text-[11px] font-700 tracking-[0.3em] uppercase mb-5" style={{ color: 'var(--rt-muted)' }}>Mon parrainage</p>

        {erreur && (
          <div className="p-7" style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid var(--rt-line)' }}>
            <p className="font-body text-base" style={{ color: 'var(--rt-ink)' }}>{erreur}</p>
            <p className="mt-3 font-body text-sm" style={{ color: 'var(--rt-muted)' }}>
              Vérifiez que vous avez ouvert le lien en entier, ou appelez Roman au <a href="tel:0618135384" className="underline" style={{ color: 'var(--rt-primary)' }}>06 18 13 53 84</a>. Pas encore inscrit ? <Link href="/parrainage" className="underline" style={{ color: 'var(--rt-primary)' }}>Devenir parrain</Link>.
            </p>
          </div>
        )}

        {!erreur && !vue && <p className="font-body" style={{ color: 'var(--rt-muted)' }}>Chargement…</p>}

        {vue && (
          <>
            <h1 className="uppercase" style={{ ...DISPLAY_FONT, color: 'var(--rt-primary)', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.03em', fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}>
              Bonjour {vue.parrain.prenom}
            </h1>
            <p className="mt-4 font-body text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--rt-muted)' }}>
              Votre récompense : <strong style={{ color: 'var(--rt-ink)' }}>{PRIME} €</strong> pour chaque site livré et payé grâce à vous.
            </p>

            <div className="mt-6 p-5 flex flex-col sm:flex-row sm:items-center gap-4" style={{ backgroundColor: 'var(--rt-soft)', borderRadius: 16, border: '1px solid var(--rt-line)' }}>
              <p className="flex-1 font-body text-sm leading-relaxed" style={{ color: 'var(--rt-ink)' }}>
                <strong>Gardez ce lien</strong> (ajoutez cette page à vos favoris) : c’est votre accès personnel, sans mot de passe. Ne le partagez pas.
              </p>
              <button onClick={copierLien} className="acc-btn acc-btn-ghost shrink-0 justify-center">
                {copie ? <><Check size={15} /> Copié</> : <><Copy size={15} /> Copier mon lien</>}
              </button>
            </div>

            <div className="mt-12 flex items-end justify-between gap-4 flex-wrap">
              <h2 className="font-display font-700 text-2xl" style={{ color: 'var(--rt-primary)' }}>
                Mes recommandations {vue.filleuls.length > 0 && <span style={{ color: 'var(--rt-muted)' }}>({vue.filleuls.length})</span>}
              </h2>
              {!ouvert && (
                <button onClick={() => { setOuvert(true); setMessage('') }} className="acc-btn acc-btn-solid">
                  <Plus size={16} /> Recommander quelqu’un
                </button>
              )}
            </div>

            {message && <p role="status" className="mt-5 font-body text-base" style={{ color: message.startsWith('Merci !') ? '#15803d' : '#b91c1c' }}>{message}</p>}

            {ouvert && (
              <form onSubmit={recommander} className="relative mt-6 p-7 md:p-9 grid gap-5" style={{ backgroundColor: '#FFFFFF', borderRadius: 22, border: '1px solid var(--rt-line)', boxShadow: '0 30px 80px color-mix(in srgb, var(--rt-primary) 12%, transparent)' }}>
                <Piege value={piege} onChange={setPiege} />
                <p className="font-display font-700 text-xl" style={{ color: 'var(--rt-primary)' }}>Qui a besoin d’un site ?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Champ label="Nom et prénom"><input required value={form.nom} onChange={set('nom')} style={champStyle} /></Champ>
                  <Champ label="Entreprise (si elle en a une)"><input value={form.entreprise} onChange={set('entreprise')} style={champStyle} /></Champ>
                  <Champ label="Téléphone"><input required type="tel" value={form.telephone} onChange={set('telephone')} style={champStyle} /></Champ>
                  <Champ label="E-mail (facultatif)"><input type="email" value={form.email} onChange={set('email')} style={champStyle} /></Champ>
                </div>
                <Champ label="Ville"><input value={form.ville} onChange={set('ville')} style={champStyle} /></Champ>
                <Champ label="Son projet" aide="Quel métier, quel besoin : site vitrine, boutique en ligne, refonte, être trouvé sur Google…">
                  <textarea required rows={4} value={form.projet} onChange={set('projet')} style={{ ...champStyle, resize: 'vertical' }} />
                </Champ>
                <Case checked={accord} onChange={setAccord}>
                  Cette personne est d’accord pour que Roman la contacte de ma part.
                </Case>
                <div className="flex gap-3 flex-wrap">
                  <button type="submit" disabled={envoi} className="acc-btn acc-btn-solid" style={{ opacity: envoi ? 0.7 : 1 }}>
                    <Send size={15} /> {envoi ? 'Envoi…' : 'Envoyer la recommandation'}
                  </button>
                  {vue.filleuls.length > 0 && (
                    <button type="button" onClick={() => setOuvert(false)} className="acc-btn acc-btn-ghost">Annuler</button>
                  )}
                </div>
              </form>
            )}

            <div className="mt-6 grid gap-4">
              {vue.filleuls.length === 0 && !ouvert && (
                <p className="font-body" style={{ color: 'var(--rt-muted)' }}>Aucune recommandation pour l’instant.</p>
              )}
              {vue.filleuls.map(f => {
                const perdu = f.statut === 'sans_suite'
                const rang = ETAPES.findIndex(s => s.id === f.statut)
                return (
                  <div key={f.id} className="p-6 md:p-7" style={{ backgroundColor: '#FFFFFF', borderRadius: 18, border: '1px solid var(--rt-line)', opacity: perdu ? 0.6 : 1 }}>
                    <div className="flex justify-between gap-4 flex-wrap">
                      <div>
                        <p className="font-display font-700 text-xl" style={{ color: 'var(--rt-ink)' }}>
                          {f.nom}{f.entreprise && <span className="font-body font-400 text-base" style={{ color: 'var(--rt-muted)' }}> · {f.entreprise}</span>}
                        </p>
                        <p className="font-body text-xs mt-1" style={{ color: 'var(--rt-muted)' }}>Recommandé le {dateFr(f.creeLe)}</p>
                      </div>
                      <Recompense f={f} />
                    </div>
                    {perdu ? (
                      <p className="mt-4 font-body text-sm" style={{ color: 'var(--rt-muted)' }}>Ce projet ne s’est pas fait. Merci quand même pour la recommandation !</p>
                    ) : (
                      <ol className="mt-5 grid grid-cols-5 gap-1.5" aria-label="Avancement">
                        {ETAPES.map((s, i) => (
                          <li key={s.id} className="grid gap-2">
                            <span style={{ height: 6, borderRadius: 99, backgroundColor: i <= rang ? 'var(--rt-primary)' : 'var(--rt-line)' }} />
                            <span className="font-body text-[11px] leading-tight hidden sm:block" style={{ color: i <= rang ? 'var(--rt-ink)' : 'var(--rt-muted)', fontWeight: i === rang ? 700 : 400 }}>{s.label}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                    {!perdu && <p className="sm:hidden mt-2 font-body text-sm font-700" style={{ color: 'var(--rt-ink)' }}>{ETAPES[rang]?.label}</p>}
                  </div>
                )
              })}
            </div>

            <p className="mt-12 font-body text-sm" style={{ color: 'var(--rt-muted)' }}>
              Une question ? <a href="tel:0618135384" className="underline" style={{ color: 'var(--rt-primary)' }}>06 18 13 53 84</a> · <Link href="/parrainage#reglement" className="underline" style={{ color: 'var(--rt-primary)' }}>Règlement du parrainage</Link>
            </p>
          </>
        )}
      </div>
    </section>
  )
}

function Recompense({ f }: { f: Vue['filleuls'][number] }) {
  if (f.recompense === 'versee') {
    return <Pastille couleur="#15803d">{PRIME} € versés le {dateFr(f.recompenseVerseeLe!)}</Pastille>
  }
  if (f.recompense === 'due') {
    return <Pastille couleur="#15803d">{PRIME} € à recevoir</Pastille>
  }
  if (f.recompense === 'non_eligible' && f.statut === 'livre') {
    return <Pastille couleur="#6B6B6B">Hors conditions du parrainage</Pastille>
  }
  return null
}

function Pastille({ couleur, children }: { couleur: string; children: React.ReactNode }) {
  return (
    <span className="self-start font-body text-xs font-700 uppercase tracking-wider whitespace-nowrap" style={{ color: couleur, border: '1.5px solid currentColor', borderRadius: 99, padding: '5px 12px' }}>
      {children}
    </span>
  )
}

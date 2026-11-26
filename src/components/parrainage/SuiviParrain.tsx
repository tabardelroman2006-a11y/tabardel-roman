'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, Copy, Phone, Plus, Send } from 'lucide-react'
import { CLE_LIEN_PARRAIN, PRIME, STATUTS, type EtatRecompense, type Statut } from '@/lib/parrainage'
import { Cadre, Case, Champ, Panneau, Piege, prevenirRoman } from './champs'
import { CaseHumain, caseHumainActive } from './CaseHumain'
import { EcranAccueil } from './EcranAccueil'

type Vue = {
  parrain: { prenom: string }
  filleuls: { id: string; nom: string; entreprise: string; creeLe: string; statut: Statut; recompense: EtatRecompense; recompenseVerseeLe: string | null }[]
}

const ETAPES = STATUTS.filter(s => s.id !== 'sans_suite')
const VIDE = { nom: '', entreprise: '', telephone: '', email: '', ville: '', projet: '' }
const dateCourte = (iso: string) => new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })

export function SuiviParrain() {
  const idRef = useRef('')
  const [vue, setVue] = useState<Vue | null>(null)
  const [erreur, setErreur] = useState('')
  const [bienvenue, setBienvenue] = useState(false)
  const [form, setForm] = useState(VIDE)
  const [accord, setAccord] = useState(false)
  const [piege, setPiege] = useState('')
  const [envoi, setEnvoi] = useState(false)
  const [ouvert, setOuvert] = useState(false)
  const [erreurForm, setErreurForm] = useState('')
  const [jeton, setJeton] = useState('')
  const [remise, setRemise] = useState(0)
  const [merci, setMerci] = useState('')
  const [copie, setCopie] = useState(false)
  const fermer = useCallback(() => setOuvert(false), [])

  useEffect(() => {
    const recharger = () => window.location.reload()
    window.addEventListener('hashchange', recharger)
    return () => window.removeEventListener('hashchange', recharger)
  }, [])

  useEffect(() => {
    let memoire = ''
    try { memoire = localStorage.getItem(CLE_LIEN_PARRAIN) || '' } catch {}
    const lien = window.location.hash.slice(1) || memoire
    idRef.current = lien
    const nouveau = new URLSearchParams(window.location.search).has('bienvenue')
    if (lien && (nouveau || !window.location.hash)) history.replaceState(null, '', `/parrainage/suivi#${lien}`)
    const requete = lien
      ? fetch('/api/parrainage/suivi', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: lien }) })
        .then(async r => ({ ok: r.ok, d: await r.json().catch(() => ({})) }))
      : Promise.resolve({ ok: false, d: { error: 'Ce lien est incomplet.' } })
    requete
      .then(({ ok, d }) => {
        if (ok) {
          try { localStorage.setItem(CLE_LIEN_PARRAIN, lien) } catch {}
          setVue(d)
          setBienvenue(nouveau)
          return
        }
        if (lien === memoire) try { localStorage.removeItem(CLE_LIEN_PARRAIN) } catch {}
        setErreur(d.error || 'Ce lien ne correspond à aucun espace parrain.')
      })
      .catch(() => setErreur('Erreur réseau. Rechargez la page.'))
  }, [])

  const set = (k: keyof typeof VIDE) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function recommander(e: React.FormEvent) {
    e.preventDefault()
    if (!accord) { setErreurForm('Merci de confirmer que cette personne est d’accord pour être contactée.'); return }
    if (caseHumainActive && !jeton) { setErreurForm('Merci de cocher la case « Vérifiez que vous êtes humain ».'); return }
    setEnvoi(true)
    setErreurForm('')
    try {
      const res = await fetch('/api/parrainage/suivi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: idRef.current, filleul: { ...form, accord, site: piege }, turnstile: jeton }),
      })
      const d = await res.json().catch(() => ({}))
      if (!res.ok) { setErreurForm(d.error || 'Une erreur est survenue.'); setRemise(n => n + 1); setEnvoi(false); return }
      if (!d.mail) prevenirRoman(`À rappeler : ${form.nom}, recommandé par ${vue?.parrain.prenom ?? 'un parrain'}`, {
        'En bref': `${vue?.parrain.prenom ?? 'Un parrain'} vous recommande ${form.nom}. Cette personne est d’accord pour que vous l’appeliez de sa part.`,
        'À appeler': `${form.nom}, ${form.telephone}`,
        'Entreprise': form.entreprise || 'Non précisée',
        'Ville': form.ville || 'Non précisée',
        'E-mail': form.email || 'Non précisé',
        'Son projet': form.projet,
        'Recommandé par': vue?.parrain.prenom ?? '',
        'Voir dans mon admin': 'https://www.tabardel-roman.fr/admin-maintenance',
      })
      setVue(d)
      setMerci(`Merci ! Je contacte ${form.nom} très bientôt de votre part.`)
      setBienvenue(false)
      setForm(VIDE)
      setAccord(false)
      setOuvert(false)
    } catch {
      setErreurForm('Erreur réseau. Réessayez.')
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

  if (erreur) {
    return (
      <Cadre>
        <section className="pr__card">
          <p className="pr__eyebrow"><span className="pr__dot" />Espace parrain</p>
          <h1 className="pr__title">Lien introuvable</h1>
          <p className="pr__lead">{erreur} Retrouvez votre espace avec votre nom et votre numéro de téléphone.</p>
          <div style={{ marginTop: 18 }}>
            <a href="/parrainage#retrouver" className="pr-btn" style={{ textDecoration: 'none', marginBottom: 10 }}>Retrouver mon espace</a>
            <a href="tel:+33618135384" className="pr-btn pr-btn--ghost" style={{ textDecoration: 'none' }}><Phone size={18} /> 06 18 13 53 84</a>
            <a href="/parrainage" className="pr-link">Pas encore parrain ? <strong>Découvrir le parrainage</strong></a>
          </div>
        </section>
      </Cadre>
    )
  }

  if (!vue) {
    return (
      <Cadre>
        <section className="pr__card" aria-busy="true">
          <p className="pr__eyebrow"><span className="pr__dot" />Espace parrain</p>
          <h1 className="pr__title">Chargement…</h1>
        </section>
      </Cadre>
    )
  }

  const enCours = vue.filleuls.filter(f => f.recompense === 'aucune').length
  const aRecevoir = vue.filleuls.filter(f => f.recompense === 'due').length * PRIME
  const recus = vue.filleuls.filter(f => f.recompense === 'versee').length * PRIME

  return (
    <Cadre top={<a href="/parrainage" className="pr__pill" style={{ textDecoration: 'none' }}>Le parrainage</a>}>
      <section className="pr__card">
        <p className="pr__eyebrow"><span className="pr__dot" />Mon espace parrain</p>
        <h1 className="pr__title">Bonjour <em>{vue.parrain.prenom}</em></h1>
        <p className="pr__lead">{PRIME}&nbsp;€ pour chaque site livré et payé grâce à vous.</p>

        <div className="pr-stats">
          <div className="pr-stat"><b>{enCours}</b><span>{enCours > 1 ? 'projets en cours' : 'projet en cours'}</span></div>
          <div className="pr-stat"><b>{aRecevoir} €</b><span>à recevoir</span></div>
          <div className="pr-stat"><b>{recus} €</b><span>reçus</span></div>
        </div>

        <div style={{ marginTop: 16 }}>
          <button type="button" className="pr-btn" onClick={() => { setOuvert(true); setMerci('') }}>
            <Plus size={18} /> Recommander quelqu’un
          </button>
        </div>

        <div className="pr-keep">
          <span style={{ flex: 1 }}>
            {bienvenue && <><strong>Votre espace est prêt !</strong> </>}Pour revenir : ajoutez l’espace à votre écran d’accueil, ou entrez simplement votre nom et votre téléphone sur la page du parrainage.
          </span>
          <button type="button" onClick={copierLien}>{copie ? <><Check size={14} /> Copié</> : <><Copy size={14} /> Copier</>}</button>
        </div>
        <EcranAccueil />
      </section>

      {merci && <p role="status" className="pr-success">{merci}</p>}

      <section className="pr-block" style={{ animationDelay: '0.25s' }}>
        <h2 className="pr-block__title">Mes recommandations{vue.filleuls.length > 0 && <span style={{ color: 'var(--rt-muted)' }}> ({vue.filleuls.length})</span>}</h2>
        {vue.filleuls.length === 0 && (
          <p className="pr-empty">Aucune recommandation pour l’instant.<br />Pensez à un artisan, un commerçant, une association, un proche qui se lance…</p>
        )}
        {vue.filleuls.map(f => {
          const perdu = f.statut === 'sans_suite'
          const rang = ETAPES.findIndex(s => s.id === f.statut)
          return (
            <div key={f.id} className="pr-ref" style={{ opacity: perdu ? 0.6 : 1 }}>
              <div className="pr-ref__head">
                <div style={{ minWidth: 0 }}>
                  <p className="pr-ref__name">{f.nom}</p>
                  <p className="pr-ref__meta">{f.entreprise ? `${f.entreprise} · ` : ''}le {dateCourte(f.creeLe)}</p>
                </div>
                <Etiquette f={f} />
              </div>
              {perdu ? (
                <p className="pr-ref__step" style={{ fontWeight: 500, color: 'var(--rt-muted)' }}>Ce projet ne s’est pas fait. Merci quand même !</p>
              ) : (
                <>
                  <div className="pr-progress" aria-hidden="true">
                    {ETAPES.map((s, i) => <span key={s.id} className={i <= rang ? 'on' : ''} />)}
                  </div>
                  <p className="pr-ref__step">Étape {rang + 1} sur {ETAPES.length} : {ETAPES[rang]?.label}</p>
                </>
              )}
            </div>
          )
        })}
      </section>

      <p className="pr-empty" style={{ padding: '18px 24px 0' }}>
        Une question ? <a href="tel:+33618135384" style={{ color: 'var(--rt-primary)', fontWeight: 700 }}>06 18 13 53 84</a> · <a href="/parrainage#reglement" style={{ color: 'var(--rt-primary)', fontWeight: 700 }}>Règlement</a>
      </p>

      {ouvert && (
        <Panneau titre="Qui a besoin d’un site ?" intro="Je le contacte de votre part. Prévenez-le avant : il doit être d’accord." onClose={fermer}>
          <form onSubmit={recommander} className="pr-form relative">
            <Piege value={piege} onChange={setPiege} />
            <Champ label="Nom et prénom"><input className="pr-input" required value={form.nom} onChange={set('nom')} /></Champ>
            <Champ label="Entreprise (si elle en a une)"><input className="pr-input" value={form.entreprise} onChange={set('entreprise')} /></Champ>
            <div className="pr-row2">
              <Champ label="Téléphone"><input className="pr-input" required type="tel" inputMode="tel" value={form.telephone} onChange={set('telephone')} /></Champ>
              <Champ label="Ville"><input className="pr-input" value={form.ville} onChange={set('ville')} /></Champ>
            </div>
            <Champ label="E-mail (facultatif)"><input className="pr-input" type="email" inputMode="email" value={form.email} onChange={set('email')} /></Champ>
            <Champ label="Son projet" aide="Son métier, son besoin : site vitrine, boutique en ligne, refonte, être trouvé sur Google…">
              <textarea className="pr-input" required rows={4} value={form.projet} onChange={set('projet')} />
            </Champ>
            <Case checked={accord} onChange={setAccord}>Cette personne est d’accord pour que Roman la contacte de ma part.</Case>
            <CaseHumain onJeton={setJeton} remise={remise} />
            {erreurForm && <p role="alert" className="pr-error">{erreurForm}</p>}
            <button type="submit" disabled={envoi} className="pr-btn">
              <Send size={17} /> {envoi ? 'Envoi…' : 'Envoyer la recommandation'}
            </button>
          </form>
        </Panneau>
      )}
    </Cadre>
  )
}

function Etiquette({ f }: { f: Vue['filleuls'][number] }) {
  if (f.recompense === 'versee') return <span className="pr-tag pr-tag--ok">{PRIME} € reçus</span>
  if (f.recompense === 'due') return <span className="pr-tag pr-tag--ok">{PRIME} € à recevoir</span>
  if (f.statut === 'sans_suite') return <span className="pr-tag pr-tag--off">Sans suite</span>
  if (f.recompense === 'non_eligible') return <span className="pr-tag pr-tag--off">Hors conditions</span>
  return <span className="pr-tag pr-tag--wait">En cours</span>
}

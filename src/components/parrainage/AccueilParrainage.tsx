'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, Banknote, Check, Eye, MessageCircle, Phone, Plus, Send, Share2, UserPlus, X } from 'lucide-react'
import { MONTANT_MINIMUM, PRIME } from '@/lib/parrainage'
import { COMPTE, COMPTE_PAS, ETAPES, FAQ, REGLEMENT } from '@/lib/parrainage-textes'
import { Cadre, Panneau } from './champs'
import { InscriptionParrain } from './InscriptionParrain'
import { QuestionParrainage } from './QuestionParrainage'

const ICONES = [UserPlus, Send, Eye, Banknote]

export function AccueilParrainage() {
  const [panneau, setPanneau] = useState<'inscription' | 'retrouver' | 'question' | null>(null)
  const [copie, setCopie] = useState(false)
  const reglementRef = useRef<HTMLDetailsElement>(null)
  const fermer = useCallback(() => setPanneau(null), [])

  useEffect(() => {
    if (window.location.hash !== '#reglement' || !reglementRef.current) return
    reglementRef.current.open = true
    reglementRef.current.scrollIntoView({ block: 'start' })
  }, [])

  function voirReglement() {
    setPanneau(null)
    requestAnimationFrame(() => {
      const d = reglementRef.current
      if (!d) return
      d.open = true
      d.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  async function partager() {
    const url = `${window.location.origin}/parrainage`
    try {
      if (navigator.share) {
        await navigator.share({ title: `Parrainage : ${PRIME} € offerts`, text: `Un proche a besoin d’un site internet ? Recommandez-le à Roman Tabardel et recevez ${PRIME} €.`, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setCopie(true)
      setTimeout(() => setCopie(false), 2200)
    } catch {}
  }

  return (
    <Cadre top={
      <button type="button" className="pr__pill" onClick={partager} aria-label="Partager le parrainage">
        {copie ? <Check size={15} /> : <Share2 size={15} />} {copie ? 'Lien copié' : 'Partager'}
      </button>
    }>
      <section className="pr__card">
        <p className="pr__eyebrow"><span className="pr__dot" />Programme de parrainage</p>
        <h1 className="pr__title">Un proche a besoin d’un site&nbsp;? <em>{PRIME}&nbsp;€</em> pour vous.</h1>
        <p className="pr__lead">Présentez-le moi. Si son site voit le jour, je vous offre {PRIME}&nbsp;€. Client ou non, sans limite.</p>

        <div className="pr-prize">
          <p className="pr-prize__label">Pour chaque projet abouti</p>
          <p className="pr-prize__amount">{PRIME} €</p>
          <p className="pr-prize__text">Par virement, une fois le site livré et payé. Projet d’au moins {MONTANT_MINIMUM.toLocaleString('fr-FR')}&nbsp;€.</p>
        </div>

        <div style={{ marginTop: 18 }}>
          <button type="button" className="pr-btn" onClick={() => setPanneau('inscription')}>
            Devenir parrain <ArrowRight size={18} />
          </button>
          <button type="button" className="pr-link" onClick={() => setPanneau('retrouver')}>
            Déjà parrain ? <strong>Retrouver mon espace</strong>
          </button>
        </div>
      </section>

      <section className="pr-block" style={{ animationDelay: '0.25s' }}>
        <h2 className="pr-block__title">Comment ça marche</h2>
        <div className="pr-steps">
          {ETAPES.map((e, i) => {
            const Icone = ICONES[i]
            return (
              <div key={e.titre} className="pr-step">
                <span className="pr-step__icon"><Icone size={20} /><span className="pr-step__num">{i + 1}</span></span>
                <span>
                  <span className="pr-step__title">{e.titre}</span>
                  <span className="pr-step__text" style={{ display: 'block' }}>{e.texte}</span>
                </span>
              </div>
            )
          })}
        </div>
      </section>

      <section className="pr-block" style={{ animationDelay: '0.35s' }}>
        <h2 className="pr-block__title">Ce qui compte</h2>
        <ul className="pr-check">
          {COMPTE.map(t => <li key={t}><Check size={17} style={{ color: 'var(--rt-primary)' }} />{t}</li>)}
        </ul>
        <p className="pr-sub">Ça ne compte pas</p>
        <ul className="pr-check">
          {COMPTE_PAS.map(t => <li key={t}><X size={17} style={{ color: 'var(--rt-muted)' }} />{t}</li>)}
        </ul>
      </section>

      <section className="pr-block" style={{ animationDelay: '0.45s' }}>
        <h2 className="pr-block__title">Questions fréquentes</h2>
        {FAQ.map(f => (
          <details key={f.q} className="pr-faq">
            <summary>{f.q}<Plus size={18} /></summary>
            <p>{f.a}</p>
          </details>
        ))}
        <details ref={reglementRef} id="reglement" className="pr-faq">
          <summary>Le règlement complet<Plus size={18} /></summary>
          <ol className="pr-rules">
            {REGLEMENT.map((r, i) => <li key={i}>{r}</li>)}
          </ol>
        </details>
        <button type="button" className="pr-ask" onClick={() => setPanneau('question')}>
          <span className="pr-step__icon"><MessageCircle size={20} /></span>
          <span style={{ flex: 1, textAlign: 'left' }}>
            <span className="pr-step__title">Vous avez une question ?</span>
            <span className="pr-step__text" style={{ display: 'block' }}>N’hésitez pas, je vous réponds personnellement.</span>
          </span>
          <ArrowRight size={18} style={{ color: 'var(--rt-primary)', flex: 'none' }} />
        </button>
      </section>

      <div className="pr-cta">
        <button type="button" className="pr-btn" onClick={() => setPanneau('inscription')}>
          Devenir parrain <ArrowRight size={18} />
        </button>
      </div>

      {panneau === 'inscription' && (
        <Panneau titre="Devenir parrain" intro="Gratuit et sans engagement. Votre espace est créé tout de suite, vous pourrez recommander quelqu’un juste après." onClose={fermer}>
          <InscriptionParrain voirReglement={voirReglement} />
        </Panneau>
      )}

      {panneau === 'question' && (
        <Panneau titre="Votre question" intro="Posez-la ici, elle m’arrive directement par e-mail." onClose={fermer}>
          <QuestionParrainage onFini={fermer} />
        </Panneau>
      )}

      {panneau === 'retrouver' && (
        <Panneau titre="Retrouver mon espace" onClose={fermer}>
          <p className="pr-sheet__lead">
            Votre espace parrain s’ouvre avec le lien personnel reçu à l’inscription (gardé dans vos favoris ou sur votre écran d’accueil).
            Vous l’avez perdu ? Appelez-moi, je vous le renvoie tout de suite.
          </p>
          <a href="tel:+33618135384" className="pr-btn" style={{ textDecoration: 'none' }}><Phone size={18} /> 06 18 13 53 84</a>
          <a href="mailto:contact@tabardel-roman.fr?subject=Mon%20lien%20de%20parrainage" className="pr-btn pr-btn--ghost" style={{ textDecoration: 'none', marginTop: 10 }}>Écrire un e-mail</a>
        </Panneau>
      )}
    </Cadre>
  )
}

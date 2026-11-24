'use client'

import { useEffect, type ReactNode } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import '@/styles/parrainage.css'

/* Briques communes de l'appli de parrainage. */

const PHOTO = '/images/accueil/jardin.jpg'

/* Cadre facon appli : photo en tete, colonne de telephone, fond flou sur ordinateur. */
export function Cadre({ top, children }: { top?: ReactNode; children: ReactNode }) {
  return (
    <div className="pr">
      <div className="pr__backdrop" aria-hidden="true">
        <Image src={PHOTO} alt="" fill sizes="100vw" className="pr__backdrop-img" />
      </div>
      <div className="pr__col">
        <div className="pr__hero">
          <Image src={PHOTO} alt="Le bureau de Roman Tabardel en plein air, dans la Drôme" fill priority sizes="(max-width: 520px) 100vw, 480px" className="pr__hero-img" />
          <div className="pr__hero-fade" />
          <div className="pr__top">
            <a href="https://www.tabardel-roman.fr" className="pr__brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-rt.png" alt="" />
              Roman Tabardel
            </a>
            {top}
          </div>
        </div>
        {children}
        <p className="pr__foot">
          Roman Tabardel · Sites web sur mesure · <a href="https://www.tabardel-roman.fr/politique-confidentialite">Confidentialité</a>
        </p>
      </div>
    </div>
  )
}

/* Panneau qui monte du bas de l'ecran. */
export function Panneau({ titre, intro, onClose, children }: { titre: string; intro?: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const echap = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    const avant = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', echap)
    return () => { document.body.style.overflow = avant; window.removeEventListener('keydown', echap) }
  }, [onClose])

  return (
    <>
      <div className="pr-sheet-bg" onClick={onClose} aria-hidden="true" />
      <div className="pr-sheet" role="dialog" aria-modal="true" aria-label={titre} data-lenis-prevent>
        <div className="pr-sheet__grab" />
        <div className="pr-sheet__head">
          <h2 className="pr-sheet__title">{titre}</h2>
          <button type="button" className="pr-sheet__close" onClick={onClose} aria-label="Fermer"><X size={18} /></button>
        </div>
        {intro && <p className="pr-sheet__lead">{intro}</p>}
        {children}
      </div>
    </>
  )
}

export function Champ({ label, children, aide }: { label: string; children: ReactNode; aide?: string }) {
  return (
    <label className="pr-field">
      <span className="pr-field__label">{label}</span>
      {children}
      {aide && <span className="pr-field__help">{aide}</span>}
    </label>
  )
}

export function Case({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: ReactNode }) {
  return (
    <label className="pr-tick">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span>{children}</span>
    </label>
  )
}

/* Champ piege rempli par les robots seulement. En display:none et sans nom
   reconnaissable : la saisie automatique du navigateur ne le touche pas
   (hors ecran, Chrome le remplissait et l'inscription etait ignoree). */
export function Piege({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" style={{ display: 'none' }}>
      <input type="text" tabIndex={-1} autoComplete="off" name="rt_controle_x7" value={value} onChange={e => onChange(e.target.value)} />
    </div>
  )
}

/* Prevenir Roman par e-mail (meme service que le formulaire de contact). */
export function prevenirRoman(sujet: string, champs: Record<string, string>) {
  const cle = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
  if (!cle) return
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    keepalive: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_key: cle, subject: sujet, from_name: 'Parrainage tabardel-roman.fr', ...champs }),
  }).catch(() => {})
}

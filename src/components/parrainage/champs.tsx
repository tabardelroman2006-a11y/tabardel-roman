'use client'

import type { CSSProperties, ReactNode } from 'react'

/* Champs de formulaire communs a l'inscription et au suivi du parrainage. */

export const champStyle: CSSProperties = {
  width: '100%', padding: '12px 14px', borderRadius: 10,
  backgroundColor: 'var(--rt-soft)', border: '1px solid var(--rt-line)',
  color: 'var(--rt-ink)', fontSize: 15, outline: 'none', fontFamily: 'inherit',
}

export function Champ({ label, children, aide }: { label: string; children: ReactNode; aide?: string }) {
  return (
    <label className="block">
      <span className="block font-body text-[10px] font-700 tracking-[0.18em] uppercase mb-1.5" style={{ color: 'var(--rt-muted)' }}>{label}</span>
      {children}
      {aide && <span className="block mt-1.5 font-body text-xs" style={{ color: 'var(--rt-muted)' }}>{aide}</span>}
    </label>
  )
}

export function Case({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: ReactNode }) {
  return (
    <label className="flex gap-3 items-start cursor-pointer font-body text-sm leading-relaxed" style={{ color: 'var(--rt-ink)' }}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="mt-1 shrink-0" style={{ width: 18, height: 18, accentColor: 'var(--rt-primary)' }} />
      <span>{children}</span>
    </label>
  )
}

/* Champ piege : cache aux humains, rempli par les robots. */
export function Piege({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }}>
      <input tabIndex={-1} autoComplete="off" name="site" value={value} onChange={e => onChange(e.target.value)} />
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

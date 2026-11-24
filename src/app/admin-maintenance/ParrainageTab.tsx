'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Copy, Trash2 } from 'lucide-react'
import {
  MONTANT_MINIMUM, PRIME, STATUTS,
  etatRecompense, normaliserEmail, normaliserTel,
  type Filleul, type Parrain, type Statut,
} from '@/lib/parrainage'

const NAVY = '#1B3A6B'
const VERT = '#16a34a'
const ROUGE = '#dc2626'

const card: React.CSSProperties = { background: '#fff', borderRadius: 14, padding: '1.5rem', border: '1px solid #EBEBEB' }
const cardTitle: React.CSSProperties = { fontSize: '1.15rem', fontWeight: 800, color: '#1A1A1A', fontFamily: 'var(--font-barlow, sans-serif)' }
const row: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: '1rem 1.25rem', borderRadius: 12, background: '#FAFAFA', border: '1px solid #EBEBEB' }
const btn: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff', border: '1.5px solid #E2E2E2', borderRadius: 999, padding: '8px 14px', fontSize: '0.85rem', fontWeight: 600, color: '#6B6B6B', cursor: 'pointer', fontFamily: 'inherit' }
const champ: React.CSSProperties = { padding: '8px 12px', borderRadius: 10, border: '1.5px solid #E2E2E2', background: '#fff', fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none' }
const petit: React.CSSProperties = { fontSize: '0.8rem', color: '#6B6B6B' }

const date = (iso: string) => new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
const lienSuivi = (id: string) => `${window.location.origin}/parrainage/suivi#${id}`

export function ParrainageTab({ token, onExpired }: { token: string; onExpired: () => void }) {
  const [parrains, setParrains] = useState<Parrain[]>([])
  const [filleuls, setFilleuls] = useState<Filleul[]>([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const [filtre, setFiltre] = useState<'actifs' | 'tous'>('actifs')
  const [saving, setSaving] = useState<string | null>(null)
  const [copie, setCopie] = useState<string | null>(null)

  const appel = useCallback(async (method: 'GET' | 'PATCH' | 'DELETE', body?: object) => {
    const res = await fetch('/api/admin/parrainage', {
      method,
      headers: { 'Content-Type': 'application/json', 'x-session-token': token },
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store',
    })
    if (res.status === 401) { onExpired(); return null }
    const d = await res.json().catch(() => ({}))
    if (!res.ok) { setError(d.error || 'Erreur.'); return null }
    setError('')
    return d
  }, [token, onExpired])

  useEffect(() => {
    appel('GET')
      .then(d => { if (d) { setParrains(d.parrains); setFilleuls(d.filleuls) } })
      .catch(() => setError('Erreur réseau.'))
      .finally(() => setLoaded(true))
  }, [appel])

  async function majFilleul(f: Filleul, changes: Partial<Record<'statut' | 'montant' | 'verse' | 'note', unknown>>) {
    setSaving(f.id)
    try {
      const d = await appel('PATCH', { parrainId: f.parrainId, filleulId: f.id, ...changes })
      if (d?.filleul) setFilleuls(l => l.map(x => x.id === f.id ? d.filleul : x))
    } catch { setError('Erreur réseau.') }
    setSaving(null)
  }

  async function supprimer(question: string, parrainId: string, filleulId?: string) {
    if (!window.confirm(question)) return
    setSaving(filleulId ?? parrainId)
    try {
      const d = await appel('DELETE', { parrainId, filleulId })
      if (d) {
        if (filleulId) setFilleuls(l => l.filter(x => x.id !== filleulId))
        else { setParrains(l => l.filter(x => x.id !== parrainId)); setFilleuls(l => l.filter(x => x.parrainId !== parrainId)) }
      }
    } catch { setError('Erreur réseau.') }
    setSaving(null)
  }

  async function copier(id: string) {
    try {
      await navigator.clipboard.writeText(lienSuivi(id))
      setCopie(id)
      setTimeout(() => setCopie(null), 2000)
    } catch {}
  }

  const parId = useMemo(() => new Map(parrains.map(p => [p.id, p])), [parrains])

  /* Doublons : meme telephone ou e-mail deja recommande avant, ou le parrain lui-meme. */
  const alertes = useMemo(() => {
    const out = new Map<string, string>()
    const ordre = [...filleuls].sort((a, b) => a.creeLe.localeCompare(b.creeLe))
    ordre.forEach((f, i) => {
      const tel = normaliserTel(f.telephone)
      const mail = f.email ? normaliserEmail(f.email) : ''
      const memeContact = (t: string, m: string) => (tel && normaliserTel(t) === tel) || (mail && normaliserEmail(m) === mail)
      const p = parId.get(f.parrainId)
      if (p && memeContact(p.telephone, p.email)) { out.set(f.id, 'Le parrain se recommande lui-même.'); return }
      const avant = ordre.slice(0, i).find(x => memeContact(x.telephone, x.email))
      if (avant) out.set(f.id, `Déjà recommandé le ${date(avant.creeLe)} par ${parId.get(avant.parrainId)?.prenom ?? 'un autre parrain'} : seule la première recommandation compte.`)
    })
    return out
  }, [filleuls, parId])

  const tries = [...filleuls].sort((a, b) => b.creeLe.localeCompare(a.creeLe))
  const actifs = tries.filter(f => ['due', 'aucune'].includes(etatRecompense(f)))
  const visibles = filtre === 'actifs' ? actifs : tries
  const dues = filleuls.filter(f => etatRecompense(f) === 'due')
  const totalVirements = dues.length * PRIME

  return (
    <>
      <div className="adm-kpis">
        {[
          { v: parrains.length, l: parrains.length > 1 ? 'parrains inscrits' : 'parrain inscrit', c: NAVY },
          { v: actifs.filter(f => etatRecompense(f) === 'aucune').length, l: 'recommandations en cours', c: '#b45309' },
          { v: dues.length, l: dues.length > 1 ? 'récompenses à régler' : 'récompense à régler', c: dues.length ? ROUGE : VERT },
          { v: `${totalVirements} €`, l: 'à virer', c: '#6B6B6B' },
        ].map(k => (
          <div key={k.l} className="adm-kpi" style={{ borderTopColor: k.c, cursor: 'default' }}>
            <b style={{ color: k.c }}>{loaded ? k.v : '…'}</b><span>{k.l}</span>
          </div>
        ))}
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <h2 style={cardTitle}>Recommandations</h2>
            <p style={{ ...petit, marginTop: 4 }}>Récompense due quand le statut est « Site livré et payé » et le montant d’au moins {MONTANT_MINIMUM} €.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {(['actifs', 'tous'] as const).map(f => (
              <button key={f} onClick={() => setFiltre(f)} style={{ ...btn, background: filtre === f ? NAVY : '#fff', color: filtre === f ? '#fff' : '#1A1A1A', borderColor: filtre === f ? NAVY : '#E2E2E2' }}>
                {f === 'actifs' ? 'À traiter' : 'Toutes'}
              </button>
            ))}
          </div>
        </div>

        {error && <p style={{ color: ROUGE, fontSize: '0.875rem', marginTop: '1rem' }}>{error}</p>}

        <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1.25rem' }}>
          {!loaded && <p style={petit}>Chargement…</p>}
          {loaded && visibles.length === 0 && <p style={{ ...row, alignItems: 'center', ...petit }}>Aucune recommandation {filtre === 'actifs' ? 'à traiter' : 'pour l’instant'}.</p>}
          {visibles.map(f => {
            const p = parId.get(f.parrainId)
            const etat = etatRecompense(f)
            const alerte = alertes.get(f.id)
            return (
              <div key={f.id} style={{ ...row, borderColor: etat === 'due' ? '#bbf7d0' : alerte ? '#fecaca' : '#EBEBEB', opacity: saving === f.id ? 0.6 : 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <div>
                    <p style={{ fontWeight: 700 }}>{f.nom}{f.entreprise && <span style={{ fontWeight: 400, color: '#6B6B6B' }}> · {f.entreprise}</span>}{f.ville && <span style={{ fontWeight: 400, color: '#6B6B6B' }}> · {f.ville}</span>}</p>
                    <p style={petit}>Le {date(f.creeLe)}, par <strong style={{ color: '#1A1A1A' }}>{p ? `${p.prenom} ${p.nom}` : 'parrain supprimé'}</strong></p>
                  </div>
                  {etat === 'due' && <span style={{ color: VERT, fontWeight: 800, fontSize: '0.85rem' }}>{PRIME} € à virer</span>}
                  {etat === 'versee' && <span style={{ color: VERT, fontSize: '0.85rem' }}>Réglée le {date(f.recompenseVerseeLe!)}</span>}
                  {f.statut === 'livre' && f.montant === null && <span style={{ color: '#b45309', fontWeight: 700, fontSize: '0.85rem' }}>Indique le montant du projet</span>}
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontWeight: 700 }}>
                  <a href={`tel:${f.telephone.replace(/\s/g, '')}`} style={{ color: NAVY, textDecoration: 'none' }}>📞 {f.telephone}</a>
                  {f.email && <a href={`mailto:${f.email}`} style={{ color: NAVY, textDecoration: 'none' }}>{f.email}</a>}
                </div>
                <p style={{ fontSize: '0.9rem', color: '#3F3F46', lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>{f.projet}</p>
                {alerte && <p style={{ fontSize: '0.85rem', color: '#b91c1c', fontWeight: 600 }}>⚠️ {alerte}</p>}

                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <select value={f.statut} disabled={saving === f.id} onChange={e => majFilleul(f, { statut: e.target.value as Statut })} style={champ} aria-label="Statut">
                    {STATUTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, ...petit }}>
                    Montant du projet
                    <input
                      key={`${f.id}-${f.montant}`}
                      type="number" min={0} step={1} inputMode="numeric" defaultValue={f.montant ?? ''} placeholder="€"
                      onBlur={e => {
                        const v = e.target.value.trim() === '' ? null : Number(e.target.value)
                        if (v !== f.montant) majFilleul(f, { montant: v })
                      }}
                      style={{ ...champ, width: 110 }}
                    />
                    €
                  </label>
                  {(etat === 'due' || etat === 'versee') && (
                    <button onClick={() => majFilleul(f, { verse: etat === 'due' })} disabled={saving === f.id} style={{ ...btn, background: etat === 'due' ? VERT : '#fff', color: etat === 'due' ? '#fff' : '#1A1A1A', borderColor: etat === 'due' ? VERT : '#E2E2E2' }}>
                      {etat === 'due' ? '✓ Marquer comme réglée' : 'Annuler le règlement'}
                    </button>
                  )}
                  <button onClick={() => supprimer(`Supprimer définitivement la recommandation de ${f.nom} ?`, f.parrainId, f.id)} style={{ ...btn, marginLeft: 'auto', color: ROUGE, borderColor: '#fecaca' }}>
                    <Trash2 size={14} /> Supprimer
                  </button>
                </div>
                <textarea
                  key={`${f.id}-note-${f.note}`}
                  defaultValue={f.note} rows={1} placeholder="Note pour toi (le parrain ne la voit pas)"
                  onBlur={e => { if (e.target.value !== f.note) majFilleul(f, { note: e.target.value }) }}
                  style={{ ...champ, resize: 'vertical' }}
                />
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ ...card, marginTop: '0.9rem' }}>
        <h2 style={cardTitle}>Parrains</h2>
        <p style={{ ...petit, marginTop: 4 }}>{PRIME} € par virement pour chaque projet abouti, client ou non. « Copier son lien » si un parrain a perdu le sien.</p>
        <div style={{ display: 'grid', gap: '0.6rem', marginTop: '1rem' }}>
          {loaded && parrains.length === 0 && <p style={petit}>Aucun parrain inscrit pour l’instant. Page publique : tabardel-roman.fr/parrainage</p>}
          {[...parrains].sort((a, b) => b.creeLe.localeCompare(a.creeLe)).map(p => {
            const n = filleuls.filter(f => f.parrainId === p.id).length
            return (
              <div key={p.id} style={{ ...row, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', opacity: saving === p.id ? 0.6 : 1 }}>
                <div style={{ flex: '1 1 14rem' }}>
                  <p style={{ fontWeight: 700 }}>{p.prenom} {p.nom} <span style={{ fontWeight: 400, ...petit }}>· {n} recommandation{n > 1 ? 's' : ''} · inscrit le {date(p.creeLe)}</span></p>
                  <p style={petit}><a href={`tel:${p.telephone.replace(/\s/g, '')}`} style={{ color: NAVY }}>{p.telephone}</a> · <a href={`mailto:${p.email}`} style={{ color: NAVY }}>{p.email}</a></p>
                </div>
                <button onClick={() => copier(p.id)} style={btn}><Copy size={14} /> {copie === p.id ? 'Lien copié' : 'Copier son lien'}</button>
                <button
                  onClick={() => supprimer(`Supprimer définitivement ${p.prenom} ${p.nom} et ses ${n} recommandation(s) ? Son lien ne marchera plus.`, p.id)}
                  aria-label={`Supprimer ${p.prenom} ${p.nom}`}
                  style={{ ...btn, color: ROUGE, borderColor: '#fecaca' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import { Eye, EyeOff, Wrench, FileText, Palette, EyeOff as PageHide, LogOut, Lock } from 'lucide-react'
import { HIDEABLE_PAGES } from '@/lib/pages-config'
import { TEXT_GROUPS } from '@/lib/text-fields'

const SESSION_KEY = 'rtAdminSession'
const NAVY = '#1B3A6B'

type Tab = 'maintenance' | 'pages' | 'textes' | 'couleurs'

export default function AdminPage() {
  const [token, setToken]               = useState<string | null>(null)
  const [password, setPassword]         = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState('')
  const [booting, setBooting]           = useState(true)
  const [tab, setTab]                   = useState<Tab>('maintenance')

  // Reprise de session
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY)
      if (raw) {
        const { token: t, exp } = JSON.parse(raw)
        if (t && exp && Date.now() < exp) setToken(t)
        else localStorage.removeItem(SESSION_KEY)
      }
    } catch {}
    setBooting(false)
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.token) {
        const exp = Date.now() + 8 * 60 * 60 * 1000
        localStorage.setItem(SESSION_KEY, JSON.stringify({ token: data.token, exp }))
        setToken(data.token)
        setPassword('')
      } else {
        setError(data.error || 'Mot de passe incorrect.')
      }
    } catch {
      setError('Erreur réseau. Réessayez.')
    }
    setLoading(false)
  }

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setToken(null)
    setTab('maintenance')
  }, [])

  if (booting) {
    return <div style={{ minHeight: '100vh', background: '#F4F4F4' }} />
  }

  // ── Écran de connexion ──────────────────────────────────────────────────────
  if (!token) {
    return (
      <div style={shell}>
        <div style={{ ...card, maxWidth: 400 }}>
          <p style={eyebrow}>Admin</p>
          <h1 style={title}>Espace de gestion</h1>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                style={eyeBtn}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && <p style={{ color: '#dc2626', fontSize: '0.875rem' }}>{error}</p>}
            <button type="submit" disabled={loading} style={{ ...primaryBtn, opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Dashboard ───────────────────────────────────────────────────────────────
  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'maintenance', label: 'Maintenance',       icon: <Wrench size={16} /> },
    { id: 'pages',       label: 'Pages',             icon: <PageHide size={16} /> },
    { id: 'textes',      label: 'Textes',            icon: <FileText size={16} /> },
    { id: 'couleurs',    label: 'Couleurs',          icon: <Palette size={16} /> },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F4', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <p style={eyebrow}>Admin · Roman Tabardel</p>
            <h1 style={{ ...title, marginBottom: 0 }}>Espace de gestion</h1>
          </div>
          <button onClick={logout} style={ghostBtn}>
            <LogOut size={15} /> Déconnexion
          </button>
        </div>

        {/* Onglets */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                ...tabBtn,
                background: tab === t.id ? NAVY : '#fff',
                color: tab === t.id ? '#fff' : '#1A1A1A',
                borderColor: tab === t.id ? NAVY : '#E5E3E0',
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Contenu */}
        {tab === 'maintenance' && <MaintenanceTab token={token} onExpired={logout} />}
        {tab === 'pages'    && <PagesTab token={token} onExpired={logout} />}
        {tab === 'textes'   && <TextsTab token={token} onExpired={logout} />}
        {tab === 'couleurs' && <ComingSoon title="Changer les couleurs de la marque" />}
      </div>
    </div>
  )
}

// ── Onglet Maintenance ────────────────────────────────────────────────────────
function MaintenanceTab({ token, onExpired }: { token: string; onExpired: () => void }) {
  const [maintenance, setMaintenance] = useState(false)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState('')
  const [success, setSuccess]         = useState('')

  useEffect(() => {
    fetch('/api/maintenance')
      .then(r => r.json())
      .then(d => setMaintenance(d.maintenance === true))
      .catch(() => {})
  }, [])

  async function toggle() {
    setLoading(true); setError(''); setSuccess('')
    const next = !maintenance
    try {
      const res = await fetch('/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-session-token': token },
        body: JSON.stringify({ value: next }),
      })
      if (res.status === 401) { onExpired(); return }
      if (res.ok) {
        setMaintenance(next)
        setSuccess(next ? 'Maintenance activée, le site affiche la page de maintenance.' : 'Maintenance désactivée, le site est en ligne.')
      } else {
        setError('Erreur lors de la mise à jour.')
      }
    } catch {
      setError('Erreur réseau.')
    }
    setLoading(false)
  }

  return (
    <div style={card}>
      <h2 style={cardTitle}>Maintenance du site</h2>
      <div style={{
        margin: '1.25rem 0',
        padding: '1.25rem',
        borderRadius: 12,
        background: maintenance ? '#fef2f2' : '#f0fdf4',
        border: `1px solid ${maintenance ? '#fecaca' : '#bbf7d0'}`,
      }}>
        <p style={{ fontWeight: 700, fontSize: '1rem', color: maintenance ? '#dc2626' : '#16a34a' }}>
          {maintenance ? '🔴 Site en maintenance' : '🟢 Site en ligne'}
        </p>
        <p style={{ fontSize: '0.85rem', color: '#6B6B6B', marginTop: '0.4rem' }}>
          {maintenance ? 'Les visiteurs voient la page de maintenance.' : 'Les visiteurs voient le site normalement.'}
        </p>
      </div>
      {error   && <p style={{ color: '#dc2626', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>}
      {success && <p style={{ color: '#16a34a', fontSize: '0.875rem', marginBottom: '1rem' }}>{success}</p>}
      <button
        onClick={toggle}
        disabled={loading}
        style={{
          ...primaryBtn,
          background: maintenance ? '#16a34a' : '#dc2626',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? 'Mise à jour…' : maintenance ? 'Désactiver la maintenance' : 'Activer la maintenance'}
      </button>
    </div>
  )
}

// ── Onglet Pages (masquer / afficher) ─────────────────────────────────────────
function PagesTab({ token, onExpired }: { token: string; onExpired: () => void }) {
  const [hidden, setHidden] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)
  const [saving, setSaving] = useState<string | null>(null)
  const [error, setError]   = useState('')

  useEffect(() => {
    fetch('/api/admin/content')
      .then(r => r.json())
      .then(d => setHidden(Array.isArray(d?.content?.hidden_pages) ? d.content.hidden_pages : []))
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [])

  async function togglePage(path: string) {
    setSaving(path); setError('')
    const next = hidden.includes(path) ? hidden.filter(p => p !== path) : [...hidden, path]
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-session-token': token },
        body: JSON.stringify({ patch: { hidden_pages: next } }),
      })
      if (res.status === 401) { onExpired(); return }
      if (res.ok) {
        setHidden(next)
        try { sessionStorage.setItem('rtHiddenPages', JSON.stringify(next)) } catch {}
      } else {
        setError('Erreur lors de l\'enregistrement.')
      }
    } catch {
      setError('Erreur réseau.')
    }
    setSaving(null)
  }

  return (
    <div style={card}>
      <h2 style={cardTitle}>Masquer / afficher des pages</h2>
      <p style={{ fontSize: '0.85rem', color: '#6B6B6B', margin: '0.5rem 0 1.5rem', lineHeight: 1.6 }}>
        Une page masquée disparaît du menu et redirige les visiteurs vers l&apos;accueil.
        Elle n&apos;est pas supprimée — tu peux la réafficher quand tu veux. Le changement peut
        prendre quelques secondes à apparaître sur le site.
      </p>
      {error && <p style={{ color: '#dc2626', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {HIDEABLE_PAGES.map(p => {
          const isHidden = hidden.includes(p.path)
          return (
            <div key={p.path} style={row}>
              <div>
                <p style={{ fontWeight: 700, color: '#1A1A1A' }}>{p.label}</p>
                <p style={{ fontSize: '0.8rem', color: isHidden ? '#dc2626' : '#16a34a', marginTop: 2 }}>
                  {isHidden ? '🔴 Masquée' : '🟢 Visible'}
                </p>
              </div>
              <button
                onClick={() => togglePage(p.path)}
                disabled={!loaded || saving === p.path}
                style={{
                  ...toggleBtn,
                  background:  isHidden ? '#16a34a' : '#fff',
                  color:       isHidden ? '#fff' : '#1A1A1A',
                  borderColor: isHidden ? '#16a34a' : '#E5E3E0',
                  opacity: (!loaded || saving === p.path) ? 0.6 : 1,
                }}
              >
                {saving === p.path ? '…' : isHidden ? 'Afficher' : 'Masquer'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Onglet Textes ─────────────────────────────────────────────────────────────
function TextsTab({ token, onExpired }: { token: string; onExpired: () => void }) {
  const [values, setValues]   = useState<Record<string, string>>({})
  const [loaded, setLoaded]   = useState(false)
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetch('/api/admin/content')
      .then(r => r.json())
      .then(d => {
        const t = (d?.content?.texts && typeof d.content.texts === 'object') ? d.content.texts : {}
        setValues(t)
      })
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [])

  function setField(key: string, val: string) {
    setValues(v => ({ ...v, [key]: val }))
    setSuccess('')
  }

  async function save() {
    setSaving(true); setError(''); setSuccess('')
    // On ne garde que les champs réellement remplis (vide = retour au texte par défaut)
    const cleaned: Record<string, string> = {}
    for (const [k, v] of Object.entries(values)) {
      if (typeof v === 'string' && v.trim() !== '') cleaned[k] = v.trim()
    }
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-session-token': token },
        body: JSON.stringify({ patch: { texts: cleaned } }),
      })
      if (res.status === 401) { onExpired(); return }
      if (res.ok) {
        try { sessionStorage.removeItem('rtTexts') } catch {}
        setSuccess('Textes enregistrés. Les changements apparaîtront sur le site dans quelques secondes.')
      } else {
        setError('Erreur lors de l\'enregistrement.')
      }
    } catch {
      setError('Erreur réseau.')
    }
    setSaving(false)
  }

  return (
    <div style={card}>
      <h2 style={cardTitle}>Modifier les textes</h2>
      <p style={{ fontSize: '0.85rem', color: '#6B6B6B', margin: '0.5rem 0 1.5rem', lineHeight: 1.6 }}>
        Laisse un champ <strong>vide</strong> pour garder le texte d&apos;origine (affiché en gris).
        Le changement apparaît sur le site quelques secondes après l&apos;enregistrement.
      </p>

      {TEXT_GROUPS.map(group => (
        <div key={group.group} style={{ marginBottom: '1.75rem' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: NAVY, marginBottom: '0.9rem' }}>
            {group.group}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {group.fields.map(f => (
              <label key={f.key} style={{ display: 'block' }}>
                <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#1A1A1A', marginBottom: 5 }}>
                  {f.label}
                </span>
                {f.multiline ? (
                  <textarea
                    value={values[f.key] ?? ''}
                    placeholder={f.default}
                    onChange={e => setField(f.key, e.target.value)}
                    disabled={!loaded}
                    rows={3}
                    style={{ ...input, padding: '10px 14px', resize: 'vertical', lineHeight: 1.5 }}
                  />
                ) : (
                  <input
                    type="text"
                    value={values[f.key] ?? ''}
                    placeholder={f.default}
                    onChange={e => setField(f.key, e.target.value)}
                    disabled={!loaded}
                    style={{ ...input, padding: '10px 14px' }}
                  />
                )}
              </label>
            ))}
          </div>
        </div>
      ))}

      {error   && <p style={{ color: '#dc2626', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{error}</p>}
      {success && <p style={{ color: '#16a34a', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{success}</p>}
      <button onClick={save} disabled={saving || !loaded} style={{ ...primaryBtn, opacity: (saving || !loaded) ? 0.7 : 1 }}>
        {saving ? 'Enregistrement…' : 'Enregistrer les textes'}
      </button>
    </div>
  )
}

// ── Placeholder phases à venir ────────────────────────────────────────────────
function ComingSoon({ title }: { title: string }) {
  return (
    <div style={{ ...card, textAlign: 'center', padding: '3rem 2.5rem' }}>
      <div style={{ display: 'inline-flex', padding: 14, borderRadius: 999, background: '#F4F4F4', marginBottom: '1rem' }}>
        <Lock size={22} color={NAVY} />
      </div>
      <h2 style={{ ...cardTitle, marginBottom: '0.5rem' }}>{title}</h2>
      <p style={{ fontSize: '0.9rem', color: '#6B6B6B', maxWidth: 380, margin: '0 auto' }}>
        Bientôt disponible. Cette section est en cours de construction et sera activée prochainement.
      </p>
    </div>
  )
}

// ── Styles partagés ───────────────────────────────────────────────────────────
const shell: React.CSSProperties = {
  minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: '#F4F4F4', padding: '2rem',
}
const card: React.CSSProperties = {
  background: '#fff', borderRadius: 16, padding: '2rem', width: '100%',
  boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #EEEBE7',
}
const eyebrow: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
  color: NAVY, marginBottom: '0.6rem',
}
const title: React.CSSProperties = {
  fontSize: '1.6rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '1.5rem',
  fontFamily: 'var(--font-barlow, sans-serif)',
}
const cardTitle: React.CSSProperties = {
  fontSize: '1.15rem', fontWeight: 800, color: '#1A1A1A',
  fontFamily: 'var(--font-barlow, sans-serif)',
}
const input: React.CSSProperties = {
  padding: '12px 48px 12px 16px', borderRadius: 8, border: '1px solid #D6D3D1',
  fontSize: '1rem', outline: 'none', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box',
}
const eyeBtn: React.CSSProperties = {
  position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
  background: 'none', border: 'none', padding: 8, cursor: 'pointer', color: '#6B6B6B',
  display: 'flex', alignItems: 'center',
}
const primaryBtn: React.CSSProperties = {
  background: NAVY, color: '#fff', border: 'none', borderRadius: 10, padding: '13px',
  fontSize: '1rem', fontWeight: 700, cursor: 'pointer', width: '100%', fontFamily: 'inherit',
}
const ghostBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff',
  border: '1px solid #E5E3E0', borderRadius: 8, padding: '8px 14px', fontSize: '0.85rem',
  fontWeight: 600, color: '#6B6B6B', cursor: 'pointer', fontFamily: 'inherit',
}
const tabBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid',
  borderRadius: 10, padding: '10px 16px', fontSize: '0.9rem', fontWeight: 700,
  cursor: 'pointer', fontFamily: 'inherit',
}
const row: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '1rem 1.25rem', borderRadius: 12, background: '#F8F7F5', border: '1px solid #EEEBE7',
}
const toggleBtn: React.CSSProperties = {
  border: '1px solid', borderRadius: 8, padding: '8px 18px', fontSize: '0.875rem',
  fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', minWidth: 90,
}

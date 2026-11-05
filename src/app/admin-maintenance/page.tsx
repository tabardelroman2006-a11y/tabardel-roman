'use client'

import { useState, useEffect, useCallback } from 'react'
import { Eye, EyeOff, Wrench, FileText, Palette, EyeOff as PageHide, LogOut, Phone, Search, Home } from 'lucide-react'
import { HIDEABLE_PAGES } from '@/lib/pages-config'
import { TEXT_GROUPS } from '@/lib/text-fields'
import { extractGoogleCode } from '@/lib/google-verification'

const SESSION_KEY = 'rtAdminSession'
const NAVY = '#1B3A6B'

type Tab = 'accueil' | 'appels' | 'maintenance' | 'pages' | 'textes' | 'couleurs' | 'google'

export default function AdminPage() {
  const [token, setToken]               = useState<string | null>(null)
  const [password, setPassword]         = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState('')
  const [booting, setBooting]           = useState(true)
  const [tab, setTab]                   = useState<Tab>('accueil')

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
    setTab('accueil')
  }, [])

  if (booting) {
    return <div style={{ minHeight: '100vh', background: '#F4F4F4' }} />
  }

  // ── Écran de connexion ──────────────────────────────────────────────────────
  if (!token) {
    return (
      <div style={shell}>
        <style>{ADMIN_CSS}</style>
        <div style={{ ...card, maxWidth: 380, textAlign: 'center', borderRadius: 20, padding: '2.4rem', boxShadow: '0 20px 60px -30px rgba(27,58,107,0.35)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-roman.png" alt="Roman Tabardel" style={{ width: 84, height: 70, objectFit: 'cover', margin: '0 auto 1rem', display: 'block' }} />
          <h1 style={title}>Espace Roman</h1>
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

  // ── Espace de gestion ───────────────────────────────────────────────────────
  const current = TABS.find(t => t.id === tab) ?? TABS[0]

  return (
    <div className="adm-app">
      <style>{ADMIN_CSS}</style>
      <aside className="adm-side">
        <a href="/" target="_blank" rel="noreferrer" className="adm-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-roman.png" alt="" />
          <span>Roman Tabardel</span>
        </a>
        <nav className="adm-nav">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={tab === t.id ? 'is-on' : ''}>
              {t.icon} <span>{t.label}</span>
            </button>
          ))}
        </nav>
        <div className="adm-side__foot">
          <a href="/" target="_blank" rel="noreferrer">Voir mon site ↗</a>
          <button onClick={logout}><LogOut size={14} /> Se déconnecter</button>
        </div>
      </aside>

      <main className="adm-main">
        <div className="adm-head">
          <h1 style={title}>{current.label}</h1>
          <p>{current.hint}</p>
        </div>
        {tab === 'accueil'     && <AccueilTab token={token} onExpired={logout} go={setTab} />}
        {tab === 'appels'      && <AppelsTab token={token} onExpired={logout} />}
        {tab === 'maintenance' && <MaintenanceTab token={token} onExpired={logout} />}
        {tab === 'pages'       && <PagesTab token={token} onExpired={logout} />}
        {tab === 'textes'      && <TextsTab token={token} onExpired={logout} />}
        {tab === 'couleurs'    && <ColorsTab token={token} onExpired={logout} />}
        {tab === 'google'      && <GoogleTab token={token} onExpired={logout} />}
      </main>
    </div>
  )
}

const TABS: { id: Tab; label: string; hint: string; icon: React.ReactNode }[] = [
  { id: 'accueil',     label: 'Accueil',     hint: 'Ton site en un coup d’œil.',                         icon: <Home size={17} /> },
  { id: 'appels',      label: 'Appels',      hint: 'Les appels pris par ton assistant téléphonique.',    icon: <Phone size={17} /> },
  { id: 'maintenance', label: 'Maintenance', hint: 'Fermer le site le temps de travaux.',                icon: <Wrench size={17} /> },
  { id: 'pages',       label: 'Pages',       hint: 'Masquer ou réafficher des pages du site.',           icon: <PageHide size={17} /> },
  { id: 'textes',      label: 'Textes',      hint: 'Modifier les textes de la page d’accueil.',          icon: <FileText size={17} /> },
  { id: 'couleurs',    label: 'Couleurs',    hint: 'La couleur principale de ton site.',                 icon: <Palette size={17} /> },
  { id: 'google',      label: 'Google',      hint: 'Faire reconnaître ton site par Google Search Console.', icon: <Search size={17} /> },
]

// ── Onglet Accueil (récapitulatif) ────────────────────────────────────────────
function AccueilTab({ token, onExpired, go }: { token: string; onExpired: () => void; go: (t: Tab) => void }) {
  const [appels, setAppels]           = useState<number | null>(null)
  const [maintenance, setMaintenance] = useState<boolean | null>(null)
  const [hidden, setHidden]           = useState<number | null>(null)
  const [google, setGoogle]           = useState<boolean | null>(null)

  useEffect(() => {
    fetch('/api/admin/appels', { headers: { 'x-session-token': token }, cache: 'no-store' })
      .then(r => { if (r.status === 401) { onExpired(); return null } return r.json() })
      .then(d => { if (d?.appels) setAppels((d.appels as Appel[]).filter(a => a.statut === 'a_rappeler').length) })
      .catch(() => {})
    fetch('/api/maintenance').then(r => r.json()).then(d => setMaintenance(d.maintenance === true)).catch(() => {})
    fetch('/api/admin/content').then(r => r.json()).then(d => {
      const c = d?.content ?? {}
      setHidden(Array.isArray(c.hidden_pages) ? c.hidden_pages.length : 0)
      setGoogle(typeof c.seo?.google_verification === 'string' && c.seo.google_verification !== '')
    }).catch(() => {})
  }, [token, onExpired])

  const dash = '…'
  const kpis: { tab: Tab; value: string; label: string; color: string }[] = [
    { tab: 'appels',      value: appels === null ? dash : String(appels), label: appels === 1 ? 'appel à rappeler' : 'appels à rappeler', color: NAVY },
    { tab: 'maintenance', value: maintenance === null ? dash : maintenance ? 'Fermé' : 'En ligne', label: maintenance ? 'site en maintenance' : 'site ouvert au public', color: maintenance ? '#dc2626' : '#16a34a' },
    { tab: 'pages',       value: hidden === null ? dash : String(hidden), label: hidden === 1 ? 'page masquée' : 'pages masquées', color: '#b45309' },
    { tab: 'google',      value: google === null ? dash : google ? 'Oui' : 'Non', label: 'balise Google en place', color: google ? '#16a34a' : '#6B6B6B' },
  ]

  return (
    <>
      <div className="adm-kpis">
        {kpis.map(k => (
          <button key={k.tab} className="adm-kpi" style={{ borderTopColor: k.color }} onClick={() => go(k.tab)}>
            <b style={{ color: k.color }}>{k.value}</b>
            <span>{k.label}</span>
          </button>
        ))}
      </div>
      <div style={card}>
        <h2 style={cardTitle}>Raccourcis</h2>
        <div className="adm-shortcuts">
          {TABS.filter(t => t.id !== 'accueil').map(t => (
            <button key={t.id} onClick={() => go(t.id)}>
              {t.icon}
              <span><strong>{t.label}</strong><small>{t.hint}</small></span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

const ADMIN_CSS = `
body:has(.adm-app) header, body:has(.adm-app) footer { display: none !important; }
.adm-app { display: grid; grid-template-columns: 15.5rem minmax(0, 1fr); min-height: 100vh; background: #F4F4F4; color: #1A1A1A; font-family: var(--font-nunito, system-ui), sans-serif; }
.adm-side { position: sticky; top: 0; height: 100vh; display: flex; flex-direction: column; padding: 1.4rem 1rem; background: #fff; border-right: 1px solid #EBEBEB; }
.adm-brand { display: flex; align-items: center; gap: 0.7rem; padding: 0 0.6rem 1.6rem; text-decoration: none; color: #1A1A1A; font-weight: 800; font-family: var(--font-barlow, sans-serif); font-size: 1.15rem; letter-spacing: 0.01em; }
.adm-brand img { width: 2.6rem; height: 2.2rem; object-fit: cover; }
.adm-nav { display: grid; gap: 0.2rem; }
.adm-nav button { display: flex; align-items: center; gap: 0.7rem; padding: 0.7rem 0.95rem; border-radius: 999px; border: 0; background: none; text-align: left; font: inherit; font-weight: 600; color: #1A1A1A; cursor: pointer; transition: background 0.2s; }
.adm-nav button:hover { background: #F4F4F4; }
.adm-nav button.is-on { background: ${NAVY}; color: #fff; }
.adm-side__foot { margin-top: auto; display: grid; gap: 0.6rem; padding: 0 0.95rem; font-size: 0.88rem; color: #6B6B6B; }
.adm-side__foot a { color: inherit; text-decoration: none; }
.adm-side__foot button { display: inline-flex; align-items: center; gap: 0.4rem; border: 0; background: none; padding: 0; font: inherit; color: inherit; cursor: pointer; text-align: left; }
.adm-main { padding: 2.2rem clamp(1rem, 3vw, 2.8rem) 5rem; max-width: 64rem; width: 100%; }
.adm-head { margin-bottom: 1.4rem; }
.adm-head p { color: #6B6B6B; margin-top: 0.35rem; }
.adm-kpis { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.9rem; margin-bottom: 0.9rem; }
.adm-kpi { display: grid; gap: 0.3rem; text-align: left; padding: 1.1rem 1.2rem; background: #fff; border: 1px solid #EBEBEB; border-top: 5px solid; border-radius: 14px; font: inherit; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
.adm-kpi:hover { transform: translateY(-2px); box-shadow: 0 10px 30px -18px rgba(0,0,0,0.25); }
.adm-kpi b { font-size: 1.9rem; font-weight: 800; font-family: var(--font-barlow, sans-serif); letter-spacing: -0.01em; }
.adm-kpi span { color: #6B6B6B; font-size: 0.85rem; }
.adm-shortcuts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.6rem; margin-top: 1rem; }
.adm-shortcuts button { display: flex; gap: 0.8rem; align-items: flex-start; padding: 0.9rem 1rem; border-radius: 12px; border: 1px solid #EBEBEB; background: #FAFAFA; text-align: left; font: inherit; color: ${NAVY}; cursor: pointer; transition: border-color 0.2s; }
.adm-shortcuts button:hover { border-color: ${NAVY}; }
.adm-shortcuts span { display: grid; gap: 0.15rem; color: #1A1A1A; }
.adm-shortcuts small { color: #6B6B6B; font-size: 0.8rem; }
@media (max-width: 860px) {
  .adm-app { grid-template-columns: minmax(0, 1fr); }
  .adm-side { min-width: 0; position: sticky; z-index: 5; height: auto; padding: 0.8rem 0.8rem 0.6rem; border-right: 0; border-bottom: 1px solid #EBEBEB; }
  .adm-brand { padding: 0 0.3rem 0.6rem; }
  .adm-nav { display: flex; overflow-x: auto; gap: 0.3rem; scrollbar-width: none; }
  .adm-nav button { flex-shrink: 0; padding: 0.55rem 0.9rem; }
  .adm-side__foot { display: none; }
  .adm-main { padding: 1.4rem 1rem 4rem; }
  .adm-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .adm-shortcuts { grid-template-columns: 1fr; }
}
`

// ── Onglet Appels (agent téléphonique) ────────────────────────────────────────
type Appel = import('@/app/api/admin/appels/route').Appel

const URGENCE_COULEUR = { urgente: '#dc2626', normale: '#b45309', faible: '#16a34a' } as const

function AppelsTab({ token, onExpired }: { token: string; onExpired: () => void }) {
  const [appels, setAppels]   = useState<Appel[]>([])
  const [loaded, setLoaded]   = useState(false)
  const [error, setError]     = useState('')
  const [filtre, setFiltre]   = useState<'a_rappeler' | 'tous'>('a_rappeler')
  const [saving, setSaving]   = useState<string | null>(null)
  const [ouvert, setOuvert]   = useState<string | null>(null)

  const charger = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/appels', { headers: { 'x-session-token': token }, cache: 'no-store' })
      if (res.status === 401) { onExpired(); return }
      const d = await res.json()
      if (res.ok) { setAppels(d.appels); setError('') } else setError(d.error || 'Erreur de chargement.')
    } catch {
      setError('Erreur réseau.')
    }
    setLoaded(true)
  }, [token, onExpired])

  useEffect(() => {
    charger()
    const t = setInterval(charger, 30_000)
    return () => clearInterval(t)
  }, [charger])

  async function basculer(a: Appel) {
    const statut = a.statut === 'a_rappeler' ? 'rappele' : 'a_rappeler'
    setSaving(a.id)
    try {
      const res = await fetch('/api/admin/appels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-session-token': token },
        body: JSON.stringify({ id: a.id, statut }),
      })
      if (res.status === 401) { onExpired(); return }
      if (res.ok) setAppels(list => list.map(x => x.id === a.id ? { ...x, statut } : x))
      else setError('Erreur lors de la mise à jour.')
    } catch {
      setError('Erreur réseau.')
    }
    setSaving(null)
  }

  const aRappeler = appels.filter(a => a.statut === 'a_rappeler')
  const visibles  = filtre === 'a_rappeler' ? aRappeler : appels

  return (
    <div style={card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h2 style={cardTitle}>Appels reçus par l&apos;assistant</h2>
          <p style={{ fontSize: '0.85rem', color: '#6B6B6B', marginTop: 4 }}>
            <strong style={{ color: NAVY }}>{aRappeler.length}</strong> à rappeler · {appels.length} au total
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {(['a_rappeler', 'tous'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFiltre(f)}
              style={{
                ...toggleBtn, minWidth: 0,
                background: filtre === f ? NAVY : '#fff',
                color: filtre === f ? '#fff' : '#1A1A1A',
                borderColor: filtre === f ? NAVY : '#E5E3E0',
              }}
            >
              {f === 'a_rappeler' ? 'À rappeler' : 'Tous'}
            </button>
          ))}
        </div>
      </div>

      {error && <p style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '1rem' }}>{error}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.25rem' }}>
        {!loaded && <p style={{ color: '#6B6B6B', fontSize: '0.9rem' }}>Chargement…</p>}
        {loaded && visibles.length === 0 && (
          <p style={{ ...row, justifyContent: 'center', color: '#6B6B6B', fontSize: '0.9rem' }}>
            {filtre === 'a_rappeler' ? 'Aucun appel à rappeler. 👌' : 'Aucun appel pour l’instant.'}
          </p>
        )}
        {visibles.map(a => {
          const mecontent = a.resume?.startsWith('Client mécontent')
          return (
            <div key={a.id} style={{
              ...row, flexDirection: 'column', alignItems: 'stretch', gap: '0.5rem',
              opacity: a.statut === 'rappele' ? 0.55 : 1,
              borderColor: mecontent && a.statut === 'a_rappeler' ? '#fecaca' : '#EEEBE7',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontWeight: 700, color: '#1A1A1A' }}>
                    {a.nom || 'Appelant inconnu'}
                    {a.entreprise && <span style={{ fontWeight: 400, color: '#6B6B6B' }}> · {a.entreprise}</span>}
                  </p>
                  <p style={{ fontSize: '0.78rem', color: '#6B6B6B', marginTop: 2 }}>
                    {new Date(a.debut).toLocaleString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {a.urgence && (
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                    color: URGENCE_COULEUR[a.urgence], border: '1px solid currentColor', borderRadius: 99,
                    padding: '3px 10px', whiteSpace: 'nowrap',
                  }}>
                    {a.urgence}
                  </span>
                )}
              </div>

              {a.telephone && (
                <a href={`tel:${a.telephone.replace(/\s/g, '')}`} style={{ color: NAVY, fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none' }}>
                  📞 {a.telephone}
                </a>
              )}
              {a.demande && <p style={{ fontWeight: 600, color: '#1A1A1A', fontSize: '0.92rem' }}>{a.demande}</p>}
              <p style={{ fontSize: '0.9rem', color: mecontent ? '#b91c1c' : '#3F3F46', lineHeight: 1.55 }}>
                {a.resume || 'Résumé indisponible : voir la transcription.'}
              </p>
              {a.rappel && <p style={{ fontSize: '0.82rem', color: '#6B6B6B' }}>Rappeler : {a.rappel}</p>}

              {ouvert === a.id && (
                <pre style={{
                  whiteSpace: 'pre-wrap', fontSize: '0.8rem', lineHeight: 1.6, background: '#fff',
                  border: '1px solid #EEEBE7', borderRadius: 8, padding: '0.75rem', margin: 0, fontFamily: 'inherit',
                }}>
                  {a.transcription}
                </pre>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 4 }}>
                <button
                  onClick={() => basculer(a)}
                  disabled={saving === a.id}
                  style={{
                    ...toggleBtn,
                    background: a.statut === 'a_rappeler' ? '#16a34a' : '#fff',
                    color: a.statut === 'a_rappeler' ? '#fff' : '#1A1A1A',
                    borderColor: a.statut === 'a_rappeler' ? '#16a34a' : '#E5E3E0',
                    opacity: saving === a.id ? 0.6 : 1,
                  }}
                >
                  {saving === a.id ? '…' : a.statut === 'a_rappeler' ? '✓ Rappelé' : 'Remettre à rappeler'}
                </button>
                <button onClick={() => setOuvert(o => o === a.id ? null : a.id)} style={ghostBtn}>
                  {ouvert === a.id ? 'Masquer la transcription' : 'Transcription'}
                </button>
              </div>
            </div>
          )
        })}
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

// ── Onglet Couleurs ───────────────────────────────────────────────────────────
const DEFAULT_PRIMARY = '#1B3A6B'
const HEX6 = /^#[0-9a-fA-F]{6}$/

function ColorsTab({ token, onExpired }: { token: string; onExpired: () => void }) {
  const [color, setColor]     = useState(DEFAULT_PRIMARY)
  const [loaded, setLoaded]   = useState(false)
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetch('/api/admin/content')
      .then(r => r.json())
      .then(d => {
        const p = d?.content?.colors?.primary
        if (typeof p === 'string' && HEX6.test(p)) setColor(p)
      })
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [])

  async function persist(colors: Record<string, string>, msg: string) {
    setSaving(true); setError(''); setSuccess('')
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-session-token': token },
        body: JSON.stringify({ patch: { colors } }),
      })
      if (res.status === 401) { onExpired(); return }
      if (res.ok) {
        try { sessionStorage.removeItem('rtPrimary') } catch {}
        setSuccess(msg)
      } else {
        setError('Erreur lors de l\'enregistrement.')
      }
    } catch {
      setError('Erreur réseau.')
    }
    setSaving(false)
  }

  const valid = HEX6.test(color)

  return (
    <div style={card}>
      <h2 style={cardTitle}>Couleur de la marque</h2>
      <p style={{ fontSize: '0.85rem', color: '#6B6B6B', margin: '0.5rem 0 1.5rem', lineHeight: 1.6 }}>
        C&apos;est la couleur principale utilisée sur tout le site (boutons, accents, liens actifs).
        Choisis une couleur <strong>foncée</strong> : du texte blanc s&apos;affiche dessus.
      </p>

      {/* Aperçu */}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ width: 56, height: 56, borderRadius: 12, background: valid ? color : '#ccc', border: '1px solid #E5E3E0' }} />
        <button style={{ ...primaryBtn, width: 'auto', padding: '12px 24px', background: valid ? color : '#ccc' }}>
          Exemple de bouton
        </button>
      </div>

      {/* Sélecteurs */}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input
          type="color"
          value={valid ? color : DEFAULT_PRIMARY}
          onChange={e => { setColor(e.target.value); setSuccess('') }}
          disabled={!loaded}
          style={{ width: 56, height: 44, border: '1px solid #E5E3E0', borderRadius: 8, background: '#fff', cursor: 'pointer' }}
        />
        <input
          type="text"
          value={color}
          onChange={e => { setColor(e.target.value); setSuccess('') }}
          placeholder={DEFAULT_PRIMARY}
          disabled={!loaded}
          style={{ ...input, padding: '10px 14px', width: 160, fontFamily: 'monospace', textTransform: 'uppercase' }}
        />
      </div>

      {!valid && <p style={{ color: '#dc2626', fontSize: '0.8rem', marginBottom: '1rem' }}>Format attendu : #RRGGBB (ex. #1B3A6B)</p>}
      {error   && <p style={{ color: '#dc2626', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{error}</p>}
      {success && <p style={{ color: '#16a34a', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{success}</p>}

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => persist({ primary: color }, 'Couleur enregistrée. Le site se met à jour dans quelques secondes.')}
          disabled={saving || !loaded || !valid}
          style={{ ...primaryBtn, width: 'auto', padding: '12px 28px', opacity: (saving || !loaded || !valid) ? 0.6 : 1 }}
        >
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
        <button
          onClick={() => { setColor(DEFAULT_PRIMARY); persist({}, 'Couleur réinitialisée à la valeur d\'origine.') }}
          disabled={saving || !loaded}
          style={{ ...ghostBtn, padding: '12px 20px' }}
        >
          Réinitialiser
        </button>
      </div>
    </div>
  )
}

// ── Onglet Google (balise de validation Search Console) ──────────────────────
function GoogleTab({ token, onExpired }: { token: string; onExpired: () => void }) {
  const [value, setValue]     = useState('')
  const [saved, setSaved]     = useState<string | null>(null)
  const [loaded, setLoaded]   = useState(false)
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetch('/api/admin/content')
      .then(r => r.json())
      .then(d => {
        const v = d?.content?.seo?.google_verification
        if (typeof v === 'string' && v) { setSaved(v); setValue(`<meta name="google-site-verification" content="${v}" />`) }
      })
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [])

  async function persist(code: string, msg: string) {
    setSaving(true); setError(''); setSuccess('')
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-session-token': token },
        body: JSON.stringify({ patch: { seo: { google_verification: code } } }),
      })
      if (res.status === 401) { onExpired(); return }
      if (res.ok) { setSaved(code || null); setSuccess(msg) }
      else setError('Erreur lors de l\'enregistrement.')
    } catch {
      setError('Erreur réseau.')
    }
    setSaving(false)
  }

  const code = extractGoogleCode(value)
  const invalid = value.trim() !== '' && !code

  return (
    <div style={card}>
      <h2 style={cardTitle}>Validation Google (Search Console)</h2>
      <p style={{ fontSize: '0.85rem', color: '#6B6B6B', margin: '0.5rem 0 1.5rem', lineHeight: 1.6 }}>
        Dans Google Search Console, choisis la méthode <strong>Balise HTML</strong>, copie la balise
        qu&apos;il te donne et colle-la ici. Enregistre, attends une minute, puis clique sur
        <strong> Valider</strong> chez Google.
      </p>

      <textarea
        value={value}
        onChange={e => { setValue(e.target.value); setSuccess('') }}
        placeholder={'<meta name="google-site-verification" content="..." />'}
        disabled={!loaded}
        rows={3}
        style={{ ...input, padding: '12px 14px', fontFamily: 'monospace', fontSize: '0.85rem', resize: 'vertical', marginBottom: '0.75rem' }}
      />

      {saved && !success && (
        <p style={{ color: '#16a34a', fontSize: '0.85rem', marginBottom: '0.75rem' }}>🟢 Une balise est en place sur le site.</p>
      )}
      {invalid && <p style={{ color: '#dc2626', fontSize: '0.8rem', marginBottom: '0.75rem' }}>Balise non reconnue : colle exactement celle donnée par Google.</p>}
      {error   && <p style={{ color: '#dc2626', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{error}</p>}
      {success && <p style={{ color: '#16a34a', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{success}</p>}

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => code && persist(code, 'Balise enregistrée. Elle sera sur le site d\'ici une minute.')}
          disabled={saving || !loaded || !code}
          style={{ ...primaryBtn, width: 'auto', padding: '12px 28px', opacity: (saving || !loaded || !code) ? 0.6 : 1 }}
        >
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
        {saved && (
          <button
            onClick={() => { setValue(''); persist('', 'Balise retirée du site.') }}
            disabled={saving}
            style={{ ...ghostBtn, padding: '12px 20px' }}
          >
            Retirer la balise
          </button>
        )}
      </div>
    </div>
  )
}

// ── Styles partagés ───────────────────────────────────────────────────────────
const shell: React.CSSProperties = {
  minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: '#F4F4F4', padding: '2rem',
}
const card: React.CSSProperties = {
  background: '#fff', borderRadius: 14, padding: '1.5rem', width: '100%', boxSizing: 'border-box',
  border: '1px solid #EBEBEB',
}
const title: React.CSSProperties = {
  fontSize: 'clamp(1.7rem, 2.6vw, 2.2rem)', fontWeight: 800, color: '#1A1A1A', margin: 0, lineHeight: 1.1,
  fontFamily: 'var(--font-barlow, sans-serif)',
}
const cardTitle: React.CSSProperties = {
  fontSize: '1.15rem', fontWeight: 800, color: '#1A1A1A',
  fontFamily: 'var(--font-barlow, sans-serif)',
}
const input: React.CSSProperties = {
  padding: '12px 48px 12px 16px', borderRadius: 10, border: '1.5px solid #E2E2E2', background: '#fff',
  fontSize: '1rem', outline: 'none', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box',
}
const eyeBtn: React.CSSProperties = {
  position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
  background: 'none', border: 'none', padding: 8, cursor: 'pointer', color: '#6B6B6B',
  display: 'flex', alignItems: 'center',
}
const primaryBtn: React.CSSProperties = {
  background: NAVY, color: '#fff', border: 'none', borderRadius: 999, padding: '13px',
  fontSize: '1rem', fontWeight: 700, cursor: 'pointer', width: '100%', fontFamily: 'inherit',
}
const ghostBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff',
  border: '1.5px solid #E2E2E2', borderRadius: 999, padding: '8px 14px', fontSize: '0.85rem',
  fontWeight: 600, color: '#6B6B6B', cursor: 'pointer', fontFamily: 'inherit',
}
const row: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '1rem 1.25rem', borderRadius: 12, background: '#FAFAFA', border: '1px solid #EBEBEB',
}
const toggleBtn: React.CSSProperties = {
  border: '1.5px solid', borderRadius: 999, padding: '8px 18px', fontSize: '0.875rem',
  fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', minWidth: 90,
}

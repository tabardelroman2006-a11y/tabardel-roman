'use client'

import { useState, useEffect } from 'react'

export default function AdminMaintenancePage() {
  const [password, setPassword]         = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [maintenance, setMaintenance]   = useState(false)
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState('')
  const [success, setSuccess]           = useState('')

  useEffect(() => {
    if (!authenticated) return
    fetch('/api/maintenance')
      .then(r => r.json())
      .then(d => setMaintenance(d.maintenance))
      .catch(() => {})
  }, [authenticated])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/maintenance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, value: false }),
    })
    if (res.status === 401) {
      setError('Mot de passe incorrect.')
    } else if (res.ok) {
      const data = await res.json()
      setMaintenance(data.maintenance)
      setAuthenticated(true)
    } else {
      setError('Erreur serveur. Réessayez.')
    }
    setLoading(false)
  }

  async function toggle() {
    setLoading(true)
    setError('')
    setSuccess('')
    const next = !maintenance
    const res = await fetch('/api/maintenance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, value: next }),
    })
    if (res.ok) {
      setMaintenance(next)
      setSuccess(next ? 'Maintenance activée — le site affiche la page de maintenance.' : 'Maintenance désactivée — le site est en ligne.')
    } else {
      setError('Erreur lors de la mise à jour.')
    }
    setLoading(false)
  }

  if (!authenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F4F4F4',
        padding: '2rem',
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '2.5rem',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1B3A6B', marginBottom: '0.75rem' }}>
            Admin
          </p>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '2rem', fontFamily: 'var(--font-barlow, sans-serif)' }}>
            Maintenance
          </h1>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #D6D3D1',
                fontSize: '1rem',
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
            {error && (
              <p style={{ color: '#dc2626', fontSize: '0.875rem' }}>{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{
                background: '#1B3A6B',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '13px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                fontFamily: 'inherit',
              }}
            >
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F4F4F4',
      padding: '2rem',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1B3A6B', marginBottom: '0.75rem' }}>
          Admin
        </p>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '0.5rem', fontFamily: 'var(--font-barlow, sans-serif)' }}>
          Maintenance
        </h1>

        <div style={{
          margin: '2rem 0',
          padding: '1.25rem',
          borderRadius: '12px',
          background: maintenance ? '#fef2f2' : '#f0fdf4',
          border: `1px solid ${maintenance ? '#fecaca' : '#bbf7d0'}`,
        }}>
          <p style={{ fontWeight: 700, fontSize: '1rem', color: maintenance ? '#dc2626' : '#16a34a' }}>
            {maintenance ? '🔴 Site en maintenance' : '🟢 Site en ligne'}
          </p>
          <p style={{ fontSize: '0.85rem', color: '#6B6B6B', marginTop: '0.4rem' }}>
            {maintenance
              ? 'Les visiteurs voient la page de maintenance.'
              : 'Les visiteurs voient le site normalement.'}
          </p>
        </div>

        {error   && <p style={{ color: '#dc2626', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>}
        {success && <p style={{ color: '#16a34a', fontSize: '0.875rem', marginBottom: '1rem' }}>{success}</p>}

        <button
          onClick={toggle}
          disabled={loading}
          style={{
            background: maintenance ? '#16a34a' : '#dc2626',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '14px 32px',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            width: '100%',
            fontFamily: 'inherit',
          }}
        >
          {loading
            ? 'Mise à jour…'
            : maintenance
              ? 'Désactiver la maintenance'
              : 'Activer la maintenance'}
        </button>
      </div>
    </div>
  )
}

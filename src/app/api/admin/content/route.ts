import { NextResponse } from 'next/server'
import { get } from '@vercel/edge-config'
import { requireAdmin } from '@/lib/admin-security'

const KEY = 'site_content'

type SiteContent = {
  hidden_pages?: string[]
  texts?: Record<string, unknown>
  colors?: Record<string, string>
}

async function readContent(): Promise<SiteContent> {
  try {
    const c = await get(KEY)
    return c && typeof c === 'object' ? (c as SiteContent) : {}
  } catch {
    return {}
  }
}

// ── Lecture publique du contenu éditable (non sensible) ──────────────────────
export async function GET() {
  const content = await readContent()
  return NextResponse.json(
    { content },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}

// ── Écriture (token admin requis) — fusionne le patch dans site_content ───────
export async function POST(request: Request) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: 'Non autorisé. Reconnectez-vous.' }, { status: 401 })
  }

  let patch: SiteContent | undefined
  try {
    const body = await request.json()
    patch = body?.patch
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }
  if (!patch || typeof patch !== 'object' || Array.isArray(patch)) {
    return NextResponse.json({ error: 'Données invalides.' }, { status: 400 })
  }

  const edgeConfigId = process.env.EDGE_CONFIG_ID
  const token        = process.env.VERCEL_API_TOKEN
  if (!edgeConfigId || !token) {
    return NextResponse.json({ error: 'Configuration serveur manquante.' }, { status: 500 })
  }

  const current = await readContent()
  const next: SiteContent = { ...current, ...patch }

  const res = await fetch(
    `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ operation: 'upsert', key: KEY, value: next }] }),
    },
  )

  if (!res.ok) {
    return NextResponse.json({ error: 'Erreur lors de l\'enregistrement.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, content: next })
}

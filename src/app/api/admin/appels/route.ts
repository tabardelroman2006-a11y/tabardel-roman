import { NextResponse } from 'next/server'
import { get, list, put } from '@vercel/blob'
import { requireAdmin } from '@/lib/admin-security'

export const dynamic = 'force-dynamic'

export type Appel = {
  id: string
  debut: string
  fin: string
  appelant: string | null
  nom?: string | null
  entreprise?: string | null
  telephone?: string | null
  demande?: string | null
  urgence?: 'faible' | 'normale' | 'urgente' | null
  rappel?: string | null
  resume?: string | null
  transcription: string
  statut: 'a_rappeler' | 'rappele'
}

const chemin = (id: string) => `appels/${id}.json`

async function lire(pathname: string): Promise<Appel | null> {
  const res = await get(pathname, { access: 'private', useCache: false })
  if (!res?.stream) return null
  return JSON.parse(await new Response(res.stream).text()) as Appel
}

// ── Liste des appels reçus par l'agent téléphonique ──────────────────────────
export async function GET(request: Request) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: 'Non autorisé. Reconnectez-vous.' }, { status: 401 })
  }
  const { blobs } = await list({ prefix: 'appels/', limit: 1000 })
  const appels = (await Promise.all(blobs.map(b => lire(b.pathname).catch(() => null))))
    .filter((a): a is Appel => a !== null)
    .sort((a, b) => b.debut.localeCompare(a.debut))
  return NextResponse.json({ appels }, { headers: { 'Cache-Control': 'no-store' } })
}

// ── Marquer un appel comme rappelé / à rappeler ──────────────────────────────
export async function POST(request: Request) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: 'Non autorisé. Reconnectez-vous.' }, { status: 401 })
  }
  let id = '', statut = ''
  try {
    const body = await request.json()
    id = typeof body?.id === 'string' ? body.id : ''
    statut = typeof body?.statut === 'string' ? body.statut : ''
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }
  if (!/^[\w-]+$/.test(id) || !['a_rappeler', 'rappele'].includes(statut)) {
    return NextResponse.json({ error: 'Données invalides.' }, { status: 400 })
  }

  const appel = await lire(chemin(id)).catch(() => null)
  if (!appel) return NextResponse.json({ error: 'Appel introuvable.' }, { status: 404 })

  const maj = { ...appel, statut: statut as Appel['statut'] }
  await put(chemin(id), JSON.stringify(maj), {
    access: 'private', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: true,
  })
  return NextResponse.json({ ok: true, appel: maj })
}

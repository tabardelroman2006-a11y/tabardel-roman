import { get } from '@vercel/edge-config'
import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-security'

export async function GET() {
  try {
    const maintenance = await get('maintenance')
    return NextResponse.json({ maintenance: maintenance === true })
  } catch {
    return NextResponse.json({ maintenance: false })
  }
}

export async function POST(request: Request) {
  try {
    const { password, value } = await request.json()

    // Accepte soit un token de session valide (header), soit le mot de passe (secours)
    const okToken    = requireAdmin(request)
    const okPassword = !!password && password === process.env.MAINTENANCE_PASSWORD
    if (!okToken && !okPassword) {
      return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 })
    }

    const edgeConfigId = process.env.EDGE_CONFIG_ID
    const token = process.env.VERCEL_API_TOKEN

    if (!edgeConfigId || !token) {
      return NextResponse.json({ error: 'Configuration manquante.' }, { status: 500 })
    }

    const res = await fetch(
      `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{ operation: 'upsert', key: 'maintenance', value }],
        }),
      }
    )

    if (!res.ok) {
      return NextResponse.json({ error: 'Erreur Vercel API.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, maintenance: value })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}

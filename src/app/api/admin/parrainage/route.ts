import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-security'
import { STATUTS, type Statut } from '@/lib/parrainage'
import {
  ecrireFilleul, idValide, lireFilleul,
  supprimerFilleul, supprimerParrain, tousLesFilleuls, tousLesParrains,
} from '@/lib/parrainage-store'

export const dynamic = 'force-dynamic'

const refus = () => NextResponse.json({ error: 'Non autorisé. Reconnectez-vous.' }, { status: 401 })
const invalide = () => NextResponse.json({ error: 'Données invalides.' }, { status: 400 })

async function corps(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const b = await request.json()
    return b && typeof b === 'object' ? b : null
  } catch {
    return null
  }
}

// ── Tous les parrains et leurs recommandations ───────────────────────────────
export async function GET(request: Request) {
  if (!requireAdmin(request)) return refus()
  const [parrains, filleuls] = await Promise.all([tousLesParrains(), tousLesFilleuls()])
  return NextResponse.json({ parrains, filleuls }, { headers: { 'Cache-Control': 'no-store' } })
}

// ── Modifier une recommandation { parrainId, filleulId, statut?, montant?, verse?, note? }
export async function PATCH(request: Request) {
  if (!requireAdmin(request)) return refus()
  const b = await corps(request)
  if (!b || !idValide(b.parrainId) || !idValide(b.filleulId)) return invalide()
  const f = await lireFilleul(b.parrainId, b.filleulId)
  if (!f) return NextResponse.json({ error: 'Recommandation introuvable.' }, { status: 404 })
  const maj = { ...f }

  if (b.statut !== undefined) {
    if (!STATUTS.some(s => s.id === b.statut)) return invalide()
    maj.statut = b.statut as Statut
  }
  if (b.montant !== undefined) {
    if (b.montant === null) maj.montant = null
    else if (typeof b.montant === 'number' && Number.isFinite(b.montant) && b.montant >= 0 && b.montant < 1e6) maj.montant = Math.round(b.montant)
    else return invalide()
  }
  if (b.verse !== undefined) {
    if (typeof b.verse !== 'boolean') return invalide()
    maj.recompenseVerseeLe = b.verse ? new Date().toISOString() : null
  }
  if (b.note !== undefined) {
    if (typeof b.note !== 'string') return invalide()
    maj.note = b.note.slice(0, 2000)
  }

  await ecrireFilleul(maj)
  return NextResponse.json({ ok: true, filleul: maj })
}

// ── Supprimer un parrain (et ses recommandations) ou une recommandation ──────
export async function DELETE(request: Request) {
  if (!requireAdmin(request)) return refus()
  const b = await corps(request)
  if (!b || !idValide(b.parrainId)) return invalide()
  if (b.filleulId === undefined) {
    await supprimerParrain(b.parrainId)
  } else {
    if (!idValide(b.filleulId)) return invalide()
    await supprimerFilleul(b.parrainId, b.filleulId)
  }
  return NextResponse.json({ ok: true })
}

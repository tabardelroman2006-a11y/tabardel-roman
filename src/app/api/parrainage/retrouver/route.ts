import { NextResponse } from 'next/server'
import { MESSAGE_TURNSTILE, turnstileValide } from '@/lib/turnstile'
import { createIPRateLimiter, getClientIP } from '@/lib/admin-security'
import { memePersonne } from '@/lib/parrainage'
import { tousLesParrains } from '@/lib/parrainage-store'

export const dynamic = 'force-dynamic'

const limiteur = createIPRateLimiter({ maxReq: 8, windowMs: 60 * 60_000, blockMs: 60 * 60_000 })
const texte = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

// ── Retrouver son espace parrain { nom, telephone } ─────────────────────────
export async function POST(request: Request) {
  const ip = getClientIP(request)
  if (limiteur.check(ip) !== null) {
    return NextResponse.json({ error: 'Trop d’essais. Réessayez dans une heure, ou appelez Roman au 06 18 13 53 84.' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  const nom = texte(body.nom, 120)
  const telephone = texte(body.telephone, 30)
  if (!nom || telephone.replace(/\D/g, '').length < 9) {
    return NextResponse.json({ error: 'Merci d’indiquer votre nom et votre numéro de téléphone.' }, { status: 400 })
  }
  if (!(await turnstileValide(body.turnstile, ip))) {
    return NextResponse.json({ error: MESSAGE_TURNSTILE }, { status: 400 })
  }

  limiteur.record(ip)
  const parrain = (await tousLesParrains()).find(p => memePersonne(p, nom, telephone))
  if (!parrain) {
    return NextResponse.json({
      error: 'Aucun espace parrain ne correspond. Vérifiez votre nom et le numéro donné à l’inscription, ou appelez Roman au 06 18 13 53 84.',
    }, { status: 404 })
  }
  return NextResponse.json({ ok: true, id: parrain.id })
}

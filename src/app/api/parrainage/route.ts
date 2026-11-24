import { NextResponse } from 'next/server'
import { createIPRateLimiter, getClientIP } from '@/lib/admin-security'
import { normaliserEmail, type Parrain } from '@/lib/parrainage'
import { ecrireParrain, nouvelId, tousLesParrains } from '@/lib/parrainage-store'
import { mailNouveauParrain } from '@/lib/parrainage-mail'

export const dynamic = 'force-dynamic'

const limiteur = createIPRateLimiter({ maxReq: 5, windowMs: 60 * 60_000, blockMs: 60 * 60_000 })

const texte = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

// ── Inscription d'un parrain ─────────────────────────────────────────────────
export async function POST(request: Request) {
  const ip = getClientIP(request)
  if (limiteur.check(ip) !== null) {
    return NextResponse.json({ error: 'Trop de tentatives. Réessayez dans une heure.' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  // Champ piege invisible : un robot le remplit, un humain non.
  if (texte(body.site, 200)) {
    console.warn('parrainage: inscription ignoree (champ piege rempli)')
    return NextResponse.json({ ok: true, id: nouvelId(18), mail: true })
  }

  const prenom = texte(body.prenom, 60)
  const nom = texte(body.nom, 60)
  const email = normaliserEmail(texte(body.email, 120))
  const telephone = texte(body.telephone, 30)
  if (!prenom || !nom || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || telephone.replace(/\D/g, '').length < 9) {
    return NextResponse.json({ error: 'Merci de remplir tous les champs correctement.' }, { status: 400 })
  }
  if (body.reglement !== true) {
    return NextResponse.json({ error: 'Merci d’accepter le règlement du parrainage.' }, { status: 400 })
  }

  limiteur.record(ip)

  const existants = await tousLesParrains()
  if (existants.some(p => p.email === email)) {
    return NextResponse.json({
      error: 'Cette adresse e-mail est déjà inscrite. Retrouvez votre lien de suivi dans vos favoris, ou appelez Roman au 06 18 13 53 84 pour le recevoir à nouveau.',
    }, { status: 409 })
  }

  const parrain: Parrain = {
    id: nouvelId(18),
    prenom, nom, email, telephone,
    creeLe: new Date().toISOString(),
  }
  await ecrireParrain(parrain)
  const mail = await mailNouveauParrain(parrain)
  return NextResponse.json({ ok: true, id: parrain.id, mail })
}

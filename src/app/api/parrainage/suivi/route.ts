import { NextResponse } from 'next/server'
import { MESSAGE_TURNSTILE, turnstileValide } from '@/lib/turnstile'
import { createIPRateLimiter, getClientIP } from '@/lib/admin-security'
import { etatRecompense, normaliserEmail, type Filleul, type Parrain } from '@/lib/parrainage'
import { ecrireFilleul, filleulsDe, idValide, lireParrain, nouvelId } from '@/lib/parrainage-store'
import { mailRecommandation } from '@/lib/parrainage-mail'

export const dynamic = 'force-dynamic'

const lectures = createIPRateLimiter({ maxReq: 60, windowMs: 10 * 60_000, blockMs: 30 * 60_000 })
const ajouts = createIPRateLimiter({ maxReq: 10, windowMs: 60 * 60_000, blockMs: 60 * 60_000 })

const texte = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

/* Ce que le parrain voit : jamais le montant du devis ni les notes de Roman. */
function vuePublique(p: Parrain, filleuls: Filleul[]) {
  return {
    parrain: { prenom: p.prenom },
    filleuls: filleuls
      .sort((a, b) => b.creeLe.localeCompare(a.creeLe))
      .map(f => ({
        id: f.id,
        nom: f.nom,
        entreprise: f.entreprise,
        creeLe: f.creeLe,
        statut: f.statut,
        recompense: etatRecompense(f),
        recompenseVerseeLe: f.recompenseVerseeLe,
      })),
  }
}

// ── Lire son suivi { id } ou recommander quelqu'un { id, filleul } ──────────
export async function POST(request: Request) {
  const ip = getClientIP(request)
  if (lectures.check(ip) !== null) {
    return NextResponse.json({ error: 'Trop de requêtes. Réessayez plus tard.' }, { status: 429 })
  }
  lectures.record(ip)

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  if (!idValide(body.id)) return NextResponse.json({ error: 'Lien de suivi invalide.' }, { status: 404 })
  const parrain = await lireParrain(body.id)
  if (!parrain) return NextResponse.json({ error: 'Lien de suivi invalide.' }, { status: 404 })

  const f = body.filleul as Record<string, unknown> | undefined
  if (f && typeof f === 'object') {
    if (ajouts.check(ip) !== null) {
      return NextResponse.json({ error: 'Trop de recommandations d’un coup. Réessayez dans une heure.' }, { status: 429 })
    }
    if (texte(f.site, 200)) {
      console.warn('parrainage: recommandation ignoree (champ piege rempli)')
      return NextResponse.json({ ...vuePublique(parrain, await filleulsDe(parrain.id)), mail: true })
    }

    const filleul: Filleul = {
      id: nouvelId(9),
      parrainId: parrain.id,
      nom: texte(f.nom, 80),
      entreprise: texte(f.entreprise, 100),
      telephone: texte(f.telephone, 30),
      email: normaliserEmail(texte(f.email, 120)),
      ville: texte(f.ville, 80),
      projet: texte(f.projet, 1500),
      creeLe: new Date().toISOString(),
      statut: 'recu',
      montant: null,
      recompenseVerseeLe: null,
      note: '',
    }
    if (!filleul.nom || filleul.telephone.replace(/\D/g, '').length < 9 || !filleul.projet) {
      return NextResponse.json({ error: 'Merci d’indiquer au moins le nom, le téléphone et le projet.' }, { status: 400 })
    }
    if (filleul.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(filleul.email)) {
      return NextResponse.json({ error: 'L’adresse e-mail ne semble pas correcte.' }, { status: 400 })
    }
    if (f.accord !== true) {
      return NextResponse.json({ error: 'Merci de confirmer que cette personne est d’accord pour être contactée.' }, { status: 400 })
    }
    if (!(await turnstileValide(body.turnstile, ip))) {
      return NextResponse.json({ error: MESSAGE_TURNSTILE }, { status: 400 })
    }
    ajouts.record(ip)
    await ecrireFilleul(filleul)
    const mail = await mailRecommandation(parrain, filleul)
    const liste = await filleulsDe(parrain.id)
    if (!liste.some(x => x.id === filleul.id)) liste.push(filleul)
    return NextResponse.json({ ...vuePublique(parrain, liste), mail }, { headers: { 'Cache-Control': 'no-store' } })
  }

  return NextResponse.json(vuePublique(parrain, await filleulsDe(parrain.id)), { headers: { 'Cache-Control': 'no-store' } })
}

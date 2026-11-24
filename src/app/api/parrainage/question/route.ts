import { NextResponse } from 'next/server'
import { createIPRateLimiter, getClientIP } from '@/lib/admin-security'
import { mailQuestion } from '@/lib/parrainage-mail'

export const dynamic = 'force-dynamic'

const limiteur = createIPRateLimiter({ maxReq: 5, windowMs: 60 * 60_000, blockMs: 60 * 60_000 })
const texte = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

// ── Question posee depuis la page parrainage, envoyee a Roman par e-mail ─────
export async function POST(request: Request) {
  const ip = getClientIP(request)
  if (limiteur.check(ip) !== null) {
    return NextResponse.json({ error: 'Trop de questions d’un coup. Réessayez dans une heure.' }, { status: 429 })
  }
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }
  if (texte(body.site, 200)) {
    console.warn('parrainage: question ignoree (champ piege rempli)')
    return NextResponse.json({ ok: true, mail: true })
  }
  const q = {
    prenom: texte(body.prenom, 60),
    nom: texte(body.nom, 60),
    contact: texte(body.contact, 120),
    question: texte(body.question, 1500),
  }
  if (!q.prenom || !q.nom || !q.contact || !q.question) {
    return NextResponse.json({ error: 'Merci de remplir tous les champs.' }, { status: 400 })
  }
  limiteur.record(ip)
  return NextResponse.json({ ok: true, mail: await mailQuestion(q) })
}

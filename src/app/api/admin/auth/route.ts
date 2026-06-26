import { NextResponse } from 'next/server'
import {
  adminSecret,
  safePasswordCheck,
  generateSessionToken,
  getClientIP,
  createIPRateLimiter,
} from '@/lib/admin-security'

// 10 tentatives / 15 min par IP, puis blocage 15 min
const loginLimiter = createIPRateLimiter({ maxReq: 10, windowMs: 15 * 60_000, blockMs: 15 * 60_000 })

export async function POST(request: Request) {
  const ip = getClientIP(request)

  const blockedMin = loginLimiter.check(ip)
  if (blockedMin !== null) {
    return NextResponse.json(
      { error: `Trop de tentatives. Réessayez dans ${blockedMin} minute${blockedMin > 1 ? 's' : ''}.` },
      { status: 429 },
    )
  }

  let password = ''
  try {
    const body = await request.json()
    password = typeof body?.password === 'string' ? body.password : ''
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  const secret = adminSecret()
  if (!secret) {
    return NextResponse.json({ error: 'Admin non configuré.' }, { status: 500 })
  }

  if (!password.trim() || !safePasswordCheck(password.trim(), secret)) {
    loginLimiter.record(ip)
    await new Promise(r => setTimeout(r, 500)) // ralentit les scripts
    return NextResponse.json({ error: 'Mot de passe incorrect.' }, { status: 401 })
  }

  loginLimiter.clear(ip)
  const token = generateSessionToken(secret)
  return NextResponse.json({ token })
}

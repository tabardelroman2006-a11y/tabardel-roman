import { createHmac, timingSafeEqual, randomBytes } from 'crypto'

/**
 * Sécurité admin — token de session signé HMAC.
 * Le secret de signature est le mot de passe admin lui-même (MAINTENANCE_PASSWORD),
 * donc aucune nouvelle variable d'environnement à configurer.
 */

export function adminSecret(): string {
  return (process.env.MAINTENANCE_PASSWORD || '').trim()
}

// ─── Comparaison résistante aux timing attacks ───────────────────────────────
export function safePasswordCheck(provided = '', expected = ''): boolean {
  const key = Buffer.alloc(32, 1)
  const a = createHmac('sha256', key).update(String(provided)).digest()
  const b = createHmac('sha256', key).update(String(expected)).digest()
  return timingSafeEqual(a, b)
}

// ─── Token de session : <ts_base36>.<nonce_hex>.<hmac_hex> ───────────────────
export function generateSessionToken(secret: string): string {
  const ts  = Date.now().toString(36)
  const rnd = randomBytes(12).toString('hex')
  const sig = createHmac('sha256', secret).update(`${ts}.${rnd}`).digest('hex')
  return `${ts}.${rnd}.${sig}`
}

export function verifySessionToken(
  token: string,
  secret: string,
  maxAgeMs = 8 * 60 * 60 * 1000,
): boolean {
  if (typeof token !== 'string' || token.length > 200 || !secret) return false
  const parts = token.split('.')
  if (parts.length !== 3) return false
  const [ts, rnd, sig] = parts

  const timestamp = parseInt(ts, 36)
  if (!Number.isFinite(timestamp) || Date.now() - timestamp > maxAgeMs) return false

  const expected = createHmac('sha256', secret).update(`${ts}.${rnd}`).digest('hex')
  if (typeof sig !== 'string' || sig.length !== expected.length) return false

  const sigBuf = Buffer.from(sig, 'hex')
  const expBuf = Buffer.from(expected, 'hex')
  if (sigBuf.length !== 32 || expBuf.length !== 32) return false

  return timingSafeEqual(sigBuf, expBuf)
}

// ─── Vérifie le header x-session-token d'une requête ─────────────────────────
export function requireAdmin(request: Request): boolean {
  const token = (request.headers.get('x-session-token') || '').trim()
  return verifySessionToken(token, adminSecret())
}

// ─── IP du client ────────────────────────────────────────────────────────────
export function getClientIP(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return 'unknown'
}

// ─── Rate limiter IP en mémoire (par instance de fonction) ───────────────────
type RLEntry = { count: number; start: number; blockedUntil: number | null }

export function createIPRateLimiter(opts: { maxReq: number; windowMs: number; blockMs: number }) {
  const { maxReq, windowMs, blockMs } = opts
  const store = new Map<string, RLEntry>()

  return {
    /** retourne null si OK, ou le nombre de minutes restantes si bloqué */
    check(ip: string): number | null {
      const e = store.get(ip)
      if (!e) return null
      if (e.blockedUntil) {
        if (Date.now() < e.blockedUntil) return Math.ceil((e.blockedUntil - Date.now()) / 60_000)
        store.delete(ip)
        return null
      }
      if (Date.now() - e.start > windowMs) { store.delete(ip); return null }
      return null
    },
    record(ip: string): void {
      const now = Date.now()
      const e = store.get(ip) || { count: 0, start: now, blockedUntil: null }
      if (now - e.start > windowMs) { e.count = 0; e.start = now; e.blockedUntil = null }
      e.count += 1
      if (e.count >= maxReq) e.blockedUntil = now + blockMs
      store.set(ip, e)
    },
    clear(ip: string): void { store.delete(ip) },
  }
}

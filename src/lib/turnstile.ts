/* Verification Cloudflare Turnstile cote serveur.
   Sans TURNSTILE_SECRET_KEY : la verification est ignoree (case non branchee). */

export async function turnstileValide(jeton: unknown, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  if (typeof jeton !== 'string' || !jeton || jeton.length > 2048) return false
  try {
    const corps = new URLSearchParams({ secret, response: jeton })
    if (ip && ip !== 'unknown') corps.set('remoteip', ip)
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: corps })
    const d = await res.json() as { success?: boolean; 'error-codes'?: string[] }
    if (!d.success) console.warn('[antispam] refus : Turnstile', (d['error-codes'] ?? []).join(','))
    return d.success === true
  } catch (e) {
    console.error('[antispam] Turnstile injoignable', e instanceof Error ? e.message : e)
    return true
  }
}

export const MESSAGE_TURNSTILE = 'Merci de cocher la case « Vérifiez que vous êtes humain » juste au-dessus du bouton.'

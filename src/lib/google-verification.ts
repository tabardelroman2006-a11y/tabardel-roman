/* Code de validation Google Search Console (balise HTML).
   Accepte la balise complète collée telle quelle ou le code seul. */
const CODE = /^[A-Za-z0-9_-]{10,100}$/

export function extractGoogleCode(raw: string): string | null {
  const s = raw.trim()
  if (!s) return null
  const fromTag = s.match(/content\s*=\s*["']([^"']+)["']/i)
  const code = (fromTag ? fromTag[1] : s).trim()
  return CODE.test(code) ? code : null
}

/* Lecture côté serveur, mise en cache 60 s (la page d'accueil reste statique). */
export async function readGoogleCode(): Promise<string | null> {
  try {
    const ec = process.env.EDGE_CONFIG
    if (!ec) return null
    const url = new URL(ec)
    const id = url.pathname.replace('/', '')
    const token = url.searchParams.get('token')
    if (!id || !token) return null
    const res = await fetch(`https://edge-config.vercel.com/${id}/item/site_content?token=${token}`, {
      next: { revalidate: 60, tags: ['site-content'] },
    })
    if (!res.ok) return null
    const content = await res.json()
    const v = content?.seo?.google_verification
    return typeof v === 'string' ? extractGoogleCode(v) : null
  } catch {
    return null
  }
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: ['/((?!api/|_next/|admin-maintenance|maintenance\\.html|.*\\..*).*)',],
}

async function readItem(ecId: string, token: string, key: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://edge-config.vercel.com/${ecId}/item/${key}?token=${token}`,
      { next: { revalidate: 0 } },
    )
    if (!res.ok) return null
    return await res.text()
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  try {
    const edgeConfigUrl = process.env.EDGE_CONFIG
    if (!edgeConfigUrl) return NextResponse.next()

    const url   = new URL(edgeConfigUrl)
    const ecId  = url.pathname.replace('/', '')
    const token = url.searchParams.get('token')
    if (!ecId || !token) return NextResponse.next()

    // 1) Mode maintenance → page statique
    const maintenance = await readItem(ecId, token, 'maintenance')
    if (maintenance === 'true') {
      return NextResponse.rewrite(new URL('/maintenance.html', request.url))
    }

    // 2) Pages masquées → redirection vers l'accueil
    const raw = await readItem(ecId, token, 'site_content')
    if (raw) {
      try {
        const content = JSON.parse(raw)
        const hidden  = Array.isArray(content?.hidden_pages) ? content.hidden_pages : []
        const path    = request.nextUrl.pathname.replace(/\/$/, '') || '/'
        if (path !== '/' && hidden.includes(path)) {
          return NextResponse.redirect(new URL('/', request.url))
        }
      } catch {
        // valeur illisible → on ne masque rien
      }
    }
  } catch {
    // fail-open : toute erreur laisse le site ouvert
  }
  return NextResponse.next()
}

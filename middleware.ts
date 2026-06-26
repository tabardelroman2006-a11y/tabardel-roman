import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: ['/((?!api/|_next/|admin-maintenance|maintenance\\.html|.*\\..*).*)',],
}

export async function middleware(request: NextRequest) {
  try {
    const edgeConfigUrl = process.env.EDGE_CONFIG
    if (!edgeConfigUrl) return NextResponse.next()

    // Construire l'URL de l'item depuis la connection string
    // Format: https://edge-config.vercel.com/{id}?token={token}
    const url = new URL(edgeConfigUrl)
    const ecId = url.pathname.replace('/', '')
    const token = url.searchParams.get('token')

    const res = await fetch(
      `https://edge-config.vercel.com/${ecId}/item/maintenance?token=${token}`,
      { next: { revalidate: 0 } }
    )

    if (res.ok) {
      const value = await res.text()
      if (value === 'true') {
        return NextResponse.rewrite(new URL('/maintenance.html', request.url))
      }
    }
  } catch {
    // fail-open : toute erreur laisse le site ouvert
  }
  return NextResponse.next()
}

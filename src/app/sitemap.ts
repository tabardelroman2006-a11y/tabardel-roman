import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'
import { OFFRES } from '@/lib/offres'
import { REALISATIONS } from '@/lib/realisations'
import { VILLES } from '@/lib/villes'

const PAGES: { path: string; priority: number }[] = [
  { path: '/', priority: 1 },
  { path: '/services', priority: 0.9 },
  ...OFFRES.map(o => ({ path: `/services/${o.slug}`, priority: 0.8 })),
  { path: '/realisations', priority: 0.8 },
  ...REALISATIONS.map(r => ({ path: `/realisations/${r.slug}`, priority: 0.6 })),
  ...VILLES.map(v => ({ path: `/creation-site-internet/${v.slug}`, priority: 0.7 })),
  { path: '/notre-histoire', priority: 0.7 },
  { path: '/contact', priority: 0.8 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority,
  }))
}

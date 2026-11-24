import type { Metadata, Viewport } from 'next'
import { pageMeta } from '@/lib/seo'
import { PRIME } from '@/lib/parrainage'
import { AccueilParrainage } from '@/components/parrainage/AccueilParrainage'

export const metadata: Metadata = {
  ...pageMeta({
    title: `Parrainage : ${PRIME} € offerts`,
    description: `Un proche a besoin d’un site internet ? Recommandez-le à Roman Tabardel et recevez ${PRIME} € par virement quand son site est livré. Client ou non, sans limite.`,
    path: '/parrainage',
    ogTitle: `Parrainage Roman Tabardel : ${PRIME} € offerts`,
    image: { url: '/images/accueil/roman-dehors.jpg', width: 900, height: 1354, alt: 'Roman Tabardel' },
  }),
  robots: { index: false, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#F3F6FB',
}

export default function ParrainagePage() {
  return <AccueilParrainage />
}

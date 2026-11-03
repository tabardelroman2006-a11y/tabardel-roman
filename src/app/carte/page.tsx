import type { Metadata, Viewport } from 'next'
import { pageMeta } from '@/lib/seo'
import { CarteVisite } from '@/components/carte/CarteVisite'

export const metadata: Metadata = {
  ...pageMeta({
    title: 'Carte de visite',
    description: 'Appeler, écrire ou enregistrer le contact de Roman Tabardel, créateur de sites web dans la Drôme.',
    path: '/carte',
    image: { url: '/images/accueil/roman-dehors.jpg', width: 900, height: 1354, alt: 'Roman Tabardel' },
  }),
  robots: { index: false, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#F3F6FB',
}

export default function CartePage() {
  return <CarteVisite />
}

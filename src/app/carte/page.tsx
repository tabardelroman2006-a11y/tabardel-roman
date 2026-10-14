import type { Metadata, Viewport } from 'next'
import { CarteVisite } from '@/components/carte/CarteVisite'

export const metadata: Metadata = {
  title: 'Carte de visite',
  description: 'Appeler, écrire ou enregistrer le contact de Roman Tabardel, créateur de sites web dans la Drôme.',
  openGraph: {
    title: 'Roman Tabardel | Carte de visite',
    description: 'Appelez-moi, écrivez-moi ou enregistrez mon contact en un geste.',
    images: [{ url: '/images/accueil/roman-dehors.jpg', width: 900, height: 1354 }],
  },
}

export const viewport: Viewport = {
  themeColor: '#F3F6FB',
}

export default function CartePage() {
  return <CarteVisite />
}

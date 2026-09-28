import type { Metadata } from 'next'
import { HomePage } from '@/components/home/HomePage'

export const metadata: Metadata = {
  title: 'Roman Tabardel | Création de sites web & SEO',
  description:
    'Des sites web sur mesure qui convertissent, pour les artisans, TPE et PME. Création de sites vitrine, e-commerce et référencement naturel partout en France.',
}

export default function Page() {
  return <HomePage />
}

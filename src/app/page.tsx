import type { Metadata } from 'next'
import { HomeRelief } from '@/components/relief/HomeRelief'
import { CTAFinal } from '@/components/sections/CTAFinal'

export const metadata: Metadata = {
  title: 'Roman Tabardel | Création de sites web & SEO',
  description:
    'Des sites web sur mesure qui convertissent, pour les artisans, TPE et PME. Création de sites vitrine, e-commerce et référencement naturel partout en France.',
}

export default function HomePage() {
  return (
    <>
      <HomeRelief />
      <CTAFinal />
    </>
  )
}

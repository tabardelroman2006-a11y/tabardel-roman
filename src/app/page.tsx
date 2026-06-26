import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { TornDivider } from '@/components/ui/TornDivider'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { CTAFinal } from '@/components/sections/CTAFinal'

export const metadata: Metadata = {
  title: 'Roman Tabardel | Création de sites web & SEO',
  description:
    'Des sites web sur mesure qui convertissent, pour les artisans, TPE et PME. Création de sites vitrine, e-commerce et référencement naturel partout en France.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <TornDivider />
      <ProcessSection />
      <CTAFinal />
    </>
  )
}

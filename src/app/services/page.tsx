import type { Metadata } from 'next'
import { Portfolio } from '@/components/sections/Portfolio'
import { ServicesSection } from '@/components/sections/ServicesSection'

export const metadata: Metadata = {
  title: 'Services & Réalisations',
  description:
    'Création de sites web sur mesure, refonte, SEO et audit — découvrez nos réalisations.',
}

export default function ServicesPage() {
  return (
    <>
      <div className="pt-16">
        <Portfolio />
        <ServicesSection />
      </div>
    </>
  )
}

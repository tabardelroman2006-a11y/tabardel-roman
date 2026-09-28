import type { Metadata } from 'next'
import { PageHero } from '@/components/home/PageHero'
import { ServicesStack } from '@/components/home/ServicesStack'
import { RealisationsTunnel } from '@/components/home/RealisationsTunnel'
import { CTAFinal } from '@/components/sections/CTAFinal'

export const metadata: Metadata = {
  title: 'Services & Réalisations | Roman Tabardel',
  description:
    'Création de sites web sur mesure, refonte, SEO et audit, découvrez nos réalisations.',
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services & Réalisations"
        title="Des sites qui vous ressemblent"
        subtitle="Site vitrine, boutique en ligne, refonte ou référencement : chaque projet est pensé pour votre activité, et livré clés en main."
        next="#offres"
      />
      <ServicesStack />
      <RealisationsTunnel />
      <CTAFinal />
    </>
  )
}

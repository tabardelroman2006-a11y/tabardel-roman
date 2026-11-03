import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { PageIntro } from '@/components/accueil/PageIntro'
import { OffersStack } from '@/components/accueil/OffersStack'
import { CaseStudies } from '@/components/accueil/CaseStudies'
import { ClosingMagnet } from '@/components/accueil/ClosingMagnet'

export const metadata: Metadata = pageMeta({
  title: 'Services et réalisations',
  description:
    'Création de sites vitrine et e-commerce sur mesure, refonte, référencement naturel et audit SEO. Découvrez les sites réalisés pour des artisans et commerces de la Drôme.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Services & Réalisations"
        title="Des sites qui vous ressemblent"
        subtitle="Pensés pour votre activité, livrés clés en main."
        text="Site vitrine, boutique en ligne, refonte ou référencement : chaque projet est conçu sur mesure, jamais à partir d’un modèle."
        next="#offres"
      />
      <OffersStack />
      <CaseStudies />
      <ClosingMagnet title="Le prochain, c’est le vôtre" line="Un appel de 15 minutes pour parler de votre projet. Gratuit, sans engagement." />
    </>
  )
}

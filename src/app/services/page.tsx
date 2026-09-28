import type { Metadata } from 'next'
import { PageIntro } from '@/components/accueil/PageIntro'
import { OffersStack } from '@/components/accueil/OffersStack'
import { Track } from '@/components/accueil/Track'
import { ProcessLine } from '@/components/accueil/ProcessLine'
import { FinalCallout } from '@/components/accueil/FinalCallout'

export const metadata: Metadata = {
  title: 'Services & Réalisations | Roman Tabardel',
  description:
    'Création de sites web sur mesure, refonte, SEO et audit, découvrez nos réalisations.',
}

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
      <Track />
      <ProcessLine />
      <FinalCallout />
    </>
  )
}

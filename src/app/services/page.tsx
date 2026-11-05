import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { PageIntro } from '@/components/accueil/PageIntro'
import { OffersStack } from '@/components/accueil/OffersStack'
import { OFFRES } from '@/lib/offres'
import { REALISATIONS } from '@/lib/realisations'
import { LiensPages, RealisationsGrid } from '@/components/pages/Blocks'
import { ClosingMagnet } from '@/components/accueil/ClosingMagnet'

export const metadata: Metadata = pageMeta({
  title: 'Services : sites vitrine, boutiques en ligne, référencement',
  description:
    'Création de sites vitrine et e-commerce sur mesure, refonte, référencement naturel et audit SEO pour les artisans et commerces de la Drôme.',
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
      <LiensPages title="Chaque service en détail" liens={OFFRES.map(o => ({ href: `/services/${o.slug}`, label: o.nom }))} />
      <RealisationsGrid items={REALISATIONS} title={<>Mes réalisations<br /><span className="acc-outline">en vrai</span></>} />
      <ClosingMagnet title="Le prochain, c’est le vôtre" line="Un appel de 15 minutes pour parler de votre projet. Gratuit, sans engagement." />
    </>
  )
}

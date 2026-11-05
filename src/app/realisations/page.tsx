import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { REALISATIONS } from '@/lib/realisations'
import { PageIntro } from '@/components/accueil/PageIntro'
import { CaseStudies } from '@/components/accueil/CaseStudies'
import { ClosingMagnet } from '@/components/accueil/ClosingMagnet'
import { JsonLd, RealisationCard, Section, breadcrumbLd } from '@/components/pages/Blocks'
import { Reveal } from '@/components/accueil/Reveal'

export const metadata: Metadata = pageMeta({
  title: 'Réalisations : sites créés pour des artisans et commerces',
  description:
    'Découvrez les sites que j’ai créés pour des entreprises de la Drôme : site de commande en ligne pour Sultan Kebab à Crest, site vitrine pour JR Maçonnerie à Allex.',
  path: '/realisations',
})

export default function RealisationsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Réalisations', path: '/realisations' }])} />
      <PageIntro
        eyebrow="Réalisations"
        title="Des sites en ligne, pour de vrai"
        subtitle="Des entreprises d’ici, des résultats concrets."
        text="Chaque projet part d’un besoin réel. Voici ce que j’ai construit, et comment."
        next="#projets"
      />
      <Section id="projets">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {REALISATIONS.map((r, i) => <Reveal key={r.slug} delay={i * 0.08} className="h-full"><RealisationCard r={r} /></Reveal>)}
        </div>
      </Section>
      <CaseStudies />
      <ClosingMagnet title="Le prochain, c’est le vôtre" line="Un appel de 15 minutes pour parler de votre projet. Gratuit, sans engagement." />
    </>
  )
}

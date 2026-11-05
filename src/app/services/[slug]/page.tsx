import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { pageMeta, SITE_URL } from '@/lib/seo'
import { OFFRES, offre } from '@/lib/offres'
import { REALISATIONS } from '@/lib/realisations'
import { VILLES } from '@/lib/villes'
import { PageIntro } from '@/components/accueil/PageIntro'
import { ClosingMagnet } from '@/components/accueil/ClosingMagnet'
import { FaqBlock } from '@/components/pages/FaqBlock'
import { Etapes, Inclus, IntroPourQui, JsonLd, LiensPages, RealisationsGrid, breadcrumbLd, faqLd } from '@/components/pages/Blocks'

export const dynamicParams = false
export const generateStaticParams = () => OFFRES.map(o => ({ slug: o.slug }))

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const o = offre((await params).slug)
  if (!o) return {}
  return pageMeta({ title: o.seoTitre, description: o.seoDescription, path: `/services/${o.slug}` })
}

export default async function OffrePage({ params }: { params: Promise<{ slug: string }> }) {
  const o = offre((await params).slug)
  if (!o) notFound()
  const path = `/services/${o.slug}`
  const projets = REALISATIONS.filter(r => o.realisations.includes(r.slug))
  const autres = OFFRES.filter(x => x.slug !== o.slug)

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: o.nom,
        serviceType: o.nom,
        description: o.seoDescription,
        url: `${SITE_URL}${path}`,
        provider: { '@id': `${SITE_URL}/#entreprise` },
        areaServed: [{ '@type': 'AdministrativeArea', name: 'Drôme' }, { '@type': 'Country', name: 'France' }],
      }} />
      <JsonLd data={faqLd(o.faq)} />
      <JsonLd data={breadcrumbLd([{ name: 'Services', path: '/services' }, { name: o.nom, path }])} />

      <PageIntro eyebrow={o.eyebrow} title={o.titre} subtitle={o.accroche} next="#detail" />
      <IntroPourQui id="detail" intro={o.intro} pourQui={o.pourQui} />
      <Inclus items={o.inclus} />
      <Etapes items={o.etapes} />
      <RealisationsGrid items={projets} title={<>Déjà fait<br /><span className="acc-outline">pour eux</span></>} />
      <FaqBlock items={o.faq} />
      <LiensPages title="Mes autres services" liens={autres.map(x => ({ href: `/services/${x.slug}`, label: x.nom }))} />
      <LiensPages title="Près de chez vous" liens={VILLES.map(v => ({ href: `/creation-site-internet/${v.slug}`, label: `Création de site internet ${v.dans}` }))} />
      <ClosingMagnet title="On en parle ?" line="Un appel de 15 minutes pour parler de votre projet. Gratuit, sans engagement." />
    </>
  )
}

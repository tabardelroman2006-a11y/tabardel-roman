import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { pageMeta, SITE_URL } from '@/lib/seo'
import { VILLES, ville } from '@/lib/villes'
import { OFFRES } from '@/lib/offres'
import { REALISATIONS } from '@/lib/realisations'
import { PageIntro } from '@/components/accueil/PageIntro'
import { ClosingMagnet } from '@/components/accueil/ClosingMagnet'
import { FaqBlock } from '@/components/pages/FaqBlock'
import { Inclus, IntroPourQui, JsonLd, LiensPages, RealisationsGrid, breadcrumbLd, faqLd } from '@/components/pages/Blocks'

export const dynamicParams = false
export const generateStaticParams = () => VILLES.map(v => ({ ville: v.slug }))

export async function generateMetadata({ params }: { params: Promise<{ ville: string }> }): Promise<Metadata> {
  const v = ville((await params).ville)
  if (!v) return {}
  return pageMeta({ title: `Création de site internet ${v.dans}`, description: v.seoDescription, path: `/creation-site-internet/${v.slug}` })
}

export default async function VillePage({ params }: { params: Promise<{ ville: string }> }) {
  const v = ville((await params).ville)
  if (!v) notFound()
  const path = `/creation-site-internet/${v.slug}`
  const projets = v.clients.map(s => REALISATIONS.find(r => r.slug === s)).filter(r => r !== undefined)
  const autres = VILLES.filter(x => x.slug !== v.slug)

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `Création de site internet ${v.dans}`,
        serviceType: 'Création de site internet',
        url: `${SITE_URL}${path}`,
        provider: { '@id': `${SITE_URL}/#entreprise` },
        areaServed: { '@type': 'City', name: v.nom },
      }} />
      <JsonLd data={faqLd(v.faq)} />
      <JsonLd data={breadcrumbLd([{ name: `Création de site internet ${v.dans}`, path }])} />

      <PageIntro eyebrow={`Création de site internet · ${v.nom}`} title={`Votre site internet ${v.dans}`} subtitle={v.accroche} next="#detail" />
      <IntroPourQui id="detail" intro={v.intro} pourQui={[v.local]} label="Près de chez vous" />
      <Inclus
        title={<>Ce que je fais<br /><span className="acc-outline">pour vous</span></>}
        items={OFFRES.map(o => ({ titre: o.nom, texte: o.accroche }))}
      />
      <LiensPages title="Le détail de chaque service" liens={OFFRES.map(o => ({ href: `/services/${o.slug}`, label: o.nom }))} />
      <RealisationsGrid items={projets} title={<>Des projets<br /><span className="acc-outline">près de chez vous</span></>} />
      <FaqBlock items={v.faq} />
      <LiensPages title="Ailleurs dans la Drôme" liens={autres.map(x => ({ href: `/creation-site-internet/${x.slug}`, label: `Création de site internet ${x.dans}` }))} />
      <ClosingMagnet title="On en parle ?" line="Un appel de 15 minutes pour parler de votre projet. Gratuit, sans engagement." />
    </>
  )
}

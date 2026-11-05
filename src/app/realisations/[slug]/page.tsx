import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowUpRight, Check } from 'lucide-react'
import { pageMeta, SITE_URL } from '@/lib/seo'
import { REALISATIONS, realisation } from '@/lib/realisations'
import { OFFRES } from '@/lib/offres'
import { PageIntro } from '@/components/accueil/PageIntro'
import { ClosingMagnet } from '@/components/accueil/ClosingMagnet'
import { Reveal } from '@/components/accueil/Reveal'
import { DISPLAY_FONT } from '@/components/accueil/anim'
import { Eyebrow, JsonLd, LiensPages, RealisationsGrid, Section, breadcrumbLd } from '@/components/pages/Blocks'

export const dynamicParams = false
export const generateStaticParams = () => REALISATIONS.map(r => ({ slug: r.slug }))

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const r = realisation((await params).slug)
  if (!r) return {}
  return pageMeta({
    title: `${r.nom} : ${r.categorie.toLowerCase()} à ${r.ville}`,
    description: `${r.resume} Projet réalisé par Roman Tabardel, créateur de sites web dans la Drôme.`,
    path: `/realisations/${r.slug}`,
  })
}

export default async function RealisationPage({ params }: { params: Promise<{ slug: string }> }) {
  const r = realisation((await params).slug)
  if (!r) notFound()
  const path = `/realisations/${r.slug}`
  const services = OFFRES.filter(o => r.services.includes(o.slug))
  const autres = REALISATIONS.filter(x => x.slug !== r.slug)

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: `Site ${r.nom}`,
        description: r.resume,
        url: `${SITE_URL}${path}`,
        image: `${SITE_URL}${r.desk}`,
        creator: { '@id': `${SITE_URL}/#roman` },
        about: { '@type': 'Organization', name: r.nom, url: r.href },
      }} />
      <JsonLd data={breadcrumbLd([{ name: 'Réalisations', path: '/realisations' }, { name: r.nom, path }])} />

      <PageIntro eyebrow={`${r.categorie} · ${r.ville}`} title={r.nom} subtitle={r.resume} next="#projet" />

      <Section id="projet">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] gap-10 lg:gap-16 items-end">
          <Reveal>
            <div className="acc-browser">
              <div className="acc-browser-bar">
                <span /><span /><span />
                <p className="acc-browser-url">{r.domaine}</p>
              </div>
              <div className="relative overflow-hidden" style={{ aspectRatio: '16 / 10' }}>
                <Image src={r.desk} alt={`${r.nom}, site sur ordinateur`} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover object-top" priority />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mx-auto overflow-hidden" style={{ width: 'min(100%, 260px)', aspectRatio: '9 / 18', borderRadius: 34, border: '8px solid var(--rt-ink)', backgroundColor: 'var(--rt-soft)' }}>
              <Image src={r.phone} alt={`${r.nom}, site sur téléphone`} fill sizes="260px" className="object-cover object-top" />
            </div>
          </Reveal>
        </div>
        <ul className="mt-10 flex flex-wrap gap-2">
          {r.tags.map(t => (
            <li key={t} className="font-body text-xs font-700 px-3 py-1.5" style={{ borderRadius: 999, backgroundColor: '#FFFFFF', color: 'var(--rt-primary)', border: '1px solid var(--rt-line)' }}>{t}</li>
          ))}
        </ul>
      </Section>

      <Section soft>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <Reveal>
            <Eyebrow>Le besoin</Eyebrow>
            <p className="font-body text-lg leading-relaxed" style={{ color: 'var(--rt-ink)' }}>{r.besoin}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <Eyebrow>Ce que j’ai fait</Eyebrow>
            <ul className="space-y-3">
              {r.solution.map(s => (
                <li key={s} className="flex gap-3 font-body text-base leading-relaxed" style={{ color: 'var(--rt-muted)' }}>
                  <Check size={18} className="shrink-0 mt-1" style={{ color: 'var(--rt-primary)' }} />{s}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.16}>
            <Eyebrow>Le résultat</Eyebrow>
            <p className="font-body text-lg leading-relaxed" style={{ color: 'var(--rt-ink)' }}>{r.resultat}</p>
            <a href={r.href} target="_blank" rel="noopener noreferrer" className="acc-btn acc-btn-solid mt-8">
              Voir le site en ligne <ArrowUpRight size={15} />
            </a>
          </Reveal>
        </div>
      </Section>

      <LiensPages title="Les services utilisés" liens={services.map(o => ({ href: `/services/${o.slug}`, label: o.nom }))} />
      <RealisationsGrid items={autres} title={<span style={{ ...DISPLAY_FONT }}>Un autre<br /><span className="acc-outline">projet</span></span>} />
      <ClosingMagnet title="Le prochain, c’est le vôtre" line="Un appel de 15 minutes pour parler de votre projet. Gratuit, sans engagement." />
    </>
  )
}

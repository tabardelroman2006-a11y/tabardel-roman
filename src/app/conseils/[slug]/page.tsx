import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { pageMeta, SITE_URL, OG_IMAGE } from '@/lib/seo'
import { CONSEILS, conseil, dateFr } from '@/lib/conseils'
import { OFFRES } from '@/lib/offres'
import { ClosingMagnet } from '@/components/accueil/ClosingMagnet'
import { DISPLAY_FONT } from '@/components/accueil/anim'
import { JsonLd, LiensPages, breadcrumbLd } from '@/components/pages/Blocks'

export const dynamicParams = false
export const generateStaticParams = () => CONSEILS.map(c => ({ slug: c.slug }))

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = conseil((await params).slug)
  if (!c) return {}
  const meta = pageMeta({ title: c.seoTitre, description: c.description, path: `/conseils/${c.slug}` })
  return { ...meta, openGraph: { ...meta.openGraph, type: 'article', publishedTime: c.date, authors: ['Roman Tabardel'] } }
}

export default async function ConseilPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = conseil((await params).slug)
  if (!c) notFound()
  const path = `/conseils/${c.slug}`
  const services = OFFRES.filter(o => c.services.includes(o.slug))
  const autres = CONSEILS.filter(x => x.slug !== c.slug)

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: c.titre,
        description: c.description,
        datePublished: c.date,
        dateModified: c.date,
        inLanguage: 'fr-FR',
        mainEntityOfPage: `${SITE_URL}${path}`,
        image: `${SITE_URL}${OG_IMAGE.url}`,
        author: { '@id': `${SITE_URL}/#roman` },
        publisher: { '@id': `${SITE_URL}/#entreprise` },
      }} />
      <JsonLd data={breadcrumbLd([{ name: 'Conseils', path: '/conseils' }, { name: c.titre, path }])} />

      <article className="px-5 md:px-12 lg:px-20 pt-32 md:pt-40 pb-20" style={{ backgroundColor: 'var(--rt-bg)' }}>
        <div className="max-w-3xl mx-auto">
          <Link href="/conseils" className="inline-flex items-center gap-2 font-body text-sm font-700 uppercase tracking-wider" style={{ color: 'var(--rt-muted)' }}>
            <ArrowLeft size={15} /> Tous les conseils
          </Link>
          <p className="mt-10 font-body text-[11px] font-700 tracking-[0.25em] uppercase" style={{ color: 'var(--rt-muted)' }}>
            {dateFr(c.date)} · {c.lecture} de lecture · Roman Tabardel
          </p>
          <h1 className="mt-4 uppercase" style={{ ...DISPLAY_FONT, color: 'var(--rt-primary)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.03em', fontSize: 'clamp(2.3rem, 5.4vw, 4.4rem)' }}>{c.titre}</h1>
          <p className="mt-8 font-body leading-relaxed" style={{ color: 'var(--rt-ink)', fontSize: 'clamp(1.15rem, 1.7vw, 1.35rem)' }}>{c.chapo}</p>

          <div className="pg-prose mt-10">
            {c.contenu.map((b, i) => {
              if (b.type === 'h2') return <h2 key={i}>{b.texte}</h2>
              if (b.type === 'liste') return <ul key={i}>{b.items.map(it => <li key={it}>{it}</li>)}</ul>
              return <p key={i}>{b.texte}</p>
            })}
          </div>

          <div className="mt-14 p-7 md:p-9" style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid var(--rt-line)' }}>
            <p className="font-body text-[11px] font-700 tracking-[0.25em] uppercase" style={{ color: 'var(--rt-muted)' }}>Besoin d’un coup de main ?</p>
            <p className="mt-3 font-body text-lg leading-relaxed" style={{ color: 'var(--rt-ink)' }}>Je m’occupe de tout cela pour les artisans et les petites entreprises de la Drôme et d’ailleurs.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {services.map(o => (
                <Link key={o.slug} href={`/services/${o.slug}`} className="acc-btn acc-btn-ghost">{o.nom} <ArrowUpRight size={15} /></Link>
              ))}
            </div>
          </div>
        </div>
      </article>

      <LiensPages title="À lire aussi" liens={autres.map(x => ({ href: `/conseils/${x.slug}`, label: x.titre }))} />
      <ClosingMagnet title="Une question sur votre site ?" line="Un appel de 15 minutes pour en parler. Gratuit, sans engagement." />
    </>
  )
}

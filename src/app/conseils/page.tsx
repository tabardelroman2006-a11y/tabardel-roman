import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { pageMeta } from '@/lib/seo'
import { CONSEILS, dateFr } from '@/lib/conseils'
import { PageIntro } from '@/components/accueil/PageIntro'
import { ClosingMagnet } from '@/components/accueil/ClosingMagnet'
import { Reveal } from '@/components/accueil/Reveal'
import { DISPLAY_FONT } from '@/components/accueil/anim'
import { JsonLd, Section, breadcrumbLd } from '@/components/pages/Blocks'

export const metadata: Metadata = pageMeta({
  title: 'Conseils : site internet et Google pour artisans',
  description:
    'Conseils simples et concrets pour les artisans et TPE : fiche Google, référencement, site internet ou réseaux sociaux. Par Roman Tabardel, créateur de sites dans la Drôme.',
  path: '/conseils',
})

export default function ConseilsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Conseils', path: '/conseils' }])} />
      <PageIntro
        eyebrow="Conseils"
        title="Être trouvé, être choisi"
        subtitle="Des conseils simples, sans jargon."
        text="Ce que je réponds le plus souvent aux artisans et aux petites entreprises sur leur site et sur Google."
        next="#articles"
      />
      <Section id="articles">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CONSEILS.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.08} className="h-full">
              <Link href={`/conseils/${c.slug}`} className="pg-card group flex flex-col h-full p-7 md:p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid var(--rt-line)' }}>
                <p className="font-body text-[11px] font-700 tracking-[0.25em] uppercase" style={{ color: 'var(--rt-muted)' }}>
                  {dateFr(c.date)} · {c.lecture}
                </p>
                <h2 className="mt-4 uppercase" style={{ ...DISPLAY_FONT, fontWeight: 700, color: 'var(--rt-primary)', fontSize: 'clamp(1.5rem, 2.2vw, 2rem)', lineHeight: 0.98, letterSpacing: '-0.02em' }}>{c.titre}</h2>
                <p className="mt-4 font-body text-base leading-relaxed flex-1" style={{ color: 'var(--rt-muted)' }}>{c.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-body text-sm font-700 uppercase tracking-wider" style={{ color: 'var(--rt-primary)' }}>
                  Lire le conseil <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <ClosingMagnet title="Une question sur votre site ?" line="Un appel de 15 minutes pour en parler. Gratuit, sans engagement." />
    </>
  )
}

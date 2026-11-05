import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Check } from 'lucide-react'
import { Reveal } from '@/components/accueil/Reveal'
import { DISPLAY_FONT } from '@/components/accueil/anim'
import type { Realisation } from '@/lib/realisations'
import { SITE_URL } from '@/lib/seo'

/* Blocs communs aux pages services, realisations et villes. */

const H2 = { ...DISPLAY_FONT, color: 'var(--rt-primary)', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.03em', fontSize: 'clamp(2.2rem, 4.6vw, 4.4rem)' } as const

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-body text-[11px] font-700 tracking-[0.3em] uppercase mb-5" style={{ color: 'var(--rt-muted)' }}>{children}</p>
}

export function Section({ id, soft, children }: { id?: string; soft?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className="px-5 md:px-12 lg:px-20 py-20 md:py-28" style={{ backgroundColor: soft ? 'var(--rt-soft)' : 'var(--rt-bg)' }}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}

/* Texte d'intro a gauche, liste « pour qui » a droite. */
export function IntroPourQui({ id, intro, pourQui, label = 'Pour qui ?' }: { id: string; intro: string; pourQui: string[]; label?: string }) {
  return (
    <Section id={id}>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-12 lg:gap-24 items-start">
        <Reveal>
          <p className="font-body leading-relaxed" style={{ color: 'var(--rt-ink)', fontSize: 'clamp(1.2rem, 1.9vw, 1.6rem)' }}>{intro}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <Eyebrow>{label}</Eyebrow>
          <ul className="space-y-4">
            {pourQui.map(p => (
              <li key={p} className="flex gap-3 font-body text-base leading-relaxed" style={{ color: 'var(--rt-muted)' }}>
                <Check size={18} className="shrink-0 mt-1" style={{ color: 'var(--rt-primary)' }} />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}

export function Inclus({ items, title = <>Ce qui est<br /><span className="acc-outline">compris</span></> }: { items: { titre: string; texte: string }[]; title?: React.ReactNode }) {
  return (
    <Section soft>
      <Reveal className="mb-12 md:mb-16">
        <h2 className="uppercase" style={H2}>{title}</h2>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {items.map((it, i) => (
          <Reveal key={it.titre} delay={(i % 3) * 0.06}>
            <div className="h-full p-7 md:p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: 18, border: '1px solid var(--rt-line)' }}>
              <p style={{ ...DISPLAY_FONT, fontWeight: 700, color: 'var(--rt-line)', fontSize: '2.2rem', lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 font-display font-700 text-xl" style={{ color: 'var(--rt-primary)' }}>{it.titre}</h3>
              <p className="mt-2 font-body text-base leading-relaxed" style={{ color: 'var(--rt-muted)' }}>{it.texte}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export function Etapes({ items }: { items: { titre: string; texte: string }[] }) {
  return (
    <Section>
      <Reveal className="mb-12 md:mb-16">
        <h2 className="uppercase" style={H2}>Comment<br /><span className="acc-outline">ça se passe</span></h2>
      </Reveal>
      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {items.map((e, i) => (
          <Reveal key={e.titre} delay={i * 0.08}>
            <li className="pt-6" style={{ borderTop: '2px solid var(--rt-primary)' }}>
              <p className="font-body text-[11px] font-700 tracking-[0.25em] uppercase" style={{ color: 'var(--rt-muted)' }}>Étape {i + 1}</p>
              <h3 className="mt-3 font-display font-700 text-xl" style={{ color: 'var(--rt-primary)' }}>{e.titre}</h3>
              <p className="mt-2 font-body text-base leading-relaxed" style={{ color: 'var(--rt-muted)' }}>{e.texte}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}

export function RealisationCard({ r }: { r: Realisation }) {
  return (
    <Link href={`/realisations/${r.slug}`} className="pg-card group block h-full overflow-hidden" style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid var(--rt-line)' }}>
      <div className="relative overflow-hidden" style={{ aspectRatio: '16 / 10', backgroundColor: 'var(--rt-soft)' }}>
        <Image src={r.desk} alt={`${r.nom}, page d’accueil du site`} fill sizes="(max-width: 768px) 100vw, 50vw" className="pg-card-img object-cover object-top" />
      </div>
      <div className="p-7 md:p-8">
        <p className="font-body text-[11px] font-700 tracking-[0.25em] uppercase" style={{ color: 'var(--rt-muted)' }}>{r.categorie} · {r.ville}</p>
        <h3 className="mt-3 uppercase" style={{ ...DISPLAY_FONT, fontWeight: 700, color: 'var(--rt-primary)', fontSize: 'clamp(1.6rem, 2.6vw, 2.3rem)', lineHeight: 0.95 }}>{r.nom}</h3>
        <p className="mt-3 font-body text-base leading-relaxed" style={{ color: 'var(--rt-muted)' }}>{r.resume}</p>
        <span className="mt-5 inline-flex items-center gap-2 font-body text-sm font-700 uppercase tracking-wider" style={{ color: 'var(--rt-primary)' }}>
          Voir le projet <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}

export function RealisationsGrid({ items, title }: { items: Realisation[]; title: React.ReactNode }) {
  if (items.length === 0) return null
  return (
    <Section soft>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
        <Reveal><h2 className="uppercase" style={H2}>{title}</h2></Reveal>
        <Link href="/realisations" className="acc-btn acc-btn-ghost self-start md:self-auto">Toutes les réalisations <ArrowUpRight size={15} /></Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((r, i) => <Reveal key={r.slug} delay={i * 0.08} className="h-full"><RealisationCard r={r} /></Reveal>)}
      </div>
    </Section>
  )
}

/* Liens vers d'autres pages (maillage interne). */
export function LiensPages({ title, liens }: { title: string; liens: { href: string; label: string }[] }) {
  return (
    <Section>
      <Eyebrow>{title}</Eyebrow>
      <div className="flex flex-wrap gap-3">
        {liens.map(l => (
          <Link key={l.href} href={l.href} className="acc-btn acc-btn-ghost">{l.label} <ArrowUpRight size={15} /></Link>
        ))}
      </div>
    </Section>
  )
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

export const faqLd = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
})

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Accueil', path: '/' }, ...items].map((it, i) => ({
    '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE_URL}${it.path === '/' ? '' : it.path}`,
  })),
})

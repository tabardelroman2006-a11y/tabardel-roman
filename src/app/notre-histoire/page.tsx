import type { Metadata } from 'next'
import { PortraitImage } from '@/components/sections/PortraitImage'

export const metadata: Metadata = {
  title: 'À propos | Roman Tabardel',
  description: "Découvrez qui est Roman Tabardel, créateur de sites web indépendant basé en Drôme.",
}

export default function NotreHistoirePage() {
  return (
    <div className="min-h-screen pt-24 pb-24 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#F4F4F4' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          <div><PortraitImage /></div>

          <div className="lg:pt-8">
            <p className="font-body text-xs tracking-[0.25em] uppercase mb-4" style={{ color: 'var(--rt-primary)' }}>
              Fondateur · Créateur de sites web
            </p>
            <h1 className="font-display font-800 leading-tight mb-10"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#1A1A1A' }}>
              Roman Tabardel
            </h1>

            <div className="space-y-6 font-body text-base leading-relaxed" style={{ color: '#6B6B6B' }}>
              <p>
                Je m’appelle Roman Tabardel, j’ai 20 ans et je suis créateur de sites web indépendant.
              </p>
              <p>
                J’ai créé ma micro-entreprise avec une idée simple : permettre aux entreprises de mettre
                en valeur leur savoir-faire et de présenter leur activité de la meilleure manière sur internet.
              </p>
              <p>
                Ce que j’aime particulièrement dans mon métier, ce sont les relations humaines. Prendre
                le temps d’échanger, rencontrer les personnes avec qui je travaille, découvrir leur
                activité et comprendre réellement ce dont elles ont besoin, c’est ce qui me plaît le
                plus dans chaque projet.
              </p>
              <p>
                Je ne cherche pas à proposer une solution toute faite. Chaque entreprise a ses propres
                besoins, ses propres objectifs et sa propre façon de travailler. C’est pourquoi je prends
                le temps de comprendre votre activité avant de réfléchir à la manière de la mettre en
                avant sur le web.
              </p>
              <p>
                À travers mes sites, mon objectif est de créer quelque chose de professionnel, moderne
                et fidèle à votre entreprise, tout en restant simple et efficace pour vos clients.
              </p>
              <p>
                Écouter, comprendre, créer et accompagner : c’est cette approche qui me motive dans mon métier.
              </p>
            </div>

            <blockquote className="mt-12 pl-6" style={{ borderLeft: '3px solid var(--rt-primary)' }}>
              <p className="font-display font-600 italic leading-relaxed"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', color: '#1A1A1A' }}>
                &ldquo;Je crois que chaque entreprise, quelle que soit sa taille,
                mérite un site à la hauteur de ses ambitions.&rdquo;
              </p>
              <footer className="mt-3 font-body text-sm" style={{ color: '#888888' }}>
                Roman Tabardel
              </footer>
            </blockquote>

            <div className="mt-12 flex flex-wrap gap-4">
              <a href="/contact"
                className="font-body font-700 text-sm px-8 py-4 transition-opacity duration-200 hover:opacity-80"
                style={{ backgroundColor: 'var(--rt-primary)', color: '#FFFFFF' }}>
                Me contacter
              </a>
              <a href="/services" className="btn-ghost font-body font-600 text-sm px-8 py-4">
                Voir mes réalisations
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

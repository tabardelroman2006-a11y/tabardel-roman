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
                Passionné par le web depuis ses débuts, Roman a développé une expertise solide
                en création de sites et en référencement naturel, nourrie par des années de
                pratique, d'apprentissage en autonomie et de projets concrets pour de vraies entreprises.
              </p>
              <p>
                Basé en Drôme (26), il accompagne des artisans, TPE et PME partout en France
                dans leur développement en ligne. Son objectif : leur offrir un niveau de qualité
                numérique premium, habituellement réservé aux grandes entreprises, à des tarifs
                adaptés à la réalité des indépendants et des petites structures.
              </p>
              <p>
                Chaque projet est pensé sur mesure. Il n'y a pas de template, pas de copier-coller :
                un site réussi raconte une histoire unique, celle de votre entreprise, et la raconte
                bien aux bonnes personnes.
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

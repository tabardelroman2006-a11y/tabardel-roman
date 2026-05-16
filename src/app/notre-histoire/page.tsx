import type { Metadata } from 'next'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { TextReveal } from '@/components/effects/TextReveal'
import { PortraitImage } from '@/components/sections/PortraitImage'

export const metadata: Metadata = {
  title: 'Notre Histoire',
  description:
    "Découvrez l'histoire de Roman Tabardel, fondateur et créateur de sites web passionné.",
}

export default function NotreHistoirePage() {
  return (
    <div className="bg-cream-50 min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <ScrollReveal variant="slideLeft">
            <PortraitImage />
          </ScrollReveal>

          <div className="lg:pt-8">
            <TextReveal
              text="Roman Tabardel"
              as="h1"
              className="mb-3"
              delay={0.1}
            />
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="text-muted text-sm uppercase tracking-widest mb-10">
                Fondateur · Créateur de sites web
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.3}>
              <div className="space-y-6 text-charcoal leading-relaxed">
                <p>
                  Étudiant en Bachelor Gestionnaire Administration des Ventes, Roman a
                  très tôt développé une passion profonde pour la création de sites web.
                  Ce qui a commencé comme une curiosité s'est transformé en véritable
                  expertise, nourrie par des années de pratique et d'apprentissage en
                  autonomie.
                </p>
                <p>
                  Animé par un projet de vie hors du commun — partir vivre et voyager
                  au Pérou pendant un an — Roman a choisi de conjuguer ambition
                  personnelle et indépendance professionnelle. Cette soif de liberté
                  l'a naturellement conduit à créer sa micro-entreprise, pour exercer
                  son métier où qu'il se trouve dans le monde.
                </p>
                <p>
                  Sa mission est claire : rendre accessible un niveau de qualité
                  digitale premium aux TPE, PME, artisans et entrepreneurs qui méritent
                  bien mieux que les templates génériques. Chaque site qu'il conçoit
                  est pensé sur mesure, pour refléter l'identité unique de chaque
                  client et générer de vrais résultats.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.5}>
              <blockquote className="mt-10 pl-6 border-l-2 border-stone-300">
                <p
                  className="text-charcoal italic leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                  }}
                >
                  &ldquo;Je crois que chaque entreprise, quelle que soit sa taille,
                  mérite un site à la hauteur de ses ambitions.&rdquo;
                </p>
                <footer className="mt-3 text-sm text-muted">— Roman Tabardel</footer>
              </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  )
}

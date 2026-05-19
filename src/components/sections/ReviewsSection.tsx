'use client'

import { Star } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { PenDecoration } from '@/components/decorations/PenDecoration'

const REVIEWS = [
  {
    name: 'Thomas Girard',
    company: 'Le Bistrot du Marché',
    role: 'Gérant de restaurant',
    text: "Roman a totalement transformé notre présence en ligne. Les réservations en ligne ont augmenté de 40% le premier mois. Un professionnel à l'écoute, réactif et d'une précision remarquable.",
    stars: 5,
  },
  {
    name: 'Éric Fontaine',
    company: 'Fontaine Plomberie & Chauffage',
    role: 'Artisan plombier',
    text: "Enfin un site qui me ressemble vraiment. Roman a su capturer l'essence de mon métier. Mes clients me disent que c'est professionnel, et j'ai eu 3 nouveaux clients grâce au référencement en 2 semaines.",
    stars: 5,
  },
  {
    name: 'Léa Moreau',
    company: 'Studio Léa Coiffure',
    role: 'Coiffeuse indépendante',
    text: "Je n'y connaissais rien en création de site, mais Roman m'a guidée à chaque étape. Le résultat est magnifique, élégant, et mes clientes adorent prendre rendez-vous en ligne maintenant.",
    stars: 5,
  },
  {
    name: 'Sophie & Marc Chevallier',
    company: 'Menuiserie Chevallier',
    role: 'PME artisanale',
    text: "Nous avions un vieux site daté depuis 10 ans. Roman l'a entièrement refondu. Professionnalisme exemplaire, délais respectés, et un référencement qui commence déjà à porter ses fruits.",
    stars: 5,
  },
  {
    name: 'Julien Perrot',
    company: 'Perrot Shop',
    role: 'Entrepreneur e-commerce',
    text: "Roman m'a créé une boutique en ligne performante et optimisée SEO. Ses conseils en référencement naturel sont concrets et efficaces. Je recommande à 100% pour toute entreprise sérieuse.",
    stars: 5,
  },
]

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} className="fill-[#1A1A1A] text-[#1A1A1A]" />
      ))}
    </div>
  )
}

export function ReviewsSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-16">
            <p className="font-inter text-xs tracking-[0.25em] text-[#6B6B6B] uppercase mb-4">
              Témoignages
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl text-[#1A1A1A]">
              Ce qu&apos;ils disent
            </h2>
          </div>
        </ScrollReveal>

        <div className="flex items-start gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
            {REVIEWS.map((review, i) => (
              <ScrollReveal key={review.name} delay={i * 0.1}>
                <div
                  className="bg-white border border-[#E8E4DE] p-8 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                  data-cursor-hover
                >
                  <StarRating count={review.stars} />
                  <p className="font-inter text-sm text-[#1A1A1A] leading-relaxed my-6 flex-1">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="border-t border-[#E8E4DE] pt-4">
                    <p className="font-playfair text-sm font-medium text-[#1A1A1A]">{review.name}</p>
                    <p className="font-inter text-xs text-[#6B6B6B] mt-0.5">{review.company}</p>
                    <p className="font-inter text-xs text-[#B0ABAA] mt-0.5 italic">{review.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Pen decoration — right of reviews */}
          <PenDecoration className="flex-shrink-0 self-center opacity-55 hover:opacity-100 transition-opacity duration-500 ml-4" />
        </div>
      </div>
    </section>
  )
}

'use client'

import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const ATELIER_ITEMS = ['Design sur mesure', 'SEO efficace', 'Responsive mobile', 'Suivi & support']

export function AtelierSection() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">

          {/* Text left */}
          <ScrollReveal direction="left">
            <div className="space-y-6 py-12 pr-0 lg:pr-16">
              <p className="font-inter text-xs tracking-[0.25em] text-[#6B6B6B] uppercase">
                L'atelier numérique
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl text-[#1A1A1A] leading-tight">
                Précision, rigueur<br />
                <em className="italic text-[#6B6B6B]">et passion.</em>
              </h2>
              <p className="font-inter text-base text-[#6B6B6B] leading-relaxed max-w-md">
                Derrière chaque site, des heures de travail minutieux. De la conception à la
                mise en ligne, chaque détail compte pour offrir une expérience utilisateur
                irréprochable et un référencement naturel efficace.
              </p>
              <div className="pt-4 flex flex-wrap gap-x-8 gap-y-2">
                {ATELIER_ITEMS.map((item) => (
                  <p key={item} className="font-playfair italic text-[#6B6B6B] text-base">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Image right — full height vertical */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="h-full min-h-[400px] overflow-hidden">
              <Image
                src="/images/bg-photo.jpg"
                alt="Setup de travail professionnel"
                width={800}
                height={500}
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-[1800ms] ease-out"
                style={{ minHeight: 400 }}
                loading="lazy"
              />
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}

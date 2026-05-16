import type { Metadata } from 'next'
import Image from 'next/image'
import { Hero } from '@/components/sections/Hero'
import { MessageSection } from '@/components/sections/MessageSection'
import { ClientsSection } from '@/components/sections/ClientsSection'
import { ReviewsSection } from '@/components/sections/ReviewsSection'

export const metadata: Metadata = {
  title: 'Roman Tabardel — Création de sites web & SEO',
  description:
    'Agence web premium pour TPE, PME, artisans et entrepreneurs. Création de sites vitrine, e-commerce et référencement naturel.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <MessageSection />

      {/* Carré image Pinterest */}
      <div className="flex justify-center py-16">
        <div
          className="rounded-2xl overflow-hidden shadow-xl"
          style={{ width: 280, height: 280, position: 'relative' }}
        >
          <Image
            src="https://i1-c.pinimg.com/1200x/cd/d2/2a/cdd22ad2fb41eeb8a1c27946b76e5027.jpg"
            alt="Inspiration"
            fill
            className="object-cover"
            sizes="280px"
          />
        </div>
      </div>

      <ClientsSection />
      <ReviewsSection />
    </>
  )
}

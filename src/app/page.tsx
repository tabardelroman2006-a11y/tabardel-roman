import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/ui/Marquee'
import { MessageSection } from '@/components/sections/MessageSection'
import { ClientsSection } from '@/components/sections/ClientsSection'
import { Portfolio } from '@/components/sections/Portfolio'
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
      <Marquee />
      <MessageSection />
      <ClientsSection />
      <Portfolio />
      <ReviewsSection />
    </>
  )
}

import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { MessageSection } from '@/components/sections/MessageSection'
import { AtelierSection } from '@/components/sections/AtelierSection'
import { CityShowcase } from '@/components/sections/CityShowcase'
import { CTAFinal } from '@/components/sections/CTAFinal'

export const metadata: Metadata = {
  title: 'Roman Tabardel — Création de sites web & SEO',
  description:
    'Agence web premium pour TPE, PME, artisans et entrepreneurs. Création de sites vitrine, e-commerce et référencement naturel.',
}

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="section-divider mx-6 md:mx-12 lg:mx-20" />

      <MessageSection />

      <div className="section-divider mx-6 md:mx-12 lg:mx-20" />

      <AtelierSection />

      <CityShowcase />

      <CTAFinal />
    </>
  )
}

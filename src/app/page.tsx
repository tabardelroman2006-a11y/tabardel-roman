import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import { readGoogleCode } from '@/lib/google-verification'
import { Preloader } from '@/components/accueil/Preloader'
import { HeroScan } from '@/components/accueil/HeroScan'
import { Marquee } from '@/components/accueil/Marquee'
import { Manifesto } from '@/components/accueil/Manifesto'
import { Track } from '@/components/accueil/Track'
import { ServicesSplit } from '@/components/accueil/ServicesSplit'
import { ProcessLine } from '@/components/accueil/ProcessLine'
import { AboutFan } from '@/components/accueil/AboutFan'
import { FinalCallout } from '@/components/accueil/FinalCallout'

export async function generateMetadata(): Promise<Metadata> {
  const google = await readGoogleCode()
  return { ...metadata, ...(google ? { verification: { google } } : {}) }
}

const metadata: Metadata = {
  ...pageMeta({
    title: 'Roman Tabardel | Création de sites web & SEO',
    ogTitle: 'Roman Tabardel | Création de sites web & SEO',
    description:
      'Des sites web sur mesure qui convertissent, pour les artisans, TPE et PME. Création de sites vitrine, e-commerce et référencement naturel partout en France.',
    path: '/',
  }),
  title: { absolute: 'Roman Tabardel | Création de sites web & SEO, Drôme' },
}

export default function HomePage() {
  return (
    <>
      <Preloader />
      <HeroScan />
      <Marquee />
      <Manifesto />
      <Track />
      <ServicesSplit />
      <ProcessLine />
      <AboutFan />
      <FinalCallout />
    </>
  )
}

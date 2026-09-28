import type { Metadata } from 'next'
import { PageIntro } from '@/components/accueil/PageIntro'
import { ScanPortrait } from '@/components/accueil/ScanPortrait'
import { StoryText } from '@/components/accueil/StoryText'
import { AboutFan } from '@/components/accueil/AboutFan'
import { Marquee } from '@/components/accueil/Marquee'
import { FinalCallout } from '@/components/accueil/FinalCallout'

export const metadata: Metadata = {
  title: 'À propos | Roman Tabardel',
  description: "Découvrez qui est Roman Tabardel, créateur de sites web indépendant basé en Drôme.",
}

export default function NotreHistoirePage() {
  return (
    <>
      <PageIntro
        eyebrow="À propos · Fondateur"
        title="Roman Tabardel"
        subtitle="Créateur de sites web, dans la Drôme."
        text="Écouter, comprendre, créer et accompagner. Passez la souris sur mon portrait."
        next="#histoire"
        aside={<ScanPortrait priority className="relative mx-auto h-[440px] lg:absolute lg:left-1/2 lg:bottom-[-9svh] lg:-translate-x-1/2 lg:h-[min(78svh,760px)]" />}
      />
      <StoryText />
      <Marquee />
      <AboutFan />
      <FinalCallout />
    </>
  )
}

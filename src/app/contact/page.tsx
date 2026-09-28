import type { Metadata } from 'next'
import { PageIntro } from '@/components/accueil/PageIntro'
import { RevealPhoto } from '@/components/accueil/RevealPhoto'
import { ContactPanel } from '@/components/accueil/ContactPanel'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Roman Tabardel pour votre projet de site web ou de référencement.',
}

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Travaillons ensemble"
        title="Parlons de votre projet"
        subtitle="Une question, une idée ?"
        text="Par téléphone, par e-mail ou avec le formulaire ci-dessous."
        next="#ecrire"
        aside={
          <RevealPhoto
            cutout="/images/accueil/roman-dehors-detoure.webp"
            full="/images/accueil/roman-dehors.jpg"
            alt="Roman Tabardel devant son ordinateur"
            ratio="900 / 1354"
            className="relative h-[480px] lg:absolute lg:inset-x-0 lg:bottom-[-9svh] lg:h-[min(80svh,780px)]"
          />
        }
      />
      <ContactPanel />
    </>
  )
}

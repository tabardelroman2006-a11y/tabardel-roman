import type { Metadata } from 'next'
import { PageIntro } from '@/components/accueil/PageIntro'
import { TiltPhoto } from '@/components/accueil/TiltPhoto'
import { ContactPanel } from '@/components/accueil/ContactPanel'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Roman Tabardel pour votre projet de site web ou de référencement. Réponse garantie sous 24 h.',
}

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Travaillons ensemble"
        title="Parlons de votre projet"
        subtitle="Une question, une idée ?"
        text="Je vous réponds sous 24 h, par téléphone ou par e-mail."
        next="#ecrire"
        aside={
          <TiltPhoto
            src="/images/accueil/roman-dehors.jpg"
            alt="Roman Tabardel devant son ordinateur"
            badge="Réponse sous 24 h"
            className="relative mx-auto h-[460px] lg:h-[min(66svh,640px)] lg:mt-10"
          />
        }
      />
      <ContactPanel />
    </>
  )
}

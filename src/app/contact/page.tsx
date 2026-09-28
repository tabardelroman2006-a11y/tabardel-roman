import type { Metadata } from 'next'
import { PageIntro } from '@/components/accueil/PageIntro'
import { PortraitLine } from '@/components/accueil/PortraitLine'
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
        text="Passez la souris sur mon portrait."
        next="#ecrire"
        aside={
          <PortraitLine
            text="Je vous réponds sous 24 h."
            className="relative mx-auto h-[440px] lg:absolute lg:left-1/2 lg:bottom-[-9svh] lg:-translate-x-1/2 lg:h-[min(78svh,760px)]"
          />
        }
      />
      <ContactPanel />
    </>
  )
}

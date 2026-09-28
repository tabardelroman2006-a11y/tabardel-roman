import type { Metadata } from 'next'
import { PageIntro } from '@/components/accueil/PageIntro'
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
        subtitle="Une question, une idée ? Je réponds sous 24 h."
        next="#ecrire"
      />
      <ContactPanel />
    </>
  )
}

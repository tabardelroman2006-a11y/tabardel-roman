import type { Metadata } from 'next'
import { HomeContact } from '@/components/home/HomeContact'
import { HomeFAQ } from '@/components/home/HomeFAQ'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Roman Tabardel pour votre projet de site web ou de référencement. Réponse garantie sous 24 h.',
}

export default function ContactPage() {
  return (
    <>
      <HomeContact />
      <HomeFAQ />
    </>
  )
}

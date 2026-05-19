import type { Metadata } from 'next'
import { ServicesPageContent } from '@/components/sections/ServicesPageContent'

export const metadata: Metadata = {
  title: 'Services & Réalisations — Roman Tabardel',
  description:
    'Création de sites web sur mesure, refonte, SEO et audit — découvrez nos réalisations.',
}

export default function ServicesPage() {
  return <ServicesPageContent />
}

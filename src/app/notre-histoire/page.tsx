import type { Metadata } from 'next'
import { AboutManifesto } from '@/components/home/AboutManifesto'
import { CTAFinal } from '@/components/sections/CTAFinal'

export const metadata: Metadata = {
  title: 'À propos | Roman Tabardel',
  description: "Découvrez qui est Roman Tabardel, créateur de sites web indépendant basé en Drôme.",
}

export default function NotreHistoirePage() {
  return (
    <>
      <AboutManifesto />
      <CTAFinal />
    </>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { Hero } from '@/components/sections/Hero'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { ReliefExperience } from './ReliefExperience'

/* Frise en relief par defaut. Si le visiteur a demande a limiter les animations,
   ou si son appareil ne sait pas afficher de 3D, on garde l'accueil classique. */
function canShowRelief() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export function HomeRelief() {
  const [classic, setClassic] = useState(false)

  useEffect(() => {
    if (!canShowRelief()) setClassic(true)
  }, [])

  if (classic) {
    return (
      <>
        <Hero />
        <ServicesSection />
        <AboutSection />
        <ProcessSection />
      </>
    )
  }
  return <ReliefExperience />
}

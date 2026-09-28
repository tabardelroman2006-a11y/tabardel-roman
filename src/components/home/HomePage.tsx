'use client'

import { useEffect, useState } from 'react'
import { Hero } from '@/components/sections/Hero'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { HeroRelief } from './HeroRelief'
import { ReliefFrieze } from './ReliefFrieze'
import { RealisationsTunnel } from './RealisationsTunnel'
import { AboutManifesto } from './AboutManifesto'
import { HomeFAQ } from './HomeFAQ'
import { HomeContact } from './HomeContact'

/* Le site tient sur une seule longue page. Si le visiteur a demande a limiter
   les animations, ou si son appareil ne sait pas afficher la 3D, on garde les
   memes contenus en version simple. */
function canAnimate() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export function HomePage() {
  const [still, setStill] = useState(false)

  useEffect(() => {
    if (!canAnimate()) setStill(true)
  }, [])

  return (
    <>
      {still ? (
        <>
          <Hero />
          <div id="services">
            <ServicesSection />
            <ProcessSection />
            <AboutSection />
          </div>
        </>
      ) : (
        <div id="accueil" className="relative">
          <HeroRelief />
          <ReliefFrieze />
        </div>
      )}
      <RealisationsTunnel still={still} />
      <AboutManifesto still={still} />
      <HomeFAQ />
      <HomeContact />
    </>
  )
}

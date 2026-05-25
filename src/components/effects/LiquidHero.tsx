'use client'

import Image from 'next/image'
import { type ReactNode } from 'react'

export function LiquidHero({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{ minHeight: 600 }}
    >
      {/* Image de fond */}
      <Image
        src="/images/fond-roman.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Overlay sombre pour lisibilité du texte */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.22)', zIndex: 1 }} />

      {/* Contenu */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        {children}
      </div>
    </div>
  )
}

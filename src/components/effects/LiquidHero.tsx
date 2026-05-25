'use client'

import { type ReactNode } from 'react'

export function LiquidHero({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{
        minHeight: 600,
        backgroundImage: "url('/images/fond-roman.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      {/* Overlay sombre pour lisibilité */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.35)' }} />

      {/* Contenu */}
      <div className="absolute inset-0 z-10">
        {children}
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'

export function PortraitImage() {
  const [error, setError] = useState(false)

  return (
    <div
      className="rounded-2xl overflow-hidden w-full"
      style={{ aspectRatio: '3/4', position: 'relative' }}
    >
      {!error ? (
        <Image
          src="/images/portrait.jpg"
          alt="Roman Tabardel"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          onError={() => setError(true)}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center p-8"
          style={{ backgroundColor: '#161616', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="font-body text-xs text-center leading-relaxed" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Portrait à déposer dans{' '}
            <code style={{ color: '#C8FF00' }}>public/images/portrait.jpg</code>
          </p>
        </div>
      )}
    </div>
  )
}

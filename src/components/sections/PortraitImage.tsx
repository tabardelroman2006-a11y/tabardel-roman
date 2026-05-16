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
          src="/images/roman-tabardel.jpg"
          alt="Roman Tabardel"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          onError={() => setError(true)}
        />
      ) : (
        <div className="w-full h-full bg-stone-200 flex items-center justify-center p-8">
          <p className="text-xs text-muted text-center leading-relaxed">
            [Portrait Roman Tabardel à déposer dans{' '}
            <code className="font-mono">public/images/roman-tabardel.jpg</code>]
          </p>
        </div>
      )}
    </div>
  )
}

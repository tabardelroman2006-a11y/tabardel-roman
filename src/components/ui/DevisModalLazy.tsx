'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useModal } from '@/context/ModalContext'

/* La fenetre « Appel gratuit » (et sa librairie d'animation) n'est plus
   chargee avec la page : elle est prechargee au premier geste du visiteur,
   pour s'ouvrir aussitot sans ralentir l'affichage. */

const load = () => import('./DevisModal').then(m => m.DevisModal)
const DevisModal = dynamic(load, { ssr: false })

export function DevisModalLazy() {
  const { isDevisOpen } = useModal()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const go = () => {
      load().then(() => setReady(true)).catch(() => {})
      stop()
    }
    const events = ['pointermove', 'pointerdown', 'touchstart', 'scroll', 'keydown'] as const
    const stop = () => events.forEach(e => window.removeEventListener(e, go))
    events.forEach(e => window.addEventListener(e, go, { passive: true, once: true }))
    return stop
  }, [])

  return ready || isDevisOpen ? <DevisModal /> : null
}

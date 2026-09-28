'use client'

import { ScanPortrait } from './ScanPortrait'

/* Portrait de Roman avec une phrase sur une ligne, posee a cheval sur le haut
   de sa tete : les deux bouts depassent a gauche et a droite, le milieu est
   cache derriere la tete et apparait au travers du visage sous la souris.
   Les tailles sont relatives a la largeur du portrait (cqw) pour que la
   phrase depasse toujours de la meme facon, quel que soit l'ecran. */
export function PortraitLine({ text, top = '25%', className = '', style }: { text: string; top?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} style={{ containerType: 'size', aspectRatio: '900 / 1200', ...style }}>
      <p
        className="acc-headline absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center pointer-events-none"
        style={{ top, fontFamily: 'var(--font-barlow), sans-serif', fontStyle: 'italic', fontWeight: 700, color: 'var(--rt-primary)', lineHeight: 1, letterSpacing: '-0.01em' }}
      >
        {text}
      </p>
      <ScanPortrait priority seeThrough className="relative h-full" />
    </div>
  )
}

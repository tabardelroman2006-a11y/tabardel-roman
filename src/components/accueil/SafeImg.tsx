'use client'

import { useRef, type ImgHTMLAttributes, type Ref } from 'react'

/* Image qui ne reste jamais cassee : si le chargement echoue (reseau lent,
   deploiement en cours...), elle reessaie jusqu'a 3 fois, de plus en plus tard. */
export function SafeImg({ src, alt = '', ref, ...rest }: ImgHTMLAttributes<HTMLImageElement> & { src: string; ref?: Ref<HTMLImageElement> }) {
  const tries = useRef(0)
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...rest}
      ref={ref}
      src={src}
      alt={alt}
      decoding="async"
      onError={e => {
        const img = e.currentTarget
        if (tries.current >= 3) return
        tries.current += 1
        const n = tries.current
        setTimeout(() => { img.src = `${src}${src.includes('?') ? '&' : '?'}r=${n}` }, 600 * n)
      }}
    />
  )
}

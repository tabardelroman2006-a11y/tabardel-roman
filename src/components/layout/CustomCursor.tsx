'use client'

import { useEffect, useRef, useState } from 'react'
import { lerp } from '@/lib/utils'

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0
    let currentScale = 1
    let targetScale  = 1
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) setVisible(true)
    }

    const onMouseEnter = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [data-cursor-hover]')) {
        targetScale = 2.2
      }
    }
    const onMouseLeave = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [data-cursor-hover]')) {
        targetScale = 1
      }
    }

    function animate() {
      ringX = lerp(ringX, mouseX, 0.10)
      ringY = lerp(ringY, mouseY, 0.10)
      currentScale = lerp(currentScale, targetScale, 0.12)

      dot.style.transform  = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${currentScale})`

      rafId = requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener('mousemove',  onMouseMove)
    window.addEventListener('mouseover',  onMouseEnter)
    window.addEventListener('mouseout',   onMouseLeave)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove',  onMouseMove)
      window.removeEventListener('mouseover',  onMouseEnter)
      window.removeEventListener('mouseout',   onMouseLeave)
    }
  }, [visible])

  return (
    <>
      {/* Petit point — suit le curseur instantanément */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width:           6,
          height:          6,
          borderRadius:    '50%',
          backgroundColor: '#ffffff',
          opacity:         visible ? 1 : 0,
          transition:      'opacity 0.4s',
          mixBlendMode:    'difference',
          willChange:      'transform',
        }}
      />
      {/* Grand anneau — suit avec retard (lerp) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width:        40,
          height:       40,
          borderRadius: '50%',
          border:       '1.5px solid #ffffff',
          opacity:      visible ? 1 : 0,
          transition:   'opacity 0.4s',
          mixBlendMode: 'difference',
          willChange:   'transform',
        }}
      />
    </>
  )
}

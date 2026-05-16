'use client'

import { useEffect, useRef, useState } from 'react'
import { lerp } from '@/lib/utils'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) setVisible(true)
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(true)
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(false)
      }
    }

    function animate() {
      ringX = lerp(ringX, mouseX, 0.12)
      ringY = lerp(ringY, mouseY, 0.12)

      if (dot) {
        dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
      }
      if (ring) {
        ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
      }

      rafId = requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseover', onMouseOver)
    window.addEventListener('mouseout', onMouseOut)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mouseout', onMouseOut)
    }
  }, [visible])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#1A1A1A',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid #1A1A1A',
          opacity: visible ? (isHovering ? 0.6 : 0.3) : 0,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
          transition: 'opacity 0.3s, border-color 0.3s',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
    </>
  )
}

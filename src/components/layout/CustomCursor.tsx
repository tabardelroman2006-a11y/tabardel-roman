'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible]   = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const dotX  = useSpring(cursorX, { damping: 28, stiffness: 350 })
  const dotY  = useSpring(cursorY, { damping: 28, stiffness: 350 })
  const ringX = useSpring(cursorX, { damping: 38, stiffness: 180 })
  const ringY = useSpring(cursorY, { damping: 38, stiffness: 180 })

  useEffect(() => {
    if (window.innerWidth <= 768) return

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }
    const enter = () => setIsHovering(true)
    const leave = () => setIsHovering(false)

    window.addEventListener('mousemove', move)

    const bind = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
    }
    bind()

    const obs = new MutationObserver(bind)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      obs.disconnect()
    }
  }, [cursorX, cursorY, isVisible])

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          x: ringX, y: ringY,
          translateX: '-50%', translateY: '-50%',
          zIndex: 99999, pointerEvents: 'none',
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.7)',
        }}
        animate={{
          width:  isHovering ? 56 : 38,
          height: isHovering ? 56 : 38,
          opacity: isVisible ? (isHovering ? 0.9 : 0.6) : 0,
          borderColor: isHovering ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.65)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
      {/* White dot */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          x: dotX, y: dotY,
          translateX: '-50%', translateY: '-50%',
          zIndex: 99999, pointerEvents: 'none',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,1)',
          boxShadow: '0 0 8px rgba(255,255,255,0.5)',
        }}
        animate={{
          width:  isHovering ? 10 : 7,
          height: isHovering ? 10 : 7,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </>
  )
}

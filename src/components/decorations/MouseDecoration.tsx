'use client'

import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

export function MouseDecoration({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x      = useSpring(0, { stiffness: 60, damping: 12 })
  const y      = useSpring(0, { stiffness: 60, damping: 12 })
  const rotate = useSpring(0, { stiffness: 50, damping: 10 })

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width  / 2)
    const dy = e.clientY - (rect.top  + rect.height / 2)
    x.set(-dx * 0.55)
    y.set(-dy * 0.55)
    rotate.set(-dx * 0.08)
  }

  function handleMouseLeave() {
    x.set(0); y.set(0); rotate.set(0)
  }

  return (
    <div
      ref={ref}
      className={`hidden lg:flex items-center justify-center ${className}`}
      style={{ width: 140, height: 220 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={{ x, y, rotate }}>
        <svg viewBox="0 0 90 148" width="90" height="148" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#d8d3cc"/>
              <stop offset="45%"  stopColor="#f5f2ee"/>
              <stop offset="100%" stopColor="#b8b3ac"/>
            </linearGradient>
            <linearGradient id="topGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#eeebe6"/>
              <stop offset="100%" stopColor="#cac5be"/>
            </linearGradient>
            <linearGradient id="scrollGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#aaa59e"/>
              <stop offset="100%" stopColor="#d0ccc6"/>
            </linearGradient>
            <filter id="shadow" x="-20%" y="-10%" width="140%" height="130%">
              <feDropShadow dx="3" dy="6" stdDeviation="5" floodColor="#00000030"/>
            </filter>
          </defs>
          {/* Body shell */}
          <rect x="8"  y="18" width="74" height="120" rx="37" fill="url(#bodyGrad)" filter="url(#shadow)"/>
          {/* Top section */}
          <rect x="8"  y="18" width="74" height="55"  rx="37" fill="url(#topGrad)"/>
          {/* Button split */}
          <line x1="45" y1="18" x2="45" y2="62" stroke="#b0aba4" strokeWidth="1.2"/>
          {/* Left highlight */}
          <path d="M10 42 Q10 20 45 20 L45 60 L10 60 Z" fill="white" opacity="0.18"/>
          {/* Right shadow */}
          <path d="M80 42 Q80 20 45 20 L45 60 L80 60 Z" fill="black" opacity="0.04"/>
          {/* Seam */}
          <line x1="8" y1="62" x2="82" y2="62" stroke="#b0aba4" strokeWidth="1"/>
          {/* Scroll wheel */}
          <rect x="36" y="26" width="18" height="30" rx="9" fill="#c8c3bb" stroke="#a8a39c" strokeWidth="1"/>
          {[32,36,40,44,48].map(yy => (
            <line key={yy} x1="37" y1={yy} x2="53" y2={yy} stroke="#9e9990" strokeWidth="0.7" strokeLinecap="round"/>
          ))}
          <rect x="39" y="28" width="6" height="8" rx="3" fill="white" opacity="0.35"/>
          {/* Side buttons */}
          <rect x="5"  y="72" width="7" height="14" rx="3.5" fill="#c8c3bb" stroke="#a8a39c" strokeWidth="1"/>
          <rect x="5"  y="90" width="7" height="10" rx="3.5" fill="#c8c3bb" stroke="#a8a39c" strokeWidth="1"/>
          {/* Highlight */}
          <rect x="30" y="68" width="8" height="60" rx="4" fill="white" opacity="0.12"/>
          {/* USB-C */}
          <rect x="34" y="133" width="22" height="7" rx="3.5" fill="#a8a39c" stroke="#8e8a84" strokeWidth="1"/>
          <rect x="38" y="135" width="14" height="3" rx="1.5" fill="#7a7670"/>
          {/* Shadow ellipse */}
          <ellipse cx="45" cy="142" rx="26" ry="5" fill="#00000018"/>
        </svg>
      </motion.div>
    </div>
  )
}

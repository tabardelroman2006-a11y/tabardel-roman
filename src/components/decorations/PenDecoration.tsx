'use client'

import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

export function PenDecoration({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x      = useSpring(0,  { stiffness: 55, damping: 11 })
  const y      = useSpring(0,  { stiffness: 55, damping: 11 })
  const rotate = useSpring(20, { stiffness: 45, damping: 10 })

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width  / 2)
    const dy = e.clientY - (rect.top  + rect.height / 2)
    x.set(-dx * 0.6)
    y.set(-dy * 0.5)
    rotate.set(20 - dx * 0.07)
  }

  function handleMouseLeave() {
    x.set(0); y.set(0); rotate.set(20)
  }

  return (
    <div
      ref={ref}
      className={`hidden lg:flex items-center justify-center ${className}`}
      style={{ width: 120, height: 280 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={{ x, y, rotate }}>
        <svg viewBox="0 0 48 260" width="58" height="260" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="capGrad2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#1a1a1a"/>
              <stop offset="40%"  stopColor="#3a3a3a"/>
              <stop offset="100%" stopColor="#0a0a0a"/>
            </linearGradient>
            <linearGradient id="bodyPenGrad2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#c8c3bb"/>
              <stop offset="35%"  stopColor="#f0ece6"/>
              <stop offset="100%" stopColor="#a8a39c"/>
            </linearGradient>
            <linearGradient id="gripGrad2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#1c1c1c"/>
              <stop offset="40%"  stopColor="#3c3c3c"/>
              <stop offset="100%" stopColor="#101010"/>
            </linearGradient>
            <linearGradient id="nibGrad2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#888"/>
              <stop offset="50%"  stopColor="#ddd"/>
              <stop offset="100%" stopColor="#666"/>
            </linearGradient>
            <filter id="penShadow2" x="-30%" y="-5%" width="160%" height="110%">
              <feDropShadow dx="4" dy="2" stdDeviation="4" floodColor="#00000035"/>
            </filter>
          </defs>
          <g filter="url(#penShadow2)">
            {/* Cap */}
            <rect x="14" y="0"   width="20" height="80" rx="10" fill="url(#capGrad2)"/>
            <ellipse cx="24" cy="8" rx="10" ry="6" fill="#2a2a2a"/>
            <rect x="17" y="4"   width="5"  height="42" rx="2.5" fill="white" opacity="0.07"/>
            <rect x="33" y="5"   width="4.5" height="68" rx="2.25" fill="#222"/>
            <ellipse cx="35.25" cy="70" rx="3.5" ry="3.5" fill="#2a2a2a" stroke="#111" strokeWidth="0.5"/>
            <rect x="14" y="72"  width="20" height="5" fill="#c8a84b"/>
            <rect x="14" y="73"  width="20" height="1.5" fill="#e8c86b" opacity="0.5"/>
            {/* Body */}
            <rect x="14" y="77"  width="20" height="118" rx="3" fill="url(#bodyPenGrad2)"/>
            <rect x="16" y="80"  width="5"  height="112" rx="2.5" fill="white" opacity="0.18"/>
            <rect x="30" y="80"  width="3"  height="112" rx="1.5" fill="black" opacity="0.07"/>
            <text x="24" y="140" textAnchor="middle" fontSize="5.5" fill="#8a8480" fontFamily="Georgia, serif" fontStyle="italic" letterSpacing="0.5">Roman T.</text>
            {/* Ink window */}
            <rect x="21" y="108" width="6"  height="22" rx="3" fill="#1a1a1a" opacity="0.5"/>
            <rect x="22" y="110" width="4"  height="18" rx="2" fill="#4a3d8f" opacity="0.6"/>
            <rect x="22.5" y="111" width="2" height="5" rx="1" fill="white" opacity="0.2"/>
            {/* Band */}
            <rect x="14" y="192" width="20" height="4" fill="#c8a84b"/>
            <rect x="14" y="193" width="20" height="1" fill="#e8c86b" opacity="0.5"/>
            {/* Grip */}
            <rect x="14" y="196" width="20" height="32" rx="3" fill="url(#gripGrad2)"/>
            {[200,205,210,215,220].map(yy => (
              <line key={yy} x1="15" y1={yy} x2="33" y2={yy} stroke="#555" strokeWidth="0.7" strokeLinecap="round"/>
            ))}
            <rect x="16" y="198" width="3" height="28" rx="1.5" fill="white" opacity="0.05"/>
            <rect x="14" y="226" width="20" height="4" fill="#888"/>
            {/* Nib */}
            <path d="M14 230 L34 230 L28 258 L20 258 Z" fill="url(#gripGrad2)"/>
            <path d="M20 256 L28 256 L24 272 Z" fill="url(#nibGrad2)"/>
            <line x1="24" y1="256" x2="24" y2="271" stroke="#555" strokeWidth="0.7"/>
            <ellipse cx="24" cy="260" rx="1.5" ry="2" fill="#444"/>
            <line x1="20.5" y1="258" x2="23" y2="265" stroke="#aaa" strokeWidth="0.6" opacity="0.6"/>
            <line x1="27.5" y1="258" x2="25" y2="265" stroke="#aaa" strokeWidth="0.6" opacity="0.6"/>
            <path d="M21 257 L23 256 L24 260 L22 261 Z" fill="white" opacity="0.25"/>
          </g>
        </svg>
      </motion.div>
    </div>
  )
}

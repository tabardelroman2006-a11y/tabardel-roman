'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const buildings = [
  {
    id: 'restaurant',
    label: 'Restaurant',
    color: '#C8794A',
    svg: (
      <g>
        {/* Corps principal */}
        <rect x="10" y="90" width="100" height="110" rx="2" />
        {/* Toit triangulaire */}
        <polygon points="5,90 60,40 115,90" />
        {/* Cheminée */}
        <rect x="75" y="50" width="12" height="28" />
        {/* Fumée */}
        <circle cx="81" cy="44" r="5" opacity="0.4" />
        {/* Auvent */}
        <rect x="15" y="118" width="90" height="10" rx="2" />
        {/* Porte */}
        <rect x="42" y="148" width="24" height="52" rx="2" fill="white" fillOpacity="0.15" />
        {/* Fenêtre gauche */}
        <rect x="15" y="100" width="22" height="20" rx="2" fill="white" fillOpacity="0.15" />
        {/* Fenêtre droite */}
        <rect x="83" y="100" width="22" height="20" rx="2" fill="white" fillOpacity="0.15" />
        {/* Enseigne */}
        <rect x="20" y="130" width="30" height="10" rx="1" fill="white" fillOpacity="0.2" />
      </g>
    ),
  },
  {
    id: 'artisan',
    label: 'Artisan',
    color: '#8B6E47',
    svg: (
      <g>
        {/* Corps */}
        <rect x="5" y="110" width="110" height="90" rx="2" />
        {/* Toit pentu */}
        <polygon points="0,110 60,70 120,110" />
        {/* Lucarne */}
        <rect x="45" y="76" width="30" height="22" rx="2" />
        <rect x="50" y="80" width="8" height="14" rx="1" fill="white" fillOpacity="0.2" />
        <rect x="62" y="80" width="8" height="14" rx="1" fill="white" fillOpacity="0.2" />
        {/* Grande porte atelier */}
        <rect x="20" y="148" width="50" height="52" rx="2" fill="white" fillOpacity="0.12" />
        {/* Petite porte */}
        <rect x="78" y="158" width="26" height="42" rx="2" fill="white" fillOpacity="0.15" />
        {/* Fenêtre */}
        <rect x="10" y="125" width="20" height="16" rx="1" fill="white" fillOpacity="0.15" />
        {/* Enseigne */}
        <rect x="22" y="138" width="46" height="8" rx="1" fill="white" fillOpacity="0.2" />
      </g>
    ),
  },
  {
    id: 'coiffeur',
    label: 'Coiffeur',
    color: '#9B6B9B',
    svg: (
      <g>
        {/* Corps */}
        <rect x="15" y="100" width="90" height="100" rx="2" />
        {/* Toit plat avec rebord */}
        <rect x="10" y="94" width="100" height="10" rx="2" />
        {/* Grande vitrine */}
        <rect x="20" y="115" width="80" height="55" rx="2" fill="white" fillOpacity="0.12" />
        {/* Croisillon vitrine */}
        <rect x="59" y="115" width="3" height="55" fill="currentColor" />
        <rect x="20" y="142" width="80" height="3" fill="currentColor" />
        {/* Porte */}
        <rect x="40" y="155" width="26" height="45" rx="2" fill="white" fillOpacity="0.18" />
        {/* Barber pole */}
        <rect x="96" y="108" width="8" height="60" rx="3" fill="white" fillOpacity="0.3" />
        <rect x="97" y="112" width="3" height="50" rx="1" fill="#E53935" fillOpacity="0.7" />
        {/* Enseigne */}
        <rect x="20" y="104" width="50" height="8" rx="1" fill="white" fillOpacity="0.25" />
      </g>
    ),
  },
  {
    id: 'entrepreneur',
    label: 'Entrepreneur',
    color: '#3A6BBF',
    svg: (
      <g>
        {/* Tour principale */}
        <rect x="25" y="20" width="70" height="180" rx="2" />
        {/* Base plus large */}
        <rect x="15" y="170" width="90" height="30" rx="2" />
        {/* Fenêtres grille */}
        {[0,1,2,3,4,5,6].map(row => (
          [0,1,2].map(col => (
            <rect
              key={`${row}-${col}`}
              x={35 + col * 22}
              y={30 + row * 20}
              width="14"
              height="12"
              rx="1"
              fill="white"
              fillOpacity="0.15"
            />
          ))
        ))}
        {/* Porte entrée */}
        <rect x="45" y="178" width="30" height="22" rx="1" fill="white" fillOpacity="0.18" />
        {/* Antenne */}
        <rect x="57" y="8" width="4" height="14" />
        <circle cx="59" cy="6" r="4" />
      </g>
    ),
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    color: '#3A9B6B',
    svg: (
      <g>
        {/* Corps moderne */}
        <rect x="8" y="95" width="104" height="105" rx="3" />
        {/* Toit plat + parapet */}
        <rect x="5" y="88" width="110" height="10" rx="2" />
        {/* Grande vitrine moderne */}
        <rect x="13" y="105" width="94" height="65" rx="2" fill="white" fillOpacity="0.13" />
        {/* Étagères dans vitrine */}
        <rect x="18" y="130" width="35" height="4" rx="1" fill="white" fillOpacity="0.3" />
        <rect x="18" y="148" width="35" height="4" rx="1" fill="white" fillOpacity="0.3" />
        <rect x="67" y="130" width="35" height="4" rx="1" fill="white" fillOpacity="0.3" />
        <rect x="67" y="148" width="35" height="4" rx="1" fill="white" fillOpacity="0.3" />
        {/* Porte coulissante */}
        <rect x="44" y="155" width="32" height="45" rx="1" fill="white" fillOpacity="0.2" />
        {/* Enseigne lumineuse */}
        <rect x="13" y="96" width="94" height="14" rx="1" fill="white" fillOpacity="0.22" />
      </g>
    ),
  },
  {
    id: 'tpe',
    label: 'TPE / PME',
    color: '#5A8FA8',
    svg: (
      <g>
        {/* Corps */}
        <rect x="10" y="80" width="100" height="120" rx="2" />
        {/* Toit légèrement pentu */}
        <polygon points="5,80 60,55 115,80" />
        {/* Drapeau */}
        <rect x="56" y="42" width="3" height="20" />
        <rect x="59" y="42" width="18" height="12" rx="1" />
        {/* Fenêtres étage */}
        <rect x="18" y="90" width="24" height="20" rx="2" fill="white" fillOpacity="0.15" />
        <rect x="49" y="90" width="24" height="20" rx="2" fill="white" fillOpacity="0.15" />
        <rect x="80" y="90" width="24" height="20" rx="2" fill="white" fillOpacity="0.15" />
        {/* Fenêtres RDC */}
        <rect x="18" y="120" width="24" height="20" rx="2" fill="white" fillOpacity="0.15" />
        <rect x="80" y="120" width="24" height="20" rx="2" fill="white" fillOpacity="0.15" />
        {/* Porte */}
        <rect x="44" y="148" width="32" height="52" rx="2" fill="white" fillOpacity="0.18" />
        {/* Enseigne */}
        <rect x="18" y="112" width="86" height="6" rx="1" fill="white" fillOpacity="0.2" />
      </g>
    ),
  },
]

export function ClientsSection() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section style={{ backgroundColor: 'rgb(250 250 248 / 0.9)', padding: '80px 0 60px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* Titre */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '48px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#6B6B6B',
            marginBottom: '12px',
          }}>
            Clientèle
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 400,
            color: '#1A1A1A',
            lineHeight: 1.2,
          }}>
            Types d&apos;entreprises avec lesquels{' '}
            <em style={{ fontStyle: 'italic', color: '#6B6B6B' }}>nous travaillons.</em>
          </h2>
        </motion.div>

        {/* Rue avec bâtiments */}
        <div style={{ position: 'relative' }}>

          {/* Bâtiments */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
          }}>
            {buildings.map(({ id, label, color, svg }, i) => (
              <motion.div
                key={id}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transformOrigin: 'bottom center',
                }}
              >
                <motion.svg
                  viewBox="0 0 120 210"
                  style={{ width: 'clamp(90px, 12vw, 160px)', display: 'block' }}
                  animate={{
                    scale: hovered === id ? 1.08 : 1,
                    filter: hovered === id ? 'none' : 'grayscale(1) brightness(0.35)',
                    color: hovered === id ? color : '#1a1a1a',
                    fill: hovered === id ? color : '#1a1a1a',
                  }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {svg}
                </motion.svg>

                {/* Label */}
                <motion.span
                  animate={{
                    color: hovered === id ? color : '#6B6B6B',
                    fontWeight: hovered === id ? 600 : 400,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.05em',
                    marginTop: '8px',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {label}
                </motion.span>
              </motion.div>
            ))}
          </div>

          {/* Sol / rue */}
          <div style={{
            marginTop: '0px',
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #1a1a1a33, #1a1a1a55, #1a1a1a33, transparent)',
            borderRadius: '2px',
          }} />
          <div style={{
            height: '12px',
            background: 'linear-gradient(180deg, #1a1a1a18, transparent)',
          }} />

        </div>
      </div>
    </section>
  )
}

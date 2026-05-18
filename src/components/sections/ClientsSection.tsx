'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const GROUND = 370

const buildingData = [
  { id: 'restaurant', label: 'Restaurant', color: '#C8794A' },
  { id: 'artisan',    label: 'Artisan',    color: '#8B6E47' },
  { id: 'coiffeur',   label: 'Coiffeur',   color: '#9B6B9B' },
  { id: 'immeuble',   label: 'Entrepreneur', color: '#3A6BBF' },
  { id: 'ecommerce',  label: 'E-commerce', color: '#3A9B6B' },
  { id: 'tpe',        label: 'TPE / PME',  color: '#5A8FA8' },
]

/* ── Nuage ──────────────────────────────────────────────── */
function Cloud({ x, y, scale = 1, duration = 28, delay = 0 }: {
  x: number; y: number; scale?: number; duration?: number; delay?: number
}) {
  return (
    <motion.g
      transform={`translate(${x},${y}) scale(${scale})`}
      animate={{ x: [0, 900] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear', repeatDelay: 0 }}
      opacity={0.55}
    >
      <ellipse cx="0"   cy="0" rx="40" ry="22" fill="white" />
      <ellipse cx="32"  cy="-8" rx="30" ry="20" fill="white" />
      <ellipse cx="-28" cy="-5" rx="28" ry="16" fill="white" />
      <ellipse cx="58"  cy="4"  rx="22" ry="14" fill="white" />
    </motion.g>
  )
}

/* ── Oiseau ─────────────────────────────────────────────── */
function Bird({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <motion.g
      animate={{ x: [x, x + 1100], y: [y, y - 20, y + 10, y - 5, y] }}
      transition={{ duration: 18, delay, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
    >
      <path d="M0,0 Q6,-5 12,0 Q18,-5 24,0" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" opacity={0.6} />
    </motion.g>
  )
}

/* ── Avion ──────────────────────────────────────────────── */
function Airplane({ x, y }: { x: number; y: number }) {
  return (
    <motion.g
      animate={{ x: [x, x + 1200] }}
      transition={{ duration: 35, repeat: Infinity, ease: 'linear', repeatDelay: 10 }}
      opacity={0.5}
    >
      {/* Fuselage */}
      <ellipse cx="0" cy="0" rx="28" ry="6" fill="#1a1a1a" transform={`translate(0,${y})`} />
      {/* Aile */}
      <polygon points="-6,-2 -6,10 20,0 14,-2" fill="#333" transform={`translate(0,${y})`} />
      {/* Queue */}
      <polygon points="-22,-2 -28,-12 -16,-2" fill="#333" transform={`translate(0,${y})`} />
      {/* Traînée */}
      <line x1="-28" y1={y} x2="-80" y2={y} stroke="white" strokeWidth="1.5" opacity={0.4} strokeDasharray="4 4" />
    </motion.g>
  )
}

/* ── Bâtiments ──────────────────────────────────────────── */
function Buildings({ hovered, setHovered }: {
  hovered: string | null
  setHovered: (id: string | null) => void
}) {
  const g = GROUND

  const isH = (id: string) => hovered === id
  const col = (id: string) => buildingData.find(b => b.id === id)?.color ?? '#1a1a1a'
  const fill = (id: string) => isH(id) ? col(id) : '#1a1a1a'
  const win  = (id: string) => isH(id) ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.13)'

  return (
    <>
      {/* ── RESTAURANT ── x=30 */}
      <motion.g
        onMouseEnter={() => setHovered('restaurant')}
        onMouseLeave={() => setHovered(null)}
        style={{ cursor: 'pointer', transformOrigin: '75px 370px' }}
        animate={{ scale: isH('restaurant') ? 1.06 : 1 }}
        transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
      >
        <rect x="25" y={g-160} width="100" height="160" fill={fill('restaurant')} rx="2" />
        <polygon points="15,210 75,148 135,210" fill={fill('restaurant')} />
        <rect x="72" y="154" width="10" height="32" fill={fill('restaurant')} />
        <ellipse cx="77" cy="150" rx="6" ry="4" fill={fill('restaurant')} opacity={0.4} />
        {/* Auvent */}
        <rect x="20" y={g-118} width="110" height="12" fill={fill('restaurant')} rx="2" />
        <line x1="20" y1={g-106} x2="130" y2={g-106} stroke={col('restaurant')} strokeWidth="1" opacity={0.4} />
        {/* Vitrine */}
        <rect x="27" y={g-108} width="36" height="50" fill={win('restaurant')} rx="1" />
        <rect x="87" y={g-108} width="36" height="50" fill={win('restaurant')} rx="1" />
        {/* Porte */}
        <rect x="55" y={g-72} width="28" height="72" fill={win('restaurant')} rx="2" />
        {/* Enseigne */}
        <rect x="27" y={g-140} width="96" height="16" fill="rgba(255,255,255,0.12)" rx="2" />
        {/* Lampion */}
        <circle cx="45" cy={g-115} r="5" fill={isH('restaurant') ? '#FFD166' : 'rgba(255,255,255,0.2)'} />
        <circle cx="75" cy={g-118} r="5" fill={isH('restaurant') ? '#FFD166' : 'rgba(255,255,255,0.2)'} />
        <circle cx="105" cy={g-115} r="5" fill={isH('restaurant') ? '#FFD166' : 'rgba(255,255,255,0.2)'} />
      </motion.g>

      {/* ── ARTISAN ── x=165 */}
      <motion.g
        onMouseEnter={() => setHovered('artisan')}
        onMouseLeave={() => setHovered(null)}
        style={{ cursor: 'pointer', transformOrigin: '225px 370px' }}
        animate={{ scale: isH('artisan') ? 1.06 : 1 }}
        transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
      >
        <rect x="162" y={g-130} width="126" height="130" fill={fill('artisan')} rx="2" />
        <polygon points="156,240 225,188 294,240" fill={fill('artisan')} />
        {/* Lucarne */}
        <rect x="206" y="196" width="38" height="28" fill={fill('artisan')} rx="2" />
        <rect x="210" y="200" width="12" height="18" fill={win('artisan')} rx="1" />
        <rect x="226" y="200" width="12" height="18" fill={win('artisan')} rx="1" />
        {/* Grande porte atelier */}
        <rect x="168" y={g-90} width="64" height="90" fill={win('artisan')} rx="2" />
        <line x1="200" y1={g-90} x2="200" y2={g} stroke={fill('artisan')} strokeWidth="2" />
        <line x1="168" y1={g-50} x2="232" y2={g-50} stroke={fill('artisan')} strokeWidth="2" />
        {/* Fenêtre droite */}
        <rect x="240" y={g-110} width="40" height="34" fill={win('artisan')} rx="2" />
        <line x1="260" y1={g-110} x2="260" y2={g-76} stroke={fill('artisan')} strokeWidth="1.5" />
        {/* Enseigne */}
        <rect x="168" y={g-118} width="114" height="20" fill="rgba(255,255,255,0.12)" rx="2" />
        {/* Boîte aux lettres */}
        <rect x="236" y={g-30} width="18" height="12" fill={fill('artisan')} rx="2" />
        <rect x="233" y={g-30} width="6" height="8" fill={fill('artisan')} />
      </motion.g>

      {/* ── COIFFEUR ── x=315 */}
      <motion.g
        onMouseEnter={() => setHovered('coiffeur')}
        onMouseLeave={() => setHovered(null)}
        style={{ cursor: 'pointer', transformOrigin: '375px 370px' }}
        animate={{ scale: isH('coiffeur') ? 1.06 : 1 }}
        transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
      >
        <rect x="318" y={g-155} width="114" height="155" fill={fill('coiffeur')} rx="2" />
        <rect x="314" y={g-162} width="122" height="12" fill={fill('coiffeur')} rx="2" />
        {/* 2e étage fenêtres */}
        <rect x="326" y={g-145} width="28" height="26" fill={win('coiffeur')} rx="1" />
        <line x1="340" y1={g-145} x2="340" y2={g-119} stroke={fill('coiffeur')} strokeWidth="1.5" />
        <rect x="364" y={g-145} width="28" height="26" fill={win('coiffeur')} rx="1" />
        <line x1="378" y1={g-145} x2="378" y2={g-119} stroke={fill('coiffeur')} strokeWidth="1.5" />
        <rect x="402" y={g-145} width="24" height="26" fill={win('coiffeur')} rx="1" />
        {/* Grande vitrine RDC */}
        <rect x="322" y={g-108} width="76" height="76" fill={win('coiffeur')} rx="2" />
        <line x1="360" y1={g-108} x2="360" y2={g-32} stroke={fill('coiffeur')} strokeWidth="2" />
        <line x1="322" y1={g-72} x2="398" y2={g-72} stroke={fill('coiffeur')} strokeWidth="2" />
        {/* Porte */}
        <rect x="404" y={g-78} width="22" height="78" fill={win('coiffeur')} rx="1" />
        {/* Barber pole */}
        <rect x="406" y={g-110} width="8" height="50" fill="rgba(255,255,255,0.25)" rx="4" />
        <motion.rect
          x="407" y={g-110} width="3" height="50" rx="1"
          fill={isH('coiffeur') ? '#E53935' : 'rgba(200,80,80,0.5)'}
          animate={{ y: [g-110, g-60] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        {/* Enseigne */}
        <rect x="322" y={g-122} width="108" height="12" fill="rgba(255,255,255,0.18)" rx="1" />
      </motion.g>

      {/* ── IMMEUBLE (tall) ── x=460 */}
      <motion.g
        onMouseEnter={() => setHovered('immeuble')}
        onMouseLeave={() => setHovered(null)}
        style={{ cursor: 'pointer', transformOrigin: '525px 370px' }}
        animate={{ scale: isH('immeuble') ? 1.04 : 1 }}
        transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
      >
        {/* Tour */}
        <rect x="478" y={g-280} width="96" height="280" fill={fill('immeuble')} rx="2" />
        {/* Socle */}
        <rect x="462" y={g-40} width="128" height="40" fill={fill('immeuble')} rx="2" />
        {/* Antenne */}
        <rect x="523" y={g-300} width="6" height="26" fill={fill('immeuble')} />
        <circle cx="526" cy={g-302} r="5" fill={isH('immeuble') ? '#FFD166' : 'rgba(255,255,255,0.3)'} />
        {/* Grille de fenêtres */}
        {Array.from({ length: 8 }, (_, row) =>
          Array.from({ length: 3 }, (_, col) => (
            <rect
              key={`w-${row}-${col}`}
              x={486 + col * 30}
              y={g - 265 + row * 30}
              width="18" height="18" rx="1"
              fill={win('immeuble')}
            />
          ))
        )}
        {/* Entrée */}
        <rect x="498" y={g-38} width="56" height="38" fill={win('immeuble')} rx="1" />
        <line x1="526" y1={g-38} x2="526" y2={g} stroke={fill('immeuble')} strokeWidth="2" />
        {/* Enseigne toit */}
        <rect x="480" y={g-278} width="92" height="14" fill="rgba(255,255,255,0.14)" rx="1" />
      </motion.g>

      {/* ── E-COMMERCE ── x=622 */}
      <motion.g
        onMouseEnter={() => setHovered('ecommerce')}
        onMouseLeave={() => setHovered(null)}
        style={{ cursor: 'pointer', transformOrigin: '695px 370px' }}
        animate={{ scale: isH('ecommerce') ? 1.06 : 1 }}
        transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
      >
        <rect x="624" y={g-145} width="142" height="145" fill={fill('ecommerce')} rx="2" />
        <rect x="618" y={g-152} width="154" height="14" fill={fill('ecommerce')} rx="2" />
        {/* Étage */}
        <rect x="630" y={g-134} width="34" height="26" fill={win('ecommerce')} rx="1" />
        <rect x="674" y={g-134} width="34" height="26" fill={win('ecommerce')} rx="1" />
        <rect x="718" y={g-134} width="34" height="26" fill={win('ecommerce')} rx="1" />
        {/* Grande vitrine */}
        <rect x="628" y={g-100} width="138" height="80" fill={win('ecommerce')} rx="2" />
        {/* Articles en vitrine */}
        {isH('ecommerce') && (
          <>
            <rect x="636" y={g-80} width="20" height="30" fill={col('ecommerce')} rx="1" opacity={0.6} />
            <rect x="664" y={g-75} width="20" height="25" fill={col('ecommerce')} rx="1" opacity={0.5} />
            <rect x="710" y={g-82} width="20" height="32" fill={col('ecommerce')} rx="1" opacity={0.6} />
          </>
        )}
        {/* Porte */}
        <rect x="682" y={g-48} width="36" height="48" fill={win('ecommerce')} rx="1" />
        <line x1="700" y1={g-48} x2="700" y2={g} stroke={fill('ecommerce')} strokeWidth="2" />
        {/* Enseigne lumineuse */}
        <rect x="628" y={g-115} width="138" height="14" fill="rgba(255,255,255,0.18)" rx="2" />
      </motion.g>

      {/* ── TPE/PME ── x=790 */}
      <motion.g
        onMouseEnter={() => setHovered('tpe')}
        onMouseLeave={() => setHovered(null)}
        style={{ cursor: 'pointer', transformOrigin: '865px 370px' }}
        animate={{ scale: isH('tpe') ? 1.06 : 1 }}
        transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
      >
        <rect x="792" y={g-175} width="136" height="175" fill={fill('tpe')} rx="2" />
        <polygon points="786,195 860,138 934,195" fill={fill('tpe')} />
        {/* Drapeau */}
        <rect x="857" y="142" width="5" height="26" fill={fill('tpe')} />
        <rect x="862" y="142" width="24" height="16" fill={isH('tpe') ? '#E53935' : 'rgba(200,50,50,0.5)'} rx="1" />
        {/* Fenêtres étage 2 */}
        <rect x="800" y={g-158} width="28" height="26" fill={win('tpe')} rx="1" />
        <rect x="838" y={g-158} width="28" height="26" fill={win('tpe')} rx="1" />
        <rect x="876" y={g-158} width="28" height="26" fill={win('tpe')} rx="1" />
        <rect x="914" y={g-158} width="10" height="26" fill={win('tpe')} rx="1" />
        {/* Fenêtres RDC */}
        <rect x="800" y={g-120} width="28" height="26" fill={win('tpe')} rx="1" />
        <rect x="894" y={g-120} width="28" height="26" fill={win('tpe')} rx="1" />
        {/* Porte */}
        <rect x="836" y={g-88} width="36" height="88" fill={win('tpe')} rx="2" />
        <line x1="854" y1={g-88} x2="854" y2={g} stroke={fill('tpe')} strokeWidth="2" />
        {/* Enseigne */}
        <rect x="800" y={g-138} width="118" height="14" fill="rgba(255,255,255,0.14)" rx="2" />
        {/* Boîte lettres */}
        <rect x="798" y={g-30} width="20" height="14" fill={fill('tpe')} rx="2" />
        <rect x="794" y={g-30} width="8" height="10" fill={fill('tpe')} />
      </motion.g>
    </>
  )
}

/* ── Section principale ─────────────────────────────────── */
export function ClientsSection() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section style={{ backgroundColor: 'rgb(248 247 244)', padding: '72px 0 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

        {/* Titre */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '40px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B6B6B', marginBottom: '10px' }}>
            Clientèle
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.2 }}>
            Types d&apos;entreprises avec lesquels{' '}
            <em style={{ fontStyle: 'italic', color: '#6B6B6B' }}>nous travaillons.</em>
          </h2>
        </motion.div>
      </div>

      {/* Scène SVG pleine largeur */}
      <div style={{ width: '100%', overflowX: 'hidden' }}>
        <svg
          viewBox="0 0 980 430"
          width="100%"
          style={{ display: 'block', minWidth: '600px' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ciel dégradé */}
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#dde8f5" />
              <stop offset="100%" stopColor="#f5f0e8" />
            </linearGradient>
            <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#6b6b6b" />
              <stop offset="100%" stopColor="#4a4a4a" />
            </linearGradient>
            <linearGradient id="sidewalk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#9a9a9a" />
              <stop offset="100%" stopColor="#808080" />
            </linearGradient>
          </defs>

          <rect width="980" height="430" fill="url(#sky)" />

          {/* Nuages animés */}
          <Cloud x={-150} y={55}  scale={1.2} duration={40} delay={0}  />
          <Cloud x={-600} y={80}  scale={0.8} duration={32} delay={8}  />
          <Cloud x={-300} y={35}  scale={0.6} duration={50} delay={20} />
          <Cloud x={-800} y={65}  scale={1.0} duration={38} delay={14} />

          {/* Avion */}
          <Airplane x={-120} y={42} />

          {/* Oiseaux */}
          <Bird x={-80}  y={90}  delay={2}  />
          <Bird x={-200} y={75}  delay={5}  />
          <Bird x={-50}  y={110} delay={8}  />
          <Bird x={-150} y={100} delay={12} />

          {/* Trottoir */}
          <rect x="0" y={GROUND} width="980" height="14" fill="url(#sidewalk)" />
          <rect x="0" y={GROUND + 13} width="980" height="2" fill="rgba(0,0,0,0.25)" />
          {/* Route */}
          <rect x="0" y={GROUND + 15} width="980" height="45" fill="url(#ground)" />
          {/* Ligne centrale tiretée */}
          {Array.from({ length: 22 }, (_, i) => (
            <rect key={i} x={i * 46} y={GROUND + 35} width="28" height="4" rx="2" fill="rgba(255,255,255,0.7)" />
          ))}
          {/* Bordure route */}
          <rect x="0" y={GROUND + 58} width="980" height="2" fill="rgba(255,255,255,0.15)" />

          {/* Petits arbres décoratifs */}
          {[145, 310, 455, 616, 783, 950].map(x => (
            <g key={x}>
              <rect x={x-3} y={GROUND-32} width="6" height="32" fill="#5a4a3a" />
              <ellipse cx={x} cy={GROUND-50} rx="18" ry="28" fill="#4a7a4a" opacity={0.7} />
              <ellipse cx={x} cy={GROUND-62} rx="12" ry="18" fill="#5a8a5a" opacity={0.7} />
            </g>
          ))}

          {/* Lampadaires */}
          {[100, 440, 780].map(x => (
            <g key={x}>
              <rect x={x-2} y={GROUND-90} width="4" height="90" fill="#2a2a2a" />
              <ellipse cx={x} cy={GROUND-90} rx="14" ry="5" fill="#2a2a2a" />
              <ellipse cx={x} cy={GROUND-94} rx="6" ry="4" fill={hovered ? '#FFE566' : '#FFF5CC'} opacity={0.9} />
            </g>
          ))}

          {/* Bâtiments */}
          <Buildings hovered={hovered} setHovered={setHovered} />

          {/* Labels sous les bâtiments */}
          {[
            { id: 'restaurant', cx: 75  },
            { id: 'artisan',    cx: 225 },
            { id: 'coiffeur',   cx: 375 },
            { id: 'immeuble',   cx: 526 },
            { id: 'ecommerce',  cx: 695 },
            { id: 'tpe',        cx: 860 },
          ].map(({ id, cx }) => {
            const b = buildingData.find(b => b.id === id)!
            return (
              <motion.text
                key={id}
                x={cx}
                y={GROUND + 42}
                textAnchor="middle"
                fontSize="13"
                fontFamily="var(--font-body), system-ui"
                animate={{
                  fill: hovered === id ? b.color : '#6B5B4E',
                  fontWeight: hovered === id ? 700 : 400,
                }}
                transition={{ duration: 0.3 }}
              >
                {b.label}
              </motion.text>
            )
          })}
        </svg>
      </div>
    </section>
  )
}

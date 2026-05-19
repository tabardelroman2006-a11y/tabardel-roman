'use client'

import { useState } from 'react'

const BUILDINGS = [
  {
    id: 'restaurant',
    label: 'Restaurant',
    color: '#E07A5F',
    w: 200,
    h: 320,
    vb: '0 0 200 320',
    render: (h: boolean) => (
      <>
        <rect x="30" y="30" width="18" height="60" fill={h ? '#C9604A' : '#1a1a1a'} stroke={h ? '#E07A5F' : '#555'} strokeWidth="2"/>
        {h && <><circle cx="39" cy="22" r="7" fill="#FFD9CC" opacity="0.5"/><circle cx="44" cy="12" r="5" fill="#FFD9CC" opacity="0.3"/></>}
        <rect x="152" y="45" width="14" height="45" fill={h ? '#C9604A' : '#1a1a1a'} stroke={h ? '#E07A5F' : '#555'} strokeWidth="2"/>
        {h && <><circle cx="159" cy="38" r="6" fill="#FFD9CC" opacity="0.5"/><circle cx="163" cy="30" r="4" fill="#FFD9CC" opacity="0.3"/></>}
        <polygon points="8,88 100,42 192,88" fill={h ? '#C9604A' : '#1a1a1a'} stroke={h ? '#E07A5F' : '#555'} strokeWidth="2"/>
        <rect x="10" y="85" width="180" height="235" fill={h ? '#E07A5F' : '#2a2a2a'} stroke={h ? '#E07A5F' : '#555'} strokeWidth="2"/>
        <rect x="0" y="82" width="200" height="16" fill={h ? '#C9604A' : '#1a1a1a'} stroke={h ? '#E07A5F' : '#555'} strokeWidth="1.5"/>
        <rect x="18" y="100" width="164" height="32" fill={h ? '#F4A08A' : '#3a3a3a'} stroke={h ? '#E07A5F' : '#555'} strokeWidth="1.5"/>
        <text x="100" y="121" textAnchor="middle" fontSize="13" fill={h ? '#fff' : '#888'} fontFamily="Georgia,serif" fontWeight="bold">RESTAURANT</text>
        {[28, 84, 140].map(x => (
          <g key={x}>
            <rect x={x} y="145" width="36" height="44" fill={h ? '#FFD9CC' : '#111'} stroke={h ? '#E07A5F' : '#444'} strokeWidth="1.5"/>
            <line x1={x + 18} y1="145" x2={x + 18} y2="189" stroke={h ? '#E07A5F' : '#333'} strokeWidth="1"/>
            <line x1={x} y1="167" x2={x + 36} y2="167" stroke={h ? '#E07A5F' : '#333'} strokeWidth="1"/>
          </g>
        ))}
        {[28, 140].map(x => (
          <g key={x}>
            <rect x={x} y="202" width="36" height="36" fill={h ? '#FFD9CC' : '#111'} stroke={h ? '#E07A5F' : '#444'} strokeWidth="1.5"/>
            <line x1={x + 18} y1="202" x2={x + 18} y2="238" stroke={h ? '#E07A5F' : '#333'} strokeWidth="1"/>
          </g>
        ))}
        <rect x="72" y="248" width="56" height="72" rx="28" fill={h ? '#C9604A' : '#222'} stroke={h ? '#E07A5F' : '#444'} strokeWidth="1.5"/>
        <circle cx="122" cy="282" r="3.5" fill={h ? '#FFD9CC' : '#555'}/>
        {h && (
          <>
            <line x1="18" y1="98" x2="182" y2="98" stroke="#FFD9CC" strokeWidth="1.5" strokeDasharray="8 6"/>
            {[30, 60, 90, 120, 150, 180].map(cx => (
              <circle key={cx} cx={cx} cy="98" r="3" fill="#FFE0B2" opacity="0.9"/>
            ))}
          </>
        )}
      </>
    ),
  },
  {
    id: 'artisan',
    label: 'Artisan',
    color: '#81B29A',
    w: 175,
    h: 295,
    vb: '0 0 175 295',
    render: (h: boolean) => (
      <>
        <rect x="12" y="130" width="151" height="165" fill={h ? '#81B29A' : '#2a2a2a'} stroke={h ? '#81B29A' : '#555'} strokeWidth="2"/>
        <polygon points="0,132 87.5,38 175,132" fill={h ? '#5D9280' : '#1a1a1a'} stroke={h ? '#81B29A' : '#555'} strokeWidth="2"/>
        <rect x="115" y="52" width="18" height="55" fill={h ? '#5D9280' : '#1a1a1a'} stroke={h ? '#81B29A' : '#555'} strokeWidth="1.5"/>
        {h && <><circle cx="124" cy="44" r="7" fill="#A8D5C2" opacity="0.5"/><circle cx="129" cy="34" r="5" fill="#A8D5C2" opacity="0.3"/></>}
        <polygon points="70,82 87.5,60 105,82" fill={h ? '#D4EDE5' : '#111'} stroke={h ? '#81B29A' : '#444'} strokeWidth="1.5"/>
        <rect x="22" y="133" width="131" height="26" fill={h ? '#A8D5C2' : '#333'} stroke={h ? '#81B29A' : '#444'} strokeWidth="1.5"/>
        <text x="87" y="151" textAnchor="middle" fontSize="12" fill={h ? '#fff' : '#888'} fontFamily="Georgia,serif" fontWeight="bold">ARTISAN</text>
        <rect x="18" y="172" width="68" height="60" fill={h ? '#D4EDE5' : '#111'} stroke={h ? '#81B29A' : '#444'} strokeWidth="1.5"/>
        <line x1="52" y1="172" x2="52" y2="232" stroke={h ? '#81B29A' : '#333'} strokeWidth="1.5"/>
        <line x1="18" y1="202" x2="86" y2="202" stroke={h ? '#81B29A' : '#333'} strokeWidth="1.5"/>
        <rect x="102" y="172" width="52" height="44" fill={h ? '#D4EDE5' : '#111'} stroke={h ? '#81B29A' : '#444'} strokeWidth="1.5"/>
        <line x1="128" y1="172" x2="128" y2="216" stroke={h ? '#81B29A' : '#333'} strokeWidth="1"/>
        <rect x="62" y="240" width="50" height="55" fill={h ? '#5D9280' : '#222'} stroke={h ? '#81B29A' : '#444'} strokeWidth="1.5"/>
        <circle cx="107" cy="266" r="3.5" fill={h ? '#fff' : '#555'}/>
        {h && (
          <>
            <line x1="35" y1="175" x2="35" y2="200" stroke="#5D9280" strokeWidth="2"/>
            <line x1="22" y1="190" x2="48" y2="190" stroke="#5D9280" strokeWidth="2"/>
          </>
        )}
      </>
    ),
  },
  {
    id: 'coiffeur',
    label: 'Coiffeur',
    color: '#F2CC8F',
    w: 165,
    h: 285,
    vb: '0 0 165 285',
    render: (h: boolean) => (
      <>
        <rect x="10" y="92" width="145" height="193" fill={h ? '#F2CC8F' : '#2a2a2a'} stroke={h ? '#F2CC8F' : '#555'} strokeWidth="2"/>
        <rect x="4" y="78" width="157" height="18" fill={h ? '#D4A843' : '#1a1a1a'} stroke={h ? '#F2CC8F' : '#555'} strokeWidth="2"/>
        <rect x="60" y="56" width="45" height="24" fill={h ? '#D4A843' : '#1a1a1a'} stroke={h ? '#F2CC8F' : '#555'} strokeWidth="1.5"/>
        <polygon points="60,56 82.5,38 105,56" fill={h ? '#F2CC8F' : '#333'} stroke={h ? '#F2CC8F' : '#555'} strokeWidth="1.5"/>
        <rect x="0" y="92" width="14" height="90" fill={h ? '#fff' : '#222'} stroke={h ? '#F2CC8F' : '#444'} strokeWidth="1.5"/>
        {h && [0, 1, 2, 3, 4].map(i => (
          <rect key={i} x="0" y={92 + i * 18} width="14" height="9" fill={i % 2 === 0 ? '#E07A5F' : '#4D8FAC'} opacity="0.9"/>
        ))}
        <circle cx="7" cy="90" r="7" fill={h ? '#F2CC8F' : '#333'} stroke={h ? '#F2CC8F' : '#444'} strokeWidth="1.5"/>
        <circle cx="7" cy="184" r="7" fill={h ? '#F2CC8F' : '#333'} stroke={h ? '#F2CC8F' : '#444'} strokeWidth="1.5"/>
        <rect x="18" y="95" width="129" height="28" fill={h ? '#FFE9BA' : '#333'} stroke={h ? '#F2CC8F' : '#444'} strokeWidth="1.5"/>
        <text x="82" y="114" textAnchor="middle" fontSize="13" fill={h ? '#8B6914' : '#888'} fontFamily="Georgia,serif" fontWeight="bold">COIFFEUR</text>
        {[18, 96].map(x => (
          <g key={x}>
            <rect x={x} y="136" width="51" height="52" fill={h ? '#FFF5DC' : '#111'} stroke={h ? '#F2CC8F' : '#444'} strokeWidth="1.5"/>
            <line x1={x + 25.5} y1="136" x2={x + 25.5} y2="188" stroke={h ? '#F2CC8F' : '#333'} strokeWidth="1"/>
            <line x1={x} y1="162" x2={x + 51} y2="162" stroke={h ? '#F2CC8F' : '#333'} strokeWidth="1"/>
          </g>
        ))}
        {[18, 96].map(x => (
          <rect key={x} x={x} y="200" width="51" height="36" fill={h ? '#FFF5DC' : '#111'} stroke={h ? '#F2CC8F' : '#444'} strokeWidth="1.5"/>
        ))}
        <rect x="55" y="245" width="55" height="40" rx="27" fill={h ? '#D4A843' : '#222'} stroke={h ? '#F2CC8F' : '#444'} strokeWidth="1.5"/>
        {h && (
          <>
            <line x1="82" y1="142" x2="96" y2="156" stroke="#8B6914" strokeWidth="1.5"/>
            <line x1="96" y1="142" x2="82" y2="156" stroke="#8B6914" strokeWidth="1.5"/>
          </>
        )}
      </>
    ),
  },
  {
    id: 'entrepreneur',
    label: 'Entrepreneur',
    color: '#4D8FAC',
    w: 180,
    h: 340,
    vb: '0 0 180 340',
    render: (h: boolean) => (
      <>
        <rect x="83" y="0" width="14" height="28" fill={h ? '#3A7A9C' : '#1a1a1a'} stroke={h ? '#4D8FAC' : '#555'} strokeWidth="1.5"/>
        <rect x="65" y="26" width="50" height="16" fill={h ? '#3A7A9C' : '#1a1a1a'} stroke={h ? '#4D8FAC' : '#555'} strokeWidth="1.5"/>
        <rect x="48" y="40" width="84" height="16" fill={h ? '#4D8FAC' : '#222'} stroke={h ? '#4D8FAC' : '#555'} strokeWidth="1.5"/>
        <rect x="24" y="54" width="132" height="286" fill={h ? '#4D8FAC' : '#2a2a2a'} stroke={h ? '#4D8FAC' : '#555'} strokeWidth="2"/>
        <rect x="24" y="56" width="132" height="26" fill={h ? '#7BB8CE' : '#333'} stroke={h ? '#4D8FAC' : '#444'} strokeWidth="1.5"/>
        <text x="90" y="73" textAnchor="middle" fontSize="10" fill={h ? '#fff' : '#888'} fontFamily="Georgia,serif" fontWeight="bold">ENTREPRENEUR</text>
        {[0, 1, 2, 3, 4, 5, 6, 7].map(row =>
          [0, 1, 2, 3].map(col => (
            <rect
              key={`${row}-${col}`}
              x={30 + col * 28}
              y={90 + row * 26}
              width="18" height="16"
              fill={h ? (row + col) % 2 === 0 ? '#C8E3EE' : '#A0D0E8' : '#111'}
              stroke={h ? '#4D8FAC' : '#333'} strokeWidth="0.8"
            />
          ))
        )}
        <rect x="70" y="310" width="40" height="30" fill={h ? '#3A7A9C' : '#222'} stroke={h ? '#4D8FAC' : '#444'} strokeWidth="1.5"/>
        <circle cx="106" cy="324" r="3" fill={h ? '#fff' : '#555'}/>
        <rect x="56" y="332" width="68" height="8" fill={h ? '#7BB8CE' : '#333'} stroke={h ? '#4D8FAC' : '#444'} strokeWidth="1"/>
        {h && <polygon points="90,2 90,18 106,10" fill="#3A7A9C" opacity="0.9"/>}
      </>
    ),
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    color: '#9E7BB5',
    w: 190,
    h: 290,
    vb: '0 0 190 290',
    render: (h: boolean) => (
      <>
        <rect x="8" y="80" width="174" height="210" fill={h ? '#9E7BB5' : '#2a2a2a'} stroke={h ? '#9E7BB5' : '#555'} strokeWidth="2"/>
        <rect x="2" y="66" width="186" height="18" fill={h ? '#7D5A9A' : '#1a1a1a'} stroke={h ? '#9E7BB5' : '#555'} strokeWidth="2"/>
        {[14, 50, 86, 122, 158].map(x => (
          <rect key={x} x={x} y="52" width="18" height="16" fill={h ? '#7D5A9A' : '#1a1a1a'} stroke={h ? '#9E7BB5' : '#555'} strokeWidth="1.5"/>
        ))}
        <rect x="16" y="83" width="158" height="30" fill={h ? '#C4A8D8' : '#333'} stroke={h ? '#9E7BB5' : '#444'} strokeWidth="1.5"/>
        <text x="95" y="103" textAnchor="middle" fontSize="13" fill={h ? '#fff' : '#888'} fontFamily="Georgia,serif" fontWeight="bold">E-COMMERCE</text>
        <rect x="16" y="126" width="158" height="70" fill={h ? '#EDE0F5' : '#111'} stroke={h ? '#9E7BB5' : '#444'} strokeWidth="2"/>
        <line x1="69" y1="126" x2="69" y2="196" stroke={h ? '#9E7BB5' : '#333'} strokeWidth="1.5"/>
        <line x1="121" y1="126" x2="121" y2="196" stroke={h ? '#9E7BB5' : '#333'} strokeWidth="1.5"/>
        {h ? (
          <>
            <rect x="22" y="132" width="40" height="58" fill="#C4A8D8" rx="3" opacity="0.8"/>
            <rect x="74" y="128" width="40" height="62" fill="#B494CC" rx="3" opacity="0.9"/>
            <rect x="126" y="134" width="40" height="56" fill="#C4A8D8" rx="3" opacity="0.8"/>
            <text x="42" y="168" textAnchor="middle" fontSize="7" fill="#fff">★</text>
            <text x="94" y="166" textAnchor="middle" fontSize="7" fill="#fff">★★</text>
            <text x="146" y="168" textAnchor="middle" fontSize="7" fill="#fff">★</text>
          </>
        ) : (
          <>
            <rect x="22" y="132" width="40" height="58" fill="#1a1a1a" rx="2" opacity="0.6"/>
            <rect x="74" y="128" width="40" height="62" fill="#1a1a1a" rx="2" opacity="0.6"/>
            <rect x="126" y="134" width="40" height="56" fill="#1a1a1a" rx="2" opacity="0.6"/>
          </>
        )}
        {[16, 72, 128].map(x => (
          <rect key={x} x={x} y="46" width="24" height="18" fill={h ? '#EDE0F5' : '#111'} stroke={h ? '#9E7BB5' : '#333'} strokeWidth="1"/>
        ))}
        <rect x="75" y="216" width="40" height="50" rx="3" fill={h ? '#7D5A9A' : '#222'} stroke={h ? '#9E7BB5' : '#444'} strokeWidth="1.5"/>
        <circle cx="111" cy="240" r="3" fill={h ? '#EDE0F5' : '#555'}/>
        <rect x="62" y="260" width="66" height="8" fill={h ? '#C4A8D8' : '#333'} stroke={h ? '#9E7BB5' : '#444'} strokeWidth="1"/>
      </>
    ),
  },
]

function Tree({ x = 0, scale = 1 }: { x?: number; scale?: number }) {
  return (
    <g transform={`translate(${x},0) scale(${scale})`}>
      <rect x="-6" y="-28" width="12" height="28" fill="#222"/>
      <polygon points="0,-80 -24,-36 24,-36" fill="#1a1a1a"/>
      <polygon points="0,-100 -18,-62 18,-62" fill="#111"/>
    </g>
  )
}

function Lamppost({ x = 0 }: { x?: number }) {
  return (
    <g transform={`translate(${x},0)`}>
      <rect x="-3" y="-90" width="6" height="90" fill="#222"/>
      <path d="M 0 -88 Q 18 -88 18 -76" stroke="#222" strokeWidth="4" fill="none"/>
      <rect x="12" y="-82" width="12" height="8" rx="3" fill="#FFE9BA" opacity="0.9"/>
    </g>
  )
}

function Bench({ x = 0 }: { x?: number }) {
  return (
    <g transform={`translate(${x},0)`}>
      <rect x="-18" y="-14" width="36" height="5" rx="2" fill="#333"/>
      <rect x="-18" y="-24" width="36" height="4" rx="2" fill="#2a2a2a"/>
      <rect x="-14" y="-9" width="4" height="9" rx="1" fill="#333"/>
      <rect x="10" y="-9" width="4" height="9" rx="1" fill="#333"/>
    </g>
  )
}

function Cloud({ x = 0, y = -30, size = 1 }: { x?: number; y?: number; size?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${size})`} opacity="0.35">
      <ellipse cx="0" cy="0" rx="28" ry="16" fill="#ccc"/>
      <ellipse cx="-18" cy="4" rx="18" ry="12" fill="#ccc"/>
      <ellipse cx="18" cy="4" rx="20" ry="12" fill="#ccc"/>
    </g>
  )
}

export function CityShowcase() {
  const [hovered, setHovered] = useState<string | null>(null)

  const GROUND_Y = 360
  const TOTAL_W = 1200
  const TOTAL_H = 400

  const layout = [
    { id: 'restaurant',   x: 0,   bw: 200, bh: 320 },
    { id: 'artisan',      x: 200, bw: 175, bh: 295 },
    { id: 'coiffeur',     x: 375, bw: 165, bh: 285 },
    { id: 'entrepreneur', x: 540, bw: 180, bh: 340 },
    { id: 'ecommerce',    x: 720, bw: 190, bh: 290 },
  ]

  return (
    <section className="py-24 md:py-32 px-4 md:px-8 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-inter text-xs tracking-[0.25em] text-[#6B6B6B] uppercase mb-4">
            Clientèle
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl text-[#1A1A1A]">
            Types d&apos;entreprises avec lesquels
            <br />
            <em className="italic text-[#6B6B6B]">nous travaillons.</em>
          </h2>
        </div>

        {/* City scene */}
        <div className="relative overflow-x-auto">
          <svg
            viewBox={`-30 0 ${TOTAL_W} ${TOTAL_H}`}
            width="100%"
            preserveAspectRatio="xMidYMax meet"
            style={{ minWidth: 680 }}
          >
            <Cloud x={80}   y={30} size={1.1}/>
            <Cloud x={320}  y={18} size={0.8}/>
            <Cloud x={570}  y={40} size={1.2}/>
            <Cloud x={800}  y={25} size={0.9}/>
            <Cloud x={1050} y={35} size={1.0}/>

            {/* Ground / pavement */}
            <rect x="-30" y={GROUND_Y} width={TOTAL_W} height="40" fill="#D6D3D1"/>
            {Array.from({ length: 30 }).map((_, i) => (
              <rect key={i} x={-30 + i * 40} y={GROUND_Y} width="38" height="40" fill="none" stroke="#C4C0BC" strokeWidth="0.8"/>
            ))}
            {/* Road */}
            <rect x="-30" y={GROUND_Y + 36} width={TOTAL_W} height="16" fill="#1a1a1a"/>
            {Array.from({ length: 20 }).map((_, i) => (
              <rect key={i} x={-10 + i * 60} y={GROUND_Y + 42} width="35" height="4" fill="#555"/>
            ))}

            {/* Lampposts */}
            <g transform={`translate(194,${GROUND_Y})`}><Lamppost x={0}/></g>
            <g transform={`translate(372,${GROUND_Y})`}><Lamppost x={0}/></g>
            <g transform={`translate(535,${GROUND_Y})`}><Lamppost x={0}/></g>
            <g transform={`translate(720,${GROUND_Y})`}><Lamppost x={0}/></g>
            <g transform={`translate(912,${GROUND_Y})`}><Lamppost x={0}/></g>

            {/* Trees */}
            <g transform={`translate(950,${GROUND_Y})`}><Tree x={0} scale={0.9}/></g>
            <g transform={`translate(1000,${GROUND_Y})`}><Tree x={0} scale={1.1}/></g>
            <g transform={`translate(1060,${GROUND_Y})`}><Tree x={0} scale={0.8}/></g>
            <g transform={`translate(1110,${GROUND_Y})`}><Tree x={0} scale={1.0}/></g>

            {/* Bench */}
            <g transform={`translate(1020,${GROUND_Y})`}><Bench x={0}/></g>

            {/* Buildings */}
            {layout.map((item) => {
              const bdef = BUILDINGS.find(b => b.id === item.id)
              if (!bdef) return null
              const isH = hovered === item.id
              const buildingY = GROUND_Y - item.bh
              return (
                <g
                  key={item.id}
                  style={{
                    cursor: 'pointer',
                    transition: 'transform 0.35s cubic-bezier(0.21,0.47,0.32,0.98), filter 0.35s',
                    transformOrigin: `${item.x + item.bw / 2}px ${GROUND_Y}px`,
                    transform: isH
                      ? `translate(${item.x}px,${buildingY - 12}px) scale(1.06)`
                      : `translate(${item.x}px,${buildingY}px) scale(1)`,
                    filter: isH ? `drop-shadow(0 0 18px ${bdef.color}99)` : 'none',
                  }}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <svg viewBox={bdef.vb} width={item.bw} height={item.bh} overflow="visible">
                    {bdef.render(isH)}
                  </svg>
                </g>
              )
            })}

            {/* Labels */}
            {layout.map((item) => {
              const bdef = BUILDINGS.find(b => b.id === item.id)
              if (!bdef) return null
              const isH = hovered === item.id
              return (
                <text
                  key={item.id}
                  x={item.x + item.bw / 2}
                  y={GROUND_Y + 20}
                  textAnchor="middle"
                  fontSize="13"
                  fontFamily="Georgia,serif"
                  fontStyle="italic"
                  fill={isH ? bdef.color : '#6B6B6B'}
                  style={{ transition: 'fill 0.3s', pointerEvents: 'none' }}
                >
                  {bdef.label}
                </text>
              )
            })}
          </svg>
        </div>
      </div>
    </section>
  )
}

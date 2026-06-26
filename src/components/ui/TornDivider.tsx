'use client'

// Points du bord déchiré, de droite à gauche, sur un viewBox 1440×80
const TORN: [number, number][] = [
  [1440, 44], [1422, 38], [1405, 54], [1387, 30], [1369, 52], [1351, 38],
  [1332, 56], [1314, 28], [1296, 50], [1278, 36], [1259, 55], [1241, 32],
  [1222, 52], [1204, 38], [1185, 58], [1167, 28], [1148, 50], [1130, 36],
  [1111, 55], [1092, 30], [1073, 52], [1054, 38], [1035, 57], [1016, 26],
  [997,  50], [978,  36], [959,  55], [940,  32], [921,  52], [902,  38],
  [883,  58], [864,  28], [845,  50], [826,  36], [807,  55], [788,  30],
  [769,  52], [750,  38], [731,  57], [712,  26], [693,  50], [674,  36],
  [655,  55], [636,  32], [617,  52], [598,  38], [579,  58], [560,  28],
  [541,  50], [522,  36], [503,  55], [484,  30], [465,  52], [446,  38],
  [427,  57], [408,  26], [389,  50], [370,  36], [351,  55], [332,  32],
  [313,  52], [294,  38], [275,  58], [256,  28], [237,  50], [218,  36],
  [199,  55], [180,  30], [161,  52], [142,  38], [123,  57], [104,  26],
  [85,   50], [66,   36], [47,   55], [28,   32], [0,    42],
]

export function TornDivider() {
  const pts = TORN.map(([x, y]) => `${x},${y}`).join(' L')

  // Chemin remplissant la section du dessus jusqu'au bord déchiré
  const topPath = `M0,0 L1440,0 L${pts} Z`

  // Chemin de l'arête pour le reflet blanc et l'ombre
  const edge = `M1440,44 L${pts}`

  return (
    <div
      aria-hidden="true"
      style={{ position: 'relative', height: 80, zIndex: 5, pointerEvents: 'none', overflow: 'hidden' }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        <defs>
          <filter id="torn-drop" x="-2%" y="-20%" width="104%" height="150%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(0,0,0,0.12)" />
          </filter>
        </defs>

        {/* Fond de la section du dessous (ProcessSection) */}
        <rect width="1440" height="80" fill="#EBEBEB" />

        {/* Remplissage de la section du dessus avec bord déchiré + ombre portée */}
        <path d={topPath} fill="#F4F4F4" filter="url(#torn-drop)" />

        {/* Ombre fine sous l'arête (profondeur papier) */}
        <path
          d={edge}
          fill="none"
          stroke="rgba(0,0,0,0.10)"
          strokeWidth="3"
          strokeLinejoin="round"
          transform="translate(0,4)"
        />

        {/* Reflet blanc sur l'arête déchirée */}
        <path
          d={edge}
          fill="none"
          stroke="rgba(255,255,255,0.90)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

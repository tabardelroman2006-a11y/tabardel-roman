'use client'

// Coordonnées du bord déchiré — conçues à la main pour simuler du vrai papier :
// - espacements très irréguliers (3px à 30px)
// - zones calmes (fibres fines, petite amplitude) vs. grands arrachements (y extrêmes)
// - clusters de fibres denses autour des gros déchirements
const TORN: [number, number][] = [
  // Départ progressif
  [0,54],[7,50],[13,57],[18,52],[22,56],
  // Petite déchirure montante
  [29,44],[34,51],[38,47],[42,54],
  // Fibres fines
  [46,58],[49,53],[52,58],[55,54],[58,60],
  // Grand arrachement vers le bas
  [65,72],[68,64],[72,70],[76,62],
  // Fibres de récupération
  [80,56],[83,60],[86,56],[89,62],[92,57],
  // Calme
  [103,52],[112,56],[119,50],[126,54],
  // Déchirure massive vers le haut
  [133,32],[136,26],[139,34],[142,28],[145,40],
  [150,54],
  // Fibres après gros arrachement
  [155,48],[158,55],[161,50],[164,57],[167,52],
  // Moyen vers le bas
  [174,66],[178,59],[182,65],
  // Fibres
  [187,56],[190,61],[193,57],[196,63],
  // Calme étiré
  [210,52],[220,56],[229,51],[237,55],
  // Petit pic haut
  [244,41],[249,49],[253,44],[257,54],
  // Fibres
  [261,58],[264,53],[267,59],[270,54],
  // Déchirure vers le bas
  [277,70],[281,63],[285,69],[288,60],
  [293,54],
  // Fibres dense
  [297,50],[300,56],[303,52],[306,58],[309,54],[312,60],
  // Calme
  [325,52],[334,56],[342,50],
  // Grand arrachement bas
  [349,76],[352,68],[356,74],[359,65],[363,71],
  [368,58],
  // Fibres
  [372,52],[375,57],[378,53],[381,59],[384,55],
  // Moyen haut
  [391,40],[395,48],[399,43],[403,55],
  // Fibres
  [407,59],[410,54],[413,60],[416,56],[419,62],
  // Calme
  [432,52],[441,56],[449,50],[457,54],
  // Déchirure massive haut
  [464,28],[467,22],[470,32],[473,25],[476,38],
  [482,54],
  // Fibres denses
  [486,48],[489,55],[492,51],[495,57],[498,53],[501,59],
  // Moyen bas
  [508,68],[512,61],[516,67],[520,58],
  [525,52],
  // Fibres
  [529,56],[532,52],[535,58],[538,54],
  // Calme étiré
  [550,50],[560,54],[569,50],[577,54],
  // Pic haut
  [584,38],[588,46],[591,41],[595,54],
  // Fibres
  [599,58],[602,52],[605,58],[608,54],[611,60],
  // Déchirure bas
  [618,74],[621,66],[625,72],[629,62],
  [634,54],
  // Fibres
  [638,50],[641,56],[644,52],[647,58],[650,54],
  // Calme
  [662,52],[672,56],[681,50],[689,54],
  // Grand arrachement haut
  [697,30],[700,24],[703,34],[706,27],[709,40],
  [715,56],
  // Fibres
  [719,50],[722,57],[725,53],[728,59],[731,55],
  // Bas moyen
  [738,67],[742,59],[746,65],[750,56],
  [755,52],
  // Fibres
  [759,56],[762,52],[765,58],[768,54],
  // Calme
  [780,50],[790,54],[800,50],[809,54],
  // Déchirure massive bas
  [816,80],[819,72],[823,78],[826,70],[829,76],
  [834,62],
  // Fibres dense après choc
  [838,54],[841,58],[844,54],[847,60],[850,56],[853,62],[856,57],
  // Calme
  [868,52],[878,56],[887,50],[895,54],
  // Pic haut moyen
  [902,38],[906,46],[910,42],[914,56],
  // Fibres
  [918,60],[921,54],[924,61],[927,56],[930,62],
  // Bas
  [937,70],[941,62],[945,68],[949,58],
  [954,52],
  // Fibres
  [958,56],[961,52],[964,58],[967,54],
  // Calme
  [979,50],[989,54],[998,50],
  // Grand arrachement haut
  [1005,28],[1008,22],[1011,32],[1014,26],[1017,40],
  [1023,56],
  // Fibres
  [1027,50],[1030,57],[1033,52],[1036,58],[1039,54],[1042,60],
  // Bas moyen
  [1049,70],[1053,62],[1057,68],[1061,58],
  [1066,52],
  // Fibres
  [1070,56],[1073,52],[1076,58],[1079,54],
  // Calme
  [1092,50],[1102,54],[1111,50],[1119,54],
  // Pic haut
  [1126,36],[1130,44],[1133,40],[1137,54],
  // Fibres
  [1141,58],[1144,52],[1147,59],[1150,54],[1153,60],
  // Bas dramatique
  [1160,74],[1163,66],[1167,72],[1170,62],
  [1175,54],
  // Fibres
  [1179,50],[1182,56],[1185,52],[1188,58],[1191,54],
  // Calme
  [1203,52],[1212,56],[1220,50],[1228,54],
  // Déchirure haut
  [1235,34],[1238,28],[1241,38],[1244,30],[1247,44],
  [1253,56],
  // Fibres
  [1257,50],[1260,57],[1263,52],[1266,58],[1269,54],[1272,60],
  // Bas moyen
  [1279,70],[1283,62],[1287,68],[1291,57],
  [1296,52],
  // Fibres finales
  [1300,56],[1303,52],[1306,58],[1309,54],
  // Fin progressive
  [1322,50],[1332,54],[1341,50],[1350,54],
  [1357,40],[1361,48],[1365,44],[1369,56],
  [1375,60],[1379,54],[1383,58],[1387,54],[1390,60],
  [1399,52],[1408,56],[1417,50],[1425,54],[1432,52],[1440,56],
]

export function TornDivider() {
  const W = 1440
  const H = 100

  // Chemin remplissant la section ServicesSection (du haut jusqu'à l'arête)
  const reversed = [...TORN].reverse()
  const topFill = `M0,0 L${W},0 L${reversed.map(([x, y]) => `${x},${y}`).join(' L')} Z`

  // Arête principale (gauche → droite)
  const edge = TORN.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')

  // Épaisseur du papier : bande blanche de 4px sous l'arête
  const paperThickness =
    TORN.map(([x, y]) => `${x},${y}`).join(' L') +
    ' L' +
    reversed.map(([x, y]) => `${x},${y + 4}`).join(' L') +
    ' Z'

  return (
    <div
      aria-hidden="true"
      style={{ position: 'relative', height: H, zIndex: 5, pointerEvents: 'none', overflow: 'visible' }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          {/* Ombre portée sous l'arête déchirée */}
          <filter id="paper-shadow" x="-2%" y="-5%" width="104%" height="120%" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#00000022" />
          </filter>
        </defs>

        {/* Fond ProcessSection */}
        <rect width={W} height={H} fill="#EBEBEB" />

        {/* Corps du papier supérieur avec arête déchirée + ombre portée */}
        <path d={topFill} fill="#F4F4F4" filter="url(#paper-shadow)" />

        {/* Tranche blanche du papier (épaisseur physique de 4px) */}
        <path d={`M${paperThickness}`} fill="#FFFFFF" opacity="0.95" />

        {/* Ombre fine sous la tranche (donne de la profondeur) */}
        <path
          d={edge}
          fill="none"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="4"
          strokeLinejoin="round"
          transform="translate(0,5)"
        />

        {/* Reflet lumineux sur le bord supérieur de la tranche */}
        <path
          d={edge}
          fill="none"
          stroke="rgba(255,255,255,1)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/* Galerie d'exposition en 3D, parcourue au defilement (facon Persepolis
   Reimagined). Tout est construit en code : aucun modele 3D a charger.
   Comme chez Persepolis, la lumiere des oeuvres est "peinte" (halos
   additifs) plutot que calculee, ce qui garde la scene legere. */

export type GalleryContent = {
  services: { number: string; title: string; desc: string; points: string[] }[]
  steps: { num: string; title: string; sub: string; desc: string }[]
  works: { image: string; title: string; category: string }[]
  portrait: string
  landscape: string
}

type V3 = [number, number, number]
type Key = { p: number; pos: V3; look: V3; shift?: V3 }

/* Trajet de la camera. Deux cles identiques = arret devant une oeuvre.
   `shift` decale le regard pour laisser la place au texte a gauche
   (annule sur ecran vertical, ou le texte passe en bas). */
const KEYS: Key[] = [
  { p: 0.0, pos: [0, 1.7, 9], look: [0, 2.1, -60] },
  { p: 0.03, pos: [0, 1.7, 9], look: [0, 2.1, -60] },
  { p: 0.09, pos: [0, 1.7, -16.5], look: [3, 2.3, -30] },
  { p: 0.12, pos: [-0.6, 1.7, -19], look: [5, 2.5, -19], shift: [0, 0, -1.5] },
  { p: 0.155, pos: [-0.6, 1.7, -19], look: [5, 2.5, -19], shift: [0, 0, -1.5] },
  { p: 0.18, pos: [0, 1.7, -22], look: [0, 2.2, -60] },
  { p: 0.205, pos: [0.6, 1.7, -25], look: [-5, 2.5, -25], shift: [0, 0, 1.5] },
  { p: 0.24, pos: [0.6, 1.7, -25], look: [-5, 2.5, -25], shift: [0, 0, 1.5] },
  { p: 0.265, pos: [0, 1.7, -28], look: [0, 2.2, -60] },
  { p: 0.29, pos: [-0.6, 1.7, -31], look: [5, 2.5, -31], shift: [0, 0, -1.5] },
  { p: 0.325, pos: [-0.6, 1.7, -31], look: [5, 2.5, -31], shift: [0, 0, -1.5] },
  { p: 0.375, pos: [0, 1.7, -38], look: [-5, 2.2, -47] },
  { p: 0.41, pos: [-0.8, 1.7, -45], look: [-5, 2.3, -45], shift: [0, 0, 1.3] },
  { p: 0.47, pos: [-0.8, 1.7, -45], look: [-5, 2.3, -45], shift: [0, 0, 1.3] },
  { p: 0.52, pos: [0.2, 1.7, -55.5], look: [5, 2.4, -63] },
  { p: 0.55, pos: [0.4, 1.7, -60], look: [5, 2.4, -60], shift: [0, 0, -1.8] },
  { p: 0.595, pos: [0.4, 1.7, -60], look: [5, 2.4, -60], shift: [0, 0, -1.8] },
  { p: 0.625, pos: [0, 1.7, -63], look: [0, 2.2, -95] },
  { p: 0.655, pos: [-0.4, 1.7, -66], look: [-5, 2.4, -66], shift: [0, 0, 1.8] },
  { p: 0.7, pos: [-0.4, 1.7, -66], look: [-5, 2.4, -66], shift: [0, 0, 1.8] },
  { p: 0.75, pos: [0, 1.75, -73.3], look: [0, 1.45, -81] },
  { p: 0.86, pos: [0, 1.75, -73.3], look: [0, 1.45, -81] },
  { p: 0.92, pos: [0, 1.7, -86], look: [0, 2.6, -112] },
  { p: 1.0, pos: [0, 2.3, -97], look: [0, 2.8, -112] },
]

const W = 5
const H = 6
const Z_START = 12
const Z_END = -100
const PORTALS = [
  { z: -15, label: '01 · SERVICES' },
  { z: -35, label: '02 · QUI SOMMES-NOUS' },
  { z: -55, label: '03 · RÉALISATIONS' },
  { z: -72, label: '04 · PROCESSUS' },
]
const OPEN_W = 3.6
const OPEN_H = 4.4
const WALL_T = 0.6

const COLORS = {
  fog: '#100e0c',
  wall: '#cdc5b9',
  ceiling: '#1b1a18',
  floor: '#8a8178',
  light: '#ffe0bd',
  paper: '#F4F4F4',
  ink: '#1A1A1A',
  inkMuted: '#6B6B6B',
  inkFaint: '#AAAAAA',
}

const same = (a: V3, b: V3) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2]
const smooth = (t: number) => t * t * (3 - 2 * t)
const easeIn = (t: number) => t * t * (2 - t)
const easeOut = (t: number) => 1 - easeIn(1 - t)
const cr = (a: number, b: number, c: number, d: number, t: number) =>
  0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t)

function sample(p: number, get: (k: Key) => V3, out: THREE.Vector3) {
  const n = KEYS.length
  let i = 0
  while (i < n - 2 && p > KEYS[i + 1].p) i++
  const k1 = KEYS[i]
  const k2 = KEYS[i + 1]
  const a = get(KEYS[Math.max(0, i - 1)])
  const b = get(k1)
  const c = get(k2)
  const d = get(KEYS[Math.min(n - 1, i + 2)])
  if (same(b, c)) return out.set(b[0], b[1], b[2])
  let t = THREE.MathUtils.clamp((p - k1.p) / (k2.p - k1.p), 0, 1)
  const holdStart = i > 0 && same(get(KEYS[i - 1]), b)
  const holdEnd = i + 2 < n && same(get(KEYS[i + 2]), c)
  if (holdStart && holdEnd) t = smooth(t)
  else if (holdStart) t = easeIn(t)
  else if (holdEnd) t = easeOut(t)
  return out.set(cr(a[0], b[0], c[0], d[0], t), cr(a[1], b[1], c[1], d[1], t), cr(a[2], b[2], c[2], d[2], t))
}

function cssVar(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxW: number) {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    const test = line ? line + ' ' + w : w
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line)
      line = w
    } else line = test
  }
  if (line) lines.push(line)
  return lines
}

export class GalleryScene {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(50, 1, 0.1, 260)
  private disposables: { dispose: () => void }[] = []
  private accentMaterials: THREE.MeshBasicMaterial[] = []
  private redrawers: (() => void)[] = []
  private dust!: THREE.Points
  private dustBase!: Float32Array
  private pos = new THREE.Vector3()
  private look = new THREE.Vector3()
  private shift = new THREE.Vector3()
  private mouse = new THREE.Vector2()
  private mouseSmooth = new THREE.Vector2()
  private aspect = 1
  private accent = '#1B3A6B'
  private fonts = { display: 'sans-serif', body: 'sans-serif' }
  private manager = new THREE.LoadingManager()
  private loader = new THREE.TextureLoader(this.manager)

  constructor(
    private canvas: HTMLCanvasElement,
    private content: GalleryContent,
    onProgress: (ratio: number) => void,
    onReady: () => void,
  ) {
    const mobile = window.matchMedia('(max-width: 767px)').matches
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 1.75))
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.05
    this.renderer.outputColorSpace = THREE.SRGBColorSpace

    this.scene.background = new THREE.Color(COLORS.fog)
    this.scene.fog = new THREE.FogExp2(COLORS.fog, 0.026)

    const pmrem = new THREE.PMREMGenerator(this.renderer)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    this.scene.environment = env
    this.scene.environmentIntensity = 0.22
    pmrem.dispose()
    this.disposables.push(env)

    this.manager.onProgress = (_url, loaded, total) => onProgress(loaded / total)
    this.manager.onLoad = () => onReady()

    this.accent = cssVar('--rt-primary', this.accent)
    const barlow = cssVar('--font-barlow', '')
    const nunito = cssVar('--font-nunito', '')
    if (barlow) this.fonts.display = barlow
    if (nunito) this.fonts.body = nunito

    this.build()
    this.loadFontsThenRedraw()
  }

  private async loadFontsThenRedraw() {
    try {
      await Promise.all([
        document.fonts.load(`800 120px ${this.fonts.display}`),
        document.fonts.load(`700 60px ${this.fonts.display}`),
        document.fonts.load(`400 40px ${this.fonts.body}`),
        document.fonts.load(`700 40px ${this.fonts.body}`),
      ])
    } catch {}
    this.redrawAll()
  }

  private redrawAll() {
    for (const r of this.redrawers) r()
  }

  setAccent(color: string) {
    if (!color || color === this.accent) return
    this.accent = color
    for (const m of this.accentMaterials) m.color.set(color)
    this.redrawAll()
  }

  private track<T extends { dispose: () => void }>(o: T) {
    this.disposables.push(o)
    return o
  }

  private canvasTexture(w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void) {
    const c = document.createElement('canvas')
    c.width = w
    c.height = h
    const ctx = c.getContext('2d')!
    const tex = this.track(new THREE.CanvasTexture(c))
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
    const redraw = () => {
      ctx.clearRect(0, 0, w, h)
      draw(ctx)
      tex.needsUpdate = true
    }
    redraw()
    this.redrawers.push(redraw)
    return tex
  }

  private image(url: string) {
    const tex = this.track(this.loader.load(url))
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
    return tex
  }

  private mesh(geo: THREE.BufferGeometry, mat: THREE.Material) {
    this.track(geo)
    this.track(mat)
    const m = new THREE.Mesh(geo, mat)
    this.scene.add(m)
    return m
  }

  private build() {
    const s = this.scene
    const length = Z_START - Z_END

    const concrete = this.canvasTexture(512, 512, ctx => {
      ctx.fillStyle = '#7a746c'
      ctx.fillRect(0, 0, 512, 512)
      const img = ctx.getImageData(0, 0, 512, 512)
      let seed = 7
      const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
      for (let i = 0; i < img.data.length; i += 4) {
        const n = (rnd() - 0.5) * 26
        img.data[i] += n
        img.data[i + 1] += n
        img.data[i + 2] += n
      }
      ctx.putImageData(img, 0, 0)
      ctx.strokeStyle = 'rgba(0,0,0,0.35)'
      ctx.lineWidth = 2
      ctx.strokeRect(0, 0, 512, 512)
    })
    concrete.wrapS = concrete.wrapT = THREE.RepeatWrapping
    concrete.repeat.set(W, length / 2)

    const floor = this.mesh(
      new THREE.PlaneGeometry(W * 2, length),
      new THREE.MeshStandardMaterial({ color: COLORS.floor, map: concrete, roughness: 0.42, metalness: 0 }),
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.set(0, 0, (Z_START + Z_END) / 2)

    const ceiling = this.mesh(
      new THREE.PlaneGeometry(W * 2, length),
      new THREE.MeshLambertMaterial({ color: COLORS.ceiling }),
    )
    ceiling.rotation.x = Math.PI / 2
    ceiling.position.set(0, H, (Z_START + Z_END) / 2)

    /* Ombre douce peinte en bas et en haut des murs (au lieu de la calculer) */
    const plaster = this.canvasTexture(256, 512, ctx => {
      const g = ctx.createLinearGradient(0, 0, 0, 512)
      g.addColorStop(0, '#6f6a63')
      g.addColorStop(0.1, '#e6e1d9')
      g.addColorStop(0.8, '#ffffff')
      g.addColorStop(0.95, '#bdb7ae')
      g.addColorStop(1, '#7d776f')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, 256, 512)
      const img = ctx.getImageData(0, 0, 256, 512)
      let seed = 3
      const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
      for (let i = 0; i < img.data.length; i += 4) {
        const n = (rnd() - 0.5) * 10
        img.data[i] += n
        img.data[i + 1] += n
        img.data[i + 2] += n
      }
      ctx.putImageData(img, 0, 0)
    })
    plaster.wrapS = THREE.RepeatWrapping
    plaster.repeat.set(length / 4, 1)
    const wallMat = this.track(new THREE.MeshLambertMaterial({ color: COLORS.wall, map: plaster }))
    const partitionMat = this.track(new THREE.MeshLambertMaterial({ color: COLORS.wall }))
    const wallGeo = this.track(new THREE.PlaneGeometry(length, H))
    for (const side of [-1, 1]) {
      const w = new THREE.Mesh(wallGeo, wallMat)
      w.rotation.y = -side * Math.PI / 2
      w.position.set(side * W, H / 2, (Z_START + Z_END) / 2)
      s.add(w)
    }
    const back = new THREE.Mesh(this.track(new THREE.PlaneGeometry(W * 2, H)), wallMat)
    back.rotation.y = Math.PI
    back.position.set(0, H / 2, Z_START)
    s.add(back)

    const darkMat = this.track(new THREE.MeshLambertMaterial({ color: '#1d1b18' }))
    const skirting = this.track(new THREE.BoxGeometry(0.04, 0.14, length))
    for (const side of [-1, 1]) {
      const b = new THREE.Mesh(skirting, darkMat)
      b.position.set(side * (W - 0.02), 0.07, (Z_START + Z_END) / 2)
      s.add(b)
    }
    const beamGeo = this.track(new THREE.BoxGeometry(W * 2, 0.35, 0.22))
    const beamCount = Math.floor(length / 3)
    const beams = new THREE.InstancedMesh(beamGeo, darkMat, beamCount)
    const m4 = new THREE.Matrix4()
    for (let i = 0; i < beamCount; i++) {
      beams.setMatrixAt(i, m4.makeTranslation(0, H - 0.175, Z_START - 1.5 - i * 3))
    }
    s.add(beams)

    const accentMat = () => {
      const m = this.track(new THREE.MeshBasicMaterial({ color: this.accent, toneMapped: false }))
      this.accentMaterials.push(m)
      return m
    }

    const box = (w: number, h: number, d: number, x: number, y: number, z: number, mat: THREE.Material) => {
      const b = new THREE.Mesh(this.track(new THREE.BoxGeometry(w, h, d)), mat)
      b.position.set(x, y, z)
      s.add(b)
      return b
    }

    for (const portal of PORTALS) {
      const side = (W * 2 - OPEN_W) / 2
      box(side, H, WALL_T, -W + side / 2, H / 2, portal.z, partitionMat)
      box(side, H, WALL_T, W - side / 2, H / 2, portal.z, partitionMat)
      box(OPEN_W, H - OPEN_H, WALL_T, 0, OPEN_H + (H - OPEN_H) / 2, portal.z, partitionMat)
      const am = accentMat()
      const e = 0.045
      box(e, OPEN_H, WALL_T + 0.02, -OPEN_W / 2 + e / 2, OPEN_H / 2, portal.z, am)
      box(e, OPEN_H, WALL_T + 0.02, OPEN_W / 2 - e / 2, OPEN_H / 2, portal.z, am)
      box(OPEN_W, e, WALL_T + 0.02, 0, OPEN_H - e / 2, portal.z, am)

      const label = this.canvasTexture(1024, 128, ctx => {
        ctx.fillStyle = 'rgba(40,34,28,0.78)'
        ctx.font = `700 64px ${this.fonts.display}`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ;(ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '14px'
        ctx.fillText(portal.label, 512, 66)
      })
      const lm = this.mesh(
        new THREE.PlaneGeometry(4.4, 0.55),
        new THREE.MeshStandardMaterial({ map: label, transparent: true, roughness: 0.9 }),
      )
      lm.position.set(0, OPEN_H + (H - OPEN_H) / 2, portal.z + WALL_T / 2 + 0.01)
    }

    const endZ = Z_END
    const winW = 8.8
    const winB = 0.8
    const winT = 5.2
    const sideW = (W * 2 - winW) / 2
    box(sideW, H, WALL_T, -W + sideW / 2, H / 2, endZ, partitionMat)
    box(sideW, H, WALL_T, W - sideW / 2, H / 2, endZ, partitionMat)
    box(winW, winB, WALL_T, 0, winB / 2, endZ, partitionMat)
    box(winW, H - winT, WALL_T, 0, winT + (H - winT) / 2, endZ, partitionMat)

    const land = this.mesh(
      new THREE.PlaneGeometry(40, 26.7),
      new THREE.MeshBasicMaterial({ map: this.image(this.content.landscape), fog: false, toneMapped: false }),
    )
    land.position.set(0, 3, -118)

    const glow = this.canvasTexture(256, 512, ctx => {
      const img = ctx.createImageData(256, 512)
      for (let y = 0; y < 512; y++) {
        const v = y / 511
        const half = 0.07 + 0.36 * v
        for (let x = 0; x < 256; x++) {
          const u = Math.abs(x / 255 - 0.5)
          const beam = 1 - THREE.MathUtils.smoothstep(u, half * 0.35, half)
          const fade = (0.25 + 0.75 * v) * (1 - THREE.MathUtils.smoothstep(v, 0.82, 1))
          const a = Math.max(0, beam * fade)
          const i = (y * 256 + x) * 4
          img.data[i] = img.data[i + 1] = img.data[i + 2] = Math.round(255 * a)
          img.data[i + 3] = 255
        }
      }
      ctx.putImageData(img, 0, 0)
    })
    const glowMat = this.track(
      new THREE.MeshBasicMaterial({
        map: glow,
        color: COLORS.light,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
        opacity: 0.55,
      }),
    )
    const glowGeo = this.track(new THREE.PlaneGeometry(1, 1))
    const lightCone = (x: number, z: number, width: number, facing: number) => {
      const g = new THREE.Mesh(glowGeo, glowMat)
      g.scale.set(width, H - 0.05, 1)
      g.position.set(x - facing * 0.03, (H - 0.05) / 2, z)
      g.rotation.y = facing * -Math.PI / 2
      s.add(g)
    }

    const frameMat = this.track(new THREE.MeshStandardMaterial({ color: '#15130f', roughness: 0.5 }))
    const hang = (
      tex: THREE.Texture,
      w: number,
      h: number,
      wallX: number,
      z: number,
      y: number,
      frame = 0.07,
    ) => {
      const facing = Math.sign(wallX)
      const g = new THREE.Group()
      const fr = new THREE.Mesh(this.track(new THREE.BoxGeometry(w + frame * 2, h + frame * 2, 0.08)), frameMat)
      const pic = new THREE.Mesh(
        this.track(new THREE.PlaneGeometry(w, h)),
        this.track(new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })),
      )
      pic.position.z = 0.045
      g.add(fr, pic)
      g.position.set(wallX - facing * 0.05, y, z)
      g.rotation.y = -facing * Math.PI / 2
      s.add(g)
      lightCone(wallX, z, w * 1.6, facing)
      return g
    }

    this.content.services.forEach((svc, i) => {
      const tex = this.canvasTexture(1024, 1450, ctx => {
        ctx.fillStyle = COLORS.paper
        ctx.fillRect(0, 0, 1024, 1450)
        ctx.textBaseline = 'alphabetic'
        ctx.fillStyle = 'rgba(0,0,0,0.06)'
        ctx.font = `800 300px ${this.fonts.display}`
        ctx.fillText(svc.number, 80, 330)
        ctx.fillStyle = this.accent
        ctx.fillRect(84, 420, 90, 8)
        ctx.fillStyle = COLORS.ink
        ctx.font = `700 96px ${this.fonts.display}`
        ctx.fillText(svc.title, 80, 560)
        ctx.fillStyle = COLORS.inkMuted
        ctx.font = `400 44px ${this.fonts.body}`
        let y = 660
        for (const line of wrapLines(ctx, svc.desc, 860)) {
          ctx.fillText(line, 80, y)
          y += 64
        }
        y += 60
        ctx.font = `600 40px ${this.fonts.body}`
        for (const pt of svc.points) {
          ctx.fillStyle = this.accent
          ctx.beginPath()
          ctx.arc(92, y - 13, 7, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = '#555555'
          ctx.fillText(pt, 124, y)
          y += 66
        }
      })
      hang(tex, 2.3, 3.26, i % 2 === 0 ? W : -W, -19 - i * 6, 2.5, 0.05)
    })

    hang(this.image(this.content.portrait), 1.55, 2.07, -W, -45, 2.35)

    this.content.works.forEach((w, i) => {
      const wallX = i % 2 === 0 ? W : -W
      const z = -60 - i * 6
      hang(this.image(w.image), 3.2, 2.22, wallX, z, 2.55)
      const plate = this.canvasTexture(640, 180, ctx => {
        ctx.fillStyle = '#efebe4'
        ctx.fillRect(0, 0, 640, 180)
        ctx.fillStyle = COLORS.ink
        ctx.font = `700 52px ${this.fonts.display}`
        ctx.fillText(w.title, 36, 78)
        ctx.fillStyle = this.accent
        ctx.font = `600 30px ${this.fonts.body}`
        ctx.fillText(w.category.toUpperCase(), 36, 132)
      })
      const facing = Math.sign(wallX)
      const pm = this.mesh(
        new THREE.PlaneGeometry(1.1, 0.31),
        new THREE.MeshStandardMaterial({ map: plate, roughness: 0.7 }),
      )
      pm.position.set(wallX - facing * 0.02, 1.05, z + facing * 1.05)
      pm.rotation.y = -facing * Math.PI / 2
    })

    const stoneMat = this.track(new THREE.MeshLambertMaterial({ color: '#bdb4a7' }))
    const steleX = [-4.1, -1.45, 1.45, 4.1]
    this.content.steps.forEach((st, i) => {
      const x = steleX[i] ?? 0
      box(1.7, 2.7, 0.36, x, 1.35, -81, stoneMat)
      const tex = this.canvasTexture(700, 1110, ctx => {
        ctx.fillStyle = COLORS.paper
        ctx.fillRect(0, 0, 700, 1110)
        ctx.fillStyle = 'rgba(0,0,0,0.07)'
        ctx.font = `800 220px ${this.fonts.display}`
        ctx.fillText(st.num, 56, 250)
        ctx.fillStyle = this.accent
        ctx.fillRect(60, 320, 70, 7)
        ctx.fillStyle = COLORS.ink
        ctx.font = `700 76px ${this.fonts.display}`
        let y = 440
        for (const line of wrapLines(ctx, st.title, 590)) {
          ctx.fillText(line, 56, y)
          y += 80
        }
        ctx.fillStyle = this.accent
        ctx.font = `700 30px ${this.fonts.body}`
        ;(ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '4px'
        ctx.fillText(st.sub.toUpperCase(), 58, y + 10)
        ;(ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '0px'
        ctx.fillStyle = COLORS.inkMuted
        ctx.font = `400 40px ${this.fonts.body}`
        y += 110
        for (const line of wrapLines(ctx, st.desc, 590)) {
          ctx.fillText(line, 56, y)
          y += 58
        }
      })
      const face = this.mesh(
        new THREE.PlaneGeometry(1.5, 2.38),
        new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }),
      )
      face.position.set(x, 1.4, -81 + 0.185)
      const pool = new THREE.Mesh(glowGeo, glowMat)
      pool.scale.set(2.6, 4.2, 1)
      pool.position.set(x, 2.1, -81 - 0.2)
      s.add(pool)
    })

    const stripMat = this.track(new THREE.MeshBasicMaterial({ color: '#fff3e2', toneMapped: false }))
    const rooms: [number, number][] = [
      [Z_START, -15],
      [-15, -35],
      [-35, -55],
      [-55, -72],
      [-72, Z_END],
    ]
    for (const [a, b] of rooms) {
      const len = a - b - 3
      const strip = new THREE.Mesh(this.track(new THREE.PlaneGeometry(0.22, len)), stripMat)
      strip.rotation.x = Math.PI / 2
      strip.position.set(0, H - 0.01, (a + b) / 2)
      s.add(strip)
      const light = new THREE.PointLight(COLORS.light, 42, 0, 2)
      light.position.set(0, H - 0.8, (a + b) / 2)
      s.add(light)
    }
    const windowLight = new THREE.PointLight('#ffd7a8', 60, 0, 2)
    windowLight.position.set(0, 3, Z_END + 3)
    s.add(windowLight)
    s.add(new THREE.HemisphereLight('#fff1dd', '#2a241d', 0.35))

    this.buildDust(length)
  }

  private buildDust(length: number) {
    const count = window.matchMedia('(max-width: 767px)').matches ? 500 : 1100
    const arr = new Float32Array(count * 3)
    let seed = 11
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rnd() * 2 - 1) * (W - 0.4)
      arr[i * 3 + 1] = 0.2 + rnd() * (H - 0.6)
      arr[i * 3 + 2] = Z_START - rnd() * length
    }
    this.dustBase = arr.slice()
    const geo = this.track(new THREE.BufferGeometry())
    geo.setAttribute('position', new THREE.BufferAttribute(arr, 3))
    const dot = this.canvasTexture(64, 64, ctx => {
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      g.addColorStop(0, 'rgba(255,255,255,1)')
      g.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, 64, 64)
    })
    const mat = this.track(
      new THREE.PointsMaterial({
        map: dot,
        size: 0.045,
        color: '#ffe6c4',
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    )
    this.dust = new THREE.Points(geo, mat)
    this.scene.add(this.dust)
  }

  /* Machine trop lente : on baisse la definition plutot que de saccader. */
  lowerQuality() {
    const pr = this.renderer.getPixelRatio()
    if (pr <= 0.75) return false
    this.renderer.setPixelRatio(Math.max(0.75, pr - 0.35))
    const size = this.renderer.getSize(new THREE.Vector2())
    this.renderer.setSize(size.x, size.y, false)
    return true
  }

  setMouse(x: number, y: number) {
    this.mouse.set(x, y)
  }

  resize(w: number, h: number) {
    this.aspect = w / h
    this.camera.aspect = this.aspect
    this.camera.fov = this.aspect < 1 ? 64 : 50
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h, false)
  }

  render(progress: number, time: number) {
    const p = THREE.MathUtils.clamp(progress, 0, 1)
    sample(p, k => k.pos, this.pos)
    sample(p, k => k.look, this.look)
    sample(p, k => k.shift ?? [0, 0, 0], this.shift)
    const shiftAmount = this.aspect < 1 ? 0 : 1
    this.pos.addScaledVector(this.shift, shiftAmount)
    this.look.addScaledVector(this.shift, shiftAmount)
    if (this.aspect < 1) this.look.y -= 0.9

    this.mouseSmooth.lerp(this.mouse, 0.05)
    this.camera.position.copy(this.pos)
    this.camera.position.y += Math.sin(time * 0.6) * 0.015
    this.camera.lookAt(this.look)
    this.camera.rotateY(-this.mouseSmooth.x * 0.05)
    this.camera.rotateX(-this.mouseSmooth.y * 0.03)

    const attr = this.dust.geometry.getAttribute('position') as THREE.BufferAttribute
    const a = attr.array as Float32Array
    for (let i = 0; i < a.length; i += 3) {
      const b = this.dustBase
      a[i] = b[i] + Math.sin(time * 0.15 + b[i + 2]) * 0.25
      a[i + 1] = b[i + 1] + Math.sin(time * 0.11 + b[i] * 2) * 0.3
    }
    attr.needsUpdate = true

    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    for (const d of this.disposables) d.dispose()
    this.renderer.dispose()
  }
}

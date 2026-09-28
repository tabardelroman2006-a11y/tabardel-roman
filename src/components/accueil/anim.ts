/* Outils communs aux animations de l'accueil. */

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Avancee (0 a 1) dans une section haute dont le contenu est colle a l'ecran. */
export function pinnedProgress(el: HTMLElement) {
  const r = el.getBoundingClientRect()
  const total = r.height - window.innerHeight
  return total > 0 ? clamp(-r.top / total) : 0
}

/* Avancee d'un element qui traverse l'ecran : 0 quand il entre par le bas,
   1 quand il sort par le haut. */
export function passProgress(el: HTMLElement) {
  const r = el.getBoundingClientRect()
  return clamp((window.innerHeight - r.top) / (window.innerHeight + r.height))
}

/* Boucle d'animation qui ne travaille que quand l'element est a l'ecran.
   `p` est rattrape avec de l'inertie (mouvement lourd et amorti). */
export function loop(
  el: HTMLElement,
  read: (el: HTMLElement) => number,
  frame: (p: number, dt: number, now: number) => void,
  stiffness = 5,
) {
  let raf = 0
  let last = performance.now()
  let p = read(el)
  const tick = (now: number) => {
    raf = requestAnimationFrame(tick)
    const dt = Math.min(0.1, (now - last) / 1000)
    last = now
    const r = el.getBoundingClientRect()
    if (r.bottom < -200 || r.top > window.innerHeight + 200) return
    p += (read(el) - p) * (1 - Math.exp(-dt * stiffness))
    frame(p, dt, now)
  }
  raf = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(raf)
}

/* Vitesse de defilement lissee (pixels par seconde), partagee. */
let velocity = 0
let lastY = typeof window !== 'undefined' ? window.scrollY : 0
let lastT = 0
let tracking = false
export function scrollVelocity() {
  if (!tracking && typeof window !== 'undefined') {
    tracking = true
    const step = (t: number) => {
      const dt = lastT ? (t - lastT) / 1000 : 0.016
      lastT = t
      const y = window.scrollY
      const v = (y - lastY) / Math.max(dt, 0.001)
      lastY = y
      velocity += (v - velocity) * 0.12
      requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }
  return velocity
}

export function accentColor() {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--rt-primary').trim()
  return v || '#1B3A6B'
}

export const DISPLAY_FONT = {
  fontFamily: 'var(--font-bricolage), Arial, sans-serif',
  fontVariationSettings: "'opsz' 96",
} as const

export const insecable = (s: string) => s.replace(/\s+([?!:;»])/g, ' $1').replace(/(«)\s+/g, '$1 ')

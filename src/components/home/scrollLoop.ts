/* Boucle d'animation commune aux sections de l'accueil : l'avancee dans la
   section (0 a 1) est rattrapee avec de l'inertie, ce qui donne a tout le
   site le meme mouvement lourd et amorti. */

export type ScrollFrame = { p: number; dt: number; now: number; visible: boolean }

export function sectionProgress(wrap: HTMLElement) {
  const r = wrap.getBoundingClientRect()
  const total = r.height - window.innerHeight
  return total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0
}

export function watchScroll(wrap: HTMLElement, onFrame: (f: ScrollFrame) => void, stiffness = 3.4) {
  let raf = 0
  let last = performance.now()
  let current = sectionProgress(wrap)
  const tick = (now: number) => {
    raf = requestAnimationFrame(tick)
    const dt = Math.min(0.1, (now - last) / 1000)
    last = now
    current += (sectionProgress(wrap) - current) * (1 - Math.exp(-dt * stiffness))
    const r = wrap.getBoundingClientRect()
    onFrame({ p: current, dt, now, visible: r.bottom > 0 && r.top < window.innerHeight })
  }
  raf = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(raf)
}

export const smoothstep = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

export const HERO_FONT = {
  fontFamily: 'var(--font-bricolage), Arial, sans-serif',
  fontVariationSettings: "'opsz' 96",
} as const

export const insecable = (s: string) => s.replace(/\s+([?!:;»])/g, ' $1').replace(/(«)\s+/g, '$1 ')

export const DARK = '#0b0c0f'

'use client'

import { SafeImg } from './SafeImg'
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useModal } from '@/context/ModalContext'
import { PORTFOLIO } from '@/components/sections/ServicesPageContent'
import { Signature } from './Signature'
import { DISPLAY_FONT, loop, pinnedProgress, reducedMotion, smoothstep } from './anim'

/* Frise horizontale facon landonorris.com : on descend, tout glisse vers la
   gauche. Captures des sites livres, photos et citations sont eparpillees a
   differentes profondeurs (elles glissent a des vitesses differentes) et se
   devoilent en entrant a l'ecran. L'unite --tu grossit sur telephone. */

const S = '/images/accueil/sites/'
const A = '/images/accueil/'
const [SULTAN, JR] = PORTFOLIO

type Item = { x: number; y: number; w: number; depth: number; kind: 'img' | 'quote' | 'end'; src?: string; ratio?: string; caption?: string; href?: string; text?: string; sign?: boolean }

const ITEMS: Item[] = [
  { kind: 'img', x: 44, y: 15, w: 30, depth: 0.1, src: S + 'sultan-accueil.jpg', ratio: '1000 / 625', caption: `${SULTAN?.title} · Accueil`, href: SULTAN?.href },
  { kind: 'img', x: 80, y: 45, w: 14, depth: 0.35, src: A + 'roman-dehors.jpg', ratio: '3 / 4', caption: 'Au travail, en plein air' },
  { kind: 'quote', x: 100, y: 17, w: 31, depth: 0, text: 'Je crois que chaque entreprise, quelle que soit sa taille, mérite un site à la hauteur de ses ambitions.', sign: true },
  { kind: 'img', x: 138, y: 43, w: 30, depth: 0.2, src: S + 'jr-accueil.jpg', ratio: '1000 / 625', caption: `${JR?.title} · Accueil`, href: JR?.href },
  { kind: 'img', x: 172, y: 9, w: 11, depth: 0.45, src: S + 'sultan-mobile.jpg', ratio: '1 / 2', caption: `${SULTAN?.title} · Téléphone`, href: SULTAN?.href },
  { kind: 'img', x: 188, y: 52, w: 27, depth: 0.15, src: A + 'bureau.jpg', ratio: '1400 / 560', caption: 'Le bureau' },
  { kind: 'img', x: 220, y: 12, w: 27, depth: 0.3, src: S + 'jr-realisations.jpg', ratio: '1000 / 625', caption: `${JR?.title} · Réalisations`, href: JR?.href },
  { kind: 'quote', x: 252, y: 50, w: 25, depth: 0.05, text: 'Écouter, comprendre, créer et accompagner.' },
  { kind: 'img', x: 282, y: 14, w: 11, depth: 0.4, src: S + 'jr-mobile.jpg', ratio: '1 / 2', caption: `${JR?.title} · Téléphone`, href: JR?.href },
  { kind: 'img', x: 298, y: 47, w: 26, depth: 0.2, src: S + 'sultan-menu.jpg', ratio: '1000 / 625', caption: `${SULTAN?.title} · La carte`, href: SULTAN?.href },
  { kind: 'end', x: 334, y: 30, w: 26, depth: 0 },
]
const STRIP = 372

function Box({ item, children }: { item: Item; children: ReactNode }) {
  const style: CSSProperties = { left: `calc(var(--tu) * ${item.x})`, top: `${item.y}%`, width: `calc(var(--tu) * ${item.w})` }
  return (
    <div data-item data-depth={item.depth} className="absolute" style={style}>
      {children}
    </div>
  )
}

export function Track() {
  const { openDevis } = useModal()
  const rootRef = useRef<HTMLElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current!
    const strip = stripRef.current!
    const items = Array.from(strip.querySelectorAll<HTMLElement>('[data-item]')).map(el => ({
      el,
      depth: Number(el.dataset.depth),
      media: el.querySelector<HTMLElement>('[data-media]'),
      img: el.querySelector<HTMLElement>('img'),
    }))
    const still = reducedMotion()
    return loop(root, pinnedProgress, p => {
      const vw = window.innerWidth
      const travel = strip.scrollWidth - vw
      const x = -p * travel
      strip.style.transform = `translate3d(${x}px, 0, 0)`
      for (const it of items) {
        const shift = still ? 0 : -p * it.depth * vw * 0.6
        it.el.style.transform = `translate3d(${shift}px, 0, 0)`
        const left = it.el.offsetLeft + x + shift
        const reveal = still ? 1 : smoothstep(vw * 1.02, vw * 0.62, left)
        if (it.media) it.media.style.clipPath = `inset(${(1 - reveal) * 100}% 0 0 0 round 14px)`
        if (it.img) it.img.style.transform = `scale(${1.18 - reveal * 0.18})`
      }
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
    }, 6)
  }, [])

  return (
    <section id="realisations" ref={rootRef} className="relative" style={{ height: '420svh', backgroundColor: 'var(--rt-bg)' }}>
      <div className="sticky top-0 overflow-hidden" style={{ height: '100svh' }}>
        <div ref={stripRef} className="acc-track relative h-full" style={{ width: `calc(var(--tu) * ${STRIP})` }}>
          <div className="absolute flex flex-col justify-center" style={{ left: 'calc(var(--tu) * 6)', top: 0, bottom: 0, width: 'calc(var(--tu) * 32)' }}>
            <p className="font-body text-[11px] font-700 tracking-[0.3em] uppercase mb-6" style={{ color: 'var(--rt-muted)' }}>Réalisations · Déjà en ligne</p>
            <h2 className="uppercase" style={{ ...DISPLAY_FONT, color: 'var(--rt-primary)', fontWeight: 700, lineHeight: 0.88, letterSpacing: '-0.03em', fontSize: 'calc(var(--tu) * 5.4)' }}>
              Des sites
              <br />
              qui travaillent
            </h2>
            <p className="font-body mt-6 leading-relaxed" style={{ color: 'var(--rt-muted)', fontSize: 'max(0.95rem, calc(var(--tu) * 1.1))' }}>
              Pour de vraies entreprises de la Drôme. Faites défiler, ils sont en ligne.
            </p>
          </div>

          {ITEMS.map((item, i) => (
            <Box key={i} item={item}>
              {item.kind === 'img' && (
                <a href={item.href} target={item.href ? '_blank' : undefined} rel="noopener noreferrer" className={`group block ${item.href ? '' : 'pointer-events-none'}`}>
                  <div data-media className="overflow-hidden" style={{ aspectRatio: item.ratio, borderRadius: 14, boxShadow: '0 25px 60px color-mix(in srgb, var(--rt-primary) 18%, transparent)', backgroundColor: '#FFFFFF' }}>
                    <SafeImg src={item.src!} alt={item.caption} className="w-full h-full object-cover object-top transition-[filter] duration-500 group-hover:brightness-105" />
                  </div>
                  <p className="mt-3 flex items-center justify-between gap-2 font-body text-[10px] md:text-[11px] font-700 tracking-[0.16em] uppercase" style={{ color: 'var(--rt-muted)' }}>
                    <span>{item.caption}</span>
                    {item.href && <ArrowUpRight size={14} className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: 'var(--rt-primary)' }} />}
                  </p>
                </a>
              )}
              {item.kind === 'quote' && (
                <blockquote>
                  <p style={{ ...DISPLAY_FONT, color: 'var(--rt-ink)', fontWeight: 600, lineHeight: 1.12, letterSpacing: '-0.02em', fontSize: 'max(1.3rem, calc(var(--tu) * 2.2))' }}>
                    <span style={{ color: 'var(--rt-primary)' }}>“</span>{item.text}<span style={{ color: 'var(--rt-primary)' }}>”</span>
                  </p>
                  {item.sign && <div className="mt-4"><Signature size="max(2.2rem, calc(var(--tu) * 3.4))" /></div>}
                </blockquote>
              )}
              {item.kind === 'end' && (
                <div>
                  <p className="uppercase" style={{ ...DISPLAY_FONT, color: 'var(--rt-primary)', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.03em', fontSize: 'calc(var(--tu) * 5)' }}>
                    Et le
                    <br />
                    vôtre ?
                  </p>
                  <button onClick={openDevis} className="acc-btn acc-btn-solid mt-8">
                    Démarrer mon projet
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              )}
            </Box>
          ))}
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[min(60vw,420px)] h-[2px] overflow-hidden" style={{ backgroundColor: 'var(--rt-line)', borderRadius: 2 }}>
          <div ref={barRef} className="h-full origin-left" style={{ backgroundColor: 'var(--rt-primary)', transform: 'scaleX(0)' }} />
        </div>
      </div>
    </section>
  )
}

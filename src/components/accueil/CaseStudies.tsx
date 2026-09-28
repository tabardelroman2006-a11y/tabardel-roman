'use client'

import { SafeImg } from './SafeImg'
import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { PORTFOLIO } from '@/components/sections/ServicesPageContent'
import { DISPLAY_FONT, loop, pinnedProgress, reducedMotion, smoothstep } from './anim'

/* Page Services : chaque realisation est presentee dans un ecran d'ordinateur
   et un telephone. Pendant qu'on descend, le vrai site defile a l'interieur
   des deux ecrans (a des vitesses differentes), comme si on le parcourait. */

const S = '/images/accueil/sites/'
const SHOTS: Record<string, { desk: string; phone: string; tags: string[] }> = {
  'Sultan Kebab Crest': { desk: S + 'sultan-page.jpg', phone: S + 'sultan-page-mobile.jpg', tags: ['Commande en ligne', 'Paiement intégré', 'Interface caisse'] },
  'JR Maçonnerie Rénovation': { desk: S + 'jr-page.jpg', phone: S + 'jr-page-mobile.jpg', tags: ['Site vitrine', 'Chantiers en photos', 'Demande de devis'] },
}

function hostOf(href: string) {
  try {
    return decodeURIComponent(new URL(href).hostname.replace(/^www\./, '')).replace('xn--jrmaonnerie-p9a', 'jrmaçonnerie')
  } catch {
    return href
  }
}

function Case({ index }: { index: number }) {
  const project = PORTFOLIO[index]
  const shots = SHOTS[project.title]
  const rootRef = useRef<HTMLElement>(null)
  const deskRef = useRef<HTMLImageElement>(null)
  const phoneRef = useRef<HTMLImageElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const devicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current!
    const still = reducedMotion()
    return loop(root, pinnedProgress, p => {
      const scroll = smoothstep(0.12, 0.92, p)
      for (const img of [deskRef.current, phoneRef.current]) {
        if (!img) continue
        const frame = img.parentElement!.clientHeight
        const travel = Math.max(0, img.clientHeight - frame)
        img.style.transform = `translate3d(0, ${-scroll * travel}px, 0)`
      }
      const enter = still ? 1 : smoothstep(0, 0.14, p)
      if (infoRef.current) {
        infoRef.current.style.opacity = String(enter)
        infoRef.current.style.transform = `translate3d(0, ${(1 - enter) * 50}px, 0)`
      }
      if (devicesRef.current) {
        devicesRef.current.style.transform = `translate3d(0, ${(1 - enter) * 90}px, 0) rotate(${(1 - enter) * -3}deg)`
        devicesRef.current.style.opacity = String(0.2 + enter * 0.8)
      }
    }, 7)
  }, [])

  if (!shots) return null
  const flip = index % 2 === 1

  return (
    <section ref={rootRef} className="relative" style={{ height: '300svh', backgroundColor: index % 2 ? 'var(--rt-bg)' : 'var(--rt-soft)' }}>
      <div className="sticky top-0 overflow-hidden flex items-center px-5 md:px-12 lg:px-20" style={{ height: '100svh' }}>
        <div className={`max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 lg:gap-16 items-center pt-16 ${flip ? 'lg:[direction:rtl]' : ''}`}>
          <div ref={infoRef} className="[direction:ltr]">
            <p style={{ ...DISPLAY_FONT, fontWeight: 700, fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 0.8, color: 'var(--rt-line)' }}>{String(index + 1).padStart(2, '0')}</p>
            <p className="mt-5 font-body text-[11px] font-700 tracking-[0.25em] uppercase" style={{ color: 'var(--rt-muted)' }}>{project.category}</p>
            <h3 className="uppercase mt-3" style={{ ...DISPLAY_FONT, fontWeight: 700, color: 'var(--rt-primary)', lineHeight: 0.9, letterSpacing: '-0.03em', fontSize: 'clamp(2.2rem, 4.4vw, 4.2rem)' }}>{project.title}</h3>
            <p className="hidden sm:block mt-5 font-body text-base md:text-lg leading-relaxed max-w-md" style={{ color: 'var(--rt-muted)' }}>{project.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {shots.tags.map(tag => (
                <li key={tag} className="font-body text-xs font-700 px-3 py-1.5" style={{ borderRadius: 999, backgroundColor: '#FFFFFF', color: 'var(--rt-primary)', border: '1px solid var(--rt-line)' }}>{tag}</li>
              ))}
            </ul>
            <a href={project.href} target="_blank" rel="noopener noreferrer" className="acc-btn acc-btn-solid mt-7">
              Voir le site en ligne
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div ref={devicesRef} className="relative [direction:ltr] pb-6 lg:pb-10">
            <div className="acc-browser">
              <div className="acc-browser-bar">
                <span /><span /><span />
                <p className="acc-browser-url">{hostOf(project.href)}</p>
              </div>
              <div className="acc-browser-screen">
                <SafeImg ref={deskRef} src={shots.desk} alt={`${project.title}, page d’accueil`} className="block w-full" />
              </div>
            </div>
            <div className="acc-phone">
              <div className="acc-phone-screen">
                <SafeImg ref={phoneRef} src={shots.phone} alt={`${project.title} sur téléphone`} className="block w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function CaseStudies() {
  return (
    <div id="realisations">
      <section className="px-5 md:px-12 lg:px-20 pt-24 pb-16 md:pt-32 md:pb-20" style={{ backgroundColor: 'var(--rt-soft)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 className="uppercase" style={{ ...DISPLAY_FONT, color: 'var(--rt-primary)', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.03em', fontSize: 'clamp(2.6rem, 6.4vw, 6.2rem)' }}>
            Mes réalisations
            <br />
            <span className="acc-outline">en vrai</span>
          </h2>
          <p className="font-body text-base md:text-lg max-w-sm leading-relaxed" style={{ color: 'var(--rt-muted)' }}>
            Descendez : les sites défilent sous vos yeux, sur ordinateur et sur téléphone, tels qu’ils sont en ligne.
          </p>
        </div>
      </section>
      {PORTFOLIO.slice(0, 2).map((_, i) => <Case key={i} index={i} />)}
    </div>
  )
}

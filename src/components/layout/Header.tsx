'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { useModal } from '@/context/ModalContext'
import { CARTE } from '@/components/carte/carte-data'
import { OFFRES } from '@/lib/offres'
import { REALISATIONS } from '@/lib/realisations'
import { VILLES } from '@/lib/villes'

const navLinks = [
  { href: '/',               label: 'Accueil',      hint: 'Retour au début' },
  { href: '/services',       label: 'Services',     hint: 'Ce que je fais' },
  { href: '/realisations',   label: 'Réalisations', hint: 'Les sites en ligne' },
  { href: '/notre-histoire', label: 'À propos',     hint: 'Qui je suis' },
  { href: '/contact',        label: 'Contact',      hint: 'On en parle' },
]

const SOUS_MENU: Record<string, string> = {
  'site-vitrine': 'Site vitrine',
  'site-e-commerce': 'Boutique en ligne',
  'referencement-naturel': 'Référencement',
  'maintenance': 'Maintenance',
}

const LEGAL = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/cgv', label: 'CGV' },
  { href: '/politique-confidentialite', label: 'Confidentialité' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [hidden, setHidden]     = useState<string[]>([])
  const pathname = usePathname()
  const { openDevis } = useModal()
  const burgerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Pages masquées (cache session pour éviter le clignotement)
  useEffect(() => {
    try {
      const cached = sessionStorage.getItem('rtHiddenPages')
      if (cached) setHidden(JSON.parse(cached))
    } catch {}
    fetch('/api/admin/content')
      .then(r => r.json())
      .then(d => {
        const h = Array.isArray(d?.content?.hidden_pages) ? d.content.hidden_pages : []
        setHidden(h)
        try { sessionStorage.setItem('rtHiddenPages', JSON.stringify(h)) } catch {}
      })
      .catch(() => {})
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  // Menu ouvert : page figée, Échap pour fermer, focus dans le menu
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('rt-menu', { detail: open }))
    document.documentElement.classList.toggle('rt-menu-open', open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); burgerRef.current?.focus() } }
    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => panelRef.current?.querySelector<HTMLElement>('a, button')?.focus({ preventScroll: true }), 350)
    return () => { window.removeEventListener('keydown', onKey); clearTimeout(t) }
  }, [open])

  if (pathname === '/carte' || pathname?.startsWith('/admin')) return null

  const visible = navLinks.filter(l => l.href === '/' || !hidden.includes(l.href))
  const clearTop = pathname === '/' && !scrolled && !open
  const showServices = !hidden.includes('/services')
  const showRealisations = !hidden.includes('/realisations')
  const vedette = REALISATIONS[0]

  return (
    <>
      <header className="rt-bar fixed top-0 left-0 right-0 z-[60]" data-clear={clearTop || undefined} data-open={open || undefined}>
        <div className="flex items-center justify-between h-16 md:h-20 px-5 md:px-12 lg:px-20">
          <Link href="/" className="rt-brand group flex items-center gap-3" aria-label="Roman Tabardel, accueil">
            <Image src="/images/logo-rt.png" alt="" width={50} height={40} className="rt-brand-mark" priority />
            <span className="rt-brand-name hidden sm:block">Roman Tabardel</span>
          </Link>

          <div className="flex items-center gap-3 md:gap-4">
            <button onClick={openDevis} className="rt-bar-cta hidden md:inline-flex">
              <Phone size={13} /> Appel gratuit
            </button>
            <button
              ref={burgerRef}
              onClick={() => setOpen(v => !v)}
              className="rt-burger"
              aria-expanded={open}
              aria-controls="rt-menu"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              <span className="rt-burger-label hidden sm:block">{open ? 'Fermer' : 'Menu'}</span>
              <span className="rt-burger-lines" aria-hidden="true"><i /><i /><i /></span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="rt-menu"
        ref={panelRef}
        className="rt-menu"
        data-open={open || undefined}
        role="dialog"
        aria-modal="true"
        aria-label="Menu du site"
        inert={!open}
        data-lenis-prevent
      >
        <div className="rt-menu-inner">
          <nav className="rt-menu-main" aria-label="Pages principales">
            {visible.map((l, i) => {
              const active = pathname === l.href
              return (
                <div key={l.href} className="rt-menu-item" style={{ ['--i' as string]: i }}>
                  <Link href={l.href} className="rt-menu-link" data-active={active || undefined}>
                    <span className="rt-menu-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="rt-menu-word">
                      <span className="rt-menu-fill">{l.label}</span>
                      <span className="rt-menu-ghost" aria-hidden="true">{l.label}</span>
                    </span>
                    <span className="rt-menu-hint">{l.hint}</span>
                  </Link>
                  {l.href === '/services' && showServices && (
                    <ul className="rt-menu-subnav">
                      {OFFRES.map(o => (
                        <li key={o.slug}>
                          <Link href={`/services/${o.slug}`} data-active={pathname === `/services/${o.slug}` || undefined}>
                            {SOUS_MENU[o.slug] ?? o.nom}<ArrowUpRight size={13} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </nav>

          <div className="rt-menu-cols">
            <div className="rt-menu-col" style={{ ['--i' as string]: 3 }}>
              <p className="rt-menu-title">Près de chez vous</p>
              <ul>
                {VILLES.map(v => (
                  <li key={v.slug}><Link href={`/creation-site-internet/${v.slug}`} className="rt-menu-sub">{v.nom}<ArrowUpRight size={14} /></Link></li>
                ))}
              </ul>
            </div>

            {showRealisations && vedette && (
              <Link href={`/realisations/${vedette.slug}`} className="rt-menu-feature" style={{ ['--i' as string]: 4 }}>
                <span className="rt-menu-feature-img">
                  <Image src={vedette.desk} alt={`Site ${vedette.nom}`} fill sizes="(max-width: 1024px) 90vw, 26vw" className="object-cover object-top" />
                </span>
                <span className="rt-menu-title">Dernière réalisation</span>
                <span className="rt-menu-feature-name">{vedette.nom}<ArrowUpRight size={16} /></span>
                <span className="rt-menu-feature-txt">{vedette.categorie} · {vedette.ville}</span>
              </Link>
            )}

            <div className="rt-menu-col rt-menu-contact" style={{ ['--i' as string]: 5 }}>
              <p className="rt-menu-title">Me joindre</p>
              <a href={`tel:${CARTE.telInternational}`} className="rt-menu-sub"><Phone size={15} />{CARTE.telAffiche}</a>
              <a href={`mailto:${CARTE.email}`} className="rt-menu-sub"><Mail size={15} />{CARTE.email}</a>
              <span className="rt-menu-sub rt-menu-plain"><MapPin size={15} />Allex, Drôme</span>
              <button onClick={() => { setOpen(false); openDevis() }} className="acc-btn acc-btn-solid mt-4 self-start">
                Appel gratuit de 15 min <ArrowUpRight size={15} />
              </button>
              <div className="rt-menu-social">
                <a href={CARTE.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href={CARTE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={CARTE.google} target="_blank" rel="noopener noreferrer">Fiche Google</a>
              </div>
            </div>
          </div>

          <div className="rt-menu-foot">
            <Image src="/images/logo-rt-complet.png" alt="Roman Tabardel" width={90} height={83} className="rt-menu-logo" />
            <div className="rt-menu-legal">
              {LEGAL.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

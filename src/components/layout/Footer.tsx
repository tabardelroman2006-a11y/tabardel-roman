'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail } from 'lucide-react'

const NAV = [
  { href: '/services',       label: 'Services'  },
  { href: '/#faq',           label: 'FAQ'       },
  { href: '/notre-histoire', label: 'À propos'  },
  { href: '/contact',        label: 'Contact'   },
]

const LEGAL = [
  { href: '/mentions-legales',          label: 'Mentions légales' },
  { href: '/cgv',                       label: 'CGV'              },
  { href: '/politique-confidentialite', label: 'Confidentialité'  },
]

export function Footer() {
  const year = new Date().getFullYear()
  const [hidden, setHidden] = useState<string[]>([])

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

  const navVisible = NAV.filter(l => l.href.startsWith('/#') || !hidden.includes(l.href))

  return (
    /* Pied de page clair, dans les tons du site (jamais de fond sombre). */
    <footer style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'var(--rt-bg)', borderTop: '1px solid var(--rt-line)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20" style={{ position: 'relative', zIndex: 2 }}>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/images/logo-roman.png"
                alt="Logo Roman Tabardel"
                width={34}
                height={34}
                className="object-contain"
              />
              <span className="font-display font-700 text-sm tracking-wide" style={{ color: 'var(--rt-ink)' }}>
                Roman Tabardel
              </span>
            </div>
            <p className="font-body text-sm leading-relaxed max-w-xs" style={{ color: 'var(--rt-muted)' }}>
              Création de sites web sur mesure et référencement naturel pour les entreprises
              qui méritent une présence en ligne à la hauteur de leur ambition.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-body text-[10px] tracking-[0.22em] uppercase mb-6" style={{ color: 'var(--rt-muted)', opacity: 0.7 }}>
              Navigation
            </p>
            <nav className="flex flex-col gap-3">
              {navVisible.map(({ href, label }) => (
                <Link key={label} href={href} className="font-body text-sm link-dim" style={{ color: 'var(--rt-ink)' }}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-[10px] tracking-[0.22em] uppercase mb-6" style={{ color: 'var(--rt-muted)', opacity: 0.7 }}>
              Contact
            </p>
            <div className="flex flex-col gap-3.5">
              <a href="tel:0618135384" className="flex items-center gap-2.5 font-body text-sm" style={{ color: 'var(--rt-ink)' }}>
                <Phone size={13} style={{ color: 'var(--rt-primary)', flexShrink: 0 }} />
                06 18 13 53 84
              </a>
              <a href="mailto:contact@tabardel-roman.fr" className="flex items-center gap-2.5 font-body text-sm" style={{ color: 'var(--rt-ink)' }}>
                <Mail size={13} style={{ color: 'var(--rt-primary)', flexShrink: 0 }} />
                contact@tabardel-roman.fr
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          style={{ borderTop: '1px solid var(--rt-line)' }}>
          <p className="font-body text-xs" style={{ color: 'var(--rt-muted)' }}>
            ROMAN TABARDEL · Entrepreneur individuel · SIRET&nbsp;10446560400015
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {LEGAL.map(({ href, label }) => (
              <Link key={label} href={href} className="font-body text-xs" style={{ color: 'var(--rt-muted)' }}>
                {label}
              </Link>
            ))}
            <p className="font-body text-xs" style={{ color: 'var(--rt-muted)' }}>
              © {year} Roman Tabardel
            </p>
          </div>
        </div>

        <p aria-hidden="true" className="mt-14 uppercase text-center select-none whitespace-nowrap acc-outline" style={{ fontFamily: 'var(--font-bricolage), Arial, sans-serif', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.8, fontSize: 'min(8.6vw, 118px)', opacity: 0.5 }}>
          Roman Tabardel
        </p>
      </div>
    </footer>
  )
}

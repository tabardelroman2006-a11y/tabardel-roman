import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

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

  return (
    <footer style={{ backgroundColor: '#1A1A1A', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">

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
              <span className="font-display font-700 text-sm tracking-wide" style={{ color: '#FFFFFF' }}>
                Roman Tabardel
              </span>
            </div>
            <p className="font-body text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Création de sites web sur mesure et référencement naturel pour les entreprises
              qui méritent une présence en ligne à la hauteur de leur ambition.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-body text-[10px] tracking-[0.22em] uppercase mb-6" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Navigation
            </p>
            <nav className="flex flex-col gap-3">
              {NAV.map(({ href, label }) => (
                <Link key={label} href={href} className="font-body text-sm link-dim" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-[10px] tracking-[0.22em] uppercase mb-6" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Contact
            </p>
            <div className="flex flex-col gap-3.5">
              <a href="tel:0769341123" className="flex items-center gap-2.5 font-body text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <Phone size={13} style={{ color: '#FFFFFF', flexShrink: 0 }} />
                07 69 34 11 23
              </a>
              <a href="mailto:contact@tabardel-roman.fr" className="flex items-center gap-2.5 font-body text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <Mail size={13} style={{ color: '#FFFFFF', flexShrink: 0 }} />
                contact@tabardel-roman.fr
              </a>
              <div className="flex items-start gap-2.5 font-body text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
                <MapPin size={13} style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0, marginTop: 3 }} />
                Chemin des Lauriers, 26400 Allex (Drôme)
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            ROMAN TABARDEL · Entrepreneur individuel · SIRET&nbsp;10446560400015
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {LEGAL.map(({ href, label }) => (
              <Link key={label} href={href} className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                {label}
              </Link>
            ))}
            <p className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
              © {year} Roman Tabardel
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}

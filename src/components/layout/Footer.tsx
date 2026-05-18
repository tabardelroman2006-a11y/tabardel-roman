import Link from 'next/link'
import { Phone, Mail, ArrowUpRight } from 'lucide-react'

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/notre-histoire', label: 'Notre Histoire' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderTop: '1px solid rgba(26,26,26,0.08)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">

        {/* Top: nom + nav + contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Nom + tagline */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 400,
                color: '#1A1A1A',
                letterSpacing: '-0.01em',
              }}
            >
              Roman Tabardel
            </p>
            <p className="text-sm mt-2" style={{ color: 'rgba(26,26,26,0.45)' }}>
              Création de sites web & SEO
            </p>
            <span
              className="inline-flex items-center gap-1.5 mt-5 text-xs px-3 py-1 rounded-full"
              style={{
                border: '1px solid rgba(26,26,26,0.12)',
                color: 'rgba(26,26,26,0.5)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Disponible
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-3">
            <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(26,26,26,0.3)' }}>
              Navigation
            </p>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group inline-flex items-center gap-1 text-sm transition-colors"
                style={{ color: 'rgba(26,26,26,0.55)' }}
              >
                {link.label}
                <ArrowUpRight
                  size={10}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(26,26,26,0.3)' }}>
              Contact
            </p>
            <a
              href="tel:0769341123"
              className="inline-flex items-center gap-2 text-sm transition-colors hover:text-charcoal"
              style={{ color: 'rgba(26,26,26,0.55)' }}
            >
              <Phone size={13} />
              07.69.34.11.23
            </a>
            <a
              href="mailto:contact@tabardel-roman.fr"
              className="inline-flex items-center gap-2 text-sm transition-colors hover:text-charcoal"
              style={{ color: 'rgba(26,26,26,0.55)' }}
            >
              <Mail size={13} />
              contact@tabardel-roman.fr
            </a>
          </div>
        </div>

        {/* Bas : copyright */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs"
          style={{ borderTop: '1px solid rgba(26,26,26,0.07)', color: 'rgba(26,26,26,0.3)' }}
        >
          <p>© 2025 Roman Tabardel — Micro-entreprise</p>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
            Sites qui marquent les esprits.
          </p>
        </div>
      </div>
    </footer>
  )
}

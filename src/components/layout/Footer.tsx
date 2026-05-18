import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer style={{ backgroundColor: 'rgba(10,10,10,0.75)', borderTop: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="tracking-wide text-base mb-1" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em', color: '#ffffff' }}>
              Roman Tabardel
            </p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>Création de sites web &amp; SEO</p>
          </div>

          <nav className="flex flex-wrap gap-6">
            {[
              { href: '/', label: 'Accueil' },
              { href: '/notre-histoire', label: 'Notre Histoire' },
              { href: '/services', label: 'Services' },
              { href: '/contact', label: 'Contact' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            <a href="tel:0769341123" className="flex items-center gap-2 text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}>
              <Phone size={14} />
              07.69.34.11.23
            </a>
            <a href="mailto:contact@tabardel-roman.fr" className="flex items-center gap-2 text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.45)' }}>
              <Mail size={14} />
              contact@tabardel-roman.fr
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © 2025 Roman Tabardel — Micro-entreprise
          </p>
        </div>
      </div>
    </footer>
  )
}

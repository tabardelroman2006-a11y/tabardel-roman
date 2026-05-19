import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'

const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/notre-histoire', label: 'Notre Histoire' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#F7F5F0] border-t border-[#D6D3D1]/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 flex items-center justify-center"
                style={{ border: '1px solid #1A1A1A' }}
              >
                <span className="font-playfair text-sm font-medium tracking-widest text-[#1A1A1A]">
                  RT
                </span>
              </div>
              <span className="font-playfair text-[#1A1A1A] text-lg tracking-wide">
                Roman Tabardel
              </span>
            </div>
            <p className="font-inter text-[#6B6B6B] text-sm leading-relaxed max-w-xs">
              Création de sites web & référencement naturel pour les entreprises qui méritent
              une présence en ligne à la hauteur de leur ambition.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-inter text-xs tracking-[0.2em] text-[#6B6B6B] uppercase mb-6">
              Navigation
            </h3>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-inter text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-inter text-xs tracking-[0.2em] text-[#6B6B6B] uppercase mb-6">
              Contact
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="tel:0769341123"
                className="flex items-center gap-2 font-inter text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-200 group"
              >
                <Phone size={14} className="text-[#D6D3D1] group-hover:text-[#1A1A1A] transition-colors duration-200" />
                07.69.34.11.23
              </a>
              <a
                href="mailto:contact@tabardel-roman.fr"
                className="flex items-center gap-2 font-inter text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-200 group"
              >
                <Mail size={14} className="text-[#D6D3D1] group-hover:text-[#1A1A1A] transition-colors duration-200" />
                contact@tabardel-roman.fr
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#D6D3D1]/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-inter text-xs text-[#6B6B6B]">
            Micro-entreprise · SIRET en cours d&apos;immatriculation
          </p>
          <p className="font-inter text-xs text-[#6B6B6B]">
            © {currentYear} Roman Tabardel — Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  )
}

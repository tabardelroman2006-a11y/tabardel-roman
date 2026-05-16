'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useModal } from '@/context/ModalContext'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/notre-histoire', label: 'Notre Histoire' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { openDevis } = useModal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(10,10,10,0.80)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        <Link
          href="/"
          className="tracking-wide text-base"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em', color: '#ffffff' }}
        >
          Roman Tabardel
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm transition-colors"
              style={{
                color: pathname === link.href ? '#ffffff' : 'rgba(255,255,255,0.55)',
                fontWeight: pathname === link.href ? 500 : 400,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={openDevis}
            className="px-4 py-2 text-sm rounded-lg transition-all"
            style={{
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#ffffff',
              backgroundColor: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
            }}
          >
            Devis gratuit
          </button>
        </div>

        <button
          className="md:hidden"
          style={{ color: '#ffffff' }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="md:hidden px-6 py-6 space-y-4"
            style={{
              backgroundColor: 'rgba(10,10,10,0.92)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-base py-1"
                style={{ color: '#ffffff' }}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { openDevis(); setMobileOpen(false) }}
              className="mt-2 w-full py-3 text-sm rounded-lg"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              Devis gratuit
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

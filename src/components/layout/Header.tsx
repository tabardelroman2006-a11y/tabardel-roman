'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { useModal } from '@/context/ModalContext'

const navLinks = [
  { href: '/',               label: 'Accueil'   },
  { href: '/services',       label: 'Services'  },
  { href: '/notre-histoire', label: 'À propos'  },
  { href: '/contact',        label: 'Contact'   },
]

export function Header() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hidden,     setHidden]     = useState<string[]>([])
  const pathname = usePathname()
  const { openDevis } = useModal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
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

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const visibleLinks = navLinks.filter(l => l.href === '/' || !hidden.includes(l.href))

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div
          className="transition-all duration-400 px-6 md:px-12 lg:px-20"
          style={{
            backdropFilter:  'blur(16px)',
            backgroundColor: scrolled
              ? 'rgba(255,255,255,0.95)'
              : 'rgba(244,244,244,0.80)',
            borderBottom: '1px solid rgba(0,0,0,0.07)',
          }}
        >
          <div className="flex items-center justify-between h-16 md:h-20 w-full">

            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-60">
                <Image
                  src="/images/logo-roman.png"
                  alt="Logo Roman Tabardel"
                  width={36}
                  height={36}
                  className="object-contain"
                  priority
                />
              </div>
              <span
                className="hidden md:block font-display font-700 text-sm tracking-wide group-hover:opacity-60 transition-opacity duration-300"
                style={{ color: '#1A1A1A' }}
              >
                Roman Tabardel
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {visibleLinks.map(({ href, label }) => {
                const active = pathname === href
                return (
                  <Link
                    key={label}
                    href={href}
                    className="font-body text-sm font-500 tracking-wide transition-colors duration-200 relative group"
                    style={{ color: active ? 'var(--rt-primary)' : '#6B6B6B' }}
                  >
                    {label}
                    <span
                      className="absolute -bottom-0.5 left-0 h-px transition-all duration-300"
                      style={{
                        width: active ? '100%' : '0',
                        backgroundColor: 'var(--rt-primary)',
                      }}
                    />
                  </Link>
                )
              })}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-3">
              <button
                onClick={openDevis}
                className="hidden md:flex items-center gap-2 font-body font-700 text-xs px-5 py-2.5 tracking-wide uppercase transition-opacity duration-200 hover:opacity-80"
                style={{ backgroundColor: 'var(--rt-primary)', color: '#FFFFFF' }}
              >
                <Phone size={12} />
                Appel gratuit
              </button>

              <button
                className="md:hidden p-1.5"
                style={{ color: '#1A1A1A' }}
                onClick={() => setMobileOpen(v => !v)}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center items-center"
            style={{ backgroundColor: '#FFFFFF' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <nav className="flex flex-col items-center gap-8">
              {visibleLinks.map(({ href, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <Link
                    href={href}
                    className="font-display font-700 text-4xl tracking-tight"
                    style={{ color: '#1A1A1A' }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4 }}
              >
                <button
                  onClick={() => { setMobileOpen(false); openDevis() }}
                  className="mt-6 font-body font-700 text-sm px-10 py-4 tracking-wide uppercase"
                  style={{ backgroundColor: 'var(--rt-primary)', color: '#FFFFFF' }}
                >
                  Appel gratuit (15 min)
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { useModal } from '@/context/ModalContext'

const navLinks = [
  { href: '/services',       label: 'Services'  },
  { href: '/#faq',           label: 'FAQ'       },
  { href: '/notre-histoire', label: 'À propos'  },
  { href: '/contact',        label: 'Contact'   },
]

export function Header() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { openDevis } = useModal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div
          className="transition-all duration-500 px-6 md:px-12 lg:px-20"
          style={{
            backdropFilter:  'blur(16px)',
            backgroundColor: scrolled
              ? 'rgba(10,10,10,0.92)'
              : 'rgba(10,10,10,0.5)',
            borderBottom: scrolled
              ? '1px solid rgba(255,255,255,0.06)'
              : '1px solid transparent',
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
                className="hidden md:block font-display font-semibold text-sm tracking-widest uppercase group-hover:opacity-60 transition-opacity duration-300"
                style={{ color: '#FFFFFF' }}
              >
                Roman Tabardel
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="font-body text-sm tracking-wide transition-colors duration-200 relative group"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'}
                >
                  {label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                    style={{ backgroundColor: '#C8FF00' }}
                  />
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* CTA desktop */}
              <button
                onClick={openDevis}
                className="hidden md:flex items-center gap-2 font-body font-semibold text-xs px-5 py-2.5 tracking-widest uppercase transition-opacity duration-200 hover:opacity-80"
                style={{ backgroundColor: '#C8FF00', color: '#0A0A0A' }}
              >
                <Phone size={12} />
                Appel gratuit
              </button>

              {/* Hamburger */}
              <button
                className="md:hidden p-1.5 transition-opacity duration-200 hover:opacity-60"
                style={{ color: '#FFFFFF' }}
                onClick={() => setMobileOpen(v => !v)}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center items-center"
            style={{ backgroundColor: '#0A0A0A' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map(({ href, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                >
                  <Link
                    href={href}
                    className="font-display font-bold text-4xl tracking-tight"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.5 }}
              >
                <button
                  onClick={() => { setMobileOpen(false); openDevis() }}
                  className="mt-6 font-body font-semibold text-sm px-10 py-4 tracking-widest uppercase"
                  style={{ backgroundColor: '#C8FF00', color: '#0A0A0A' }}
                >
                  Appel gratuit — 15 min
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

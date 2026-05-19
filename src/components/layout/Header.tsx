'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useModal } from '@/context/ModalContext'

const navLinks = [
  { href: '/',               label: 'Accueil'        },
  { href: '/notre-histoire', label: 'Notre Histoire' },
  { href: '/services',       label: 'Services'       },
  { href: '/contact',        label: 'Contact'        },
]

export function Header() {
  const [scrolled,  setScrolled]  = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [darkMode,  setDarkMode]  = useState(false)
  const pathname = usePathname()
  const { openDevis } = useModal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  // Colour helpers
  const textColor = !scrolled ? '#ffffff' : '#1A1A1A'
  const textMuted = !scrolled ? 'rgba(255,255,255,0.7)' : '#6B6B6B'

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div
          className="transition-all duration-500 px-6 md:px-12 lg:px-20 border-b"
          style={{
            backdropFilter:   scrolled ? 'blur(12px)' : 'none',
            backgroundColor:  scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.0)',
            borderColor:      scrolled ? '#E8E4DE' : 'transparent',
          }}
        >
          <div className="flex items-center justify-between h-16 md:h-20 w-full">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div
                className="w-9 h-9 flex items-center justify-center transition-all duration-300"
                style={{
                  border: `1px solid ${textColor}`,
                }}
              >
                <span
                  className="font-playfair text-sm font-medium tracking-widest transition-colors duration-300"
                  style={{ color: textColor }}
                >
                  RT
                </span>
              </div>
              <span
                className="hidden md:block font-playfair text-lg tracking-wide group-hover:opacity-70 transition-all duration-300"
                style={{ color: textColor }}
              >
                Roman Tabardel
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(({ href, label }) => {
                const active = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    className="font-inter text-sm tracking-wide transition-all duration-300 relative"
                    style={{ color: active ? textColor : textMuted }}
                  >
                    {label}
                    <span
                      className="absolute -bottom-0.5 left-0 h-px transition-all duration-300"
                      style={{
                        width: active ? '100%' : '0',
                        backgroundColor: textColor,
                      }}
                    />
                  </Link>
                )
              })}
            </nav>

            {/* Right: dark toggle + CTA + hamburger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(d => !d)}
                aria-label="Mode sombre"
                className="w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300"
                style={{
                  borderColor: scrolled ? '#D6D3D1' : 'rgba(255,255,255,0.5)',
                  color: textColor,
                }}
              >
                {darkMode ? <Sun size={15} /> : <Moon size={15} />}
              </button>

              <button
                onClick={openDevis}
                className="hidden md:block font-inter text-sm px-6 py-2 tracking-wide rounded-full border transition-all duration-300"
                style={{
                  borderColor: textColor,
                  color:       textColor,
                }}
                data-cursor-hover
              >
                Devis
              </button>

              <button
                className="md:hidden p-1"
                style={{ color: textColor }}
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
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-md flex flex-col justify-center items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <nav className="flex flex-col items-center gap-10">
              {navLinks.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <Link
                    href={href}
                    className={`font-playfair text-4xl tracking-wide ${pathname === href ? 'text-white' : 'text-white/60'}`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.5 }}
              >
                <button
                  onClick={() => { setMobileOpen(false); openDevis() }}
                  className="mt-4 font-inter text-sm border border-white/40 text-white px-8 py-3 tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                >
                  Demander un devis
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

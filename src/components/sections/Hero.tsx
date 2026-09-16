'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, Phone } from 'lucide-react'
import { useModal } from '@/context/ModalContext'
import { useSiteTexts } from '@/lib/useSiteTexts'

/* Hero facon bellevilles.fr : une grande photo plein ecran, un titre blanc
   geant au centre, et une pastille ronde pour descendre. Les textes restent
   ceux de l'admin (hero.eyebrow / title / subtitle). */

/* Bricolage Grotesque en grande taille optique : l'equivalent libre le plus
   proche de Neue Brucke (bellevilles.fr). */
const HERO_FONT = {
  fontFamily: 'var(--font-bricolage), Arial, sans-serif',
  fontVariationSettings: "'opsz' 96",
} as const
const EASE = [0.21, 0.47, 0.32, 0.98] as const

/* Typographie francaise : espace insecable avant ? ! : ; pour que la
   ponctuation ne tombe jamais seule a la ligne (« MON MÉTIER » / « ? »). */
const insecable = (s: string) => s.replace(/\s+([?!:;»])/g, ' $1').replace(/(«)\s+/g, '$1 ')

export function Hero() {
  const { openDevis } = useModal()
  const t = useSiteTexts()

  const descendre = () => window.scrollBy({ top: window.innerHeight - 64, behavior: 'smooth' })

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: '100svh' }}>
      {/* Photo plein ecran */}
      <Image
        src="/images/topo-bg.jpg"
        alt="Crête montagneuse au-dessus de la mer de nuages"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        style={{ zIndex: 0 }}
      />
      {/* Voile : haut assombri pour la barre de navigation, bas pour les boutons,
          et un halo au centre — la brume claire de la photo passe juste derriere
          le titre, sans ce halo le blanc se lirait mal. */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            'radial-gradient(60% 50% at 50% 50%, rgba(10,14,22,0.38) 0%, rgba(10,14,22,0) 100%), linear-gradient(180deg, rgba(10,14,22,0.50) 0%, rgba(10,14,22,0.24) 35%, rgba(10,14,22,0.28) 65%, rgba(10,14,22,0.58) 100%)',
        }}
      />

      <div className="relative w-full px-6 md:px-12 lg:px-20 text-center" style={{ zIndex: 2, paddingTop: '80px' }}>
        <motion.p
          className="uppercase mb-6 md:mb-8"
          style={{ ...HERO_FONT, color: 'rgba(255,255,255,0.9)', fontWeight: 600, letterSpacing: '0.18em', fontSize: 'clamp(0.75rem, 1vw, 0.95rem)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {t('hero.eyebrow')}
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            className="uppercase"
            style={{
              ...HERO_FONT,
              color: '#FFFFFF',
              fontWeight: 650,
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              fontSize: 'clamp(3.4rem, 11vw, 10.5rem)',
              textShadow: '0 4px 40px rgba(0,0,0,0.25)',
            }}
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
          >
            {insecable(t('hero.title'))}
          </motion.h1>
        </div>

        <div className="overflow-hidden mt-3 md:mt-4">
          <motion.p
            style={{
              ...HERO_FONT,
              color: '#FFFFFF',
              fontWeight: 550,
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              fontSize: 'clamp(1.6rem, 4.2vw, 3.8rem)',
              textShadow: '0 2px 24px rgba(0,0,0,0.3)',
            }}
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.22, ease: EASE }}
          >
            {insecable(t('hero.subtitle'))}
          </motion.p>
        </div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 md:gap-4 mt-10 md:mt-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <button
            onClick={openDevis}
            className="flex items-center gap-2.5 uppercase px-8 py-4 rounded-full transition-transform duration-200 hover:-translate-y-0.5"
            style={{ ...HERO_FONT, borderRadius: '999px', backgroundColor: '#FFFFFF', color: 'var(--rt-primary)', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.06em' }}
          >
            <Phone size={15} />
            Appel gratuit (15 min)
          </button>
          <a
            href="/services"
            className="flex items-center gap-2 uppercase px-8 py-4 rounded-full transition-colors duration-200 hover:bg-white/10"
            style={{ ...HERO_FONT, borderRadius: '999px', color: '#FFFFFF', border: '1.5px solid rgba(255,255,255,0.85)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.06em' }}
          >
            Voir mes réalisations
            <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>

      {/* Pastille ronde pour descendre, comme sur bellevilles.fr */}
      <motion.button
        type="button"
        onClick={descendre}
        aria-label="Descendre vers la suite"
        className="absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-10 flex items-center justify-center rounded-full transition-transform duration-200 hover:scale-105"
        style={{ zIndex: 2, borderRadius: '999px', width: '52px', height: '52px', backgroundColor: 'var(--rt-primary)', color: '#FFFFFF' }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 1.2, duration: 0.6 }, y: { delay: 1.8, duration: 2.2, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <ArrowDown size={22} />
      </motion.button>
    </section>
  )
}

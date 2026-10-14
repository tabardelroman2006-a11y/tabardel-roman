'use client'

import { useState, type ReactNode } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Phone, MessageCircle, UserPlus, Mail, MapPin, Globe, Share2, ArrowUpRight, Check } from 'lucide-react'
import { CARTE } from './carte-data'

const EASE = [0.16, 1, 0.3, 1] as const

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.6h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.5 4.77 5.76v5.59h-4v-4.96c0-1.18-.02-2.7-1.7-2.7-1.7 0-1.96 1.28-1.96 2.6v5.06h-4v-11Z" />
    </svg>
  )
}

type Row = {
  href: string
  icon: ReactNode
  titre: string
  detail: string
  externe?: boolean
  principal?: boolean
}

export function CarteVisite() {
  const reduit = useReducedMotion()
  const [partage, setPartage] = useState<'idle' | 'copie'>('idle')

  const rise = (i: number) => ({
    initial: reduit ? { opacity: 0 } : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduit ? 0.3 : 0.9, delay: reduit ? 0 : 0.35 + i * 0.07, ease: EASE },
  })

  const avant: Row[] = [
    { href: `tel:${CARTE.telInternational}`, icon: <Phone size={20} />, titre: 'M’appeler', detail: CARTE.telAffiche, principal: true },
    { href: `sms:${CARTE.telInternational}?&body=${encodeURIComponent(CARTE.smsTexte)}`, icon: <MessageCircle size={20} />, titre: 'M’envoyer un message', detail: 'Par SMS, sur mon portable' },
    { href: '/carte/roman-tabardel.vcf?v=2', icon: <UserPlus size={20} />, titre: 'Enregistrer mon contact', detail: 'S’ajoute à votre téléphone' },
    { href: `mailto:${CARTE.email}?subject=${encodeURIComponent(CARTE.mailSujet)}`, icon: <Mail size={20} />, titre: 'M’écrire un e-mail', detail: CARTE.email },
  ]

  const apres: Row[] = [
    { href: CARTE.google, icon: <MapPin size={20} />, titre: 'Voir ma fiche Google', detail: 'Avis et informations', externe: true },
    { href: CARTE.site, icon: <Globe size={20} />, titre: 'Voir mon site', detail: CARTE.siteAffiche, externe: true },
  ]

  async function partager() {
    const url = `${CARTE.site}/carte`
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Roman Tabardel', text: 'La carte de visite de Roman Tabardel', url })
        return
      }
      await navigator.clipboard.writeText(url)
      setPartage('copie')
      setTimeout(() => setPartage('idle'), 2200)
    } catch {}
  }

  const ligne = (r: Row, i: number) => (
    <motion.a
      key={r.titre}
      href={r.href}
      {...(r.externe ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`carte-row${r.principal ? ' carte-row--main' : ''}`}
      whileTap={{ scale: 0.975 }}
      {...rise(i)}
    >
      <span className="carte-row__icon">{r.icon}</span>
      <span className="carte-row__text">
        <span className="carte-row__title">{r.titre}</span>
        <span className="carte-row__detail">{r.detail}</span>
      </span>
      <ArrowUpRight size={18} className="carte-row__arrow" aria-hidden="true" />
    </motion.a>
  )

  return (
    <div className="carte">
      <div className="carte__backdrop" aria-hidden="true">
        <Image src="/images/accueil/roman-dehors.jpg" alt="" fill sizes="100vw" className="carte__backdrop-img" priority />
      </div>

      <div className="carte__col">
        <motion.div
          className="carte__photo"
          initial={reduit ? { opacity: 0 } : { opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduit ? 0.3 : 1.6, ease: EASE }}
        >
          <Image
            src="/images/accueil/roman-dehors.jpg"
            alt="Roman Tabardel, créateur de sites web, devant son ordinateur"
            fill
            sizes="(max-width: 520px) 100vw, 480px"
            className="carte__photo-img"
            priority
          />
          <div className="carte__photo-fade" />
        </motion.div>

        <motion.button
          type="button"
          onClick={partager}
          className="carte__share"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          aria-label="Partager cette carte"
        >
          {partage === 'copie' ? <Check size={16} /> : <Share2 size={16} />}
          <span>{partage === 'copie' ? 'Lien copié' : 'Partager'}</span>
        </motion.button>

        <motion.section
          className="carte__card"
          initial={reduit ? { opacity: 0 } : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduit ? 0.3 : 1.1, delay: reduit ? 0 : 0.2, ease: EASE }}
        >
          <header className="carte__head">
            <p className="carte__eyebrow">
              <span className="carte__dot" />
              {CARTE.accroche}
            </p>
            <h1 className="carte__name">Roman<br />Tabardel</h1>
            <p className="carte__place"><MapPin size={14} aria-hidden="true" /> {CARTE.lieu}</p>
          </header>

          <nav className="carte__list" aria-label="Me contacter">
            {avant.map((r, i) => ligne(r, i))}

            <motion.div className="carte-social" {...rise(avant.length)}>
              <span className="carte-social__label">Mes réseaux sociaux</span>
              <div className="carte-social__grid">
                <motion.a href={CARTE.instagram} target="_blank" rel="noopener noreferrer" className="carte-social__btn" whileTap={{ scale: 0.97 }}>
                  <span className="carte-social__icon carte-social__icon--ig"><InstagramIcon /></span>
                  <span className="carte-social__text">
                    <span className="carte-social__name">Instagram</span>
                    <span className="carte-social__handle">{CARTE.instagramAffiche}</span>
                  </span>
                </motion.a>
                <motion.a href={CARTE.linkedin} target="_blank" rel="noopener noreferrer" className="carte-social__btn" whileTap={{ scale: 0.97 }}>
                  <span className="carte-social__icon carte-social__icon--in"><LinkedinIcon /></span>
                  <span className="carte-social__text">
                    <span className="carte-social__name">LinkedIn</span>
                    <span className="carte-social__handle">{CARTE.linkedinAffiche}</span>
                  </span>
                </motion.a>
              </div>
            </motion.div>

            {apres.map((r, i) => ligne(r, avant.length + 1 + i))}
          </nav>
        </motion.section>

        <motion.p className="carte__foot" {...rise(avant.length + apres.length + 2)}>
          Roman Tabardel · Sites web sur mesure
        </motion.p>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { Check, Copy, Smartphone } from 'lucide-react'
import { Panneau } from './champs'

type Appareil = 'iphone' | 'iphone-autre-appli' | 'android' | null

const CLE = 'rtParrainEcranPlusTard'
const SEPT_JOURS = 7 * 24 * 3600 * 1000

function detecter(): Appareil {
  const n = navigator as Navigator & { standalone?: boolean }
  if (n.standalone === true || matchMedia('(display-mode: standalone)').matches) return null
  const ua = n.userAgent
  const ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && n.maxTouchPoints > 1)
  if (ios) return /CriOS|FxiOS|EdgiOS|OPiOS|Instagram|FBAN|FBAV|Snapchat|LinkedInApp|GSA\//.test(ua) ? 'iphone-autre-appli' : 'iphone'
  if (/Android/.test(ua)) return 'android'
  return null
}

function reporte() {
  try { return Date.now() - Number(localStorage.getItem(CLE) || 0) < SEPT_JOURS } catch { return false }
}

const Partager = () => (
  <svg className="pr-home__ico" viewBox="0 0 24 24" aria-label="Partager"><path d="M12 3v12M7.5 7.5 12 3l4.5 4.5M5 12v7.5h14V12" /></svg>
)
const Points = ({ vertical = false }: { vertical?: boolean }) => <span className="pr-home__ico pr-home__ico--txt" aria-label="trois points">{vertical ? '⋮' : '•••'}</span>

export function EcranAccueil() {
  const [appareil, setAppareil] = useState<Appareil>(null)
  const [ouvert, setOuvert] = useState(false)
  const [copie, setCopie] = useState(false)

  useEffect(() => {
    const a = detecter()
    setAppareil(a)
    if (!a || reporte()) return
    const t = setTimeout(() => setOuvert(true), 1400)
    return () => clearTimeout(t)
  }, [])

  if (!appareil) return null

  const plusTard = () => {
    try { localStorage.setItem(CLE, String(Date.now())) } catch {}
    setOuvert(false)
  }

  async function copier() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopie(true)
      setTimeout(() => setCopie(false), 2000)
    } catch {}
  }

  return (
    <>
      <button type="button" className="pr-home__btn" onClick={() => setOuvert(true)}>
        <Smartphone size={17} /> Ajouter à mon écran d’accueil
      </button>

      {ouvert && (
        <Panneau
          titre="Votre espace en un toucher"
          intro="Une icône sur votre écran d’accueil, comme une appli : plus besoin de chercher le lien. Rien à télécharger."
          onClose={plusTard}
        >
          {appareil === 'iphone-autre-appli' && (
            <div className="pr-home__alerte">
              Ce lien est ouvert dans une autre appli. Copiez le lien, ouvrez <strong>Safari</strong>, collez le lien dans la barre d’adresse, puis suivez les étapes.
              <button type="button" className="pr-btn" style={{ marginTop: 12 }} onClick={copier}>
                {copie ? <><Check size={17} /> Lien copié</> : <><Copy size={17} /> Copier le lien</>}
              </button>
            </div>
          )}

          {appareil === 'android' ? (
            <ol className="pr-home__steps">
              <li><span className="pr-home__num">1</span><span>Touchez <Points vertical /> en haut à droite de Chrome</span></li>
              <li><span className="pr-home__num">2</span><span>Choisissez « Ajouter à l’écran d’accueil »</span></li>
              <li><span className="pr-home__num">3</span><span>Touchez « Ajouter »</span></li>
            </ol>
          ) : (
            <ol className="pr-home__steps">
              <li><span className="pr-home__num">1</span><span>Dans Safari, touchez <Partager /> ou <Points /> en bas de l’écran</span></li>
              <li><span className="pr-home__num">2</span><span>Choisissez « Sur l’écran d’accueil » (faites défiler la liste si besoin)</span></li>
              <li><span className="pr-home__num">3</span><span>Touchez « Ajouter » en haut à droite</span></li>
            </ol>
          )}

          <p className="pr-home__fin">L’icône « Parrainage » apparaît sur votre téléphone. Touchez-la pour revenir ici quand vous voulez.</p>
          <button type="button" className="pr-link" onClick={plusTard} style={{ background: 'none', border: 0, width: '100%', cursor: 'pointer' }}>Plus tard</button>
        </Panneau>
      )}
    </>
  )
}

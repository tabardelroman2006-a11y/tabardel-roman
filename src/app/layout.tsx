import type { Metadata } from 'next'
import { Barlow_Condensed, Bricolage_Grotesque, Nunito } from 'next/font/google'
import './globals.css'
import { ModalProvider } from '@/context/ModalContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { DevisModal } from '@/components/ui/DevisModal'
import { ThemeColors } from '@/components/ThemeColors'

const barlow = Barlow_Condensed({
  variable: '--font-barlow',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
})

/* Bricolage Grotesque : equivalent libre de Neue Brucke, la police du site
   bellevilles.fr (payante en usage commercial). Retenue apres comparaison
   de 20 polices a cote de l'originale : meme allure grasse et compacte,
   memes terminaisons taillees. Axes opsz (taille optique) et wdth. */
const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  axes: ['opsz', 'wdth'],
  display: 'swap',
})

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tabardel-roman.fr'),
  title: {
    default: 'Roman Tabardel | Création de sites web & SEO',
    template: '%s | Roman Tabardel',
  },
  description:
    'Création de sites web sur mesure et référencement naturel pour les artisans, TPE et PME. Des sites qui convertissent, partout en France.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Roman Tabardel',
    title: 'Roman Tabardel | Création de sites web & SEO',
    description: 'Des sites qui vendent. Pas des sites qui existent.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${barlow.variable} ${nunito.variable} ${bricolage.variable}`}>
      <body>
        <ModalProvider>
          <ThemeColors />
          <SmoothScroll>
            <Header />
            <main>{children}</main>
            <Footer />
            <DevisModal />
          </SmoothScroll>
        </ModalProvider>
      </body>
    </html>
  )
}

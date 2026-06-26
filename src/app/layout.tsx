import type { Metadata } from 'next'
import { Barlow_Condensed, Nunito } from 'next/font/google'
import './globals.css'
import { ModalProvider } from '@/context/ModalContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { DevisModal } from '@/components/ui/DevisModal'

const barlow = Barlow_Condensed({
  variable: '--font-barlow',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
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
    <html lang="fr" className={`${barlow.variable} ${nunito.variable}`}>
      <body>
        <ModalProvider>
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

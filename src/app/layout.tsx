import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { ModalProvider } from '@/context/ModalContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { DevisModal } from '@/components/ui/DevisModal'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tabardel-roman.fr'),
  title: {
    default: 'Roman Tabardel — Création de sites web & SEO',
    template: '%s — Roman Tabardel',
  },
  description:
    'Agence web premium pour TPE, PME, artisans et entrepreneurs. Création de sites vitrine, e-commerce et référencement naturel.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Roman Tabardel',
    title: 'Roman Tabardel — Création de sites web & SEO',
    description: 'Agence web premium pour TPE, PME, artisans et entrepreneurs.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
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

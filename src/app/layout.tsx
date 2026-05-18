import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { ModalProvider } from '@/context/ModalContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { DevisModal } from '@/components/ui/DevisModal'
import { GlobalLiquid } from '@/components/effects/GlobalLiquid'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
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
    description:
      'Agence web premium pour TPE, PME, artisans et entrepreneurs.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roman Tabardel — Création de sites web & SEO',
    description:
      'Agence web premium pour TPE, PME, artisans et entrepreneurs.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body style={{ backgroundColor: '#f2f2f0', cursor: 'none', overflowX: 'hidden' }}>
        {/* Canvas WebGL — image + effet liquide fusionnés */}
        <GlobalLiquid />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <ModalProvider>
            <SmoothScroll>
              <CustomCursor />
              <Header />
              <main>{children}</main>
              <Footer />
              <DevisModal />
            </SmoothScroll>
          </ModalProvider>
        </div>
      </body>
    </html>
  )
}

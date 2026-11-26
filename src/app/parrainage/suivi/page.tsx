import type { Metadata, Viewport } from 'next'
import { SuiviParrain } from '@/components/parrainage/SuiviParrain'

export const metadata: Metadata = {
  title: 'Mon espace parrain',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
  appleWebApp: { capable: true, title: 'Parrainage', statusBarStyle: 'default' },
  icons: { apple: '/images/logo-rt-carre.png' },
}

export const viewport: Viewport = {
  themeColor: '#F3F6FB',
}

export default function SuiviPage() {
  return <SuiviParrain />
}

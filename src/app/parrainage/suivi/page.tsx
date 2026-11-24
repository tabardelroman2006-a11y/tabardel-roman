import type { Metadata } from 'next'
import { SuiviParrain } from '@/components/parrainage/SuiviParrain'

export const metadata: Metadata = {
  title: 'Mon suivi de parrainage',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

export default function SuiviPage() {
  return <SuiviParrain />
}

import type { Metadata } from 'next'
import { CARTE } from '@/components/carte/carte-data'

export const SITE_URL = 'https://www.tabardel-roman.fr'
export const SITE_NAME = 'Roman Tabardel'
export const OG_IMAGE = { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Roman Tabardel, création de sites web et SEO' }

/* Next remplace l'objet openGraph du layout au lieu de le fusionner :
   chaque page repasse donc par ici pour garder image, locale et nom du site. */
export function pageMeta({
  title,
  description,
  path,
  ogTitle,
  image = OG_IMAGE,
}: {
  title: string
  description: string
  path: string
  ogTitle?: string
  image?: { url: string; width: number; height: number; alt?: string }
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      siteName: SITE_NAME,
      title: ogTitle ?? `${title} | ${SITE_NAME}`,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle ?? `${title} | ${SITE_NAME}`,
      description,
      images: [image.url],
    },
  }
}

export const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#entreprise`,
      name: SITE_NAME,
      description: 'Création de sites web sur mesure et référencement naturel pour les artisans, TPE et PME.',
      url: SITE_URL,
      image: `${SITE_URL}${OG_IMAGE.url}`,
      logo: `${SITE_URL}/images/logo-rt-carre.png`,
      telephone: CARTE.telInternational,
      email: CARTE.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Chemin des Lauriers',
        postalCode: '26400',
        addressLocality: 'Allex',
        addressRegion: 'Drôme',
        addressCountry: 'FR',
      },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Drôme' },
        { '@type': 'Country', name: 'France' },
      ],
      founder: { '@id': `${SITE_URL}/#roman` },
      sameAs: [CARTE.instagram, CARTE.linkedin],
      knowsAbout: ['Création de sites web', 'Référencement naturel (SEO)', 'Site vitrine', 'E-commerce', 'Refonte de site'],
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#roman`,
      name: 'Roman Tabardel',
      jobTitle: 'Créateur de sites web',
      url: `${SITE_URL}/notre-histoire`,
      image: `${SITE_URL}/images/accueil/roman-dehors.jpg`,
      worksFor: { '@id': `${SITE_URL}/#entreprise` },
      sameAs: [CARTE.linkedin, CARTE.instagram],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#site`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: 'fr-FR',
      publisher: { '@id': `${SITE_URL}/#entreprise` },
    },
  ],
}

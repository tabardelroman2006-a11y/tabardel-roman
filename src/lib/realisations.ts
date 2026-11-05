/* Réalisations : une fiche par client. Uniquement des projets livrés et en
   ligne, avec des faits vérifiables. */

const S = '/images/accueil/sites/'

export type Realisation = {
  slug: string
  nom: string
  ville: string
  categorie: string
  resume: string
  href: string
  domaine: string
  desk: string
  phone: string
  tags: string[]
  besoin: string
  solution: string[]
  resultat: string
  services: string[]
}

export const REALISATIONS: Realisation[] = [
  {
    slug: 'sultan-kebab-crest',
    nom: 'Sultan Kebab Crest',
    ville: 'Crest',
    categorie: 'Site de commande en ligne',
    resume: 'Un site de commande à emporter avec paiement par carte et une interface de caisse pour suivre les commandes en direct.',
    href: 'https://www.sultankebab-crest.fr/',
    domaine: 'sultankebab-crest.fr',
    desk: S + 'sultan-page.jpg',
    phone: S + 'sultan-page-mobile.jpg',
    tags: ['Commande en ligne', 'Paiement par carte', 'Interface caisse', 'Espace de gestion'],
    besoin:
      'Sultan Kebab, à Crest, voulait que ses clients puissent commander à l’avance et payer en ligne, sans passer par une plateforme de livraison qui prend une commission sur chaque commande.',
    solution: [
      'Un menu interactif, pensé pour commander en quelques gestes sur téléphone',
      'Le paiement par carte en ligne avec SumUp, ou en espèces au retrait',
      'Une interface de caisse où les commandes arrivent en temps réel',
      'Un e-mail de confirmation envoyé automatiquement au client',
      'Un espace de gestion pour gérer le menu et les commandes',
      'Une attention particulière à la sécurité des paiements et des données des clients',
    ],
    resultat:
      'Le site est en ligne depuis juin 2026 et reçoit les commandes du restaurant au quotidien. Je continue d’en assurer le suivi chaque mois.',
    services: ['site-e-commerce', 'maintenance'],
  },
  {
    slug: 'jr-maconnerie',
    nom: 'JR Maçonnerie Rénovation',
    ville: 'Allex',
    categorie: 'Site vitrine',
    resume: 'Le site vitrine d’une entreprise de maçonnerie et de rénovation : chantiers en photos, savoir-faire et demande de devis en ligne.',
    href: 'https://xn--jrmaonnerie-p9a.fr/',
    domaine: 'jrmaçonnerie.fr',
    desk: S + 'jr-page.jpg',
    phone: S + 'jr-page-mobile.jpg',
    tags: ['Site vitrine', 'Chantiers en photos', 'Demande de devis'],
    besoin:
      'JR Maçonnerie Rénovation, entreprise de maçonnerie et de gros œuvre installée à Allex, n’avait pas de site. Il lui fallait une présence sérieuse en ligne, à l’image de son travail, pour être trouvée et recevoir des demandes de devis.',
    solution: [
      'Une direction artistique sobre, inspirée de la pierre et de la chaux',
      'Les domaines d’intervention présentés clairement',
      'Les chantiers mis en valeur en photos',
      'Un formulaire de demande de devis simple',
      'Un site très léger, qui s’affiche vite même sur un chantier',
      'Les bases du référencement en place dès la mise en ligne',
    ],
    resultat: 'Le site a été livré en septembre 2026 et est en ligne sur jrmaçonnerie.fr.',
    services: ['site-vitrine', 'referencement-naturel'],
  },
]

export const realisation = (slug: string) => REALISATIONS.find(r => r.slug === slug)

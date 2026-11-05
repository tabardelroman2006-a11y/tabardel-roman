/* Pages locales « création de site internet + ville ». Chaque page a son
   propre texte : Google écarte les pages copiées où seul le nom change. */

import type { Faq } from './offres'

export type Ville = {
  slug: string
  nom: string
  dans: string
  seoDescription: string
  accroche: string
  intro: string
  local: string
  clients: string[]
  faq: Faq[]
}

export const VILLES: Ville[] = [
  {
    slug: 'valence',
    nom: 'Valence',
    dans: 'à Valence',
    seoDescription:
      'Création de site internet à Valence pour artisans, commerces et TPE : site vitrine, boutique en ligne et référencement Google, par un créateur indépendant installé à Allex.',
    accroche: 'Un créateur indépendant, à deux pas de Valence.',
    intro:
      'À Valence, les artisans et les commerces sont nombreux et vos clients comparent avant d’appeler. Un site clair, rapide sur téléphone et bien placé sur Google fait souvent la différence entre vous et le concurrent d’à côté.',
    local:
      'Je suis installé à Allex, tout près de Valence. On peut se voir pour parler de votre projet, et la suite se fait aussi bien en face à face qu’à distance, comme vous préférez.',
    clients: ['jr-maconnerie', 'sultan-kebab-crest'],
    faq: [
      { q: 'Vous vous déplacez à Valence ?', a: 'Oui, Valence est tout près d’Allex. On peut se rencontrer pour le premier rendez-vous, puis continuer en visio si c’est plus pratique pour vous.' },
      { q: 'Comment sortir sur Google à Valence ?', a: 'Il faut un site bien construit, des pages qui parlent de votre métier et de votre secteur, et une fiche Google complète. C’est exactement ce que je mets en place.' },
    ],
  },
  {
    slug: 'crest',
    nom: 'Crest',
    dans: 'à Crest',
    seoDescription:
      'Création de site internet à Crest et dans la vallée de la Drôme : site vitrine, site de commande en ligne et référencement Google pour artisans et commerces.',
    accroche: 'Déjà au service des commerces de Crest.',
    intro:
      'À Crest, je travaille déjà avec Sultan Kebab, dont les clients commandent et paient en ligne. Commerces, restaurants ou artisans de la vallée de la Drôme : un site bien pensé vous fait gagner des clients et du temps.',
    local:
      'Allex, où je suis installé, n’est qu’à quelques minutes de Crest. Je connais le tissu local et je peux passer vous voir pour parler de votre projet.',
    clients: ['sultan-kebab-crest', 'jr-maconnerie'],
    faq: [
      { q: 'Vous avez déjà travaillé à Crest ?', a: 'Oui : j’ai créé le site de commande en ligne de Sultan Kebab, à Crest, et j’en assure le suivi chaque mois.' },
      { q: 'Un restaurant peut-il prendre ses commandes en ligne sans plateforme ?', a: 'Oui. C’est ce que j’ai fait pour Sultan Kebab : les clients commandent et paient sur le site du restaurant, sans commission prise par une plateforme de livraison.' },
    ],
  },
  {
    slug: 'montelimar',
    nom: 'Montélimar',
    dans: 'à Montélimar',
    seoDescription:
      'Création de site internet à Montélimar pour artisans, commerces et TPE : site vitrine sur mesure, boutique en ligne et référencement naturel.',
    accroche: 'Des sites sur mesure pour les entreprises de Montélimar.',
    intro:
      'Que vous soyez artisan, commerçant ou à la tête d’une petite entreprise à Montélimar, votre site doit donner confiance dès les premières secondes et vous amener des demandes concrètes. Je le construis autour de votre métier, pas autour d’un modèle.',
    local:
      'Je suis basé dans la Drôme, à Allex. Pour Montélimar, on fait le premier point en visio ou en rendez-vous selon vos disponibilités, puis on avance ensemble à votre rythme.',
    clients: ['jr-maconnerie', 'sultan-kebab-crest'],
    faq: [
      { q: 'Faut-il se rencontrer pour créer le site ?', a: 'Ce n’est pas obligatoire : beaucoup de choses se font très bien à distance. Si vous préférez un rendez-vous, on l’organise.' },
      { q: 'Mon site doit-il parler de Montélimar ?', a: 'Oui, si vos clients sont locaux : mentionner votre secteur dans vos pages aide Google à vous montrer aux bonnes personnes.' },
    ],
  },
  {
    slug: 'romans-sur-isere',
    nom: 'Romans-sur-Isère',
    dans: 'à Romans-sur-Isère',
    seoDescription:
      'Création de site internet à Romans-sur-Isère pour artisans, créateurs et commerces : site vitrine, boutique en ligne et référencement Google.',
    accroche: 'Un site à la hauteur de votre savoir-faire.',
    intro:
      'Romans-sur-Isère a une vraie tradition de savoir-faire. Artisans, créateurs ou commerçants : votre site doit montrer la qualité de votre travail et permettre à vos clients de vous contacter, ou d’acheter, en quelques gestes.',
    local:
      'Je suis installé à Allex, dans la Drôme. On commence par un appel ou un rendez-vous pour comprendre votre activité, puis je vous propose une maquette concrète.',
    clients: ['jr-maconnerie', 'sultan-kebab-crest'],
    faq: [
      { q: 'Je suis créateur, je peux vendre mes pièces en ligne ?', a: 'Oui. Je crée des boutiques en ligne sur mesure, avec paiement par carte, gestion du stock et un espace simple pour ajouter vos articles.' },
      { q: 'Combien de temps pour avoir mon site ?', a: 'Comptez en général deux à trois semaines pour un site vitrine, un peu plus pour une boutique en ligne. Tout dépend aussi de la vitesse à laquelle on réunit les textes et les photos.' },
    ],
  },
]

export const ville = (slug: string) => VILLES.find(v => v.slug === slug)

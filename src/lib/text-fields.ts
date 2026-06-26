/**
 * Textes éditables du site — SOURCE UNIQUE des valeurs par défaut.
 * Fichier PUR (aucun import serveur) : importable côté client (sections + admin)
 * comme côté serveur. Chaque section lit son texte via useSiteTexts(key) avec
 * repli automatique sur le `default` ci-dessous.
 */
export type TextField = { key: string; label: string; default: string; multiline?: boolean }
export type TextGroup = { group: string; fields: TextField[] }

export const TEXT_GROUPS: TextGroup[] = [
  {
    group: 'Accueil — En-tête',
    fields: [
      { key: 'hero.eyebrow',     label: 'Petit texte au-dessus du titre', default: 'Création web & SEO, Drôme & partout en France' },
      { key: 'hero.title',       label: 'Titre principal',                default: 'Mon métier ?' },
      { key: 'hero.subtitle',    label: 'Sous-titre (en italique)',       default: 'Mettre en avant le vôtre.' },
      { key: 'hero.description', label: 'Description',                     default: 'Je conçois des sites web sur mesure qui convertissent, pour les artisans, indépendants et PME qui veulent une présence en ligne qui travaille vraiment pour eux.', multiline: true },
    ],
  },
  {
    group: 'Accueil — Services',
    fields: [
      { key: 'services.eyebrow',    label: 'Petit texte',  default: 'Ce que je fais' },
      { key: 'services.titleLine1', label: 'Titre ligne 1', default: 'Trois offres.' },
      { key: 'services.titleLine2', label: 'Titre ligne 2 (gris)', default: 'Zéro compromis.' },
    ],
  },
  {
    group: 'Accueil — Processus',
    fields: [
      { key: 'process.eyebrow',    label: 'Petit texte',  default: 'Comment ça marche' },
      { key: 'process.titleLine1', label: 'Titre ligne 1', default: 'De l’idée à la mise' },
      { key: 'process.titleLine2', label: 'Titre ligne 2 (gris)', default: 'en ligne en 3 semaines.' },
    ],
  },
  {
    group: 'Accueil — Appel final',
    fields: [
      { key: 'cta.eyebrow',     label: 'Petit texte',  default: 'Passons à l’action' },
      { key: 'cta.titleLine1',  label: 'Titre ligne 1', default: 'Votre prochain site' },
      { key: 'cta.titleLine2',  label: 'Titre ligne 2', default: 'commence par un appel.' },
      { key: 'cta.description', label: 'Description',   default: '15 minutes, sans engagement. On parle de votre projet, je vous dis exactement ce que je peux faire pour vous, et pour combien.', multiline: true },
    ],
  },
]

export const TEXT_DEFAULTS: Record<string, string> = Object.fromEntries(
  TEXT_GROUPS.flatMap(g => g.fields.map(f => [f.key, f.default])),
)

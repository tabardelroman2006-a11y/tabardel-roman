/**
 * Liste des pages que l'admin peut masquer / afficher.
 * Fichier PUR (aucun import serveur) — importable côté client ET serveur.
 * L'accueil (/) n'est volontairement pas masquable.
 */
export const HIDEABLE_PAGES = [
  { path: '/services',       label: 'Services' },
  { path: '/notre-histoire', label: 'À propos' },
  { path: '/contact',        label: 'Contact'  },
] as const

export type HideablePath = (typeof HIDEABLE_PAGES)[number]['path']

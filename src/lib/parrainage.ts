/* Regles du parrainage, partagees entre la page publique, le suivi du
   parrain et l'admin. Fichier sans dependance serveur. */

export const MONTANT_MINIMUM = 800
export const PRIME = 100

export const STATUTS = [
  { id: 'recu',       label: 'Recommandation reçue' },
  { id: 'contacte',   label: 'Contacté par Roman' },
  { id: 'devis',      label: 'Devis envoyé' },
  { id: 'signe',      label: 'Projet signé' },
  { id: 'livre',      label: 'Site livré et payé' },
  { id: 'sans_suite', label: 'Sans suite' },
] as const

export type Statut = (typeof STATUTS)[number]['id']

export const statutLabel = (s: Statut) => STATUTS.find(x => x.id === s)?.label ?? s

export type Parrain = {
  id: string
  prenom: string
  nom: string
  email: string
  telephone: string
  creeLe: string
}

export type Filleul = {
  id: string
  parrainId: string
  nom: string
  entreprise: string
  telephone: string
  email: string
  ville: string
  projet: string
  creeLe: string
  statut: Statut
  montant: number | null
  recompenseVerseeLe: string | null
  note: string
}

/* aucune : projet en cours ; non_eligible : livre mais hors conditions ;
   due : a verser ; versee : reglee. */
export type EtatRecompense = 'aucune' | 'non_eligible' | 'due' | 'versee'

export function etatRecompense(f: Pick<Filleul, 'statut' | 'montant' | 'recompenseVerseeLe'>): EtatRecompense {
  if (f.recompenseVerseeLe) return 'versee'
  if (f.statut !== 'livre') return f.statut === 'sans_suite' ? 'non_eligible' : 'aucune'
  if (f.montant === null) return 'aucune'
  return f.montant >= MONTANT_MINIMUM ? 'due' : 'non_eligible'
}

export const normaliserTel = (t: string) => t.replace(/[^\d+]/g, '').replace(/^\+33/, '0')
export const normaliserEmail = (e: string) => e.trim().toLowerCase()

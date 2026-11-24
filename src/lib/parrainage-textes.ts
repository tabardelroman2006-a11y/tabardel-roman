import { MONTANT_MINIMUM, PRIME } from './parrainage'

/* Textes de l'appli de parrainage (un seul endroit a modifier). */

const euros = (n: number) => n.toLocaleString('fr-FR')

export const ETAPES = [
  { titre: 'Inscrivez-vous', texte: 'Une minute, sans mot de passe. Vous recevez votre espace parrain personnel.' },
  { titre: 'Recommandez', texte: 'Indiquez qui a besoin d’un site. Je le contacte de votre part.' },
  { titre: 'Suivez', texte: 'Voyez où en est chaque projet : contacté, devis, signé, livré.' },
  { titre: `Recevez ${PRIME} €`, texte: 'Site livré et payé : je vous fais un virement.' },
]

export const COMPTE = [
  'Une personne ou une entreprise qui a besoin d’un site, d’une boutique en ligne, d’une refonte ou de référencement',
  `Un projet d’au moins ${euros(MONTANT_MINIMUM)} €`,
  'Quelqu’un qui n’était pas déjà en contact avec moi',
  'Client ou non, ami, voisin, collègue : tout le monde peut parrainer',
]

export const COMPTE_PAS = [
  `Les petits travaux de moins de ${euros(MONTANT_MINIMUM)} €`,
  'Une personne qui m’avait déjà contacté avant vous',
  'Se recommander soi-même ou sa propre entreprise',
  'Un projet abandonné ou non payé',
]

export const FAQ = [
  { q: 'Qui peut devenir parrain ?', a: 'Tout le monde, à partir de 18 ans : un client, un ami, un commerçant, un artisan… Pas besoin d’avoir travaillé avec moi. L’inscription est gratuite et ne vous engage à rien.' },
  { q: `Quand est-ce que je reçois les ${PRIME} € ?`, a: 'Quand le site de la personne recommandée est livré et entièrement payé. Je vous appelle pour votre RIB et je fais le virement dans les 30 jours. Vos coordonnées bancaires ne sont jamais demandées ici.' },
  { q: 'Pourquoi attendre que le site soit livré et payé ?', a: 'Un projet peut changer ou s’arrêter en route. En attendant la fin, je suis sûr de vous récompenser pour un vrai projet abouti, et vous suivez chaque étape depuis votre espace.' },
  { q: 'Combien de personnes puis-je recommander ?', a: `Autant que vous voulez : ${PRIME} € pour chaque projet abouti, sans limite.` },
  { q: 'Que se passe-t-il après ma recommandation ?', a: 'Je contacte la personne de votre part pour comprendre son projet et, si elle le souhaite, je lui envoie un devis. Vous suivez chaque étape dans votre espace parrain.' },
  { q: 'Dois-je prévenir la personne avant ?', a: 'Oui, c’est obligatoire : elle doit être d’accord pour que je l’appelle.' },
  { q: 'Et si quelqu’un l’a déjà recommandée ?', a: 'C’est la première recommandation enregistrée qui compte. Une personne déjà en contact avec moi avant votre recommandation ne compte pas non plus.' },
  { q: 'Je suis déjà client, ça marche aussi ?', a: `Oui, exactement pareil : ${PRIME} € par virement pour chaque projet abouti grâce à vous.` },
  { q: 'Voyez-vous le prix des projets ?', a: 'Non. Dans votre espace, vous voyez seulement l’étape où en est chaque projet, jamais son prix.' },
  { q: 'J’ai perdu le lien de mon espace', a: 'Appelez-moi au 06 18 13 53 84 ou écrivez à contact@tabardel-roman.fr, je vous le renvoie. Pensez à ajouter la page à vos favoris ou à votre écran d’accueil.' },
  { q: 'Dois-je déclarer cette somme aux impôts ?', a: 'Selon votre situation, les sommes reçues peuvent être à déclarer. En cas de doute, renseignez-vous auprès de votre centre des impôts.' },
]

export const REGLEMENT = [
  'Le parrainage est proposé par Roman Tabardel, entrepreneur individuel, Chemin des Lauriers, 26400 Allex. Il est gratuit et ouvert à toute personne majeure qui s’inscrit sur cette page.',
  'Le parrain recommande une personne ou une entreprise qui a besoin d’un site internet ou de référencement, depuis son espace personnel. Il s’engage à avoir obtenu son accord avant de la recommander.',
  'La recommandation compte si la personne n’était pas déjà en contact avec Roman Tabardel, si elle n’est pas le parrain lui-même ou sa propre entreprise, et si personne ne l’a recommandée avant.',
  `Le parrain reçoit ${PRIME} € quand le site de la personne recommandée est livré et entièrement payé, pour un projet d’au moins ${euros(MONTANT_MINIMUM)} €. Un projet abandonné, annulé ou impayé ne donne droit à rien.`,
  `Les ${PRIME} € sont versés par virement bancaire dans les 30 jours suivant le paiement complet. Roman Tabardel contacte le parrain pour obtenir ses coordonnées bancaires.`,
  `Il n’y a pas de limite : ${PRIME} € pour chaque projet abouti.`,
  'Les sommes reçues peuvent être à déclarer aux impôts selon la situation du parrain.',
  'Les coordonnées du parrain et de la personne recommandée servent uniquement au parrainage (voir la politique de confidentialité du site). Elles peuvent être supprimées sur simple demande.',
  'Roman Tabardel peut modifier ou arrêter le parrainage à tout moment. Les recommandations déjà enregistrées gardent les conditions en vigueur au jour de leur envoi. Toute recommandation faite de mauvaise foi peut être refusée.',
]

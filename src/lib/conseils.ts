/* Page Conseils : articles courts et concrets pour les artisans et TPE.
   Ajouter un article = ajouter un objet ici (le plus récent en premier). */

export type Bloc =
  | { type: 'p'; texte: string }
  | { type: 'h2'; texte: string }
  | { type: 'liste'; items: string[] }

export type Conseil = {
  slug: string
  titre: string
  seoTitre: string
  description: string
  date: string
  lecture: string
  chapo: string
  contenu: Bloc[]
  services: string[]
}

export const CONSEILS: Conseil[] = [
  {
    slug: 'fiche-google-artisan',
    titre: 'Fiche Google : les réglages qui font venir des clients',
    seoTitre: 'Fiche Google pour artisan : les réglages pour être trouvé près de chez vous',
    description:
      'Votre fiche d’établissement Google est souvent la première chose qu’un client voit. Voici les réglages simples pour qu’elle vous amène des appels.',
    date: '2026-11-05',
    lecture: '5 min',
    chapo:
      'Quand quelqu’un cherche « maçon près de chez moi » ou « plombier Valence », Google affiche d’abord une carte avec trois entreprises. Votre fiche Google décide si vous en faites partie. Bonne nouvelle : elle est gratuite, et quelques réglages changent beaucoup de choses.',
    contenu: [
      { type: 'h2', texte: 'Choisir la bonne catégorie' },
      { type: 'p', texte: 'C’est le réglage le plus important. La catégorie principale doit décrire votre métier le plus précisément possible : « Entreprise de maçonnerie » plutôt que « Entrepreneur ». Vous pouvez ajouter des catégories secondaires pour vos autres activités, sans en mettre trop.' },
      { type: 'h2', texte: 'Des informations complètes et identiques partout' },
      { type: 'p', texte: 'Nom, adresse, téléphone et horaires doivent être exactement les mêmes sur votre fiche, sur votre site et sur les annuaires. Une adresse écrite de deux façons différentes, ou un ancien numéro qui traîne, sème le doute chez Google comme chez vos clients.' },
      { type: 'liste', items: ['Le nom réel de l’entreprise, sans mots-clés ajoutés', 'Un numéro de téléphone où l’on vous joint vraiment', 'Les horaires, y compris les fermetures exceptionnelles', 'La zone d’intervention si vous vous déplacez chez vos clients', 'Le lien vers votre site internet'] },
      { type: 'h2', texte: 'Des photos de vrais chantiers' },
      { type: 'p', texte: 'Les fiches avec des photos inspirent beaucoup plus confiance. Ajoutez régulièrement des photos de vos réalisations, de votre équipe, de votre véhicule ou de votre atelier. Des photos prises au téléphone suffisent, tant qu’elles sont nettes et bien éclairées.' },
      { type: 'h2', texte: 'Demander des avis, et y répondre' },
      { type: 'p', texte: 'Les avis comptent à la fois pour Google et pour la personne qui hésite. Le plus simple est de demander à vos clients satisfaits, juste après un chantier réussi, en leur envoyant le lien direct vers votre fiche. Répondez à chaque avis, y compris aux moins bons : une réponse calme et professionnelle rassure plus qu’une note parfaite.' },
      { type: 'h2', texte: 'Relier la fiche à un vrai site' },
      { type: 'p', texte: 'La fiche donne envie, le site convainc. Un client qui clique sur « Site web » veut voir vos réalisations, comprendre ce que vous faites et vous contacter facilement. Une fiche bien remplie reliée à un site clair et rapide, c’est la meilleure combinaison pour être choisi.' },
    ],
    services: ['referencement-naturel', 'site-vitrine'],
  },
  {
    slug: 'site-internet-ou-page-facebook',
    titre: 'Site internet ou page Facebook : que choisir quand on est artisan ?',
    seoTitre: 'Site internet ou page Facebook pour un artisan : que choisir ?',
    description:
      'Une page Facebook est gratuite, un site internet demande un investissement. Les deux n’ont pas le même rôle : voici comment choisir selon votre activité.',
    date: '2026-11-05',
    lecture: '4 min',
    chapo:
      'Beaucoup d’artisans commencent avec une page Facebook ou Instagram, et c’est une bonne idée. Mais vient souvent le moment où l’on se demande si cela suffit. La réponse dépend de ce que vous attendez de votre présence en ligne.',
    contenu: [
      { type: 'h2', texte: 'Ce que font bien les réseaux sociaux' },
      { type: 'p', texte: 'Les réseaux sont parfaits pour montrer votre travail au jour le jour, garder le contact avec les clients qui vous connaissent déjà et être recommandé. Ils sont gratuits et rapides à mettre à jour.' },
      { type: 'h2', texte: 'Leurs limites' },
      { type: 'liste', items: ['Une personne qui cherche votre métier sur Google tombe rarement sur une page Facebook', 'Vos publications disparaissent vite dans le fil d’actualité', 'Vous ne maîtrisez ni la présentation, ni les règles, qui changent régulièrement', 'Tout le monde n’a pas de compte, et certains clients professionnels ne vont pas sur les réseaux'] },
      { type: 'h2', texte: 'Ce qu’apporte un site internet' },
      { type: 'p', texte: 'Un site vous appartient. Il peut sortir sur Google quand quelqu’un cherche votre métier dans votre secteur, il présente vos services et vos réalisations de façon claire et durable, et il permet de recevoir des demandes de devis précises. Pour un client qui ne vous connaît pas encore, c’est souvent ce qui fait la différence entre vous appeler ou appeler le suivant.' },
      { type: 'h2', texte: 'Le bon choix : les deux, chacun à sa place' },
      { type: 'p', texte: 'Le site est votre base : c’est là que l’on vous trouve et que l’on vous contacte. Les réseaux servent à faire vivre votre activité et à renvoyer vers le site. Si vous devez commencer par un seul, demandez-vous d’où viennent vos clients : surtout du bouche-à-oreille, les réseaux peuvent suffire un temps. Vous voulez de nouveaux clients qui vous cherchent sur Google, le site devient indispensable.' },
    ],
    services: ['site-vitrine', 'referencement-naturel'],
  },
  {
    slug: 'temps-pour-apparaitre-sur-google',
    titre: 'Combien de temps pour apparaître sur Google ?',
    seoTitre: 'Combien de temps pour qu’un nouveau site apparaisse sur Google ?',
    description:
      'Votre nouveau site est en ligne mais introuvable sur Google ? C’est normal au début. Voici comment cela se passe et ce qui accélère les choses.',
    date: '2026-11-05',
    lecture: '4 min',
    chapo:
      'C’est la question que l’on me pose le plus après une mise en ligne : « Pourquoi je ne me trouve pas sur Google ? ». Un site neuf n’apparaît pas du jour au lendemain, et ce délai n’a rien d’inquiétant. Voici ce qui se passe en coulisses.',
    contenu: [
      { type: 'h2', texte: 'Trois étapes avant d’être visible' },
      { type: 'liste', items: ['Google découvre votre site, en suivant un lien ou grâce au plan du site qu’on lui envoie', 'Il l’explore et range chaque page dans son index', 'Il décide ensuite à quelle place vous montrer, pour quelles recherches'] },
      { type: 'p', texte: 'Les deux premières étapes prennent en général de quelques jours à quelques semaines. La troisième est plus longue : elle s’améliore au fil des mois, à mesure que Google fait confiance à votre site.' },
      { type: 'h2', texte: 'Ce qui accélère les choses' },
      { type: 'liste', items: ['Déclarer le site dans Google Search Console et y envoyer le plan du site', 'Avoir une fiche Google complète qui renvoie vers le site', 'Des pages claires pour chaque service, avec votre ville ou votre secteur', 'Un site rapide et agréable sur téléphone', 'Des liens vers votre site depuis d’autres sites : annuaires sérieux, partenaires, fournisseurs'] },
      { type: 'h2', texte: 'Votre nom d’abord, votre métier ensuite' },
      { type: 'p', texte: 'En général, on se trouve d’abord en tapant le nom de son entreprise. Sortir sur une recherche comme « menuisier Crest » demande plus de temps et de travail, car vous êtes alors en concurrence avec d’autres entreprises. C’est là que le référencement fait la différence.' },
      { type: 'h2', texte: 'Méfiez-vous des promesses' },
      { type: 'p', texte: 'Personne ne peut garantir une première place sur Google, ni une date précise. Un travail sérieux, ce sont des bases techniques propres, des contenus utiles et un suivi dans le temps. C’est ce qui donne des résultats qui durent.' },
    ],
    services: ['referencement-naturel', 'maintenance'],
  },
]

export const conseil = (slug: string) => CONSEILS.find(c => c.slug === slug)

export const dateFr = (iso: string) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

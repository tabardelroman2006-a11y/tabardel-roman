/* Pages services : une page par offre, pour qu'elle sorte sur sa propre
   recherche Google. Contenu pur (aucun import), lisible client et serveur. */

export type Faq = { q: string; a: string }

export type Offre = {
  slug: string
  nom: string
  seoTitre: string
  seoDescription: string
  eyebrow: string
  titre: string
  accroche: string
  intro: string
  pourQui: string[]
  inclus: { titre: string; texte: string }[]
  etapes: { titre: string; texte: string }[]
  realisations: string[]
  faq: Faq[]
}

export const OFFRES: Offre[] = [
  {
    slug: 'site-vitrine',
    nom: 'Site vitrine',
    seoTitre: 'Création de site vitrine sur mesure pour artisans et TPE',
    seoDescription:
      'Création de site vitrine sur mesure pour artisans, commerces et TPE dans la Drôme : design unique, rapide sur téléphone, pensé pour Google et pour faire venir des demandes de devis.',
    eyebrow: 'Site vitrine',
    titre: 'Un site qui fait venir des clients',
    accroche: 'Votre savoir-faire, enfin visible en ligne.',
    intro:
      'Un site vitrine, c’est votre devanture sur internet. Il présente votre métier, montre vos réalisations et donne envie de vous appeler. Je le conçois à partir de votre activité, jamais à partir d’un modèle tout fait.',
    pourQui: [
      'Les artisans qui veulent montrer leurs chantiers et recevoir des demandes de devis',
      'Les commerces et restaurants qui veulent être trouvés sur Google',
      'Les entreprises dont le site actuel est vieillissant, lent ou illisible sur téléphone (refonte)',
    ],
    inclus: [
      { titre: 'Un design unique', texte: 'Pensé pour votre métier et votre image, avec vos photos et vos couleurs.' },
      { titre: 'Parfait sur téléphone', texte: 'La majorité de vos visiteurs arrivent depuis un téléphone : tout est conçu pour eux d’abord.' },
      { titre: 'Prêt pour Google', texte: 'Titres, descriptions, plan du site et données structurées sont en place dès la mise en ligne.' },
      { titre: 'Demande de devis en ligne', texte: 'Un formulaire simple qui vous arrive directement, pour ne plus rater un client.' },
      { titre: 'Votre espace de gestion', texte: 'Selon le projet, un espace pour modifier vous-même vos textes et vos photos.' },
      { titre: 'Mise en ligne clés en main', texte: 'Nom de domaine, hébergement, sécurité : je m’occupe de tout.' },
    ],
    etapes: [
      { titre: 'On en parle', texte: 'Un premier appel pour comprendre votre activité, vos clients et ce que vous attendez du site.' },
      { titre: 'Je vous propose une maquette', texte: 'Vous voyez votre futur site en vrai avant de vous engager plus loin.' },
      { titre: 'Je le construis', texte: 'Textes, photos, pages : on ajuste ensemble jusqu’à ce qu’il vous ressemble.' },
      { titre: 'Mise en ligne', texte: 'Le site est publié sur votre nom de domaine et déclaré à Google.' },
    ],
    realisations: ['jr-maconnerie'],
    faq: [
      { q: 'Je n’ai pas de photos professionnelles, est-ce un problème ?', a: 'Non. On part de ce que vous avez. Des photos de chantier prises au téléphone, bien choisies et bien mises en valeur, font souvent mieux qu’une banque d’images.' },
      { q: 'Est-ce que je pourrai modifier mon site moi-même ?', a: 'Oui, si vous le souhaitez : je peux vous installer un espace de gestion pensé pour votre site. Sinon, je m’occupe des modifications pour vous.' },
      { q: 'Mon site actuel est vieux, vous pouvez le refaire ?', a: 'Oui. Je reprends vos contenus utiles, je refais le design et je garde vos adresses de pages pour ne pas perdre votre place sur Google.' },
    ],
  },
  {
    slug: 'site-e-commerce',
    nom: 'Boutique en ligne',
    seoTitre: 'Création de boutique en ligne et site e-commerce sur mesure',
    seoDescription:
      'Création de boutique en ligne sur mesure : paiement par carte sécurisé, gestion des commandes et du stock, espace de gestion simple. Sans abonnement à une plateforme.',
    eyebrow: 'Boutique en ligne',
    titre: 'Vendez en ligne, simplement',
    accroche: 'Une boutique à vous, sans abonnement à une plateforme.',
    intro:
      'Je crée des boutiques en ligne et des sites de commande sur mesure : vos clients choisissent, paient par carte, et vous suivez tout depuis un espace de gestion clair. Pas de plateforme imposée, pas de commission cachée sur vos ventes.',
    pourQui: [
      'Les créateurs et artisans qui veulent vendre leurs pièces en ligne',
      'Les restaurants qui veulent prendre les commandes à emporter en ligne',
      'Les commerces qui payent cher une plateforme et veulent un site à eux',
    ],
    inclus: [
      { titre: 'Paiement par carte sécurisé', texte: 'Carte bancaire, Apple Pay et Google Pay selon le prestataire choisi.' },
      { titre: 'Gestion des commandes', texte: 'Chaque commande arrive dans votre espace, avec son statut et les coordonnées du client.' },
      { titre: 'Stock et catalogue', texte: 'Ajoutez vos articles, vos photos et vos prix vous-même, le stock se met à jour à chaque vente.' },
      { titre: 'Livraison ou retrait', texte: 'Livraison, point relais ou retrait sur place : selon votre façon de travailler.' },
      { titre: 'E-mails automatiques', texte: 'Le client reçoit sa confirmation, vous êtes prévenu de chaque nouvelle commande.' },
      { titre: 'Rapide et sécurisé', texte: 'Un site léger qui charge vite, et des protections contre la fraude.' },
    ],
    etapes: [
      { titre: 'On définit votre boutique', texte: 'Produits, livraison, paiement : on part de votre façon de vendre aujourd’hui.' },
      { titre: 'Maquette et parcours d’achat', texte: 'Vous testez le parcours comme un client, avant la mise en ligne.' },
      { titre: 'Mise en place du paiement', texte: 'Je relie la boutique à votre compte de paiement et je vérifie chaque étape.' },
      { titre: 'Lancement et prise en main', texte: 'Je vous montre comment gérer vos commandes et vos articles au quotidien.' },
    ],
    realisations: ['sultan-kebab-crest'],
    faq: [
      { q: 'Je suis sur une plateforme payante, vous pouvez reprendre ma boutique ?', a: 'Oui. Je récupère vos produits, vos photos et vos textes pour reconstruire une boutique à vous, sans abonnement mensuel à la plateforme.' },
      { q: 'Quel moyen de paiement utiliser ?', a: 'On choisit ensemble selon votre activité. J’ai déjà mis en place SumUp et Stripe : l’argent arrive directement sur votre compte.' },
      { q: 'Est-ce que je pourrai ajouter mes produits moi-même ?', a: 'Oui. Votre espace de gestion vous permet d’ajouter, modifier ou retirer un article, ses photos, son prix et son stock.' },
    ],
  },
  {
    slug: 'referencement-naturel',
    nom: 'Référencement Google',
    seoTitre: 'Référencement naturel (SEO) et audit pour être trouvé sur Google',
    seoDescription:
      'Référencement naturel pour artisans et TPE : audit, optimisation technique, contenus et fiche Google. Pour être trouvé par vos clients près de chez vous.',
    eyebrow: 'Référencement naturel',
    titre: 'Être trouvé sur Google',
    accroche: 'Un beau site ne sert à rien si personne ne le voit.',
    intro:
      'Le référencement naturel, c’est le travail qui permet à votre site de sortir quand un client cherche votre métier près de chez lui. Je commence par un audit clair, puis je corrige ce qui vous freine et je suis l’évolution dans le temps.',
    pourQui: [
      'Les entreprises qui ont un site mais ne reçoivent aucun contact',
      'Les artisans qui veulent sortir sur « leur métier + leur ville »',
      'Ceux qui veulent savoir où ils en sont avant de refaire leur site (audit)',
    ],
    inclus: [
      { titre: 'Audit complet', texte: 'Ce qui marche, ce qui bloque et ce qu’il faut faire en priorité, expliqué simplement.' },
      { titre: 'Technique', texte: 'Vitesse, adresses des pages, plan du site, balises : tout ce que Google lit sans que vous le voyiez.' },
      { titre: 'Contenus', texte: 'Des pages écrites pour les recherches de vos clients, sans remplissage.' },
      { titre: 'Fiche Google', texte: 'Votre fiche d’établissement complète et cohérente avec votre site.' },
      { titre: 'Search Console', texte: 'Votre site déclaré à Google, pour suivre les recherches qui vous amènent des visiteurs.' },
      { titre: 'Suivi', texte: 'Un point régulier sur ce qui progresse et ce qui reste à faire.' },
    ],
    etapes: [
      { titre: 'Audit', texte: 'J’analyse votre site, vos concurrents et les recherches de vos clients.' },
      { titre: 'Plan d’action', texte: 'Une liste claire, classée par priorité, sans jargon.' },
      { titre: 'Corrections', texte: 'Je corrige la technique et j’améliore ou crée les pages utiles.' },
      { titre: 'Suivi', texte: 'On mesure les résultats et on ajuste.' },
    ],
    realisations: ['jr-maconnerie', 'sultan-kebab-crest'],
    faq: [
      { q: 'En combien de temps verrai-je des résultats ?', a: 'Le référencement prend du temps : Google doit d’abord explorer et réévaluer votre site. Les premiers effets se voient généralement après quelques semaines, et cela continue de progresser ensuite.' },
      { q: 'Pouvez-vous me garantir la première place ?', a: 'Non, et méfiez-vous de ceux qui le promettent : personne ne contrôle Google. Je vous garantis un travail sérieux, expliqué, et des résultats suivis.' },
      { q: 'Faut-il refaire mon site pour être mieux référencé ?', a: 'Pas forcément. L’audit sert justement à le savoir : parfois quelques corrections suffisent, parfois le site lui-même freine tout.' },
    ],
  },
  {
    slug: 'maintenance',
    nom: 'Maintenance et suivi',
    seoTitre: 'Maintenance de site internet : mises à jour, sécurité et modifications',
    seoDescription:
      'Maintenance de site internet pour artisans et TPE : hébergement, sécurité, sauvegardes, petites modifications et contrôle régulier. Votre site reste à jour sans que vous ayez à y penser.',
    eyebrow: 'Maintenance et suivi',
    titre: 'Votre site, entre de bonnes mains',
    accroche: 'Vous travaillez, je veille sur votre site.',
    intro:
      'Un site, ça vit : il faut le garder à jour, sécurisé et rapide, et changer un horaire ou une photo quand il le faut. Avec le suivi mensuel, vous n’avez plus à vous en occuper.',
    pourQui: [
      'Ceux qui n’ont pas le temps de gérer leur site',
      'Les boutiques et sites de commande qui ne peuvent pas se permettre une panne',
      'Les sites que j’ai créés comme ceux faits ailleurs',
    ],
    inclus: [
      { titre: 'Hébergement', texte: 'Votre site hébergé, rapide et disponible.' },
      { titre: 'Sécurité', texte: 'Mises à jour et corrections de sécurité dès qu’elles sont nécessaires.' },
      { titre: 'Sauvegardes', texte: 'Le code et les données sont sauvegardés, pour ne rien perdre.' },
      { titre: 'Petites modifications', texte: 'Un texte, une photo, un horaire : vous me demandez, je m’en occupe.' },
      { titre: 'Contrôle régulier', texte: 'Je vérifie que tout fonctionne : pages, formulaires, paiements.' },
      { titre: 'Un interlocuteur', texte: 'Vous parlez toujours à la même personne, qui connaît votre site.' },
    ],
    etapes: [
      { titre: 'État des lieux', texte: 'Je fais le point sur votre site et ce qu’il faut surveiller.' },
      { titre: 'Mise en place', texte: 'Hébergement, sauvegardes et accès sont organisés proprement.' },
      { titre: 'Suivi', texte: 'Je contrôle votre site régulièrement et je corrige ce qui doit l’être.' },
      { titre: 'À la demande', texte: 'Vous m’envoyez vos modifications quand vous en avez besoin.' },
    ],
    realisations: ['sultan-kebab-crest', 'jr-maconnerie'],
    faq: [
      { q: 'Je ne suis pas obligé de prendre la maintenance ?', a: 'Non. Votre site vous appartient. Le suivi est là pour ceux qui préfèrent ne pas s’en occuper.' },
      { q: 'Vous pouvez reprendre un site fait par quelqu’un d’autre ?', a: 'Oui, après un état des lieux pour vérifier dans quel état il se trouve et ce qu’il faut corriger en priorité.' },
      { q: 'Combien de temps pour une modification ?', a: 'Les petites modifications sont faites rapidement, selon leur nature. On en parle ensemble au moment de la demande.' },
    ],
  },
  {
    slug: 'assistant-telephonique',
    nom: 'Assistant téléphonique',
    seoTitre: 'Assistant téléphonique intelligent pour artisans : ne ratez plus un appel',
    seoDescription:
      'Un assistant téléphonique intelligent qui répond quand vous êtes sur un chantier : il prend le nom, le numéro et la demande du client, et vous envoie un résumé clair.',
    eyebrow: 'Assistant téléphonique',
    titre: 'Ne ratez plus un appel',
    accroche: 'Quand vous êtes sur un chantier, il répond à votre place.',
    intro:
      'Un client qui tombe sur une messagerie appelle souvent le suivant. Mon assistant téléphonique répond à votre place avec une voix naturelle, comprend la demande, note les coordonnées et vous laisse un résumé clair, prêt à être rappelé.',
    pourQui: [
      'Les artisans qui ne peuvent pas décrocher pendant leurs chantiers',
      'Les petites entreprises sans secrétariat',
      'Ceux qui reçoivent des appels le soir ou le week-end',
    ],
    inclus: [
      { titre: 'Répond comme vous le feriez', texte: 'Il présente votre entreprise et répond aux questions simples avec vos informations.' },
      { titre: 'Ne laisse partir personne sans numéro', texte: 'Il demande toujours le nom et le numéro pour que vous puissiez rappeler.' },
      { titre: 'Résumé de chaque appel', texte: 'La demande, l’urgence et le moment conseillé pour rappeler, en quelques lignes.' },
      { titre: 'Clients mécontents signalés', texte: 'Un appel tendu est mis en avant pour que vous le traitiez en premier.' },
      { titre: 'Tout dans votre espace', texte: 'Les appels arrivent dans votre espace de gestion, avec la transcription complète.' },
      { titre: 'Réglé pour vous', texte: 'Son nom, son accueil et ce qu’il peut dire sont réglés selon votre activité.' },
    ],
    etapes: [
      { titre: 'On définit ce qu’il doit dire', texte: 'Votre activité, vos horaires, les questions fréquentes de vos clients.' },
      { titre: 'Je le règle', texte: 'Voix, accueil, consignes : il parle de votre entreprise comme vous.' },
      { titre: 'Renvoi d’appel', texte: 'Vos appels non décrochés lui sont renvoyés, votre numéro ne change pas.' },
      { titre: 'Vous rappelez', texte: 'Chaque appel vous attend avec son résumé, il ne reste qu’à rappeler.' },
    ],
    realisations: [],
    faq: [
      { q: 'Est-ce que je garde mon numéro ?', a: 'Oui. Ce sont seulement les appels que vous ne prenez pas qui sont renvoyés vers l’assistant.' },
      { q: 'Il peut donner des prix ?', a: 'Non, il est réglé pour ne pas en donner : il note la demande et c’est vous qui rappelez pour chiffrer.' },
      { q: 'Les appelants savent-ils qu’ils parlent à un assistant ?', a: 'Oui. L’assistant se présente comme l’assistant de votre entreprise, en toute transparence.' },
    ],
  },
]

export const offre = (slug: string) => OFFRES.find(o => o.slug === slug)

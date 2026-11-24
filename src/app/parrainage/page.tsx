import type { Metadata } from 'next'
import { Check, X } from 'lucide-react'
import { pageMeta } from '@/lib/seo'
import { MONTANT_MINIMUM, PRIME } from '@/lib/parrainage'
import { PageIntro } from '@/components/accueil/PageIntro'
import { Reveal } from '@/components/accueil/Reveal'
import { DISPLAY_FONT } from '@/components/accueil/anim'
import { Eyebrow, JsonLd, Section, breadcrumbLd, faqLd } from '@/components/pages/Blocks'
import { FaqBlock } from '@/components/pages/FaqBlock'
import { InscriptionParrain } from '@/components/parrainage/InscriptionParrain'

const euros = (n: number) => n.toLocaleString('fr-FR')

export const metadata: Metadata = pageMeta({
  title: `Parrainage : recommandez, gagnez ${PRIME} €`,
  description: `Vous connaissez quelqu’un qui a besoin d’un site internet ? Recommandez-le à Roman Tabardel et recevez ${PRIME} € par virement quand son site est livré. Ouvert à tous, sans limite.`,
  path: '/parrainage',
})

const H2 = { ...DISPLAY_FONT, color: 'var(--rt-primary)', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.03em', fontSize: 'clamp(2.2rem, 4.6vw, 4.4rem)' } as const

const ETAPES = [
  { titre: 'Inscrivez-vous', texte: 'Une minute, sans mot de passe. Vous recevez aussitôt votre lien de suivi personnel.' },
  { titre: 'Recommandez', texte: 'Depuis votre lien, indiquez qui a besoin d’un site et pour quel projet. Je le contacte de votre part.' },
  { titre: 'Suivez', texte: 'Vous voyez où en est chaque projet : contacté, devis envoyé, signé, livré et payé.' },
  { titre: `Recevez ${PRIME} €`, texte: 'Quand son site est livré et payé, je vous appelle et je vous fais un virement.' },
]

const COMPTE = [
  'Une personne ou une entreprise qui a besoin d’un site, d’une boutique en ligne, d’une refonte ou de référencement',
  `Un projet d’au moins ${euros(MONTANT_MINIMUM)} €`,
  'Quelqu’un qui n’était pas déjà en contact avec moi',
  'Que vous soyez client ou non, ami, voisin, collègue : tout le monde peut parrainer',
]

const COMPTE_PAS = [
  `Les petits travaux de moins de ${euros(MONTANT_MINIMUM)} € (une retouche, un audit seul…)`,
  'Une personne qui m’avait déjà contacté avant votre recommandation',
  'Se recommander soi-même ou sa propre entreprise',
  'Un projet abandonné ou non payé',
]

const FAQ = [
  { q: 'Qui peut devenir parrain ?', a: 'Tout le monde, à partir de 18 ans : un client, un ancien client, un ami, un commerçant, un artisan… Il n’est pas nécessaire d’avoir travaillé avec moi. L’inscription est gratuite et ne vous engage à rien.' },
  { q: `Quand est-ce que je reçois les ${PRIME} € ?`, a: `Quand le site de la personne que vous avez recommandée est livré et entièrement payé. Je vous appelle alors pour vous demander votre RIB et je fais le virement dans les 30 jours. Vos coordonnées bancaires ne sont jamais demandées sur ce site.` },
  { q: 'Pourquoi attendre que le site soit livré et payé ?', a: 'Un projet peut changer ou s’arrêter en route. En attendant la fin, je suis sûr de pouvoir vous récompenser pour un vrai projet abouti, et vous suivez chaque étape depuis votre lien.' },
  { q: 'Combien de personnes puis-je recommander ?', a: `Autant que vous voulez. Vous recevez ${PRIME} € pour chaque projet abouti, sans limite.` },
  { q: 'Que se passe-t-il après ma recommandation ?', a: 'Je contacte la personne de votre part, en général par téléphone, pour comprendre son projet. Si elle le souhaite, je lui envoie un devis. Vous voyez l’avancement sur votre lien de suivi : contacté, devis envoyé, projet signé, site livré et payé.' },
  { q: 'Dois-je prévenir la personne avant ?', a: 'Oui, c’est obligatoire : elle doit être d’accord pour que je l’appelle. Une recommandation faite sans son accord ne sera pas retenue.' },
  { q: 'Et si quelqu’un d’autre a déjà recommandé la même personne ?', a: 'C’est la première recommandation enregistrée qui compte. Même chose si la personne était déjà en contact avec moi avant votre recommandation : elle ne compte pas.' },
  { q: 'Je suis déjà client, ça marche aussi ?', a: `Oui, exactement de la même façon : ${PRIME} € par virement pour chaque projet abouti grâce à vous.` },
  { q: 'Que verra la personne recommandée ?', a: 'Elle sait que vous me l’avez recommandée. En revanche, vous ne voyez jamais le prix de son projet : seulement l’étape où il en est.' },
  { q: 'J’ai perdu mon lien de suivi, comment faire ?', a: 'Appelez-moi au 06 18 13 53 84 ou écrivez à contact@tabardel-roman.fr, je vous le renvoie. Pensez à ajouter la page à vos favoris dès votre inscription.' },
  { q: 'Dois-je déclarer cette somme aux impôts ?', a: 'Selon votre situation, les sommes reçues peuvent être à déclarer. En cas de doute, renseignez-vous auprès de votre centre des impôts.' },
]

const REGLEMENT = [
  'Le parrainage est proposé par Roman Tabardel, entrepreneur individuel, Chemin des Lauriers, 26400 Allex. Il est gratuit et ouvert à toute personne majeure qui s’inscrit sur cette page.',
  'Le parrain recommande une personne ou une entreprise qui a besoin d’un site internet ou de référencement, depuis son lien de suivi personnel. Il s’engage à avoir obtenu son accord avant de la recommander.',
  'La recommandation compte si la personne n’était pas déjà en contact avec Roman Tabardel, si elle n’est pas le parrain lui-même ou sa propre entreprise, et si personne ne l’a recommandée avant.',
  `Le parrain reçoit ${PRIME} € quand le site de la personne recommandée est livré et entièrement payé, pour un projet d’au moins ${euros(MONTANT_MINIMUM)} €. Un projet abandonné, annulé ou impayé ne donne droit à rien.`,
  `Les ${PRIME} € sont versés par virement bancaire dans les 30 jours suivant le paiement complet. Roman Tabardel contacte le parrain pour obtenir ses coordonnées bancaires.`,
  `Il n’y a pas de limite : ${PRIME} € pour chaque projet abouti.`,
  'Les sommes reçues peuvent être à déclarer aux impôts selon la situation du parrain.',
  'Les coordonnées du parrain et de la personne recommandée servent uniquement au parrainage (voir la politique de confidentialité). Elles peuvent être supprimées sur simple demande.',
  'Roman Tabardel peut modifier ou arrêter le parrainage à tout moment. Les recommandations déjà enregistrées gardent les conditions en vigueur au jour de leur envoi. Toute recommandation faite de mauvaise foi peut être refusée.',
]

export default function ParrainagePage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Parrainage', path: '/parrainage' }])} />
      <JsonLd data={faqLd(FAQ)} />
      <PageIntro
        eyebrow="Parrainage"
        title={`Recommandez, gagnez ${PRIME} €`}
        subtitle="Vous connaissez quelqu’un qui a besoin d’un site ?"
        text={`Présentez-le moi. Si son site voit le jour, je vous offre ${PRIME} €. Client ou non, sans limite.`}
        next="#comment"
      />

      <Section id="comment">
        <Reveal className="mb-12 md:mb-16">
          <h2 className="uppercase" style={H2}>Comment<br /><span className="acc-outline">ça marche</span></h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {ETAPES.map((e, i) => (
            <Reveal key={e.titre} delay={i * 0.06} className="h-full">
              <div className="h-full p-7" style={{ backgroundColor: '#FFFFFF', borderRadius: 18, border: '1px solid var(--rt-line)' }}>
                <p style={{ ...DISPLAY_FONT, fontWeight: 700, color: 'var(--rt-line)', fontSize: '2.2rem', lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 font-display font-700 text-xl" style={{ color: 'var(--rt-primary)' }}>{e.titre}</h3>
                <p className="mt-2 font-body text-base leading-relaxed" style={{ color: 'var(--rt-muted)' }}>{e.texte}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="conditions" soft>
        <Reveal className="mb-12 md:mb-16">
          <h2 className="uppercase" style={H2}>Ce qui<br /><span className="acc-outline">compte</span></h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {[
            { titre: `Ça donne droit aux ${PRIME} €`, items: COMPTE, ok: true },
            { titre: 'Ça ne compte pas', items: COMPTE_PAS, ok: false },
          ].map((col, i) => (
            <Reveal key={col.titre} delay={i * 0.08} className="h-full">
              <div className="h-full p-7 md:p-9" style={{ backgroundColor: '#FFFFFF', borderRadius: 20, border: '1px solid var(--rt-line)' }}>
                <h3 className="font-display font-700 text-2xl" style={{ color: col.ok ? 'var(--rt-primary)' : 'var(--rt-ink)' }}>{col.titre}</h3>
                <ul className="mt-6 space-y-4">
                  {col.items.map(t => (
                    <li key={t} className="flex gap-3 font-body text-base leading-relaxed" style={{ color: 'var(--rt-muted)' }}>
                      {col.ok
                        ? <Check size={18} className="shrink-0 mt-1" style={{ color: 'var(--rt-primary)' }} />
                        : <X size={18} className="shrink-0 mt-1" style={{ color: 'var(--rt-muted)' }} />}
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="inscription">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-16 items-start">
          <div className="grid gap-4">
            <Reveal>
              <Eyebrow>Votre récompense</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="p-7 md:p-9" style={{ backgroundColor: 'var(--rt-primary)', color: '#FFFFFF', borderRadius: 20 }}>
                <p className="font-body text-[11px] font-700 tracking-[0.25em] uppercase" style={{ opacity: 0.75 }}>Pour chaque projet abouti</p>
                <p className="mt-3" style={{ ...DISPLAY_FONT, fontWeight: 700, fontSize: 'clamp(4rem, 8vw, 6.5rem)', lineHeight: 0.9 }}>{PRIME} €</p>
                <p className="mt-4 font-body text-base leading-relaxed" style={{ opacity: 0.85 }}>
                  Par virement, dans les 30 jours après le paiement du site. Client ou non, sans limite de recommandations.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--rt-muted)' }}>
                Pour tout projet d’au moins {euros(MONTANT_MINIMUM)} €, une fois le site livré et entièrement payé.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="p-7 md:p-10" style={{ backgroundColor: '#FFFFFF', borderRadius: 22, border: '1px solid var(--rt-line)', boxShadow: '0 30px 80px color-mix(in srgb, var(--rt-primary) 14%, transparent)' }}>
              <p className="uppercase mb-2" style={{ ...DISPLAY_FONT, fontWeight: 700, color: 'var(--rt-primary)', fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)', lineHeight: 1 }}>Devenir parrain</p>
              <p className="font-body text-sm mb-7" style={{ color: 'var(--rt-muted)' }}>Gratuit, sans engagement. Vous pourrez recommander quelqu’un juste après.</p>
              <InscriptionParrain />
            </div>
          </Reveal>
        </div>
      </Section>

      <FaqBlock items={FAQ} id="questions" title={<>Vos<br /><span className="acc-outline">questions</span></>} />

      <Section id="reglement">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-20 items-start">
          <Reveal>
            <h2 className="uppercase" style={H2}>Le<br /><span className="acc-outline">règlement</span></h2>
          </Reveal>
          <Reveal delay={0.08}>
            <ol className="grid gap-4">
              {REGLEMENT.map((r, i) => (
                <li key={i} className="flex gap-4 font-body text-base leading-relaxed" style={{ color: 'var(--rt-muted)' }}>
                  <span className="shrink-0 font-700" style={{ color: 'var(--rt-primary)', minWidth: '1.6rem' }}>{i + 1}.</span>
                  <span>{r}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 font-body text-sm" style={{ color: 'var(--rt-muted)' }}>
              Déjà inscrit ? Ouvrez votre lien de suivi personnel. Lien perdu ? Appelez le <a href="tel:0618135384" className="underline" style={{ color: 'var(--rt-primary)' }}>06 18 13 53 84</a>.
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  )
}

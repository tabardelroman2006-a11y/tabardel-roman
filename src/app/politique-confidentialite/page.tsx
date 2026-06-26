import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité de Roman Tabardel, traitement des données personnelles.',
  robots: { index: false, follow: false },
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div
      className="min-h-screen pt-28 pb-24 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="max-w-3xl mx-auto">

        <p
          className="font-body text-xs tracking-[0.28em] uppercase mb-5"
          style={{ color: '#C8FF00' }}
        >
          RGPD
        </p>
        <h1
          className="font-display font-bold mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#FFFFFF' }}
        >
          Politique de confidentialité
        </h1>
        <p className="font-body text-sm mb-16" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Conformément au RGPD (Règlement UE 2016/679) et à la loi Informatique et Libertés
        </p>

        <div className="space-y-12 font-body" style={{ color: 'rgba(255,255,255,0.6)' }}>

          <section>
            <h2 className="font-display font-semibold text-lg mb-4" style={{ color: '#FFFFFF' }}>
              1. Responsable du traitement
            </h2>
            <div className="space-y-1.5 text-sm leading-relaxed">
              <p>ROMAN TABARDEL, Entrepreneur individuel</p>
              <p>Email : <a href="mailto:contact@tabardel-roman.fr" style={{ color: '#C8FF00' }}>contact@tabardel-roman.fr</a></p>
              <p>Téléphone : 07 69 34 11 23</p>
            </div>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          <section>
            <h2 className="font-display font-semibold text-lg mb-4" style={{ color: '#FFFFFF' }}>
              2. Données collectées
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              Les données collectées via les formulaires de contact et de devis sont :
            </p>
            <ul className="space-y-2 text-sm mb-3">
              {[
                'Nom et prénom',
                'Adresse email',
                'Numéro de téléphone',
                'Description du projet (facultatif)',
              ].map(item => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: '#C8FF00' }} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed">
              Ces données sont collectées sur la base de votre consentement (art. 6.1.a du RGPD)
              et dans le cadre de mesures précontractuelles (art. 6.1.b du RGPD).
            </p>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          <section>
            <h2 className="font-display font-semibold text-lg mb-4" style={{ color: '#FFFFFF' }}>
              3. Finalité du traitement
            </h2>
            <ul className="space-y-2 text-sm">
              {[
                'Répondre à vos demandes de contact et de devis',
                'Établir et gérer les devis et contrats',
                'Assurer le suivi commercial et la relation client',
              ].map(item => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: '#C8FF00' }} />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          <section>
            <h2 className="font-display font-semibold text-lg mb-4" style={{ color: '#FFFFFF' }}>
              4. Durée de conservation
            </h2>
            <p className="text-sm leading-relaxed">
              Les données sont conservées pendant la durée nécessaire à la réalisation de la
              prestation, puis archivées pendant 3 ans à des fins de suivi commercial.
              Les données des prospects n'ayant pas donné suite sont supprimées au bout d'1 an.
            </p>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          <section>
            <h2 className="font-display font-semibold text-lg mb-4" style={{ color: '#FFFFFF' }}>
              5. Destinataires des données
            </h2>
            <p className="text-sm leading-relaxed">
              Vos données ne sont jamais vendues ni cédées à des tiers. Elles peuvent être
              traitées par des outils techniques (hébergement Vercel, messagerie email) dans
              le strict cadre de leur mission et sous accord de confidentialité.
            </p>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          <section>
            <h2 className="font-display font-semibold text-lg mb-4" style={{ color: '#FFFFFF' }}>
              6. Vos droits
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :
            </p>
            <ul className="space-y-2 text-sm mb-3">
              {[
                'Droit d\'accès : obtenir une copie de vos données',
                'Droit de rectification : corriger des données inexactes',
                'Droit à l\'effacement : demander la suppression de vos données',
                'Droit d\'opposition : vous opposer au traitement de vos données',
                'Droit à la portabilité : recevoir vos données dans un format structuré',
              ].map(item => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: '#C8FF00' }} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed">
              Pour exercer vos droits, contactez :{' '}
              <a href="mailto:contact@tabardel-roman.fr" style={{ color: '#C8FF00' }}>
                contact@tabardel-roman.fr
              </a>
              . Réponse sous 30 jours maximum.
            </p>
            <p className="text-sm leading-relaxed mt-3">
              Vous disposez également du droit d'introduire une réclamation auprès de la CNIL :{' '}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: '#C8FF00' }}>
                www.cnil.fr
              </a>
            </p>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          <section>
            <h2 className="font-display font-semibold text-lg mb-4" style={{ color: '#FFFFFF' }}>
              7. Cookies
            </h2>
            <p className="text-sm leading-relaxed">
              Ce site n'utilise pas de cookies publicitaires ou de traçage tiers. Des cookies
              techniques strictement nécessaires au bon fonctionnement du site peuvent être déposés.
              Vous pouvez les désactiver via les paramètres de votre navigateur.
            </p>
          </section>

          <p className="text-xs pt-4" style={{ color: 'rgba(255,255,255,0.22)' }}>
            Dernière mise à jour : mai 2025
          </p>

        </div>
      </div>
    </div>
  )
}

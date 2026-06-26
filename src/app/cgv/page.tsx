import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions générales de vente',
  description: 'CGV de Roman Tabardel, conditions de prestation de services web.',
  robots: { index: false, follow: false },
}

export default function CGVPage() {
  return (
    <div
      className="min-h-screen pt-28 pb-24 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <p
          className="font-body text-xs tracking-[0.28em] uppercase mb-5"
          style={{ color: '#C8FF00' }}
        >
          Conditions contractuelles
        </p>
        <h1
          className="font-display font-bold mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#FFFFFF' }}
        >
          Conditions générales de vente
        </h1>
        <p className="font-body text-sm mb-16" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Applicables à toutes les prestations de ROMAN TABARDEL
        </p>

        <div className="space-y-12 font-body" style={{ color: 'rgba(255,255,255,0.6)' }}>

          {/* Préambule */}
          <section>
            <h2 className="font-display font-semibold text-lg mb-4" style={{ color: '#FFFFFF' }}>
              Préambule
            </h2>
            <p className="text-sm leading-relaxed">
              Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles
              entre ROMAN TABARDEL, entrepreneur individuel (SIRET 104 465 604 00015), ci-après
              désigné « le Prestataire », et toute personne physique ou morale souhaitant bénéficier
              de ses services, ci-après désignée « le Client ».
            </p>
            <p className="text-sm leading-relaxed mt-3">
              Toute commande implique l'acceptation pleine et entière des présentes CGV.
            </p>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* Article 1 */}
          <section>
            <h2 className="font-display font-semibold text-lg mb-4" style={{ color: '#FFFFFF' }}>
              Article 1 : Services proposés
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              Le Prestataire propose les services suivants :
            </p>
            <ul className="space-y-2 text-sm">
              {[
                'Création de sites web vitrine sur mesure',
                'Création de sites e-commerce',
                'Refonte de sites existants',
                'Référencement naturel (SEO) : audit, optimisation, suivi',
                'Maintenance et support technique',
              ].map(item => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: '#C8FF00' }} />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* Article 2 */}
          <section>
            <h2 className="font-display font-semibold text-lg mb-4" style={{ color: '#FFFFFF' }}>
              Article 2 : Devis et commande
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              Toute prestation fait l'objet d'un devis détaillé, établi gratuitement après un échange
              téléphonique ou par email. Le devis précise la nature des travaux, le délai de réalisation
              et le prix TTC.
            </p>
            <p className="text-sm leading-relaxed">
              La commande est confirmée par le retour du devis signé (ou par email) et le versement
              de l'acompte défini à l'article 4. Aucune prestation ne débute avant cette confirmation.
            </p>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* Article 3 */}
          <section>
            <h2 className="font-display font-semibold text-lg mb-4" style={{ color: '#FFFFFF' }}>
              Article 3 : Tarifs
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              Les tarifs sont exprimés en euros toutes taxes comprises (TTC). En qualité de
              micro-entrepreneur bénéficiant de la franchise en base de TVA (art. 293 B du CGI),
              le Prestataire ne facture pas la TVA. La mention « TVA non applicable » figure sur
              chaque facture.
            </p>
            <p className="text-sm leading-relaxed">
              Les tarifs en vigueur sont disponibles sur le site tabardel-roman.fr et peuvent être
              modifiés à tout moment. Les devis acceptés ne sont pas soumis à révision tarifaire
              pendant leur durée de validité (30 jours).
            </p>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* Article 4 */}
          <section>
            <h2 className="font-display font-semibold text-lg mb-4" style={{ color: '#FFFFFF' }}>
              Article 4 : Modalités de paiement
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              Sauf accord contraire précisé dans le devis, les conditions de paiement sont :
            </p>
            <ul className="space-y-2 text-sm mb-3">
              {[
                '50 % à la commande (acompte), démarrage des travaux',
                '50 % à la livraison, avant mise en ligne du site',
              ].map(item => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: '#C8FF00' }} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed">
              Modes de paiement acceptés : virement bancaire, PayPal. En cas de retard de paiement,
              des pénalités de 10 % du montant dû par mois de retard seront appliquées, ainsi qu'une
              indemnité forfaitaire de recouvrement de 40 € (art. L.441-10 du Code de commerce).
            </p>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* Article 5 */}
          <section>
            <h2 className="font-display font-semibold text-lg mb-4" style={{ color: '#FFFFFF' }}>
              Article 5 : Délais de réalisation
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              Les délais de réalisation sont précisés dans le devis. Ils courent à compter de la
              réception de l'acompte ET de l'ensemble des éléments nécessaires à la réalisation
              de la prestation (textes, images, accès, informations spécifiques).
            </p>
            <p className="text-sm leading-relaxed">
              Tout retard imputable au Client dans la fourniture des éléments entraîne automatiquement
              un report du délai de livraison sans que cela constitue un manquement du Prestataire.
            </p>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* Article 6 */}
          <section>
            <h2 className="font-display font-semibold text-lg mb-4" style={{ color: '#FFFFFF' }}>
              Article 6 : Obligations du Client
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              Le Client s'engage à :
            </p>
            <ul className="space-y-2 text-sm">
              {[
                'Fournir des informations exactes et complètes nécessaires à la réalisation de la prestation',
                "Disposer des droits sur les éléments (textes, images, logos) qu'il transmet au Prestataire",
                'Valider les maquettes et livrables dans les délais convenus',
                'Régler les factures aux échéances fixées',
              ].map(item => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: '#C8FF00' }} />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* Article 7 */}
          <section>
            <h2 className="font-display font-semibold text-lg mb-4" style={{ color: '#FFFFFF' }}>
              Article 7 : Propriété intellectuelle
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              Le Prestataire reste propriétaire des droits de propriété intellectuelle sur tous les
              éléments créés jusqu'au paiement intégral de la prestation. À réception du solde,
              les droits d'exploitation sont cédés au Client pour une utilisation dans le cadre
              du projet défini.
            </p>
            <p className="text-sm leading-relaxed">
              Le Prestataire se réserve le droit de mentionner la réalisation dans son portfolio
              et ses supports de communication, sauf demande contraire explicite du Client formulée
              par écrit avant la livraison.
            </p>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* Article 8 */}
          <section>
            <h2 className="font-display font-semibold text-lg mb-4" style={{ color: '#FFFFFF' }}>
              Article 8 : Garanties et support
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              Le Prestataire garantit la conformité du livrable au devis accepté. Une période de
              support de <strong style={{ color: '#FFFFFF' }}>30 jours</strong> est incluse après
              chaque livraison. Durant cette période, les corrections liées à des dysfonctionnements
              constatés sont prises en charge gratuitement.
            </p>
            <p className="text-sm leading-relaxed">
              Les modifications ou ajouts de fonctionnalités non prévus au devis initial feront l'objet
              d'un devis complémentaire.
            </p>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* Article 9 */}
          <section>
            <h2 className="font-display font-semibold text-lg mb-4" style={{ color: '#FFFFFF' }}>
              Article 9 : Rétractation
            </h2>
            <p className="text-sm leading-relaxed">
              Conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation
              ne peut être exercé pour les prestations de services pleinement exécutées avant la fin
              du délai de rétractation, dès lors que l'exécution a commencé avec l'accord exprès du
              Client. Pour les clients professionnels (B2B), aucun droit de rétractation ne s'applique.
            </p>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* Article 10 */}
          <section>
            <h2 className="font-display font-semibold text-lg mb-4" style={{ color: '#FFFFFF' }}>
              Article 10 : Annulation
            </h2>
            <p className="text-sm leading-relaxed">
              En cas d'annulation de la commande par le Client après démarrage des travaux, l'acompte
              versé reste acquis au Prestataire en compensation du travail réalisé et du manque à gagner.
              Si les travaux ont dépassé 50 % d'avancement, le solde restant sera dû au prorata du
              travail effectué.
            </p>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* Article 11 */}
          <section>
            <h2 className="font-display font-semibold text-lg mb-4" style={{ color: '#FFFFFF' }}>
              Article 11 : Responsabilité
            </h2>
            <p className="text-sm leading-relaxed">
              La responsabilité du Prestataire ne saurait être engagée en cas de dommages indirects
              (perte de chiffre d'affaires, de clientèle, d'image) liés à l'utilisation ou à la
              non-disponibilité du site livré. La responsabilité du Prestataire est limitée au montant
              des sommes effectivement encaissées au titre du projet concerné.
            </p>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* Article 12 */}
          <section>
            <h2 className="font-display font-semibold text-lg mb-4" style={{ color: '#FFFFFF' }}>
              Article 12 : Confidentialité
            </h2>
            <p className="text-sm leading-relaxed">
              Le Prestataire s'engage à garder confidentielles toutes informations sensibles
              communiquées par le Client dans le cadre de la mission (accès, données commerciales,
              stratégie). Cette obligation de confidentialité est valable pendant la durée de la
              prestation et 2 ans après son terme.
            </p>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* Article 13 */}
          <section>
            <h2 className="font-display font-semibold text-lg mb-4" style={{ color: '#FFFFFF' }}>
              Article 13 : Droit applicable et litiges
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              Les présentes CGV sont soumises au droit français. En cas de litige, une solution
              amiable sera recherchée en priorité. À défaut, le litige sera porté devant les
              tribunaux compétents du ressort du domicile du Prestataire (Drôme, 26).
            </p>
            <p className="text-sm leading-relaxed">
              Contact : <a href="mailto:contact@tabardel-roman.fr" style={{ color: '#C8FF00' }}>
                contact@tabardel-roman.fr
              </a>
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

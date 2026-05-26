import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales de Roman Tabardel — créateur de sites web.',
  robots: { index: false, follow: false },
}

export default function MentionsLegalesPage() {
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
          Informations légales
        </p>
        <h1
          className="font-display font-bold mb-16"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#FFFFFF' }}
        >
          Mentions légales
        </h1>

        <div className="space-y-12 font-body" style={{ color: 'rgba(255,255,255,0.6)' }}>

          {/* 1 — Éditeur */}
          <section>
            <h2
              className="font-display font-semibold text-lg mb-4"
              style={{ color: '#FFFFFF' }}
            >
              1. Éditeur du site
            </h2>
            <div className="space-y-1.5 text-sm leading-relaxed">
              <p><span style={{ color: 'rgba(255,255,255,0.35)' }}>Dénomination :</span> ROMAN TABARDEL</p>
              <p><span style={{ color: 'rgba(255,255,255,0.35)' }}>Forme juridique :</span> Entrepreneur individuel (EI)</p>
              <p><span style={{ color: 'rgba(255,255,255,0.35)' }}>SIREN :</span> 104 465 604</p>
              <p><span style={{ color: 'rgba(255,255,255,0.35)' }}>SIRET :</span> 104 465 604 00015</p>
              <p><span style={{ color: 'rgba(255,255,255,0.35)' }}>Adresse :</span> Chemin des Lauriers, 26400 Allex, France</p>
              <p><span style={{ color: 'rgba(255,255,255,0.35)' }}>Téléphone :</span> 07 69 34 11 23</p>
              <p><span style={{ color: 'rgba(255,255,255,0.35)' }}>Email :</span>{' '}
                <a href="mailto:contact@tabardel-roman.fr" style={{ color: '#C8FF00' }}>
                  contact@tabardel-roman.fr
                </a>
              </p>
              <p><span style={{ color: 'rgba(255,255,255,0.35)' }}>Activité :</span> Création de sites web et référencement naturel (SEO)</p>
            </div>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* 2 — Hébergement */}
          <section>
            <h2
              className="font-display font-semibold text-lg mb-4"
              style={{ color: '#FFFFFF' }}
            >
              2. Hébergement
            </h2>
            <div className="space-y-1.5 text-sm leading-relaxed">
              <p><span style={{ color: 'rgba(255,255,255,0.35)' }}>Hébergeur :</span> Vercel Inc.</p>
              <p><span style={{ color: 'rgba(255,255,255,0.35)' }}>Adresse :</span> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
              <p><span style={{ color: 'rgba(255,255,255,0.35)' }}>Site :</span>{' '}
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: '#C8FF00' }}>
                  vercel.com
                </a>
              </p>
            </div>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* 3 — Propriété intellectuelle */}
          <section>
            <h2
              className="font-display font-semibold text-lg mb-4"
              style={{ color: '#FFFFFF' }}
            >
              3. Propriété intellectuelle
            </h2>
            <p className="text-sm leading-relaxed">
              L'ensemble du contenu de ce site (textes, images, graphismes, logo, structure) est la propriété
              exclusive de ROMAN TABARDEL ou fait l'objet d'une autorisation d'utilisation. Toute reproduction,
              distribution, modification ou utilisation, même partielle, est interdite sans accord préalable écrit.
            </p>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* 4 — Données personnelles */}
          <section>
            <h2
              className="font-display font-semibold text-lg mb-4"
              style={{ color: '#FFFFFF' }}
            >
              4. Données personnelles
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              Les informations collectées via les formulaires de contact (nom, prénom, téléphone, email) sont
              utilisées exclusivement pour répondre à vos demandes et établir des devis. Elles ne sont jamais
              cédées à des tiers.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              Conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679)
              et à la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez d'un droit d'accès,
              de rectification, d'effacement et d'opposition sur vos données personnelles.
            </p>
            <p className="text-sm leading-relaxed">
              Pour exercer ces droits, contactez :{' '}
              <a href="mailto:contact@tabardel-roman.fr" style={{ color: '#C8FF00' }}>
                contact@tabardel-roman.fr
              </a>
            </p>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* 5 — Cookies */}
          <section>
            <h2
              className="font-display font-semibold text-lg mb-4"
              style={{ color: '#FFFFFF' }}
            >
              5. Cookies
            </h2>
            <p className="text-sm leading-relaxed">
              Ce site peut utiliser des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie
              publicitaire ni traceur tiers n'est déposé sans votre consentement. Vous pouvez configurer votre
              navigateur pour refuser les cookies à tout moment.
            </p>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* 6 — Responsabilité */}
          <section>
            <h2
              className="font-display font-semibold text-lg mb-4"
              style={{ color: '#FFFFFF' }}
            >
              6. Limitation de responsabilité
            </h2>
            <p className="text-sm leading-relaxed">
              ROMAN TABARDEL s'efforce de maintenir les informations publiées sur ce site aussi précises et
              à jour que possible. Toutefois, il ne saurait être tenu responsable des omissions, inexactitudes
              ou carences dans la mise à jour des informations, qu'elles soient de son fait ou du fait des
              tiers qui lui fournissent ces informations.
            </p>
          </section>

          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />

          {/* 7 — Droit applicable */}
          <section>
            <h2
              className="font-display font-semibold text-lg mb-4"
              style={{ color: '#FFFFFF' }}
            >
              7. Droit applicable
            </h2>
            <p className="text-sm leading-relaxed">
              Les présentes mentions légales sont régies par le droit français. En cas de litige,
              les tribunaux français seront seuls compétents.
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

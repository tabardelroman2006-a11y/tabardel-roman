import type { Metadata } from 'next'
import { Phone, Mail, MapPin } from 'lucide-react'
import { ContactForm } from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez Roman Tabardel pour votre projet de site web ou de référencement. Réponse garantie sous 24 h.',
}

export default function ContactPage() {
  return (
    <div
      className="min-h-screen pt-28 pb-24 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left */}
          <div>
            <p
              className="font-body text-xs tracking-[0.28em] uppercase mb-5"
              style={{ color: '#C8FF00' }}
            >
              Travaillons ensemble
            </p>
            <h1
              className="font-display font-bold leading-tight mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                color: '#FFFFFF',
              }}
            >
              Parlons de
              <br />
              <span style={{ color: 'rgba(255,255,255,0.28)' }}>votre projet.</span>
            </h1>
            <p
              className="font-body text-base leading-relaxed mb-12 max-w-sm"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              Une question, un projet, une idée ? Écrivez-moi ou appelez-moi directement.
              Je réponds dans les 24 h.
            </p>

            <div className="space-y-5">
              <a
                href="tel:0769341123"
                className="link-dim flex items-center gap-4 font-body text-base"
              >
                <span
                  className="w-10 h-10 flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(200,255,0,0.1)', border: '1px solid rgba(200,255,0,0.2)' }}
                >
                  <Phone size={15} style={{ color: '#C8FF00' }} />
                </span>
                07 69 34 11 23
              </a>

              <a
                href="mailto:contact@tabardel-roman.fr"
                className="link-dim flex items-center gap-4 font-body text-base"
              >
                <span
                  className="w-10 h-10 flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(200,255,0,0.1)', border: '1px solid rgba(200,255,0,0.2)' }}
                >
                  <Mail size={15} style={{ color: '#C8FF00' }} />
                </span>
                contact@tabardel-roman.fr
              </a>

              <div
                className="flex items-start gap-4 font-body text-sm"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                <span
                  className="w-10 h-10 flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <MapPin size={15} style={{ color: 'rgba(255,255,255,0.3)' }} />
                </span>
                <span className="pt-2.5">
                  Chemin des Lauriers<br />
                  26400 Allex, Drôme
                </span>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div
            className="p-8 md:p-10"
            style={{
              backgroundColor: '#111111',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <ContactForm />
          </div>

        </div>
      </div>
    </div>
  )
}

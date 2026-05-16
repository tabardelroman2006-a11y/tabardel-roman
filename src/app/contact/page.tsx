import type { Metadata } from 'next'
import { Phone, Mail } from 'lucide-react'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { ContactForm } from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez Roman Tabardel pour votre projet de site web ou de référencement. Réponse rapide garantie.',
}

export default function ContactPage() {
  return (
    <div className="bg-cream-50 min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <ScrollReveal variant="slideLeft">
            <div>
              <h1
                className="text-charcoal mb-4"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 400,
                }}
              >
                Contactez-moi
              </h1>
              <p className="text-muted mb-12 text-lg leading-relaxed">
                Une question ? Un projet ?<br />Je réponds rapidement.
              </p>

              <div className="space-y-5">
                <a
                  href="tel:0769341123"
                  className="flex items-center gap-4 group"
                  data-cursor-hover
                >
                  <span className="w-10 h-10 rounded-full bg-cream-100 border border-stone-200 flex items-center justify-center group-hover:bg-charcoal group-hover:border-charcoal transition-all">
                    <Phone size={16} className="text-muted group-hover:text-white transition-colors" />
                  </span>
                  <span className="text-charcoal group-hover:text-muted transition-colors">
                    07.69.34.11.23
                  </span>
                </a>

                <a
                  href="mailto:contact@tabardel-roman.fr"
                  className="flex items-center gap-4 group"
                  data-cursor-hover
                >
                  <span className="w-10 h-10 rounded-full bg-cream-100 border border-stone-200 flex items-center justify-center group-hover:bg-charcoal group-hover:border-charcoal transition-all">
                    <Mail size={16} className="text-muted group-hover:text-white transition-colors" />
                  </span>
                  <span className="text-charcoal group-hover:text-muted transition-colors">
                    contact@tabardel-roman.fr
                  </span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slideRight" delay={0.15}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}

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
    <div className="min-h-screen pt-28 pb-24" style={{ backgroundColor: '#FAFAF8' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <ScrollReveal variant="slideLeft">
            <div>
              <h1
                className="mb-4"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 400,
                  color: '#1A1A1A',
                }}
              >
                Contactez-moi
              </h1>
              <p className="mb-12 text-lg leading-relaxed" style={{ color: '#6B6B6B' }}>
                Une question ? Un projet ?<br />Je réponds rapidement.
              </p>

              <div className="space-y-5">
                <a
                  href="tel:0769341123"
                  className="flex items-center gap-4 group"
                  data-cursor-hover
                >
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover:bg-[#1A1A1A] group-hover:border-[#1A1A1A]"
                    style={{ backgroundColor: '#F0ECE6', border: '1px solid #D6D3D1' }}
                  >
                    <Phone size={16} className="transition-colors group-hover:text-white" style={{ color: '#6B6B6B' }} />
                  </span>
                  <span className="transition-colors group-hover:opacity-60" style={{ color: '#1A1A1A' }}>
                    07.69.34.11.23
                  </span>
                </a>

                <a
                  href="mailto:contact@tabardel-roman.fr"
                  className="flex items-center gap-4 group"
                  data-cursor-hover
                >
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover:bg-[#1A1A1A] group-hover:border-[#1A1A1A]"
                    style={{ backgroundColor: '#F0ECE6', border: '1px solid #D6D3D1' }}
                  >
                    <Mail size={16} className="transition-colors group-hover:text-white" style={{ color: '#6B6B6B' }} />
                  </span>
                  <span className="transition-colors group-hover:opacity-60" style={{ color: '#1A1A1A' }}>
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

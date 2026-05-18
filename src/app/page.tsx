import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Hero } from '@/components/sections/Hero'
import { MessageSection } from '@/components/sections/MessageSection'
import { ClientsSection } from '@/components/sections/ClientsSection'
import { ReviewsSection } from '@/components/sections/ReviewsSection'

export const metadata: Metadata = {
  title: 'Roman Tabardel — Création de sites web & SEO',
  description:
    'Agence web premium pour TPE, PME, artisans et entrepreneurs. Création de sites vitrine, e-commerce et référencement naturel.',
}

const projects = [
  {
    title: 'Livron BMX Club',
    description: 'Site vitrine pour un club BMX local.',
    url: 'https://livron-bmx-club.base44.app/',
    image: '/images/bmx-livron.jpg',
  },
  {
    title: 'Chalet La Taiga',
    description: 'Site vitrine pour un chalet de montagne à Lans-en-Vercors.',
    url: 'https://chalet-taiga.fr/',
    image: '/images/chalet-taiga.jpg',
  },
]

export default function HomePage() {
  return (
    <>
      <Hero />
      <MessageSection />

      {/* Mini portfolio + CTA services */}
      <section className="bg-cream-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-stone-100 hover:bg-stone-200 transition-colors rounded-2xl overflow-hidden"
                data-cursor-hover
              >
                <div className="relative w-full h-52 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 flex items-start justify-between">
                  <div>
                    <h3 className="text-charcoal font-medium mb-1">{project.title}</h3>
                    <p className="text-muted text-sm">{project.description}</p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-muted group-hover:text-charcoal shrink-0 mt-0.5 ml-4 transition-colors"
                  />
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
              style={{
                backgroundColor: '#1A1A1A',
                color: '#ffffff',
              }}
              data-cursor-hover
            >
              Voir tous nos services
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </section>

      <ClientsSection />
      <ReviewsSection />
    </>
  )
}

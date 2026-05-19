'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { useModal } from '@/context/ModalContext'

export function CTAFinal() {
  const { openDevis } = useModal()

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <p className="font-inter text-xs tracking-[0.25em] text-[#6B6B6B] uppercase mb-6">
            Commençons
          </p>
          <h2 className="font-playfair text-4xl md:text-6xl text-[#1A1A1A] mb-8 leading-tight">
            Prêt à transformer
            <br />
            <em className="italic text-[#6B6B6B]">votre présence en ligne ?</em>
          </h2>
          <p className="font-inter text-base text-[#6B6B6B] mb-12 max-w-lg mx-auto leading-relaxed">
            Parlons de votre projet autour d&apos;un appel de 30 minutes, sans engagement. Je vous
            propose une vision claire et des solutions adaptées à votre budget.
          </p>
          <button
            onClick={openDevis}
            className="bg-[#1A1A1A] text-white font-inter text-sm tracking-widest uppercase px-12 py-4 rounded-full hover:bg-[#333] transition-colors duration-300"
            data-cursor-hover
          >
            Demander un devis gratuit
          </button>
        </ScrollReveal>
      </div>
    </section>
  )
}

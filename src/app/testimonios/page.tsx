import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Heart, ShieldCheck, Sparkles } from 'lucide-react'
import { TestimonialsGallery } from '@/components/TestimonialsGallery'

export const metadata: Metadata = {
  title: 'Antes y Después • Casos Reales Verificados',
  description: 'Conoce los testimonios reales de clientas y clientes en Chile que frenaron la caída, superaron la alopecia y aceleraron el crecimiento capilar.',
}

export default function TestimoniosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Bar */}
      <div className="bg-brand-linen/70 border-b border-border-soft py-2.5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-1.5 text-xs text-charcoal-muted">
          <Link href="/" className="hover:text-botanical-600 transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-muted/50" />
          <span className="text-botanical-800 font-semibold">Antes y Después</span>
        </div>
      </div>

      {/* Top Banner Proof */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-2">
        <div className="bg-brand-linen/40 rounded-2xl p-4 sm:p-5 border border-brand-sage/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-olive text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-brand-dark">
                Casos Verificados de Clientas en Chile
              </h2>
              <p className="text-xs text-brand-dark/70">
                Fotografías y mensajes directos compartidos de manera voluntaria en nuestro WhatsApp e Instagram.
              </p>
            </div>
          </div>
          <div className="text-xs font-semibold text-brand-olive bg-brand-olive/10 px-3 py-1.5 rounded-full shrink-0">
            🇨🇱 100% Casos Reales
          </div>
        </div>
      </div>

      {/* Main Testimonials Gallery Component */}
      <TestimonialsGallery />
    </div>
  )
}

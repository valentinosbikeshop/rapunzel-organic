import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { HairQuiz } from '@/components/HairQuiz'

export const metadata: Metadata = {
  title: 'Diagnóstico Capilar Inteligente',
  description: 'Responde 3 breves preguntas y te diremos exactamente qué combinación de extractos botánicos necesita tu cabello para frenar la caída o acelerar el crecimiento.',
}

export default function DiagnosticoPage() {
  return (
    <div className="min-h-screen bg-brand-linen/30">
      {/* Breadcrumb Bar */}
      <div className="bg-brand-linen/70 border-b border-border-soft py-2.5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-1.5 text-xs text-charcoal-muted">
          <Link href="/" className="hover:text-botanical-600 transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-muted/50" />
          <span className="text-botanical-800 font-semibold">Diagnóstico Capilar</span>
        </div>
      </div>

      {/* Intro Context Banner */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-botanical-100 text-botanical-800 text-[11px] font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3 text-botanical-600" />
          <span>Fitoterapia Botánica Personalizada</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-botanical-900 tracking-tight mb-2">
          Encuentra la Rutina Exacta para tu Cabello
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-xl mx-auto leading-relaxed">
          Cada cuero cabelludo es único. Este algoritmo analiza tu nivel de caída, tipo de raíz y hábitos de lavado para recomendarte el tratamiento orgánico ideal.
        </p>
      </div>

      {/* Main Hair Quiz Component */}
      <HairQuiz />
    </div>
  )
}

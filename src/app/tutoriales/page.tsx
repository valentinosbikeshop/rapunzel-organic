import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Sparkles, Droplets, Clock, Flame } from 'lucide-react'
import { ReelsShowcase } from '@/components/ReelsShowcase'

export const metadata: Metadata = {
  title: 'Aprende a Usar los Productos (Reels y Videos)',
  description: 'Mira cómo aplicar correctamente el tónico bifásico de batana y el shampoo botánico de hierbas. Consejos oficiales para potenciar el crecimiento capilar.',
}

export default function TutorialesPage() {
  return (
    <div className="min-h-screen bg-brand-linen/40">
      {/* Breadcrumb Bar */}
      <div className="bg-brand-linen/70 border-b border-border-soft py-2.5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-1.5 text-xs text-charcoal-muted">
          <Link href="/" className="hover:text-botanical-600 transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-muted/50" />
          <span className="text-botanical-800 font-semibold">Aprende a Usarlos</span>
        </div>
      </div>

      {/* Ritual Guide Top Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-brand-sage/20 shadow-xs">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-olive/10 text-brand-olive text-[11px] font-bold uppercase tracking-wider mb-2">
              <Droplets className="w-3.5 h-3.5" />
              <span>Guía de Aplicación Botánica</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark mb-2 tracking-tight">
              Técnica Correcta para Resultados en 30 Días
            </h1>
            <p className="text-xs sm:text-sm text-brand-dark/70 leading-relaxed">
              La fitoterapia orgánica requiere constancia y buena técnica. Al activar la circulación sanguínea de tu cuero cabelludo, los folículos reciben directamente los nutrientes de la batana y el romero.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6 pt-5 border-t border-brand-sage/15 text-xs">
            <div className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-brand-olive text-white font-bold flex items-center justify-center shrink-0 text-xs">
                1
              </span>
              <div>
                <strong className="text-brand-dark block">Agitar el Tónico</strong>
                <span className="text-brand-dark/70 text-[11px]">Es una fórmula 100% bifásica. Agita hasta que el óleo y la fase acuosa se unifiquen.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-brand-olive text-white font-bold flex items-center justify-center shrink-0 text-xs">
                2
              </span>
              <div>
                <strong className="text-brand-dark block">Masaje Circular 2 min</strong>
                <span className="text-brand-dark/70 text-[11px]">Con las yemas (nunca las uñas) en entradas, coronilla o zonas con menor densidad.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-brand-olive text-white font-bold flex items-center justify-center shrink-0 text-xs">
                3
              </span>
              <div>
                <strong className="text-brand-dark block">Reposo de la Espuma</strong>
                <span className="text-brand-dark/70 text-[11px]">Al lavar con el shampoo, deja actuar las 20 hierbas medicinales durante 3 minutos antes de enjuagar.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Reels Component */}
      <ReelsShowcase />
    </div>
  )
}

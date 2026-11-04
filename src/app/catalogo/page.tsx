import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Sparkles, Truck, ShieldCheck } from 'lucide-react'
import { Catalog } from '@/components/Catalog'

export const metadata: Metadata = {
  title: 'Catálogo Oficial de Productos y Packs',
  description: 'Conoce todas nuestras fórmulas botánicas 98% orgánicas para el crecimiento y freno de la caída. Precios en CLP y pedidos directos por WhatsApp.',
}

export default function CatalogoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Bar */}
      <div className="bg-brand-linen/70 border-b border-border-soft py-2.5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-1.5 text-xs text-charcoal-muted">
          <Link href="/" className="hover:text-botanical-600 transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-muted/50" />
          <span className="text-botanical-800 font-semibold">Catálogo Oficial</span>
        </div>
      </div>

      {/* Trust Highlights */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-brand-linen/50 p-3.5 rounded-2xl border border-brand-sage/20 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-botanical-600 shrink-0" />
            <span><strong>Fórmulas 98% Orgánicas:</strong> Sin sal ni sulfatos pesados.</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-botanical-600 shrink-0" />
            <span><strong>Envíos Starken:</strong> A todo Chile con seguimiento directo.</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-botanical-600 shrink-0" />
            <span><strong>Atención WhatsApp:</strong> Asesoría personalizada antes del envío.</span>
          </div>
        </div>
      </div>

      {/* Main Catalog Component */}
      <Catalog />
    </div>
  )
}

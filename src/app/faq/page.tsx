import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Truck, CreditCard, Clock, MessageCircle, ShieldCheck } from 'lucide-react'
import { FAQSection } from '@/components/FAQSection'
import brandData from '@/data/brand_bible.json'

export const metadata: Metadata = {
  title: 'Envíos a todo Chile y Preguntas Frecuentes',
  description: 'Tiempos de despacho por Starken a regiones, transporte privado en Santiago, medios de pago y respuestas a dudas sobre nuestros productos botánicos.',
}

export default function FAQPage() {
  const logistics = brandData.brand.logistics

  return (
    <div className="min-h-screen bg-brand-linen/30">
      {/* Breadcrumb Bar */}
      <div className="bg-brand-linen/70 border-b border-border-soft py-2.5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-1.5 text-xs text-charcoal-muted">
          <Link href="/" className="hover:text-botanical-600 transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-charcoal-muted/50" />
          <span className="text-botanical-800 font-semibold">Envíos y FAQ</span>
        </div>
      </div>

      {/* Logistics Overview Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-botanical-100 text-botanical-800 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Truck className="w-3.5 h-3.5 text-botanical-600" />
            <span>Despachos Garantizados</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-botanical-900 tracking-tight mb-2">
            Políticas de Envío y Preguntas Frecuentes
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Hacemos llegar tu tratamiento capilar a cualquier rincón de Chile con embalaje seguro y seguimiento paso a paso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Starken Regiones */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-sage/20 shadow-xs space-y-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-olive/10 text-brand-olive flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-sm text-brand-dark">
              Regiones de Chile (Starken)
            </h3>
            <p className="text-xs text-brand-dark/70 leading-relaxed">
              Envíos por Starken, Chilexpress o Correos de Chile. Retiros 1 a 2 veces por semana. Recibes tu comprobante y número de seguimiento directo al WhatsApp.
            </p>
          </div>

          {/* Santiago Transporte Privado */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-sage/20 shadow-xs space-y-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-olive/10 text-brand-olive flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-sm text-brand-dark">
              Región Metropolitana (Santiago)
            </h3>
            <p className="text-xs text-brand-dark/70 leading-relaxed">
              Reparto directo a domicilio con transporte privado (aproximadamente 1 semana desde agendamiento). Notificación previa de la ruta de entrega.
            </p>
          </div>

          {/* Medios de Pago */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-sage/20 shadow-xs space-y-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-olive/10 text-brand-olive flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-sm text-brand-dark">
              Medios de Pago Seguros
            </h3>
            <p className="text-xs text-brand-dark/70 leading-relaxed">
              Transferencia electrónica (BancoEstado, Cuenta RUT, otros bancos) o link de pago para tarjetas de débito y crédito.
            </p>
          </div>
        </div>
      </div>

      {/* Main FAQ Accordion Component */}
      <FAQSection />
    </div>
  )
}

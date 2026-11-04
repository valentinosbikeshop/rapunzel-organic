'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
  ShoppingBag,
  HelpCircle,
  Instagram,
  Heart,
  Truck,
  MessageCircle
} from 'lucide-react'
import { Hero } from '@/components/Hero'
import { useCart } from '@/context/CartContext'
import { formatCLP } from '@/utils/format'
import brandData from '@/data/brand_bible.json'
import { Product } from '@/types'

export default function HomePage() {
  const { addToCart, setSelectedProductForModal } = useCart()
  const featuredProducts = (brandData.products as Product[]).slice(0, 3)

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Featured Best-Sellers Section */}
      <section className="py-12 sm:py-16 bg-white border-b border-border-soft">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-botanical-100 text-botanical-800 text-[11px] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3 text-botanical-600" />
                <span>Tratamientos Estrella</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-botanical-900 tracking-tight">
                Los Más Elegidos en Chile
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
                Fórmulas 98% orgánicas con decocción artesanal de hierbas y batana pura.
              </p>
            </div>
            <Link
              href="/catalogo/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-botanical-700 hover:text-botanical-900 transition-colors group"
            >
              <span>Ver Catálogo Completo</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProducts.map(product => {
              const hasOffer = Boolean(product.offer_price && product.offer_price < product.price)

              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProductForModal(product)}
                  className="group relative bg-[#FBF9F7] rounded-2xl border border-border-soft overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
                >
                  <div className="relative w-full aspect-square bg-white overflow-hidden p-2">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-103 p-2"
                    />
                    {product.badge && (
                      <span className="absolute top-2.5 left-2.5 bg-botanical-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1 text-[11px] text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-bold text-charcoal">{product.rating}</span>
                        <span className="text-charcoal-muted">({product.reviews_count} opiniones)</span>
                      </div>
                      <h3 className="font-serif text-base font-bold text-botanical-900 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-charcoal-muted bg-surface-soft px-2 py-0.5 rounded inline-block">
                        {product.format}
                      </p>
                      <p className="text-[11px] text-charcoal-muted line-clamp-2">
                        {product.short_description}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-border-soft/60 flex items-center justify-between">
                      <div>
                        {hasOffer ? (
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-base sm:text-lg font-bold text-botanical-800">
                              {formatCLP(product.offer_price!)}
                            </span>
                            <span className="text-xs text-charcoal-muted line-through">
                              {formatCLP(product.price)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-base sm:text-lg font-bold text-botanical-800">
                            {formatCLP(product.price)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product)
                        }}
                        className="py-1.5 px-3 rounded-xl bg-botanical-600 hover:bg-botanical-700 text-white text-xs font-semibold flex items-center gap-1 shadow-xs active:scale-95 transition-all"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Comprar</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/catalogo/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-botanical-600 hover:bg-botanical-700 text-white font-semibold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all"
            >
              <span>Explorar todo el Catálogo de Productos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Interactive Diagnostic Quiz Teaser */}
      <section className="py-12 bg-gradient-to-r from-brand-olive via-brand-oliveDark to-brand-olive text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-gold text-[11px] font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-brand-gold" />
              <span>Test Capilar Gratuito</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-2">
              ¿No sabes qué fórmula necesita tu cabello?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Responde 3 preguntas rápidas y nuestro algoritmo botánico te indicará la combinación exacta para frenar la caída o acelerar el crecimiento.
            </p>
          </div>

          <Link
            href="/diagnostico/"
            className="inline-flex items-center gap-2 bg-white text-brand-olive px-6 py-3 rounded-full font-bold text-xs sm:text-sm shadow-md hover:bg-brand-linen transition-colors shrink-0"
          >
            <span>Hacer Diagnóstico Capilar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. Section Split Teasers: Tutoriales & Testimonios */}
      <section className="py-12 bg-brand-linen/40 border-b border-border-soft">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Box 1: Tutoriales Teaser */}
            <div className="bg-white rounded-2xl p-6 border border-brand-sage/20 shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-olive uppercase tracking-wider mb-2">
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Aprende a Usarlos</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-2">
                  Videos y Modo de Uso Real
                </h3>
                <p className="text-xs text-brand-dark/70 leading-relaxed mb-4">
                  Aprende la técnica de agitación bifásica, tiempos de reposo y masajes capilares en video con audio original de clientas.
                </p>
              </div>
              <Link
                href="/tutoriales/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-olive hover:text-brand-oliveDark transition-colors group self-start"
              >
                <span>Ver Tutoriales en Video</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Box 2: Testimonios Teaser */}
            <div className="bg-white rounded-2xl p-6 border border-brand-sage/20 shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-gold uppercase tracking-wider mb-2">
                  <Heart className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                  <span>+150.000 Melenas Felices</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-2">
                  Resultados Reales de Antes y Después
                </h3>
                <p className="text-xs text-brand-dark/70 leading-relaxed mb-4">
                  Revisa casos reales de alopecia recuperada, crecimiento de 20 cm al año y testimonios masculinos y postparto verificados.
                </p>
              </div>
              <Link
                href="/testimonios/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-olive hover:text-brand-oliveDark transition-colors group self-start"
              >
                <span>Ver Galería de Testimonios</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Quick Logistics & FAQ Preview */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-brand-linen/50 rounded-2xl p-6 border border-brand-sage/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-olive uppercase tracking-wider">
                <Truck className="w-4 h-4" />
                <span>Despachos a todo Chile</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-dark">
                ¿Dudas sobre envíos por Starken o medios de pago?
              </h3>
              <p className="text-xs text-brand-dark/70">
                Resolvemos todas las preguntas sobre tiempos de despacho, sedimentos de hierbas y compras por WhatsApp.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/faq/"
                className="px-5 py-2.5 rounded-full border border-brand-sage/40 hover:border-brand-olive text-brand-dark text-xs font-semibold bg-white transition-colors"
              >
                Ver Preguntas Frecuentes
              </Link>
              <a
                href={`https://wa.me/${brandData.brand.logistics.whatsapp_raw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

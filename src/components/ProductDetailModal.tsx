'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { X, Star, CheckCircle2, Sparkles, ShoppingBag, Droplets, Heart } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatCLP } from '@/utils/format'

export function ProductDetailModal() {
  const { selectedProductForModal, setSelectedProductForModal, addToCart } = useCart()
  const [activeTab, setActiveTab] = useState<'benefits' | 'usage'>('usage')
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  if (!selectedProductForModal) return null

  const product = selectedProductForModal
  const images = [product.image, product.secondary_image].filter(Boolean) as string[]

  const handleAddAndClose = () => {
    addToCart(product)
    setSelectedProductForModal(null)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div
        className="fixed inset-0"
        onClick={() => setSelectedProductForModal(null)}
      />

      {/* Modal Dialog Box */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden border border-border-soft z-10 my-6 flex flex-col max-h-[88vh]">
        
        {/* Modal Close Button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-charcoal shadow-xs transition-transform active:scale-90"
          aria-label="Cerrar modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
            
            {/* Gallery Column */}
            <div className="sm:col-span-5 space-y-2.5">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#FBF9F7] border border-border-soft p-2">
                <Image
                  src={images[activeImageIndex] || product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                />
                {product.badge && (
                  <span className="absolute top-2.5 left-2.5 bg-botanical-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnail Selector */}
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-12 h-12 rounded-lg overflow-hidden border transition-all p-1 bg-white ${
                        activeImageIndex === idx ? 'border-botanical-600 scale-105' : 'border-border-soft opacity-70'
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-contain p-0.5" />
                    </button>
                  ))}
                </div>
              )}

              {/* Confidence Micro-Badges */}
              <div className="p-3 bg-botanical-50 rounded-xl border border-botanical-100 text-xs text-botanical-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-botanical-600" />
                  <span>Elaboración Artesanal Chilena</span>
                </div>
                <p className="text-[11px] text-charcoal-muted">
                  Infusión natural de hierbas molidas, sin diluyentes químicos.
                </p>
              </div>
            </div>

            {/* Info & Content Column */}
            <div className="sm:col-span-7 space-y-3">
              
              {/* Rating */}
              <div className="flex items-center gap-1.5 text-[11px] text-charcoal-muted">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-charcoal">{product.rating}</span>
                <span>({product.reviews_count} opiniones)</span>
              </div>

              {/* Title & Format */}
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-botanical-900 leading-snug">
                  {product.name}
                </h2>
                <p className="text-[11px] text-botanical-700 font-semibold mt-0.5">
                  Presentación: {product.format}
                </p>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-2.5 py-1.5 border-y border-border-soft">
                {product.offer_price ? (
                  <>
                    <span className="text-xl sm:text-2xl font-bold text-botanical-800">
                      {formatCLP(product.offer_price)}
                    </span>
                    <span className="text-xs text-charcoal-muted line-through">
                      {formatCLP(product.price)}
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.2 rounded-full">
                      Oferta Web
                    </span>
                  </>
                ) : (
                  <span className="text-xl sm:text-2xl font-bold text-botanical-800">
                    {formatCLP(product.price)}
                  </span>
                )}
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-border-soft text-sm font-semibold">
                <button
                  onClick={() => setActiveTab('usage')}
                  className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
                    activeTab === 'usage'
                      ? 'border-botanical-600 text-botanical-700'
                      : 'border-transparent text-charcoal-muted hover:text-charcoal'
                  }`}
                >
                  <Droplets className="w-4 h-4" />
                  <span>¿Cómo se Aplica? (Paso a Paso)</span>
                </button>
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
                    activeTab === 'benefits'
                      ? 'border-botanical-600 text-botanical-700'
                      : 'border-transparent text-charcoal-muted hover:text-charcoal'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>Beneficios & Ingredientes</span>
                </button>
              </div>

              {/* Tab 1: How to use step by step */}
              {activeTab === 'usage' && (
                <div className="space-y-3 pt-2 text-xs sm:text-sm">
                  <p className="text-charcoal-muted italic">
                    Instrucciones oficiales de la marca para maximizar la absorción de nutrientes y acelerar los resultados:
                  </p>
                  <div className="space-y-2.5">
                    {product.usage_step_by_step.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FBF9F7] border border-border-soft/60">
                        <span className="w-5 h-5 rounded-full bg-botanical-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-charcoal leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Benefits & Active ingredients */}
              {activeTab === 'benefits' && (
                <div className="space-y-4 pt-2 text-xs sm:text-sm">
                  <div>
                    <h4 className="font-bold text-charcoal mb-2">Beneficios Clave:</h4>
                    <ul className="space-y-1.5">
                      {product.benefits.map((b, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-charcoal-muted">
                          <CheckCircle2 className="w-4 h-4 text-botanical-600 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-charcoal mb-2">Ingredientes Botánicos Activos:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {product.active_ingredients.map((ing, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-botanical-100 text-botanical-800 text-xs font-semibold"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Modal Footer with Direct Add to Cart Action */}
        <div className="p-4 sm:p-6 bg-[#FBF9F7] border-t border-border-soft flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-charcoal-muted block">Precio Final:</span>
            <span className="text-xl font-extrabold text-botanical-900">
              {formatCLP(product.offer_price ?? product.price)}
            </span>
          </div>

          <button
            onClick={handleAddAndClose}
            className="flex-1 sm:flex-initial px-8 py-3.5 rounded-full bg-botanical-600 hover:bg-botanical-700 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Agregar al Carrito y Continuar</span>
          </button>
        </div>

      </div>
    </div>
  )
}


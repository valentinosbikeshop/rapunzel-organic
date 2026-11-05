'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
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
  const hasOffer = Boolean(product.offer_price && product.offer_price < product.price)
  const savings = hasOffer ? product.price - product.offer_price! : 0

  const handleAddAndClose = () => {
    addToCart(product)
    setSelectedProductForModal(null)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        
        {/* Click outside backdrop with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedProductForModal(null)}
        />

        {/* Modal Dialog Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-border-soft z-10 my-6 flex flex-col max-h-[88vh]"
        >
          {/* Modal Close Button */}
          <button
            onClick={() => setSelectedProductForModal(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-charcoal shadow-sm transition-transform active:scale-90"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              
              {/* Gallery Column */}
              <div className="sm:col-span-5 space-y-2.5">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#FBF9F7] border border-border-soft p-2">
                  <Image
                    src={images[activeImageIndex] || product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                  />
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 bg-botanical-800 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
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
                        className={`relative w-12 h-12 rounded-xl overflow-hidden border transition-all p-1 bg-white ${
                          activeImageIndex === idx ? 'border-botanical-600 scale-105 shadow-xs' : 'border-border-soft opacity-70'
                        }`}
                      >
                        <Image src={img} alt="" fill className="object-contain p-0.5" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Confidence Micro-Badges */}
                <div className="p-3 bg-botanical-50/80 rounded-2xl border border-botanical-100 text-xs text-botanical-800 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-botanical-600" />
                    <span>Elaboración Artesanal Chilena</span>
                  </div>
                  <p className="text-[11px] text-charcoal-muted leading-relaxed">
                    Infusión natural de hierbas medicinales, sin sulfatos, sal ni parabenos.
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
                  <span>({product.reviews_count} opiniones verificadas)</span>
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

                {/* Price Row with Savings Chip */}
                <div className="flex items-baseline gap-2.5 py-2 border-y border-border-soft">
                  {hasOffer ? (
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-2xl font-bold text-botanical-800">
                        {formatCLP(product.offer_price!)}
                      </span>
                      <span className="text-xs text-charcoal-muted line-through">
                        {formatCLP(product.price)}
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        Ahorras {formatCLP(savings)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-botanical-800">
                      {formatCLP(product.price)}
                    </span>
                  )}
                </div>

                {/* Navigation Tabs */}
                <div className="flex border-b border-border-soft text-xs sm:text-sm font-semibold">
                  <button
                    onClick={() => setActiveTab('usage')}
                    className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
                      activeTab === 'usage'
                        ? 'border-botanical-600 text-botanical-700'
                        : 'border-transparent text-charcoal-muted hover:text-charcoal'
                    }`}
                  >
                    <Droplets className="w-3.5 h-3.5" />
                    <span>Modo de Uso Oficial</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('benefits')}
                    className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
                      activeTab === 'benefits'
                        ? 'border-botanical-600 text-botanical-700'
                        : 'border-transparent text-charcoal-muted hover:text-charcoal'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>Beneficios & Ingredientes</span>
                  </button>
                </div>

                {/* Tab 1: How to use step by step */}
                {activeTab === 'usage' && (
                  <div className="space-y-3 pt-2 text-xs sm:text-sm">
                    <p className="text-charcoal-muted italic text-[11px]">
                      Instrucciones oficiales de Rapunzel Organic para maximizar la penetración de activos:
                    </p>
                    <div className="space-y-2">
                      {product.usage_step_by_step.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#FBF9F7] border border-border-soft/60">
                          <span className="w-5 h-5 rounded-full bg-botanical-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="text-charcoal leading-relaxed text-xs">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 2: Benefits & Active ingredients */}
                {activeTab === 'benefits' && (
                  <div className="space-y-3 pt-2 text-xs sm:text-sm">
                    <div>
                      <h4 className="font-bold text-charcoal mb-1.5 text-xs">Beneficios Clave:</h4>
                      <ul className="space-y-1">
                        {product.benefits.map((b, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-charcoal-muted text-xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-botanical-600 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-charcoal mb-1.5 text-xs">Ingredientes Botánicos Activos:</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {product.active_ingredients.map((ing, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-0.5 rounded-full bg-botanical-100 text-botanical-800 text-[11px] font-semibold"
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
          <div className="p-4 sm:p-5 bg-[#FBF9F7] border-t border-border-soft flex items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-charcoal-muted block font-medium">Total Producto:</span>
              <span className="text-xl font-extrabold text-botanical-900">
                {formatCLP(product.offer_price ?? product.price)}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAddAndClose}
              className="flex-1 sm:flex-initial px-8 py-3 rounded-full bg-botanical-600 hover:bg-botanical-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Agregar al Carrito</span>
            </motion.button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  )
}

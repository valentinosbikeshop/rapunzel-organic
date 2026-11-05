'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Eye, Star, Sparkles, Check, Truck, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Product } from '@/types'
import { formatCLP } from '@/utils/format'
import brandData from '@/data/brand_bible.json'

export function Catalog() {
  const { addToCart, setSelectedProductForModal } = useCart()
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas')
  const [selectedConcern, setSelectedConcern] = useState<string>('Todas')
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null)

  const categories = ['Todas', 'Packs', 'Dúos', 'Tónicos y Goteros', 'Tratamientos', 'Kits Completos']
  const concerns = ['Todas', 'Caída Severa', 'Crecimiento', 'Alopecia', 'Zonas Calvas', 'Brillo']

  const filteredProducts = useMemo(() => {
    return (brandData.products as Product[]).filter(product => {
      const matchCategory = selectedCategory === 'Todas' || product.category === selectedCategory
      const matchConcern = selectedConcern === 'Todas' || product.concern.includes(selectedConcern)
      return matchCategory && matchConcern
    })
  }, [selectedCategory, selectedConcern])

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product)
    setAddedAnimationId(product.id)
    setTimeout(() => setAddedAnimationId(null), 1600)
  }

  return (
    <section id="catalogo" className="py-12 sm:py-16 bg-white border-b border-border-soft overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Reveal Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto space-y-3 mb-8"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-botanical-100 text-botanical-800 text-[11px] font-bold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-botanical-600 animate-pulse" />
            <span>Fórmulas Botánicas Originales WhatsApp</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-botanical-900 tracking-tight">
            Catálogo Oficial de Cuidado Capilar
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Ingredientes 100% reales extraídos directamente de la naturaleza. Sin rellenos, sin químicos agresivos y con resultados comprobados en cabellos chilenos.
          </p>
        </motion.div>

        {/* Confidence Micro-bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-3xl mx-auto mb-8 p-2.5 rounded-2xl bg-[#FBF9F7] border border-border-soft text-center text-[11px] text-charcoal/80"
        >
          <div className="flex items-center justify-center gap-1.5 font-medium py-1">
            <Truck className="w-3.5 h-3.5 text-botanical-600 shrink-0" />
            <span>Envíos a todo Chile por Starken</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 font-medium py-1 border-t sm:border-t-0 sm:border-x border-border-soft">
            <ShieldCheck className="w-3.5 h-3.5 text-botanical-600 shrink-0" />
            <span>Fórmulas 98% Orgánicas & Cruelty Free</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 font-medium py-1 border-t sm:border-t-0 border-border-soft">
            <HeartHandshake className="w-3.5 h-3.5 text-botanical-600 shrink-0" />
            <span>Asesoría personalizada por WhatsApp</span>
          </div>
        </motion.div>

        {/* Filter Controls with Smooth Pill Transitions */}
        <div className="space-y-3.5 mb-8">
          
          {/* Category Filter Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
            {categories.map(cat => {
              const isSelected = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap active:scale-95 ${
                    isSelected
                      ? 'text-white shadow-xs'
                      : 'text-charcoal-muted hover:text-charcoal bg-surface-soft hover:bg-border-soft/60'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-full bg-botanical-600 -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              )
            })}
          </div>

          {/* Concern Filter Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            <span className="font-semibold text-charcoal-muted shrink-0 mr-1 hidden sm:inline">Objetivo:</span>
            {concerns.map(con => {
              const isSelected = selectedConcern === con
              return (
                <button
                  key={con}
                  onClick={() => setSelectedConcern(con)}
                  className={`relative px-3 py-1.5 rounded-xl border transition-all duration-200 whitespace-nowrap active:scale-95 ${
                    isSelected
                      ? 'border-lavender-500 bg-lavender-50 text-lavender-700 font-bold shadow-xs'
                      : 'border-border-soft bg-white text-charcoal-muted hover:border-charcoal-muted/40 hover:bg-surface-soft'
                  }`}
                >
                  {con === 'Todas' ? 'Todos los objetivos' : con}
                </button>
              )
            })}
          </div>
        </div>

        {/* Product Grid with Framer Motion AnimatePresence */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => {
              const hasOffer = Boolean(product.offer_price && product.offer_price < product.price)
              const discountPercent = hasOffer
                ? Math.round(((product.price - product.offer_price!) / product.price) * 100)
                : 0
              const savingsAmount = hasOffer ? product.price - product.offer_price! : 0
              const isAdded = addedAnimationId === product.id

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  key={product.id}
                  onClick={() => setSelectedProductForModal(product)}
                  className="group relative bg-[#FBF9F7] rounded-3xl border border-border-soft overflow-hidden hover:border-botanical-300 hover:shadow-[0_16px_36px_rgba(46,74,53,0.12)] transition-all duration-300 flex flex-col cursor-pointer"
                >
                  {/* Product Image Container */}
                  <div className="relative w-full aspect-square bg-white overflow-hidden p-3 border-b border-border-soft/40">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-700 ease-out group-hover:scale-106 p-2"
                    />

                    {/* Top Badges: Brand Badge + Discount Chip */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between pointer-events-none">
                      {product.badge ? (
                        <span className="px-3 py-1 rounded-full bg-botanical-800/90 backdrop-blur-xs text-white text-[10px] font-bold tracking-wide uppercase shadow-sm">
                          {product.badge}
                        </span>
                      ) : (
                        <div />
                      )}

                      {hasOffer && (
                        <span className="px-2.5 py-1 rounded-full bg-rose-600/95 backdrop-blur-xs text-white text-[10px] font-extrabold tracking-wide shadow-sm flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                          <span>-{discountPercent}% OFF</span>
                        </span>
                      )}
                    </div>

                    {/* Quick View Pill on Hover */}
                    <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <span className="bg-white/95 backdrop-blur-md text-botanical-900 text-xs font-bold px-4 py-2 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="w-3.5 h-3.5 text-botanical-600" />
                        Ver Detalles & Modo de Uso
                      </span>
                    </div>
                  </div>

                  {/* Product Content Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      
                      {/* Rating & Reviews */}
                      <div className="flex items-center gap-1.5 text-[11px] text-charcoal-muted">
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                        <span className="font-semibold text-charcoal">{product.rating}</span>
                        <span>({product.reviews_count} reseñas)</span>
                      </div>

                      {/* Product Title */}
                      <h3 className="font-serif text-base sm:text-lg font-bold text-botanical-900 group-hover:text-botanical-600 transition-colors line-clamp-1 leading-snug">
                        {product.name}
                      </h3>

                      {/* Format Pill & Guarantee Tag */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-charcoal-muted font-medium bg-surface-soft py-0.5 px-2 rounded-md inline-block">
                          {product.format}
                        </span>
                        <span className="text-[10px] text-botanical-700 font-semibold">
                          🌿 100% Botánico
                        </span>
                      </div>

                      {/* Active Ingredients Tags */}
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {product.active_ingredients.slice(0, 3).map((ing, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-botanical-100 text-botanical-700 font-medium"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>

                      {/* Short Description */}
                      <p className="text-[11px] text-charcoal-muted line-clamp-2 pt-0.5 leading-relaxed">
                        {product.short_description}
                      </p>
                    </div>

                    {/* Pricing and Action Buttons */}
                    <div className="pt-3 border-t border-border-soft/60 space-y-3">
                      <div className="flex items-baseline justify-between">
                        <div>
                          {hasOffer ? (
                            <div className="space-y-0.5">
                              <div className="flex items-baseline gap-2">
                                <span className="text-xl sm:text-2xl font-bold text-botanical-800">
                                  {formatCLP(product.offer_price!)}
                                </span>
                                <span className="text-xs text-charcoal-muted line-through font-normal">
                                  {formatCLP(product.price)}
                                </span>
                              </div>
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/90 px-1.5 py-0.5 rounded-md inline-block">
                                Ahorras {formatCLP(savingsAmount)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xl sm:text-2xl font-bold text-botanical-800">
                              {formatCLP(product.price)}
                            </span>
                          )}
                          <span className="text-[10px] text-charcoal-muted block font-medium pt-0.5">
                            IVA Incluido • Envío por Starken
                          </span>
                        </div>
                      </div>

                      {/* Dual Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedProductForModal(product)
                          }}
                          className="py-2.5 px-3 rounded-xl border border-border-soft bg-white hover:bg-surface-soft hover:border-botanical-400 text-charcoal text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                        >
                          <Eye className="w-3.5 h-3.5 text-botanical-600" />
                          <span>Modo de Uso</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => handleAddToCart(product, e)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                            isAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-botanical-600 hover:bg-botanical-700 text-white hover:shadow-md'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-4 h-4 animate-bounce" />
                              <span>¡Agregado!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-4 h-4" />
                              <span>Al Carrito</span>
                            </>
                          )}
                        </motion.button>
                      </div>

                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state if filter has no results */}
        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-[#FBF9F7] rounded-3xl border border-border-soft"
          >
            <p className="text-lg text-charcoal-muted">No encontramos productos con estos filtros.</p>
            <button
              onClick={() => {
                setSelectedCategory('Todas')
                setSelectedConcern('Todas')
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-botanical-600 text-white font-semibold text-xs hover:bg-botanical-700 transition-colors shadow-xs"
            >
              Restablecer Filtros
            </button>
          </motion.div>
        )}

      </div>
    </section>
  )
}

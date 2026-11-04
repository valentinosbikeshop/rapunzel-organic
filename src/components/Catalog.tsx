'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { ShoppingBag, Eye, Star, Sparkles, Check } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Product } from '@/types'
import { formatCLP } from '@/utils/format'
import brandData from '@/data/brand_bible.json'

export function Catalog() {
  const { addToCart, setSelectedProductForModal } = useCart()
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas')
  const [selectedConcern, setSelectedConcern] = useState<string>('Todas')
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null)

  const categories = ['Todas', 'Packs', 'Dúos', 'Tónicos y Goteros', 'Shampoos', 'Kits Completos']
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
    setTimeout(() => setAddedAnimationId(null), 1500)
  }

  return (
    <section id="catalogo" className="py-12 sm:py-16 bg-white border-b border-border-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-botanical-100 text-botanical-800 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-botanical-600" />
            <span>Fórmulas Botánicas Originales</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-botanical-900 tracking-tight">
            Catálogo Oficial de Cuidado Capilar
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Ingredientes 100% reales extraídos directamente de la naturaleza. Sin rellenos, sin químicos agresivos y con resultados comprobados en cabellos chilenos.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="space-y-3 mb-8">
          
          {/* Category Filter Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-botanical-600 text-white shadow-xs'
                    : 'bg-surface-soft text-charcoal-muted hover:text-charcoal hover:bg-border-soft/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Concern Filter Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            <span className="font-semibold text-charcoal-muted shrink-0 mr-1 hidden sm:inline">Objetivo:</span>
            {concerns.map(con => (
              <button
                key={con}
                onClick={() => setSelectedConcern(con)}
                className={`px-2.5 py-1 rounded-lg border transition-all whitespace-nowrap ${
                  selectedConcern === con
                    ? 'border-lavender-500 bg-lavender-50 text-lavender-700 font-bold'
                    : 'border-border-soft bg-white text-charcoal-muted hover:border-charcoal-muted/40'
                }`}
              >
                {con === 'Todas' ? 'Todos los objetivos' : con}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map(product => {
            const hasOffer = Boolean(product.offer_price && product.offer_price < product.price)
            const isAdded = addedAnimationId === product.id

            return (
              <div
                key={product.id}
                onClick={() => setSelectedProductForModal(product)}
                className="group relative bg-[#FBF9F7] rounded-2xl border border-border-soft overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Product Image Container */}
                <div className="relative w-full aspect-square bg-white overflow-hidden p-2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-103 p-2"
                  />

                  {/* Top Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full bg-botanical-800/90 backdrop-blur-sm text-white text-[11px] font-bold tracking-wide uppercase shadow-sm">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Quick View Pill on Hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="bg-white/90 backdrop-blur-sm text-botanical-800 text-xs font-bold px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      Ver Detalles & Modo de Uso
                    </span>
                  </div>
                </div>

                {/* Product Content Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    
                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-1.5 text-[11px] text-charcoal-muted">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="font-semibold text-charcoal">{product.rating}</span>
                      <span>({product.reviews_count})</span>
                    </div>

                    {/* Product Title */}
                    <h3 className="font-serif text-base sm:text-lg font-bold text-botanical-900 group-hover:text-botanical-600 transition-colors line-clamp-1 leading-snug">
                      {product.name}
                    </h3>

                    {/* Format Pill */}
                    <p className="text-[11px] text-charcoal-muted font-medium bg-surface-soft py-0.5 px-2 rounded-md inline-block">
                      {product.format}
                    </p>

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
                    <p className="text-[11px] text-charcoal-muted line-clamp-2 pt-0.5">
                      {product.short_description}
                    </p>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="pt-3 border-t border-border-soft/60 space-y-2.5">
                    <div className="flex items-baseline justify-between">
                      <div>
                        {hasOffer ? (
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-lg sm:text-xl font-bold text-botanical-800">
                              {formatCLP(product.offer_price!)}
                            </span>
                            <span className="text-xs text-charcoal-muted line-through">
                              {formatCLP(product.price)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg sm:text-xl font-bold text-botanical-800">
                            {formatCLP(product.price)}
                          </span>
                        )}
                        <span className="text-[10px] text-charcoal-muted block font-medium">IVA Incluido • Envío por Starken</span>
                      </div>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedProductForModal(product)
                        }}
                        className="py-2 px-2.5 rounded-xl border border-border-soft bg-white hover:bg-surface-soft text-charcoal text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-botanical-600" />
                        <span>Modo de Uso</span>
                      </button>

                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all shadow-xs active:scale-95 ${
                          isAdded
                            ? 'bg-green-600 text-white'
                            : 'bg-botanical-600 hover:bg-botanical-700 text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>¡Agregado!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            <span>Al Carrito</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty state if filter has no results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-[#FBF9F7] rounded-3xl border border-border-soft">
            <p className="text-lg text-charcoal-muted">No encontramos productos con estos filtros.</p>
            <button
              onClick={() => {
                setSelectedCategory('Todas')
                setSelectedConcern('Todas')
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-botanical-600 text-white font-semibold text-xs"
            >
              Restablecer Filtros
            </button>
          </div>
        )}

      </div>
    </section>
  )
}


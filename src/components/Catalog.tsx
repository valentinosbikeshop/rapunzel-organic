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
    <section id="catalogo" className="py-16 sm:py-24 bg-white border-b border-border-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-botanical-100 text-botanical-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-botanical-600" />
            <span>Fórmulas Botánicas Originales</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-botanical-900 tracking-tight">
            Catálogo Oficial de Cuidado Capilar
          </h2>
          <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed">
            Ingredientes 100% reales extraídos directamente de la naturaleza. Sin rellenos, sin químicos agresivos y con resultados clínicos comprobados en cabellos chilenos.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="space-y-4 mb-10">
          
          {/* Category Filter Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-botanical-600 text-white shadow-sm'
                    : 'bg-surface-soft text-charcoal-muted hover:text-charcoal hover:bg-border-soft/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Concern Filter Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            <span className="font-semibold text-charcoal-muted shrink-0 mr-1 hidden sm:inline">Objetivo:</span>
            {concerns.map(con => (
              <button
                key={con}
                onClick={() => setSelectedConcern(con)}
                className={`px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => {
            const hasOffer = Boolean(product.offer_price && product.offer_price < product.price)
            const isAdded = addedAnimationId === product.id

            return (
              <div
                key={product.id}
                onClick={() => setSelectedProductForModal(product)}
                className="group relative bg-[#FBF9F7] rounded-3xl border border-border-soft overflow-hidden hover:shadow-organic-lg transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Product Image Container */}
                <div className="relative w-full aspect-square bg-white overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    
                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-1.5 text-xs text-charcoal-muted">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="font-semibold text-charcoal">{product.rating}</span>
                      <span>({product.reviews_count} opiniones)</span>
                    </div>

                    {/* Product Title */}
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-botanical-900 group-hover:text-botanical-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Format Pill */}
                    <p className="text-xs text-charcoal-muted font-medium bg-surface-soft py-1 px-2.5 rounded-md inline-block">
                      {product.format}
                    </p>

                    {/* Active Ingredients Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {product.active_ingredients.slice(0, 3).map((ing, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded-full bg-botanical-100 text-botanical-700 font-medium"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-charcoal-muted line-clamp-2 pt-1">
                      {product.short_description}
                    </p>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="pt-4 border-t border-border-soft/60 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        {hasOffer ? (
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl sm:text-2xl font-extrabold text-botanical-800">
                              {formatCLP(product.offer_price!)}
                            </span>
                            <span className="text-xs text-charcoal-muted line-through">
                              {formatCLP(product.price)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xl sm:text-2xl font-extrabold text-botanical-800">
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
                        className="py-2.5 px-3 rounded-xl border border-border-soft bg-white hover:bg-surface-soft text-charcoal text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-botanical-600" />
                        <span>Modo de Uso</span>
                      </button>

                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 ${
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

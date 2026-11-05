'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, HeartHandshake, Star } from 'lucide-react'
import brandData from '@/data/brand_bible.json'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FBF9F7] via-[#F5F7ED]/50 to-[#FBF9F7] pt-6 pb-12 lg:pt-10 lg:pb-16 border-b border-border-soft">
      {/* Decorative botanical background blur orbs */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-botanical-300/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-24 right-10 w-[250px] h-[250px] bg-lavender-300/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Brand Copy & Value Proposition */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-4 text-center lg:text-left"
          >
            
            {/* Top Pill Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-botanical-100/90 border border-botanical-200/80 text-botanical-800 text-[11px] sm:text-xs font-semibold tracking-wide shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-botanical-600 animate-pulse" />
              <span>{brandData.brand.verified_community_size}</span>
              <span className="text-botanical-400">•</span>
              <span className="text-botanical-700 font-bold">288k en Instagram</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-botanical-900 leading-[1.2] tracking-tight">
              Recupera tu cabello y <span className="text-botanical-600 italic">frena la caída</span> con extractos botánicos puros.
            </h1>

            {/* Descriptive Body Text */}
            <p className="text-xs sm:text-sm text-charcoal-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Tratamientos capilares <strong>98% orgánicos</strong> elaborados con más de 20 hierbas medicinales, Batana Oil y Romero concentrado. Resultados comprobados en densidad y crecimiento sin químicos agresivos.
            </p>

            {/* Confidence Checkpoints */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 pt-1 text-xs text-charcoal/85">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-botanical-600 shrink-0" />
                <span>98% Orgánico</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-botanical-600 shrink-0" />
                <span>Sin Sulfatos ni Parabenos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-botanical-600 shrink-0" />
                <span>Cruelty Free 🌼</span>
              </div>
            </div>

            {/* Dual CTAs with micro-interactions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center lg:justify-start">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="/catalogo/"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-botanical-600 hover:bg-botanical-700 text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-98"
              >
                <span>Ver Catálogo de Productos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="/diagnostico/"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white hover:bg-surface-soft text-botanical-800 border border-botanical-600/30 hover:border-botanical-600 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Hacer Diagnóstico Capilar</span>
                <span className="text-[10px] bg-botanical-100 text-botanical-700 font-bold px-1.5 py-0.2 rounded-full">Gratis</span>
              </motion.a>
            </div>

            {/* Urgency message with live pulse */}
            <div className="text-[11px] text-charcoal-muted pt-1 flex items-center justify-center lg:justify-start gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Pedidos directos a WhatsApp oficial con asesoría personalizada</span>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Asset Composition */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Animated Float Container */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="relative w-full max-w-xs sm:max-w-sm"
            >
              {/* Main Product Showcase Card */}
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-2 border-white bg-white group">
                <Image
                  src="/images/products/pack-stop-caida.jpg"
                  alt="Rapunzel Organic Tratamiento Stop Caída"
                  fill
                  className="object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
                
                {/* Bottom Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

                {/* Tag Overlay on Hero Image */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-0.5 z-10 pointer-events-none">
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-amber-600/90 px-2.5 py-0.5 rounded-full inline-block backdrop-blur-xs">
                    Tratamiento Estrella
                  </span>
                  <p className="font-serif font-bold text-base sm:text-lg leading-tight">
                    Pack Stop Caída Intensivo
                  </p>
                  <p className="text-[11px] text-white/90">
                    Infusión de 20 hierbas + Vitamina Capilar Batana
                  </p>
                </div>

                {/* Verified Results Floating Pill */}
                <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 text-[10px] font-bold text-botanical-800 z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Resultados en 30 días</span>
                </div>
              </div>

              {/* Decorative Floating Accent Badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-3 -left-3 sm:-left-5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-border-soft flex items-center gap-2 text-xs font-bold text-botanical-900 z-20"
              >
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span>4.9/5 (+1,250 reseñas)</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -top-3 -right-2 sm:-right-4 bg-botanical-800 text-white px-3 py-1.5 rounded-2xl shadow-lg flex items-center gap-1.5 text-[11px] font-bold z-20"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Pack 2 Piezas $26.610</span>
              </motion.div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  )
}

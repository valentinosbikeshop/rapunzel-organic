'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react'
import brandData from '@/data/brand_bible.json'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FBF9F7] via-[#F5F7ED]/60 to-[#FBF9F7] pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-border-soft">
      {/* Decorative botanical background blur orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-botanical-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[350px] h-[350px] bg-lavender-300/15 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Copy & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-botanical-100/80 border border-botanical-200 text-botanical-800 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-botanical-600" />
              <span>{brandData.brand.verified_community_size}</span>
              <span className="text-botanical-500">•</span>
              <span className="text-botanical-700 font-bold">288k en Instagram</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-botanical-900 leading-[1.15] tracking-tight">
              Recupera tu cabello y <span className="text-botanical-600 italic">frena la caída</span> con extractos botánicos puros.
            </h1>

            {/* Descriptive Body Text */}
            <p className="text-base sm:text-lg text-charcoal-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Tratamientos capilares <strong>98% orgánicos</strong> elaborados con más de 20 hierbas medicinales, Batana Oil y Romero concentrado. Resultados reales en densidad, brillo y crecimiento sin químicos agresivos.
            </p>

            {/* Confidence Checkpoints */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-charcoal">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-botanical-600 shrink-0" />
                <span>98% Orgánico</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-botanical-600 shrink-0" />
                <span>Sin Sulfatos ni Parabenos</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <HeartHandshake className="w-4 h-4 text-botanical-600 shrink-0" />
                <span>Cruelty Free 🌼</span>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
              <a
                href="#catalogo"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-botanical-600 hover:bg-botanical-700 text-white font-semibold text-base shadow-organic hover:shadow-organic-lg transition-all duration-200 flex items-center justify-center gap-2 group active:scale-[0.98]"
              >
                <span>Ver Catálogo de Productos</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#diagnostico"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-surface-soft text-botanical-800 border-2 border-botanical-600/30 hover:border-botanical-600 font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Hacer Diagnóstico Capilar</span>
                <span className="text-xs bg-botanical-100 text-botanical-700 font-bold px-2 py-0.5 rounded-full">Gratis</span>
              </a>
            </div>

            {/* Urgency message for users from Instagram */}
            <div className="text-xs text-charcoal-muted/80 pt-2 flex items-center justify-center lg:justify-start gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping inline-block" />
              <span>Pedidos directos a WhatsApp oficial con asesoría personalizada</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset Composition */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Main Product Showcase Card */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-organic-lg border-4 border-white bg-white group">
              <Image
                src="/images/products/stop-caida-pack.jpg"
                alt="Rapunzel Organic Tratamiento Stop Caída"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              
              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Tag Overlay on Hero Image */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs uppercase tracking-wider font-bold bg-amber-oil/90 px-3 py-1 rounded-full inline-block backdrop-blur-sm">
                  Tratamiento Estrella
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug">
                  Tratamiento Stop Caída & Crecimiento
                </h3>
                <p className="text-xs text-white/90">
                  Formulado con Batana Oil, Romero Silvestre y más de 20 hierbas medicinales.
                </p>
              </div>
            </div>

            {/* Floating Trust Badge Top Right */}
            <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-organic border border-border-soft hidden sm:flex items-center gap-3 animate-in fade-in slide-in-from-right">
              <div className="w-10 h-10 rounded-full bg-botanical-100 flex items-center justify-center text-botanical-700 font-bold text-lg">
                ★
              </div>
              <div>
                <span className="font-bold text-sm text-charcoal block">4.9 / 5.0 Estrellas</span>
                <span className="text-[11px] text-charcoal-muted block">+150.000 resultados en Chile</span>
              </div>
            </div>

            {/* Floating Badge Bottom Left */}
            <div className="absolute -bottom-5 -left-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-organic border border-border-soft hidden sm:flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#25D366] animate-pulse" />
              <div className="text-left">
                <span className="font-bold text-xs text-charcoal block">Envíos a Todo Chile 🇨🇱</span>
                <span className="text-[11px] text-charcoal-muted block">Starken, Chilexpress & Domicilio</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

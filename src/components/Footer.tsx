'use client'

import React from 'react'
import { Instagram, MessageCircle, Heart, Truck, ShieldCheck, Sparkles, MapPin, Clock } from 'lucide-react'
import brandData from '../data/brand_bible.json'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-12 border-t border-brand-sage/20 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-brand-olive/20 to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-gold bg-brand-linen flex items-center justify-center p-0.5">
                <img
                  src="/images/brand/logo.jpg"
                  alt="Rapunzel Organic Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white block">
                  Rapunzel Organic
                </span>
                <span className="text-[11px] uppercase tracking-wider text-brand-gold font-semibold block">
                  Botánica Capilar Chilena 🌿
                </span>
              </div>
            </div>

            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              Especialistas en recuperación capilar y freno de la caída. Fórmulas 98% orgánicas elaboradas artesanalmente con batana oil hondureño, romero destilado y más de 20 hierbas medicinales.
            </p>

            <div className="flex items-center gap-2 text-xs text-white/60">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <span>Más de 150.000 clientes felices en todo Chile 🇨🇱</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-base">
              Navegación Rápida
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/70">
              <li>
                <a href="#catalogo" className="hover:text-brand-gold transition-colors">
                  Catálogo de Productos y Packs
                </a>
              </li>
              <li>
                <a href="#quiz" className="hover:text-brand-gold transition-colors">
                  Test de Diagnóstico Capilar
                </a>
              </li>
              <li>
                <a href="#reels" className="hover:text-brand-gold transition-colors">
                  Videos y Resultados en Instagram
                </a>
              </li>
              <li>
                <a href="#testimonios" className="hover:text-brand-gold transition-colors">
                  Antes y Después Reales
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-brand-gold transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Logistics & Couriers */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-base flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-gold" />
              Envíos y Despachos
            </h4>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Despachamos de forma segura a cualquier rincón de Chile:
            </p>
            <div className="space-y-1.5 text-xs text-white/80 bg-white/5 p-3 rounded-xl border border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-gold" />
                <span><strong>Starken:</strong> Envíos a domicilio y sucursal</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-gold" />
                <span><strong>Santiago:</strong> Transporte privado semanal</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-gold" />
                <span><strong>Chilexpress / Correos:</strong> Regiones extremas</span>
              </div>
            </div>
            <div className="text-[11px] text-white/50 flex items-center gap-1.5 mt-2">
              <Clock className="w-3.5 h-3.5 text-brand-gold" />
              <span>Atención WhatsApp: Lunes a Sábado de 10:00 a 20:00 hrs</span>
            </div>
          </div>

          {/* Col 4: Official Contact */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-white text-base">
              Contacto Directo
            </h4>
            <p className="text-xs text-white/70">
              No tenemos tienda física intermediaria: atendemos y asesoramos directamente a cada clienta por WhatsApp e Instagram.
            </p>

            <div className="space-y-2">
              <a
                href="https://wa.me/56953672027"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors text-white text-xs sm:text-sm font-semibold"
              >
                <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <span className="text-[10px] text-white/60 block">WhatsApp Asesoría:</span>
                  <span>+56 9 5367 2027</span>
                </div>
              </a>

              <a
                href="https://www.instagram.com/rapunzel_organic"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors text-white text-xs sm:text-sm font-semibold"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-white/60 block">Instagram Oficial:</span>
                  <span>@rapunzel_organic (288k)</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} Rapunzel Organic Chile. Cosmética Botánica Artesanal. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1.5 text-white/70">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>para el cuidado natural de tu cabello</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

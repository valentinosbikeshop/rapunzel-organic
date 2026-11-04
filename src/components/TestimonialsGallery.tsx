'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ShieldCheck, Heart, MessageCircle, X, ZoomIn, CheckCircle2 } from 'lucide-react'
import brandData from '../data/brand_bible.json'
import { Testimonial } from '../types'

interface ExtendedTestimonial extends Testimonial {
  category: 'caida' | 'crecimiento' | 'hombre' | 'postparto'
}

export const TestimonialsGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Enrich testimonials with categories and include all authentic cases
  const allTestimonials: ExtendedTestimonial[] = [
    {
      id: "testimonio-1",
      author: "Janisse Díaz (@janissediazp)",
      badge: "Clienta Verificada 🇨🇱",
      image: "/images/testimonials/clienta-janisse-kit.png",
      quote: "Feliz con mi kit completo de Rapunzel Organic. El cambio en la textura, brillo y crecimiento es innegable. 100% recomendado.",
      product_used: "Kit Completo 5 Pasos",
      time_used: "3 meses",
      category: "crecimiento"
    },
    {
      id: "testimonio-2",
      author: "Camila P. (@camilap_cl)",
      badge: "Caso Alopecia Superada",
      image: "/images/testimonials/antes-despues-coronilla-mujer.png",
      quote: "Quería compartir el cambio en el crecimiento de mi pelo desde que ocupo su producto. La primera foto es de cuando inicié en junio y la segunda de hoy. Estoy re contenta.",
      product_used: "Tratamiento Stop Caída",
      time_used: "4 meses",
      category: "caida"
    },
    {
      id: "testimonio-3",
      author: "Matías R.",
      badge: "Recuperación de Entradas Hombre",
      image: "/images/testimonials/antes-despues-hombre-entradas.jpg",
      quote: "Les comparto mi proceso: después de 4 meses usando el tratamiento Stop Caída, superó todas mis expectativas. Iba a hacerme un trasplante y este producto me salvó el cabello.",
      product_used: "Tónico + Shampoo",
      time_used: "4 meses",
      category: "hombre"
    },
    {
      id: "testimonio-4",
      author: "Mamá en Lactancia",
      badge: "Caída Postparto",
      image: "/images/testimonials/testimonio-chat-lactancia.png",
      quote: "Súper feliz con los resultados en tan poco tiempo. Desde la lactancia se me caía muchísimo el cabello y tenía muy poco en las entradas. Ya veo cómo brota cabello nuevo.",
      product_used: "Vitamina Capilar + Shampoo",
      time_used: "2 meses",
      category: "postparto"
    },
    {
      id: "testimonio-5",
      author: "Paciente Post Cirugía Bariátrica",
      badge: "Pérdida por Déficit Nutricional",
      image: "/images/testimonials/antes-despues-bariatrica.jpg",
      quote: "Después de mi cirugía bariátrica empecé a notar pérdida importante de cabello en laterales. Probé todo hasta que llegué a Rapunzel Organic y volví a sentirme segura.",
      product_used: "Tratamiento Stop Caída",
      time_used: "3 meses",
      category: "caida"
    },
    {
      id: "testimonio-6",
      author: "Población de Entradas Femeninas",
      badge: "Fórmula 98% Orgánica",
      image: "/images/testimonials/antes-despues-entradas-mujer.jpg",
      quote: "Los 'pelitos nuevos' (baby hairs) comenzaron a salir a las 3 semanas de aplicar el tónico todas las noches con masajes circulares. Una maravilla.",
      product_used: "Vitamina Capilar con Batana",
      time_used: "1.5 meses",
      category: "caida"
    },
    {
      id: "testimonio-7",
      author: "Caso Injerto Evitado",
      badge: "Testimonio Real Hombre",
      image: "/images/testimonials/testimonio-injerto-evitado.jpg",
      quote: "Pensaba que la única solución era gastar millones en un injerto capilar. El tónico bifásico de batana y romero me reactivó los folículos dormidos.",
      product_used: "Tratamiento Stop Caída",
      time_used: "5 meses",
      category: "hombre"
    },
    {
      id: "testimonio-8",
      author: "Testimonio Chat WhatsApp",
      badge: "Volumen y Crecimiento",
      image: "/images/testimonials/testimonio-chat-volumen.png",
      quote: "El pelo me creció una locura y lo tengo con mucho más cuerpo y fuerza. Ya es mi tercer pedido que hago por WhatsApp.",
      product_used: "Dúo Potenciador",
      time_used: "6 meses",
      category: "crecimiento"
    }
  ]

  const categories = [
    { id: 'all', label: 'Todos los Casos' },
    { id: 'caida', label: 'Caída y Alopecia' },
    { id: 'crecimiento', label: 'Crecimiento Acelerado' },
    { id: 'hombre', label: 'Línea Masculina' },
    { id: 'postparto', label: 'Postparto y Salud' }
  ]

  const filtered = activeCategory === 'all'
    ? allTestimonials
    : allTestimonials.filter(t => t.category === activeCategory)

  return (
    <section id="testimonios" className="py-12 sm:py-16 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-dark text-[11px] font-semibold uppercase tracking-wider mb-2">
            <Heart className="w-3 h-3 text-brand-gold fill-brand-gold" />
            +150.000 Melenas Transformadas en Chile
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-dark tracking-tight mb-2">
            Resultados Reales de Nuestra Comunidad
          </h2>
          <p className="text-brand-dark/70 text-xs sm:text-sm leading-relaxed">
            Capturas y fotografías directas compartidas voluntariamente por clientas y clientes en nuestro WhatsApp e Instagram. Sin retoques.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-5">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-brand-olive text-white shadow-xs'
                    : 'bg-brand-linen text-brand-dark/70 hover:text-brand-dark hover:bg-brand-sand/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="bg-brand-linen/40 rounded-2xl border border-brand-sage/20 overflow-hidden shadow-xs hover:shadow-sm transition-shadow flex flex-col"
              >
                {/* Image Container with zoom trigger */}
                <div
                  className="relative aspect-[4/3] bg-brand-sand/30 overflow-hidden cursor-zoom-in group"
                  onClick={() => setSelectedImage(item.image)}
                >
                  <img
                    src={item.image}
                    alt={item.author}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-md text-brand-dark text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                      <ZoomIn className="w-3.5 h-3.5" />
                      Ampliar foto
                    </span>
                  </div>
                  <span className="absolute top-2.5 left-2.5 bg-brand-olive/90 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-md text-brand-dark text-[9px] font-semibold px-2 py-0.5 rounded-full">
                    ⏱ {item.time_used}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                      ))}
                      <span className="text-[11px] font-bold text-brand-dark ml-1.5">5.0</span>
                    </div>

                    <p className="text-xs text-brand-dark/80 italic leading-relaxed mb-3">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-brand-sage/15 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-brand-dark flex items-center gap-1">
                        {item.author}
                        <CheckCircle2 className="w-3 h-3 text-brand-olive" />
                      </div>
                      <div className="text-[10px] text-brand-olive font-medium">
                        Tratamiento: {item.product_used}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Trust Banner bottom */}
        <div className="mt-8 bg-gradient-to-r from-brand-olive via-brand-oliveDark to-brand-olive rounded-2xl p-5 sm:p-6 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="max-w-md">
            <h3 className="text-lg sm:text-xl font-serif font-bold mb-1">
              ¿Quieres compartir tu testimonio con nosotras?
            </h3>
            <p className="text-white/80 text-xs">
              Envíanos tus fotos de antes y después por WhatsApp. ¡Premiamos tu constancia con descuentos exclusivos!
            </p>
          </div>
          <a
            href="https://wa.me/56953672027?text=Hola%20Rapunzel%20Organic,%20quiero%20compartir%20mi%20testimonio%20de%20antes%20y%20despu%C3%A9s"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white text-brand-olive px-5 py-2.5 rounded-full font-bold text-xs shadow-sm hover:bg-brand-linen transition-colors shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            Enviar mi caso por WhatsApp
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-3xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-2"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedImage}
                alt="Testimonio ampliado"
                className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}


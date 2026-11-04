'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, Sparkles, MessageCircle } from 'lucide-react'
import brandData from '../data/brand_bible.json'
import { FAQItem } from '../types'

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0) // First item open by default
  const faqs = brandData.faq as FAQItem[]

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <section id="faq" className="py-20 bg-brand-linen/40 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-olive/10 border border-brand-olive/20 text-brand-olive text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-brand-olive" />
            Preguntas Frecuentes
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-dark tracking-tight mb-4">
            Todo lo que Necesitas Saber
          </h2>
          <p className="text-brand-dark/70 text-base leading-relaxed">
            Resolvemos las dudas más comunes sobre nuestras fórmulas botánicas, modos de uso, sedimentos herbales y envíos a todo Chile.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-brand-sage/20 overflow-hidden shadow-sm transition-all duration-200 hover:border-brand-olive/30"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold text-brand-dark text-base sm:text-lg pr-2">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-brand-sage/20 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-brand-olive text-white rotate-180' : 'bg-brand-linen text-brand-dark'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-6 sm:px-6 pt-1 text-sm sm:text-base text-brand-dark/75 leading-relaxed border-t border-brand-sage/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Extra question prompt */}
        <div className="mt-10 text-center bg-white rounded-2xl p-6 border border-brand-sage/20 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-serif font-bold text-brand-dark text-base">
              ¿Tienes una consulta específica sobre tu cuero cabelludo?
            </h4>
            <p className="text-xs sm:text-sm text-brand-dark/60 mt-0.5">
              Nuestras asesoras botánicas responden en tiempo real por WhatsApp.
            </p>
          </div>
          <a
            href="https://wa.me/56953672027?text=Hola%20Rapunzel%20Organic,%20tengo%20una%20consulta%20antes%20de%20hacer%20mi%20pedido"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-olive hover:bg-brand-oliveDark text-white px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-colors shadow-sm shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            Preguntar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

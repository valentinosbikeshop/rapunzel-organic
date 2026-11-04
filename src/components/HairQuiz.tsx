'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag, ShieldCheck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatCLP } from '../utils/format'
import brandData from '../data/brand_bible.json'
import { Product, QuizQuestion } from '../types'

interface QuizAnswers {
  concern?: string
  scalp_type?: string
  routine_preference?: string
}

export const HairQuiz: React.FC = () => {
  const { addToCart, setIsCartOpen } = useCart()
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null)
  const [recommendationReason, setRecommendationReason] = useState<string>('')
  const [recommendationHeadline, setRecommendationHeadline] = useState<string>('')
  const [addedNotice, setAddedNotice] = useState<boolean>(false)

  const questions = brandData.quiz.questions as QuizQuestion[]
  const products = brandData.products as Product[]

  const handleSelectOption = (questionId: string, value: string) => {
    const updatedAnswers = { ...answers, [questionId]: value }
    setAnswers(updatedAnswers)

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      calculateRecommendation(updatedAnswers)
    }
  }

  const calculateRecommendation = (finalAnswers: QuizAnswers) => {
    const rules = brandData.quiz.recommendation_engine.rules
    let matchedRule = rules[rules.length - 1] // default fallback

    for (const rule of rules) {
      if (rule.condition === "default") continue

      if (
        rule.condition.includes("caida") &&
        (finalAnswers.concern === 'caida' || (finalAnswers.concern === 'crecimiento' && finalAnswers.routine_preference === 'intensiva'))
      ) {
        matchedRule = rule
        break
      }
      if (
        rule.condition.includes("basica") &&
        finalAnswers.concern === 'crecimiento' &&
        finalAnswers.routine_preference === 'basica'
      ) {
        matchedRule = rule
        break
      }
      if (
        rule.condition.includes("completa") &&
        (finalAnswers.concern === 'completo' || finalAnswers.routine_preference === 'completa')
      ) {
        matchedRule = rule
        break
      }
    }

    const prod = products.find(p => p.id === matchedRule.recommended_product_id) || products[0]
    setRecommendedProduct(prod)
    setRecommendationHeadline(matchedRule.headline)
    setRecommendationReason(matchedRule.reason)
    setCurrentStep(questions.length) // Result step
  }

  const resetQuiz = () => {
    setAnswers({})
    setCurrentStep(0)
    setRecommendedProduct(null)
    setAddedNotice(false)
  }

  const handleAddToCart = () => {
    if (recommendedProduct) {
      addToCart(recommendedProduct, 1)
      setAddedNotice(true)
      setTimeout(() => {
        setIsCartOpen(true)
      }, 500)
    }
  }

  const isCompleted = currentStep >= questions.length

  return (
    <section id="diagnostico" className="py-20 bg-gradient-to-b from-brand-sand/60 via-white to-brand-linen/70 relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-sage/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-olive/10 border border-brand-olive/20 text-brand-olive text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            Diagnóstico Capilar Inteligente
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-dark mb-4 tracking-tight">
            {brandData.quiz.title}
          </h2>
          <p className="text-brand-dark/70 text-base leading-relaxed">
            {brandData.quiz.subtitle}
          </p>
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-3xl border border-brand-sage/20 shadow-xl shadow-brand-dark/5 p-6 sm:p-10 relative overflow-hidden backdrop-blur-sm">
          {!isCompleted ? (
            <div>
              {/* Progress indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-medium text-brand-dark/60 mb-2">
                  <span>Paso {currentStep + 1} de {questions.length}</span>
                  <span className="font-semibold text-brand-olive">{Math.round(((currentStep + 1) / questions.length) * 100)}% Completado</span>
                </div>
                <div className="h-2 w-full bg-brand-linen rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-brand-olive to-brand-sage rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Question container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark mb-6">
                    {questions[currentStep].question}
                  </h3>

                  <div className="grid grid-cols-1 gap-3.5">
                    {questions[currentStep].options.map((opt) => {
                      const isSelected = answers[questions[currentStep].id as keyof QuizAnswers] === opt.value
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleSelectOption(questions[currentStep].id, opt.value)}
                          className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                            isSelected
                              ? 'border-brand-olive bg-brand-olive/5 shadow-md shadow-brand-olive/10'
                              : 'border-brand-sage/20 bg-brand-linen/40 hover:bg-white hover:border-brand-olive/40 hover:shadow-md'
                          }`}
                        >
                          <div className="pr-4">
                            <span className="text-sm sm:text-base font-medium text-brand-dark group-hover:text-brand-olive transition-colors block">
                              {opt.label}
                            </span>
                            {opt.tag && (
                              <span className="inline-block mt-1 text-[11px] font-semibold text-brand-olive bg-brand-olive/10 px-2 py-0.5 rounded-full">
                                Enfoque: {opt.tag}
                              </span>
                            )}
                          </div>
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'border-brand-olive bg-brand-olive text-white'
                              : 'border-brand-sage/40 group-hover:border-brand-olive'
                          }`}>
                            {isSelected ? <Check className="w-3.5 h-3.5" /> : <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-brand-olive/30" />}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            /* Recommendation Result View */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-left"
            >
              <div className="flex items-center justify-between flex-wrap gap-2 pb-5 border-b border-brand-sage/20 mb-6">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-olive bg-brand-olive/10 px-3 py-1.5 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-brand-olive" />
                  Diagnóstico Personalizado
                </div>
                <button
                  onClick={resetQuiz}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-dark/60 hover:text-brand-olive transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Repetir test
                </button>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-dark mb-3">
                {recommendationHeadline}
              </h3>
              <p className="text-sm sm:text-base text-brand-dark/75 leading-relaxed mb-8 bg-brand-linen/60 p-4 rounded-2xl border border-brand-sage/20">
                {recommendationReason}
              </p>

              {recommendedProduct && (
                <div className="bg-brand-sand/30 rounded-2xl p-4 sm:p-6 border border-brand-sage/20 flex flex-col md:flex-row items-center gap-6 mb-8">
                  <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden bg-white shrink-0 shadow-sm border border-brand-sage/10 relative">
                    <img
                      src={recommendedProduct.image}
                      alt={recommendedProduct.name}
                      className="w-full h-full object-contain p-2"
                    />
                    {recommendedProduct.badge && (
                      <span className="absolute top-2 left-2 bg-brand-olive text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {recommendedProduct.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 w-full text-center md:text-left">
                    <div className="text-xs font-semibold text-brand-olive uppercase tracking-wider mb-1">
                      {recommendedProduct.category} • {recommendedProduct.format}
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold font-serif text-brand-dark mb-2">
                      {recommendedProduct.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-brand-dark/70 mb-4 line-clamp-2">
                      {recommendedProduct.short_description}
                    </p>

                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                      {recommendedProduct.offer_price ? (
                        <>
                          <span className="text-2xl font-bold text-brand-olive">
                            {formatCLP(recommendedProduct.offer_price)}
                          </span>
                          <span className="text-sm line-through text-brand-dark/40">
                            {formatCLP(recommendedProduct.price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-brand-olive">
                          {formatCLP(recommendedProduct.price)}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <button
                        onClick={handleAddToCart}
                        className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-brand-olive hover:bg-brand-oliveDark text-white px-6 py-3 rounded-xl font-medium shadow-md shadow-brand-olive/20 hover:shadow-lg transition-all"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        {addedNotice ? '¡Añadido al Carrito!' : 'Agregar Rutina al Carrito'}
                      </button>
                      <button
                        onClick={() => setIsCartOpen(true)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl font-medium text-brand-dark bg-white border border-brand-sage/30 hover:border-brand-olive transition-colors text-sm"
                      >
                        Ver Carrito
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

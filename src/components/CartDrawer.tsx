'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  MessageCircle,
  CreditCard,
  Building2,
  Lock
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatCLP, buildWhatsAppLink } from '../utils/format'
import brandData from '../data/brand_bible.json'
import { CustomerInfo } from '../types'

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalAmount
  } = useCart()

  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    phone: '',
    comuna: '',
    region: 'Metropolitana de Santiago',
    address: '',
    notes: '',
    paymentMethod: 'transferencia'
  })

  const [isFormOpen, setIsFormOpen] = useState<boolean>(true)

  const handleCheckout = () => {
    const formattedItems = cart.map(item => {
      const unit = item.product.offer_price ?? item.product.price
      return {
        name: item.product.name,
        quantity: item.quantity,
        unitPrice: unit,
        total: unit * item.quantity
      }
    })

    const rawPhone = brandData.brand.logistics.whatsapp_raw || '56953672027'
    const waUrl = buildWhatsAppLink(rawPhone, formattedItems, totalAmount, customer)
    window.open(waUrl, '_blank')
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-brand-sage/20"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-brand-sage/15 flex items-center justify-between bg-brand-linen/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-brand-olive text-white flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-brand-dark text-lg leading-tight">
                      Tu Bolsa Capilar
                    </h3>
                    <p className="text-xs text-brand-dark/60">
                      {totalItems} {totalItems === 1 ? 'producto' : 'productos'} en lista
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-brand-sage/20 text-brand-dark flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Courier notice banner */}
              <div className="bg-brand-sand/40 border-b border-brand-sage/20 px-4 py-2.5 flex items-center gap-2 text-xs text-brand-dark">
                <Truck className="w-4 h-4 text-brand-olive shrink-0" />
                <span>Despachos a todo Chile vía <strong>Starken</strong> y transporte privado en Santiago.</span>
              </div>

              {/* Content area: Cart items or Empty state */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                    <div className="w-16 h-16 rounded-full bg-brand-linen flex items-center justify-center text-brand-olive mb-4">
                      <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <h4 className="font-serif font-bold text-brand-dark text-lg mb-2">
                      Tu bolsa está vacía
                    </h4>
                    <p className="text-xs sm:text-sm text-brand-dark/65 max-w-xs mb-6">
                      Descubre nuestras fórmulas artesanales 98% orgánicas y dale a tu cabello el cuidado que merece.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false)
                        const cat = document.getElementById('catalogo')
                        if (cat) cat.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="inline-flex items-center gap-2 bg-brand-olive hover:bg-brand-oliveDark text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-md"
                    >
                      Explorar Catálogo
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Item list */}
                    <div className="space-y-3">
                      {cart.map(item => {
                        const unitPrice = item.product.offer_price ?? item.product.price
                        return (
                          <div
                            key={item.product.id}
                            className="bg-brand-linen/30 border border-brand-sage/20 rounded-2xl p-3 flex gap-3 relative group"
                          >
                            {/* Product thumb */}
                            <div className="w-16 h-16 rounded-xl bg-white border border-brand-sage/10 overflow-hidden shrink-0 flex items-center justify-center p-1">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-contain"
                              />
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0 pr-6">
                              <h5 className="font-serif font-bold text-brand-dark text-xs sm:text-sm leading-snug line-clamp-1">
                                {item.product.name}
                              </h5>
                              <div className="text-[11px] text-brand-dark/50 mt-0.5">
                                {item.product.format}
                              </div>
                              <div className="text-xs font-bold text-brand-olive mt-1">
                                {formatCLP(unitPrice)}
                              </div>

                              {/* Quantity controls */}
                              <div className="flex items-center gap-2 mt-2">
                                <div className="inline-flex items-center border border-brand-sage/30 rounded-lg bg-white overflow-hidden shadow-xs">
                                  <button
                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                    className="p-1 hover:bg-brand-linen text-brand-dark transition-colors"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="px-2 text-xs font-semibold text-brand-dark">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                    className="p-1 hover:bg-brand-linen text-brand-dark transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                                <span className="text-[11px] text-brand-dark/50">
                                  Subtotal: {formatCLP(unitPrice * item.quantity)}
                                </span>
                              </div>
                            </div>

                            {/* Remove button */}
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="absolute top-2 right-2 p-1.5 rounded-lg text-brand-dark/40 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Eliminar producto"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )
                      })}
                    </div>

                    {/* Shipping Form Accordion */}
                    <div className="border border-brand-sage/20 rounded-2xl overflow-hidden bg-brand-linen/40 mt-4">
                      <button
                        onClick={() => setIsFormOpen(!isFormOpen)}
                        className="w-full p-3.5 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-brand-dark hover:bg-brand-sage/10 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-brand-olive" />
                          Datos para el Envío (Opcional)
                        </span>
                        <span className="text-brand-olive text-xs font-normal">
                          {isFormOpen ? 'Ocultar' : 'Completar'}
                        </span>
                      </button>

                      {isFormOpen && (
                        <div className="p-3.5 pt-0 space-y-2.5 text-xs border-t border-brand-sage/15 bg-white">
                          <p className="text-[11px] text-brand-dark/60 mt-2">
                            Al completar tus datos se adjuntarán automáticamente en el mensaje de WhatsApp para despachar más rápido.
                          </p>

                          <div>
                            <label className="block text-[11px] font-semibold text-brand-dark mb-1">
                              Nombre y Apellido
                            </label>
                            <input
                              type="text"
                              value={customer.name}
                              onChange={e => setCustomer({ ...customer, name: e.target.value })}
                              placeholder="Ej: Camila González"
                              className="w-full px-3 py-2 border border-brand-sage/30 rounded-xl focus:border-brand-olive focus:outline-none text-xs bg-brand-linen/20"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[11px] font-semibold text-brand-dark mb-1">
                                Comuna
                              </label>
                              <input
                                type="text"
                                value={customer.comuna}
                                onChange={e => setCustomer({ ...customer, comuna: e.target.value })}
                                placeholder="Ej: Las Condes / Temuco"
                                className="w-full px-3 py-2 border border-brand-sage/30 rounded-xl focus:border-brand-olive focus:outline-none text-xs bg-brand-linen/20"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-brand-dark mb-1">
                                Teléfono
                              </label>
                              <input
                                type="tel"
                                value={customer.phone}
                                onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                                placeholder="+56 9 1234 5678"
                                className="w-full px-3 py-2 border border-brand-sage/30 rounded-xl focus:border-brand-olive focus:outline-none text-xs bg-brand-linen/20"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-brand-dark mb-1">
                              Dirección de Entrega o Sucursal Starken
                            </label>
                            <input
                              type="text"
                              value={customer.address}
                              onChange={e => setCustomer({ ...customer, address: e.target.value })}
                              placeholder="Calle, número, depto o 'Sucursal Starken Centro'"
                              className="w-full px-3 py-2 border border-brand-sage/30 rounded-xl focus:border-brand-olive focus:outline-none text-xs bg-brand-linen/20"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-brand-dark mb-1">
                              Método de Pago Preferido
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => setCustomer({ ...customer, paymentMethod: 'transferencia' })}
                                className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 text-[11px] font-semibold transition-all ${
                                  customer.paymentMethod === 'transferencia'
                                    ? 'border-brand-olive bg-brand-olive/10 text-brand-olive'
                                    : 'border-brand-sage/20 bg-brand-linen/20 text-brand-dark/70 hover:bg-brand-linen'
                                }`}
                              >
                                <Building2 className="w-3.5 h-3.5" />
                                Transferencia
                              </button>
                              <button
                                type="button"
                                onClick={() => setCustomer({ ...customer, paymentMethod: 'tarjeta' })}
                                className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 text-[11px] font-semibold transition-all ${
                                  customer.paymentMethod === 'tarjeta'
                                    ? 'border-brand-olive bg-brand-olive/10 text-brand-olive'
                                    : 'border-brand-sage/20 bg-brand-linen/20 text-brand-dark/70 hover:bg-brand-linen'
                                }`}
                              >
                                <CreditCard className="w-3.5 h-3.5" />
                                Tarjeta
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Footer / Checkout CTA */}
              {cart.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-brand-sage/20 bg-brand-linen/40 space-y-3">
                  {/* Totals */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-brand-dark/70">
                      <span>Subtotal</span>
                      <span className="font-semibold text-brand-dark">{formatCLP(totalAmount)}</span>
                    </div>
                    <div className="flex justify-between text-brand-dark/70">
                      <span>Despacho</span>
                      <span className="text-brand-olive font-medium">Por coordinar en WhatsApp</span>
                    </div>
                    <div className="flex justify-between text-base font-serif font-bold text-brand-dark pt-2 border-t border-brand-sage/15">
                      <span>Total estimado:</span>
                      <span className="text-brand-olive">{formatCLP(totalAmount)} CLP</span>
                    </div>
                  </div>

                  {/* WhatsApp Direct Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/20 hover:shadow-xl transition-all"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    Finalizar Pedido por WhatsApp
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-brand-dark/50">
                    <Lock className="w-3 h-3 text-brand-olive" />
                    <span>Atención personalizada por WhatsApp Oficial de Rapunzel Organic</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

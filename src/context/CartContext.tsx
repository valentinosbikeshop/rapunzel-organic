'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Product, CartItem } from '@/types'

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  selectedProductForModal: Product | null
  setSelectedProductForModal: (product: Product | null) => void
  totalItems: number
  totalAmount: number
  lastAddedItem: string | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'rapunzel_cart_v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null)
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      if (saved) {
        setCart(JSON.parse(saved))
      }
    } catch (e) {
      console.error('Failed to parse cart storage', e)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
      } catch (e) {
        console.error('Failed to save cart storage', e)
      }
    }
  }, [cart, isLoaded])

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { product, quantity }]
    })

    setLastAddedItem(product.name)
    setTimeout(() => setLastAddedItem(null), 3000)
    setIsCartOpen(true)
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const totalAmount = cart.reduce((sum, item) => {
    const unitPrice = item.product.offer_price ?? item.product.price
    return sum + unitPrice * item.quantity
  }, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        selectedProductForModal,
        setSelectedProductForModal,
        totalItems,
        totalAmount,
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}


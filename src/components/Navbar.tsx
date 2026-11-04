'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Menu, X, Sparkles, MessageCircle } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import brandData from '@/data/brand_bible.json'

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Catálogo', href: '#catalogo' },
    { name: 'Diagnóstico Capilar', href: '#diagnostico' },
    { name: 'Aprende a Usarlos', href: '#reels' },
    { name: 'Antes y Después', href: '#testimonios' },
    { name: 'Envíos y FAQ', href: '#faq' },
  ]

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="bg-botanical-800 text-[#F5F7ED] text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-secondary_sage animate-pulse" />
        <span>Envíos a todo Chile vía Starken & Chilexpress • <strong>+150.000 clientes felices</strong> 🇨🇱</span>
        <span className="hidden sm:inline opacity-60">|</span>
        <span className="hidden sm:inline">Despachos semanales garantizados</span>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-[#FBF9F7]/95 backdrop-blur-md border-b border-border-soft transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Tagline */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-botanical-600 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/brand/logo.jpg"
                alt="Rapunzel Organic Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-botanical-800 block">
                Rapunzel <span className="font-normal italic text-botanical-600">Organic</span>
              </span>
              <span className="text-[10px] sm:text-xs text-charcoal-muted tracking-wider uppercase block font-medium">
                Crecimiento Capilar • 98% Orgánico
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-charcoal hover:text-botanical-600 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-botanical-600 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons: WhatsApp & Cart */}
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${brandData.brand.logistics.whatsapp_raw}?text=${encodeURIComponent('¡Hola Rapunzel Organic! 🌿 Tengo una duda antes de comprar:')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
              className="hidden sm:flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-full bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Oficial</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Abrir carrito de compras"
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-full bg-botanical-600 hover:bg-botanical-700 text-white font-medium text-sm flex items-center gap-2 shadow-sm transition-all duration-200 active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Carrito</span>
              {totalItems > 0 && (
                <span className="bg-amber-oil text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-charcoal hover:bg-surface-soft lg:hidden"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-border-soft bg-[#FBF9F7] px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-base font-medium text-charcoal hover:text-botanical-600 border-b border-border-soft/50"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <a
                href={`https://wa.me/${brandData.brand.logistics.whatsapp_raw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm shadow-sm"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Hablar por WhatsApp (+56 9 5367 2027)</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

import type { Metadata } from 'next'
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'
import { ProductDetailModal } from '@/components/ProductDetailModal'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://rapunzel-organic.vercel.app'),
  title: {
    default: 'Rapunzel Organic | Crecimiento Capilar & Fórmulas Botánicas Chile',
    template: '%s | Rapunzel Organic'
  },
  description:
    'Especialistas en recuperación capilar y freno de la caída. Fórmulas botánicas 98% orgánicas con batana oil, romero destilado y decocción de 20 hierbas medicinales. +150.000 clientes en Chile.',
  keywords: [
    'Rapunzel Organic',
    'Crecimiento Capilar',
    'Caida de cabello Chile',
    'Batana Oil',
    'Shampoo Romero Organico',
    'Tratamiento Stop Caida',
    'Cosmetica Botanica Chile'
  ],
  authors: [{ name: 'Rapunzel Organic' }],
  icons: {
    icon: '/images/brand/logo.jpg',
  },
  openGraph: {
    title: 'Rapunzel Organic | Fórmulas Botánicas de Crecimiento Capilar',
    description: 'Recupera tu cabello y frena la caída con más de 20 hierbas medicinales y batana oil puro. Despachos a todo Chile.',
    url: 'https://rapunzel-organic.vercel.app',
    siteName: 'Rapunzel Organic Chile',
    images: [
      {
        url: '/images/products/stop-caida-pack.jpg',
        width: 1200,
        height: 630,
        alt: 'Rapunzel Organic Tratamiento Capilar',
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="bg-brand-linen text-brand-dark min-h-screen flex flex-col font-sans antialiased selection:bg-brand-olive selection:text-white">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <ProductDetailModal />
        </CartProvider>
      </body>
    </html>
  )
}

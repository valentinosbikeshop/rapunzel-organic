import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Catalog } from '@/components/Catalog'
import { HairQuiz } from '@/components/HairQuiz'
import { ReelsShowcase } from '@/components/ReelsShowcase'
import { TestimonialsGallery } from '@/components/TestimonialsGallery'
import { FAQSection } from '@/components/FAQSection'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col">
        <Hero />
        <Catalog />
        <HairQuiz />
        <ReelsShowcase />
        <TestimonialsGallery />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}


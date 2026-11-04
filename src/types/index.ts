export interface Product {
  id: string
  name: string
  badge?: string
  category: string
  concern: string[]
  price: number
  offer_price?: number
  format: string
  rating: number
  reviews_count: number
  image: string
  secondary_image?: string
  short_description: string
  benefits: string[]
  active_ingredients: string[]
  usage_step_by_step: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CustomerInfo {
  name: string
  phone: string
  comuna: string
  region: string
  address: string
  notes?: string
  paymentMethod: 'transferencia' | 'tarjeta'
}

export interface QuizOption {
  label: string
  value: string
  tag?: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: QuizOption[]
}

export interface Testimonial {
  id: string
  author: string
  badge: string
  image: string
  quote: string
  product_used: string
  time_used: string
}

export interface ReelShowcase {
  id: string
  code: string
  title: string
  speaker: string
  quote: string
  video_url: string
  thumbnail: string
}

export interface FAQItem {
  question: string
  answer: string
}


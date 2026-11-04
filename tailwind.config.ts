import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic Brand tokens
        brand: {
          olive: '#5B6434',
          oliveDark: '#3B4220',
          oliveLight: '#768245',
          sage: '#9BA75A',
          lavender: '#91749D',
          lilac: '#B5A0BE',
          gold: '#C87A38',
          linen: '#FBF9F7',
          sand: '#F3EFEA',
          dark: '#1A1A18',
        },
        // Botanical numeric tokens
        botanical: {
          50: '#F5F7ED',
          100: '#E9EED9',
          200: '#D5DFB7',
          300: '#B8C98E',
          400: '#9BA75A',
          500: '#768245',
          600: '#5B6434',
          700: '#464D28',
          800: '#3B4220',
          900: '#2A3016',
        },
        lavender: {
          50: '#F9F7FA',
          100: '#F2ECF5',
          200: '#E3D7EA',
          300: '#CFBCDA',
          400: '#B5A0BE',
          500: '#91749D',
          600: '#755B80',
          700: '#5B4563',
        },
        amber: {
          oil: '#C87A38',
          glow: '#E09252',
        },
        linen: '#FBF9F7',
        'surface-soft': '#F3EFEA',
        'border-soft': '#E4DFD7',
        charcoal: '#1A1A18',
        'charcoal-muted': '#5A5954',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'organic': '0 4px 20px -2px rgba(91, 100, 52, 0.08), 0 2px 6px -1px rgba(91, 100, 52, 0.04)',
        'organic-lg': '0 12px 32px -4px rgba(91, 100, 52, 0.12), 0 4px 12px -2px rgba(91, 100, 52, 0.06)',
      }
    },
  },
  plugins: [],
}
export default config

import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif']
      },
      colors: {
        customOrange: {
          300: '#f46a25',
          400: '#f3590d',
          500: '#DB500B',
          600: '#B8440A',
          700: '#993808'
        },
        customBlue: {
          300: '#5600F9',
          400: '#4906c9',
          500: '#340098',
          600: '#110032'
        },
        content1: '#993808',
        content3: '#DB500B',
        content4: '#f3590d'
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        brand: {
          extend: 'dark',
          colors: {
            background: '#1a0800',
            foreground: '#ffffff',
            primary: {
              50: '#DB500B',
              100: '#f3590d',
              200: '#993808',
              300: '#993808',
              400: '#B8440A',
              500: '#DB500B',
              600: '#f3590d',
              700: '#f46a25',
              800: '#e68554',
              900: '#e9966d',
              DEFAULT: '#DB500B',
              foreground: '#ffffff'
            },
            focus: '#B8440A'
          }
        }
      }
    })
  ]
}

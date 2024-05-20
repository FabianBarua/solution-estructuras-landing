const next = require('@nextui-org/theme');
const nextui = next.nextui

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        content4: '#f3590d',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
		orange:{
			DEFAULT: '#f3590d'
		},
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
  require("tailwindcss-animate"),
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
  ],
}
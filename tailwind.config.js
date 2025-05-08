/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#121212',
          light: '#1E1E1E',
          dark: '#0A0A0A',
        },
        accent: {
          gold: {
            DEFAULT: '#FFD700',
            light: '#FFDF33',
            dark: '#CCAC00',
          },
          purple: {
            DEFAULT: '#800080',
            light: '#9932CC',
            dark: '#4B0082',
          },
        },
        success: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#F87171',
          dark: '#DC2626',
        },
        gray: {
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        heading: ['Pacifico', 'cursive'],
        body: ['Quicksand', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(255, 215, 0, 0.15)',
        'purple': '0 4px 14px 0 rgba(128, 0, 128, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
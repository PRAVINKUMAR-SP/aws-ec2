/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1e3a8a', // blue-900
          dark: '#1e3a8a',
        },
        accent: {
          DEFAULT: '#10b981', // emerald-500
          dark: '#059669', // emerald-600
        },
        page: '#f1f3f6',
      },
      boxShadow: {
        'card': '0 1px 2px 0 rgba(0,0,0,0.1)',
        'card-hover': '0 4px 16px 0 rgba(0,0,0,0.2)',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'fade-in-right': 'fade-in-right 0.6s ease-out',
        'fade-in-up-delay-1': 'fade-in-up 0.6s ease-out 0.2s both',
        'fade-in-up-delay-2': 'fade-in-up 0.6s ease-out 0.4s both',
        'fade-in-up-delay-3': 'fade-in-up 0.6s ease-out 0.6s both',
      }
    },
  },
  plugins: [],
}

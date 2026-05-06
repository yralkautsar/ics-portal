/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#E8630A',
          light: '#FF8C42',
          pale: '#FFF5EF',
          dark: '#C4520A',
        },
        surface: '#FFFFFF',
        subtle: '#F8F8F8',
        border: '#EBEBEB',
        ink: '#1A1A1A',
        ink2: '#4A4A4A',
        ink3: '#888888',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

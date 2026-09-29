/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm Heritage Palette: Terracotta, Gold, Deep Green, Ivory
        terracotta: {
          50: '#fdf6f2',
          100: '#faece4',
          200: '#f5d6c7',
          300: '#ecb69f',
          400: '#e08f71',
          500: '#d56d49',
          600: '#c5532d', // Primary Terracotta
          700: '#a34022',
          800: '#843520',
          900: '#6c2e1f',
          DEFAULT: '#c5532d',
        },
        gold: {
          50: '#fdfaf2',
          100: '#fbf3e0',
          200: '#f6e4be',
          300: '#efcf94',
          400: '#e5b463',
          500: '#d49b38',
          600: '#b87d2a', // Royal Heritage Gold
          700: '#945f23',
          800: '#794d23',
          900: '#654020',
          DEFAULT: '#b87d2a',
        },
        deepgreen: {
          50: '#f1f8f4',
          100: '#ddf0e5',
          200: '#bce1ce',
          300: '#90caa9',
          400: '#5fab82',
          500: '#3c8e65',
          600: '#2d7250',
          700: '#255b41',
          800: '#204936',
          900: '#143429', // Deep Forest / Heritage Green
          950: '#0b1d16',
          DEFAULT: '#143429',
        },
        ivory: {
          50: '#fdfdfb',
          100: '#fbfbf7',
          200: '#f7f6ed',
          300: '#f0ede0',
          400: '#e5e1cf',
          500: '#d7d1bb',
          DEFAULT: '#fbfbf7', // Antique Ivory
        },
        heritage: {
          charcoal: '#1c1917',
          sand: '#f5ede0',
          bronze: '#7c4a27',
          parchment: '#f8f5ee',
          border: '#e8dec9',
        },
      },
      fontFamily: {
        // Decorative/Serif for headings
        heading: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        // Clean sans for body
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'heritage-sm': '0 1px 3px rgba(28, 25, 23, 0.05), 0 1px 2px rgba(28, 25, 23, 0.08)',
        'heritage-md': '0 4px 12px -2px rgba(28, 25, 23, 0.08), 0 2px 6px -1px rgba(28, 25, 23, 0.04)',
        'heritage-lg': '0 12px 24px -4px rgba(28, 25, 23, 0.1), 0 4px 10px -2px rgba(28, 25, 23, 0.05)',
      },
    },
  },
  plugins: [],
}

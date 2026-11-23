/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#04141d',
          900: '#061d29',
          800: '#0a2b3c',
          700: '#0f3a4f',
          600: '#15526b',
        },
        azure: {
          50: '#e9fbff',
          100: '#c8f2ff',
          200: '#90e4ff',
          300: '#52d2f7',
          400: '#28bce6',
          500: '#159fcf',
          600: '#0d7faa',
          700: '#0c6488',
          800: '#0e516e',
          900: '#0f4359',
        },
        gold: {
          50: '#fbf6ec',
          100: '#f5e9cf',
          200: '#ecd29c',
          300: '#e0bb6e',
          400: '#d4a857',
          500: '#c2933f',
          600: '#a4772f',
          700: '#7e5926',
          800: '#5c4220',
          900: '#3f2e17',
        },
        sand: {
          50: '#faf7f2',
          100: '#f3ede2',
          200: '#e7d8c3',
          300: '#d9c1a0',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        ultra: '0.35em',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
      },
      keyframes: {
        zoomFade: {
          '0%': { transform: 'scale(1)', opacity: '0' },
          '5%': { opacity: '1' },
          '33%': { opacity: '1' },
          '38%': { opacity: '0' },
          '100%': { transform: 'scale(1.15)', opacity: '0' },
        }
      },
      animation: {
        'zoom-fade': 'zoomFade 15s linear infinite',
      }
    },
  },
  plugins: [],
}

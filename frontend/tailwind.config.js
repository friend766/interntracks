/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#4F6DF5',
          dark: '#3151D4',
          lavender: '#8B7CF6',
          bg: '#F8FAFF',
          card: '#FFFFFF',
          softBlue: '#EEF2FF',
          lightLavender: '#F3F1FF',
          textPrimary: '#111827',
          textSecondary: '#475569',
          textMuted: '#64748B',
          border: '#E2E8F0',
          hoverBlue: '#3D5CE8',
          focusRing: '#A5B4FC',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

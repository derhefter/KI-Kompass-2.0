/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Variante C: "Mittelstand Modern" – Warm Professional
        primary: {
          50: '#F0F9FF',   // Sky Light – Hintergründe
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0369A1',  // Ocean Blue – Primary CTA
          600: '#075985',  // Darker hover
          700: '#1E293B',  // Dark Slate – Headlines
          800: '#0F172A',
          900: '#020617',
        },
        accent: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#059669',  // Green – Erfolg, Checks
          600: '#047857',
          700: '#065F46',
        },
        warm: {
          50: '#FFFBEB',   // Amber-50 – Warmer Hintergrund
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#D97706',  // Amber – Warme Akzente, Badges
          600: '#B45309',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#374151',  // Body Text
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

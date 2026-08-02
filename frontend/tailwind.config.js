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
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563EB',
          700: '#1d4ed8',
          800: '#1e40af',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14B8A6',
          600: '#0d9488',
          700: '#0f766e',
        },
        health: {
          low: '#10B981',      // Green
          medium: '#F59E0B',   // Amber
          high: '#EF4444',     // Red
        },
        dark: {
          bg: '#0F172A',
          card: '#1E293B',
          border: '#334155',
          text: '#F8FAFC',
          muted: '#94A3B8'
        }
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-primary': '0 0 20px rgba(37, 99, 235, 0.35)',
        'glow-teal': '0 0 20px rgba(20, 184, 166, 0.35)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.35)',
      }
    },
  },
  plugins: [],
};

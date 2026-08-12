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
        bg: {
          DEFAULT: '#FAFAF9',   // light page background
          dark: '#0B0D0F',      // dark page background with pitch sketch grid
        },
        surface: {
          DEFAULT: '#FFFFFF',   // light card/panel background
          dark: '#121518',      // dark frosted glass card background
        },
        border: {
          DEFAULT: '#E7E5E4',   // light hairline border
          dark: 'transparent',  // dark mode — seamless zero white line borders
        },


        text: {
          DEFAULT: '#1C1B1A',       // light primary text
          secondary: '#6B6963',     // light secondary/label text
          dark: '#F3F4F6',          // dark primary text (crisp pencil white)
          'dark-secondary': '#9CA3AF',
        },
        accent: {
          DEFAULT: '#0F6E56',   // light mode accent — deep clinical teal
          dark: '#5DCAA5',      // dark mode accent — vibrant glass mint
          bg: '#E1F5EE',        // light accent-tint background
          'bg-dark': '#0F6E5622',
        },
        risk: {
          low: '#3B6D11',      lowBg: '#EAF3DE',
          medium: '#854F0B',   mediumBg: '#FAEEDA',
          high: '#A32D2D',     highBg: '#FCEBEB',
        },
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 12px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'neomorph-dark': '6px 6px 16px rgba(0, 0, 0, 0.6), -4px -4px 12px rgba(255, 255, 255, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.08)',
        'neomorph-inset-dark': 'inset 3px 3px 6px rgba(0, 0, 0, 0.7), inset -2px -2px 5px rgba(255, 255, 255, 0.04)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)',
      }
    },
  },
  plugins: [],
};




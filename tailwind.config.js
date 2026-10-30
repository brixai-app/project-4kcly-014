export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#FFFFFF',
          surface: '#F4F1EB',
          'surface-hover': '#E6F3F0',
          border: '#D8D4CC',
          primary: '#1A1A1A',
          muted: '#5F6368',
          accent: '#E63946',
          'accent-hover': '#C92D39',
          'accent-text': '#000000',
        },
        bg: '#FFFFFF',
        surface: '#F4F1EB',
        'surface-hover': '#E6F3F0',
        accent: '#E63946',
        'accent-hover': '#C92D39',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        theme: '18px',
      },
    },
  },
  plugins: [],
};
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#FFFFFF',
          surface: '#F7F5F2',
          'surface-hover': '#FFF4F4',
          border: '#D8DEE5',
          primary: '#222222',
          muted: '#5E6670',
          accent: '#E63946',
          'accent-hover': '#C92836',
          'accent-text': '#000000',
        },
        bg: '#FFFFFF',
        surface: '#F7F5F2',
        'surface-hover': '#FFF4F4',
        accent: '#E63946',
        'accent-hover': '#C92836',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        theme: '18px',
      },
    },
  },
  plugins: [],
};
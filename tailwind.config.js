export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#1D1D1D',
          surface: '#25282B',
          'surface-hover': '#244B46',
          border: '#457B9D',
          primary: '#F1FAEE',
          muted: '#A8DADC',
          accent: '#E63946',
          'accent-hover': '#C92F3C',
          'accent-text': '#000000',
        },
        bg: '#1D1D1D',
        surface: '#25282B',
        'surface-hover': '#244B46',
        accent: '#E63946',
        'accent-hover': '#C92F3C',
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
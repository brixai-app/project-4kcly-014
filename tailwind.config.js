export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#FFFFFF',
          surface: '#F9FAFB',
          'surface-hover': '#F1F5F4',
          border: '#D7DFDD',
          primary: '#142D35',
          muted: '#5E6E73',
          accent: '#E63946',
          'accent-hover': '#C92E3A',
          'accent-text': '#000000',
        },
        bg: '#FFFFFF',
        surface: '#F9FAFB',
        'surface-hover': '#F1F5F4',
        accent: '#E63946',
        'accent-hover': '#C92E3A',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        theme: '6px',
      },
    },
  },
  plugins: [],
};
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#F4F1DE',
          surface: '#FFFDF2',
          'surface-hover': '#E9E4CB',
          border: '#C9C3A8',
          primary: '#1D3557',
          muted: '#596579',
          accent: '#E63946',
          'accent-hover': '#C92535',
          'accent-text': '#000000',
        },
        bg: '#F4F1DE',
        surface: '#FFFDF2',
        'surface-hover': '#E9E4CB',
        accent: '#E63946',
        'accent-hover': '#C92535',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        theme: '24px',
      },
    },
  },
  plugins: [],
};
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#FFFFFF',
          surface: '#F5F5F5',
          'surface-hover': '#EBEEF2',
          border: '#D6DADE',
          primary: '#17191C',
          muted: '#5E6670',
          accent: '#D32F2F',
          'accent-hover': '#B71C1C',
          'accent-text': '#ffffff',
        },
        bg: '#FFFFFF',
        surface: '#F5F5F5',
        'surface-hover': '#EBEEF2',
        accent: '#D32F2F',
        'accent-hover': '#B71C1C',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'sans-serif'],
      },
      borderRadius: {
        theme: '10px',
      },
    },
  },
  plugins: [],
};
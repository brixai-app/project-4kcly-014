export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#FFFFFF',
          surface: '#F5F5F5',
          'surface-hover': '#E9EEF2',
          border: '#D7DDE3',
          primary: '#18222C',
          muted: '#5F6B76',
          accent: '#D32F2F',
          'accent-hover': '#B71C1C',
          'accent-text': '#ffffff',
        },
        bg: '#FFFFFF',
        surface: '#F5F5F5',
        'surface-hover': '#E9EEF2',
        accent: '#D32F2F',
        'accent-hover': '#B71C1C',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        theme: '12px',
      },
    },
  },
  plugins: [],
};
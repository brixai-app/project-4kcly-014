export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#FFFFFF',
          surface: '#F7F8F6',
          'surface-hover': '#E8F5F2',
          border: '#CAD5D7',
          primary: '#000000',
          muted: '#526166',
          accent: '#E63946',
          'accent-hover': '#C92532',
          'accent-text': '#000000',
        },
        bg: '#FFFFFF',
        surface: '#F7F8F6',
        'surface-hover': '#E8F5F2',
        accent: '#E63946',
        'accent-hover': '#C92532',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        theme: '16px',
      },
    },
  },
  plugins: [],
};
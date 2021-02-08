const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './index.html',
      './src/**/*.vue',
      './src/**/*.js',
      './src/**/*.ts',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    transitionDuration: {
      DEFAULT: '300ms',
    },
    animation: {
      pulse: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
    extend: {
      fontFamily: {
        sans: ['TTFirsNeue', defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundSize: {
        '50%': '50%',
      },
      maxWidth: {
        'screen-xl': '1340px',
      },
      margin: {
        4.5: '1.125rem',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
  corePlugins: {},
}

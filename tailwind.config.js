const tailwindTypography = require('@tailwindcss/typography')
const tailwindCustomForms = require('@tailwindcss/custom-forms')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./components/**/*.{js,jsx}', './pages/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'accent-1': '#333',
        arapawa: '#0d1c66',
        pink: '#f0a3a1',
        ballerina: '#ffd7d7',
        carnation: '#f95b5d',
      },
    },
  },
  variants: {},
  plugins: [tailwindTypography, tailwindCustomForms],
}

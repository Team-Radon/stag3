/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        accent: 'var(--accent-color)',
        primary: 'var(--primary-color)',
        'skin-border': 'var(--border-color)',
        'skin-divider': 'var(--divider-color)',
        'skin-text': 'var(--text-color)',
        'skin-link': 'var(--link-color)',
        'skin-bg': 'var(--bg-color)',
        'skin-block-bg': 'var(--block-bg)',
        'skin-header-bg': 'var(--header-bg)',
        'skin-heading': 'var(--heading-color)',
        green: '#21b66f',
        red: '#ff3856',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

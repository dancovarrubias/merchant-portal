/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'translate-x-0',
    'translate-x-full',
    '-translate-x-full'
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        'primary': '#0075FF',
        'background-primary': '#F5F6FB',
        'background-secondary': '#FFFFFF',
        'text-primary': '#18223D',
        'text-secondary': '#656B7C',
        'text-tertiary': '#888EA0',
        'text-alternate': '#FFFFFF',
        'border': '#B4BACA',
        'border-light': '#EBEEF7',
        'icon-primary': '#18223D',
        'icon-secondary': '#09121F',
        'interactive-secondary': '#888EA0',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      fontSize: {
        'label-sm': ['12px', '16px'],
        'body-sm': ['14px', '1.3'],
        'body-md': ['16px', '1.5'],
        'heading-sm': ['18px', '1.4'],
      },
      fontWeight: {
        'medium': 500,
        'bold': 700,
      },
      boxShadow: {
        'button': '0px 2px 7px 0px rgba(0,0,0,0.04), 0px 4px 6px 0px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
}
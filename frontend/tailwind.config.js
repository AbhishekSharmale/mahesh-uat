/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
      },
      fontSize: {
        'mobile': '16px',
        'button': '18px',
      },
      minHeight: {
        'touch': '44px',
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // paths to all JS/TSX files
    './components/**/*.{js,ts,jsx,tsx}' // don't forget components
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}


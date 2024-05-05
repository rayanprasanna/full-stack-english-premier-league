/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-indigo':'#37003c',
        'light':'#ffffff',
        'dark':'#000000',
        'green': '#4ADE80',
        'dark-green':'#15803D',
        'red':'#EF4444',
        'dark-red':'#B91C1C',
        'blue': '#004F98',
        'dark-blue': '#00308F',
      },
    },
  },
  plugins: [],
}
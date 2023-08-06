/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom' : '0px 0px 20px 7px rgba(235, 235, 235, 0.25)'
      },
      colors: {
        dark : '#111',
        light: '#EEE'
      },
      fontFamily: {
        nunito : ['Nunito']
      },

    },
  },
  plugins: [],
}


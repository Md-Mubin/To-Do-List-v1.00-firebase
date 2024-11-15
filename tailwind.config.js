/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    
    container : {
      center : true
    },

    fontFamily: {
      "racing" : ["Racing Sans One", "sans-serif"],
      "inter"  : ["Inter", "sans-serif"],
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
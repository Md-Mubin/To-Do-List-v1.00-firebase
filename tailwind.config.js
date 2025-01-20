/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    
    container : {
      center : true,
      padding : {
        DEFAULT : "10px",
        lg: "80px",
        xl: "0px"
      }
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
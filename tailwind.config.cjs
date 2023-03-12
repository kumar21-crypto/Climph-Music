/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
       
        autofill:'repeat(auto-fill, minmax(200px, 1fr))',
        autofill1:'repeat(auto-fill, minmax(300px, 1fr))'
      }
    },
  },
  plugins: [],
}

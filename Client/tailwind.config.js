/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/src/assets/7146cad674d245c15b984440a7d42b11.jpg')",
       
      }
    },
  },
  plugins: [],
}


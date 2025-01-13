/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'title': '#000000',
        'description': '#6B7280',
        'background': '#f5f5f5',
        'primary': '#01dfdf',
        'primary-hover': '#04cfcf',
        'secondary': '#003366',
        'accent': '#1ddd1d',
       },
       boxShadow: {
        "card-shadow": 'rgba(0, 0, 0, 0.1) 0px 4px 12px;'
       }
       
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
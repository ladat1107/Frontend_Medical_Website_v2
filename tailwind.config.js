/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/layout/Receptionist/pages/Messenger/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-tw': '#00B5F1',
        'secondary-tw': '#3dac78',
        'background-tw': '#f4f4f4',
        'mainText-tw': '#003553',
        'secondaryText-tw': '#858585',
        'bgAdmin-tw': '#f4f4f4',
      },
    },
  },
  plugins: [],
}


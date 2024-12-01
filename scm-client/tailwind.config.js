/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        pinkCustom: '#FF78AC',
        tealCustom: '#A8D5E3',
        creamCustom: '#F2F0EA',
        customGreen: '#013328',
        customRed:'#F76566',
        lustrousBlue: '#4F8EF7',
      },
    },
  },
  plugins: [],
}


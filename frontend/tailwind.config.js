/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'elosaude-green': '#20A490', // Cor principal do logotipo
        'elosaude-dark': '#7d7776', // Cinza escuro para textos e rodapé
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Exemplo de fonte para a marca
      },
    },
  },
  plugins: [],
}
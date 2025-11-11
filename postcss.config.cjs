
// Este archivo debe ser CommonJS por la configuración de Vite
module.exports = {
  plugins: [
    require('@tailwindcss/postcss')(),
    require('autoprefixer'),
  ],
};
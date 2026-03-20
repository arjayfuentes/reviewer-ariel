/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './node_modules/primeng/**/*.{js,ts}'],
  corePlugins: {
    preflight: false, // ✅ prevents conflicts with PrimeNG
  },
  theme: {
    extend: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './ui/**/*.{js,jsx,ts,tsx}',
    './ui/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};

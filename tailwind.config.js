/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Ensure dark mode is enabled
  theme: {
    extend: {
      colors: {
        primary: '#00A8A8',
        secondary: '#FFB800',
        background: '#1A202C', // Dark background color
        text: '#E2E8F0', // Light text color for dark mode
        'primary-dark': '#007575',
        'secondary-dark': '#CC8A00',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#c25675',
          dark: '#a84562'
        },
        secondary: {
          DEFAULT: '#e8879a',
          dark: '#d4697e'
        },
        background: '#fdf2f8',
        surface: '#ffffff',
        accent: {
          DEFAULT: '#fce4ec',
          dark: '#f5c4d6'
        },
        text: {
          DEFAULT: '#2c2c2c',
          muted: '#777777',
          light: '#999999'
        },
        border: '#f0e0e6',
        success: '#6abf6a',
        danger: '#e74c3c'
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

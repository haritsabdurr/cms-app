/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#1160c1',

          secondary: '#b2ffe8',

          accent: '#f282ea',

          neutral: '#16191D',

          'base-100': '#DBE4F0',

          info: '#A2D6E6',

          success: '#5AEDAF',

          warning: '#FAAE14',

          error: '#ED6E7D',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};

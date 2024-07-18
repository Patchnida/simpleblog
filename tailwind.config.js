/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
        '2xl': '1536px',
        'xl': '1366px',
        'lg': '1024px',
        'md': '768px',
        'sm': '640px',
        'xs': '475px',
        'xxs': '360px',
      },
    },
  },
  variants: {},
  plugins: [],
};

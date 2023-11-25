/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "0",
      },
    },
    screens: {
      "2xl": "1440px",
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};

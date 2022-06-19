/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "576px",
      bp_650: "650px",
      md: "768px",
      lg: "992px",
      bp_1100: "1100px",
      bp_1170: "1170px",
      xl: "1200px",
      "2xl": "1400px",
    },
    extend: {},
  },
  plugins: [],
};

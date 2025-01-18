/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-1": "#5187c3",
        "color-2": "#4550a1",
        "color-3": "#86d1db",
      },

      boxShadow: {
        "3xl": "-1px 3px 19px 0px rgba(0,0,0,0.79);",
      },

      screens: {
        "max-sm": { max: "768px" },
      },
    },
  },
  plugins: [],
};

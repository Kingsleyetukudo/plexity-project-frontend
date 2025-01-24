/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        550: "550px",
      },
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
      gridTemplateColumns: {
        "2col": "250px 1fr",
        "1col": "100px 1fr",
      },

      transitionProperty: {
        "grid-cols": "grid-template-columns",
      },

      gridTemplateAreas: {
        layout: ["Sidebar header", "sidebar main", "sidebar footer"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    function ({ addUtilities }) {
      addUtilities({
        ".grid-layout": {
          display: "grid",
          "grid-template-areas": `
            "sidebar header"
            "sidebar main"
            "sidebar footer"
          `,
        },
        ".header-area": {
          "grid-area": "header",
        },
        ".sidebar-area": {
          "grid-area": "sidebar",
        },
        ".main-area": {
          "grid-area": "main",
        },
        ".footer-area": {
          "grid-area": "footer",
        },
      });
    },
  ],
};

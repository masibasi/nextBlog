/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        warm: {
          50: "#fdf8f0",
          100: "#faefd9",
          200: "#f5ddb3",
          300: "#edc47a",
          400: "#e4a84a",
          500: "#d98f2a",
          600: "#b8721e",
          700: "#8f551a",
          800: "#6e4118",
          900: "#573417",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
            strong: {
              fontWeight: "700",
            },
            p: {
              marginTop: "1.25em",
              marginBottom: "1.25em",
            },
            ul: {
              marginTop: "1.25em",
              marginBottom: "1.25em",
            },
            ol: {
              marginTop: "1.25em",
              marginBottom: "1.25em",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

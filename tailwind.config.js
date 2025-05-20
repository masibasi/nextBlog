/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
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

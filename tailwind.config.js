/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        heroIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "hero-in": "heroIn 0.7s ease forwards",
      },
      colors: {
        cardinal: {
          50:  '#fff0f0',
          100: '#ffe0e0',
          200: '#ffc0c0',
          300: '#f08080',
          400: '#cc3333',
          500: '#b30000',
          600: '#a00000',
          700: '#990000', // USC Cardinal
          800: '#7a0000',
          900: '#550000',
        },
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

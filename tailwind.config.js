/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        rojo: {
          100: "#FAD5D5",
          200: "#F6ABAB",
          300: "#F18082",
          400: "#ED5658",
          500: "#E82C2E",
          600: "#BA2325",
          700: "#8B1A1C",
          800: "#5D1212",
          900: "#2E0909",
        },
        marron: "#401e17",
      },
    },
  },
  plugins: [],
};

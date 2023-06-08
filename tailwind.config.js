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
        // generated from coolor: https://coolors.co/8ed081-b4d2ba-dce2aa-b57f50-4b543b
        Pistachio: "#8ED081",
        Celadon: "#B4D2BA",
        Vanilla: "#DCE2AA",
        Copper: "#B57F50",
        Ebony: "#4B543Bk",
      },
    },
  },
  plugins: [],
};

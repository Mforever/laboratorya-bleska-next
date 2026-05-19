/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#050505",
        "bg-secondary": "#0F0F0F",
        "bg-element": "#1A1A1A",
        "bg-element-hover": "#262626",
        "text-primary": "#FFFFFF",
        "text-secondary": "#A3A3A3",
        accent: {
          DEFAULT: "#91CB7D",
          hover: "#A8E090",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};

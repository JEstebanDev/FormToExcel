/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gft: {
          blue: "#003366",
          lightblue: "#0057A8",
          accent: "#00A3E0",
          gray: "#081a2d",
          border: "#D1D5DB",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

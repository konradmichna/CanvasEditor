/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7209B7",
        primary50: "rgba(114, 9, 183, 0.5)",
        black100: "#353535",
        black75: "#676767",
        black50: "#999999",
        black25: "#CDCDCD",
        white: "#FFFFFF",
        white98: "#FAFAFA",
        white97: "#F7F7F8",
        red: "#CB0000",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      fontSize: {
        button: "15px",
        display: "32px",
        body: "18px",
      },
      fontWeight: {
        "semi-bold": 600,
        bold: 700,
        medium: 500,
      },
    },
  },
  plugins: [],
};

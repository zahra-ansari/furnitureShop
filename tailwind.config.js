/** @type {import('tailwindcss').Config} */
import tailwindcssRtl from "tailwindcss-rtl";

export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        12.5: "3.125rem",
        33.75: "8.4375rem",
        50.75: "12.6875rem",
      },
      colors: {
        green: "#7ac751",
      },
      fontFamily: {
        Vazir: "Vazir",
        VazirBlack: "Vazir Black",
        VazirBold: "Vazir Bold",
        VazirLight: "Vazir Light",
        VazirMedium: "Vazir Medium",
        VazirThin: "Vazir Thin",
      },
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "&>*");
      addVariant("child-hover", "&>*:hover");
    },
    tailwindcssRtl,
  ],
};

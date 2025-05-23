const config = {
  plugins: ["@tailwindcss/postcss"],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#171717",
        primary: "#101828",
        secondary: "#7F5609",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
};

export default config;

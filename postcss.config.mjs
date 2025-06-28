const config = {
  plugins: ["@tailwindcss/postcss"],
  // content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        grandista: ["Grandista", "sans-serif"],
      },
    },
  },
};

export default config;

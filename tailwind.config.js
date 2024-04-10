/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "tg-accent-text": "var(--tg-theme-accent-text-color)",
        "tg-background": "var(--tg-theme-background-color)",
      },
    },
  },
  plugins: [],
};

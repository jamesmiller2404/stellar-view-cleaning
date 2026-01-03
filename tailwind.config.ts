import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        xl: "0.5rem",
        "2xl": "0.75rem",
      },
    },
  },
  plugins: [],
} satisfies Config;

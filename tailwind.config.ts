import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "var(--bg-page)",
        surface: "var(--bg-surface)",
        "surface-muted": "var(--bg-surface-muted)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        "line-soft": "var(--line-soft)",
      },
      fontSize: {
        xs: ["1.0125rem", { lineHeight: "1.35rem" }],
      },
      borderRadius: {
        xl: "0.5rem",
        "2xl": "0.75rem",
      },
    },
  },
  plugins: [],
} satisfies Config;

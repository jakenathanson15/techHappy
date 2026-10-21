import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Newsreader", "Georgia", "serif"],
        display: ["var(--font-serif)", "Newsreader", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      colors: {
        ink: {
          950: "#050505",
          900: "#0a0a0a",
          850: "#111111",
          800: "#181818",
          700: "#222222",
          600: "#2e2e2e",
        },
        acid: {
          300: "#faf080",
          400: "#f5e642",
          500: "#e8d600",
          600: "#c4b400",
        },
      },
    },
  },
  plugins: [],
};

export default config;
